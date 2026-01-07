var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    csv: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/gctt/Coal%20Terminals-map-file-2025-01-15.csv',

    /* Labels for describing the assets */
    assetFullLabel: "Coal Terminals",
    assetLabel: 'terminals',

    /* define the column and values used for the filter UI. There can be multiple filters listed. 
       Additionally a custom `label` can be defined (default is the field),
       and `values_label` (an array matching elements in `values`) */
    filters: [
        {
            field: 'status',
            values: ['operating', 'construction', 'proposed', 'retired', 'cancelled', 'shelved', 'mothballed'],
            primary: true,
        },
    ],

    /* configure the table view, selecting which columns to show, how to label them, 
       and designated which column has the link. Remember there are append value and display value options*/
    tableHeaders: {
        values: ['name', 'name-other', 'owner', 'parent-port', 'capacity_display', 'status', 'start-year', 'end-year', 'region', 'areas', 'subnational'],
        labels: ['Coal terminal name', 'Coal terminal name (detail or other)', 'Owner', 'Parent port', 'Capacity (Mt)', 'Status', 'Start year', 'Retired year', 'Region', 'Country/Area', 'Subnational unit (province, state)'],
        clickColumns: ['name'],
        rightAlign: ['capacity_display', 'start-year', 'end-year'],
        toLocaleString: ['capacity'],
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Terminal name': ['name', 'name-search'],
        'Companies': ['owner', 'owner-search'],
        'Start Year': ['start-year'],
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
        'name-other': {'label': 'Coal Terminal Name (detail or other)'},
        'owner': {'label': 'Owner'},
        'parent-port': {'label': 'Parent Port'},
        'start-year': {'label': 'Start Year'},
        'end-year': {'label': 'Retired Year'},
        'subnational': {'display': 'location'},
        'areas': {'display': 'location'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    color_association: {
        field: 'status',
        values: {
            'operating': 'red',
            'construction': 'blue',
            'proposed': 'green',
            'retired': 'grey',
            'cancelled': 'grey',
            'mothballed': 'grey',
            'shelved': 'grey',
        },
    },

    capacityLabel: '(Mt)',
}
