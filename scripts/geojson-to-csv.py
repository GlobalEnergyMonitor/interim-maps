#!/usr/bin/env python3
"""Convert the integrated-power geojson to the CSV companion file a tile-based
map needs.

With vector tiles, the map only renders what's baked into the tiles; the app
still needs the full per-unit data for the table view, detail popups, legend
counts, and search. site.js loads that from `config.csv` when `config.tiles`
is set (see loadData()), using the Latitude/Longitude columns for geometry.

Usage: python3 scripts/geojson-to-csv.py input.geojson output.csv
"""

import csv
import json
import sys


def main(in_path, out_path):
    with open(in_path) as f:
        data = json.load(f)

    features = data['features']
    columns = list(features[0]['properties'].keys())

    with open(out_path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=columns)
        writer.writeheader()
        for feature in features:
            row = {k: ('' if v is None else v) for k, v in feature['properties'].items()}
            writer.writerow(row)

    print(f'{len(features):,} rows, {len(columns)} columns written to {out_path}')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    main(sys.argv[1], sys.argv[2])
