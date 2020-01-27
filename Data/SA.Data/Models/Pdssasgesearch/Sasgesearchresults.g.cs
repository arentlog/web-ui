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

namespace Infor.Sxe.SA.Data.Models.Pdssasgesearch
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasgesearch.Sasgesearchresults")]
   public partial class Sasgesearchresults : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string taxtype { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
      [StringValidationAttribute]
      public string certno { get; set; }
      public DateTime? taxdt { get; set; }
      [StringValidationAttribute]
      public string sasgerowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasgesearchresults BuildSasgesearchresultsFromRow(DataRow row)
      {
         Sasgesearchresults entity = new Sasgesearchresults();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.taxtype = row.IsNull("taxtype") ? string.Empty : row.Field<string>("taxtype");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.certno = row.IsNull("certno") ? string.Empty : row.Field<string>("certno");
         entity.taxdt = row.Field<DateTime?>("taxdt");
         entity.sasgerowid = row.Field<byte[]>("sasgerowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasgesearchresults(ref DataRow row, Sasgesearchresults entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("name", entity.name);
         row.SetField("shipto", entity.shipto);
         row.SetField("state", entity.state);
         row.SetField("taxtype", entity.taxtype);
         row.SetField("comment", entity.comment);
         row.SetField("certno", entity.certno);
         row.SetField("taxdt", entity.taxdt);
         row.SetField("sasgerowid", entity.sasgerowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591