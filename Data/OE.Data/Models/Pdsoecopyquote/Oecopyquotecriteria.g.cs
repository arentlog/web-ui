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

namespace Infor.Sxe.OE.Data.Models.Pdsoecopyquote
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoecopyquote.Oecopyquotecriteria")]
   public partial class Oecopyquotecriteria : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custpo { get; set; }
      public decimal fpcustno { get; set; }
      public decimal lumpbillamt { get; set; }
      [StringValidationAttribute]
      public string orderdisp { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public bool savefl { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string slsrepin { get; set; }
      [StringValidationAttribute]
      public string slsrepout { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }


      public static Oecopyquotecriteria BuildOecopyquotecriteriaFromRow(DataRow row)
      {
         Oecopyquotecriteria entity = new Oecopyquotecriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custpo = row.IsNull("custpo") ? string.Empty : row.Field<string>("custpo");
         entity.fpcustno = row.IsNull("fpcustno") ? decimal.Zero : row.Field<decimal>("fpcustno");
         entity.lumpbillamt = row.IsNull("lumpbillamt") ? decimal.Zero : row.Field<decimal>("lumpbillamt");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.savefl = row.Field<bool>("savefl");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOecopyquotecriteria(ref DataRow row, Oecopyquotecriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("custpo", entity.custpo);
         row.SetField("fpcustno", entity.fpcustno);
         row.SetField("lumpbillamt", entity.lumpbillamt);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("savefl", entity.savefl);
         row.SetField("shipto", entity.shipto);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("transtype", entity.transtype);
         row.SetField("whse", entity.whse);

      }
   
   }
}
#pragma warning restore 1591