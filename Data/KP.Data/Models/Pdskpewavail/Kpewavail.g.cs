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

namespace Infor.Sxe.KP.Data.Models.Pdskpewavail
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdskpewavail.Kpewavail")]
   public partial class Kpewavail : ModelBase
   {
      public int wono { get; set; }
      public int wosuf { get; set; }
      public decimal availtobuild { get; set; }
      public decimal netavail { get; set; }
      public decimal qtyshipk { get; set; }
      public decimal qtyonorder { get; set; }
      public decimal qtybo { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Kpewavail BuildKpewavailFromRow(DataRow row)
      {
         Kpewavail entity = new Kpewavail();
         entity.wono = row.IsNull("wono") ? 0 : row.Field<int>("wono");
         entity.wosuf = row.IsNull("wosuf") ? 0 : row.Field<int>("wosuf");
         entity.availtobuild = row.IsNull("availtobuild") ? decimal.Zero : row.Field<decimal>("availtobuild");
         entity.netavail = row.IsNull("netavail") ? decimal.Zero : row.Field<decimal>("netavail");
         entity.qtyshipk = row.IsNull("qtyshipk") ? decimal.Zero : row.Field<decimal>("qtyshipk");
         entity.qtyonorder = row.IsNull("qtyonorder") ? decimal.Zero : row.Field<decimal>("qtyonorder");
         entity.qtybo = row.IsNull("qtybo") ? decimal.Zero : row.Field<decimal>("qtybo");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKpewavail(ref DataRow row, Kpewavail entity)
      {
         row.SetField("wono", entity.wono);
         row.SetField("wosuf", entity.wosuf);
         row.SetField("availtobuild", entity.availtobuild);
         row.SetField("netavail", entity.netavail);
         row.SetField("qtyshipk", entity.qtyshipk);
         row.SetField("qtyonorder", entity.qtyonorder);
         row.SetField("qtybo", entity.qtybo);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
