var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/GOGPT/2025-08-05/gogpt_map_2025-08-05.geojson',

    /* Labels for describing the assets */
    assetFullLabel: "Gas Units",
    assetLabel: 'units',

    /* define the column and values used for the filter UI. There can be multiple filters listed.
       Additionally a custom `label` can be defined (default is the field),
       and `values_label` (an array matching elements in `values`) */
    filters: [
        {
            field: 'status',
            values: ['operating', 'construction', 'pre-construction', 'announced', 'retired', 'cancelled', 'shelved', 'mothballed'],
        }
    ],

    /* configure the table view, selecting which columns to show, how to label them,
       and designated which column has the link */
    tableHeaders: {
        values: ['name','unit-name', 'owner', 'parent', 'capacity-display', 'status', 'region', 'areas', 'subnational', 'start-year'],
        labels: ['Plant', 'Unit', 'Owner', 'Parent', 'Capacity (MW)', 'Status', 'Region', 'Country/Area(s)', 'Subnational unit (province/state)', 'Start year'],
        clickColumns: ['name'],
        rightAlign: ['unit-name', 'capacity-display', 'start-year'],
        toLocaleString: ['capacity'],
        removeLastComma: ['areas']  // TODO remove?
    },

    /* configure the search box;
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: { 
        'Plant': ['name', 'name-search'],
        'Companies': ['owner', 'parent', 'operator', 'owner-search'],
        'Start Year': ['start-year']
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
        'owner': {'label': 'Owner(s)'},
        'parent': {'label': 'Parent(s)'},
        'tech-type': {'label': 'Turbine/Engine Technology'},
        'fuel': {'label': 'Fuel'},
        'start-year': {'label': 'Start year'},
        'subnational': {'display': 'location'},
        'areas': {'display': 'location'},
    }

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    color: {
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
}