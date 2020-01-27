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

namespace Infor.Sxe.OE.Data.Models.Pdscreateprodfromcat
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdscreateprodfromcat.Createprodfromcatcriteria")]
   public partial class Createprodfromcatcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prodtype { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Createprodfromcatcriteria BuildCreateprodfromcatcriteriaFromRow(DataRow row)
      {
         Createprodfromcatcriteria entity = new Createprodfromcatcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prodtype = row.IsNull("prodtype") ? string.Empty : row.Field<string>("prodtype");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCreateprodfromcatcriteria(ref DataRow row, Createprodfromcatcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("prodtype", entity.prodtype);
         row.SetField("statustype", entity.statustype);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591