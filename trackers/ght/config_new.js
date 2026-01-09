var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/ghpt/ghpt_2025-04-23.geojson',

    /* Labels for describing the assets */
    assetFullLabel: "Hydropowered Stations",
    assetLabel: 'units',

    /* configure the table view, selecting which columns to show, how to label them, 
       and designated which column has the link */
    tableHeaders: {
        values: ['name', 'capacity', 'tech-type', 'status', 'start-year', 'owner', 'operator', 'areas', 'area2'],
        labels: ['Project name', 'Capacity (MW)', 'Technology type', 'Status', 'Start year', 'Owner', 'Operator', 'Country/Area 1', 'Country/Area 2'],
        clickColumns: ['name'],
        rightAlign: ['capacity', 'start-year'],
        removeLastComma: ['areas'],  // TODO remove?
        toLocaleString: ['capacity'],
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Project': ['name', 'name-search'],
        'Companies': ['owner', 'operator', 'owner-noneng', 'operator-noneng', 'owner-search'],
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
        'owner': {'label': 'Owner'},
        'operator': {'label': 'Operator'},
        'start-year': {'label': 'Start Year'},
        'areas' : {'label': 'Country/Area 1'},
        'binational': {'label': 'Binational'},
        'area2' : {'label': 'Country/Area 2'},
        'location-accuracy': {'label': 'Location Accuracy'},
        'location-display': {'display': 'location'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    multiCountry: true,
}
