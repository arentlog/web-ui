'use strict';

/**
 * Metadata definitions of all our lookup fields.
 *
 * Lookup Options:
 *
 * autoComplete - Activate auto-complete functionality for this lookup
 *    - ex. false
 * autoFetchMetadata - Automatically fetch the record metadata (full label and notes flag) when the model value changes programmatically (i.e. not by the user)
 *    - ex. false
 * autoSelect - Attempt to automatically validate and select a record if user types in a value and tabs out
 *    - ex. false
 * allowEntry - Allow user to enter values that are not known records
 *    - ex. true
 *    - Note: IES lookups perform validation when a user enters a value and tabs away.
 *            If this entry does not pass validation, then the field will be cleared (unless allowEntry: true).
 * valueField - The field on the records that contains the key value to be applied to the model
 *    - ex. 'CustomerNumber'
 *    - Note: There is also a 'recordValueField' option in case the value field is named differently on the 'getRecordByValue' record
 * value2Field - The field containing a secondary key value to be stored for MRUs and passed to the change event as args.value2
 *    - ex. 'vendno' or 'repairordsuf'
 *    - Note: This should only be used for a secondary key value, not for other values that may change (since stored in MRU).
 *            For IES lookups the value2 will be populated from 'key2' on the auto-complete records; otherwise will be populated by field name from lookup records
 *            There is also a 'recordValue2Field' option in case the value2 field is named differently on the 'getRecordByValue' record
 * value3Field (up to 5) - Similar to value2Field (should only be used for non-IES lookups since IES auto-complete only supports 2 key values).
 * labelField - The field on the records that contains the value to show in the text box, or a function that returns the display value
 *    - ex. 'DisplayCustomer'
 *    - ex. function (record, source) {
 *             return record.batchno + ' - ' + record.batchname;
 *          }
 *    - Note: Only non-IES lookups should use the function option (since IES lookups have their own way of doing the display value)
 *            The 'source' parameter will be set to 'getRecordByValue' if the record came from the getRecordByValue option.
 *            This can be useful if this record has different fields than the search results records (when returning desired label).
 * rowPointerField - The field on the records that contains the row pointer (which is sent as part of the args to the change event)
 *    - ex. 'rowpointerArsc'
 *    - Note: For non-IES lookups only (since the row pointer field of IES lookups is always the same)
 *            There is also a 'recordRowPointerField' option in case the row pointer field is named differently on the 'getRecordByValue' record
 * rowIdField - The field on the records that contains the row id (which is sent as part of the args to the change event)
 *    - ex. 'rowidArbch'
 *    - Note: For non-IES lookups only (since Elastic lookups don't have a row id)
 *            There is also a 'recordRowIdField' option in case the row id field is named differently on the 'getRecordByValue' record
 * mruListKey - The named key pointing to a stored MRU list. This activates the MRU functionality.
 *    - ex. 'GlAccount' or 'Product'
 *    - Note: Most lookups should simply use their lookup name as the mruListKey (i.e. 'GlAccount'). But sometimes we want multiple types of lookups to use the same MRU list (like for Prod lookups).
 * getRecordByValue - For retrieving the record by the current model value in order to get additional display label data and for auto-select feature
 *    - Option 1: string of simple GET call path that fetches record by {value}
 *       - ex. 'api/sm/smsn/getbypk?slsrep={value}'
 *    - Option 2: function that returns record via callback
 *       - ex. function (value, criteria, options, callback) {
 *               DataService.post('api/some/path', { data: { shipto: value } }, function (record) {
 *                 callback(record);
 *               });
 *             }
 *    - Note: For non-IES lookups only
 * searchOnOpen - Perform search when opening the lookup modal. The default is to perform a search if the user has
 *                just typed in a value, otherwise don't search (to avoid unwanted searches and performance hits).
 *    - ex. true (always search on open)
 *    - ex. false (never search on open)
 *    - Note: It is almost always best to omit this option and let the default behavior occur
 * searchMethod - The HTTP method to use for the search api call
 *    - ex. 'POST'
 *    - Note: For non-IES lookups only
 * searchPath - The url path of the search api call
 *    - ex. 'api/ar/arbch/lookup'
 *    - Note: For non-IES lookups only
 * searchParams - An object containing any default param values to be used in the api call criteria
 *    - ex. { LookupParameter: 'sasta', codeiden: 'PF' }
 * searchParamValueField - The field on the search params criteria object that should receive the user's input when performing a search
 *    - ex. 'groupname'
 *    - Note: For GET calls the param will be added as a query param (unless it is defined on the path via the {someParam} syntax).
 *            For POST calls it will be applied to the request data object.
 *            For non-IES lookups only
 * maxResultsField - The field name on the search criteria object (or GET path) that should get the max results number
 *    - ex. 'recordcount'
 *    - Note: The default is the field name for IES lookups, so non-IES lookups should fill this in or set it to empty
 * responseField - The field on the api call response object that contains the array of results
 *    - ex. 'arbchlookupresults'
 *    - Note: Omit this option if the response object itself is the results
 * transformResults - A function that returns the array of results from the response data. This is a way to manipulate the results before applying to the grid/autocomplete).
 *    - ex. function (data) {
 *             return JSON.parse(data.text.results);
 *          }
 *    - Note: Only for lookups that has complicated response data (i.e. extensions using the "customcall" api)
 * applyFormatMask - Apply the mask defined on the Field Format (if the lookup field has a dataFormat set) to constrain user input
 *    - ex. true
 *    - Note: Masks are off by default on lookup fields because some lookups are like the Vendor lookup where it tends to have a dataFormat of Integer, but we don't want to constrain input to numbers only because the autocomplete search allows typing in things like the Vendor name too.
 * applyFormatToLabel - Apply the lookup field's data format options to the labelField value when a record is selected
 *    - ex. true
 *    - Note: This can be useful in several cases, like when lookup fields have particular numeric formatting options defined on them
 * contextEntity - The key to the ContextEntity (see context-entities.js) that corresponds to this lookup type
 *    - ex. 'Arsc'
 *    - Note: Only for lookups that we want to enable context messaging on
 * modalView - The lookup modal view to use
 *    - ex. 'shared/lookups/gl-account-lookup-modal.json'
 *    - Note: Omit this option for IES lookups
 * modalController - The controller to use for the lookup modal
 *    - ex. 'GlAccountLookupModalCtrl as lkupmdl'
 *    - Note: Leave this blank so the StandardLookupModalCtrl (or IES) is used.
 *            However, if custom logic is needed then create a new ctrl similar to StandardLookupModalCtrl
 * toolbarTitle - Translation key for the title above the lookup grid for special cases
 *    - ex. 'global.customers'
 *    - Note: Normally the title is defined in the modalView json file, but we can have a dynamic reference (lkup.toolbarTitle) if needed for shared modals
 */
app.factory('Lookups', function Lookups(CommonConverters, DataService, StandardConverters, UserService, Utils, Sasc, $state, CacheService) {

   var majorBucket = 'E';

   return {
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!!! Add all new Lookup references in alphabetical order - it's easier to find the code.
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      AltProdGroup: {
         toolbarTitle: 'global.alternate.product.group',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'AltProdGroup',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'AG'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      ApInvoices: {
         valueField: 'apinvno',
         labelField: 'apinvno',
         rowIdField: 'apetRowid',
         mruListKey: 'ApInvoice',
         autoComplete: false,
         getRecordByValue: function (value, criteria, options, callback) {
            criteria.apinvno = value;
            var cachedData = CacheService.get(!options.cacheExactMatch, majorBucket, 'ApInvoices', criteria);
            if (!cachedData) {
               DataService.post('api/ap/apet/lookup', { data: criteria }, function (data) {
                  if (data.apetlookupresults.length) {
                     CacheService.set(!options.cacheExactMatch, majorBucket, 'ApInvoices', criteria, data.apetlookupresults[0], options.cacheExactMatchTimeout);
                     callback(data.apetlookupresults[0]);
                  } else {
                     callback(null);
                  }
               });
            } else {
               callback(cachedData);
            }
         },
         searchMethod: 'POST',
         searchPath: 'api/ap/apet/lookup',
         searchParams: {
            vendno: 0,
            invdt: null,
            transcd: 0,
            statustype: true
         },
         searchParamValueField: 'apinvno',
         maxResultsField: 'recordcountlimit',
         responseField: 'apetlookupresults',
         contextEntity: 'Apet',
         modalView: 'shared/lookups/ap-invoice-lookup-modal.json'
      },
      ArAccountLookup: {
         valueField: 'batch',
         labelField: 'batch',
         rowIdField: 'rowidArbch',
         mruListKey: 'ArAccount',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ar/arbch/lookup',
         searchParamValueField: 'batch',
         maxResultsField: 'recordcountlimit',
         responseField: 'arbchlookupresults',
         contextEntity: 'Arbch',
         modalView: 'shared/lookups/ar-account-lookup-modal.json'
      },
      AutoPrice: {
         valueField: 'autotype',
         labelField: 'autotype',
         rowIdField: 'pdsaRowid',
         mruListKey: 'AutoPrice',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/pd/pdsa/lookup',
         searchParams: {
            LookupParameter: 'pdsa'
         },
         searchParamValueField: 'autotype',
         maxResultsField: 'recordcountlimit',
         responseField: 'autoprctypelookupresults',
         modalView: 'shared/lookups/autoprice-lookup-modal.json'
      },
      Bank: {
         // IES Bank Lookup
         valueField: 'bankno',
         labelField: 'label',
         mruListKey: 'Bank',
         searchParams: {
            LookupParameter: 'crsb'
         },
         modalView: 'shared/lookups/bank-lookup-modal.json'
      },
      Batch: {
         valueField: 'batchnm',
         labelField: 'label',
         mruListKey: 'Batch',
         // TODO: Determine if we really want Batch lookups to allow entry by default, or if this is just a temporary solution
         allowEntry: true,
         searchParams: {
            LookupParameter: 'sabs'
         },
         modalView: 'shared/lookups/batch-lookup-modal.json'
      },
      BinLocation: {
         valueField: 'binloc',
         labelField: function (record) {
            return CommonConverters.BinLoc.convert(record.binloc);
         },
         rowIdField: 'rowidWmsb',
         recordRowIdField: 'rowID', //Used for the getbypk
         mruListKey: 'BinLoc',
         autoComplete: false,
         getRecordByValue: function (value, criteria, options, callback) {
            criteria.binloc = value;
            var cachedData = CacheService.get(!options.cacheExactMatch, majorBucket, 'BinLocations', criteria);
            if (!cachedData) {
               var requestCriteria = {
                  whse: criteria.whse,
                  binloc: criteria.binloc,
                  fldlist: 'whse,binloc'
               };
               DataService.get('api/wm/wmsb/getbypk', { params: requestCriteria }, function (data) {
                  if (data) {
                     CacheService.set(!options.cacheExactMatch, majorBucket, 'BinLocation', criteria, data, options.cacheExactMatchTimeout);
                     callback(data);
                  } else {
                     callback(null);
                  }
               });
            } else {
               callback(cachedData);
            }
         },
         applyFormatMask: true, // we want the bin loc format mask applied if field has the BinLoc data format
         searchMethod: 'POST',
         searchPath: 'api/wm/aswmentry/wmsblookup',
         searchParamValueField: 'binloc',
         searchParams: {
            whse: ''
         },
         maxResultsField: 'recordcount',
         responseField: 'wmsblookupresults',
         modalView: 'shared/lookups/binlocation-lookup-modal.json'
      },
      BrandCode: {
         toolbarTitle: 'global.brand.code',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'BrandCode',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'BC'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      Buyer: {
         toolbarTitle: 'global.buyer',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'Buyer',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'B'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      BusRules: {
         toolbarTitle: 'global.business.rules',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'BusRule',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'BR'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      CAMContactType: {
         toolbarTitle: 'global.cam.contact.type',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'CAMContactType',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'CT'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      Carrier: {
         toolbarTitle: 'global.carrier',
         valueField: 'codeval',
         labelField: function (sasta) {
            return sasta.codeval + ' - ' + sasta.descrip;
         },
         rowIdField: 'rowidSasta',
         mruListKey: 'Carrier',
         autoComplete: false,
         getRecordByValue: function (value, criteria, options, callback) {
            criteria.pvCodeval = value;
            var cachedData = CacheService.get(!options.cacheExactMatch, majorBucket, 'Carrier', criteria);
            if (!cachedData) {
               DataService.post('api/sa/sasta/lookupcarrier', { data: criteria }, function (data) {
                  if (data.lookupcarrierresults.length) {
                     CacheService.set(!options.cacheExactMatch, majorBucket, 'Carrier', criteria, data.lookupcarrierresults[0], options.cacheExactMatchTimeout);
                     callback(data.lookupcarrierresults[0]);
                  } else {
                     callback(null);
                  }
               });
            } else {
               callback(cachedData);
            }

         },
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/sa/sasta/lookupcarrier',
         searchParams: {
            pvCodeval: ''
         },
         searchParamValueField: 'pvCodeval',
         maxResultsField: 'pvRecordlimit',
         responseField: 'lookupcarrierresults',
         modalView: 'shared/lookups/carrier-lookup-modal.json'
      },
      CertificateLicense: {
         valueField: 'certcode',
         labelField: 'certcode',
         rowIdField: 'icsprcRowid',
         mruListKey: 'CertificateLicense',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ic/asicsetup/icsprclookup',
         searchParamValueField: 'certcode',
         maxResultsField: 'recordcountlimit',
         responseField: 'icsprclookupresults',
         modalView: 'shared/lookups/certificate-license-lookup-modal.json'
      },
      ClaimNumber: {
         valueField: 'claimno',
         labelField: 'claimno',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/pd/pderc/lookup',
         searchParams: {
            vendno: null,
            statustype: 'A',
            claimtype: 'B'
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'pderclookupresults',
         searchParamValueField: 'claimno',
         modalView: 'shared/lookups/claimnumber-lookup-modal.json',
         modalController: 'ClaimNumberLookupModalCtrl as lkupmdl'
      },
      ClaimType: {
         valueField: 'claimtype',
         labelField: function (record) {
            return record.claimtype + ' - ' + record.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'ClaimType',
         searchMethod: 'POST',
         searchPath: 'api/sw/swsw/listswswbyclaimtype',
         getRecordByValue: 'api/sw/swsw/getbypk?claimtype={value}',
         searchParamValueField: 'claimtype',
         modalView: 'shared/lookups/claim-type-lookup-modal.json'
      },
      Commission: {
         valueField: 'commtype',
         labelField: function (record) {
            return record.commtype + ' - ' + record.refer;
         },
         rowIdField: 'rowID',
         mruListKey: 'Commission',
         getRecordByValue: 'api/sm/smsm/getbypk?commtype={value}',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/sm/smsm/getsmsmes',
         searchParamValueField: 'commtype',
         searchParams: {
            commtype: '',
            slsrep: ''
         },
         maxResultsField: 'recordcountLimit',
         responseField: '',
         modalView: 'shared/lookups/commission-lookup-modal.json'
      },
      Company: {
         valueField: 'cono',
         labelField: function (record) {
            return record.cono + ' - ' + record.conm;
         },
         rowIdField: 'rowID',
         mruListKey: 'Company',
         autoComplete: true,
         getRecordByValue: function (value, criteria, options, callback) {
            var cachedData = CacheService.get(!options.cacheExactMatch, majorBucket, 'Company', value);
            if (!cachedData) {
               DataService.get('api/sa/assasetup/sascretrieve/' + value, { busy: false }, function (record) {
                  CacheService.set(!options.cacheExactMatch, majorBucket, 'Company', value, record.sacompany, options.cacheExactMatchTimeout);
                  callback(record.sacompany);
               });
            } else {
               callback(cachedData);
            }
         },
         searchMethod: 'POST',
         searchPath: 'api/sa/sasc/getcompanylookup',
         searchParams: {
            cono: 0,
            conm: ''
         },
         searchParamValueField: 'cono',
         responseField: '',
         contextEntity: 'Sasc',
         modalView: 'shared/lookups/company-lookup-modal.json'
      },
      CompanySize: {
         valueField: 'codeval',
         labelField: function (cmst) {
            return cmst.codeval + ' - ' + cmst.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'CompanySize',
         autoComplete: false,
         getRecordByValue: 'api/cm/cmst/getbypk?codeiden=cs&codeval={value}&slsrep=',
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/cm/cmst/getcmstlistbyidcodevaldesc',
         searchParams: {
            codeiden: 'cs',
            codeval: '',
            descrip: '',
            slsrep: ''
         },
         maxResultsField: 'recordcountlimit',
         searchParamValueField: 'codeval',
         responseField: '',
         modalView: 'shared/lookups/companysize-lookup-modal.json'
      },
      ConditionCode: {
         toolbarTitle: 'global.condition.code',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ConditionCode',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'CC'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      Contacts: {
         valueField: 'contactid',
         labelField: 'label',
         mruListKey: 'Contact',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'contacts'
         },
         contextEntity: 'Contacts',
         modalView: 'shared/lookups/contact-lookup-modal.json',
      },
      Country: {
         toolbarTitle: 'global.country',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'Country',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'W'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      CreditCards: {
         valueField: 'cardno',
         labelField: function (arsd) {
            if (arsd.mediadesc) {
               var maskIndex = arsd.cardno.lastIndexOf("*");
               return arsd.cardno.substring(0, (maskIndex + 5)) + ' - ' + arsd.mediadesc;
            } else {
               var maskIndex = arsd.cardno.lastIndexOf("*");
               return arsd.cardno.substring(0, (maskIndex + 5));
            }
         },
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records; also may not want for security reasons
         autoComplete: false, //TODO: might be able to implement getRecordByValue in the future
         searchParams: {
            custno: null,
            shipto: '',
            mediacd: 0
         },
         searchMethod: 'POST',
         searchPath: 'api/ar/asarinquiry/arsdlookup',
         maxResultsField: 'recordlimit',
         modalView: 'shared/lookups/creditcards-lookup-modal.json'
      },
      Customer: {
         valueField: 'custno',
         labelField: 'label',
         mruListKey: 'Customer',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'arsc'
         },
         contextEntity: 'Arsc',
         modalView: 'shared/lookups/customer-lookup-modal.json'
      },
      CustType: {
         toolbarTitle: 'global.customer.type',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'CustType',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'CU'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      CustomerPriceType: {
         toolbarTitle: 'global.customer.price.type',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'CustPriceType',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'J'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      CustomerRebateType: {
         toolbarTitle: 'global.rebate.type',
         valueField: 'codeval',
         labelField: function (pdst) {
            return pdst.codeval + ' - ' + pdst.descrip;
         },
         rowIdField: 'rowidPdst',
         mruListKey: 'CustRebateType',
         autoComplete: false,
         getRecordByValue: 'api/pd/pdst/getbypk?codeiden=ct&codeval={value}',
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/pd/pdst/lookup',
         searchParams: {
            pvCodeiden: 'ct',
            pvCodeval: '',
            pvVendno: 0
         },
         searchParamValueField: 'codeval',
         maxResultsField: 'pvRecordlimit',
         responseField: 'pdstlookupresults',
         modalView: 'shared/lookups/customer-rebate-lookup-modal.json'
      },
      DateFormat: {
         valueField: 'codeval',
         labelField: function (slst) {
            return slst.codeval + ' - ' + slst.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'DateFormat',
         autoComplete: false,
         getRecordByValue: 'api/sl/slst/getbypk?codeiden=dt&codeval={value}',
         searchMethod: 'POST',
         searchPath: 'api/sl/slst/getsupplierlinksetupforlookup',
         searchParamValueField: 'codeval',
         searchParams: {
            codeiden: 'dt',
            codeval: '',
            descrip: ''
         },
         modalView: 'shared/lookups/dateformat-lookup-modal.json'
      },
      DesignName: {
         valueField: 'groupnm',
         labelField: function (record) {
            return record.groupnm + ' - ' + record.gltitle;
         },
         rowIdField: 'rowID',
         mruListKey: 'DesignName',
         autoComplete: false,
         getRecordByValue: 'api/gl/glsf/getbypk?groupnm={value}&swseqno=0', //not positive if it is possible to have one that is not swseqno=0? research indicates it is not
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/gl/glsf/getgliflistbygroupnamedesc',
         searchParamValueField: 'groupnm',
         searchParams: {
            groupnm: '',
            gltitle: '',
            fldlist: 'groupnm,gltitle'
         },
         modalView: 'shared/lookups/design-name-lookup-modal.json'
      },
      DeviceLoc: {
         toolbarTitle: 'global.device.location',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'DeviceLoc',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'DL'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      Division: {
         valueField: 'codeval',
         labelField: function (division) {
            return division.codeval + ' - ' + division.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'Division',
         autoComplete: true,
         IsAutoComplete: true,
         getRecordByValue: 'api/sa/sastn/getbypk?codeiden=V&codeval={value}',
         searchMethod: 'POST',
         searchPath: 'api/sa/sastn/lookup',
         searchParams: {
            codeiden: 'V'
         },
         maxResultsField: 'recordcountlimit',
         modalView: 'shared/lookups/division-lookup-modal.json'
      },
      Drawer: {
         valueField: 'drawerid',
         value2Field: 'whse',    //Its desirable in the instances of this LU to also set the Warehouse of the Drawer selected.
         labelField: function (drawer) {
            return drawer.drawerid + ' - ' + drawer.whse;
         },
         rowIdField: 'icsddRowidStr',
         mruListKey: 'Drawer',
         autoComplete: true,
         getRecordByValue: function (value, criteria, options, callback) {
            //NOTE: If the user entered a whse, it's on the payload already.  This will show
            //only drawers for the warehouse.  If it's not entered, they'll search for all
            //drawers.
            criteria.drawerid = value;
            DataService.post('/web/api/ic/icsddgetlist', { data: criteria }, function (data) {
               if (data && data.ttblicsddresults && data.ttblicsddresults.length) {
                  console.log('data', data);
                  callback(data.ttblicsddresults[0]);
               } else {
                  callback(null);
               }
            });
         },
         searchMethod: 'POST',
         searchPath: '/web/api/ic/icsddgetlist',
         searchParams: {
            whse: '',
            drawerid: ''
         },
         searchParamValueField: 'drawerid',
         maxResultsField: 'recordcountlimit',
         responseField: 'ttblicsddresults',
         modalView: 'shared/lookups/drawer-lookup-modal.json',
         modalController: 'DrawerLookupModalCtrl as lkupmdl'
      },
      ECCNClass: {
         toolbarTitle: 'global.eccn.class.code',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ECCNClass',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'EC'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      EmailContacts: {
         toolbarTitle: 'global.contact.email.addresses',
         valueField: 'firstemailaddr',
         labelField: 'firstemailaddr',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         searchPath: 'api/shared/contacts/lookup',
         maxResultsField: 'recordlimit',
         responseField: 'contactssearchresults',
         searchParamValueField: 'firstemailaddr',
         searchParams: {
            firstnm: '',
            lastnm: '',
            contacttype: '',
            subjectroletype: '',
            subjectprimarykey: '',
            subjectsecondarykey: ''
         },
         modalView: 'shared/lookups/email-or-fax-contacts-lookup-modal.json',
         modalController: 'EmailOrFaxContactsLookupModalCtrl as lkupmdl'
      },
      ErrorMessage: {
         toolbarTitle: 'global.error.messages.lookup',
         valueField: 'errorno',
         labelField: 'errorno',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         searchPath: 'api/sa/assainquiry/sasselookup',
         searchParams: {
            errorno: 0,
            errormsg: '',
            trmgrlang: '',
            lalllanguages: 'false'
         },
         maxResultsField: 'recordlimit',
         modalView: 'shared/lookups/error-message-lookup-modal.json',
         modalController: 'ErrorMessageLookupModalCtrl as lkupmdl'
      },
      EsbNoun: {
         toolbarTitle: 'global.error.messages.lookup',
         valueField: 'noun',
         labelField: 'noun',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         searchMethod: 'GET',
         searchPath: 'api/sa/assasetup/saabnrecords',
         modalView: 'shared/lookups/esb-noun-lookup-modal.json'
      },
      EventName: {
         valueField: 'eventname',
         labelField: 'eventname',
         rowIdField: 'rowidEvent',
         mruListKey: 'EventName',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/shared/eventsetup/lookup',
         searchParamValueField: 'eventname',
         searchParams: {
            LookupParameter: 'eventsetup'
         },
         responseField: 'saeventlookupresults',
         modalView: 'shared/lookups/eventname-lookup-modal.json'
      },
      FaxNumberContacts: {
         toolbarTitle: 'global.contact.fax.numbers',
         valueField: 'faxphoneno',
         labelField: function (record) {
            return StandardConverters.Phone.convert(record.faxphoneno);
         },
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         applyFormatMask: true, // we want the phone format mask applied if field has the phone data format
         searchPath: 'api/shared/contacts/lookup',
         maxResultsField: 'recordlimit',
         responseField: 'contactssearchresults',
         searchParamValueField: 'faxphoneno',
         searchParams: {
            firstnm: '',
            lastnm: '',
            contacttype: '',
            subjectroletype: '',
            subjectprimarykey: '',
            subjectsecondarykey: ''
         },
         modalView: 'shared/lookups/email-or-fax-contacts-lookup-modal.json',
         modalController: 'EmailOrFaxContactsLookupModalCtrl as lkupmdl'
      },
      FreightTerms: {
         toolbarTitle: 'global.freight.terms',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'FreightTerm',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'FT'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      FreightConsol: {
         toolbarTitle: 'global.freight.consol',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'FreightConsol',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'FC'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      GeoCodeSalesUseTax: {
         valueField: 'geo',
         labelField: 'geo',
         rowIdField: 'georowid',
         mruListKey: null, // can't do MRU on GeoCode until have an api call to fetch geocode by row id and remove args.record from change event
         autoComplete: false,
         searchOnOpen: true,
         searchMethod: 'POST',
         searchParamValueField: 'geo',
         searchPath: 'api/shared/assharedentry/geocodelookup',
         modalView: 'shared/lookups/geocodesalesusetax-lookup-modal.json'
      },
      GeoCodeEnterprise: {
         valueField: 'geocd',
         labelField: 'geocd',
         rowIdField: 'georowid',
         mruListKey: null, // can't do MRU on GeoCode until have an api call to fetch geocode by row id and remove args.record from change event
         autoComplete: false,
         searchOnOpen: true,
         searchMethod: 'POST',
         searchParamValueField: 'geocd',
         searchPath: 'api/shared/assharedentry/geocodelookup',
         modalView: 'shared/lookups/geocodeenterprise-lookup-modal.json'
      },
      GlAccount: {
         valueField: 'glno',
         labelField: function (record) {
            //In AO Profit Distribution, '00' is used as a wild card and should not associate a specific order with the return value.
            //Entered record gnlo will be kept
            if (record.criteria) {
               if (record.criteria.glno.slice(0, 2) === '00') {
                  return record.criteria.glno;
               }
            }
            return record.glno + ' - ' + record.gltitle;
         },
         notesField: 'notesfl',
         rowIdField: 'rowidGlsa',
         mruListKey: null, // can't do MRU on GL Acct since the full account # is a dynamic format and may change
         autoComplete: true,
         IsAutoComplete: true,
         getRecordByValue: function (value, criteria, options, callback) {
            var menuFn = $state.current.data.menuFn;
            if (menuFn) {
               criteria.fromfunction = 'ao.financials.profit-distribution' === $state.current.name ? menuFn + '-profit-dist' : menuFn;
            }
            else {
               criteria.fromfunction = '';
            }
            criteria.glno = value;
            criteria.glyear = Sasc.glcurfisc + 2000;
            var cachedData = CacheService.get(!options.cacheExactMatch, majorBucket, 'GlAccount', criteria);
            if (!cachedData) {
               DataService.post('api/gl/asglinquiry/fetchacctdatafordisplay', { data: criteria }, function (data) {
                  if (data) {
                     data.criteria = criteria;
                     CacheService.set(!options.cacheExactMatch, majorBucket, 'GlAccount', criteria, data, options.cacheExactMatchTimeout);
                     callback(data);
                  } else {
                     callback(null);
                  }
               }, function () {
                  callback(null);
               });
            } else {
               callback(cachedData);
            }
         },
         searchMethod: 'POST',
         searchPath: '/web/api/gl/glsaadvancedsearch',
         searchParams: {
            yr: Sasc.glcurfisc + 2000
         },
         searchParamValueField: 'glacctno',
         maxResultsField: 'recordcountlimit',
         responseField: 'ttblglaccountlookupresults',
         contextEntity: 'Glsa',
         modalView: 'shared/lookups/gl-account-lookup-modal.json'
      },
      GlAccountSub: {
         valueField: 'glno',
         labelField: function (record) {
            return record.glno + ' - ' + record.gltitle;
         },
         notesField: 'notesfl',
         rowIdField: 'rowidGlsa',
         mruListKey: null, // can't do MRU on GL Acct since the full account # is a dynamic format and may change
         autoComplete: true,
         IsAutoComplete: true,
         searchMethod: 'POST',
         searchPath: '/web/api/gl/glsaadvancedsearch',
         searchParams: {
            yr: Sasc.glcurfisc + 2000
         },
         searchParamValueField: 'glacctno',
         maxResultsField: 'recordcountlimit',
         responseField: 'ttblglaccountlookupresults',
         contextEntity: 'Glsa',
         modalView: 'shared/lookups/gl-account-lookup-modal.json'
      },
      GlMemoryLocation: {
         valueField: 'memoryloc',
         labelField: 'memoryloc',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         searchMethod: 'POST',
         searchParamValueField: 'memoryloc',
         searchPath: 'api/gl/glsfm/lookup',
         maxResultsField: 'recordcountlimit',
         responseField: 'glsfmlookupresults',
         modalView: 'shared/lookups/glmemorylocation-lookup-modal.json'
      },
      GlsdGroup: {
         valueField: 'groupnm',
         labelField: 'groupnm',
         rowIdField: 'rowID',
         mruListKey: 'GlsdGroup',
         autoComplete: false,
         searchMethod: 'GET',
         searchPath: 'api/gl/glsd/listbytrans',
         searchParamValueField: 'groupnm',
         searchParams: {
            groupnm: '',
            setno: 0
         },
         modalView: 'shared/lookups/glsd-group-lookup-modal.json'
      },
      GlsdSetno: {
         valueField: 'setno',
         labelField: 'setno',
         rowIdField: 'rowID',
         mruListKey: 'GlsdSetno',
         autoComplete: false,
         searchMethod: 'GET',
         searchPath: 'api/gl/glsd/listbytrans',
         searchParamValueField: 'setno',
         searchParams: {
            groupnm: '',
            setno: 0
         },
         modalView: 'shared/lookups/glsd-group-lookup-modal.json'
      },
      Group: {
         valueField: 'groupid',
         labelField: function (record) {
            return record.groupid + ' - ' + record.name;
         },
         rowIdField: 'rowidArsg',
         mruListKey: 'Group',
         getRecordByValue: 'api/ar/arsg/getbypk?groupid={value}',
         autoComplete: true,
         searchMethod: 'POST',
         searchPath: 'api/ar/arsg/lookup',
         maxResultsField: 'recordcountlimit',
         responseField: 'argrouplookupresults',
         searchParamValueField: 'groupid',
         contextEntity: 'Arsg',
         modalView: 'shared/lookups/group-lookup-modal.json'
      },
      ICReportNo: {
         valueField: 'reportno',
         labelField: 'reportno',
         rowIdField: 'icamaRowid',
         mruListKey: 'ICReportNo',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ic/icama/lookup',
         maxResultsField: 'recordcountlimit',
         responseField: 'icreportnumberlookupresults',
         searchParamValueField: 'reportno',
         modalView: 'shared/lookups/ic-report-lookup-modal.json'
      },
      ICSpecPrcCostPerStk: {
         valueField: 'csunperstk',
         labelField: 'csunperstk',
         applyFormatToLabel: true, // apply the field's decimal formatting to the labelField when record is selected from lookup
         rowIdField: 'rowidIcss',
         mruListKey: 'ICSpecPrcCostPerStk',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ic/icss/lookup',
         searchParams: {
            prod: '',
            activeonly: 'true',
            unit: ''
         },
         responseField: '',
         modalView: 'shared/lookups/spcperstock-lookup-modal.json'
      },
      ICSpecPrcCostUnits: {
         valueField: 'prccostper',
         labelField: 'prccostper',
         rowIdField: 'rowidIcss',
         mruListKey: 'ICSpecPrcCostUnit',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ic/icss/lookup',
         searchParamValueField: 'unit',
         searchParams: {
            prod: '',
            activeonly: 'true',
            unit: ''
         },
         responseField: '',
         modalView: 'shared/lookups/spcperstock-lookup-modal.json'
      },
      IONNoun: {
         toolbarTitle: 'global.error.messages.lookup',
         valueField: 'noun',
         labelField: 'noun',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: '/web/api/sa/IONNounLookup',
         maxResultsField: 'recordcountlimit',
         responseField: 'ttblionnounlookupresults',
         modalView: 'shared/lookups/esb-noun-lookup-modal.json'
      },
      ImportType: {
         valueField: 'imptype',
         labelField: function (record) {
            return record.imptype + ' - ' + record.impdescrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'ImportType',
         autoComplete: false,
         getRecordByValue: 'api/sl/slsi/getbypk?imptype={value}',
         searchMethod: 'POST',
         searchPath: 'api/sl/slsi/getslsilistbyimporttypedesc',
         searchParamValueField: 'imptype',
         searchParams: {
            imptype: '',
            impdescrip: ''
         },
         responseField: '',
         modalView: 'shared/lookups/import-type-lookup-modal.json'
      },
      IntrastatCommodCodes: {
         toolbarTitle: 'global.intrastat.commodity.code',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'IntrastatCommodCode',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'CD'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      Invoices: {
         valueField: 'invno',
         value2Field: 'invsuf',
         labelField: 'label',
         mruListKey: 'Invoice',
         autoComplete: true,
         allowEntry: true,
         searchParams: {
            LookupParameter: 'aret'
         },
         contextEntity: 'Aret',
         modalView: 'shared/lookups/invoice-lookup-modal.json'
      },
      Invoices99Suffix: {
         valueField: 'invno',
         value2Field: 'invsuf',
         labelField: function (record) {
            return record.invno + '-99';
         },
         mruListKey: null, // no MRU here since we don't want these to get included.
         autoComplete: true,
         allowEntry: true,
         searchParams: {
            LookupParameter: 'aret'
         },
         contextEntity: 'Aret',
         modalView: 'shared/lookups/invoice-lookup-modal.json'
      },
      InvoiceSequence: {
         toolbarTitle: 'global.invoice.seq.lookup',
         valueField: 'seqno',
         labelField: function (aret) {
            return Utils.pad(aret.seqno, 3);
         },
         autoComplete: true,
         IsAutoComplete: true,
         getRecordByValue: function (value, criteria, options, callback) {

            if (!criteria || !value || isNaN(value) || isNaN(criteria.invno)) {
               callback(null);
            }

            if (isNaN(criteria.invsuf)) {
               criteria.invsuf = 0;
            }

            var invSeqParams = {
               seqno: value,
               invno: criteria.invno,
               invsuf: criteria.invsuf
            }
            var cachedData = CacheService.get(!options.cacheExactMatch, majorBucket, 'InvoiceSequence', invSeqParams);
            if (!cachedData) {
               DataService.get('api/ar/aret/getbyinvnoinvsufseqno', { params: invSeqParams }, function (data) {
                  if (data) {
                     CacheService.set(!options.cacheExactMatch, majorBucket, 'InvoiceSequence', invSeqParams, data, options.cacheExactMatchTimeout);
                     callback(data);
                  } else {
                     callback(null);
                  }
               });
            } else {
               callback(cachedData);
            }
         },
         searchMethod: 'POST',
         searchPath: 'api/ar/aret/lookupinvoicesequence',
         searchParams: {
            invno: 0,
            invsuf: 0,
            custno: 0,
            transcd: 0,
            statustype: true
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'aretlookupresults',
         searchParamValueField: 'seqno',
         modalView: 'shared/lookups/invoice-sequence-lookup-modal.json'
      },
      Job: {
         toolbarTitle: 'global.job.lookup',
         valueField: 'jobAndRevision',
         labelField: function (jmeh) {
            return jmeh.jobid + ' - ' + jmeh.jobrevno;
         },
         rowIdField: 'rowidJmeh',
         mruListKey: 'Job',
         autoComplete: false,
         getRecordByValue: 'api/jm/jmeh/getbypk?jobid={value}&jobrevno=0', //cannot test, but presumed to work
         searchMethod: 'POST',
         searchPath: 'api/jm/jmeh/lookup',
         searchParams: {
            custno: 0,
            jobid: '',
            jobrevno: 0,
            stagecd: '',
            openonlyfl: false
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'jmjobheaderlookupresults',
         contextEntity: 'Jmeh',
         modalView: 'shared/lookups/job-lookup-modal.json',
         modalController: 'JobLookupModalCtrl as lkupmdl'
      },
      JobGroup: {
         toolbarTitle: 'global.job.group.lookup',
         valueField: 'groupnm',
         labelField: 'groupnm',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         searchMethod: 'POST',
         searchPath: 'api/rs/asrssetup/rssjlookupload',
         searchParams: {
            groupnm: '',
            runty: 'Z',
            fromhour: 12,
            fromminute: 0,
            fromampm: 'AM',
            tohour: 11,
            tominute: 59,
            toampm: 'PM',
            fromtime: '00:00',
            totime: '23:59'
         },
         searchParamValueField: 'groupnm',
         modalView: 'shared/lookups/job-group-lookup-modal.json',
         modalController: 'JobGroupLookupModalCtrl as lkupmdl'
      },
      JobType: {
         valueFiled: 'jobtype',
         labelField: function (record) {
            return record.jobtype + ' - ' + record.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'JobType',
         autoComplete: false,
         getRecordByValue: 'api/sw/swsj/getbypk?jobtype={value}',
         searchMethod: 'POST',
         searchPath: 'api/sw/swsj/listswsjbytypepcatchargeoetype',
         searchParams: {
            oetype: 'b',
            warrantycd: 'a'
         },
         modalView: 'shared/lookups/job-type-lookup-modal.json'
      },
      Journal: {
         valueField: 'jrnlno',
         labelField: 'jrnlno',
         rowIdField: 'sasjRowid',
         mruListKey: 'Journal',
         autoComplete: true,
         searchMethod: 'POST',
         searchPath: 'api/sa/sasj/lookup',
         searchParamValueField: 'jrnlno',
         searchParams: {
            oper2: '',
            jrnlno: 0,
            ourproc: '',
            opendtstart: null,
            opendtend: null,
            unprintedonlyfl: false,
            openonlyfl: false
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'journallookupresults',
         contextEntity: 'Sasj',
         modalView: 'shared/lookups/journal-lookup-modal.json',
         modalController: 'JournalLookupModalCtrl as lkupmdl'
      },
      KitGroup: {
         valueField: 'groupname',
         labelField: 'groupname',
         rowIdField: 'rowidKpsg',
         mruListKey: 'KitGroup',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/kp/kpsg/lookup',
         searchParamValueField: 'groupname',
         responseField: '',
         modalView: 'shared/lookups/kitgroup-lookup-modal.json'
      },
      KitOption: {
         valueField: 'optionname',
         labelField: 'optionname',
         rowIdField: 'rowidKpso',
         mruListKey: 'KitOption',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/kp/kpso/lookup',
         searchParamValueField: 'optionname',
         responseField: '',
         modalView: 'shared/lookups/kitoption-lookup-modal.json'
      },
      KitProductionVersion: {
         valueField: 'verno',
         labelField: 'verno',
         rowIdField: 'rowidKpsk',
         mruListKey: 'KitProductionVersion',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/kp/kpsk/lookup',
         searchParamValueField: 'verno',
         searchParams: {
            prod: '',
            verno: 0,
            lkupsearchfl: true
         },
         responseField: '',
         modalView: 'shared/lookups/kit-production-version-lookup-modal.json'
      },
      KPWorkOrder: {
         valueField: 'wono',
         value2Field: 'wosuf',
         labelField: 'label',
         mruListKey: 'KPWorkOrder',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'kpet'
         },
         contextEntity: 'Kpet',
         modalView: 'shared/lookups/kp-work-order-lookup-modal.json'
      },
      LIFOCat: {
         toolbarTitle: 'global.lifo.category',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'LIFOCat',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'Q'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      LockboxBatch: {
         valueField: 'batch',
         labelField: 'batch',
         rowIdField: 'rowID',
         mruListKey: 'LockboxBatch',
         autoComplete: false,
         getRecordByValue: 'api/ar/arbcb/getbypk?batch={value}',
         searchMethod: 'POST',
         searchPath: 'api/ar/arbcb/getarbcblist',
         searchParamValueField: 'batch',
         searchParams: {
            batch: '',
            operinit: ''
         },
         maxResultsField: 'recordlimit',
         contextEntity: 'Arbcb',
         modalView: 'shared/lookups/lockbox-lookup-modal.json'
      },
      Lot: {
         valueField: 'lotno',
         labelField: 'lotno',
         rowIdField: 'rowidIcsel',
         mruListKey: 'Lot',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ic/icsel/lookup',
         searchParamValueField: 'lotno',
         searchParams: {
            ourproc: '',   //This is only used for the extended controller to disable certain fields.
            lotno: '',
            whse: '',
            prod: '',
            statustype: ''
         },
         maxResultsField: 'recordlimit',
         responseField: 'iclotlookupresults',
         contextEntity: 'Icsel',
         modalView: 'shared/lookups/lot-lookup-modal.json',
         modalController: 'LotLookupModalCtrl as lkupmdl'
      },
      MassMaintenanceSetName: {
         valueField: 'setname',
         labelField: 'setname',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: '/web/api/shared/MMSetNameLookup',
         maxResultsField: 'recordcountlimit',
         responseField: 'ttblmmsetnamelookupresults',
         modalView: 'shared/lookups/mass-maint-set-name-lookup-modal.json',
         modalController: 'MassMaintenanceLookupModalCtrl as lkupmdl'
      },
      MenuItem: {
         valueField: 'functionName',
         labelField: 'functionName',
         rowIdField: 'rowID',
         mruListKey: 'MenuItem',
         searchMethod: 'POST',
         searchPath: 'api/pv/pvsassm/getprsassmforaosystem',
         searchParamValueField: 'functionName',
         modalView: 'shared/lookups/menu-items-lookup-modal.json',
         modalController: 'MenuItemsLookupModalCtrl as lkupmdl'
      },
      NAPClaims: {
         valueField: 'claimno',
         labelField: 'claimno',
         rowIdField: 'pdenhrowid',
         mruListKey: 'NAPClaim',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/pd/aspdinquiry/pdenhlookup',
         searchParamValueField: 'claimno',
         maxResultsField: 'recordcountlimit',
         responseField: 'pdenhlookupresults',
         contextEntity: 'Pdenh',
         modalView: 'shared/lookups/nap-claim-lookup-modal.json'
      },
      OriginCode: {
         toolbarTitle: 'global.origin.code',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'OriginCode',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'OO'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      OriginCodeOE: {
         toolbarTitle: 'global.origin.code',
         valueField: 'codeval',
         labelField: function (sasta) {
            return sasta.codeval + ' - ' + sasta.descrip;
         },
         rowIdField: 'rowidSasta',
         mruListKey: 'OriginCodeOE',
         autoComplete: false,
         getRecordByValue: function (value, criteria, options, callback) {
            criteria.codeval = value;
            var cachedData = CacheService.get(!options.cacheExactMatch, majorBucket, 'OriginCodeOE', criteria);
            if (!cachedData) {
               DataService.post('/web/api/sa/sastalookuporigin', { data: criteria }, function (data) {
                  if (data.ttbllookuporiginresults.length) {
                     CacheService.set(!options.cacheExactMatch, majorBucket, 'OriginCodeOE', criteria, data.ttbllookuporiginresults[0], options.cacheExactMatchTimeout);
                     callback(data.ttbllookuporiginresults[0]);
                  } else {
                     callback(null);
                  }
               });
            } else {
               callback(cachedData);
            }
         },
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: '/web/api/sa/sastalookuporigin',
         searchParams: {
            codeval: ''
         },
         searchParamValueField: 'codeval',
         responseField: 'ttbllookuporiginresults',
         modalView: 'shared/lookups/origin-code-oe-lookup-modal.json'
      },
      Operator: {
         valueField: 'oper2',
         labelField: function (record) {
            return record.oper2 + ' - ' + record.userName;
         },
         rowIdField: 'rowID',
         mruListKey: 'Operator',
         autoComplete: true,
         getRecordByValue: 'api/pv/pvuser/getbypk?oper2={value}',
         allowEntry: true, // TODO: do we always want operator lookups to allowEntry?
         searchMethod: 'POST',
         searchPath: 'api/pv/pvuser/getlistbykeys',
         searchParamValueField: 'oper2',
         searchParams: {
            cono: UserService.getCono(),
            oper2: '',
            userName: '',
            dept: ''
         },
         modalView: 'shared/lookups/operator-lookup-modal.json'
      },
      OEOrders: {
         valueField: 'orderno',
         value2Field: 'ordersuf',
         labelField: 'label',
         mruListKey: 'OEOrder',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'oeeh'
         },
         contextEntity: 'Oeeh',
         modalView: 'shared/lookups/oe-order-lookup-modal.json',
         modalController: 'OEOrderLookupModalCtrl as lkupmdl'
      },
      POOrders: {
         valueField: 'pono',
         value2Field: 'posuf',
         labelField: 'label',
         mruListKey: 'POOrder',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'poeh'
         },
         contextEntity: 'Poeh',
         modalView: 'shared/lookups/po-order-lookup-modal.json'
      },
      POReportNumber: {
         valueField: 'reportno',
         labelField: 'reportno',
         rowIdField: 'rowID',
         mruListKey: 'POReportNumber',
         autoComplete: true,
         searchMethod: 'GET',
         searchPath: 'api/po/poerah/listbybuyer',
         contextEntity: 'Poerah',
         //TODO: Finish and test lookup for sapbrp in the List Options for Report Viewer
         modalView: 'shared/lookups/po-report-number-lookup-modal.json'
      },
      PriceModifier: {
         valueField: 'modifiernm',
         labelField: 'modifiernm',
         mruListKey: 'PriceModifier',
         rowIdField: 'pdscmrowid',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/pd/pdscm/lookup',
         searchParams: {
            lookupfl: true
         },
         searchParamValueField: 'modifiernm',
         maxResultsField: 'recordcountlimit',
         responseField: 'pdscmlookupresults',
         modalView: 'shared/lookups/price-modifier-lookup-modal.json',
         modalController: 'PriceModifierLookupModalCtrl as lkupmdl'
      },
      PriceSheet: {
         valueField: 'pricesheet',
         labelField: 'pricesheet',
         rowIdField: 'rowidPvpdsps',
         mruListKey: 'PriceSheet',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/pv/pvpdsps/lookup',
         maxResultsField: 'recordcountlimit',
         responseField: 'pvpdspslookupresults',
         modalView: 'shared/lookups/price-sheet-lookup-modal.json'
      },
      Printer: {
         toolbarTitle: 'global.printer',
         valueField: 'printernm',
         labelField: function (record) {
            return record.printernm + ' - ' + record.descrip;
         },
         rowIdField: 'rowidSasp',
         mruListKey: 'Printer',
         autoComplete: true,
         searchMethod: 'POST',
         searchPath: 'api/sa/sasp/lookup',
         searchParamValueField: 'printernm',
         searchParams: {
            printernm: '',
            ptype: '',
            pgroup: '',
            blankgroup: false,
            wideonly: false
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'saprinterlookupresults',
         modalView: 'shared/lookups/printer-lookup-modal.json',
         modalController: 'PrinterLookupModalCtrl as lkupmdl'
      },
      PrinterGroup: {
         valueField: 'saspgroup',
         labelField: 'saspgroup',
         rowIdField: 'rowID',
         mruListKey: 'PrinterGroup',
         autoComplete: true,
         searchMethod: 'POST',
         searchPath: 'api/sa/saspg/getsaspgprintergroup',
         searchParamValueField: 'group',
         maxResultsField: 'batchsize',
         modalView: 'shared/lookups/printer-group-lookup-modal.json'
      },
      PrintQueue: {
         valueField: 'queueName',
         labelField: 'queueName',
         rowIdField: 'rowID',
         mruListKey: 'PrintQueue',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/pv/pvsapbq/listbyqueuenameanddemand',
         searchParamValueField: 'queueName',
         searchParams: {
            queueName: '',
            demand: 'a'
         },
         responseField: '',
         modalView: 'shared/lookups/printqueue-lookup-modal.json'
      },
      ProdAll: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         value2Field: 'rectype',
         value3Field: 'altprod',
         value4Field: 'rectype', //need rectype here for when the altprod and icsectype are used
         labelField: 'label',
         mruListKey: 'Prod',
         autoComplete: true,
         cacheExactMatch: false,
         autoCompleteWidth: 450,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsw', 'icsp', 'icsc', 'icsec']
         },
         contextEntity: 'Icsp',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdAllNoDNR: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         value2Field: 'rectype',
         value3Field: 'altprod',
         value4Field: 'rectype', //need rectype here for when the altprod and icsectype are used
         labelField: 'label',
         mruListKey: 'Prod',
         autoComplete: true,
         cacheExactMatch: false,
         autoCompleteWidth: 450,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsw', 'icsp', 'icsec'],
            MustNot: { statustype: ['x'] }
         },
         contextEntity: 'Icsp',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdAllNonStock: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         value2Field: 'rectype',
         value3Field: 'altprod',
         value4Field: 'rectype', //need rectype here for when the altprod and icsectype are used
         labelField: 'label',
         mruListKey: 'Prod',
         autoComplete: true,
         autoCompleteWidth: 450,
         cacheExactMatch: false,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsw', 'icsp', 'icsc', 'icsec', 'icenh']
         },
         contextEntity: 'Icsp',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdCatalog: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         labelField: 'label',
         mruListKey: 'Prod',
         autoComplete: true,
         autoCompleteWidth: 450,
         cacheExactMatch: false,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsc']
         },
         contextEntity: 'Icsc',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdIcsecHAndC: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         value2Field: 'rectype',
         value3Field: 'altprod',
         value4Field: 'rectype', //need rectype here for when the altprod and icsectype are used
         labelField: 'label',
         mruListKey: 'Altprod',
         autoComplete: true,
         autoCompleteWidth: 450,
         cacheExactMatch: false,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsec']
         },
         contextEntity: 'Icsp',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdIcspOnly: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         labelField: 'label',
         mruListKey: 'Prod',
         autoComplete: true,
         autoCompleteWidth: 450,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsp']
         },
         contextEntity: 'Icsp',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdIcspAndXref: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         value2Field: 'rectype',
         value3Field: 'altprod',
         value4Field: 'rectype', //need rectype here for when the altprod and icsectype are used
         labelField: 'label',
         mruListKey: 'Prod',
         autoComplete: true,
         autoCompleteWidth: 450,
         cacheExactMatch: false,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsp', 'icsec']
         },
         contextEntity: 'Icsp',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdIcswAndIcspAndXref: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         value2Field: 'rectype',
         value3Field: 'altprod',
         value4Field: 'rectype', //need rectype here for when the altprod and icsectype are used
         labelField: 'label',
         mruListKey: 'Prod',
         autoComplete: true,
         autoCompleteWidth: 450,
         cacheExactMatch: false,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsw', 'icsp', 'icsec'],
            whse: ''
         },
         contextEntity: 'Icsp',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdIcswOnlyStockStatusOnly: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         labelField: 'label',
         mruListKey: 'Prod',
         autoComplete: true,
         autoCompleteWidth: 450,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsw'],
            statustype: 'S'
         },
         contextEntity: 'Icsp',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdIcswOnlyNoDNR: {
         valueField: 'value',
         getByKeyValueField: 'prod',
         labelField: 'label',
         mruListKey: 'Prod',
         autoComplete: true,
         autoCompleteWidth: 450,
         searchParams: {
            LookupParameter: 'icsw',
            ProductType: ['icsw'],
            MustNot: { statustype: ['x'] }
         },
         contextEntity: 'Icsp',
         modalView: 'shared/lookups/product-lookup-modal.json'
      },
      ProdCat: {
         toolbarTitle: 'global.product.category',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ProdCategory',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'C'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      ProdLine: {
         valueField: 'prodline',
         labelField: 'label',
         mruListKey: 'ProdLine',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'icsl'
         },
         contextEntity: 'Icsl',
         modalView: 'shared/lookups/product-line-lookup-modal.json'
      },
      ProdPriceTy: {
         toolbarTitle: 'global.product.price.type',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ProdPriceType',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'K'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      ProductRebateType: {
         valueField: 'codeval',
         labelField: function (pdst) {
            return pdst.codeval + ' - ' + pdst.descrip;
         },
         rowIdField: 'rowidPdst',
         mruListKey: 'ProdRebateType',
         autoComplete: false,
         getRecordByValue: 'api/pd/pdst/getbypk?codeiden=pt&codeval={value}',
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/pd/pdst/lookup',
         searchParams: {
            pvCodeiden: 'pt',
            pvCodeval: '',
            pvVendno: 0
         },
         maxResultsField: 'pvRecordlimit',
         responseField: 'pdstlookupresults',
         modalView: 'shared/lookups/rebatetype-lookup-modal.json'
      },
      ProductRebateSubType: {
         valueField: 'codeval',
         labelField: function (pdst) {
            return pdst.codeval + ' - ' + pdst.descrip;
         },
         rowIdField: 'rowidPdst',
         mruListKey: 'ProdRebateSubType',
         autoComplete: false,
         getRecordByValue: 'api/pd/pdst/getbypk?codeiden=st&codeval={value}',
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/pd/pdst/lookup',
         searchParams: {
            pvCodeiden: 'st',
            pvCodeval: '',
            pvVendno: 0
         },
         maxResultsField: 'pvRecordlimit',
         responseField: 'pdstlookupresults',
         modalView: 'shared/lookups/rebatesubtype-lookup-modal.json'
      },
      ProdTier: {
         toolbarTitle: 'global.tier',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ProdTier',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'TR'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      ProdPref: {
         toolbarTitle: 'global.preference',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ProdPref',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'PR'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      ProdRestrictions: {
         toolbarTitle: 'global.product.restrictions',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ProdRestriction',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'RC'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      ProductModel: {
         toolbarTitle: 'global.product.model.number',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ProductModel',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'PM'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      ProfileName: {
         toolbarTitle: 'global.profile.name',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ProfileName',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'PF'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      Prospect: {
         valueField: 'prosno',
         labelField: function (cmsp) {
            return cmsp.prosno + ' - ' + cmsp.name;
         },
         rowIdField: 'rowidCmsp',
         mruListKey: 'Prospect',
         autoComplete: false,
         getRecordByValue: 'api/cm/cmsp/getbypk?prosno={value}',
         searchMethod: 'POST',
         searchPath: 'api/cm/cmsp/lookup',
         searchParams: {
            prosno: '',
            name: '',
            phoneno: '',
            city: '',
            state: '',
            zipcd: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'cmprospectlookupresults',
         contextEntity: 'Cmsp',
         modalView: 'shared/lookups/prospect-lookup-modal.json'
      },
      ProspectRating: {
         valueField: 'codeval',
         labelField: function (cmst) {
            return cmst.codeval + ' - ' + cmst.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'ProspectRating',
         autoComplete: false,
         getRecordByValue: 'api/cm/cmst/getbypk?codeiden=pr&codeval={value}&slsrep=',
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/cm/cmst/getcmstlistbyidcodevaldesc',
         searchParamValueField: 'codeval',
         searchParams: {
            codeiden: 'pr',
            codeval: '',
            descrip: '',
            slsrep: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: '',
         modalView: 'shared/lookups/prospect-rating-lookup-modal.json'
      },
      ProspectStage: {
         valueField: 'codeval',
         labelField: function (cmst) {
            return cmst.codeval + ' - ' + cmst.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'ProspectStage',
         autoComplete: false,
         getRecordByValue: 'api/cm/cmst/getbypk?codeiden=ps&codeval={value}&slsrep=',
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/cm/cmst/getcmstlistbyidcodevaldesc',
         searchParamValueField: 'codeval',
         searchParams: {
            codeiden: 'ps',
            codeval: '',
            descrip: '',
            slsrep: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: '',
         modalView: 'shared/lookups/prospect-stage-lookup-modal.json'
      },
      ProspectType: {
         valueField: 'codeval',
         labelField: function (cmst) {
            return cmst.codeval + ' - ' + cmst.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'ProspectType',
         autoComplete: false,
         getRecordByValue: 'api/cm/cmst/getbypk?codeiden=pt&codeval={value}&slsrep=',
         searchMethod: 'POST',
         searchPath: 'api/cm/cmst/getcmstlistbyidcodevaldesc',
         searchParamValueField: 'codeval',
         searchParams: {
            codeiden: 'pt',
            codeval: '',
            descrip: '',
            slsrep: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: '',
         modalView: 'shared/lookups/prospect-type-lookup-modal.json'
      },
      Queues: {
         valueField: 'queuenm',
         labelField: 'queuenm',
         rowIdField: 'rowidRssq',
         mruListKey: 'Queue',
         autoComplete: true,
         getRecordByValue: 'api/rs/rssq/getbypk?queuenm={value}',
         searchMethod: 'POST',
         searchPath: 'api/rs/rssq/lookup',
         searchParams: {
            cfmam: 'AM',
            ctoam: 'PM',
            ifmhour: 0,
            ifmmin: 0,
            itohour: 23,
            itomin: 59,
            priority: 0,
            qstatus: '1',
            queuenm: '',
            starttm: '00:00',
            endtm: '23:59'
         },
         searchParamValueField: 'queuenm',
         maxResultsField: 'recordcountlimit',
         responseField: 'rsqueuelookupresults',
         modalView: 'shared/lookups/queues-lookup-modal.json',
         modalController: 'QueuesLookupModalCtrl as lkupmdl'
      },
      ReasonUnavailable: {
         toolbarTitle: 'global.reason.unavailable',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ReasonUnavailable',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'L'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      Reference: {
         valueField: 'descrip',
         labelField: 'descrip',
         rowIdField: 'rowID',
         mruListKey: 'Reference',
         autoComplete: true,
         IsAutoComplete: true,
         searchMethod: 'POST',
         searchPath: 'api/sa/sastn/lookup',
         maxResultsField: 'recordcountlimit',
         searchParams: {
            codeiden: 'R'
         },
         modalView: 'shared/lookups/reference-lookup-modal.json'
      },
      RepairNumber: {
         valueField: 'repairordno',
         value2Field: 'repairordsuf',
         labelField: function (record) {
            return record.repairordno + '-' + Utils.pad(record.repairordsuf, 2);
         },
         rowIdField: 'rowidSweh',
         mruListKey: 'RepairNumber',
         autoComplete: false,
         getRecordByValue: 'api/sw/sweh/getbypk?repairordno={value}&repairordsuf=0',
         searchMethod: 'POST',
         searchPath: 'api/sw/sweh/lookup',
         searchParamValueField: 'repairordno',
         searchParams: {
            custno: 0,
            repairordsuf: 0,
            openonly: true,
            ordtype: '',
            stage: ''
         },
         maxResultsField: 'recordlimit',
         responseField: 'sworderlookupresults',
         contextEntity: 'Sweh',
         modalView: 'shared/lookups/repairnumber-lookup-modal.json'
      },
      Replenishment: {
         valueField: 'whse',
         labelField: 'whse',
         rowIdField: 'icsrrowid',
         mruListKey: 'Replenishment',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ic/icsr/lookup',
         searchParams: {
            recordtype: '',
            whse: '',
            vendno: '',
            prodline: ''
         },
         maxResultsField: 'recordcountlimit',
         modalView: 'shared/lookups/replenishment-lookup-modal.json'
      },
      ReportGroup: {
         toolbarTitle: 'global.report.group',
         valueField: 'batchnm',
         labelField: 'batchnm',
         rowIdField: 'sapbRowid',
         mruListKey: 'ReportGroup',
         autoComplete: false,
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/shared/assharedentry/reportgrouplookup',
         searchParamValueField: 'batchnm',
         // This lookup needs to allow cono 0 - pass cono as a param where appropriate
         searchParams: {
            cono: null,
            batchnm: ''
         },
         modalView: 'shared/lookups/report-group-lookup-modal.json',
         modalController: 'ReportGroupLookupModalCtrl as lkupmdl'
      },
      ReportItem: {
         valueField: 'currproc',
         labelField: 'currproc',
         rowIdField: 'rowID',
         mruListKey: 'ReportItem',
         autoComplete: false,
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/sa/sassr/listsassrsbykeys',
         searchParamValueField: 'currproc',
         modalView: 'shared/lookups/report-item-lookup-modal.json'
      },
      ReportName: {
         toolbarTitle: 'global.report.name',
         valueField: 'reportnm',
         value2Field: 'cono',
         labelField: 'reportnm',
         rowIdField: 'rowID',
         mruListKey: 'ReportName',
         autoComplete: true,
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/sa/sapb/getsapbbyreportfunction',
         searchParamValueField: 'reportnm',
         // This lookup needs to allow cono 0 - pass cono as a param where appropriate
         searchParams: {
            cono: null,
            currproc: '',
            reportnm: ''
         },
         modalView: 'shared/lookups/report-name-lookup-modal.json',
         modalController: 'ReportNameLookupModalCtrl as lkupmdl'
      },
      ReportSchedules: {
         toolbarTitle: 'global.report.schedules',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ReportSchedule',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'H'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      ReturnReason: {
         toolbarTitle: 'global.return.reason',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ReturnReason',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'M'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      RunNumber: {
         toolbarTitle: 'global.run',
         valueField: 'runno',
         labelField: 'runno',
         rowIdField: 'icsepRowid',
         mruListKey: 'RunNumber',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ic/asicentry/icrunnumberlookup',
         searchParams: {
            whse: ''
         },
         contextEntity: 'Icsep',
         modalView: 'shared/lookups/run-number-lookup-modal.json'
      },
      SalesRep: {
         valueField: 'slsrep',
         labelField: function (record) {
            return record.slsrep + ' - ' + record.name;
         },
         rowIdField: 'rowID',
         mruListKey: 'SalesRep',
         getRecordByValue: 'api/sm/smsn/getbypk?slsrep={value}',
         autoComplete: true,
         searchMethod: 'POST',
         searchPath: 'api/sm/smsn/getsmsnlistbysalesrepandname',
         searchParamValueField: 'slsrepboth',
         searchParams: {
            slsrep: '',
            name: ''
         },
         maxResultsField: 'batchsize',
         contextEntity: 'Smsn',
         modalView: 'shared/lookups/sales-rep-lookup-modal.json'
      },
      SAGroup: {
         valueField: 'groupnm',
         labelField: 'groupnm',
         rowIdField: 'rowID',
         mruListKey: 'SAGroup',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/sa/sasogh/lookup',
         searchParamValueField: 'groupname',
         searchParams: {
            groupname: ''
         },
         maxResultsField: 'recordcountlimit',
         modalView: 'shared/lookups/sa-group-lookup-modal.json'
      },
      //Only used for extensibility.  Do not use this for standard purposes.
      //For implementing these, the user will do the following:
      //1) Add the Lookup to the screen.
      //2) Assign as type as 'SASTZ'
      //3) In Lookup Options for the button, add a Parameter called: 'codeiden', it is of 'String' type and assign
      //   the Value as the 'sastz.codeiden' value for your lookup. (i.e. Salesrep Hours)
      //4) Also in Options, assign the MRU Lookup to something unique to this:  i.e. ZSalesRepHours ).
      Sastz: {
         valueField: 'primarykey',
         labelField: function (record) {
            return record.primarykey + (record.secondarykey ? ' - ' + record.secondarykey : '');
         },
         rowIdField: 'rowidSastz',
         mruListKey: null,  //Each instance of this Lookup will set the mruListKey option so they are unique.
         autoComplete: true,
         searchMethod: 'POST',
         searchPath: 'api/custom/ascustom/customcall',
         searchParamValueField: 'primarykey',
         searchParams: {
            codeiden: '',  //Important: Each instance of this lookup must set the codeiden value as the searchParam
            labelfl: false,
            primarykey: '',
            secondarykey: ''
         },
         maxResultsField: 'recordcountlimit',
         modalView: 'shared/lookups/sastz-lookup-modal.json',
         modalController: 'SastzLookupModalCtrl as lkupmdl',
         getRecordByValue: function (value, criteria, options, callback) {
            //By design, no Caching is built into this since the MRU can be dynamic across the multiple SASTZ LU's.
            DataService.post('api/custom/ascustom/customcall', { data: criteria }, function (data) {
               if (data && data.length > 1) {
                  //The 1st Row contains the criteria (and is discarded) and the 2nd row contains the results.
                  var result = JSON.parse(data[1].data);
                  if (result && result.pdssastzsearchresults) {
                     callback(result.pdssastzsearchresults.ttblsastzsearchresults[0]);
                  } else {
                     callback(null);
                  }
               } else {
                  //Covers situation where they enter invalid data.
                  callback(null);
               }
            });
         },
         searchCriteriaFunction: function (context) {

            var criteria = context.criteria;

            //Apply the AutoComplete value to the key parameter if it exists (Only do this from the lookup, not
            //from when they search in the lookup itself.
            if (context.searchValue) {
               criteria.primarykey = context.searchValue;
               //Note: This doesn't include secondarykey in the AutoComplete.
            }

            var criteriaDataSet = {
               pdssastzsearchcriteria: {
                  ttblsastzsearchcriteria: [criteria]
               }
            };

            return {
               cOperation: 'SASTZ ' + criteria.codeiden,  //This matches the Key in the 'CustomCall' appserver call.
               custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
            };
         },
         transformResults: function (data) {
            if (data && data.length > 1) {
               //The 1st Row contains the criteria (and is discarded) and the 2nd row contains the results.
               var result = JSON.parse(data[1].data);
               if (result && result.pdssastzsearchresults) {
                  return result.pdssastzsearchresults.ttblsastzsearchresults;
               } else {
                  return [];
               }
            } else {
               return [];
            }
         }
      },
      ScheduleType: {
         toolbarTitle: 'global.schedule.type',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ScheduleType',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'H'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      Serial: {
         valueField: 'serialno',
         labelField: 'serialno',
         rowIdField: 'rowidIcses',
         mruListKey: null, // probably don't want MRU here since serial numbers are not reused
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ic/icses/lookup',
         searchParamValueField: 'serialno',
         searchParams: {
            ourproc: '',   //This is only used for the extended controller to disable certain fields.
            whse: '',
            custno: 0,
            prod: '',
            shipto: '',
            serialno: '',
            currstatus: ''
         },
         maxResultsField: 'recordlimit',
         responseField: 'icseriallookupresults',
         contextEntity: 'Icses',
         modalView: 'shared/lookups/serial-lookup-modal.json',
         modalController: 'SerialLookupModalCtrl as lkupmdl'
      },
      SetName: {
         valueField: 'setid',
         labelField: 'setid',
         rowIdField: 'rowidPdem',
         mruListKey: 'SetName',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/pd/aspdentry/pdemlookupsearch',
         searchParams: {
            setid: '',
            source: 'all'
         },
         searchParamValueField: 'setid',
         maxResultsField: 'recordcountlimit',
         responseField: 'pdemlookupresults',
         modalView: 'shared/lookups/setname-lookup-modal.json'
      },
      ShipFrom: {
         valueField: 'shipfmno',
         value2Field: 'vendno',
         labelField: 'label',
         mruListKey: 'ShipFrom',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'apss'
         },
         contextEntity: 'Apss',
         modalView: 'shared/lookups/ship-from-lookup-modal.json'
      },
      ShipTo: {
         valueField: 'shipto',
         value2Field: 'custno',
         labelField: 'label',
         mruListKey: 'ShipTo',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'arss'
         },
         contextEntity: 'Arss',
         modalView: 'shared/lookups/ship-to-lookup-modal.json'
      },
      ShipToGroup: {
         toolbarTitle: 'global.ship.to.group',
         valueField: 'shiptogrp',
         value2Field: 'custno',
         labelField: function (record) {
            return record.shiptogrp + ' - ' + record.shiptogrpname;
         },
         rowIdField: 'arstrowid',
         mruListKey: 'ShipToGroup',
         autoComplete: false, //TODO: might be able to implement getRecordByValue in the future
         searchMethod: 'POST',
         searchPath: 'api/ar/asarsetup/arstgetlist',
         searchParamValueField: 'shiptogrp',
         searchParams: {
            custno: 0,
            shiptogrp: '',
            custnoEnabled: true
         },
         modalView: 'shared/lookups/ship-to-group-lookup-modal.json'
      },
      ShipVia: {
         toolbarTitle: 'global.ship.via',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'ShipVia',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'S'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      ShipViaApsdLimited: {
         valueField: 'shipviaty',
         labelField: 'shipviadesc',
         rowIdField: 'apsdRowid',
         mruListKey: 'ShipViaApsdLimited',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ap/asapsetup/apsdgetlist',
         searchParamValueField: 'shipviaty',
         searchParams: {
            shipviaty: '',
            vendno: '',
            shipfmno: ''
         },
         maxResultsField: 'recordlimit',
         modalView: 'shared/lookups/ship-via-apsd-limited-lookup-modal.json'
      },
      SLLineCode: {
         valueField: 'linecd',
         labelField: 'linecd',
         rowIdField: 'slsnrowid',
         mruListKey: 'SLLineCode',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/sl/slsn/lookuplinecd',
         searchParamValueField: 'linecd',
         searchParams: {
            imptype: '',
            vendcd: '',
            linecd: ''
         },
         modalView: 'shared/lookups/slline-code-lookup-modal.json'
      },
      SLVendorCode: {
         valueField: 'vendcd',
         labelField: 'vendcd',
         rowIdField: 'slsnrowid',
         mruListKey: 'SLVendorCode',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/sl/slsn/lookupvendcd',
         searchParamValueField: 'vendcd',
         searchParams: {
            imptype: '',
            vendcd: ''
         },
         modalView: 'shared/lookups/slvendor-code-lookup-modal.json'
      },
      SourceCode: {
         valueField: 'codeval',
         labelField: function (cmst) {
            return cmst.codeval + ' - ' + cmst.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'SourceCode',
         autoComplete: false,
         getRecordByValue: 'api/cm/cmst/getbypk?codeiden=sc&codeval={value}&slsrep=',
         allowEntry: true, // TODO: are we sure we want to always allow entry for these lookups?
         searchMethod: 'POST',
         searchPath: 'api/cm/cmst/getcmstlistbyidcodevaldesc',
         searchParamValueField: 'codeval',
         searchParams: {
            codeiden: 'sc',
            codeval: '',
            descrip: '',
            slsrep: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: '',
         modalView: 'shared/lookups/source-code-lookup-modal.json'
      },
      StandardPack: {
         toolbarTitle: 'global.standard.pack',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'StandardPack',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'U'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      StockingUnit: {
         toolbarTitle: 'global.stocking.unit',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'StockingUnit',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'U'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      SupplierGroup: {
         valueField: 'codeval',
         labelField: function (slst) {
            return slst.codeval + ' - ' + slst.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'SupplierGroup',
         autoComplete: false,
         getRecordByValue: 'api/sl/slst/getbypk?codeiden=sg&codeval={value}',
         searchMethod: 'POST',
         searchPath: 'api/sl/slst/getsupplierlinksetupforlookup',
         searchParamValueField: 'codeval',
         searchParams: {
            codeiden: 'sg',
            codeval: '',
            descrip: ''
         },
         modalView: 'shared/lookups/suppliergroup-lookup-modal.json'
      },
      Tariff: {
         valueField: 'tariffcd',
         labelField: 'label',
         mruListKey: 'Tariff',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasgt'
         },
         modalView: 'shared/lookups/tariff-lookup-modal.json'
      },
      TaxMasterCity: {
         valueField: 'citycd',
         labelField: function (record) {
            return record.citycd + ' - ' + record.descrip;
         },
         rowIdField: 'rowidSasgm',
         mruListKey: 'TaxMasterCity',
         autoComplete: false,
         getRecordByValue: 'api/sa/sasgm/getbypk?recty=4&taxgroup=1&statecd=&countycd=&citycd={value}&othercd=',
         searchMethod: 'POST',
         searchPath: 'api/sa/sasgm/lookup',
         searchParamValueField: 'citycd',
         searchParams: {
            recty: 4,
            taxgroup: 1,
            statecd: '',
            countycd: '',
            citycd: '',
            othercd: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'sataxmasterlookupresults',
         modalView: 'shared/lookups/tax-master-lookup-modal.json'
      },
      TaxMasterCounty: {
         valueField: 'countycd',
         labelField: function (record) {
            return record.countycd + ' - ' + record.descrip;
         },
         rowIdField: 'rowidSasgm',
         mruListKey: 'TaxMasterCounty',
         autoComplete: false,
         getRecordByValue: 'api/sa/sasgm/getbypk?recty=3&taxgroup=1&statecd=&countycd={value}&citycd=&othercd=',
         searchMethod: 'POST',
         searchPath: 'api/sa/sasgm/lookup',
         searchParamValueField: 'countycd',
         searchParams: {
            recty: 3,
            taxgroup: 1,
            statecd: '',
            countycd: '',
            citycd: '',
            othercd: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'sataxmasterlookupresults',
         modalView: 'shared/lookups/tax-master-lookup-modal.json'
      },
      TaxMasterOther: {
         valueField: 'othercd',
         labelField: function (record) {
            return record.othercd + ' - ' + record.descrip;
         },
         rowIdField: 'rowidSasgm',
         mruListKey: 'TaxMasterOther',
         autoComplete: false,
         getRecordByValue: 'api/sa/sasgm/getbypk?recty=5&taxgroup=1&statecd=&countycd=&citycd=&othercd={value}',
         searchMethod: 'POST',
         searchPath: 'api/sa/sasgm/lookup',
         searchParamValueField: 'othercd',
         searchParams: {
            recty: 5,
            taxgroup: 1,
            statecd: '',
            countycd: '',
            citycd: '',
            othercd: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'sataxmasterlookupresults',
         modalView: 'shared/lookups/tax-master-lookup-modal.json'
      },
      TaxMasterProvince: {
         valueField: 'state',
         labelField: function (record) {
            return record.state + ' - ' + record.descrip;
         },
         rowIdField: 'rowidSasgs',
         mruListKey: 'TaxMasterProvince',
         autoComplete: false,
         getRecordByValue: 'api/sa/sasgs/getbypk?state={value}',
         searchMethod: 'POST',
         searchPath: 'api/sa/sasgs/lookup',
         searchParamValueField: 'state',
         searchParams: {
            state: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'sastatetaxlookupresults',
         modalView: 'shared/lookups/tax-province-lookup-modal.json'
      },
      TaxMasterState: {
         valueField: 'statecd',
         labelField: function (record) {
            return record.statecd + ' - ' + record.descrip;
         },
         rowIdField: 'rowidSasgm',
         mruListKey: 'TaxMasterState',
         autoComplete: false,
         getRecordByValue: 'api/sa/sasgm/getbypk?recty=2&taxgroup=1&statecd={value}&countycd=&citycd=&othercd=',
         searchMethod: 'POST',
         searchPath: 'api/sa/sasgm/lookup',
         searchParamValueField: 'statecd',
         searchParams: {
            recty: 2,
            taxgroup: 1,
            statecd: '',
            countycd: '',
            citycd: '',
            othercd: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'sataxmasterlookupresults',
         modalView: 'shared/lookups/tax-master-lookup-modal.json'
      },
      Terms: {
         toolbarTitle: 'global.terms',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'Term',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'T'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      Territories: {
         toolbarTitle: 'global.territories',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'Territory',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'Z'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      TrackingNumber: {
         valueField: 'trackno',
         labelField: 'trackno',
         rowIdField: 'rowidOteh',
         mruListKey: 'TrackingNumber',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ot/oteh/lookup',
         searchParamValueField: 'trackno',
         maxResultsField: 'recordcountlimit',
         responseField: 'otorderlookupresults',
         contextEntity: 'Oteh',
         modalView: 'shared/lookups/tracking-number-lookup-modal.json'
      },
      TransportationMethod: {
         toolbarTitle: 'global.transportation.method',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'TransportationMethod',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'TM'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      TransportationServiceLevel: {
         toolbarTitle: 'global.transportation.service.level',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'TransportationServiceLevel',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'TS'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      TransportationStandardCarrier: {
         toolbarTitle: 'global.transportation.standard.carrier',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'TransportationStandardCarrier',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'TC'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      TriggerName: {
         valueField: 'triggername',
         labelField: 'triggername',
         rowIdField: 'rowID',
         mruListKey: 'TriggerName',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/shared/triggersetup/getlistbyname',
         searchParamValueField: 'triggerName',
         modalView: 'shared/lookups/triggername-lookup-modal.json'
      },
      Units: {
         valueField: 'units',
         value2Field: 'prod',
         labelField: 'label',
         mruListKey: 'Unit',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'units',
            UnitType: ['sasta', 'icseu'],
            codeiden: 'U'
         },
         modalView: 'shared/lookups/unit-lookup-modal.json'
      },
      UpdateNumber: {
         valueField: 'slupdtno',
         labelField: 'slupdtno',
         rowIdField: 'slehrowid',
         mruListKey: 'UpdateNumber',
         searchMethod: 'POST',
         searchParamValueField: 'slupdtno',
         searchPath: 'api/sl/sleh/lookup',
         modalView: 'shared/lookups/updatenumber-lookup-modal.json'
      },
      UsageOrdQtyOverride: {
         toolbarTitle: 'global.lookup.usage.order.qty.override',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'UsageOrdQtyOverride',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'O'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      UserCode1: {
         valueField: 'codeval',
         labelField: function (cmst) {
            return cmst.codeval + ' - ' + cmst.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'UserCode1',
         autoComplete: false,
         getRecordByValue: 'api/cm/cmst/getbypk?codeiden=u1&codeval={codeval}&slsrep=',
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/cm/cmst/getcmstlistbyidcodevaldesc',
         searchParamValueField: 'codeval',
         searchParams: {
            codeiden: 'u1',
            codeval: '',
            descrip: '',
            slsrep: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: '',
         modalView: 'shared/lookups/user-code1-lookup-modal.json'
      },
      UserCode2: {
         valueField: 'codeval',
         labelField: function (cmst) {
            return cmst.codeval + ' - ' + cmst.descrip;
         },
         rowIdField: 'rowID',
         mruListKey: 'UserCode2',
         autoComplete: false,
         getRecordByValue: 'api/cm/cmst/getbypk?codeiden=u2&codeval={value}&slsrep=',
         allowEntry: true,
         searchMethod: 'POST',
         searchPath: 'api/cm/cmst/getcmstlistbyidcodevaldesc',
         searchParamValueField: 'codeval',
         searchParams: {
            codeiden: 'u2',
            codeval: '',
            descrip: '',
            slsrep: ''
         },
         maxResultsField: 'recordcountlimit',
         responseField: '',
         modalView: 'shared/lookups/user-code2-lookup-modal.json'
      },
      UserGroup: {
         toolbarTitle: 'global.user.group',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'UserGroup',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'UG'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      UserRecords: {
         toolbarTitle: 'global.user.records',
         valueField: 'primarykey',
         labelField: 'primarykey',
         rowIdField: 'rowID',
         autoComplete: false,
         mruListKey: 'UserRecord',
         searchMethod: 'POST',
         searchPath: 'api/sa/assainquiry/sasulookup',
         searchParamValueField: 'primarykey',
         searchParams: {
            cPrimarykey: ''
         },
         maxResultsField: 'recordcountlimit',
         modalView: 'shared/lookups/user-record-lookup-modal.json'
      },
      Vendor: {
         valueField: 'vendno',
         labelField: 'label',
         mruListKey: 'Vendor',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'apsv'
         },
         contextEntity: 'Apsv',
         modalView: 'shared/lookups/vendor-lookup-modal.json'
      },
      VendorContract: {
         toolbarTitle: 'global.vendor.contract',
         valueField: 'contractno',
         labelField: 'contractno',
         rowIdField: 'pdsvcRowid',
         mruListKey: 'VendorContract',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/pd/pdsvc/lookup',
         searchParamValueField: 'contractno',
         searchParams: {
            vendno: 0,
            whse: '',
            levelcd: 'a',
            statuscd: 'a'
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'pdsvclookupresults',
         modalView: 'shared/lookups/vendorcontract-lookup-modal.json',
         modalController: 'VendorContractLookupModalCtrl as lkupmdl'
      },
      ValueAddRule: {
         valueField: 'sequence',
         labelField: 'sequence',
         rowIdField: 'rowidVaspsasr',
         searchMethod: 'POST',
         searchPath: 'api/va/vaspsasr/lookup',
         searchParams: {
            segment: '',
            shipprod: '',
            whse: '',
            verno: 0,
            noupdatefl: false
         },
         searchParamValueField: 'sequence',
         responseField: 'vasprulelookupresults',
         modalView: 'shared/lookups/valueadd-rule-lookup-modal.json'
      },
      ValueAddVersion: {
         valueField: 'verno',
         labelField: 'verno',
         rowIdField: 'rowid',
         mruListKey: 'VAVersion',
         searchMethod: 'POST',
         searchPath: 'api/va/asvasetup/vaspheaderlookup',
         searchParams: {
            prod: '',
            whse: '',
            verno: 0
         },
         searchParamValueField: 'verno',
         responseField: 'vaspheaderlistresults',
         modalView: 'shared/lookups/versionnumber-lookup-modal.json'
      },
      VAOrders: {
         valueField: 'vano',
         value2Field: 'vasuf',
         labelField: 'label',
         mruListKey: 'VAOrder',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'vaeh'
         },
         contextEntity: 'Vaeh',
         modalView: 'shared/lookups/va-order-lookup-modal.json'
      },
      VASections: {
         valueField: 'seqno',
         labelField: 'seqno',
         rowIdField: 'vaesRowid',
         mruListKey: 'VASection',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/va/vaes/lookup',
         searchParams: {
            vano: 0,
            vasuf: 0,
            seqno: 0,
            activeonly: false
         },
         maxResultsField: 'recordcountlimit',
         responseField: 'vasectionlookupresults',
         contextEntity: 'Vaes',
         modalView: 'shared/lookups/vasections-lookup-modal.json'
      },
      VendorType: {
         toolbarTitle: 'global.vendor.type',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'VendorType',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'VT'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      VesselNo: {
         toolbarTitle: 'global.vessel.lookup',
         valueField: 'vesselno',
         labelField: 'vesselno',
         rowIdField: 'rowidOtevh',
         mruListKey: 'VesselNo',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/ot/otevh/lookup',
         searchParams: {
            stagecd: '',
            openonly: 'true'
         },
         searchParamValueField: 'vesselno',
         maxResultsField: 'recordcountlimit',
         responseField: 'otvessellookupresults',
         modalView: 'shared/lookups/vessel-number-lookup-modal.json'
      },
      Warehouse: {
         valueField: 'whse',
         labelField: 'label',
         mruListKey: 'Warehouse',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'icsd'
         },
         contextEntity: 'Icsd',
         modalView: 'shared/lookups/warehouse-lookup-modal.json'
      },
      WarehouseGroup: {
         toolbarTitle: 'global.warehouse.group',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'WarehouseGroup',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'WG'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      WLLocation: {
         valueField: 'wlloc',
         labelField: 'wlloc',
         rowIdField: 'rowID',
         mruListKey: 'WLLoc',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/wl/wlal/getwlalbylocationdescription',
         searchParamValueField: 'wlloc',
         searchParams: {
            wlloc: '',
            descrip: ''
         },
         responseField: '',
         modalView: 'shared/lookups/wl-location-lookup-modal.json'
      },
      WTOrders: {
         valueField: 'wtno',
         value2Field: 'wtsuf',
         labelField: 'label',
         mruListKey: 'WTOrder',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'wteh'
         },
         contextEntity: 'Wteh',
         modalView: 'shared/lookups/wt-order-lookup-modal.json'
      },
      WTReasonCode: {
         toolbarTitle: 'global.reason.code',
         valueField: 'codeval',
         labelField: 'label',
         mruListKey: 'WTReasonCode',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'sasta',
            codeiden: 'RT'
         },
         modalView: 'shared/lookups/sasta-lookup-modal.json'
      },
      TWLBinLocation: {
         valueField: 'binNum',
         labelField: 'binNum',
         rowIdField: 'rowID',
         mruListKey: 'TWLBinLoc',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/astwlsetup/getbinlocationlist',
         searchParams: {
            coNum: '',
            whNum: '',
            binNum: '',
            fldlist: 'co_num,wh_num,bin_num,wh_zone,prim_pick,abs_num'
         },
         searchParamValueField: 'binNum',
         responseField: 'binlocationresults',
         modalView: 'shared/lookups/twlbinlocation-lookup-modal.json'
      },
      TWLBinLocationWithAlternates: {
         valueField: 'binNum',
         labelField: 'binNum',
         rowIdField: 'rowID',
         mruListKey: 'TWLBinLocWithAlt',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/astwlsetup/getbinlocationlistwithalternates',
         searchParams: {
            coNum: '',
            whNum: '',
            binNum: '',
            fldlist: 'co_num,wh_num,bin_num,wh_zone,prim_pick,abs_num'
         },
         searchParamValueField: 'binNum',
         responseField: 'binlocationresults',
         modalView: 'shared/lookups/twlbinlocationwithalternates-lookup-modal.json'
      },
      TWLCarrier: {
         valueField: 'carrierId',
         labelField: 'carrierId',
         rowIdField: 'rowID',
         mruListKey: 'TWLCarrier',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/carrier/gettwlcarriers',
         searchParams: {
            coNum: '',
            whNum: '',
            carrierId: '',
            fldlist: 'co_num,wh_num,carrier_id,name'
         },
         searchParamValueField: 'carrierId',
         modalView: 'shared/lookups/twlcarrier-lookup-modal.json'
      },
      TWLCarrierService: {
         valueField: 'service',
         labelField: 'service',
         rowIdField: 'rowID',
         mruListKey: 'TWLCarrierService',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/carrierservice/gettwlcarrierservices',
         searchParams: {
            coNum: '',
            whNum: '',
            carrierid: '',
            fldlist: 'co_num,wh_num,carrier_id,service,name'
         },
         searchParamValueField: 'service',
         modalView: 'shared/lookups/twlcarrierservice-lookup-modal.json'
      },
      TWLCycleWave: {
         valueField: 'waveId',
         labelField: 'waveId',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/astwlinquiry/getccwavelist',
         searchParams: {
            coNum: '',
            whNum: '',
            waveId: '',
            statusType: '',
            fromDate: '',
            toDate: '',
            fldlist: 'co_num,wh_num,waveId,cycle_string,requested,started,completed,emp_num'
         },
         searchParamValueField: 'waveId',
         modalView: 'shared/lookups/twl-cycle-count-wave-lookup-modal.json',
         modalController: 'TWLCycleCountWaveLookupModalCtrl as lkupmdl'
      },
      TWLCartonSize: {
         valueField: 'boxId',
         labelField: function (record) {
            return record.boxId + ' - ' + record.description;
         },
         rowIdField: 'rowID',
         mruListKey: 'TWLCartonSize',
         autoComplete: false,
         getRecordByValue: 'api/twl/cartonsize/getbypk?coNum=&whNum=&boxId={value}&cube=', //could not test, presumed to work
         searchMethod: 'POST',
         searchPath: 'api/twl/cartonsize/gettwlcartonsizes',
         searchParams: {
            coNum: '',
            whNum: '',
            boxId: '',
            fldlist: 'co_num,wh_num,box_id,description'
         },
         searchParamValueField: 'boxId',
         modalView: 'shared/lookups/twlcartonsize-lookup-modal.json'
      },
      TWLDbFieldName: {
         valueField: 'fieldName',
         labelField: 'fieldName',
         rowIdField: null,
         mruListKey: null, // no MRU here since no row id on lookup records
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/astwlinquiry/getdbfieldnames',
         searchParams: {
            fileName: '',
            fldlist: 'fieldName,fieldDataType,fieldLabel,fieldFormat'
         },
         searchParamValueField: 'fieldName',
         modalView: 'shared/lookups/twldbfieldname-lookup-modal.json'
      },
      TWLDepartment: {
         valueField: 'deptNum',
         labelField: function (record) {
            return record.deptNum + ' - ' + record.deptName;
         },
         rowIdField: 'rowID',
         mruListKey: 'TWLDepartment',
         autoComplete: false,
         getRecordByValue: 'api/twl/depmst/getbypk?coNum=&whNum=&deptNum={value}',
         searchMethod: 'POST',
         searchPath: 'api/twl/depmst/gettwldepartments',
         searchParams: {
            coNum: '',
            whNum: '',
            deptNum: '',
            deptType: '',
            fldlist: 'co_num,wh_num,dept_num,dept_name'
         },
         searchParamValueField: 'deptNum',
         modalView: 'shared/lookups/twldepartment-lookup-modal.json'
      },
      TWLDock: {
         valueField: 'dockId',
         labelField: 'dockId',
         rowIdField: 'rowID',
         mruListKey: 'TWLDock',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/dockmstr/gettwldocks',
         searchParams: {
            coNum: '',
            whNum: '',
            dockId: '',
            fldlist: 'co_num,wh_num,dock_id,name'
         },
         searchParamValueField: 'dockId',
         modalView: 'shared/lookups/twldock-lookup-modal.json'
      },
      TWLEmployee: {
         valueField: 'empNum',
         labelField: 'empNum',
         rowIdField: 'rowID',
         mruListKey: 'TWLEmployee',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/empmst/gettwlemployees',
         searchParams: {
            coNum: '',
            whNum: '',
            empNum: '',
            fldlist: 'co_num,wh_num,emp_num,emp_name'
         },
         searchParamValueField: 'empNum',
         modalView: 'shared/lookups/twlemployee-lookup-modal.json'
      },
      TWLEodFileRetention: {
         valueField: 'fileName',
         labelField: 'fileName',
         rowIdField: 'rowID',
         mruListKey: 'TWLEodFileRetention',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/fileretent/gettwlfileretentions',
         searchParams: {
            fileName: '',
            fldlist: 'file_name,description'
         },
         searchParamValueField: 'fileName',
         modalView: 'shared/lookups/twlfileretention-lookup-modal.json'
      },
      TWLInvAdjustment: {
         valueField: 'adjCode',
         labelField: 'adjCode',
         rowIdField: 'rowID',
         mruListKey: 'TWLInvAdjustment',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/invadj/gettwlinvadjustments',
         searchParams: {
            coNum: '',
            whNum: '',
            adjCode: '',
            fldlist: 'co_num,wh_num,adj_code,adj_desc'
         },
         searchParamValueField: 'adjCode',
         modalView: 'shared/lookups/twlinvadjustment-lookup-modal.json'
      },
      TWLItem: {
         valueField: 'abs_num',
         labelField: 'label',
         mruListKey: 'TWLItem',
         autoComplete: true,
         searchParams: {
            LookupParameter: 'item'
         },
         modalView: 'shared/lookups/twl-item-lookup-modal.json'
      },
      TWLOrder: {
         valueField: 'order',
         value2Field: 'orderSuffix',
         labelField: 'order',
         rowIdField: 'rowID',
         mruListKey: 'TWLOrder',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/ordhdr/gettwlorders',
         maxResultsField: 'batchsize',
         searchParams: {
            coNum: '',
            whNum: '',
            order: '',
            orderBegins: '',
            orderSuffixBegins: '',
            orderDateFrom: '',
            orderDateTo: '',
            orderStatus: '',
            carrierBegins: '',
            fldlist: 'co_num,wh_num,order,order_suffix,order_date,order_status,carrier,comment,id'
         },
         searchParamValueField: 'orderBegins',
         modalView: 'shared/lookups/twlorder-lookup-modal.json',
         modalController: 'TWLOrderLookupModalCtrl as lkupmdl'
      },
      TWLOrderClass: {
         valueField: 'code',
         labelField: 'code',
         rowIdField: 'rowID',
         mruListKey: 'TWLOrderClass',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/orderclass/gettwlorderclasses',
         searchParams: {
            code: '',
            name: '',
            rowStatus: true,
            fldlist: 'row_status,code,name'
         },
         searchParamValueField: 'code',
         modalView: 'shared/lookups/twlorderclass-lookup-modal.json'
      },
      TWLOrderStatus: {
         valueField: 'code',
         labelField: 'code',
         rowIdField: 'rowID',
         mruListKey: 'TWLOrderStatus',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/ordhdrstatus/listbyname',
         searchParams: {
            code: '',
            name: '',
            fldlist: 'code,name'
         },
         searchParamValueField: 'code',
         modalView: 'shared/lookups/twlorderstatus-lookup-modal.json'
      },
      TWLOrderType: {
         valueField: 'code',
         labelField: 'code',
         rowIdField: 'rowID',
         mruListKey: 'TWLOrderType',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/ordertype/listbyname',
         searchParams: {
            code: '',
            name: '',
            fldlist: 'code,name'
         },
         searchParamValueField: 'code',
         modalView: 'shared/lookups/twlordertype-lookup-modal.json'
      },
      TWLPallets: {
         valueField: 'palletId',
         labelField: 'palletId',
         rowIdField: 'inventoryRowID',
         mruListKey: 'TWLPallet',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/astwlinquiry/getactivepallets',
         searchParams: {
            coNum: '',
            whNum: '',
            binNum: '',
            palletId: '',
            fldlist: 'co_num,wh_num,palletId,binNum'
         },
         searchParamValueField: 'palletId',
         modalView: 'shared/lookups/twl-pallet-lookup-modal.json'
      },
      TWLPrinter: {
         valueField: 'printerId',
         labelField: 'printerId',
         rowIdField: 'rowID',
         mruListKey: 'TWLPrinter',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/printmst/gettwlprinters',
         searchParams: {
            coNum: '',
            whNum: '',
            printerId: '',
            fldlist: 'co_num,wh_num,printer_id,description'
         },
         searchParamValueField: 'printerId',
         modalView: 'shared/lookups/twlprinter-lookup-modal.json'
      },
      TWLProductCategory: {
         valueField: 'prodcat',
         labelField: function (record) {
            return record.prodcat + ' - ' + record.description;
         },
         rowIdField: 'rowID',
         mruListKey: 'TWLProdCat',
         autoComplete: false,
         getRecordByValue: 'api/twl/prodcat/getbypk?coNum=&whNum=&prodcat={value}&prodcat=',
         searchMethod: 'POST',
         searchPath: 'api/twl/prodcat/gettwlprodcats',
         searchParams: {
            coNum: '',
            whNum: '',
            prodcat: '',
            fldlist: 'co_num,wh_num,prodcat,description'
         },
         searchParamValueField: 'prodcat',
         modalView: 'shared/lookups/twlprodcat-lookup-modal.json'
      },
      TWLLabelPrinters: {
         valueField: 'printerId',
         labelField: 'printerId',
         rowIdField: 'rowID',
         mruListKey: 'TWLLabelPrinter',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/printmst/gettwlprinters',
         searchParams: {
            coNum: '',
            whNum: '',
            printerId: '',
            printType: 'Label',
            fldlist: 'co_num,wh_num,printer_id,description'
         },
         searchParamValueField: 'printerId',
         modalView: 'shared/lookups/twlprinter-lookup-modal.json'
      },
      TWLPurchaseOrder: {
         valueField: 'poFull',
         labelField: 'poFull',
         rowIdField: 'rtdetrowid',
         mruListKey: 'TWLPurchaseOrder',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/astwlinquiry/getpolist',
         maxResultsField: 'recordcountlimit',
         searchParams: {
            coNum: '',
            whNum: '',
            poNum: '',
            poSuffix: '',
            vendorID: ''
         },
         searchParamValueField: 'poFull',
         responseField: 'getporesults',
         modalView: 'shared/lookups/twlpurchaseorder-lookup-modal.json'
      },
      TWLReportPrinters: {
         valueField: 'printerId',
         labelField: 'printerId',
         rowIdField: 'rowID',
         mruListKey: 'TWLReportPrinter',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/printmst/gettwlprinters',
         searchParams: {
            coNum: '',
            whNum: '',
            printerId: '',
            printType: 'Report',
            fldlist: 'co_num,wh_num,printer_id,description'
         },
         searchParamValueField: 'printerId',
         modalView: 'shared/lookups/twlprinter-lookup-modal.json'
      },
      TWLReturnCategory: {
         valueField: 'rtnCategory',
         labelField: 'rtnCategory',
         rowIdField: 'rowID',
         mruListKey: 'TWLReturnCategory',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/returncategory/gettwlreturncategories',
         searchParams: {
            coNum: '',
            whNum: '',
            rtnCategory: '',
            fldlist: 'co_num,wh_num,rtn_category,description'
         },
         searchParamValueField: 'rtnCategory',
         modalView: 'shared/lookups/twlreturncategory-lookup-modal.json'
      },
      TWLReturnReason: {
         valueField: 'code',
         labelField: 'code',
         rowIdField: 'rowID',
         mruListKey: 'TWLReturnReason',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/returnreason/gettwlreturnreasons',
         searchParams: {
            coNum: '',
            whNum: '',
            deptNum: '',
            fldlist: 'co_num,wh_num,code,description'
         },
         searchParamValueField: 'code',
         modalView: 'shared/lookups/twlreturnreason-lookup-modal.json'
      },
      TWLShift: {
         valueField: 'shfNum',
         labelField: 'shfNum',
         rowIdField: 'rowID',
         mruListKey: 'TWLShift',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/shfmst/gettwlshifts',
         searchParams: {
            coNum: '',
            whNum: '',
            shfNum: '',
            fldlist: 'co_num,wh_num,shf_num,shf_desc'
         },
         searchParamValueField: 'shfNum',
         modalView: 'shared/lookups/twlshift-lookup-modal.json'
      },
      TWLTransType: {
         valueField: 'transType',
         labelField: 'transType',
         rowIdField: 'rowID',
         mruListKey: 'TWLTransType',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/transtype/gettwltranstypes',
         searchParams: {
            coNum: '',
            whNum: '',
            transType: '',
            fldlist: 'co_num,wh_num,trans_type,trans_name'
         },
         searchParamValueField: 'transType',
         modalView: 'shared/lookups/twltranstype-lookup-modal.json'
      },
      TWLUnitOfMeasure: {
         valueField: 'uom',
         labelField: 'uom',
         rowIdField: 'rowID',
         mruListKey: 'TWLUOM',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/uom/gettwlunitofmeasures',
         searchParams: {
            uom: '',
            fldlist: 'uom,uom_desc'
         },
         modalView: 'shared/lookups/twlunitofmeasure-lookup-modal.json'
      },
      TWLVendor: {
         valueField: 'vendorId',
         labelField: 'vendorId',
         rowIdField: 'venmstrowid',
         mruListKey: 'TWLVendor',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/astwlinquiry/getvendorlist',
         maxResultsField: 'recordcountlimit',
         searchParams: {
            coNum: '',
            whNum: '',
            vendorId: '',
            vendorName: '',
            contactName: ''
         },
         responseField: 'getvendorresults',
         modalView: 'shared/lookups/twlvendor-lookup-modal.json'
      },
      TWLWarehouse: {
         valueField: 'wh_num',
         labelField: 'label',
         mruListKey: 'TWLWarehouse',
         searchParams: {
            LookupParameter: 'whmst'
         },
         contextEntity: 'Icsd',
         modalView: 'shared/lookups/twl-warehouse-lookup-modal.json'
      },
      TWLWave: {
         valueField: 'batch',
         labelField: 'batch',
         rowIdField: 'rowID',
         mruListKey: 'TWLWave',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/wave/gettwlwaves',
         maxResultsField: 'batchsize',
         searchParams: {
            coNum: '',
            whNum: '',
            batch: '',
            batchEquality: '>=',
            dropDateFrom: '',
            dropDateTo: '',
            waveStatus: 'Open',
            fldlist: 'co_num,wh_num,batch,ship_date_time,active_date_time,drop_date_time,order_count,line_count,weight,cube,drop_price'
         },
         searchParamValueField: 'batch',
         modalView: 'shared/lookups/twlwave-lookup-modal.json',
         modalController: 'TWLWaveLookupModalCtrl as lkupmdl'
      },
      TWLWhZone: {
         valueField: 'whZone',
         labelField: 'whZone',
         rowIdField: 'rowID',
         mruListKey: 'TWLWhZone',
         autoComplete: false,
         searchMethod: 'POST',
         searchPath: 'api/twl/whzone/gettwlzones',
         searchParams: {
            coNum: '',
            whNum: '',
            searchType: '',
            keyField: '',
            whZone: '',
            fldlist: 'co_num,wh_num,pick_sequence,wh_zone,zone_desc'
         },
         searchParamValueField: 'whZone',
         modalView: 'shared/lookups/twl-warehouse-zone-lookup-modal.json'
      }
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!!! Add all new Lookup references in alphabetical order - it's easier to find the code.
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   };

});