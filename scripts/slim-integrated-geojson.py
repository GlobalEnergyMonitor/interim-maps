#!/usr/bin/env python3
"""Slim the integrated-power geojson so the map loads faster.

Three size reductions, none of which change what the map can display:
  1. Drop property columns nothing in this map's code path reads
     (the *-search columns are a tile-map workaround; site.js strips
     diacritics at runtime for geojson maps).
  2. Round coordinates to 5 decimal places (~1m precision; the source
     data has up to 11 decimals, i.e. sub-millimeter).
  3. Write minified JSON (the source file is pretty-printed; the
     indentation alone is ~85MB).

Intended to be adopted by the upstream data-prep pipeline that produces
the geojson; kept here so the slimming is reproducible while testing.

Usage: python3 scripts/slim-integrated-geojson.py input.geojson output.geojson
"""

import json
import sys

# Columns not read by site.js / site-config.js / trackers/integrated-power/config.js
DROP_COLUMNS = {
    'name-search',      # search columns are only needed for vector-tile maps;
    'owner-search',     # the geojson path removes diacritics at runtime instead
    'parent-search',
    'location-accuracy',
    'tracker-acro',
    'tracker-custom',
    'tracker-display',
    'unit-id',
    'country-area1',    # this map uses countryField: 'all-countries'
    'owner-gem-id',
    'parent-gem-id',
    'Latitude',         # only used when the input is CSV; geometry has the coords
    'Longitude',
}

COORD_DECIMALS = 5


def round_coords(coords):
    if isinstance(coords, (int, float)):
        return round(coords, COORD_DECIMALS)
    return [round_coords(c) for c in coords]


def main(in_path, out_path):
    with open(in_path) as f:
        data = json.load(f)

    for feature in data['features']:
        props = feature['properties']
        for col in DROP_COLUMNS:
            props.pop(col, None)
        if feature.get('geometry'):
            feature['geometry']['coordinates'] = round_coords(feature['geometry']['coordinates'])

    with open(out_path, 'w') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))

    print(f'{len(data["features"]):,} features written to {out_path}')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    main(sys.argv[1], sys.argv[2])
