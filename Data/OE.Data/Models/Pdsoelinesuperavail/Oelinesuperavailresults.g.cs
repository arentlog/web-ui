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

namespace Infor.Sxe.OE.Data.Models.Pdsoelinesuperavail
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelinesuperavail.Oelinesuperavailresults")]
   public partial class Oelinesuperavailresults : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal qtyavail { get; set; }
      public decimal surplus { get; set; }
      public decimal qtyord { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      [StringValidationAttribute]
      public string region { get; set; }
      public bool dnrwttieallow { get; set; }
      [StringValidationAttribute]
      public string unitstock { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string sellfirsttype { get; set; }
      public bool qtyordenabled { get; set; }
      public bool qtyordhidden { get; set; }
      public bool ordertypeenabled { get; set; }
      public bool ordertypehidden { get; set; }


      public static Oelinesuperavailresults BuildOelinesuperavailresultsFromRow(DataRow row)
      {
         Oelinesuperavailresults entity = new Oelinesuperavailresults();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.qtyavail = row.IsNull("qtyavail") ? decimal.Zero : row.Field<decimal>("qtyavail");
         entity.surplus = row.IsNull("surplus") ? decimal.Zero : row.Field<decimal>("surplus");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.region = row.IsNull("region") ? string.Empty : row.Field<string>("region");
         entity.dnrwttieallow = row.Field<bool>("dnrwttieallow");
         entity.unitstock = row.IsNull("unitstock") ? string.Empty : row.Field<string>("unitstock");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.sellfirsttype = row.IsNull("sellfirsttype") ? string.Empty : row.Field<string>("sellfirsttype");
         entity.qtyordenabled = row.Field<bool>("qtyordenabled");
         entity.qtyordhidden = row.Field<bool>("qtyordhidden");
         entity.ordertypeenabled = row.Field<bool>("ordertypeenabled");
         entity.ordertypehidden = row.Field<bool>("ordertypehidden");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinesuperavailresults(ref DataRow row, Oelinesuperavailresults entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("descrip", entity.descrip);
         row.SetField("whse", entity.whse);
         row.SetField("qtyavail", entity.qtyavail);
         row.SetField("surplus", entity.surplus);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("region", entity.region);
         row.SetField("dnrwttieallow", entity.dnrwttieallow);
         row.SetField("unitstock", entity.unitstock);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("sellfirsttype", entity.sellfirsttype);
         row.SetField("qtyordenabled", entity.qtyordenabled);
         row.SetField("qtyordhidden", entity.qtyordhidden);
         row.SetField("ordertypeenabled", entity.ordertypeenabled);
         row.SetField("ordertypehidden", entity.ordertypehidden);

      }
   
   }
}
#pragma warning restore 1591