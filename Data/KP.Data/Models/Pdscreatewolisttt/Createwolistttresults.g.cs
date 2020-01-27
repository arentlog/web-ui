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

namespace Infor.Sxe.KP.Data.Models.Pdscreatewolisttt
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdscreatewolisttt.Createwolistttresults")]
   public partial class Createwolistttresults : ModelBase
   {
      public int wono { get; set; }
      public int wosuf { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string prodnotes { get; set; }
      public DateTime? enterdt { get; set; }
      [StringValidationAttribute]
      public string rrarinit { get; set; }
      public decimal qtyord { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string stagedesc { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public int verno { get; set; }
      public bool msdsfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Createwolistttresults BuildCreatewolistttresultsFromRow(DataRow row)
      {
         Createwolistttresults entity = new Createwolistttresults();
         entity.wono = row.IsNull("wono") ? 0 : row.Field<int>("wono");
         entity.wosuf = row.IsNull("wosuf") ? 0 : row.Field<int>("wosuf");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.prodnotes = row.IsNull("prodnotes") ? string.Empty : row.Field<string>("prodnotes");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.rrarinit = row.IsNull("rrarinit") ? string.Empty : row.Field<string>("rrarinit");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.stagedesc = row.IsNull("stagedesc") ? string.Empty : row.Field<string>("stagedesc");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCreatewolistttresults(ref DataRow row, Createwolistttresults entity)
      {
         row.SetField("wono", entity.wono);
         row.SetField("wosuf", entity.wosuf);
         row.SetField("seqno", entity.seqno);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("whse", entity.whse);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("prodnotes", entity.prodnotes);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("rrarinit", entity.rrarinit);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("unit", entity.unit);
         row.SetField("stagedesc", entity.stagedesc);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("verno", entity.verno);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591