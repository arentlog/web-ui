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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpoea
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpoea.Loadpoearesults")]
   public partial class Loadpoearesults : ModelBase
   {
      public bool updatefl { get; set; }
      public int pono { get; set; }
      public int posuf { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string stagecdx { get; set; }
      public DateTime? ackdt { get; set; }
      public DateTime? oackdt { get; set; }
      [StringValidationAttribute]
      public string acktype { get; set; }
      [StringValidationAttribute]
      public string oacktype { get; set; }
      [StringValidationAttribute]
      public string ackrsn { get; set; }
      [StringValidationAttribute]
      public string oackrsn { get; set; }
      [StringValidationAttribute]
      public string ackoper { get; set; }
      [StringValidationAttribute]
      public string oackoper { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string buyer { get; set; }
      public DateTime? enterdt { get; set; }
      public DateTime? printeddt { get; set; }
      [StringValidationAttribute]
      public string rowidPoeh { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadpoearesults BuildLoadpoearesultsFromRow(DataRow row)
      {
         Loadpoearesults entity = new Loadpoearesults();
         entity.updatefl = row.Field<bool>("updatefl");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.stagecdx = row.IsNull("stagecdx") ? string.Empty : row.Field<string>("stagecdx");
         entity.ackdt = row.Field<DateTime?>("ackdt");
         entity.oackdt = row.Field<DateTime?>("oackdt");
         entity.acktype = row.IsNull("acktype") ? string.Empty : row.Field<string>("acktype");
         entity.oacktype = row.IsNull("oacktype") ? string.Empty : row.Field<string>("oacktype");
         entity.ackrsn = row.IsNull("ackrsn") ? string.Empty : row.Field<string>("ackrsn");
         entity.oackrsn = row.IsNull("oackrsn") ? string.Empty : row.Field<string>("oackrsn");
         entity.ackoper = row.IsNull("ackoper") ? string.Empty : row.Field<string>("ackoper");
         entity.oackoper = row.IsNull("oackoper") ? string.Empty : row.Field<string>("oackoper");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.buyer = row.IsNull("buyer") ? string.Empty : row.Field<string>("buyer");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.printeddt = row.Field<DateTime?>("printeddt");
         entity.rowidPoeh = row.Field<byte[]>("rowid-poeh").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpoearesults(ref DataRow row, Loadpoearesults entity)
      {
         row.SetField("updatefl", entity.updatefl);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("stagecdx", entity.stagecdx);
         row.SetField("ackdt", entity.ackdt);
         row.SetField("oackdt", entity.oackdt);
         row.SetField("acktype", entity.acktype);
         row.SetField("oacktype", entity.oacktype);
         row.SetField("ackrsn", entity.ackrsn);
         row.SetField("oackrsn", entity.oackrsn);
         row.SetField("ackoper", entity.ackoper);
         row.SetField("oackoper", entity.oackoper);
         row.SetField("vendno", entity.vendno);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("whse", entity.whse);
         row.SetField("buyer", entity.buyer);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("printeddt", entity.printeddt);
         row.SetField("rowid-poeh", entity.rowidPoeh.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
