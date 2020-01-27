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

namespace Infor.Sxe.Shared.Data.Models.Pdsnotemovepageno
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsnotemovepageno.Notemovepagenoresults")]
   public partial class Notemovepagenoresults : ModelBase
   {
      public int pageno { get; set; }
      [StringValidationAttribute]
      public string notesRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Notemovepagenoresults BuildNotemovepagenoresultsFromRow(DataRow row)
      {
         Notemovepagenoresults entity = new Notemovepagenoresults();
         entity.pageno = row.IsNull("pageno") ? 0 : row.Field<int>("pageno");
         entity.notesRowid = row.Field<byte[]>("notes-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromNotemovepagenoresults(ref DataRow row, Notemovepagenoresults entity)
      {
         row.SetField("pageno", entity.pageno);
         row.SetField("notes-rowid", entity.notesRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591