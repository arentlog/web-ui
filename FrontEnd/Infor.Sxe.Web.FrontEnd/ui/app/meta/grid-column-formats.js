'use strict';

/**
 * Definitions of all our grid column formats
 *    - This defines how to format the data for display, as well as properties defining how the user can edit the cell values.
 */
app.factory('GridColumnFormats', function GridColumnFormats(ConfigService, StandardConverters, CommonConverters, ArConverters,
   TimeConverters, DcConverters, EdiConverters, GlConverters, IcConverters, KpConverters, OeConverters, OtConverters, PdConverters, PiConverters, PoConverters,
   RsConverters, SaConverters, SwConverters, TwlConverters, VaConverters, WlConverters, WmConverters, WtConverters, ApConverters) {

   // Type groups (used only for grouping the options in the drop down display of the view editor)
   var STANDARD = 'Standard';
   var COMMON = 'Common';
   var AP = 'AP';
   var AR = 'AR';
   var DC = 'DC';
   var EDI = 'EDI';
   var GL = 'GL';
   var IC = 'IC';
   var KP = 'KP';
   var OE = 'OE';
   var OT = 'OT';
   var PD = 'PD';
   var PI = 'PI';
   var PO = 'PO';
   var RS = 'RS';
   var SA = 'SA';
   var SW = 'SW';
   var TWL = 'TWL';
   var VA = 'VA';
   var WL = 'WL';
   var WM = 'WM';
   var WT = 'WT';

   // Field 'size' of format option fields (medium is default)
   var XS = 'xs';
   var SM = 'sm';
   var LG = 'lg';

   return {

      /* Standard Types */
      // Name these with all caps and underscores to distinguish from custom types

      CURRENCY: {
         group: STANDARD,
         displayName: 'Currency',
         numericMask: true,
         maskMode: 'number',
         filterType: 'integer', // Soho applies an odd mask when 'decimal'
         align: 'right',
         formatter: StandardConverters.Currency.convert,
         parser: StandardConverters.Currency.convertBack,
         formatOptions: {
            minimumFractionDigits: { defaultValue: 2, label: 'Min Decimals', type: 'number', size: XS, tooltip: 'The minimum number of decimals to display when formatting the number' },
            maximumFractionDigits: { defaultValue: 5, label: 'Max Decimals', type: 'number', size: XS, tooltip: 'The maximum number of decimals to display when formatting the number' }
         }
      },
      DATE: {
         group: STANDARD,
         displayName: 'Date',
         mask: null, // Let SoHo automatically add the mask by user's locale
         maskMode: 'date',
         mustComplete: true,
         filterType: 'date',
         formatter: StandardConverters.Date.convert,
         parser: StandardConverters.Date.convertBack,
         subFormats: [
            { key: 'MM/dd/yy', displayName: 'MM/dd/yy model (not for standard use)', modelFormat: 'MM/dd/yy' }
         ]
      },
      DECIMAL: {
         group: STANDARD,
         displayName: 'Decimal',
         numericMask: true,
         maskMode: 'number',
         filterType: 'integer', // Soho applies an odd mask when 'decimal'
         align: 'right',
         formatter: StandardConverters.Decimal.convert,
         parser: StandardConverters.Decimal.convertBack,
         formatOptions: {
            minimumFractionDigits: { defaultValue: 0, label: 'Min Decimals', type: 'number', size: XS, tooltip: 'The minimum number of decimals to display when formatting the number' },
            maximumFractionDigits: { defaultValue: 5, label: 'Max Decimals', type: 'number', size: XS, tooltip: 'The maximum number of decimals to display when formatting the number' }
         }
      },
      // This is for decimal data that we want to display like text data (no number formatting)
      DECIMAL_TEXT: {
         group: STANDARD,
         displayName: 'Decimal as Text',
         numericMask: true,
         maskMode: 'number',
         filterType: 'integer', // Soho applies an odd mask when 'decimal'
         align: null, // Keep standard alignment (left)
         formatter: null, // Format as text (no special number formatting)
         parser: StandardConverters.Decimal.convertBack // parse string input back to number
      },
      ELLIPSIS: {
         group: STANDARD,
         displayName: 'Ellipsis',
         formatter: Formatters.Ellipsis
      },
      INTEGER: {
         group: STANDARD,
         displayName: 'Integer',
         numericMask: true,
         maskMode: 'number',
         filterType: 'integer',
         align: 'right',
         formatter: StandardConverters.Integer.convert,
         parser: StandardConverters.Integer.convertBack
      },
      // This is for integer data that we want to display like text data (no number formatting)
      INTEGER_TEXT: {
         group: STANDARD,
         displayName: 'Integer as Text',
         numericMask: true,
         maskMode: 'number',
         filterType: 'integer',
         align: null, // Keep standard alignment (left)
         formatter: null, // Format as text (no special number formatting)
         parser: StandardConverters.Integer.convertBack // parse string input back to number
      },
      // This is for logical fields (i.e. checkboxes), and it can handle booleans, strings, and numbers.
      // You can either use a pre-defined subFormat or specified values via formatOptions.
      // If neither are used, the converters will keep the values as booleans.
      LOGICAL: {
         group: STANDARD,
         displayName: 'Logical',
         filterType: 'checkbox',
         isChecked: StandardConverters.ValueToBoolean.convert,
         parser: StandardConverters.ValueToBoolean.convertBack,
         subFormats: [
            { key: 'AI', displayName: 'A / I', trueValue: 'A', falseValue: 'I' },
            { key: 'AsteriskBlank', displayName: 'Asterisk / Blank', trueValue: '*', falseValue: '' },
            { key: 'CBlank', displayName: 'C / Blank', trueValue: 'C', falseValue: '' },
            { key: 'BBlank', displayName: 'B / Blank', trueValue: 'B', falseValue: '' },
            { key: 'YBlank', displayName: 'Y / Blank', trueValue: 'Y', falseValue: '' },
            { key: 'YesNo', displayName: 'Yes / No', trueValue: 'Yes', falseValue: 'No' },
            { key: 'YN', displayName: 'Y / N', trueValue: 'Y', falseValue: 'N' }
         ],
         formatOptions: {
            trueValue: { label: 'True Value', type: 'text', size: SM, tooltip: 'The string value that represents true (only use if not using a Sub Format)' },
            falseValue: { label: 'False Value', type: 'text', size: SM, tooltip: 'The string value that represents false (only use if not using a Sub Format)' }
         }
      },
      PERCENT: {
         group: STANDARD,
         displayName: 'Percent',
         numericMask: true,
         maskMode: 'number',
         filterType: 'integer', // Soho applies an odd mask when 'decimal'
         align: 'right',
         formatter: StandardConverters.Percent.convert,
         parser: StandardConverters.Percent.convertBack,
         formatOptions: {
            minimumFractionDigits: { defaultValue: 0, label: 'Min Decimals', type: 'number', size: XS, tooltip: 'The minimum number of decimals to display when formatting the number' },
            maximumFractionDigits: { defaultValue: 5, label: 'Max Decimals', type: 'number', size: XS, tooltip: 'The maximum number of decimals to display when formatting the number' }
         }
      },
      PHONE: {
         group: STANDARD,
         displayName: 'Phone',
         mask: ConfigService.getPhoneFormat(),
         maskMode: 'group',
         formatter: StandardConverters.Phone.convert,
         parser: StandardConverters.Phone.convertBack
      },
      TIME: {
         group: STANDARD,
         displayName: 'Time',
         formatter: StandardConverters.Time.convert,
         parser: StandardConverters.Time.convertBack,
         subFormatRequired: true,
         subFormats: [
            { key: 'hhmm', displayName: 'hhmm (4 char)', converter: TimeConverters.hhmm },
            { key: 'hh:mm', displayName: 'hh:mm (4 char + colon)', converter: TimeConverters['hh:mm'] },
            { key: 'hhmmss', displayName: 'hhmmss (6 char)', converter: TimeConverters.hhmmss },
            { key: 'hh:mm:ss', displayName: 'hh:mm:ss (6 char + colons)', converter: TimeConverters['hh:mm:ss'] },
            { key: 'SecondsSinceMidnight', displayName: 'Seconds Since Midnight', converter: TimeConverters.SecondsSinceMidnight }
         ],
         formatOptions: {
            showSeconds: { label: 'Show Seconds', type: 'checkbox', tooltip: 'Show seconds in the time display (otherwise only hour and min will show)' }
         }
      },
      // We always display 4 digit years to the user, but we may store the data model as 2 or 4 digits
      YEAR: {
         group: STANDARD,
         displayName: 'Year',
         mask: '####',
         maskMode: 'number',
         filterType: 'integer',
         formatter: StandardConverters.Year.convert,
         parser: StandardConverters.Year.convertBack,
         subFormatRequired: true,
         subFormats: [
            { key: '2Digit', displayName: '2 Digit Model' },
            { key: '4Digit', displayName: '4 Digit Model' }
         ]
      },


      /* Custom Shared Types */
      //
      // Instructions:
      //
      // 1. Name these with capital camel case.
      // 2. Group them by a particular module or by Common
      // 3. Prefix their names according to the module to ensure uniqueness (i.e. Ar..., Oe..., Po...), unless it's in the Common module
      // 4. Keep in alphabetical order
      ActiveInActive: {
         group: COMMON,
         displayName: 'Active / In-Active',
         formatter: CommonConverters.ActiveInActive.convert
      },
      ApprovalType: {
         group: COMMON,
         displayName: 'Approval Type',
         formatter: CommonConverters.ApprovalType.convert
      },
      ArTransCode: {
         group: AR,
         displayName: 'Trans Code',
         formatter: ArConverters.TransCode.convert
      },
      BinLoc: {
         group: COMMON,
         displayName: 'Bin Location',
         mask: '??/??/???/???', // this mask allows spaces and special characters
         maskMode: 'group',
         groupComplete: true,
         formatter: CommonConverters.BinLoc.convert,
         parser: CommonConverters.BinLoc.convertBack
      },
      BooleanToAmtPct: {
         group: COMMON,
         displayName: 'Boolean to Amt/Pct',
         formatter: CommonConverters.BooleanToAmtPct.convert
      },
      AmtPctSymbolsToAmtPct: {
         group: COMMON,
         displayName: 'Amount/Percent symbols to Amt/Pct',
         formatter: CommonConverters.AmtPctSymbolsToAmtPct.convert
      },
      BooleanToString: {
         group: COMMON,
         displayName: 'Boolean to String',
         formatter: CommonConverters.BooleanToString.convert,
         formatOptions: {
            trueString: { label: 'True String', type: 'text', size: SM, i18n: true, tooltip: 'The translation key for the string display of a true value' },
            falseString: { label: 'False String', type: 'text', size: SM, i18n: true, tooltip: 'The translation key for the string display of a false value' }
         }
      },
      BooleanToYesNo: {
         group: COMMON,
         displayName: 'Boolean to Yes/No',
         formatter: CommonConverters.BooleanToYesNo.convert
      },
      ComponentType: {
         group: COMMON,
         displayName: 'Component Type',
         formatter: CommonConverters.ComponentType.convert
      },
      CountryCodeToName: {
         group: COMMON,
         displayName: 'Country Code to Name',
         formatter: CommonConverters.CountryCodeToName.convert
      },
      CreditCardNumber: {
         group: COMMON,
         displayName: 'Credit Card Number',
         formatter: CommonConverters.CreditCardNumber.convert
      },
      CreditCardStage: {
         group: COMMON,
         displayName: 'Credit Card Stage',
         formatter: CommonConverters.CreditCardStage.convert
      },
      CreditCardCommType: {
         group: COMMON,
         displayName: 'Credit Card Communication Type',
         formatter: CommonConverters.CreditCardCommType.convert
      },
      DCFieldDelimiter: {
         group: DC,
         displayName: 'DC Field Delimiter',
         formatter: DcConverters.FieldDelimiter.convert
      },
      DCRecordFormat: {
         group: DC,
         displayName: 'DC Record Format',
         formatter: DcConverters.RecordFormat.convert
      },
      ApTransactionType: {
         group: AP,
         displayName: 'TransactionType',
         formatter: ApConverters.TransactionType.convert
      },
      EdiPoType: {
         group: EDI,
         displayName: 'EDIPOType',
         formatter: EdiConverters.EDIPOType.convert
      },
      EdiETCCApproveType: {
         group: EDI,
         displayName: 'ETCCApproveType',
         formatter: EdiConverters.ETCCApproveType.convert
      },
      EdiETCCDataSource: {
         group: EDI,
         displayName: 'ETCCDataSource',
         formatter: EdiConverters.ETCCDataSource.convert
      },
      EdiETCCDocStatus: {
         group: EDI,
         displayName: 'ETCCDocStatus',
         formatter: EdiConverters.ETCCDocStatus.convert
      },
      EdiETCCErrorType: {
         group: EDI,
         displayName: 'ETCCErrorType',
         formatter: EdiConverters.ETCCErrorType.convert
      },
      EdiETCCSTage: {
         group: EDI,
         displayName: 'ETCCStage',
         formatter: EdiConverters.ETCCStage.convert
      },
      EdiETCCUpdateStatus: {
         group: EDI,
         displayName: 'ETCCUpdateStatus',
         formatter: EdiConverters.ETCCUpdateStatus.convert
      },
      EdiTransSetPurposeCd: {
         group: EDI,
         displayName: 'TransSetPurposeCd',
         formatter: EdiConverters.TransSetPurposeCd.convert
      },
      EdiVendorUserTypeToName: {
         group: EDI,
         displayName: 'VendorUserTypeToName',
         formatter: EdiConverters.VendorUserTypeToName.convert
      },
      Icon: {
         group: COMMON,
         displayName: 'Icon',
         formatter: Formatters.Alert,
         align: 'left',
         ranges: [
            // We are using an HTML space for no text (otherwise SoHo displays the underlying value on the screen)
            { value: 'e', classes: 'error', text: '&nbsp;' },
            { value: 'a', classes: 'alert', text: '&nbsp;' },
            { value: '', classes: '', text: '&nbsp;' }
         ]
      },
      GlFinancialStatementColumnTypeToName: {
         group: GL,
         displayName: 'FinancialStatementColumnTypeToName',
         formatter: GlConverters.FinancialStatementColumnTypeToName.convert
      },
      GlAccountType: {
         group: GL,
         displayName: 'AccountType',
         formatter: GlConverters.AccountType.convert
      },
      IcOrderCalculationType: {
         group: IC,
         displayName: 'OrderCalculationType',
         formatter: IcConverters.OrderCalculationType.convert
      },
      IcLotStatusType: {
         group: IC,
         displayName: 'LotStatusType',
         formatter: IcConverters.LotStatusType.convert
      },
      IcDayMonthValue: {
         group: IC,
         displayName: 'DayMonthValue',
         formatter: IcConverters.DayMonthValue.convert
      },
      IcProdWhseControlType: {
         group: IC,
         displayName: 'ProdWhseControlType',
         formatter: IcConverters.ProdWhseControlType.convert
      },
      IcProductStatusType: {
         group: IC,
         displayName: 'ProductStatusType',
         formatter: IcConverters.ProductStatusType.convert
      },
      IcOrderType: {
         group: IC,
         displayName: 'OrderType',
         formatter: IcConverters.OrderType.convert
      },
      IcRecordTypeICSPC: {
         group: IC,
         displayName: 'RecordTypeICSPC',
         formatter: IcConverters.RecordTypeICSPC.convert
      },
      IcRecordTypeICSR: {
         group: IC,
         displayName: 'RecordTypeICSR',
         formatter: IcConverters.RecordTypeICSR.convert
      },
      IcSerialCurrStatus: {
         group: IC,
         displayName: 'SerialCurrStatus',
         formatter: IcConverters.SerialCurrStatus.convert
      },
      IcProdWhseStatusType: {
         group: IC,
         displayName: 'ProdWhseStatusType',
         formatter: IcConverters.ProdWhseStatusType.convert
      },
      KpStage: {
         group: KP,
         displayName: 'KPStage',
         formatter: KpConverters.Stage.convert
      },
      LineType: {
         group: COMMON,
         displayName: 'Line Type',
         formatter: CommonConverters.LineType.convert
      },
      LSPInvRegStatus: {
         group: COMMON,
         displayName: 'LSP Inv Reg Stat',
         formatter: CommonConverters.LSPInvRegStatus.convert
      },
      MassMaintenanceStatusOperation: {
         group: COMMON,
         displayName: 'MM Status Operation',
         formatter: CommonConverters.MassMaintenanceStatusOperation.convert
      },
      MassMaintenanceStatusType: {
         group: COMMON,
         displayName: 'MM Status Type',
         formatter: CommonConverters.MassMaintenanceStatusType.convert
      },
      ModuleName: {
         group: COMMON,
         displayName: 'Module Name',
         formatter: CommonConverters.ModuleName.convert
      },
      NonstockType: {
         group: COMMON,
         displayName: 'Nonstock Type (Stock is Blank)',
         formatter: CommonConverters.NonstockType.convert
      },
      NonstockTypeWT: {
         group: COMMON,
         displayName: 'Nonstock Type (For WT)',
         formatter: CommonConverters.NonstockTypeWT.convert
      },
      NotesFlag: {
         group: COMMON,
         displayName: 'Notes Flag',
         formatter: Formatters.Alert,
         filterType: 'select',
         align: 'left',
         options: [
            { value: '*', label: 'global.notes' },
            { value: '!', label: 'global.required.notes' }
         ],
         ranges: [
            // We display alert icons in the grid, but exported excel file will show the hidden ! or *
            { value: '!', classes: 'error', text: '<span style="display: none;">!</span>' },
            { value: '*', classes: 'info', text: '<span style="display: none;">*</span>' },
            { value: '', classes: '', text: '' }
         ]
      },
      OeAddOnType: {
         group: OE,
         displayName: 'OE Addon Type',
         formatter: OeConverters.OeAddOnType.convert
      },
      OeCommentType: {
         group: OE,
         displayName: 'OE Comment Type',
         formatter: OeConverters.CommentType.convert
      },
      OeehpPackageStatus: {
         group: OE,
         displayName: 'OeehpPackageStatusTypeToName',
         formatter: OeConverters.OeehpPackageStatusTypeToName.convert
      },
      OeFulfillmentRules: {
         group: OE,
         displayName: 'OE Fulfillment Rules',
         formatter: OeConverters.FulfillmentRules.convert
      },
      OeOrderDisposition: {
         group: OE,
         displayName: 'OE Order Disposition',
         formatter: OeConverters.OrderDisposition.convert
      },
      OeOrderType: {
         group: OE,
         displayName: 'OE Order Type',
         formatter: OeConverters.OrderType.convert
      },
      OeReturnedCorrected: {
         group: OE,
         displayName: 'OE Returned/Corrected',
         formatter: OeConverters.ReturnedCorrected.convert
      },
      OeStage: {
         group: OE,
         displayName: 'OE Stage',
         formatter: OeConverters.Stage.convert
      },
      OtTrackStages: {
         group: OT,
         displayName: 'Track Stage',
         formatter: OtConverters.TrackStages.convert
      },
      OtAddOnType: {
         group: OT,
         displayName: 'OT Addon Type',
         formatter: OtConverters.OtAddOnType.convert
      },
      OtDistributeBy: {
         group: OT,
         displayName: 'OT Distribute By',
         formatter: OtConverters.OtDistributeBy.convert
      },
      OrderStage: {
         group: COMMON,
         displayName: 'Order Stage',
         formatter: CommonConverters.OrderStage.convert
      },
      OrderType: {
         group: COMMON,
         displayName: 'Order Type',
         formatter: CommonConverters.OrderType.convert
      },
      OtVesselStages: {
         group: OT,
         displayName: 'Vessel Stage',
         formatter: OtConverters.VesselStages.convert
      },
      OtMoveToVesselStages: {
         group: OT,
         displayName: 'OT Vessel Stage',
         formatter: OtConverters.VesselStages.convert
      },
      PiStatusUpdateCode: {
         group: PI,
         displayName: 'Status Update Code',
         formatter: PiConverters.StatusUpdateCode.convert
      },
      PdCreateNew: {
         group: PD,
         displayName: 'CreateNew',
         formatter: PdConverters.CreateNew.convert
      },
      PdDiscountBasedOn: {
         group: PD,
         displayName: 'DiscountBasedOn',
         formatter: PdConverters.DiscountBasedOn.convert
      },
      PdLoadIntoItems: {
         group: PD,
         displayName: 'LoadIntoItems',
         formatter: PdConverters.LoadIntoItems.convert
      },
      PdMarginCostTypeToName: {
         group: PD,
         displayName: 'MarginCostTypeToName',
         formatter: PdConverters.MarginCostTypeToName.convert
      },
      PdMultiplier: {
         group: PD,
         displayName: 'Multiplier',
         formatter: PdConverters.Multiplier.convert
      },
      PdPricingRecordTypeForPDSCToName: {
         group: PD,
         displayName: 'Pricing RecordType For PDSC (Pricing)',
         formatter: PdConverters.PricingRecordTypeForPDSCToName.convert
      },
      PdPricingRecordTypeForPDSRToName: {
         group: PD,
         displayName: 'Pricing RecordType For PDSR (Rebates)',
         formatter: PdConverters.PricingRecordTypeForPDSRToName.convert
      },
      PdPricingRecordTypeForPDSVToName: {
         group: PD,
         displayName: 'Pricing RecordType For PDSV (Vendor)',
         formatter: PdConverters.PricingRecordTypeForPDSVToName.convert
      },
      PdPricingRecordTypeForPDSNToName: {
         group: PD,
         displayName: 'Pricing RecordType For PDSN (National Account)',
         formatter: PdConverters.PricingRecordTypeForPDSNToName.convert
      },
      PdStatusTypeToName: {
         group: PD,
         displayName: 'StatusTypeToName',
         formatter: PdConverters.StatusTypeToName.convert
      },
      PdRebateCalcTypeToName: {
         group: PD,
         displayName: 'RebateCalcTypeToName',
         formatter: PdConverters.RebateCalcTypeToName.convert
      },
      PdRebateCostTypeToName: {
         group: PD,
         displayName: 'RebateCostTypeToName',
         formatter: PdConverters.RebateCostTypeToName.convert
      },
      PdRebateDownToName: {
         group: PD,
         displayName: 'RebateDownToName',
         formatter: PdConverters.RebateDownToName.convert
      },
      PdRebateTypeToName: {
         group: PD,
         displayName: 'RebateTypeToName',
         formatter: PdConverters.RebateTypeToName.convert
      },
      Period: {
         group: COMMON,
         displayName: 'Period',
         formatter: CommonConverters.Period.convert
      },
      PoAcknowledgementItemStatusCode: {
         group: PO,
         displayName: 'Acknowledgement Item Status Code',
         formatter: PoConverters.AcknowledgementItemStatusCode.convert
      },
      PoAcknowledgementType: {
         group: PO,
         displayName: 'AcknowledgementType',
         formatter: PoConverters.AcknowledgementType.convert
      },
      PoApprovalType: {
         group: PO,
         displayName: 'PoApprovedType',
         formatter: PoConverters.ApprovalType.convert
      },
      PoDeliveryDateCode: {
         group: PO,
         displayName: 'Delivery Date Code',
         formatter: PoConverters.DeliveryDateCode.convert
      },
      PoNonstockTypeForLineList: {
         group: PO,
         displayName: 'Nonstock Type (For PO Line List)',
         formatter: PoConverters.NonstockTypeForLineList.convert
      },
      PoStage: {
         group: PO,
         displayName: 'PO Stage',
         formatter: PoConverters.Stage.convert
      },
      PoOrderType: {
         group: PO,
         displayName: 'PO Order Type',
         formatter: PoConverters.PurchaseOrderType.convert
      },
      Route: {
         group: COMMON,
         displayName: 'Route',
         mask: '???/??/??', // this mask allows spaces and special characters
         maskMode: 'group',
         groupComplete: true,
         formatter: CommonConverters.Route.convert,
         parser: CommonConverters.Route.convertBack
      },
      RsJobComponentType: {
         group: RS,
         displayName: 'RS Job Component Type',
         formatter: RsConverters.JobComponentType.convert
      },
      SaAddonZeroLevelType: {
         group: SA,
         displayName: 'Zero Level Type',
         formatter: SaConverters.AddonZeroLevelType.convert
      },
      SaBillingType: {
         group: SA,
         displayName: 'Billing Type',
         formatter: SaConverters.BillingType.convert
      },
      SaCurrencyChangeType: {
         group: SA,
         displayName: 'CurrencyChangeType',
         formatter: SaConverters.CurrencyChangeType.convert
      },
      SaFrequencyType: {
         group: SA,
         displayName: 'FrequencyType',
         formatter: SaConverters.FrequencyType.convert
      },
      SaPriceCostType: {
         group: SA,
         displayName: 'PriceCostType',
         formatter: SaConverters.PriceCostType.convert
      },
      SaStandardType: {
         group: SA,
         displayName: 'StandardType',
         formatter: SaConverters.StandardType.convert
      },
      Size: {
         group: COMMON,
         displayName: 'Size',
         formatter: CommonConverters.Size.convert
      },
      Sequence: {
         group: COMMON,
         displayName: 'Sequence',
         filterType: 'integer',
         formatter: CommonConverters.Sequence.convert
      },
      SerialLotType: {
         group: COMMON,
         displayName: 'Serial/LotType',
         formatter: CommonConverters.SerialLotType.convert
      },
      Suffix: {
         group: COMMON,
         displayName: 'Suffix',
         filterType: 'integer',
         formatter: CommonConverters.Suffix.convert
      },
      SwAppearsOn: {
         group: SW,
         displayName: 'Appears On',
         formatter: SwConverters.AppearsOn.convert
      },
      SwChargeCode: {
         group: SW,
         displayName: 'Charge Code',
         formatter: SwConverters.ChargeCode.convert
      },
      TieOrderType: {
         group: COMMON,
         displayName: 'Tie Order Type',
         formatter: CommonConverters.TieOrderType.convert
      },
      TieTransactionType: {
         group: COMMON,
         displayName: 'Tie Transaction Type',
         formatter: CommonConverters.TieTransactionType.convert
      },
      TwlCharDateConversion: {
         group: TWL,
         displayName: 'CharDateConversion',
         formatter: TwlConverters.CharDateConversion.convert
      },
      TwlCounterPickTypeToName: {
         group: TWL,
         displayName: 'CounterPickTypeToName',
         formatter: TwlConverters.CounterPickTypeToName.convert
      },
      TwlDepartmentTypeToName: {
         group: TWL,
         displayName: 'DepartmentTypeToName',
         formatter: TwlConverters.DepartmentTypeToName.convert
      },
      TwlExceptionTypeToName: {
         group: TWL,
         displayName: 'ExceptionTypeToName',
         formatter: TwlConverters.ExceptionTypeToName.convert
      },
      TwlItemTypeToName: {
         group: TWL,
         displayName: 'ItemTypeToName',
         formatter: TwlConverters.ItemTypeToName.convert
      },
      TwlLocationTypeToName: {
         group: TWL,
         displayName: 'LocationTypeToName',
         formatter: TwlConverters.LocationTypeToName.convert
      },
      TwlOrderStatusToName: {
         group: TWL,
         displayName: 'OrderStatusToName',
         formatter: TwlConverters.OrderStatusToName.convert
      },
      TwlOrderStatusNameToName: {
         group: TWL,
         displayName: 'OrderStatusNameToName',
         formatter: TwlConverters.OrderStatusNameToName.convert
      },
      TwlOrderTypeToName: {
         group: TWL,
         displayName: 'OrderTypeToName',
         formatter: TwlConverters.OrderTypeToName.convert
      },
      TwlPrimaryPickTypeToName: {
         group: TWL,
         displayName: 'PrimaryPickTypeToName',
         formatter: TwlConverters.PrimaryPickTypeToName.convert
      },
      TwlPrinterTypeToName: {
         group: TWL,
         displayName: 'PrinterTypeToName',
         formatter: TwlConverters.PrinterTypeToName.convert
      },
      TwlReceiptStatusToName: {
         group: TWL,
         displayName: 'Receipt Status To Name',
         formatter: TwlConverters.ReceiptStatusToName.convert
      },
      TwlReceiptTypeToName: {
         group: TWL,
         displayName: 'Receipt Type To Name',
         formatter: TwlConverters.ReceiptTypeToName.convert
      },
      TwlStockStatusToName: {
         group: TWL,
         displayName: 'StockStatusToName',
         formatter: TwlConverters.StockStatusToName.convert
      },
      TwlSystemParameterTypeConversion: {
         group: TWL,
         displayName: 'System Parameter Type To Name',
         formatter: TwlConverters.SystemParameterTypeToName.convert
      },
      TwlTransTypeToName: {
         group: TWL,
         displayName: 'TransTypeToName',
         formatter: TwlConverters.TransTypeToName.convert
      },
      TwlTransactionRowStatusToName: {
         group: TWL,
         displayName: 'Transaction Row Status To Name',
         formatter: TwlConverters.TransactionsRowStatus.convert
      },
      TwlWarehouseZoneTypeToName: {
         group: TWL,
         displayName: 'WarehouseZoneTypeToName',
         formatter: TwlConverters.WarehouseZoneTypeToName.convert
      },
      UserFieldPart: {
         group: COMMON,
         displayName: 'User Field Part',
         formatter: CommonConverters.UserFieldPart.convert,
         formatOptions: {
            startPosition: { defaultValue: 0, label: 'Start Position (zero based)', type: 'number', size: 'xs', tooltip: 'The Starting Position of Data' },
            length: { defaultValue: 0, label: 'Length', type: 'number', size: 'xs', tooltip: 'The Length of Data to be Stripped/Sliced' }
         }
      },
      UnitConversionFactor: {
         group: COMMON,
         displayName: 'UnitConversionFactor',
         formatter: CommonConverters.UnitConversionFactor.convert
      },
      UnitConversionMethod: {
         group: COMMON,
         displayName: 'UnitConversionMethod',
         formatter: CommonConverters.UnitConversionMethod.convert
      },
      VaBackOrderTypes: {
         group: VA,
         displayName: 'Back Order Types',
         formatter: VaConverters.BackOrderTypes.convert
      },
      VaChargeMethodType: {
         group: VA,
         displayName: 'Charge Method Type',
         formatter: VaConverters.ChargeMethodType.convert
      },
      VaCutStatusType: {
         group: VA,
         displayName: 'Cut Status Type',
         formatter: VaConverters.CutStatusType.convert
      },
      VaDestinationType: {
         group: VA,
         displayName: 'Destination Type',
         formatter: VaConverters.DestinationType.convert
      },
      VaDispositionType: {
         group: VA,
         displayName: 'Disposition Type',
         formatter: VaConverters.DispositionType.convert
      },
      VaFinishedProductType: {
         group: VA,
         displayName: 'Finished Product Type',
         formatter: VaConverters.FinishedProductType.convert
      },
      VaFinishedProductLineType: {
         group: VA,
         displayName: 'Finished Product Line Type',
         formatter: VaConverters.FinishedProductLineType.convert
      },
      VaInventoryReceiptStageType: {
         group: VA,
         displayName: 'Inventory Receipt Stage Type',
         formatter: VaConverters.InventoryReceiptStageType.convert
      },
      VaLaborType: {
         group: VA,
         displayName: 'Labor Type',
         formatter: VaConverters.LaborType.convert
      },
      VaLineCancelType: {
         group: VA,
         displayName: 'Line Cancel Type',
         formatter: VaConverters.LineCancelType.convert
      },
      VaLinesEntryType: {
         group: VA,
         displayName: 'Line Entry Type',
         formatter: VaConverters.LinesEntryType.convert
      },
      VaLineType: {
         group: VA,
         displayName: 'Line Type',
         formatter: VaConverters.LineType.convert
      },
      VaNonSpecificationPrintType: {
         group: VA,
         displayName: 'Non-Specification Print Type',
         formatter: VaConverters.NonSpecificationPrintType.convert
      },
      VaNonStockType: {
         group: VA,
         displayName: 'NonStock Type',
         formatter: VaConverters.NonStockType.convert
      },
      VaOrderStageFullVaeh: {
         group: VA,
         displayName: 'Order Stage Full',
         formatter: VaConverters.OrderStageFullVaeh.convert
      },
      VaOrderTransactionType: {
         group: VA,
         displayName: 'Order Transaction Type',
         formatter: VaConverters.OrderTransactionType.convert
      },
      VaPrintReceiptType: {
         group: VA,
         displayName: 'Print Receipt Type',
         formatter: VaConverters.PrintReceiptType.convert
      },
      VaRollupType: {
         group: VA,
         displayName: 'Rollup Type Margin/Markup',
         formatter: VaConverters.RollupType.convert
      },
      VaSourceOrderTypes: {
         group: VA,
         displayName: 'Source Order Type',
         formatter: VaConverters.SourceOrderTypes.convert
      },
      VaSectionStageCodeType: {
         group: VA,
         displayName: 'Section Stage Code Type',
         formatter: VaConverters.SectionStageCodeType.convert
      },
      VaSectionType: {
         group: VA,
         displayName: 'Section Type',
         formatter: VaConverters.SectionType.convert
      },
      VaSegmentType: {
         group: VA,
         displayName: 'Segment Type',
         formatter: VaConverters.SegmentType.convert
      },
      VaShippingStageType: {
         group: VA,
         displayName: 'Shipping Stage Type',
         formatter: VaConverters.ShippingStageType.convert
      },
      VaSpecificationPrintType: {
         group: VA,
         displayName: 'Specification Print Type',
         formatter: VaConverters.SpecificationPrintType.convert
      },
      VaStageCodeType: {
         group: VA,
         displayName: 'Stage Code Type',
         formatter: VaConverters.StageCodeType.convert
      },
      VaTimeType: {
         group: VA,
         displayName: 'Time Type',
         formatter: VaConverters.TimeType.convert
      },
      VaTransferTransactionType: {
         group: VA,
         displayName: 'Transfer Transaction Type',
         formatter: VaConverters.TransferTransactionType.convert
      },
      VaSourceBackTieTypes: {
         group: VA,
         displayName: 'Source Back Order Types',
         formatter: VaConverters.SourceBackTieTypes.convert
      },
      VaHeaderTiesOrderTypes: {
         group: VA,
         displayName: 'Header Ties Order Types',
         formatter: VaConverters.HeaderTiesOrderTypes.convert
      },
      VaUpdateTypes: {
         group: VA,
         displayName: 'Update Types',
         formatter: VaConverters.UpdateTypes.convert
      },
      WlOrderTransType: {
         group: WL,
         displayName: 'OrderTransType',
         formatter: WlConverters.OrderTransType.convert
      },
      WlOrderType: {
         group: WL,
         displayName: 'OrderType',
         formatter: WlConverters.OrderType.convert
      },
      WlProcessType: {
         group: WL,
         displayName: 'ProcessType',
         formatter: WlConverters.ProcessType.convert
      },
      WlStatusType: {
         group: WL,
         displayName: 'StatusType',
         formatter: WlConverters.StatusType.convert
      },
      WlUpdateType: {
         group: WL,
         displayName: 'UpdateType',
         formatter: WlConverters.UpdateType.convert
      },
      WmBinLocAssignmentCode: {
         group: WM,
         displayName: 'Bin Location Assignment Code',
         formatter: WmConverters.BinLocAssignmentCode.convert
      },
      WmBinLocStatusCode: {
         group: WM,
         displayName: 'Bin Location Status Code',
         formatter: WmConverters.BinLocStatusCode.convert
      },
      WmReplenishmentActionTypeToName: {
         group: WM,
         displayName: 'ReplenishmentActionTypeToName',
         formatter: WmConverters.ReplenishmentActionTypeToName.convert
      },
      WtApproveType: {
         group: WT,
         displayName: 'WT Approve Type',
         formatter: WtConverters.WtApproveType.convert
      },
      WtLineStageType: {
         group: WT,
         displayName: 'WTLineStageType',
         formatter: WtConverters.WtLineStageTypeToName.convert
      },
      WtOrderType: {
         group: WT,
         displayName: 'WT Order Type',
         formatter: WtConverters.WtOrderType.convert
      },
      WtPackageStatus: {
         group: WT,
         displayName: 'WtPackageStatusTypeToName',
         formatter: WtConverters.WtPackageStatusTypeToName.convert
      },
      WtPackageTransType: {
         group: WT,
         displayName: 'WtPackageTransTypeToName',
         formatter: WtConverters.WtPackageTransTypeToName.convert
      },
      WtStage: {
         group: WT,
         displayName: 'WtStageTypeToName',
         formatter: WtConverters.WtStageTypeToName.convert
      },
      WtStageToName: {
         group: WT,
         displayName: 'WtStageToName',
         formatter: WtConverters.WtStageToName.convert
      }
   };
});
