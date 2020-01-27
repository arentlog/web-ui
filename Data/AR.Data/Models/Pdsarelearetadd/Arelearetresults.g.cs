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

namespace Infor.Sxe.AR.Data.Models.Pdsarelearetadd
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarelearetadd.Arelearetresults")]
   public partial class Arelearetresults : ModelBase
   {
      public int invno { get; set; }
      public int invsuf { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      public int seqno { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnotesfl { get; set; }
      public DateTime? invdt { get; set; }
      [StringValidationAttribute]
      public string transcddesc { get; set; }
      [StringValidationAttribute]
      public string statustypedesc { get; set; }
      public decimal amount { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string raretid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arelearetresults BuildArelearetresultsFromRow(DataRow row)
      {
         Arelearetresults entity = new Arelearetresults();
         entity.invno = row.IsNull("invno") ? 0 : row.Field<int>("invno");
         entity.invsuf = row.IsNull("invsuf") ? 0 : row.Field<int>("invsuf");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnotesfl = row.IsNull("custnotesfl") ? string.Empty : row.Field<string>("custnotesfl");
         entity.invdt = row.Field<DateTime?>("invdt");
         entity.transcddesc = row.IsNull("transcddesc") ? string.Empty : row.Field<string>("transcddesc");
         entity.statustypedesc = row.IsNull("statustypedesc") ? string.Empty : row.Field<string>("statustypedesc");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.raretid = row.Field<byte[]>("raretid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArelearetresults(ref DataRow row, Arelearetresults entity)
      {
         row.SetField("invno", entity.invno);
         row.SetField("invsuf", entity.invsuf);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("seqno", entity.seqno);
         row.SetField("custno", entity.custno);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("invdt", entity.invdt);
         row.SetField("transcddesc", entity.transcddesc);
         row.SetField("statustypedesc", entity.statustypedesc);
         row.SetField("amount", entity.amount);
         row.SetField("refer", entity.refer);
         row.SetField("raretid", entity.raretid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
