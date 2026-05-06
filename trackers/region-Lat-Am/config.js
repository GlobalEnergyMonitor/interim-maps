var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/refactor_testing/lat-am_map_2026-05-06.geojson',

    /* Labels for describing the assets */
    assetFullLabel: 'Units / Phases / Pipelines',
    assetLabel: 'units',

    /* configure the table view, selecting which columns to show, how to label them,
       and designated which column has the link */
    tableHeaders: {
        values: ['name', 'unit-name', 'owner', 'parent', 'capacity-table', 'units-of-m', 'status', 'all-countries', 'start-year', 'prod-oil', 'prod-year-oil', 'prod-gas', 'prod-year-gas', 'prod-coal', 'tracker-display',],
        labels: ['Name', 'Unit', 'Owner', 'Parent', 'Capacity', '', 'Status', 'Country/Area(s)', 'Start year', 'Production Oil (million bbl/y)', 'Production year (oil)', 'Production Gas (Million m³/y)', 'Production year (gas)', 'Production Coal (Mt)', 'Facility Type'],
        clickColumns: ['name'],
        rightAlign: ['unit-name', 'capacity-table', 'prod-oil', 'prod-gas', 'start-year', 'prod-year-oil', 'prod-year-gas'],
    },

    /* configure the search box;
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Project': ['name', 'name-search', 'project-id'],
        'Companies': ['owner', 'parent', 'owner-search', 'parent-search'],
        'Start Year': ['start-year'],
        'Infrastructure Type': ['tracker-display'],
        'Status': ['status-display'],
        'Province/State': ['subnational']
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

        'prod-oil': {'label': 'Liquids Production', 'trailing-label': 'million bbl/y'},
        'prod-year-oil': {'label': 'Production Year - Oil'},
        'prod-gas': {'label': 'Gas Production', 'trailing-label': 'million m³/y'},
        'prod-year-gas': {'label': 'Production Year - Gas'},
        'prod-hydrocarbons': {'label': 'Unspecified Hydrocarbons Production', 'trailing-label': 'million boe/y'},
        'prod-year-hydrocarbons': {'label': 'Production Year - Hydrocarbons (unspecified)'},
        'prod-coal': {'label': 'Production - Coal', 'trailing-label': 'million tonnes coal/y'},

        'start-year': {'label': 'Start Year'},
        'owner': {'label': 'Owner'},
        'parent': {'label': 'Parent'},
        'river': {'label': 'River/Watercourse'},

        'tracker-display': {'label': 'Type'},
        'all-countries': {'label': 'Country/Area(s)'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    color_association: {
        field: 'tracker-display',
        values: {
            'Coal power station': 'blue',
            'Oil & gas power station': 'blue',
            'Bioenergy power station': 'blue',
            'Nuclear power plant': 'blue',
            'Solar power station': 'blue',
            'Wind power station': 'blue',
            'Hydropower plant': 'blue',
            'Geothermal power plant': 'blue',

            'Oil pipeline': 'green',
            'Gas pipeline': 'green',
            'LNG import terminal': 'green',
            'LNG export terminal': 'green',
            'Coal terminal': 'green',

            'Oil & gas extraction area': 'red',
            'Coal mine': 'red',
        }
    },

    filters: [
        {
            field: 'tracker-display',
            values: ['Coal power station', 'Oil & gas power station', 'Bioenergy power station', 'Nuclear power plant', 'Solar power station', 'Wind power station', 'Hydropower plant', 'Geothermal power plant', 'Oil pipeline', 'Gas pipeline', 'LNG import terminal', 'LNG export terminal', 'Coal terminal', 'Oil & gas extraction area', 'Coal mine'],
            primary: true
        },
        {
            field: 'status-group',
            label: 'Status',
            values: ['operating', 'proposed-plus', 'pre-construction-plus', 'construction-plus', 'retired-plus', 'cancelled', 'mothballed-plus', 'shelved', 'other'],
            values_labels: ['Operating', 'Proposed/Announced/Discovered', 'Pre-construction/Pre-permit/Permitted', 'Construction/In development', 'Retired/Closed/Decommissioned', 'Cancelled', 'Mothballed/Idle/Shut in', 'Shelved', 'Other or Not Found']
        },
    ],

    countryField: 'all-countries',
    countryFile: '../../trackers/region-Lat-Am/countries.json',
    
    geometries: ['Point', 'LineString'],
    center: [-60, 0],
    zoomFactor: 1.4,
    img_detail_zoom: 10,

    minLineWidth: 1,
    maxLineWidth: 3,
    highZoomMinLineWidth: 1,
    highZoomMaxLineWidth: 3,
}