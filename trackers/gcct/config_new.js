var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson:  'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/gcct/2025-07/gcct_map_2025-07-15.geojson',

    /* Labels for describing the assets */
    assetFullLabel: 'Projects',
    assetLabel: 'projects',

    /* configure the table view, selecting which columns to show, how to label them,
       and designated which column has the link */
    tableHeaders: {
        values: ['name', 'owner', 'status', 'capacity', 'start-year', 'plant-type', 'prod-type', 'subnational', 'areas'],
        labels: ['Project', 'Owner', 'Status', 'Cement Capacity (mmtpa)', 'Start date', 'Plant type', 'Production type', 'Subnational Unit', 'Country/Area'],
        clickColumns: ['name'],
        rightAlign: [],
        removeLastComma: ['areas'],  // TODO remove?
        toLocaleString: ['capacity'],
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Project': ['name', 'name-noneng', 'name-other', 'name-other-noneng', 'name-search'],
        'Companies': ['owner', 'parent', 'owner-noneng', 'owner-gem-id'],
        'Type ': ['plant-type', 'prod-type', 'color'],
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
        'plant-type': {'label': 'Plant Type'},
        'prod-type': {'label': 'Production Type'},
        'capacity': {'label': 'Cement Capacity (mmtpa)'},
        'clinker-capacity': {'label': 'Clinker Capacity (mmtpa)'},
        'cement-type': {'label': 'Cement Type'},
        'color': {'label': 'Cement Color'},
        'owner': {'label': 'Owner'},
        'start-year': {'label': 'Start date'},
        'location-accuracy': {'label': 'Coordinate Accuracy'},
        'subnational': {'display': 'location'},
        'areas': {'display': 'location'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    site_colors: {  // TODO could these be standardized and added to site-config.js?
        'red': '#c74a48',
        'blue': '#5c62cf',
        'green': '#4c9d4f',
        'orange': '#FF8C00',
        'black': '#000000',
    },
    color_association: {
        field: 'status', // prod type
        values: {
            'announced': 'orange',
            'construction': 'orange',
            'operating': 'green',
            'operating-pre-retirement': 'green',
            'cancelled': 'red',
            'retired': 'red',
            'mothballed': 'blue',
            'unknown': 'black',
        },
    },

    filters: [
        {
            field: 'status',
            values: ['announced', 'construction', 'operating', 'operating pre-retirement', 'cancelled', 'retired', 'mothballed', 'unknown'],
            values_labels: ['Announced', 'Construction', 'Operating', 'Operating Pre-Retirement', 'Cancelled', 'Retired', 'Mothballed', 'Not Found'],
            primary: true
        },
        {
            field: 'plant-type',
            label: 'Plant type',
            values: ['clinker only', 'grinding', 'integrated', ''],
            values_labels: ['Clinker only', 'Grinding', 'Integrated', 'Not found']
        },
        {
            field: 'prod-type',
            label: 'Clinker Production Method',
            values: ['dry', 'mixed', 'semidry', 'wet', '', 'n/a'],
            values_labels: ['Dry', 'Mixed', 'Semi-dry', 'Wet', 'Not found', 'N/A (Grinding Plants)']
        },
        {
            field: 'color',
            label: 'Cement Color',
            values: ['both', 'grey', 'white', ''],
            values_labels: ['Grey & White', 'Grey', 'White', 'Not found']
        }
    ],

    multiCountry: true,
    // maxCapacityLabel: 'millions metric tonnes per annum',
    capacityLabel: '',
}