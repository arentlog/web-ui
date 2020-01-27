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

namespace Infor.Sxe.PD.Data.Models.Pdspdemgridupdatepdsr
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdemgridupdatepdsr.Pdemgridupdatepdsr")]
   public partial class Pdemgridupdatepdsr : ModelBase
   {
      public bool updttype { get; set; }
      [StringValidationAttribute]
      public string contractNo { get; set; }
      public DateTime? startdt { get; set; }
      public DateTime? enddt { get; set; }
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
      [StringValidationAttribute]
      public string pvPdmlineRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdemgridupdatepdsr BuildPdemgridupdatepdsrFromRow(DataRow row)
      {
         Pdemgridupdatepdsr entity = new Pdemgridupdatepdsr();
         entity.updttype = row.Field<bool>("updttype");
         entity.contractNo = row.IsNull("ContractNo") ? string.Empty : row.Field<string>("ContractNo");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.enddt = row.Field<DateTime?>("enddt");
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
         entity.pvPdmlineRowid = row.Field<byte[]>("pv_pdmline_rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdemgridupdatepdsr(ref DataRow row, Pdemgridupdatepdsr entity)
      {
         row.SetField("updttype", entity.updttype);
         row.SetField("ContractNo", entity.contractNo);
         row.SetField("startdt", entity.startdt);
         row.SetField("enddt", entity.enddt);
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
         row.SetField("pv_pdmline_rowid", entity.pvPdmlineRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591