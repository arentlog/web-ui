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

namespace Infor.Sxe.WT.Data.Models.Pdswtrrarreptadjmerge
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtrrarreptadjmerge.Wtrrarreptadjmergerepts")]
   public partial class Wtrrarreptadjmergerepts : ModelBase
   {
      [StringValidationAttribute]
      public string rowidWterah { get; set; }
      public bool mergefl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtrrarreptadjmergerepts BuildWtrrarreptadjmergereptsFromRow(DataRow row)
      {
         Wtrrarreptadjmergerepts entity = new Wtrrarreptadjmergerepts();
         entity.rowidWterah = row.Field<byte[]>("rowid-wterah").ToStringEncoded();
         entity.mergefl = row.Field<bool>("mergefl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtrrarreptadjmergerepts(ref DataRow row, Wtrrarreptadjmergerepts entity)
      {
         row.SetField("rowid-wterah", entity.rowidWterah.ToByteArray());
         row.SetField("mergefl", entity.mergefl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
