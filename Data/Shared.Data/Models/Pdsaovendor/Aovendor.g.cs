//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 13370 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using HelpPageErrorSimulator.HelpArea.Areas.HelpPage.ModelDescriptions;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.Shared.Data.Models.Pdsaovendor
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaovendor.Aovendor")]
   public partial class Aovendor : ModelBase
   {
      public int cono { get; set; }
      public int apChkfrmt { get; set; }
      public bool apchkheadfl { get; set; }
      public int ap1099Frmt { get; set; }
      public bool aPImmedFl { get; set; }
      public bool aPHoldFl { get; set; }
      public bool aPmcDiscFl { get; set; }
      [StringValidationAttribute]
      public string aPDupInvFl { get; set; }
      [StringValidationAttribute]
      public string allocationTy { get; set; }
      public int apMinBuy { get; set; }
      public decimal apOrdCost { get; set; }
      public decimal apClsPct1 { get; set; }
      public decimal apClsPct2 { get; set; }
      public decimal apClsPct3 { get; set; }
      public decimal apClsPct4 { get; set; }
      public decimal apClsPct5 { get; set; }
      public decimal apClsPct6 { get; set; }
      public decimal apClsPct7 { get; set; }
      public decimal apClsPct8 { get; set; }
      public decimal apClsPct9 { get; set; }
      public decimal apClsPct10 { get; set; }
      public decimal apClsPct11 { get; set; }
      public decimal apClsPct12 { get; set; }
      public int aPPerDays1 { get; set; }
      public int aPPerDays2 { get; set; }
      public int aPPerDays3 { get; set; }
      public int aPPerDays4 { get; set; }
      [StringValidationAttribute]
      public string pOCommMethodVMI { get; set; }
      [StringValidationAttribute]
      public string pOCommMethodEMail { get; set; }
      [StringValidationAttribute]
      public string pOCommMethodPrint { get; set; }
      [StringValidationAttribute]
      public string pOCommMethodEDI { get; set; }
      [StringValidationAttribute]
      public string pOCommMethodFax { get; set; }
      [StringValidationAttribute]
      public string pOCommMethodION { get; set; }
      public bool aPBatchDel { get; set; }
      public bool aPDisputeFl { get; set; }
      public decimal aPQtyTolAmt { get; set; }
      public decimal aPQtyTolPct { get; set; }
      public decimal aPLnTolAmt { get; set; }
      public decimal aPLnTolPct { get; set; }
      public decimal aPInvTolAmt { get; set; }
      public decimal aPInvTolPct { get; set; }
      public decimal apinvtolminamt { get; set; }
      public decimal aPUser1Amt { get; set; }
      public decimal aPUser1Pct { get; set; }
      public decimal aPUser2Amt { get; set; }
      public decimal aPUser2Pct { get; set; }
      [StringValidationAttribute]
      public string aPRcvTolType { get; set; }
      public decimal aPRcvQtyTolAmt { get; set; }
      public decimal aPRcvQtyTolPct { get; set; }
      public decimal aPRcvLnTolAmt { get; set; }
      public decimal aPRcvLnTolPct { get; set; }
      public decimal aPRcvPOTolAmt { get; set; }
      public decimal aPRcvPOTolPct { get; set; }
      [StringValidationAttribute]
      public string sascRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      [StringValidationAttribute]
      public string checkOutputType { get; set; }
      [StringValidationAttribute]
      public string checkExtraDataLevel1 { get; set; }
      [StringValidationAttribute]
      public string checkExtraDataLevel2 { get; set; }
      public bool allowAPCreditACH { get; set; }
      public int aprmtadvedifmt { get; set; }
      public int apictransadjedifmt { get; set; }
      public int apictransedifmt { get; set; }
      [StringValidationAttribute]
      public string apinvadvedifmt { get; set; }
      [StringValidationAttribute]
      public string checkIDMDocTypeID { get; set; }
      [StringValidationAttribute]
      public string checkIDMTemplateName { get; set; }
      [StringValidationAttribute]
      public string checkIDMFromEmailAddr { get; set; }
      [StringValidationAttribute]
      public string checkIDMFromEmailName { get; set; }
      [StringValidationAttribute]
      public string checkRemitIDMDocTypeID { get; set; }
      [StringValidationAttribute]
      public string checkRemitIDMTemplateName { get; set; }
      public int checkLines { get; set; }


      public static Aovendor BuildAovendorFromRow(DataRow row)
      {
         Aovendor entity = new Aovendor();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.apChkfrmt = row.IsNull("apChkfrmt") ? 0 : row.Field<int>("apChkfrmt");
         entity.apchkheadfl = row.Field<bool>("apchkheadfl");
         entity.ap1099Frmt = row.IsNull("ap1099Frmt") ? 0 : row.Field<int>("ap1099Frmt");
         entity.aPImmedFl = row.Field<bool>("APImmedFl");
         entity.aPHoldFl = row.Field<bool>("APHoldFl");
         entity.aPmcDiscFl = row.Field<bool>("APmcDiscFl");
         entity.aPDupInvFl = row.IsNull("APDupInvFl") ? string.Empty : row.Field<string>("APDupInvFl");
         entity.allocationTy = row.IsNull("AllocationTy") ? string.Empty : row.Field<string>("AllocationTy");
         entity.apMinBuy = row.IsNull("apMinBuy") ? 0 : row.Field<int>("apMinBuy");
         entity.apOrdCost = row.IsNull("apOrdCost") ? decimal.Zero : row.Field<decimal>("apOrdCost");
         entity.apClsPct1 = row.IsNull("apClsPct1") ? decimal.Zero : row.Field<decimal>("apClsPct1");
         entity.apClsPct2 = row.IsNull("apClsPct2") ? decimal.Zero : row.Field<decimal>("apClsPct2");
         entity.apClsPct3 = row.IsNull("apClsPct3") ? decimal.Zero : row.Field<decimal>("apClsPct3");
         entity.apClsPct4 = row.IsNull("apClsPct4") ? decimal.Zero : row.Field<decimal>("apClsPct4");
         entity.apClsPct5 = row.IsNull("apClsPct5") ? decimal.Zero : row.Field<decimal>("apClsPct5");
         entity.apClsPct6 = row.IsNull("apClsPct6") ? decimal.Zero : row.Field<decimal>("apClsPct6");
         entity.apClsPct7 = row.IsNull("apClsPct7") ? decimal.Zero : row.Field<decimal>("apClsPct7");
         entity.apClsPct8 = row.IsNull("apClsPct8") ? decimal.Zero : row.Field<decimal>("apClsPct8");
         entity.apClsPct9 = row.IsNull("apClsPct9") ? decimal.Zero : row.Field<decimal>("apClsPct9");
         entity.apClsPct10 = row.IsNull("apClsPct10") ? decimal.Zero : row.Field<decimal>("apClsPct10");
         entity.apClsPct11 = row.IsNull("apClsPct11") ? decimal.Zero : row.Field<decimal>("apClsPct11");
         entity.apClsPct12 = row.IsNull("apClsPct12") ? decimal.Zero : row.Field<decimal>("apClsPct12");
         entity.aPPerDays1 = row.IsNull("APPerDays1") ? 0 : row.Field<int>("APPerDays1");
         entity.aPPerDays2 = row.IsNull("APPerDays2") ? 0 : row.Field<int>("APPerDays2");
         entity.aPPerDays3 = row.IsNull("APPerDays3") ? 0 : row.Field<int>("APPerDays3");
         entity.aPPerDays4 = row.IsNull("APPerDays4") ? 0 : row.Field<int>("APPerDays4");
         entity.pOCommMethodVMI = row.IsNull("POCommMethod-VMI") ? string.Empty : row.Field<string>("POCommMethod-VMI");
         entity.pOCommMethodEMail = row.IsNull("POCommMethod-EMail") ? string.Empty : row.Field<string>("POCommMethod-EMail");
         entity.pOCommMethodPrint = row.IsNull("POCommMethod-Print") ? string.Empty : row.Field<string>("POCommMethod-Print");
         entity.pOCommMethodEDI = row.IsNull("POCommMethod-EDI") ? string.Empty : row.Field<string>("POCommMethod-EDI");
         entity.pOCommMethodFax = row.IsNull("POCommMethod-Fax") ? string.Empty : row.Field<string>("POCommMethod-Fax");
         entity.pOCommMethodION = row.IsNull("POCommMethod-ION") ? string.Empty : row.Field<string>("POCommMethod-ION");
         entity.aPBatchDel = row.Field<bool>("APBatchDel");
         entity.aPDisputeFl = row.Field<bool>("APDisputeFl");
         entity.aPQtyTolAmt = row.IsNull("APQtyTolAmt") ? decimal.Zero : row.Field<decimal>("APQtyTolAmt");
         entity.aPQtyTolPct = row.IsNull("APQtyTolPct") ? decimal.Zero : row.Field<decimal>("APQtyTolPct");
         entity.aPLnTolAmt = row.IsNull("APLnTolAmt") ? decimal.Zero : row.Field<decimal>("APLnTolAmt");
         entity.aPLnTolPct = row.IsNull("APLnTolPct") ? decimal.Zero : row.Field<decimal>("APLnTolPct");
         entity.aPInvTolAmt = row.IsNull("APInvTolAmt") ? decimal.Zero : row.Field<decimal>("APInvTolAmt");
         entity.aPInvTolPct = row.IsNull("APInvTolPct") ? decimal.Zero : row.Field<decimal>("APInvTolPct");
         entity.apinvtolminamt = row.IsNull("apinvtolminamt") ? decimal.Zero : row.Field<decimal>("apinvtolminamt");
         entity.aPUser1Amt = row.IsNull("APUser1Amt") ? decimal.Zero : row.Field<decimal>("APUser1Amt");
         entity.aPUser1Pct = row.IsNull("APUser1Pct") ? decimal.Zero : row.Field<decimal>("APUser1Pct");
         entity.aPUser2Amt = row.IsNull("APUser2Amt") ? decimal.Zero : row.Field<decimal>("APUser2Amt");
         entity.aPUser2Pct = row.IsNull("APUser2Pct") ? decimal.Zero : row.Field<decimal>("APUser2Pct");
         entity.aPRcvTolType = row.IsNull("APRcvTolType") ? string.Empty : row.Field<string>("APRcvTolType");
         entity.aPRcvQtyTolAmt = row.IsNull("APRcvQtyTolAmt") ? decimal.Zero : row.Field<decimal>("APRcvQtyTolAmt");
         entity.aPRcvQtyTolPct = row.IsNull("APRcvQtyTolPct") ? decimal.Zero : row.Field<decimal>("APRcvQtyTolPct");
         entity.aPRcvLnTolAmt = row.IsNull("APRcvLnTolAmt") ? decimal.Zero : row.Field<decimal>("APRcvLnTolAmt");
         entity.aPRcvLnTolPct = row.IsNull("APRcvLnTolPct") ? decimal.Zero : row.Field<decimal>("APRcvLnTolPct");
         entity.aPRcvPOTolAmt = row.IsNull("APRcvPOTolAmt") ? decimal.Zero : row.Field<decimal>("APRcvPOTolAmt");
         entity.aPRcvPOTolPct = row.IsNull("APRcvPOTolPct") ? decimal.Zero : row.Field<decimal>("APRcvPOTolPct");
         entity.sascRowid = row.Field<byte[]>("sasc-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.checkOutputType = row.IsNull("CheckOutputType") ? string.Empty : row.Field<string>("CheckOutputType");
         entity.checkExtraDataLevel1 = row.IsNull("CheckExtraDataLevel1") ? string.Empty : row.Field<string>("CheckExtraDataLevel1");
         entity.checkExtraDataLevel2 = row.IsNull("CheckExtraDataLevel2") ? string.Empty : row.Field<string>("CheckExtraDataLevel2");
         entity.allowAPCreditACH = row.Field<bool>("AllowAPCreditACH");
         entity.aprmtadvedifmt = row.IsNull("aprmtadvedifmt") ? 0 : row.Field<int>("aprmtadvedifmt");
         entity.apictransadjedifmt = row.IsNull("apictransadjedifmt") ? 0 : row.Field<int>("apictransadjedifmt");
         entity.apictransedifmt = row.IsNull("apictransedifmt") ? 0 : row.Field<int>("apictransedifmt");
         entity.apinvadvedifmt = row.IsNull("apinvadvedifmt") ? string.Empty : row.Field<string>("apinvadvedifmt");
         entity.checkIDMDocTypeID = row.IsNull("CheckIDMDocTypeID") ? string.Empty : row.Field<string>("CheckIDMDocTypeID");
         entity.checkIDMTemplateName = row.IsNull("CheckIDMTemplateName") ? string.Empty : row.Field<string>("CheckIDMTemplateName");
         entity.checkIDMFromEmailAddr = row.IsNull("CheckIDMFromEmailAddr") ? string.Empty : row.Field<string>("CheckIDMFromEmailAddr");
         entity.checkIDMFromEmailName = row.IsNull("CheckIDMFromEmailName") ? string.Empty : row.Field<string>("CheckIDMFromEmailName");
         entity.checkRemitIDMDocTypeID = row.IsNull("CheckRemitIDMDocTypeID") ? string.Empty : row.Field<string>("CheckRemitIDMDocTypeID");
         entity.checkRemitIDMTemplateName = row.IsNull("CheckRemitIDMTemplateName") ? string.Empty : row.Field<string>("CheckRemitIDMTemplateName");
         entity.checkLines = row.IsNull("CheckLines") ? 0 : row.Field<int>("CheckLines");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAovendor(ref DataRow row, Aovendor entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("apChkfrmt", entity.apChkfrmt);
         row.SetField("apchkheadfl", entity.apchkheadfl);
         row.SetField("ap1099Frmt", entity.ap1099Frmt);
         row.SetField("APImmedFl", entity.aPImmedFl);
         row.SetField("APHoldFl", entity.aPHoldFl);
         row.SetField("APmcDiscFl", entity.aPmcDiscFl);
         row.SetField("APDupInvFl", entity.aPDupInvFl);
         row.SetField("AllocationTy", entity.allocationTy);
         row.SetField("apMinBuy", entity.apMinBuy);
         row.SetField("apOrdCost", entity.apOrdCost);
         row.SetField("apClsPct1", entity.apClsPct1);
         row.SetField("apClsPct2", entity.apClsPct2);
         row.SetField("apClsPct3", entity.apClsPct3);
         row.SetField("apClsPct4", entity.apClsPct4);
         row.SetField("apClsPct5", entity.apClsPct5);
         row.SetField("apClsPct6", entity.apClsPct6);
         row.SetField("apClsPct7", entity.apClsPct7);
         row.SetField("apClsPct8", entity.apClsPct8);
         row.SetField("apClsPct9", entity.apClsPct9);
         row.SetField("apClsPct10", entity.apClsPct10);
         row.SetField("apClsPct11", entity.apClsPct11);
         row.SetField("apClsPct12", entity.apClsPct12);
         row.SetField("APPerDays1", entity.aPPerDays1);
         row.SetField("APPerDays2", entity.aPPerDays2);
         row.SetField("APPerDays3", entity.aPPerDays3);
         row.SetField("APPerDays4", entity.aPPerDays4);
         row.SetField("POCommMethod-VMI", entity.pOCommMethodVMI);
         row.SetField("POCommMethod-EMail", entity.pOCommMethodEMail);
         row.SetField("POCommMethod-Print", entity.pOCommMethodPrint);
         row.SetField("POCommMethod-EDI", entity.pOCommMethodEDI);
         row.SetField("POCommMethod-Fax", entity.pOCommMethodFax);
         row.SetField("POCommMethod-ION", entity.pOCommMethodION);
         row.SetField("APBatchDel", entity.aPBatchDel);
         row.SetField("APDisputeFl", entity.aPDisputeFl);
         row.SetField("APQtyTolAmt", entity.aPQtyTolAmt);
         row.SetField("APQtyTolPct", entity.aPQtyTolPct);
         row.SetField("APLnTolAmt", entity.aPLnTolAmt);
         row.SetField("APLnTolPct", entity.aPLnTolPct);
         row.SetField("APInvTolAmt", entity.aPInvTolAmt);
         row.SetField("APInvTolPct", entity.aPInvTolPct);
         row.SetField("apinvtolminamt", entity.apinvtolminamt);
         row.SetField("APUser1Amt", entity.aPUser1Amt);
         row.SetField("APUser1Pct", entity.aPUser1Pct);
         row.SetField("APUser2Amt", entity.aPUser2Amt);
         row.SetField("APUser2Pct", entity.aPUser2Pct);
         row.SetField("APRcvTolType", entity.aPRcvTolType);
         row.SetField("APRcvQtyTolAmt", entity.aPRcvQtyTolAmt);
         row.SetField("APRcvQtyTolPct", entity.aPRcvQtyTolPct);
         row.SetField("APRcvLnTolAmt", entity.aPRcvLnTolAmt);
         row.SetField("APRcvLnTolPct", entity.aPRcvLnTolPct);
         row.SetField("APRcvPOTolAmt", entity.aPRcvPOTolAmt);
         row.SetField("APRcvPOTolPct", entity.aPRcvPOTolPct);
         row.SetField("sasc-rowid", entity.sascRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);
         row.SetField("CheckOutputType", entity.checkOutputType);
         row.SetField("CheckExtraDataLevel1", entity.checkExtraDataLevel1);
         row.SetField("CheckExtraDataLevel2", entity.checkExtraDataLevel2);
         row.SetField("AllowAPCreditACH", entity.allowAPCreditACH);
         row.SetField("aprmtadvedifmt", entity.aprmtadvedifmt);
         row.SetField("apictransadjedifmt", entity.apictransadjedifmt);
         row.SetField("apictransedifmt", entity.apictransedifmt);
         row.SetField("apinvadvedifmt", entity.apinvadvedifmt);
         row.SetField("CheckIDMDocTypeID", entity.checkIDMDocTypeID);
         row.SetField("CheckIDMTemplateName", entity.checkIDMTemplateName);
         row.SetField("CheckIDMFromEmailAddr", entity.checkIDMFromEmailAddr);
         row.SetField("CheckIDMFromEmailName", entity.checkIDMFromEmailName);
         row.SetField("CheckRemitIDMDocTypeID", entity.checkRemitIDMDocTypeID);
         row.SetField("CheckRemitIDMTemplateName", entity.checkRemitIDMTemplateName);
         row.SetField("CheckLines", entity.checkLines);

      }
   
   }
}
#pragma warning restore 1591