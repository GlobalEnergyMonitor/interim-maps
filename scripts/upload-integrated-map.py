#!/usr/bin/env python3
"""Upload the integrated-power map tiles + CSV to DigitalOcean Spaces.

Destinations follow the existing bucket conventions:
  tiles -> mapsintegrated/maps/integrated-<release>/{z}/{x}/{y}.pbf
  csv   -> publicgemdata/Integrated/<release>/<csv name>

Everything is uploaded public-read and gzip-compressed with a Content-Encoding
header (browsers and mapbox-gl decompress transparently; the tileset is ~4x
smaller over the wire than the uncompressed tiles the map used previously).

Credentials come from .env at the repo root (AWS_ACCESS_KEY_ID,
AWS_SECRET_ACCESS_KEY, AWS_ENDPOINT_URL_S3) — boto3 reads them natively.

Usage:
  .venv/bin/python scripts/upload-integrated-map.py --dry-run
  .venv/bin/python scripts/upload-integrated-map.py
  .venv/bin/python scripts/upload-integrated-map.py --skip-existing   # resume

After uploading, point trackers/integrated-power/config.js at:
  tiles: ['https://mapsintegrated.nyc3.cdn.digitaloceanspaces.com/maps/integrated-<release>/{z}/{x}/{y}.pbf']
  csv: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/Integrated/<release>/<csv name>'
"""

import argparse
import gzip
import sys
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import boto3
from dotenv import load_dotenv

REPO_ROOT = Path(__file__).resolve().parent.parent

RELEASE = '2026-05'
TILES_DIR = REPO_ROOT / 'trackers/integrated-power/tiles'
CSV_FILE = REPO_ROOT / 'trackers/integrated-power/gipt-data-2026-05-06.csv'

TILES_BUCKET = 'mapsintegrated'
TILES_PREFIX = f'maps/integrated-{RELEASE}'
CSV_BUCKET = 'publicgemdata'
CSV_PREFIX = f'Integrated/{RELEASE}'

WORKERS = 24


def list_existing(s3, bucket, prefix):
    keys = set()
    for page in s3.get_paginator('list_objects_v2').paginate(Bucket=bucket, Prefix=prefix):
        keys.update(o['Key'] for o in page.get('Contents', []))
    return keys


def upload_one(s3, path, bucket, key, content_type):
    body = gzip.compress(path.read_bytes(), compresslevel=6)
    s3.put_object(
        Bucket=bucket,
        Key=key,
        Body=body,
        ACL='public-read',
        ContentType=content_type,
        ContentEncoding='gzip',
        CacheControl='public, max-age=86400',
    )
    return len(body)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run', action='store_true', help='print the plan without uploading')
    parser.add_argument('--skip-existing', action='store_true', help='skip keys already in the bucket (resume)')
    args = parser.parse_args()

    load_dotenv(REPO_ROOT / '.env')
    s3 = boto3.client('s3')

    jobs = []  # (path, bucket, key, content_type)
    for path in sorted(TILES_DIR.rglob('*.pbf')):
        key = f'{TILES_PREFIX}/{path.relative_to(TILES_DIR)}'
        jobs.append((path, TILES_BUCKET, key, 'application/x-protobuf'))
    jobs.append((CSV_FILE, CSV_BUCKET, f'{CSV_PREFIX}/{CSV_FILE.name}', 'text/csv'))

    total_bytes = sum(p.stat().st_size for p, *_ in jobs)
    print(f'{len(jobs):,} files, {total_bytes / 1e6:,.0f}MB uncompressed')
    print(f'tiles -> {TILES_BUCKET}/{TILES_PREFIX}/')
    print(f'csv   -> {CSV_BUCKET}/{CSV_PREFIX}/{CSV_FILE.name}')

    if args.skip_existing:
        existing = list_existing(s3, TILES_BUCKET, TILES_PREFIX) | list_existing(s3, CSV_BUCKET, CSV_PREFIX)
        jobs = [j for j in jobs if j[2] not in existing]
        print(f'{len(existing):,} keys already uploaded, {len(jobs):,} remaining')

    if args.dry_run:
        for path, bucket, key, ctype in jobs[:5]:
            print('would upload:', path.relative_to(REPO_ROOT), '->', f'{bucket}/{key}', f'({ctype})')
        print(f'... and {max(0, len(jobs) - 5):,} more')
        return

    done = 0
    sent_bytes = 0
    lock = threading.Lock()
    failures = []

    def work(job):
        nonlocal done, sent_bytes
        path, bucket, key, ctype = job
        try:
            sent = upload_one(s3, path, bucket, key, ctype)
        except Exception as e:  # noqa: BLE001 - report and continue; rerun with --skip-existing
            failures.append((key, str(e)))
            return
        with lock:
            done += 1
            sent_bytes += sent
            if done % 2000 == 0 or done == len(jobs):
                print(f'{done:,}/{len(jobs):,} uploaded ({sent_bytes / 1e6:,.0f}MB compressed)')

    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = [pool.submit(work, job) for job in jobs]
        for f in as_completed(futures):
            f.result()

    if failures:
        print(f'\n{len(failures)} FAILED (rerun with --skip-existing to retry):', file=sys.stderr)
        for key, err in failures[:10]:
            print(' ', key, err, file=sys.stderr)
        sys.exit(1)

    print('\nDone. Map URLs:')
    print(f'  tiles: https://{TILES_BUCKET}.nyc3.cdn.digitaloceanspaces.com/{TILES_PREFIX}/{{z}}/{{x}}/{{y}}.pbf')
    print(f'  csv:   https://{CSV_BUCKET}.nyc3.cdn.digitaloceanspaces.com/{CSV_PREFIX}/{CSV_FILE.name}')


if __name__ == '__main__':
    main()
