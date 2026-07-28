var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/interim_maps/gcct_map_2026-07.geojson',

    /* Labels for describing the assets */
    assetFullLabel: 'Projects',
    assetLabel: 'projects',

    /* configure the table view, selecting which columns to show, how to label them,
       and designated which column has the link */
    tableHeaders: {
        values: ['name', 'status', 'capacity-table', 'clinker-capacity', 'plant-type', 'clinker-prod-method', 'cement-type', 'color', 'subnational', 'country-area1'],
        labels: ['Project name', 'Project status', 'Cement capacity (mtpa)', 'Clinker capacity (mtpa)', 'Plant type', 'Clinker production method', 'Majority cement type', 'Cement color', 'Subnational unit', 'Country/Area'],
        clickColumns: ['name'],
        rightAlign: ['capacity-table', 'clinker-capacity'],
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Project': ['name', 'name-noneng', 'name-other'],
        'Companies': ['owner', 'parent', 'owner-noneng', 'owner-gem-id'],
        'Type ': ['plant-type', 'clinker-prod-method', 'color'],
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

        'plant-type': {'label': 'Plant Type'},
        'clinker-prod-method': {'label': 'Clinker Production Method'},
        'cement-type': {'label': 'Majority Cement Type'},
        'capacity-display': {'label': 'Cement Capacity', 'trailing-label': 'mtpa'},
        'clinker-capacity': {'label': 'Clinker Capacity', 'trailing-label': 'mtpa'},
        'num-kilns-exist': {'label': 'Number of existing kilns'},
        'num-kilns-dev': {'label': 'Number of developing kilns'},
        'color': {'label': 'Cement Color'},
        'owner': {'label': 'Owner'},
        'start-year': {'label': 'Start Date'},
        'location-accuracy': {'label': 'Coordinate Accuracy'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    color_association: {
        field: 'status',
        values: {
            'announced': 'light orange',
            'construction': 'orange',
            'operating': 'green',
            'operating pre-retirement': 'dark green',
            'cancelled': 'red',
            'retired': 'dark red',
            'mothballed': 'light blue',
            'unknown': 'black',
        },
    },

    filters: [
        {
            field: 'status',
            values: ['announced', 'construction', 'operating', 'operating pre-retirement', 'cancelled', 'retired', 'mothballed', 'unknown'],
            values_labels: ['Announced', 'Construction', 'Operating', 'Operating Pre-Retirement', 'Cancelled', 'Retired', 'Mothballed', 'Status unknown'],
            primary: true,
        },
        {
            field: 'plant-type',
            label: 'Plant type',
            values: ['clinker only', 'grinding', 'integrated', 'unknown'],
            values_labels: ['Clinker only', 'Grinding', 'Integrated', 'Unknown'],
        },
        {
            field: 'clinker-prod-method',
            label: 'Clinker Production Method',
            values: ['dry', 'mixed', 'semidry', 'wet', 'unknown', 'N/A'],
            values_labels: ['Dry', 'Mixed', 'Semi-dry', 'Wet', 'Unknown', 'N/A (Grinding Plants)'],
        },
        {
            field: 'cement-type',
            label: 'Majority Cement Type',
            values: ['opc', 'blended', 'blast furnace cement', 'unknown', 'N/A'],
            values_labels: ['OPC', 'Blended', 'Blast furnace cement', 'Unknown', 'N/A (Clinker only)'],
        },
        {
            field: 'color',
            label: 'Cement Color',
            values: ['both', 'grey', 'white', 'unknown', 'N/A'],
            values_labels: ['Grey & White', 'Grey', 'White', 'Unknown', 'N/A (Clinker only)'],
        },
    ],

    includeCapacityByStatusInDetailView: false,
}