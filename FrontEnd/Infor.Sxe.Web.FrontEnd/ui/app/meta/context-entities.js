'use strict';

/**
 * Definitions of all our Context Entities (for communication with context apps)
 *
 * (key) - the entity value stored in our json view files
 * entityName - the exact entity name used in the Ming.le messages
 * displayName - the name to display when selecting in the wysiwyg
 * sxeEntity - flag to indicate if should send ViewSxeEntities message for this entity
 * businessEntity - flag to indicate if should send business context message for this entity
 * messageType - the message type (i.e. 'OutgoingIAData'); should only be used if not an sxeEntity
 * defaultMessageData - default message data to always be added (but not to business context messages)
 * keyFields - list of fields that make up the primary key of the entity (order matters)
 * transformKeyData - function to transform key values into different form before sending message
 *                    Note: this is used when is an sxeEntity or custom entity with messageType defined
 */
app.factory('ContextEntities', function ContextEntities() {

   return {
      Activities: {
         entityName: 'activities',
         displayName: 'Activities',
         sxeEntity: true,
         keyFields: [
            { label: 'Activity ID' }
         ]
      },
      Apei: {
         entityName: 'apei',
         displayName: 'Apei - Invoice',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Group Name' },
            { label: 'Created Date' },
            { label: 'Group Sequence #' },
            { label: 'Invoice Sequence #', allowZero: true }
         ],
         transformKeyData: function (keys) {
            return {
               primaryKey: Locale.formatDate(keys.key2, { pattern: 'MM/dd/yy' }) + keys.key1, //Needs to be in this exact date format
               secondaryKey: keys.key3
            };
         }
      },
      Apeid: {
         entityName: 'apeid',
         displayName: 'Apeid - Invoice Detail',
         businessEntity: true,
         keyFields: [
            { label: 'Group Name' },
            { label: 'Created Date' },
            { label: 'Group Sequence #' },
            { label: 'Detail Sequence #' }
         ]
      },
      Apet: {
         entityName: 'apet',
         displayName: 'Apet - Vendor Transaction',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Journal #' },
            { label: 'Set #' }
         ]
      },
      Apss: {
         entityName: 'apss',
         displayName: 'Apss - Ship From',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Vendor #' },
            { label: 'Ship From' }
         ]
      },
      Apsv: {
         entityName: 'apsv',
         displayName: 'Apsv - Vendor',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Vendor #' }
         ]
      },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Arbcb: {
      //    entityName: 'arbcb',
      //    displayName: 'Arbcb - Lock Box Batch Header',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Batch' }
      //    ]
      // },
      Arbch: {
         entityName: 'arbch',
         displayName: 'Arbch - Lock Box Check Header',
         businessEntity: true,
         keyFields: [
            { label: 'Batch' },
            { label: 'Customer #' },
            { label: 'Check #' }
         ]
      },
      Arbcl: {
         entityName: 'arbcl',
         displayName: 'Arbcl - Lock Box Detail',
         businessEntity: true,
         keyFields: [
            { label: 'Batch' },
            { label: 'Customer #' },
            { label: 'Check #' },
            { label: 'Invoice #' },
            { label: 'Invoice Suffix', allowZero: true },
            { label: 'Sequence #' }
         ]
      },
      Aret: {
         entityName: 'aret',
         displayName: 'Aret - Customer Transaction',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Journal #' },
            { label: 'Set #' },
            { label: 'Invoice #', allowZero: true } //This is required for ARET Rebate
         ],
         transformKeyData: function (keys) {
            return {
               primaryKey: keys.key1,
               secondaryKey: keys.key2 + '-' + keys.key3
            };
         }
      },
      Arsc: {
         entityName: 'arsc',
         displayName: 'Arsc - Customer',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Customer #' }
         ]
      },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Arsg: {
      //    entityName: 'arsg',
      //    displayName: 'Arsg - Customer Master Group',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Group ID' }
      //    ]
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Arsl: {
      //    entityName: 'arsl',
      //    displayName: 'Arsl - Customer Lock Box',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Lock Box #' }
      //    ]
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Arsp: {
      //    entityName: 'arsp',
      //    displayName: 'Arsp - Customer Payment History',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Customer #' }
      //    ]
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Arspt: {
      //    entityName: 'arspt',
      //    displayName: 'Arspt - Customer Price Type',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Customer #' },
      //       { label: 'Ship To' },
      //       { label: 'Price Type' }
      //    ]
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Arsrt: {
      //    entityName: 'arsrt',
      //    displayName: 'Arsrt - Customer Rebate Type',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Customer #' },
      //       { label: 'Ship To' },
      //       { label: 'Rebate Type' }
      //    ]
      // },
      Arss: {
         entityName: 'arss',
         displayName: 'Arss - Ship To',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Customer #' },
            { label: 'Ship To' }
         ]
      },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // AuthPoints: {
      //    entityName: 'authpoints',
      //    displayName: 'AuthPoints - Authorization Points',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Procedure' },
      //       { label: 'Key 1' },
      //       { label: 'Key 2' },
      //       { label: 'Mode' },
      //       { label: 'Transaction Type' },
      //       { label: 'Language' }
      //    ]
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // AuthSecure: {
      //    entityName: 'authsecure',
      //    displayName: 'AuthSecure - Authorization Security',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Operator' },
      //       { label: 'Procedure' },
      //       { label: 'Key 1' },
      //       { label: 'Key 2' },
      //       { label: 'Mode' },
      //       { label: 'Transaction Type' }
      //    ]
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // AuthTrans: {
      //    entityName: 'authtrans',
      //    displayName: 'AuthTrans - Authorization Transactions',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Operator' },
      //       { label: 'Attempt Date' },
      //       { label: 'Attempt Time' }
      //    ]
      // },
      'B-Apsv': {
         entityName: 'b-apsv',
         displayName: 'B-Apsv - OT Vendor',
         sxeEntity: true,
         keyFields: [] // This didn't have key info in Neil's spreadsheet
      },
      Bpeh: {
         entityName: 'bpeh',
         displayName: 'Bpeh - Bid',
         sxeEntity: true,
         keyFields: [
            { label: 'Bid Prep ID' }
         ]
      },
      Cmsp: {
         entityName: 'cmsp',
         displayName: 'Cmsp - Prospect',
         sxeEntity: true,
         keyFields: [
            { label: 'Prospect #' }
         ]
      },
      Contacts: {
         entityName: 'contacts',
         displayName: 'Contacts',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Contact ID' }
         ]
      },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // ContactsMethods: {
      //    entityName: 'contacts-methods',
      //    displayName: 'Contacts Methods',
      //    businessEntity: true,
      //    keyFields: [] // there is no getbypk api, so not sure of keys
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // ContactsRoles: {
      //    entityName: 'contacts-roles',
      //    displayName: 'Contacts Roles',
      //    businessEntity: true,
      //    keyFields: [] // there is no getbypk api, so not sure of keys
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Cret: {
      //    entityName: 'cret',
      //    displayName: 'Cret - CR Transaction',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Bank #' },
      //       { label: 'Check #' },
      //       { label: 'Check Rec Type' },
      //       { label: 'Status Type' }
      //    ]
      // },
      Glet: {
         entityName: 'glet',
         displayName: 'Glet - GL Transaction',
         businessEntity: true,
         keyFields: [
            { label: 'Journal #' },
            { label: 'Set #' },
            { label: 'Transaction #' }
         ]
      },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Glif: {
      //    entityName: 'glif',
      //    displayName: 'Glif - GL Inquiry Financial Statement',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Group Name' },
      //       { label: 'Report Name' },
      //       { label: 'Year', allowZero: true },
      //       { label: 'Period' },
      //       { label: 'Prt Line #' }
      //    ]
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Glifa: {
      //    entityName: 'glifa',
      //    displayName: 'Glifa - GL Inquiry Financial Statement Accounts',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Group Name' },
      //       { label: 'Report Name' },
      //       { label: 'Sequence Line #' },
      //       { label: 'Column #' },
      //       { label: 'Division #', allowZero: true },
      //       { label: 'Department #', allowZero: true },
      //       { label: 'Account #' },
      //       { label: 'Sub Account #', allowZero: true }
      //    ]
      // },
      Glsa: {
         entityName: 'glsa',
         displayName: 'Glsa - GL Account',
         sxeEntity: true,
         businessEntity: true,
         // Note: the MT has special business context logic to be able to handle the full formatted # as the single key
         keyFields: [
            { label: 'GL Account # (formatted)' }
         ]
      },
      Glsb: {
         entityName: 'glsb',
         displayName: 'Glsb - GL Budget',
         businessEntity: true,
         keyFields: [
            { label: 'Year', allowZero: true },
            { label: 'Division #', allowZero: true },
            { label: 'Department #', allowZero: true },
            { label: 'Account #' },
            { label: 'Sub Account #', allowZero: true },
            { label: 'Revision #' }
         ]
      },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Icamu: {
      //    entityName: 'icamu',
      //    displayName: 'Icamu - ICAM Update File',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Active Flag' },
      //       { label: 'Warehouse' },
      //       { label: 'Buyer' },
      //       { label: 'Product' },
      //       { label: 'Frozen Type' },
      //       { label: 'Frozen MMYY' }
      //    ]
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Icenh: {
      //    entityName: 'icenh',
      //    displayName: 'Icenh - Non-Stock & Drop Header',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Type Code' },
      //       { label: 'Warehouse' },
      //       { label: 'Product' },
      //       { label: 'Product Category' },
      //       { label: 'Header Sequence #' }
      //    ]
      // },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Icenl: {
      //    entityName: 'icenl',
      //    displayName: 'Icenl - Non-Stock & Drop Detail Line',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Type Code' },
      //       { label: 'Warehouse' },
      //       { label: 'Product' },
      //       { label: 'Product Category' },
      //       { label: 'Header Sequence #' },
      //       { label: 'Detail Sequence #' }
      //    ]
      // },
      Icet: {
         entityName: 'icet',
         displayName: 'Icet - IC Transaction',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Warehouse', optional: true }, // only used for business context
            { label: 'Product' }, //used by both notes and business context.
            { label: 'Post Date', optional: true }, // only used for business context
            { label: 'Transaction Type', optional: true }, // only used for business context
            { label: 'ICET Note ID', allowZero: true } // only used by Notes web part as primaryKey
         ],
         transformKeyData: function (keys) {
            return {
               primaryKey: keys.key5, // Note ID
               secondaryKey: keys.key2 // Product
            };
         }
      },
      Icetc: {
         entityName: 'icetc',
         displayName: 'Icetc - Customer Inventory Transaction Entry',
         businessEntity: true,
         keyFields: [
            { label: 'Warehouse' },
            { label: 'Product' },
            { label: 'Post Date' },
            { label: 'Transaction Type' },
            { label: 'Sequence #' }
         ]
      },
      Icetf: {
         entityName: 'icetf',
         displayName: 'Icetf - Inventory Issues',
         businessEntity: true,
         keyFields: [
            { label: 'Product' },
            { label: 'Warehouse' },
            { label: 'Issue Date' },
            { label: 'Sequence #' }
         ]
      },
      Icetl: {
         entityName: 'icetl',
         displayName: 'Icetl - Lot Transaction',
         businessEntity: true,
         keyFields: [
            { label: 'Product' },
            { label: 'Warehouse' },
            { label: 'Lot #' },
            { label: 'Order Type' },
            { label: 'Order #' },
            { label: 'Order Suffix', allowZero: true },
            { label: 'Line #' },
            { label: 'Sequence #' }
         ]
      },
      Icets: {
         entityName: 'icets',
         displayName: 'Icets - Serial Transaction',
         businessEntity: true,
         keyFields: [
            { label: 'Product' },
            { label: 'Warehouse' },
            { label: 'Serial #' },
            { label: 'Order Type' },
            { label: 'Order #' },
            { label: 'Order Suffix', allowZero: true },
            { label: 'Line #' },
            { label: 'Sequence #' }
         ]
      },
      Icsc: {
         entityName: 'icsc',
         displayName: 'Icsc - Catalog Product',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Catalog #' }
         ]
      },
      Icsd: {
         entityName: 'icsd',
         displayName: 'Icsd - Warehouse',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Warehouse' }
         ]
      },
      Icsec: {
         entityName: 'icsec',
         displayName: 'Icsec - Product Cross Reference',
         businessEntity: true,
         keyFields: [
            { label: 'Rec Type' },
            { label: 'Product' },
            { label: 'Key #' }
         ]
      },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Icsef: {
      //    entityName: 'icsef',
      //    displayName: 'Icsef - Fifo Master',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Warehouse' },
      //       { label: 'Product' },
      //       { label: 'Available Flag' },
      //       { label: 'Receipt Date' },
      //       { label: 'Sequence #' }
      //    ]
      // },
      Icsel: {
         entityName: 'icsel',
         displayName: 'Icsel - Lot',
         businessEntity: true,
         keyFields: [
            { label: 'Warehouse' },
            { label: 'Product' },
            { label: 'Lot #' }
         ]
      },
      Icsep: {
         entityName: 'icsep',
         displayName: 'Icsep - Physical Count',
         businessEntity: true,
         keyFields: [
            { label: 'Warehouse' },
            { label: 'Run #' },
            { label: 'Bin Location' },
            { label: 'Product' }
         ]
      },
      Icsepa: {
         entityName: 'icsepa',
         displayName: 'Icsepa - Physical Count Archive',
         businessEntity: true,
         keyFields: [
            { label: 'Warehouse' },
            { label: 'Run #' },
            { label: 'Updated Date' },
            { label: 'Bin Location' },
            { label: 'Product' }
         ]
      },
      Icses: {
         entityName: 'icses',
         displayName: 'Icses - Serial #',
         businessEntity: true,
         keyFields: [
            { label: 'Product' },
            { label: 'Warehouse' },
            { label: 'Serial #' }
         ]
      },
      Icsl: {
         entityName: 'icsl',
         displayName: 'Icsl - Product Line',
         businessEntity: true,
         keyFields: [
            { label: 'Warehouse' },
            { label: 'Vendor #' },
            { label: 'Product Line' }
         ]
      },
      Icsp: {
         entityName: 'icsp',
         displayName: 'Icsp - Product',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Product #' }
         ]
      },
      Icsw: {
         entityName: 'icsw',
         displayName: 'Icsw - Warehouse Product',
         businessEntity: true,
         keyFields: [
            { label: 'Product #' },
            { label: 'Warehouse' }
         ]
      },
      Jmeh: {
         entityName: 'jmeh',
         displayName: 'Jmeh - Job',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Job ID' },
            { label: 'Job Revision #' }
         ]
      },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Jmel: {
      //    entityName: 'jmel',
      //    displayName: 'Jmel - Job Line Item',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Job ID' },
      //       { label: 'Job Revision #' },
      //       { label: 'Line #' }
      //    ]
      // },
      Jmelv: {
         entityName: 'jmelv',
         displayName: 'Jmelv - Job (Vendor Record)',
         sxeEntity: true,
         keyFields: [
            { label: 'Job ID' },
            { label: 'Job Revision #' },
            { label: 'Line #' },
            { label: 'Vendor #' }
         ],
         transformKeyData: function (keys) {
            return {
               primaryKey: keys.key1 + '-' + keys.key2,
               secondaryKey: keys.key3 + '-' + keys.key4
            };
         }
      },
      Kpet: {
         entityName: 'kpet',
         displayName: 'Kpet - Kit Work Order',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Work Order #' },
            { label: 'Work Order Suffix', allowZero: true }
         ]
      },
      Oeeh: {
         entityName: 'oeeh',
         displayName: 'Oeeh - Order Entry Header',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Order #' },
            { label: 'Order Suffix', allowZero: true }
         ]
      },
      Oeel: {
         entityName: 'oeel',
         displayName: 'Oeel - Order Entry Line',
         businessEntity: true,
         keyFields: [
            { label: 'Order #' },
            { label: 'Order Suffix', allowZero: true },
            { label: 'Line #' }
         ]
      },
      Oeelk: {
         entityName: 'oeelk',
         displayName: 'Oeelk - Order Entry Kit',
         businessEntity: true,
         keyFields: [
            { label: 'Order Type' },
            { label: 'Order #' },
            { label: 'Order Suffix', allowZero: true },
            { label: 'Line #' },
            { label: 'Sequence #' }
         ]
      },
      Oteh: {
         entityName: 'oteh',
         displayName: 'Oteh - Overseas Trade',
         sxeEntity: true,
         keyFields: [
            { label: 'Tracking #' }
         ]
      },
      // TODO: ap - need to verify what is expected for primaryKey and secondaryKey for these pds* entities
      Pdsc: {
         entityName: 'pdsc',
         displayName: 'Pdsc - Customer Pricing',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Rec #' }
         ]
      },
      Pdsr: {
         entityName: 'pdsr',
         displayName: 'Pdsr - Rebate Pricing',
         sxeEntity: true,
         keyFields: [
            { label: 'Code ID' },
            { label: 'Level Key' },
            { label: 'Vendor #' },
            { label: 'Rebate Sub Type' },
            { label: 'Customer #' },
            { label: 'Ship To' },
            { label: 'Customer Rebate Type' },
            { label: 'Warehouse' },
            { label: 'Start Date' }
         ]
      },
      Pdsv: {
         entityName: 'pdsv',
         displayName: 'Pdsv - Vendor Pricing',
         sxeEntity: true,
         keyFields: [
            { label: 'Vendor #' },
            { label: 'Product' },
            { label: 'Start Date' }
         ]
      },
      Pmes: {
         entityName: 'pmes',
         displayName: 'Pmes - Ship Request',
         sxeEntity: true,
         keyFields: [
            { label: 'Ship Request #' }
         ]
      },
      Poeh: {
         entityName: 'poeh',
         displayName: 'Poeh - Purchase Order',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Purchase Order #' },
            { label: 'Purchase Order Suffix', allowZero: true }
         ]
      },
      Poel: {
         entityName: 'poel',
         displayName: 'Poel - Purchase Order Line',
         businessEntity: true,
         keyFields: [
            { label: 'Purchase Order #' },
            { label: 'Purchase Order Suffix', allowZero: true },
            { label: 'Line #' }
         ]
      },
      Poelc: {
         entityName: 'poelc',
         displayName: 'Poelc - Purchase Order Costing Line',
         businessEntity: true,
         keyFields: [
            { label: 'Journal #' },
            { label: 'Set #' },
            { label: 'Purchase Order #' },
            { label: 'Purchase Order Suffix', allowZero: true },
            { label: 'Line #' },
            { label: 'Comp Sequence #' },
            { label: 'Bundle ID' }
         ]
      },
      Poelo: {
         entityName: 'poelo',
         displayName: 'Poelo - Purchase Order Line Order File',
         businessEntity: true,
         keyFields: [
            { label: 'Purchase Order #' },
            { label: 'Purchase Order Suffix', allowZero: true },
            { label: 'Line #' },
            { label: 'Sequence #' }
         ]
      },
      Poerah: {
         entityName: 'poerah',
         displayName: 'Poerah - RRAR Report Header',
         sxeEntity: true,
         keyFields: [
            { label: 'Report #' }
         ],
         transformKeyData: function (keys) {
            return {
               primaryKey: keys.key1,
               secondaryKey: keys.key2 ? keys.key2 : 0
            };
         }
      },
      Sasc: {
         entityName: 'sasc',
         displayName: 'Sasc - Company',
         businessEntity: true,
         keyFields: [
            { label: 'Company #' }
         ]
      },
      Sasj: {
         entityName: 'sasj',
         displayName: 'Sasj - Journal',
         businessEntity: true,
         keyFields: [
            { label: 'Journal #' }
         ]
      },
      Sasta: {
         entityName: 'sasta',
         displayName: 'Sasta - SA Table Alpha (for sastt only)',
         businessEntity: true,
         keyFields: [
            { label: 'Code ID' },
            { label: 'Code Value' }
         ]
      },
      Sastaz: {
         entityName: 'sastaz',
         displayName: 'Sastaz - SA Table Custom (for sastz only)',
         businessEntity: true,
         keyFields: [
            { label: 'Code ID' },
            { label: 'Primary Key' },
            { label: 'Secondary Key', optional: true }
         ]
      },
      // Note: Brian Nigri removed this entity from his latest spreadsheet
      // Sastn: {
      //    entityName: 'sastn',
      //    displayName: 'Sastn - SA Table Numeric (for sastt only)',
      //    businessEntity: true,
      //    keyFields: [
      //       { label: 'Code ID' },
      //       { label: 'Code Value' }
      //    ]
      // },
      Smsn: {
         entityName: 'smsn',
         displayName: 'Smsn - Sales Rep',
         businessEntity: true,
         keyFields: [
            { label: 'Sales Rep' }
         ]
      },
      Sweh: {
         entityName: 'sweh',
         displayName: 'Sweh - Repair Order',
         sxeEntity: true,
         keyFields: [
            { label: 'Repair Order #' },
            { label: 'Repair Order Suffix', allowZero: true }
         ]
      },
      Swel: {
         entityName: 'swel',
         displayName: 'Swel - Repair Line',
         sxeEntity: true,
         keyFields: [
            { label: 'Repair Order #' },
            { label: 'Repair Order Suffix', allowZero: true },
            { label: 'Line #' }
         ],
         transformKeyData: function (keys) {
            return {
               primaryKey: keys.key1 + '-' + keys.key2, // Note: key2 suffix was this string(sweh.repairordsuf,"999")
               secondaryKey: keys.key3
            };
         }
      },
      Swewh: {
         entityName: 'swewh',
         displayName: 'Swewh - Waranty',
         sxeEntity: true,
         keyFields: [
            { label: 'Warranty Claim #' }
         ]
      },
      Vaeh: {
         entityName: 'vaeh',
         displayName: 'Vaeh - Value Add Order',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Value Add Order #' },
            { label: 'Value Add Order Suffix', allowZero: true }
         ]
      },
      Vaes: {
         entityName: 'vaes',
         displayName: 'Vaes - Value Add Section',
         sxeEntity: true,
         keyFields: [
            { label: 'Value Add Order #' },
            { label: 'Value Add Order Suffix', allowZero: true },
            { label: 'Section Sequence #' }
         ],
         transformKeyData: function (keys) {
            return {
               primaryKey: keys.key1 + '-' + keys.key2,
               secondaryKey: keys.key3
            };
         }
      },
      Vasp: {
         entityName: 'vasp',
         displayName: 'Vasp - Value Add Setup',
         sxeEntity: true,
         keyFields: [
            { label: 'Product (vasp.shipprod)' },
            { label: 'Warehouse', optional: true }
         ]
      },
      Vasps: {
         entityName: 'vasps',
         displayName: 'Vasps - Value Add Section Setup',
         sxeEntity: true,
         keyFields: [
            { label: 'Product (vasps.shipprod)' },
            { label: 'Warehouse' },
            { label: 'Section Sequence #' }
         ],
         transformKeyData: function (keys) {
            return {
               primaryKey: keys.key1 + '-' + keys.key2,
               secondaryKey: keys.key3
            };
         }
      },
      Vehicle: {
         entityName: 'vehicle',
         displayName: 'Vehicle',
         sxeEntity: true,
         keyFields: [
            { label: 'Customer #' },
            { label: 'Ship To' },
            { label: 'Vehicle ID' }
         ],
         transformKeyData: function (keys) {
            return {
               primaryKey: keys.key1 + '-' + keys.key2,
               secondaryKey: keys.key3
            };
         }
      },
      Wteh: {
         entityName: 'wteh',
         displayName: 'Wteh - Warehouse Transfer',
         sxeEntity: true,
         businessEntity: true,
         keyFields: [
            { label: 'Warehouse Transfer #' },
            { label: 'Warehouse Transfer Suffix', allowZero: true }
         ]
      },
      Wtel: {
         entityName: 'wtel',
         displayName: 'Wtel - Warehouse Transfer Line',
         businessEntity: true,
         keyFields: [
            { label: 'Warehouse Transfer #' },
            { label: 'Warehouse Transfer Suffix', allowZero: true },
            { label: 'Line #' }
         ]
      }
   };

});
