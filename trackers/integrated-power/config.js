var config = {
    /* Vector tiles render the map; the CSV supplies the full per-unit data for the
       table view, detail popups, legend counts, and search.
       Local tiles generated from the geojson with :
            MapFileCreation repo -> geojson_to_csv.py
            The following tippecanoe command, which is implemented in run_tippecanoe.py in MapFileCreation repo:
               tippecanoe -e integrated-power/tiles -l integrated -Z0 -z10 -r1 \
               --no-feature-limit --no-tile-size-limit --no-tile-compression \
               -y project-id -y name -y asset-type -y status -y all-countries -y capacity-scaled \
               integrated-power/integrated_map_2026-05-06.geojson */
    tiles: ['https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/Current_maps/integrated-power/2026-08/tiles/{z}%5C{x}%5C{y}.pbf'],
    tileSourceLayer: 'integrated',

    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    csv: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/Current_maps/integrated-power/2026-08/integrated_map_2026-08.csv',

    /* Labels for describing the assets */
    assetFullLabel: 'units / phases',
    assetLabel: 'Units',

    /* configure the table view, selecting which columns to show, how to label them,
           and designated which column has the link */
    tableHeaders: {
        values: ['name', 'unit-name', 'owner', 'parent', 'capacity-table', 'status-display', 'subnational', 'all-countries', 'start-year', 'end-year', 'asset-type'],
        labels: ['Plant/project name', 'Unit/phase name', 'Owner', 'Parent', 'Capacity (MW)', 'Status', 'Subnational unit (province/state)', 'Country/Area', 'Start year', 'Retired year', 'Type'],
        clickColumns: ['name'],
        rightAlign: ['capacity-table', 'start-year', 'retired-year'],
    },

    /* configure the search box;
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Project': ['name'],
        'Companies': ['owner', 'parent'],
        'Start Year': ['start-year'],
        'Country/Area': ['all-countries'],
        'Type': ['asset-type'],
        'Status': ['status']
    },

    /* define fields and how they are displayed.
      `'display': 'heading'` displays the field in large type
      `'display': 'range'` will show the minimum and maximum values.
      `'display': 'join'` will join together values with a comma separator
      `'display': 'location'` will show the fields over the detail image
      `'label': '...'` prepends a label. If a range, two values for singular and plural.
    */
    detailView: {
        'name': {'display': 'heading'},
        'location-display': {'display': 'location'},

        'asset-type': {'display': 'colorcoded'},
        'owner': {'label': 'Owner'},
        'parent': {'label': 'Parent'},
        'tech-type': {'display': 'join', 'label': ['Technology', 'Technologies']},
        'fuel': {'display': 'join', 'label': ['Fuel Type', 'Fuel Types']},
        'start-year': {'display': 'range', 'label': ['Start Year', 'Start Year Range']},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    color_association: {
        field: 'asset-type',
        fieldLabel: 'Type',
        values: {
            'bioenergy': 'blue',
            'coal': 'red',
            'geothermal': 'blue',
            'hydropower': 'blue',
            'nuclear': 'blue',
            'oil/gas': 'red',
            'utility-scale solar': 'green',
            'wind': 'green'
        }
    },

    filters: [
        {
            field: 'asset-type',
            values: ['coal', 'oil/gas', 'nuclear', 'geothermal', 'hydropower', 'bioenergy', 'utility-scale solar', 'wind'],
            primary: true
        },
        {
            field: 'status',
            values: ['operating', 'construction', 'pre-construction', 'announced', 'retired', 'cancelled', 'shelved', 'mothballed']
        }
    ],

    projection: 'globe',
    countryField: 'all-countries',

    img_detail_zoom: 10,
};
