var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    csv: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/goget/Oil%20&%20Gas%20Extraction-map-file-2025-02-26.csv',

    /* Labels for describing the assets */
    assetFullLabel: 'Oil & Gas Extraction Areas',
    assetLabel: 'areas',

    /* configure the table view, selecting which columns to show, how to label them, 
       and designated which column has the link */
    tableHeaders: {
        values: ['wiki-name', 'operator', 'status-display', 'areas', 'subnational', 'prod-oil', 'prod-gas', 'prod-year-oil', 'prod-year-gas', 'prod-start-year',],
        labels: ['Extraction Area', 'Operator', 'Status','Country/Area(s)', 'Subnational unit (province/state)', 'Production - Oil (Million bbl/y)', 'Production - Gas (Million m³/y)', 'Production Year - Oil', 'Production Year - Gas', 'Production start year'],
        clickColumns: ['wiki-name'],
        rightAlign: ['wiki-name', 'discovery-year', 'fid-year', 'prod-start-year', 'prod-oil', 'prod-gas', 'prod-year-oil', 'prod-year-gas'],
        toLocaleString: ['prod-oil', 'prod-gas'],
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Extraction Area': ['wiki-name'],
        'Companies': ['owner', 'operator', 'parent'],
        'Discovery Year': ['discovery-year'],
        'Production start year': ['production-start-year'],
    },

    /* define fields and how they are displayed. 
      `'display': 'heading'` displays the field in large type
      `'display': 'range'` will show the minimum and maximum values.
      `'display': 'join'` will join together values with a comma separator
      `'display': 'location'` will show the fields over the detail image
      `'label': '...'` prepends a label. If a range, two values for singular and plural.
    */
    detailView: {
        'wiki-name': {'display': 'heading'},
        'location-accuracy': {'label': 'Location Accuracy'},
        'operator': {'label': 'Operator'},
        'discovery-year': {'label': 'Discovery Year'},
        'fid-year': {'label': 'FID Year'},
        'prod-start-year': {'label': 'Production Start Year'},
        'prod-year-oil': {'label': 'Production Year - Oil'},
        'prod-year-gas': {'label': 'Production Year - Gas'},
        'prod-oil': {'label': 'Production - Oil (Million bbl/y)'},
        'prod-gas': {'label': 'Production - Gas (Million m³/y)'},
        'subnational': {'display': 'location'},
        'areas': {'display': 'location'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    site_colors: {  // TODO could these be standardized and added to site-config.js?
        'red': '#c74a48',
        'blue': '#5c62cf',
        'green': '#4c9d4f',
        'grey': '#8f8f8e',
        'black': '#000000',
    },
    color_association: {
        field: 'status',
        values: {
            'operating': 'red',
            'in-development': 'blue',
            'discovered': 'blue',
            'shut-in': 'green',
            'decommissioned': 'green',
            'cancelled': 'green',
            'abandoned': 'grey',
            'UGS': 'grey',
            'not found': 'black'
        }
    },

    filters: [
        {
            field: 'status',
            values: ['operating', 'in-development', 'discovered', 'shut-in', 'decommissioned', 'cancelled', 'abandoned', 'UGS', ''],
            values_labels: ['Operating', 'In development', 'Discovered', 'Shut in', 'Decommissioned', 'Cancelled', 'Abandoned', 'UGS', 'Not found'],
        },
    ],

    nameField: 'wiki-name',
    countryFile: './countries.js',
    showMaxCapacity: false,
    // capacityLabel: 'million boe/y',
    capacityLabel: '',
}
