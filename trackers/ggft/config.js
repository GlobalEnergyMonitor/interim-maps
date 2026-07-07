var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/interim_maps/ggft_map_2026-07.geojson',

    /* Labels for describing the assets */
    assetFullLabel: 'Units',
    assetLabel: 'units',

    /* configure the table view, selecting which columns to show, how to label them,
       and designated which column has the link */
    tableHeaders: {
        values: ['financier', 'name', 'unit-name', 'financing-type', 'financing-advisor', 'epc-contractor', 'power-purchaser', 'owner', 'parent', 'facility-type', 'status', 'country-area1', 'start-year', 'capacity-mw', 'capacity-mtpa'],
        labels: ['Financier', 'Project Name', 'Unit Name', 'Financing Type', 'Loan Arranger / Financial Advisor', 'EPC Contractor', 'Power Purchaser', 'Owner', 'Parent', 'Terminal Facility Type', 'Operational Status', 'Country/Area(s)', 'Start year', 'Capacity (MW)', 'Capacity (MTPA)'],
        clickColumns: ['name'],
        rightAlign: ['startyear'],
    },

    /* configure the search box;
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Project': ['name', 'name-other', 'name-noneng', 'unit-name', 'unit-id', 'project-id'],
        'Project Financier': ['owner', 'parent', 'financier'],
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

        'start-year': {'label': 'Start Year'},
        'financier': {'label': 'Financier'},
        'status': {'label': 'Operating Status'},
        'owner': {'label': 'Owner'},
        'parent': {'label': 'Parent'},

        'financier-details': {
            'table': 'Financier Details',
            'tableHeaders': {
                'unit_id': 'GEM Unit ID',
                'financing_status': 'Financing status',
                'financier': 'Financier name',
                'capacity': 'Amount (Million $USD)',
                'financing_type': 'Financing type',
                'financing_advisor': 'Loan Arranger / Financial Advisor',
                'epc_contractor': 'EPC Contractor',
                'power_purchaser': 'Power Purchaser'
            },
            'excludeEmptyColumns': true
        },
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    statusField: 'financing-status',
    statusDisplayField: 'financing-status',

    color_association: {
        field: 'financing-status',
        values: {
            'Known': 'red',
            'Unknown': 'blue'
        }
    },

    filters: [
        {
            field: 'financing-status',
            label: 'Financing Status',
            values: ['Known', 'Unknown'],
            values_labels: ['Known project finance', 'No known project finance'],
            primary: true
        },
        {
            field: 'tracker-display',
            label: 'Infrastructure Type',
            values: ['Gas Power Plant', 'LNG Terminal'],
        },
        {
            field: 'financing-bucket',
            label: 'Total known project finance',
            values: ['na', 'low', 'mid-low', 'mid', 'mid-high', 'high'],
            values_labels: ['Not available', '$1-500 million', '$501-1000 million', '$1001-1500 million', '$1501-2000 million', '$2001+ million'],
            // field_hover_text: 'GEM assesses whether hydrogen projects have met criteria (specific to each infrastructure type) demonstrating progress toward completion, since many hydrogen projects lack core details or commitments from stakeholders. For more information on these criteria, see the <a href="https://globalenergymonitor.org/projects/europe-gas-tracker/methodology/">EGT methodology page</a>'
        },
    ],

    capacityLabel: 'million dollars', // bug with solo ones showing weird status and capacity

    countryField: 'all-countries',
    countryFile: '../../trackers/ggft/countries.json',

    includeCapacityByStatusInDetailView: false,
    scaleCircleColorsProportionally: false,

    minRadius: 4,
}