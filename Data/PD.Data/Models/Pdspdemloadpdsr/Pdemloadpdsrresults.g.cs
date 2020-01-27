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

namespace Infor.Sxe.PD.Data.Models.Pdspdemloadpdsr
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdemloadpdsr.Pdemloadpdsrresults")]
   public partial class Pdemloadpdsrresults : ModelBase
   {
      public bool updttype { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodnotesfl { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string proddesc2 { get; set; }
      [StringValidationAttribute]
      public string xrefprod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string rebatety { get; set; }
      [StringValidationAttribute]
      public string rebsubty { get; set; }
      [StringValidationAttribute]
      public string prodprcty { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendnotesfl { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnotesfl { get; set; }
      [StringValidationAttribute]
      public string custtype { get; set; }
      [StringValidationAttribute]
      public string shiptonotesfl { get; set; }
      [StringValidationAttribute]
      public string custrebty { get; set; }
      [StringValidationAttribute]
      public string contractNo { get; set; }
      public DateTime? startdt { get; set; }
      public DateTime? enddt { get; set; }
      [StringValidationAttribute]
      public string dropshipty { get; set; }
      [StringValidationAttribute]
      public string rebatecd { get; set; }
      [StringValidationAttribute]
      public string rebcalcty { get; set; }
      [StringValidationAttribute]
      public string margincostty { get; set; }
      [StringValidationAttribute]
      public string rebatecostty { get; set; }
      [StringValidationAttribute]
      public string rebdowntoty { get; set; }
      public decimal rebateamt { get; set; }
      public decimal rebatepct { get; set; }
      [StringValidationAttribute]
      public string priceSheet { get; set; }
      public DateTime? priceEffectiveDate { get; set; }
      [StringValidationAttribute]
      public string priceSheetTo { get; set; }
      public DateTime? priceEffectiveDateTo { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public bool sharefl { get; set; }
      public decimal sharepct { get; set; }
      public decimal capsellamount { get; set; }
      public bool capselltypefl { get; set; }
      public bool manualfl { get; set; }
      public int contractlineno { get; set; }
      [StringValidationAttribute]
      public string region { get; set; }
      public bool contractcostfl { get; set; }
      public bool usecontractlineno { get; set; }
      public decimal price { get; set; }
      [StringValidationAttribute]
      public string prccurrencyty { get; set; }
      public bool usepricerebfl { get; set; }
      public decimal rebrecno { get; set; }
      [StringValidationAttribute]
      public string cUpdErrMsg { get; set; }
      [StringValidationAttribute]
      public string pvPdmlineRowid { get; set; }
      [StringValidationAttribute]
      public string excelrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdemloadpdsrresults BuildPdemloadpdsrresultsFromRow(DataRow row)
      {
         Pdemloadpdsrresults entity = new Pdemloadpdsrresults();
         entity.updttype = row.Field<bool>("updttype");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodnotesfl = row.IsNull("prodnotesfl") ? string.Empty : row.Field<string>("prodnotesfl");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.xrefprod = row.IsNull("xrefprod") ? string.Empty : row.Field<string>("xrefprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.rebatety = row.IsNull("rebatety") ? string.Empty : row.Field<string>("rebatety");
         entity.rebsubty = row.IsNull("rebsubty") ? string.Empty : row.Field<string>("rebsubty");
         entity.prodprcty = row.IsNull("prodprcty") ? string.Empty : row.Field<string>("prodprcty");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendnotesfl = row.IsNull("vendnotesfl") ? string.Empty : row.Field<string>("vendnotesfl");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnotesfl = row.IsNull("custnotesfl") ? string.Empty : row.Field<string>("custnotesfl");
         entity.custtype = row.IsNull("custtype") ? string.Empty : row.Field<string>("custtype");
         entity.shiptonotesfl = row.IsNull("shiptonotesfl") ? string.Empty : row.Field<string>("shiptonotesfl");
         entity.custrebty = row.IsNull("custrebty") ? string.Empty : row.Field<string>("custrebty");
         entity.contractNo = row.IsNull("ContractNo") ? string.Empty : row.Field<string>("ContractNo");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.enddt = row.Field<DateTime?>("enddt");
         entity.dropshipty = row.IsNull("dropshipty") ? string.Empty : row.Field<string>("dropshipty");
         entity.rebatecd = row.IsNull("rebatecd") ? string.Empty : row.Field<string>("rebatecd");
         entity.rebcalcty = row.IsNull("rebcalcty") ? string.Empty : row.Field<string>("rebcalcty");
         entity.margincostty = row.IsNull("margincostty") ? string.Empty : row.Field<string>("margincostty");
         entity.rebatecostty = row.IsNull("rebatecostty") ? string.Empty : row.Field<string>("rebatecostty");
         entity.rebdowntoty = row.IsNull("rebdowntoty") ? string.Empty : row.Field<string>("rebdowntoty");
         entity.rebateamt = row.IsNull("rebateamt") ? decimal.Zero : row.Field<decimal>("rebateamt");
         entity.rebatepct = row.IsNull("rebatepct") ? decimal.Zero : row.Field<decimal>("rebatepct");
         entity.priceSheet = row.IsNull("PriceSheet") ? string.Empty : row.Field<string>("PriceSheet");
         entity.priceEffectiveDate = row.Field<DateTime?>("PriceEffectiveDate");
         entity.priceSheetTo = row.IsNull("PriceSheetTo") ? string.Empty : row.Field<string>("PriceSheetTo");
         entity.priceEffectiveDateTo = row.Field<DateTime?>("PriceEffectiveDateTo");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.sharefl = row.Field<bool>("sharefl");
         entity.sharepct = row.IsNull("sharepct") ? decimal.Zero : row.Field<decimal>("sharepct");
         entity.capsellamount = row.IsNull("capsellamount") ? decimal.Zero : row.Field<decimal>("capsellamount");
         entity.capselltypefl = row.Field<bool>("capselltypefl");
         entity.manualfl = row.Field<bool>("manualfl");
         entity.contractlineno = row.IsNull("contractlineno") ? 0 : row.Field<int>("contractlineno");
         entity.region = row.IsNull("region") ? string.Empty : row.Field<string>("region");
         entity.contractcostfl = row.Field<bool>("contractcostfl");
         entity.usecontractlineno = row.Field<bool>("usecontractlineno");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.prccurrencyty = row.IsNull("prccurrencyty") ? string.Empty : row.Field<string>("prccurrencyty");
         entity.usepricerebfl = row.Field<bool>("usepricerebfl");
         entity.rebrecno = row.IsNull("rebrecno") ? decimal.Zero : row.Field<decimal>("rebrecno");
         entity.cUpdErrMsg = row.IsNull("cUpdErrMsg") ? string.Empty : row.Field<string>("cUpdErrMsg");
         entity.pvPdmlineRowid = row.Field<byte[]>("pv_pdmline_rowid").ToStringEncoded();
         entity.excelrowid = row.IsNull("excelrowid") ? string.Empty : row.Field<string>("excelrowid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdemloadpdsrresults(ref DataRow row, Pdemloadpdsrresults entity)
      {
         row.SetField("updttype", entity.updttype);
         row.SetField("prod", entity.prod);
         row.SetField("prodnotesfl", entity.prodnotesfl);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("xrefprod", entity.xrefprod);
         row.SetField("whse", entity.whse);
         row.SetField("rebatety", entity.rebatety);
         row.SetField("rebsubty", entity.rebsubty);
         row.SetField("prodprcty", entity.prodprcty);
         row.SetField("prodline", entity.prodline);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendnotesfl", entity.vendnotesfl);
         row.SetField("custno", entity.custno);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("custtype", entity.custtype);
         row.SetField("shiptonotesfl", entity.shiptonotesfl);
         row.SetField("custrebty", entity.custrebty);
         row.SetField("ContractNo", entity.contractNo);
         row.SetField("startdt", entity.startdt);
         row.SetField("enddt", entity.enddt);
         row.SetField("dropshipty", entity.dropshipty);
         row.SetField("rebatecd", entity.rebatecd);
         row.SetField("rebcalcty", entity.rebcalcty);
         row.SetField("margincostty", entity.margincostty);
         row.SetField("rebatecostty", entity.rebatecostty);
         row.SetField("rebdowntoty", entity.rebdowntoty);
         row.SetField("rebateamt", entity.rebateamt);
         row.SetField("rebatepct", entity.rebatepct);
         row.SetField("PriceSheet", entity.priceSheet);
         row.SetField("PriceEffectiveDate", entity.priceEffectiveDate);
         row.SetField("PriceSheetTo", entity.priceSheetTo);
         row.SetField("PriceEffectiveDateTo", entity.priceEffectiveDateTo);
         row.SetField("refer", entity.refer);
         row.SetField("sharefl", entity.sharefl);
         row.SetField("sharepct", entity.sharepct);
         row.SetField("capsellamount", entity.capsellamount);
         row.SetField("capselltypefl", entity.capselltypefl);
         row.SetField("manualfl", entity.manualfl);
         row.SetField("contractlineno", entity.contractlineno);
         row.SetField("region", entity.region);
         row.SetField("contractcostfl", entity.contractcostfl);
         row.SetField("usecontractlineno", entity.usecontractlineno);
         row.SetField("price", entity.price);
         row.SetField("prccurrencyty", entity.prccurrencyty);
         row.SetField("usepricerebfl", entity.usepricerebfl);
         row.SetField("rebrecno", entity.rebrecno);
         row.SetField("cUpdErrMsg", entity.cUpdErrMsg);
         row.SetField("pv_pdmline_rowid", entity.pvPdmlineRowid.ToByteArray());
         row.SetField("excelrowid", entity.excelrowid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591