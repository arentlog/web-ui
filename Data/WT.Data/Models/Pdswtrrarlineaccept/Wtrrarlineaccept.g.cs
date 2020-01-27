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

namespace Infor.Sxe.WT.Data.Models.Pdswtrrarlineaccept
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtrrarlineaccept.Wtrrarlineaccept")]
   public partial class Wtrrarlineaccept : ModelBase
   {
      [StringValidationAttribute]
      public string rowidWteral { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtrrarlineaccept BuildWtrrarlineacceptFromRow(DataRow row)
      {
         Wtrrarlineaccept entity = new Wtrrarlineaccept();
         entity.rowidWteral = row.Field<byte[]>("rowid-wteral").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtrrarlineaccept(ref DataRow row, Wtrrarlineaccept entity)
      {
         row.SetField("rowid-wteral", entity.rowidWteral.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
