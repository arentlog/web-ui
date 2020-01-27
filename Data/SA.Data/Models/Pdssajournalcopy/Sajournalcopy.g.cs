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

namespace Infor.Sxe.SA.Data.Models.Pdssajournalcopy
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssajournalcopy.Sajournalcopy")]
   public partial class Sajournalcopy : ModelBase
   {
      public int fromjrnlno { get; set; }
      public int tojrnlno { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sajournalcopy BuildSajournalcopyFromRow(DataRow row)
      {
         Sajournalcopy entity = new Sajournalcopy();
         entity.fromjrnlno = row.IsNull("fromjrnlno") ? 0 : row.Field<int>("fromjrnlno");
         entity.tojrnlno = row.IsNull("tojrnlno") ? 0 : row.Field<int>("tojrnlno");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSajournalcopy(ref DataRow row, Sajournalcopy entity)
      {
         row.SetField("fromjrnlno", entity.fromjrnlno);
         row.SetField("tojrnlno", entity.tojrnlno);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591