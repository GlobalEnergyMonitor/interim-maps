var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/GBPT/2025-09/bioenergy_map_2025-09-22.geojson',

    /* Labels for describing the assets */
    assetFullLabel: "Bioenergy Power Units",
    assetLabel: 'units',

    /* configure the table view, selecting which columns to show, how to label them, 
       and designated which column has the link */
    tableHeaders: {
        values: ['name', 'capacity', 'status', 'owner', 'operator', 'areas', 'fuel'],
        labels: ['Project name', 'Capacity (MW)', 'Status', 'Owner', 'Operator', 'Country/Area(s)', 'Fuel'],
        clickColumns: ['name'],
        rightAlign: ['capacity'],
        toLocaleString: ['capacity'],
        makeCase: ['name', 'status', 'owner', 'areas'],
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Project': ['name', 'name-search'],
        'Companies': ['owner', 'operator', 'owner-search'],
        'Status': ['status'],
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
        'owner': {'label': 'Owner'},
        'operator': {'label': 'Operator'},
        'location-accuracy': {'label': 'Location Accuracy'},
        'location-display': {'display': 'location'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    color_association: {
        field: 'status',
        values: {
            'operating': 'red',
            'pre-construction': 'green',
            'construction': 'blue',
            'retired': 'grey',
            'cancelled': 'grey',
            'shelved': 'grey',
            'mothballed': 'grey',
            'announced': 'green',
        },
    },

    capacityLabel: 'Capacity (MW)',
}
