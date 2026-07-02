var config = {
    /* Vector tiles render the map; the CSV supplies the full per-unit data for the
       table view, detail popups, legend counts, and search.
       Local tiles generated from the geojson with (see scripts/geojson-to-csv.py for the CSV):
         tippecanoe -e trackers/integrated-power/tiles -l integrated -Z0 -z10 -r1 \
           --no-feature-limit --no-tile-size-limit --no-tile-compression \
           -y project-id -y name -y asset-type -y status -y all-countries -y capacity-scaled \
           trackers/integrated-power/integrated_map_2026-05-06.geojson */
    csv: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/Integrated/2026-05/gipt-data-2026-05-06.csv',
    tiles: ['https://mapsintegrated.nyc3.cdn.digitaloceanspaces.com/maps/integrated-2026-05/{z}/{x}/{y}.pbf'],
    // local copies for offline testing (uploaded by scripts/upload-integrated-map.py):
    // csv: '/maps/trackers/integrated-power/gipt-data-2026-05-06.csv',
    // tiles: [window.location.origin + '/maps/trackers/integrated-power/tiles/{z}/{x}/{y}.pbf'],
    tileSourceLayer: 'integrated',

    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    // geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/refactor_testing/integrated_map_2026-05-06.geojson',

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
        'Project': ['name', 'name-search'],
        'Companies': ['owner', 'parent', 'owner-search', 'parent-search'],
        'Start Year': ['start-year'],
        'Country/Area': ['all-countries'],
        'Type': ['type'],
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
    multiCountry: true,

    img_detail_zoom: 10,
};
