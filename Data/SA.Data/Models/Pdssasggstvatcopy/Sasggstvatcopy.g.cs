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

namespace Infor.Sxe.SA.Data.Models.Pdssasggstvatcopy
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasggstvatcopy.Sasggstvatcopy")]
   public partial class Sasggstvatcopy : ModelBase
   {
      [StringValidationAttribute]
      public string fromstate { get; set; }
      [StringValidationAttribute]
      public string tostate { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasggstvatcopy BuildSasggstvatcopyFromRow(DataRow row)
      {
         Sasggstvatcopy entity = new Sasggstvatcopy();
         entity.fromstate = row.IsNull("fromstate") ? string.Empty : row.Field<string>("fromstate");
         entity.tostate = row.IsNull("tostate") ? string.Empty : row.Field<string>("tostate");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasggstvatcopy(ref DataRow row, Sasggstvatcopy entity)
      {
         row.SetField("fromstate", entity.fromstate);
         row.SetField("tostate", entity.tostate);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
