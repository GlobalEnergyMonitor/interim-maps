// TODO heavy lift needed

var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/refactor_testing/gmet_map_2026-01-30.geojson',

    /* Labels for describing the assets */
    assetFullLabel: 'Projects',
    assetLabel: 'projects',

    /* configure the table view, selecting which columns to show, how to label them, 
       and designated which column has the link */
    tableHeaders: {
        values: ['name', 'status', 'plume-emissions', 'emission-uncertainty', 'emissions-terminals', 'tonnesyr-pipes-emissions', 'tonnes-goget-reserves-emissions', 'mtyr-gcmt-emissions', 'typeinfra', 'date', 'subnat', 'areas', 'infra-name', 'geminfrawiki'],
        labels: ['Project', 'Status', 'Emissions (kg/hr)', 'Emissions Uncertainty (kg/hr)', 'Methane emissions if fully operational', 'Emissions if Operational (tonnes/yr)', 'Potential Emissions for whole reserves (tonnes)', 'Coal Mine Methane Emissions Estimate (mt/yr)', 'Type of Infrastructure', 'Observation Date', 'Subnational', 'Country/Area(s)', 'Nearby Infrastructure Project Name', 'Infrastructure Wiki'],
        clickColumns: ['name'],
        rightAlign: ['plume-emissions', 'date'],
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Country/Area(s)': ['areas'],
        'Project Type': ['legend-filter'],
        'Project': ['name', 'name-search', 'infra-name', 'geminfrawiki'], 
        'Companies': ['operator'],
        'Type of Infrastructure': ['typeInfra'],
        'Coordinates': ['geometry', 'lat', 'lng'],
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

        'satdataprovider': {'label': 'Satellite Data Provider'},
        'owner': {'label': 'Owner'},
        'operator': {'label': 'Operator'},
        // EMISSIONS PLUMES WORKING
        'plume-emissions': {'label': 'Emissions', 'trailing-label': 'kg/hr'},

        'emission-uncertainty': {'label': 'Emissions Uncertainty', 'trailing-label': 'kg/hr'},
        'typeinfra': {'label': 'Type of Infrastructure'},
        'infra-name': { 'label': 'Nearby Infrastructure Project Name'},

        // EMISSIONS COAL MINE WORKING
        'mtyr-gcmt-emissions': {'label': 'Coal Mine Methane Emissions Estimate', 'trailing-label': 'mt/yr'},

        'capacity-output': {'label': 'Coal Output', 'trailing-label': '(Annual, Mst)'},
        'capacity-prod': {'label': 'Production', 'trailing-label': 'Mtpa'},

        // EMISSIONS PIPELINEtonnesyr-pipes_emissions
        'tonnesyr-pipes_emissions': {'label': 'Emissions if Operational', 'trailing-label': 'tonnes/yr'},

        'pipe-length': {'label': 'Length', 'trailing-label': 'km'},
        'capacitybcm/y': {'label': 'Capacity', 'trailing-label': 'bcm/y'},
        'capacityinmtpa': {'label': 'Capacity', 'trailing-label': 'MTPA'},

        // EMISSIONS GOGET WORKING
        'tonnes-goget-reserves-emissions': {'label': 'Potential Emissions for whole reserves', 'trailing-label': 'tonnes'},
        
        // EMISSIONS LNG TERM
        'emissions-terminals': {'label': 'Methane emissions if fully operational'},//'Annual methane emissions estimate if operational (mt/year)'},
        
        'inportexport': {'label': 'Terminal Facility Type'},
        'date': {'label': 'Observation Date'},
        'status': {'label': 'Status'},
        'instrument': {'label': 'Instrument'},
        'all-countries': {'label': 'Country/Area(s)'},

        'infra-wiki-md': {'display': 'simple_markup'},
        'carbon-mapper-md': {'display': 'simple_markup'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */
    color_association: {
        field: 'tracker-display',
        label: 'Plume and Infrastructure Projects',
        values: {
            'Reviewed plumes (has attribution data)': 'red',
            'Reviewed plumes (no attribution data)': 'orange',
            'Oil & gas extraction areas': 'blue',
            'Gas pipelines': 'green',
            'Coal mines': 'yellow',
            'LNG import terminal': 'green',
            'LNG export terminal': 'green',
        },
    },

    filters: [
        {
            field: 'tracker-display',
            label: 'Plume and Infrastructure Projects',
            values: ['Oil & gas extraction areas', 'Coal mines', 'LNG import terminal', 'LNG export terminal', 'Gas pipelines','Reviewed plumes (has attribution data)', 'Reviewed plumes (no attribution data)'],
            primary: true
        },
        {
            field: 'status-group',
            label: 'Infrastructure Status',
            values: ['operating', 'proposed-plus', 'construction-plus', 'mothballed-plus', 'retired-plus', 'other'],
            values_labels: ['Operating', 'Proposed/Announced/Discovered', 'Construction/In development', 'Mothballed/Idle/Shut in/Abandoned', 'Retired/Closed/Decommissioned/Cancelled', 'Not applicable/UGS'],
        },
    ],

    capacityLabel: '', // for gmet that has no capacity but only emissions data

    multiCountry: true,
    countryField: 'all-countries',
    showAllPhases: true,

    minRadius: 2,
    minLineWidth: 1,
    maxLineWidth: 3,
    highZoomMinLineWidth: 4,
    highZoomMaxLineWidth: 32,

    geometries: ['Point', 'LineString'],

    showMaxCapacity: false,
    includeCapacityByStatusInDetailView: false
}
