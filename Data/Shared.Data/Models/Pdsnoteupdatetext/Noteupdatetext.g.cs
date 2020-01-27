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

namespace Infor.Sxe.Shared.Data.Models.Pdsnoteupdatetext
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsnoteupdatetext.Noteupdatetext")]
   public partial class Noteupdatetext : ModelBase
   {
      [StringValidationAttribute]
      public string tablename { get; set; }
      [StringValidationAttribute]
      public string primarykey { get; set; }
      [StringValidationAttribute]
      public string secondarykey { get; set; }
      [StringValidationAttribute]
      public string noteRowid { get; set; }
      [StringValidationAttribute]
      public string textdelimiter { get; set; }
      [StringValidationAttribute]
      public string textreference { get; set; }
      public bool printfl { get; set; }
      public bool printfl2 { get; set; }
      public bool printfl3 { get; set; }
      public bool printfl4 { get; set; }
      public bool printfl5 { get; set; }
      public bool securefl { get; set; }
      public bool requirefl { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      [StringValidationAttribute]
      public string notecategory { get; set; }
      public bool headerfl { get; set; }


      public static Noteupdatetext BuildNoteupdatetextFromRow(DataRow row)
      {
         Noteupdatetext entity = new Noteupdatetext();
         entity.tablename = row.IsNull("tablename") ? string.Empty : row.Field<string>("tablename");
         entity.primarykey = row.IsNull("primarykey") ? string.Empty : row.Field<string>("primarykey");
         entity.secondarykey = row.IsNull("secondarykey") ? string.Empty : row.Field<string>("secondarykey");
         entity.noteRowid = row.Field<byte[]>("note-rowid").ToStringEncoded();
         entity.textdelimiter = row.IsNull("textdelimiter") ? string.Empty : row.Field<string>("textdelimiter");
         entity.textreference = row.IsNull("textreference") ? string.Empty : row.Field<string>("textreference");
         entity.printfl = row.Field<bool>("printfl");
         entity.printfl2 = row.Field<bool>("printfl2");
         entity.printfl3 = row.Field<bool>("printfl3");
         entity.printfl4 = row.Field<bool>("printfl4");
         entity.printfl5 = row.Field<bool>("printfl5");
         entity.securefl = row.Field<bool>("securefl");
         entity.requirefl = row.Field<bool>("requirefl");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.notecategory = row.IsNull("notecategory") ? string.Empty : row.Field<string>("notecategory");
         entity.headerfl = row.Field<bool>("headerfl");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromNoteupdatetext(ref DataRow row, Noteupdatetext entity)
      {
         row.SetField("tablename", entity.tablename);
         row.SetField("primarykey", entity.primarykey);
         row.SetField("secondarykey", entity.secondarykey);
         row.SetField("note-rowid", entity.noteRowid.ToByteArray());
         row.SetField("textdelimiter", entity.textdelimiter);
         row.SetField("textreference", entity.textreference);
         row.SetField("printfl", entity.printfl);
         row.SetField("printfl2", entity.printfl2);
         row.SetField("printfl3", entity.printfl3);
         row.SetField("printfl4", entity.printfl4);
         row.SetField("printfl5", entity.printfl5);
         row.SetField("securefl", entity.securefl);
         row.SetField("requirefl", entity.requirefl);
         row.SetField("transdt", entity.transdt);
         row.SetField("userfield", entity.userfield);
         row.SetField("notecategory", entity.notecategory);
         row.SetField("headerfl", entity.headerfl);

      }
   
   }
}
#pragma warning restore 1591