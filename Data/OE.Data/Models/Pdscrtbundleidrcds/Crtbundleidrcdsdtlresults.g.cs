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

namespace Infor.Sxe.OE.Data.Models.Pdscrtbundleidrcds
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdscrtbundleidrcds.Crtbundleidrcdsdtlresults")]
   public partial class Crtbundleidrcdsdtlresults : ModelBase
   {
      [StringValidationAttribute]
      public string bundleid { get; set; }
      [StringValidationAttribute]
      public string comprod { get; set; }
      [StringValidationAttribute]
      public string clength { get; set; }
      public decimal qtyord { get; set; }


      public static Crtbundleidrcdsdtlresults BuildCrtbundleidrcdsdtlresultsFromRow(DataRow row)
      {
         Crtbundleidrcdsdtlresults entity = new Crtbundleidrcdsdtlresults();
         entity.bundleid = row.IsNull("bundleid") ? string.Empty : row.Field<string>("bundleid");
         entity.comprod = row.IsNull("comprod") ? string.Empty : row.Field<string>("comprod");
         entity.clength = row.IsNull("clength") ? string.Empty : row.Field<string>("clength");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCrtbundleidrcdsdtlresults(ref DataRow row, Crtbundleidrcdsdtlresults entity)
      {
         row.SetField("bundleid", entity.bundleid);
         row.SetField("comprod", entity.comprod);
         row.SetField("clength", entity.clength);
         row.SetField("qtyord", entity.qtyord);

      }
   
   }
}
#pragma warning restore 1591