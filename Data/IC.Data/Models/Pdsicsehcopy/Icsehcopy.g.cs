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

namespace Infor.Sxe.IC.Data.Models.Pdsicsehcopy
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsehcopy.Icsehcopy")]
   public partial class Icsehcopy : ModelBase
   {
      [StringValidationAttribute]
      public string frommsdssheetno { get; set; }
      [StringValidationAttribute]
      public string fromlangcd { get; set; }
      [StringValidationAttribute]
      public string tomsdssheetno { get; set; }
      [StringValidationAttribute]
      public string tolangcd { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsehcopy BuildIcsehcopyFromRow(DataRow row)
      {
         Icsehcopy entity = new Icsehcopy();
         entity.frommsdssheetno = row.IsNull("frommsdssheetno") ? string.Empty : row.Field<string>("frommsdssheetno");
         entity.fromlangcd = row.IsNull("fromlangcd") ? string.Empty : row.Field<string>("fromlangcd");
         entity.tomsdssheetno = row.IsNull("tomsdssheetno") ? string.Empty : row.Field<string>("tomsdssheetno");
         entity.tolangcd = row.IsNull("tolangcd") ? string.Empty : row.Field<string>("tolangcd");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsehcopy(ref DataRow row, Icsehcopy entity)
      {
         row.SetField("frommsdssheetno", entity.frommsdssheetno);
         row.SetField("fromlangcd", entity.fromlangcd);
         row.SetField("tomsdssheetno", entity.tomsdssheetno);
         row.SetField("tolangcd", entity.tolangcd);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591