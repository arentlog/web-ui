'use strict';

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   Please add new ones alphabetically
   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

/**
 * Definitions of all our dynamic drop down option sets.
 */
app.factory('DynamicOptionSets', function DynamicOptionSets(TwlConverters) {

   return {
      ACHPayment: {
         additionalParams: '',
         dataPath: 'api/shared/assharedinquiry/tablecodenumeric/achpaytype',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      Addon: {
         dataPath: 'api/shared/assharedinquiry/tablecodenumeric/sastn=a',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      Authority: {
         dataPath: 'api/sa/sasgl',
         valueField: 'taxauth',
         labelField: 'descrip',
         cache: false
      },
      Bank: {
         dataPath: 'api/shared/crsb',
         valueField: 'bankno',
         labelField: 'name'
      },
      BinType: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/wmst=bt',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      Company: {
         dataPath: 'api/shared/assharedinquiry/tablecodenumeric/sasc',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      County: {
         dataPath: 'api/sa/sasgm/getlistbyquery/3/1',
         valueField: 'countycd',
         labelField: 'descrip',
         cache: false
      },
      City: {
         dataPath: 'api/sa/sasgm/getlistbyquery/4/1',
         valueField: 'citycd',
         labelField: 'descrip',
         cache: false
      },
      Currency: {
         dataPath: 'api/sa/sastc',
         valueField: 'currencyty',
         labelField: 'descrip'
      },
      ConditionCode: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=cc',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      Country: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=w',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      ContactType: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=ct',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      CreditCardPayment: {
         additionalParams: '',
         dataPath: 'api/shared/assharedinquiry/tablecodenumeric/ccpaytype',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      Destination: {
         dataPath: 'api/pd/aspdentry/pdemexcelimportnewinit',
         responseField: 'pdemexcelimportdropdowns',
         valueField: 'codeval',
         labelField: 'codedesc'
      },
      Division: {
         dataPath: 'api/shared/assharedinquiry/tablecodenumeric/sastn=v',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      FamilyGroup: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=i',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      FreightTerm: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=ft',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      FreightConsolidation: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=fc',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      FrozenReason: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=f',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      GLReportGroups: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=g',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      Language: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=y',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      LostBusinessReason: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=e',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      MerchantID: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=mi',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      NonTaxReason: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=n',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      OrderEntryTransaction: {
         dataPath: 'api/oe/asoeheader/loadoetranstypes/true',
         responseField: 'loadoetranstypes',
         valueField: 'transtype',
         labelField: 'transtypedesc'
      },
      Payment: {
         dataPath: 'api/shared/assharedinquiry/tablecodenumeric/sastn=p',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      PDAR: {
         dataPath: 'api/pd/pdar?batchsize=1000',
         valueField: 'methodno',
         labelField: 'descrip'
      },
      Processor: {
         dataPath: 'api/sa/sastp',
         valueField: 'processno',
         labelField: 'name'
      },
      ProdListType: {
         dataPath: 'api/ic/icspl',
         valueField: 'type',
         labelField: 'descrip'
      },
      Province: {
         dataPath: 'api/sa/sasgs',
         valueField: 'state',
         labelField: 'descrip',
         cache: false
      },
      POAddon: {
         dataPath: 'api/shared/assharedinquiry/tablecodenumeric/sastn=x',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      PriceRebateRegion: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=rg',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      PurchaseOrderEntryTransaction: {
         dataPath: 'api/po/aspoheader/poloadtranstypes/true/entry',
         valueField: 'transtype',
         labelField: 'transtypedesc'
      },
      PurchaseOrderEntryTransactionCopy: {
         dataPath: 'api/po/aspoheader/poloadtranstypes/true/copy',
         valueField: 'transtype',
         labelField: 'transtypedesc'
      },
      Reason: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=l',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      ReasonUnavailable: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=l',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      ReasonUnavailableStoreroomInspection: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sruninreas',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      ResultsCode: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=ar',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      ReturnAdjustReason: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=m',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      ScheduleType: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=h',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      SectionCode: {
         dataPath: 'api/va/vasps',
         valueField: 'sctncode',
         labelField: 'sctncode'
      },
      SectionCodeSurplus: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/vast=ii',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      ShipVia: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=s',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      SizeType: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/wmst=st',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      Sources: {
         dataPath: 'api/pd/aspdentry/pdemlookupdelimsourcetypes',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      State: {
         dataPath: 'api/sa/sasgm/getlistbyquery/2/1?batchsize=1000',
         valueField: 'statecd',
         labelField: 'descrip',
         cache: false
      },
      TaxGroup: {
         dataPath: 'api/shared/assharedinquiry/tablecodenumeric/taxgroup',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      TermsDelivery: {
         dataPath: 'api/shared/assharedinquiry/tablecodenumeric/sastn=td',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      TaxOverrideReason: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=aa',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      TaxingOther: {
         dataPath: 'api/sa/sasgm/getlistbyquery/5/1',
         valueField: 'othercd',
         labelField: 'descrip',
         cache: false
      },
      TransactionCode: {
         dataPath: 'api/ar/asarentry/arettranscdload/true',
         valueField: 'transcd',
         labelField: 'transcddesc'
      },
      TWLOrderClass: {
         dataPath: 'api/twl/orderclass/listbyname',
         valueField: 'code',
         valueToLabelConverter: TwlConverters.OrderClassToName.convert
      },
      TWLOrderStatus: {
         dataPath: 'api/twl/ordhdrstatus/listbyname',
         valueField: 'code',
         valueToLabelConverter: TwlConverters.OrderStatusToName.convert
      },
      TWLOrderType: {
         dataPath: 'api/twl/ordertype/listbyname',
         valueField: 'code',
         valueToLabelConverter: TwlConverters.OrderTypeToName.convert
      },
      TWLSystemParameterType: {
         dataPath: 'api/twl/astwladmin/getsystemparametertypelist',
         valueField: 'typeId',
         valueToLabelConverter: TwlConverters.SystemParameterTypeToName.convert
      },
      TWLTransTypes: {
         dataPath: 'api/twl/transtype/gettwltranstypes',
         valueField: 'transType',
         valueToLabelConverter: TwlConverters.TransTypeToName.convert
      },
      UsageOrdQtyOverride: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=o',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      UserTypes: {
         dataPath: 'api/shared/assharedentry/aosystemusertableload',
         valueField: 'tablename',
         labelField: 'descrip'
      },
      VendorTypes: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=vt',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      WarehouseGroups: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=wg',
         valueField: 'codeval',
         labelField: 'descrip'
      },
      WarehouseTypes: {
         dataPath: 'api/ic/asicinquiry/icwhseavailwhsetypes',
         valueField: 'codeval',
         labelField: 'codedesc'
      },
      WTReasonCode: {
         dataPath: 'api/shared/assharedinquiry/tablecodealphanumeric/sasta=rt',
         valueField: 'codeval',
         labelField: 'descrip'
      }

      /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         Please add new ones alphabetically
         !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      */
   };
});
