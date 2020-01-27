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

namespace Infor.Sxe.OE.Data.Models.Pdsoeetprint
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeetprint.Oeetprintscreensingle")]
   public partial class Oeetprintscreensingle : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string oeprintid { get; set; }
      public bool whereappchecked { get; set; }
      public bool printersenabled { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeetprintscreensingle BuildOeetprintscreensingleFromRow(DataRow row)
      {
         Oeetprintscreensingle entity = new Oeetprintscreensingle();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.oeprintid = row.Field<byte[]>("oeprintid").ToStringEncoded();
         entity.whereappchecked = row.Field<bool>("whereappchecked");
         entity.printersenabled = row.Field<bool>("printersenabled");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeetprintscreensingle(ref DataRow row, Oeetprintscreensingle entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("oeprintid", entity.oeprintid.ToByteArray());
         row.SetField("whereappchecked", entity.whereappchecked);
         row.SetField("printersenabled", entity.printersenabled);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
