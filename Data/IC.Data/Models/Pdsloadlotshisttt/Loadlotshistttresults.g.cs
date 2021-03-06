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

namespace Infor.Sxe.IC.Data.Models.Pdsloadlotshisttt
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsloadlotshisttt.Loadlotshistttresults")]
   public partial class Loadlotshistttresults : ModelBase
   {
      public DateTime? postdt { get; set; }
      [StringValidationAttribute]
      public string ordertypedspl { get; set; }
      [StringValidationAttribute]
      public string ordernodspl { get; set; }
      public int lineno { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string custvendwhse { get; set; }
      public decimal quantity { get; set; }
      public decimal qtyunavail { get; set; }
      public decimal prodcost { get; set; }
      public decimal price { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadlotshistttresults BuildLoadlotshistttresultsFromRow(DataRow row)
      {
         Loadlotshistttresults entity = new Loadlotshistttresults();
         entity.postdt = row.Field<DateTime?>("postdt");
         entity.ordertypedspl = row.IsNull("ordertypedspl") ? string.Empty : row.Field<string>("ordertypedspl");
         entity.ordernodspl = row.IsNull("ordernodspl") ? string.Empty : row.Field<string>("ordernodspl");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.custvendwhse = row.IsNull("custvendwhse") ? string.Empty : row.Field<string>("custvendwhse");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadlotshistttresults(ref DataRow row, Loadlotshistttresults entity)
      {
         row.SetField("postdt", entity.postdt);
         row.SetField("ordertypedspl", entity.ordertypedspl);
         row.SetField("ordernodspl", entity.ordernodspl);
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("custvendwhse", entity.custvendwhse);
         row.SetField("quantity", entity.quantity);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("price", entity.price);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
