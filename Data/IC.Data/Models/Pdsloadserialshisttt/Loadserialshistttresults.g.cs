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

namespace Infor.Sxe.IC.Data.Models.Pdsloadserialshisttt
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsloadserialshisttt.Loadserialshistttresults")]
   public partial class Loadserialshistttresults : ModelBase
   {
      public DateTime? postdt { get; set; }
      [StringValidationAttribute]
      public string ordertypedspl { get; set; }
      [StringValidationAttribute]
      public string ordernodspl { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string custvendwhse { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      public bool returnfl { get; set; }
      public decimal prodcost { get; set; }
      public decimal price { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadserialshistttresults BuildLoadserialshistttresultsFromRow(DataRow row)
      {
         Loadserialshistttresults entity = new Loadserialshistttresults();
         entity.postdt = row.Field<DateTime?>("postdt");
         entity.ordertypedspl = row.IsNull("ordertypedspl") ? string.Empty : row.Field<string>("ordertypedspl");
         entity.ordernodspl = row.IsNull("ordernodspl") ? string.Empty : row.Field<string>("ordernodspl");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.custvendwhse = row.IsNull("custvendwhse") ? string.Empty : row.Field<string>("custvendwhse");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.returnfl = row.Field<bool>("returnfl");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadserialshistttresults(ref DataRow row, Loadserialshistttresults entity)
      {
         row.SetField("postdt", entity.postdt);
         row.SetField("ordertypedspl", entity.ordertypedspl);
         row.SetField("ordernodspl", entity.ordernodspl);
         row.SetField("lineno", entity.lineno);
         row.SetField("custvendwhse", entity.custvendwhse);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("returnfl", entity.returnfl);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("price", entity.price);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
