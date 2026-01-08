var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/giomt/2025-10/giomt_map_2025-10-17.geojson',

    /* Labels for describing the assets */
    assetFullLabel: 'Iron Ore assets',
    assetLabel: 'assets',

    /* configure the table view, selecting which columns to show, how to label them, 
       and designated which column has the link */
    // TODO make it so all string showing capacity type value is to locale string with commas currently Total reserves for giomt is string but no commas
    // maybe change it in site.js file
    tableHeaders: {
        values: ['name', 'name-noneng', 'capacity', 'total-reserves-proven-and-probable', 'total-resource-inferred', 'status', 'owner', 'parent', 'areas'],
        labels: ['Asset name', 'Asset Name (other language)', 'Design Capacity (ttpa)', 'Reserve (thousand tonnes)', 'Resource (thousand tonnes)', 'Status', 'Owner', 'Parent', 'Country/Area(s)'],
        clickColumns: ['name'],
        rightAlign: ['capacity', 'total-reserves-proven-and-probable', 'total-resource-inferred'],
        toLocaleString: [''],
        removeLastComma: ['areas'],
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Asset name': ['name', 'noneng-name', 'name-search'],
        'Companies': ['owner', 'parent', 'parent-gem-id', 'owner-noneng', 'owner-gem-id', 'owner-search', 'parent-search'],
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
        'capacity-display': {'label': 'Design Capacity (ttpa)'},
        'location-display': {'display': 'location'},
        'total-reserves-proven-and-probable': {'label': 'Reserves (thousand tonnes)'},
        'total-resource-inferred': {'label': 'Resources (thousand tonnes)'},
        'owner': {'label': 'Owner'},
        'parent': {'label': 'Parent'},
        'location-accuracy': {'label': 'Location Accuracy'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    site_colors: {  // TODO could these be standardized and added to site-config.js?
        'red': '#c74a48',
        'blue': '#5c62cf',
        'green': '#4c9d4f',
        'grey': '#8f8f8e',
        'orange': '#fd7e14',
        'black': '#000000'
    },
    color_association: {
        field: 'status',
        values: {
            'operating': 'red',
            'proposed': 'green',
            'retired': 'blue',
            'unknown': 'grey',
            'cancelled': 'black',
            'shelved': 'black',
            'mothballed': 'orange',
        },
    },

    filters: [
        {
            field: 'status',
            label: 'Operating Status',
            values: ['operating', 'proposed', 'mothballed', 'retired', 'cancelled', 'shelved', 'unknown'],
            values_labels: ['Operating', 'Proposed', 'Mothballed', 'Retired', 'Cancelled', 'Shelved', 'Unknown'],
        },
    ],

    minRadius: 3,
    maxRadius: 15,
    capacityLabel: '',
    showCapacityTable: false,
    maxCapacityLabel: 'Design Capacity (TTPA)',  // TODO what is this?
}
