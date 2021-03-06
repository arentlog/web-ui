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

namespace Infor.Sxe.AP.Data.Models.Pdsapsvaddtoken
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapsvaddtoken.Apsvaddtoken")]
   public partial class Apsvaddtoken : ModelBase
   {
      [StringValidationAttribute]
      public string acctno { get; set; }
      public int cono { get; set; }
      public DateTime? createdt { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string apsvrowid { get; set; }
      public bool deletefl { get; set; }
      [StringValidationAttribute]
      public string token { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apsvaddtoken BuildApsvaddtokenFromRow(DataRow row)
      {
         Apsvaddtoken entity = new Apsvaddtoken();
         entity.acctno = row.IsNull("acctno") ? string.Empty : row.Field<string>("acctno");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.apsvrowid = row.Field<byte[]>("apsvrowid").ToStringEncoded();
         entity.deletefl = row.Field<bool>("deletefl");
         entity.token = row.IsNull("token") ? string.Empty : row.Field<string>("token");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApsvaddtoken(ref DataRow row, Apsvaddtoken entity)
      {
         row.SetField("acctno", entity.acctno);
         row.SetField("cono", entity.cono);
         row.SetField("createdt", entity.createdt);
         row.SetField("vendno", entity.vendno);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("name", entity.name);
         row.SetField("seqno", entity.seqno);
         row.SetField("apsvrowid", entity.apsvrowid.ToByteArray());
         row.SetField("deletefl", entity.deletefl);
         row.SetField("token", entity.token);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
