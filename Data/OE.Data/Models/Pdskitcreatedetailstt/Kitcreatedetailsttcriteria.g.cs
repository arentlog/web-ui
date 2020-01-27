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

namespace Infor.Sxe.OE.Data.Models.Pdskitcreatedetailstt
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdskitcreatedetailstt.Kitcreatedetailsttcriteria")]
   public partial class Kitcreatedetailsttcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string ordtype { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      public int seqno { get; set; }
      public int wono { get; set; }
      public int wosuf { get; set; }
      [StringValidationAttribute]
      public string kitprod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public bool inquiryfl { get; set; }
      public bool optionsfl { get; set; }
      public bool keywordsfl { get; set; }
      public bool seriallotfl { get; set; }
      public bool addfl { get; set; }
      public bool deletefl { get; set; }
      [StringValidationAttribute]
      public string specNsType { get; set; }
      [StringValidationAttribute]
      public string prodDesc { get; set; }
      public bool nsokfl { get; set; }
      [StringValidationAttribute]
      public string oetype { get; set; }
      public decimal stkqtyship { get; set; }
      public decimal stkqtyord { get; set; }
      public bool inoebpfl { get; set; }
      [StringValidationAttribute]
      public string kitrollty { get; set; }
      [StringValidationAttribute]
      public string maintL { get; set; }
      public bool returnfl { get; set; }
      [StringValidationAttribute]
      public string botype { get; set; }
      public decimal rebamt { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      [StringValidationAttribute]
      public string ourproc { get; set; }
      public bool warrexchgfl { get; set; }
      public bool wlwhsefl { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public int retorderno { get; set; }
      public int retordersuf { get; set; }
      public int retlineno { get; set; }
      [StringValidationAttribute]
      public string returnty { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      [StringValidationAttribute]
      public string functionname { get; set; }
      public bool modfl { get; set; }
      [StringValidationAttribute]
      public string wlpicktype { get; set; }
      [StringValidationAttribute]
      public string fabwhse { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Kitcreatedetailsttcriteria BuildKitcreatedetailsttcriteriaFromRow(DataRow row)
      {
         Kitcreatedetailsttcriteria entity = new Kitcreatedetailsttcriteria();
         entity.ordtype = row.IsNull("ordtype") ? string.Empty : row.Field<string>("ordtype");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.wono = row.IsNull("wono") ? 0 : row.Field<int>("wono");
         entity.wosuf = row.IsNull("wosuf") ? 0 : row.Field<int>("wosuf");
         entity.kitprod = row.IsNull("kitprod") ? string.Empty : row.Field<string>("kitprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.inquiryfl = row.Field<bool>("inquiryfl");
         entity.optionsfl = row.Field<bool>("optionsfl");
         entity.keywordsfl = row.Field<bool>("keywordsfl");
         entity.seriallotfl = row.Field<bool>("seriallotfl");
         entity.addfl = row.Field<bool>("addfl");
         entity.deletefl = row.Field<bool>("deletefl");
         entity.specNsType = row.IsNull("SpecNsType") ? string.Empty : row.Field<string>("SpecNsType");
         entity.prodDesc = row.IsNull("ProdDesc") ? string.Empty : row.Field<string>("ProdDesc");
         entity.nsokfl = row.Field<bool>("nsokfl");
         entity.oetype = row.IsNull("oetype") ? string.Empty : row.Field<string>("oetype");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.inoebpfl = row.Field<bool>("inoebpfl");
         entity.kitrollty = row.IsNull("kitrollty") ? string.Empty : row.Field<string>("kitrollty");
         entity.maintL = row.IsNull("maint-l") ? string.Empty : row.Field<string>("maint-l");
         entity.returnfl = row.Field<bool>("returnfl");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.rebamt = row.IsNull("rebamt") ? decimal.Zero : row.Field<decimal>("rebamt");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.warrexchgfl = row.Field<bool>("warrexchgfl");
         entity.wlwhsefl = row.Field<bool>("wlwhsefl");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.retorderno = row.IsNull("retorderno") ? 0 : row.Field<int>("retorderno");
         entity.retordersuf = row.IsNull("retordersuf") ? 0 : row.Field<int>("retordersuf");
         entity.retlineno = row.IsNull("retlineno") ? 0 : row.Field<int>("retlineno");
         entity.returnty = row.IsNull("returnty") ? string.Empty : row.Field<string>("returnty");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.modfl = row.Field<bool>("modfl");
         entity.wlpicktype = row.IsNull("wlpicktype") ? string.Empty : row.Field<string>("wlpicktype");
         entity.fabwhse = row.IsNull("fabwhse") ? string.Empty : row.Field<string>("fabwhse");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKitcreatedetailsttcriteria(ref DataRow row, Kitcreatedetailsttcriteria entity)
      {
         row.SetField("ordtype", entity.ordtype);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("wono", entity.wono);
         row.SetField("wosuf", entity.wosuf);
         row.SetField("kitprod", entity.kitprod);
         row.SetField("whse", entity.whse);
         row.SetField("inquiryfl", entity.inquiryfl);
         row.SetField("optionsfl", entity.optionsfl);
         row.SetField("keywordsfl", entity.keywordsfl);
         row.SetField("seriallotfl", entity.seriallotfl);
         row.SetField("addfl", entity.addfl);
         row.SetField("deletefl", entity.deletefl);
         row.SetField("SpecNsType", entity.specNsType);
         row.SetField("ProdDesc", entity.prodDesc);
         row.SetField("nsokfl", entity.nsokfl);
         row.SetField("oetype", entity.oetype);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("inoebpfl", entity.inoebpfl);
         row.SetField("kitrollty", entity.kitrollty);
         row.SetField("maint-l", entity.maintL);
         row.SetField("returnfl", entity.returnfl);
         row.SetField("botype", entity.botype);
         row.SetField("rebamt", entity.rebamt);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("warrexchgfl", entity.warrexchgfl);
         row.SetField("wlwhsefl", entity.wlwhsefl);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("retorderno", entity.retorderno);
         row.SetField("retordersuf", entity.retordersuf);
         row.SetField("retlineno", entity.retlineno);
         row.SetField("returnty", entity.returnty);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("functionname", entity.functionname);
         row.SetField("modfl", entity.modfl);
         row.SetField("wlpicktype", entity.wlpicktype);
         row.SetField("fabwhse", entity.fabwhse);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
