var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/ggft/2025-12/ggft_map_2025-12-19.geojson',

    /* Labels for describing the assets */
    assetFullLabel: 'Units',
    assetLabel: 'units',

    /* configure the table view, selecting which columns to show, how to label them,
       and designated which column has the link */
    tableHeaders: {
        values: ['fin', 'name', 'unitname', 'debtequityelse', 'owner', 'parent', 'importexport', 'opstatus', 'areas', 'startyear', 'capacitymw', 'capacitymtpa'],
        labels: ['Financier', 'Project Name', 'Unit Name', 'Financing Type', 'Owner', 'Parent', 'Terminal Facility Type', 'Operational Status', 'Country/Area(s)', 'Start year', 'Capacity (MW)', 'Capacity (MTPA)'],
        clickColumns: ['name'],
        rightAlign: ['startyear'],
    },

    /* configure the search box;
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Project': ['name', 'othername', 'localname', 'name-search', 'unit-name', 'unitid', 'pid'],
        'Project Financier': ['owner', 'parent', 'fin',  'owner-search', 'parent-search'],
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
        'debt-project-financing': {'label': 'Debt Project Financing ($ million)'},
        'equity-project-financing': {'label': 'Equity Project Financing ($ million)'},
        'startyear': {'label': 'Start Year'},
        'fin': {'label': 'Financier'},
        'opstatus': {'label': 'Operating Status'},
        'owner': {'label': 'Owner'},
        'parent': {'label': 'Parent'},
        'areas': {'display': 'location'},
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
            field: 'infra-filter',
            label: 'Infrastructure Type',
            values: ['Gas Power Plants', 'LNG Terminals'],
            // values_hover_text: ['hover text for fuels', '', '']
            // field_hover_text: 'Hydrogen projects are classified as either planning to blend hydrogen into methane gas or use 100% hydrogen. For the projects that plan to use hydrogen but do not specify a percentage, it is assumed they are blending. Blended projects only appear as hydrogen projects and do not also appear as methane projects, though they will use both fuel types.',
        },
        {
            field: 'financing-bucket',
            label: ' Total known project finance',
            values: ['na', 'low', 'mid-low', 'mid', 'mid-high', 'high'],
            values_labels: ['Not available', '$1-500 million', '$501-1000 million', '$1001-1500 million', '$1501-2000 million', '$2001+ million'], //'$2001-2500 million'
            // values_hover_text: ['hover tesct for fuels', '', '']
            // field_hover_text: 'GEM assesses whether hydrogen projects have met criteria (specific to each infrastructure type) demonstrating progress toward completion, since many hydrogen projects lack core details or commitments from stakeholders. For more information on these criteria, see the <a href="https://globalenergymonitor.org/projects/europe-gas-tracker/methodology/">EGT methodology page</a>'
        },
    ],

    capacityLabel: 'million dollars', // bug with solo ones showing weird status and capacity

    countryField: 'all-countries',
    countryFile: '../../trackers/region-Europe/countries.json',

    allCountrySelect: false,  // why false? Can't revert to "all"  // todo why is false even an option??

    includeCapacityByStatusInDetailView: false,

    minRadius: 4,
    showAllPhases: true,  // todo verify
}