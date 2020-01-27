'use strict';

/**
 * Definitions of all our input field formats
 */
app.factory('FieldFormats', function FieldFormats(ConfigService, StandardConverters, CommonConverters, TimeConverters, EdiConverters,
   IcConverters, KpConverters, OeConverters, OtConverters, PiConverters, PdConverters, PoConverters, TwlConverters, VaConverters, WlConverters, WtConverters) {

   // Format groups (used only for grouping the options in the drop down display of the view editor)
   var STANDARD = 'Standard';
   var COMMON = 'Common';
   var AR = 'AR';
   var EDI = 'EDI';
   var IC = 'IC';
   var KP = 'KP';
   var OE = 'OE';
   var OT = 'OT';
   var PD = 'PD';
   var PO = 'PO';
   var PI = 'PI';
   var TWL = 'TWL';
   var VA = 'VA';
   var WL = 'WL';
   var WT = 'WT';

   // Field 'size' of format option fields (medium is default)
   var XS = 'xs';
   var SM = 'sm';
   var LG = 'lg';

   return {

      /* Standard Formats */
      // Name these with all caps and underscores to distinguish from custom formats

      CURRENCY: {
         group: STANDARD,
         displayName: 'Currency',
         numericMask: true,
         maskMode: 'number',
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
         validate: null, // Let SoHo date pickers automatically add 'date' (if we do it then it messes up 'required')
         formatter: StandardConverters.Date.convert,
         parser: StandardConverters.Date.convertBack,
         subFormats: [
            { key: 'MM/dd/yy', displayName: 'MM/dd/yy model (not for standard use)', modelFormat: 'MM/dd/yy' },
            { key: 'MM/dd/yyyy', displayName: 'MM/dd/yyyy model (not for standard use)', modelFormat: 'MM/dd/yyyy' }
         ]
      },
      // We can add this at some point if desired, but we would need to figure out its formatter and parser
      // DATE_TIME: {
      //    group: STANDARD,
      //    displayName: 'Date & Time',
      //    mask: '##/##/#### ##:## am',
      //    maskMode: 'date',
      //    validate: 'date'
      // },
      DECIMAL: {
         group: STANDARD,
         displayName: 'Decimal',
         numericMask: true,
         maskMode: 'number',
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
         align: 'left',
         // TODO: figure out how to keep standard alignment (left) in form fields
         formatter: null, // Format as text (no special number formatting)
         parser: StandardConverters.Decimal.convertBack // parse string input back to number
      },
      EMAIL: {
         group: STANDARD,
         displayName: 'Email',
         // Use our custom validation rule that allows multiple email addresses separated by a , or ;
         validate: 'email-multiple',
         // Validate email only when leave field (not every keystroke)
         // Note: need required option here too otherwise required email fields no longer check for required
         validationEvents: '{"email-multiple": "blur change", "required": "blur change"}'
      },
      INTEGER: {
         group: STANDARD,
         displayName: 'Integer',
         numericMask: true,
         maskMode: 'number',
         formatter: StandardConverters.Integer.convert,
         parser: StandardConverters.Integer.convertBack
      },
      // This is for integer data that we want to display like text data (no number formatting)
      INTEGER_TEXT: {
         group: STANDARD,
         displayName: 'Integer as Text',
         numericMask: true,
         maskMode: 'number',
         align: 'left',
         // TODO: figure out how to keep standard alignment (left) in form fields
         formatter: null, // Format as text (no special number formatting)
         parser: StandardConverters.Integer.convertBack // parse string input back to number
      },
      // This is for logical fields (i.e. checkboxes), and it can handle booleans, strings, and numbers.
      // You can either use a pre-defined subFormat or specified values via formatOptions.
      // If neither are used, the converters will keep the values as booleans.
      LOGICAL: {
         group: STANDARD,
         displayName: 'Logical',
         formatter: StandardConverters.ValueToBoolean.convert,
         parser: StandardConverters.ValueToBoolean.convertBack,
         subFormats: [
            { key: 'AI', displayName: 'A / I', trueValue: 'A', falseValue: 'I' },
            { key: 'YN', displayName: 'Y / N', trueValue: 'Y', falseValue: 'N' },
            { key: 'BBlank', displayName: 'B / Blank', trueValue: 'B', falseValue: '' },
            { key: 'BlankN', displayName: 'Blank / N', trueValue: '', falseValue: 'N' },
            { key: 'PBlank', displayName: 'P / Blank', trueValue: 'P', falseValue: '' },
            { key: 'UBlank', displayName: 'U / Blank', trueValue: 'U', falseValue: '' },
            { key: 'YBlank', displayName: 'Y / Blank', trueValue: 'Y', falseValue: '' },
            { key: 'YesNo', displayName: 'Yes / No', trueValue: 'Yes', falseValue: 'No' }
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
         showSymbol: 'percent',
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
         mask: null, // Let SoHo automatically add the mask by user's locale
         maskMode: 'time',
         validate: null, // Let SoHo time pickers automatically add 'time' (if we do it then it messes up 'required')
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
         formatter: StandardConverters.Year.convert,
         parser: StandardConverters.Year.convertBack,
         subFormatRequired: true,
         subFormats: [
            { key: '2Digit', displayName: '2 Digit Model' },
            { key: '4Digit', displayName: '4 Digit Model' }
         ]
      },

      /* Custom Shared Formats */
      //
      // Instructions:
      //
      // 1. Name these with capital camel case.
      // 2. Group them by a particular module or by Common
      // 3. Prefix their names according to the module (i.e. Ar..., Oe..., Po...), unless it's in the Common module
      // 4. Keep in alphabetical order
      ApprovalType: {
         group: COMMON,
         displayName: 'Approval Type',
         formatter: CommonConverters.ApprovalType.convert
      },
      AssignmentType: {
         group: COMMON,
         displayName: 'Assignment   Type',
         formatter: CommonConverters.AssignmentType.convert
      },
      BinLoc: {
         group: COMMON,
         displayName: 'Bin Location',
         mask: '??/??/???/???', // this mask allows spaces and special characters
         maskMode: 'group',
         groupComplete: true,
         trimInput: false, // need to turn off ng-trim to allow beginning spaces
         formatter: CommonConverters.BinLoc.convert,
         parser: CommonConverters.BinLoc.convertBack
      },
      BinLocFirstHalf: {
         group: COMMON,
         displayName: 'Bin Loc First Half',
         mask: '??/??',
         maskMode: 'group',
         groupComplete: true,
         trimInput: false,
         formatter: CommonConverters.BinLocFirstHalf.convert,
         parser: CommonConverters.BinLocFirstHalf.convertBack
      },
      BinStatusType: {
         group: COMMON,
         displayName: 'Bin Status Type',
         formatter: CommonConverters.BinStatusType.convert
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
      EdiCodes: {
         group: COMMON,
         displayName: 'EDI Codes',
         mask: '?????/?????', // this mask allows spaces and special characters
         maskMode: 'group',
         groupComplete: true,
         trimInput: false // need to turn off ng-trim to allow beginning spaces
      },
      EdiPoType: {
         group: EDI,
         displayName: 'EDIPOType',
         formatter: EdiConverters.EDIPOType.convert
      },
      EdiETCCApproveType: {
         group: EDI,
         displayName: 'ETCCApprovalType',
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
      IcICSWControl: {
         group: IC,
         displayName: 'ProdWhse Control',
         formatter: IcConverters.ProdWhseControlType.convert
      },
      IcICSWStatus: {
         group: IC,
         displayName: 'ProdWhse Status',
         formatter: IcConverters.ProdWhseStatusType.convert
      },
      IcOrderPointAdjustmentReason: {
         group: IC,
         displayName: 'Order Point Adjustment Reason',
         formatter: IcConverters.OrderPointAdjustmentReason.convert
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
         displayName: 'LSP Invoice Registration Status',
         formatter: CommonConverters.LSPInvRegStatus.convert
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
      Sequence: {
         group: COMMON,
         displayName: 'Sequence',
         formatter: CommonConverters.Sequence.convert
      },
      OeAddOnType: {
         group: OE,
         displayName: 'AddOnType',
         formatter: OeConverters.OeAddOnType.convert
      },
      OeCommentType: {
         group: OE,
         displayName: 'OE Comment Type',
         formatter: OeConverters.CommentType.convert
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
      OtTrackStage: {
         group: OT,
         displayName: 'Track Stage',
         formatter: OtConverters.TrackStages.convert
      },
      OtVesselStage: {
         group: OT,
         displayName: 'Vessel Stage',
         formatter: OtConverters.VesselStages.convert
      },
      OtMoveToVesselStages: {
         group: OT,
         displayName: 'OT Vessel Stage',
         formatter: OtConverters.VesselStages.convert
      },
      OtAddOnType: {
         group: OT,
         displayName: 'AddOnType',
         formatter: OtConverters.OtAddOnType.convert
      },
      OtDistributeBy: {
         group: OT,
         displayName: 'DistributeBy',
         formatter: OtConverters.OtDistributeBy.convert
      },
      PdManualRebateDropShipTypeToName: {
         group: PD,
         displayName: 'Manual Rebate Drop Ship Type',
         formatter: PdConverters.ManualRebateDropShipTypeToName.convert
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
      PeriodInteger: {
         group: COMMON,
         displayName: 'PeriodInteger',
         mask: '##/##',
         maskMode: 'group',
         groupComplete: true,
         trimInput: false,
         formatter: CommonConverters.Period.convert,
         parser: CommonConverters.Period.convertBack
      },
      PeriodReport: {
         group: COMMON,
         displayName: 'PeriodReport',
         mask: '??/??',
         maskMode: 'group',
         groupComplete: true,
         trimInput: false,
         formatter: CommonConverters.Period.convert,
         parser: CommonConverters.Period.convertBack
      },
      PoAcknowledgementItemStatusCode: {
         group: PO,
         displayName: 'Acknowledgement Item Status Code',
         formatter: PoConverters.AcknowledgementItemStatusCode.convert
      },
      PoAcknowledgementType: {
         group: PO,
         displayName: 'Acknowledgement Type',
         formatter: PoConverters.AcknowledgementType.convert
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
      PoOrderDispositionType: {
         group: PO,
         displayName: 'PO Order Disposition',
         formatter: PoConverters.OrderDispositionType.convert
      },
      PoOrderType: {
         group: PO,
         displayName: 'PO Order Type',
         formatter: PoConverters.PurchaseOrderType.convert
      },
      PoStage: {
         group: PO,
         displayName: 'PO Stage',
         formatter: PoConverters.Stage.convert
      },
      PrinterString: {
         group: COMMON,
         displayName: 'Printer Code',
         formatter: CommonConverters.PrinterCode.convert
      },
      Route: {
         group: COMMON,
         displayName: 'Route',
         mask: '???/??/??', // this mask allows spaces and special characters
         maskMode: 'group',
         groupComplete: true,
         trimInput: false, // need to turn off ng-trim to allow beginning spaces
         formatter: CommonConverters.Route.convert,
         parser: CommonConverters.Route.convertBack
      },
      SuffixInput: {
         group: COMMON,
         displayName: 'Suffix for Input',
         formatter: CommonConverters.SuffixInput.convert,
         parser: CommonConverters.SuffixInput.convert // yes - same as convert 1 to 01
      },
      TieOrderType: {
         group: COMMON,
         displayName: 'Tie Order Type',
         formatter: CommonConverters.TieOrderType.convert,
         parser: CommonConverters.TieOrderType.convert
      },
      TieTransactionType: {
         group: COMMON,
         displayName: 'Tie Transaction Type',
         formatter: CommonConverters.TieTransactionType.convert,
         parser: CommonConverters.TieTransactionType.convert
      },
      TwlCharDateConversion: {
         group: TWL,
         displayName: 'CharDateConversion',
         formatter: TwlConverters.CharDateConversion.convert
      },
      TwlPriority: {
         group: TWL,
         displayName: 'TWL Priority',
         formatter: TwlConverters.Priority.convert
      },
      TwlPriorityInput: {
         group: TWL,
         displayName: 'TWL Priority for Input',
         formatter: TwlConverters.PriorityInput.convert,
         parser: TwlConverters.PriorityInput.convert  // yes - same as convert 1 to 001
      },
      TwlReceiptStatusToName: {
         group: TWL,
         displayName: 'TWL Receipt Status',
         formatter: TwlConverters.ReceiptStatusToName.convert
      },
      TwlReceiptTypeToName: {
         group: TWL,
         displayName: 'TWL Receipt Type',
         formatter: TwlConverters.ReceiptTypeToName.convert
      },
      TwlStockStatus: {
         group: TWL,
         displayName: 'TWL Stock Status',
         formatter: TwlConverters.StockStatusToName.convert
      },
      TwlOrderClass: {
         group: TWL,
         displayName: 'TWL Order Class',
         formatter: TwlConverters.OrderClassToName.convert
      },
      TwlOrderStatus: {
         group: TWL,
         displayName: 'TWL Order Status',
         formatter: TwlConverters.OrderStatusToName.convert
      },
      TwlOrderStatusName: {
         group: TWL,
         displayName: 'TWL Order Status Name',
         formatter: TwlConverters.OrderStatusNameToName.convert
      },
      TwlOrderType: {
         group: TWL,
         displayName: 'TWL Order Type',
         formatter: TwlConverters.OrderTypeToName.convert
      },
      UnitType: {
         group: COMMON,
         displayName: 'Unit Type',
         formatter: CommonConverters.UnitType.convert
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
      WtAddOnType: {
         group: WT,
         displayName: 'AddOnType',
         formatter: WtConverters.WtAddOnType.convert
      },
      WtOrderType: {
         group: WT,
         displayName: 'WT Order Type',
         formatter: WtConverters.WtOrderType.convert
      },
      WtStageTypeToName: {
         group: WT,
         displayName: 'StageTypeToName',
         formatter: WtConverters.WtStageTypeToName.convert
      },
      WtStageToName: {
         group: WT,
         displayName: 'StageToName',
         formatter: WtConverters.WtStageToName.convert
      }
   };
});
