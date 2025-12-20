// TODO lots of verifying to do still

var config = {
    /* name of the data file; use key `csv` if data file is CSV format, use key `geojson` if data file is geoJSON format */
    geojson: 'https://publicgemdata.nyc3.cdn.digitaloceanspaces.com/gist/2025-10/gist_map_2025-10-07.geojson',

    /* Labels for describing the assets */
    assetFullLabel: 'Iron and Steel Plants',
    assetLabel: 'plants',
    gistUnit: true,
    showToolTip: true,

    /* define the column and values used for the filter UI. There can be multiple filters listed.
       Additionally a custom `label` can be defined (default is the field),
       and `values_label` (an array matching elements in `values`) */
    filters: [
        {
            field: 'prod-method-tier',
            label: 'Production method',
            /* values need to be specified for ordering */
            values: ['Electric', 'ElectricOxygen','Oxygen', 'IronmakingBF', 'IntegratedBFandDRI', 'IronmakingDRI',
                    'IntegratedDRI', 'IntegratedBF','Integratedunknown','Steelotherunspecified','Ironotherunspecified'],
            values_labels: ['Electric','Electric, oxygen','Oxygen','Ironmaking (BF)', 'Integrated (BF & DRI)', 'Ironmaking (DRI)',
                    'Integrated (DRI)', 'Integrated (BF)', 'Integrated unknown', 'Steel other/unspecified', 'Iron other/unspecified'],
            primary: true,
            field_hover_text: 'For full descriptions of steelmaking route categories, see the <a href="https://globalenergymonitor.org/projects/global-iron-and-steel-tracker/frequently-asked-questions/"> FAQs</a>.',
        },
        // do not use status-legend since it is for multi tracker maps
        {
            field: 'status',
            label: 'Plant status',
            values: ['announced', 'cancelled', 'construction', 'mothballed', 'operating', 'operating-pre-retirement', 'retired'], //'mothballed-pre-retirement',
            values_labels: ['Announced', 'Cancelled', 'Construction', 'Mothballed', 'Operating', 'Operating Pre-Retirement', 'Retired'], // 'Mothballed Pre-Retirement', 
            field_hover_text: "Status reflects the plant-level status. Some capacities (e.g., announced expansions at a plant that already operates capacity) may not appear under their specific category if the overall plant status is different.",
        },
    ],
    
    /* configure the table view, selecting which columns to show, how to label them, 
       and designated which column has the link */
    tableHeaders: {
        values: ['name', 'owner', 'parent', 'status-display', 'start-year', 'prod-method-tier-display', 'main-production-equipment', 'subnational', 'areas'],
        labels: ['Plant', 'Owner', 'Parent', 'Plant Status', 'Start date', 'Production Method', 'Main Production Equipment', 'Subnational Unit', 'Country/Area'],
        clickColumns: ['name'],
        rightAlign: [],
        toLocaleString: ['capacity'], // not displayed
        removeLastComma: ['areas'],  // TODO remove?
    },

    /* configure the search box; 
       each label has a value with the list of fields to search. Multiple fields might be searched */
    searchFields: {
        'Plant': ['name', 'name-noneng', 'name-search'],
        'Companies': ['owner', 'parent', 'owner-noneng', 'parent-gem-id', 'owner-gem-id', 'owner-search'],
        'Production Method': ['prod-method-tier-display', 'prod-method-tier'], //'main-production-equipment'
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
        'prod-method-tier-display': {'label': 'Production Method'},
        'parent': {'label': 'Parent'},
        'owner': {'label': 'Owner'},
        'start-year': {'label': 'Start date'},
        'location-accuracy': {'label': 'Coordinate Accuracy'},
        'announced-nominal-bf-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Announced BF capacity (ttpa)'},
        'announced-nominal-bof-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Announced BOF steel capacity (ttpa)'},
        'announced-nominal-dri-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Announced DRI capacity (ttpa)'},
        'announced-nominal-eaf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Announced EAF steel capacity (ttpa)'},
        'announced-other/unspecified-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Announced other/unspecified steel capacity (ttpa)'},
        'cancelled-nominal-bf-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Cancelled BF capacity (ttpa)'},
        'cancelled-nominal-bof-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Cancelled BOF steel capacity (ttpa)'},
        'cancelled-nominal-dri-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Cancelled DRI capacity (ttpa)'},
        'cancelled-nominal-eaf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Cancelled EAF steel capacity (ttpa)'},
        'cancelled-other/unspecified-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Cancelled other/unspecified steel capacity (ttpa)'},
        'construction-nominal-bf-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Construction BF capacity (ttpa)'},
        'construction-nominal-bof-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Construction BOF steel capacity (ttpa)'},
        'construction-nominal-dri-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Construction DRI capacity (ttpa)'},
        'construction-nominal-eaf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Construction EAF steel capacity (ttpa)'},
        'construction-other/unspecified-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Construction other/unspecified steel capacity (ttpa)'},
        'mothballed-nominal-bf-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Mothballed BF capacity (ttpa)'},
        'mothballed-nominal-bof-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Mothballed BOF steel capacity (ttpa)'},
        'mothballed-nominal-dri-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Mothballed DRI capacity (ttpa)'},
        'mothballed-nominal-eaf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Mothballed EAF steel capacity (ttpa)'},
        'mothballed-nominal-ohf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Mothballed OHF steel capacity (ttpa)'},
        'mothballed-other/unspecified-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Mothballed other/unspecified steel capacity (ttpa)'},
        'mothballed-pre-retirement-nominal-bf-capacity-(ttpa)':{'display': 'gist-unit-level','label': 'Mothballed pre-retirement BF capacity (ttpa)'},
        'operating-nominal-bf-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Operating BF capacity (ttpa)'},
        'operating-nominal-bof-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Operating BOF steel capacity (ttpa)'},
        'operating-nominal-dri-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Operating DRI capacity (ttpa)'},
        'operating-nominal-eaf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Operating EAF steel capacity (ttpa)'},
        'operating-nominal-ohf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Operating OHF steel capacity (ttpa)'},
        'operating-other/unspecified-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Operating other/unspecified steel capacity (ttpa)'},
        'operating-pre-retirement-nominal-bf-capacity-(ttpa)': {'display': 'gist-unit-level','label':'Operating pre-retirement BF capacity (ttpa)'},
        'operating-pre-retirement-nominal-bof-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Operating pre-retirement BOF steel capacity (ttpa)'},
        'operating-pre-retirement-nominal-dri-capacity-(ttpa)' :{'display': 'gist-unit-level','label':'Operating pre-retirement DRI capacity (ttpa)'},
        'operating-pre-retirement-nominal-eaf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Operating pre-retirement EAF steel capacity (ttpa)'},
        'operating-pre-retirement-other/unspecified-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Operating pre-retirement other/unspecified steel capacity (ttpa)'},
        'retired-nominal-bf-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Retired BF capacity (ttpa)'},
        'retired-nominal-bof-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Retired BOF steel capacity (ttpa)'},
        'retired-nominal-eaf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Retired EAF steel capacity (ttpa)'},
        'retired-nominal-ohf-steel-capacity-(ttpa)': {'display': 'gist-unit-level','label': 'Retired OHF steel capacity (ttpa)'},

        'subnational': {'display': 'location'},
        'areas': {'display': 'location'},
    },

    /* ---------------------------- FIELDS TO OVERWRITE FROM site-config.js ---------------------------- */

    colors: {  // TODO could these be standardized and added to site-config.js?
        'light red': '#f28b82',
        'red': '#c74a48',
        'light blue': '#5dade2',
        'blue': '#5c62cf',
        'green': '#4c9d4f',
        'light green': '#66c26e',
        'light grey': '#e0e0e0',
        'grey': '#8f8f8e',
        'orange': '#FF8C00',
        'yellow': '#f3ff00',
        'black': '#000000',
        'purple': '#9370db'
    },
    color: {
        field: 'prod-method-tier', // prod type
        values: {
            'Electric': 'light green',
            'ElectricOxygen': 'blue',
            'Oxygen': 'orange',
            'IronmakingBF': 'light red',
            'IronmakingDRI': 'light blue',
            'IntegratedBF': 'red',
            'IntegratedBFandDRI':  'purple',
            'IntegratedDRI': 'green',
            'Integratedunknown': 'grey',
            'Steelotherunspecified': 'light grey',
            'Ironotherunspecified': 'light grey'
        }
    },

    capacityLabel: '',
    capacityField: 'capacity-scaled',
}