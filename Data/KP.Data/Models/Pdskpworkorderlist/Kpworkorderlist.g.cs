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

namespace Infor.Sxe.KP.Data.Models.Pdskpworkorderlist
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdskpworkorderlist.Kpworkorderlist")]
   public partial class Kpworkorderlist : ModelBase
   {
      public int wono { get; set; }
      public int wosuf { get; set; }
      [StringValidationAttribute]
      public string wonoC { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Kpworkorderlist BuildKpworkorderlistFromRow(DataRow row)
      {
         Kpworkorderlist entity = new Kpworkorderlist();
         entity.wono = row.IsNull("wono") ? 0 : row.Field<int>("wono");
         entity.wosuf = row.IsNull("wosuf") ? 0 : row.Field<int>("wosuf");
         entity.wonoC = row.IsNull("wono-c") ? string.Empty : row.Field<string>("wono-c");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKpworkorderlist(ref DataRow row, Kpworkorderlist entity)
      {
         row.SetField("wono", entity.wono);
         row.SetField("wosuf", entity.wosuf);
         row.SetField("wono-c", entity.wonoC);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591