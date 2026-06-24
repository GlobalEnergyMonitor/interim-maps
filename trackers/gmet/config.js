var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/interim_maps/gmet-smp_map_2025-12.geojson',

    /* Labels for describing the assets */
    assetFullLabel: 'Projects',
    assetLabel: 'projects',

    /* configure the table view, selecting which columns to show, how to label them, 
       and designated which column has the link */
    tableHeaders: {
        values: ['name', 'status-display', 'emissions-plume', 'emissions-uncertainty', 'emissions', 'emissions-potential', 'infrastructure-type', 'observation-date', 'subnational', 'all-countries', 'associated-asset', 'associated-asset-url'],
        labels: ['Project', 'Status', 'Plume Emissions (kg/hr)', 'Emissions Uncertainty (kg/hr)', 'Methane Emissions (Tonnes/yr)', 'Potential Emissions for Whole Reserves (Tonnes)', 'Type of Infrastructure', 'Observation Date', 'Subnational', 'Country/Area(s)', 'Nearby Infrastructure', 'Infrastructure Wiki'],
        clickColumns: ['name'],
        rightAlign: ['emissions-plume', 'emissions', 'observation-date'],
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Country/Area(s)': ['all-countries'],
        'Project Type': ['tracker-display'],
        'Project': ['name', 'name-search', 'associated-asset'],
        'Companies': ['operator'],
        'Type of Infrastructure': ['infrastructure-type'],
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

        'data-provider': {'label': 'Satellite Data Provider'},
        'owner': {'label': 'Owner'},
        'operator': {'label': 'Operator'},
        'all-countries': {'label': 'Country/Area(s)'},

        // PLUMES
        'emissions-plume': {'label': 'Emissions', 'trailing-label': 'kg/hr'},
        'emissions-uncertainty': {'label': 'Emissions Uncertainty', 'trailing-label': 'kg/hr'},
        'infrastructure-type': {'label': 'Type of Infrastructure'},
        'associated-asset': { 'label': 'Nearby Infrastructure Project Name'},
        'observation-date': {'label': 'Observation Date'},
        'status-display': {'label': 'Status'},
        'instrument': {'label': 'Instrument'},

        // GCMT, GOIT, LNG
        'emissions': {'label': 'Annual Methane Emissions, if operational', 'trailing-label': 'mt/yr'},
        'capacity-display': {'label': 'Capacity', 'trailing-label': 'units-of-m'},  // dynamic units of measurement from input file

        // GCMT
        'prod-coal': {'label': 'Production', 'trailing-label': 'Mtpa'},

        // GOIT
        'pipeline-length': {'label': 'Length', 'trailing-label': 'km'},

        // GOGET
        'emissions-potential': {'label': 'Potential Emissions for whole reserves', 'trailing-label': 'tonnes'},

        // LNG
        'facility-type': {'label': 'Terminal Facility Type'},

        // Blurbs
        'detail-view-blurb': {'display': 'simple_markup'},
        'attribution': {'display': 'simple_markup'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */
    color_association: {
        field: 'tracker-display',
        label: 'Plume and Infrastructure Projects',
        values: {
            'Reviewed plume (has attribution data)': 'red',
            'Reviewed plume (no attribution data)': 'orange',
            'Oil & gas extraction area': 'blue',
            'Gas pipeline': 'green',
            'Coal mine': 'yellow',
            'LNG import terminal': 'green',
            'LNG export terminal': 'green',
        },
    },

    filters: [
        {
            field: 'tracker-display',
            label: 'Plume and Infrastructure Projects',
            values: ['Oil & gas extraction area', 'Coal mine', 'LNG import terminal', 'LNG export terminal', 'Gas pipeline', 'Reviewed plume (has attribution data)', 'Reviewed plume (no attribution data)'],
            primary: true
        },
        {
            field: 'status-group',
            label: 'Infrastructure Status',
            values: ['operating', 'proposed-plus', 'construction-plus', 'mothballed-plus', 'retired-plus', 'other'],
            values_labels: ['Operating', 'Proposed/Announced/Discovered', 'Construction/In development', 'Mothballed/Idle/Shut in/Abandoned', 'Retired/Closed/Decommissioned/Cancelled', 'Not applicable/UGS'],
        },
    ],

    multiCountry: true,
    countryField: 'all-countries',
    showAllPhases: true,

    minRadius: 2,
    minLineWidth: 1,
    maxLineWidth: 3,
    highZoomMinLineWidth: 4,
    highZoomMaxLineWidth: 32,

    geometries: ['Point', 'LineString', 'Polygon'],
    polygonsAreIndependent: false,

    includeCapacityByStatusInDetailView: false
}
