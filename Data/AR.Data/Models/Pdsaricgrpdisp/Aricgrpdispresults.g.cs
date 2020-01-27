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

namespace Infor.Sxe.AR.Data.Models.Pdsaricgrpdisp
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsaricgrpdisp.Aricgrpdispresults")]
   public partial class Aricgrpdispresults : ModelBase
   {
      [StringValidationAttribute]
      public string groupid { get; set; }
      public decimal period1 { get; set; }
      public decimal period2 { get; set; }
      public decimal period3 { get; set; }
      public decimal period4 { get; set; }
      public decimal period5 { get; set; }
      [StringValidationAttribute]
      public string period1label { get; set; }
      [StringValidationAttribute]
      public string period2label { get; set; }
      [StringValidationAttribute]
      public string period3label { get; set; }
      [StringValidationAttribute]
      public string period4label { get; set; }
      [StringValidationAttribute]
      public string period5label { get; set; }
      public decimal futbal { get; set; }
      [StringValidationAttribute]
      public string futballabel { get; set; }
      public decimal totbal1 { get; set; }
      public decimal totbal2 { get; set; }
      public decimal totbal3 { get; set; }
      public decimal totbal4 { get; set; }
      public decimal totbal5 { get; set; }
      [StringValidationAttribute]
      public string totbal1label { get; set; }
      [StringValidationAttribute]
      public string totbal2label { get; set; }
      [StringValidationAttribute]
      public string totbal3label { get; set; }
      [StringValidationAttribute]
      public string totbal4label { get; set; }
      [StringValidationAttribute]
      public string totbal5label { get; set; }
      public decimal ordbal { get; set; }
      public decimal crdlimit { get; set; }
      public decimal crdremaining { get; set; }
      public decimal futOrder { get; set; }
      public decimal laststmtbal { get; set; }
      public decimal priorstmtbal { get; set; }
      public decimal lastpayment { get; set; }
      public DateTime? lastpaymentdt { get; set; }
      public decimal lastsaleamt { get; set; }
      public DateTime? lastsaledt { get; set; }
      public decimal downpayamt { get; set; }
      public decimal rebatesdue { get; set; }
      public decimal servchgytd { get; set; }
      public decimal discytd { get; set; }
      public decimal unearnedytd { get; set; }
      public decimal salesytd { get; set; }
      public decimal costytd { get; set; }
      public decimal returnsytd { get; set; }
      public decimal rebatesytd { get; set; }
      public decimal grossmarginval { get; set; }
      public decimal grossmarginper { get; set; }
      public int holdpercdCR { get; set; }
      [StringValidationAttribute]
      public string credlimapptyCR { get; set; }
      public decimal credlimitCR { get; set; }
      public decimal credremainingCR { get; set; }
      public decimal lastpayamtCR { get; set; }
      public decimal lastSaleAmtCR { get; set; }
      public DateTime? lastPayDtCR { get; set; }
      public DateTime? lastSaleDtCR { get; set; }
      public decimal highbalCR { get; set; }
      public DateTime? pastDueDtCR { get; set; }
      public int noPastDueCR { get; set; }
      public int noPayCR { get; set; }
      public int noInvCR { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Aricgrpdispresults BuildAricgrpdispresultsFromRow(DataRow row)
      {
         Aricgrpdispresults entity = new Aricgrpdispresults();
         entity.groupid = row.IsNull("groupid") ? string.Empty : row.Field<string>("groupid");
         entity.period1 = row.IsNull("period1") ? decimal.Zero : row.Field<decimal>("period1");
         entity.period2 = row.IsNull("period2") ? decimal.Zero : row.Field<decimal>("period2");
         entity.period3 = row.IsNull("period3") ? decimal.Zero : row.Field<decimal>("period3");
         entity.period4 = row.IsNull("period4") ? decimal.Zero : row.Field<decimal>("period4");
         entity.period5 = row.IsNull("period5") ? decimal.Zero : row.Field<decimal>("period5");
         entity.period1label = row.IsNull("period1label") ? string.Empty : row.Field<string>("period1label");
         entity.period2label = row.IsNull("period2label") ? string.Empty : row.Field<string>("period2label");
         entity.period3label = row.IsNull("period3label") ? string.Empty : row.Field<string>("period3label");
         entity.period4label = row.IsNull("period4label") ? string.Empty : row.Field<string>("period4label");
         entity.period5label = row.IsNull("period5label") ? string.Empty : row.Field<string>("period5label");
         entity.futbal = row.IsNull("futbal") ? decimal.Zero : row.Field<decimal>("futbal");
         entity.futballabel = row.IsNull("futballabel") ? string.Empty : row.Field<string>("futballabel");
         entity.totbal1 = row.IsNull("totbal1") ? decimal.Zero : row.Field<decimal>("totbal1");
         entity.totbal2 = row.IsNull("totbal2") ? decimal.Zero : row.Field<decimal>("totbal2");
         entity.totbal3 = row.IsNull("totbal3") ? decimal.Zero : row.Field<decimal>("totbal3");
         entity.totbal4 = row.IsNull("totbal4") ? decimal.Zero : row.Field<decimal>("totbal4");
         entity.totbal5 = row.IsNull("totbal5") ? decimal.Zero : row.Field<decimal>("totbal5");
         entity.totbal1label = row.IsNull("totbal1label") ? string.Empty : row.Field<string>("totbal1label");
         entity.totbal2label = row.IsNull("totbal2label") ? string.Empty : row.Field<string>("totbal2label");
         entity.totbal3label = row.IsNull("totbal3label") ? string.Empty : row.Field<string>("totbal3label");
         entity.totbal4label = row.IsNull("totbal4label") ? string.Empty : row.Field<string>("totbal4label");
         entity.totbal5label = row.IsNull("totbal5label") ? string.Empty : row.Field<string>("totbal5label");
         entity.ordbal = row.IsNull("Ordbal") ? decimal.Zero : row.Field<decimal>("Ordbal");
         entity.crdlimit = row.IsNull("crdlimit") ? decimal.Zero : row.Field<decimal>("crdlimit");
         entity.crdremaining = row.IsNull("crdremaining") ? decimal.Zero : row.Field<decimal>("crdremaining");
         entity.futOrder = row.IsNull("futOrder") ? decimal.Zero : row.Field<decimal>("futOrder");
         entity.laststmtbal = row.IsNull("laststmtbal") ? decimal.Zero : row.Field<decimal>("laststmtbal");
         entity.priorstmtbal = row.IsNull("priorstmtbal") ? decimal.Zero : row.Field<decimal>("priorstmtbal");
         entity.lastpayment = row.IsNull("lastpayment") ? decimal.Zero : row.Field<decimal>("lastpayment");
         entity.lastpaymentdt = row.Field<DateTime?>("lastpaymentdt");
         entity.lastsaleamt = row.IsNull("lastsaleamt") ? decimal.Zero : row.Field<decimal>("lastsaleamt");
         entity.lastsaledt = row.Field<DateTime?>("lastsaledt");
         entity.downpayamt = row.IsNull("downpayamt") ? decimal.Zero : row.Field<decimal>("downpayamt");
         entity.rebatesdue = row.IsNull("rebatesdue") ? decimal.Zero : row.Field<decimal>("rebatesdue");
         entity.servchgytd = row.IsNull("servchgytd") ? decimal.Zero : row.Field<decimal>("servchgytd");
         entity.discytd = row.IsNull("discytd") ? decimal.Zero : row.Field<decimal>("discytd");
         entity.unearnedytd = row.IsNull("unearnedytd") ? decimal.Zero : row.Field<decimal>("unearnedytd");
         entity.salesytd = row.IsNull("salesytd") ? decimal.Zero : row.Field<decimal>("salesytd");
         entity.costytd = row.IsNull("costytd") ? decimal.Zero : row.Field<decimal>("costytd");
         entity.returnsytd = row.IsNull("returnsytd") ? decimal.Zero : row.Field<decimal>("returnsytd");
         entity.rebatesytd = row.IsNull("rebatesytd") ? decimal.Zero : row.Field<decimal>("rebatesytd");
         entity.grossmarginval = row.IsNull("grossmarginval") ? decimal.Zero : row.Field<decimal>("grossmarginval");
         entity.grossmarginper = row.IsNull("grossmarginper") ? decimal.Zero : row.Field<decimal>("grossmarginper");
         entity.holdpercdCR = row.IsNull("holdpercd-CR") ? 0 : row.Field<int>("holdpercd-CR");
         entity.credlimapptyCR = row.IsNull("credlimappty-CR") ? string.Empty : row.Field<string>("credlimappty-CR");
         entity.credlimitCR = row.IsNull("credlimit-CR") ? decimal.Zero : row.Field<decimal>("credlimit-CR");
         entity.credremainingCR = row.IsNull("credremaining-CR") ? decimal.Zero : row.Field<decimal>("credremaining-CR");
         entity.lastpayamtCR = row.IsNull("lastpayamt-CR") ? decimal.Zero : row.Field<decimal>("lastpayamt-CR");
         entity.lastSaleAmtCR = row.IsNull("lastSaleAmt-CR") ? decimal.Zero : row.Field<decimal>("lastSaleAmt-CR");
         entity.lastPayDtCR = row.Field<DateTime?>("lastPayDt-CR");
         entity.lastSaleDtCR = row.Field<DateTime?>("lastSaleDt-CR");
         entity.highbalCR = row.IsNull("highbal-CR") ? decimal.Zero : row.Field<decimal>("highbal-CR");
         entity.pastDueDtCR = row.Field<DateTime?>("pastDueDt-CR");
         entity.noPastDueCR = row.IsNull("noPastDue-CR") ? 0 : row.Field<int>("noPastDue-CR");
         entity.noPayCR = row.IsNull("noPay-CR") ? 0 : row.Field<int>("noPay-CR");
         entity.noInvCR = row.IsNull("noInv-CR") ? 0 : row.Field<int>("noInv-CR");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAricgrpdispresults(ref DataRow row, Aricgrpdispresults entity)
      {
         row.SetField("groupid", entity.groupid);
         row.SetField("period1", entity.period1);
         row.SetField("period2", entity.period2);
         row.SetField("period3", entity.period3);
         row.SetField("period4", entity.period4);
         row.SetField("period5", entity.period5);
         row.SetField("period1label", entity.period1label);
         row.SetField("period2label", entity.period2label);
         row.SetField("period3label", entity.period3label);
         row.SetField("period4label", entity.period4label);
         row.SetField("period5label", entity.period5label);
         row.SetField("futbal", entity.futbal);
         row.SetField("futballabel", entity.futballabel);
         row.SetField("totbal1", entity.totbal1);
         row.SetField("totbal2", entity.totbal2);
         row.SetField("totbal3", entity.totbal3);
         row.SetField("totbal4", entity.totbal4);
         row.SetField("totbal5", entity.totbal5);
         row.SetField("totbal1label", entity.totbal1label);
         row.SetField("totbal2label", entity.totbal2label);
         row.SetField("totbal3label", entity.totbal3label);
         row.SetField("totbal4label", entity.totbal4label);
         row.SetField("totbal5label", entity.totbal5label);
         row.SetField("Ordbal", entity.ordbal);
         row.SetField("crdlimit", entity.crdlimit);
         row.SetField("crdremaining", entity.crdremaining);
         row.SetField("futOrder", entity.futOrder);
         row.SetField("laststmtbal", entity.laststmtbal);
         row.SetField("priorstmtbal", entity.priorstmtbal);
         row.SetField("lastpayment", entity.lastpayment);
         row.SetField("lastpaymentdt", entity.lastpaymentdt);
         row.SetField("lastsaleamt", entity.lastsaleamt);
         row.SetField("lastsaledt", entity.lastsaledt);
         row.SetField("downpayamt", entity.downpayamt);
         row.SetField("rebatesdue", entity.rebatesdue);
         row.SetField("servchgytd", entity.servchgytd);
         row.SetField("discytd", entity.discytd);
         row.SetField("unearnedytd", entity.unearnedytd);
         row.SetField("salesytd", entity.salesytd);
         row.SetField("costytd", entity.costytd);
         row.SetField("returnsytd", entity.returnsytd);
         row.SetField("rebatesytd", entity.rebatesytd);
         row.SetField("grossmarginval", entity.grossmarginval);
         row.SetField("grossmarginper", entity.grossmarginper);
         row.SetField("holdpercd-CR", entity.holdpercdCR);
         row.SetField("credlimappty-CR", entity.credlimapptyCR);
         row.SetField("credlimit-CR", entity.credlimitCR);
         row.SetField("credremaining-CR", entity.credremainingCR);
         row.SetField("lastpayamt-CR", entity.lastpayamtCR);
         row.SetField("lastSaleAmt-CR", entity.lastSaleAmtCR);
         row.SetField("lastPayDt-CR", entity.lastPayDtCR);
         row.SetField("lastSaleDt-CR", entity.lastSaleDtCR);
         row.SetField("highbal-CR", entity.highbalCR);
         row.SetField("pastDueDt-CR", entity.pastDueDtCR);
         row.SetField("noPastDue-CR", entity.noPastDueCR);
         row.SetField("noPay-CR", entity.noPayCR);
         row.SetField("noInv-CR", entity.noInvCR);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
