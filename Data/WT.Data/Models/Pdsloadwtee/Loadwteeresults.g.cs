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

namespace Infor.Sxe.WT.Data.Models.Pdsloadwtee
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdsloadwtee.Loadwteeresults")]
   public partial class Loadwteeresults : ModelBase
   {
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      [StringValidationAttribute]
      public string wtnox { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string stagecdx { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public DateTime? orderdt { get; set; }
      public DateTime? receiptdt { get; set; }
      public DateTime? duedt { get; set; }
      [StringValidationAttribute]
      public string shipfmwhse { get; set; }
      [StringValidationAttribute]
      public string shipfmname { get; set; }
      [StringValidationAttribute]
      public string shiptowhse { get; set; }
      [StringValidationAttribute]
      public string shiptoname { get; set; }
      public DateTime? sortdt1 { get; set; }
      public DateTime? sortdt2 { get; set; }
      [StringValidationAttribute]
      public string sortfld { get; set; }
      public int amounti { get; set; }


      public static Loadwteeresults BuildLoadwteeresultsFromRow(DataRow row)
      {
         Loadwteeresults entity = new Loadwteeresults();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.wtnox = row.IsNull("wtnox") ? string.Empty : row.Field<string>("wtnox");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.stagecdx = row.IsNull("stagecdx") ? string.Empty : row.Field<string>("stagecdx");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.orderdt = row.Field<DateTime?>("orderdt");
         entity.receiptdt = row.Field<DateTime?>("receiptdt");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.shipfmwhse = row.IsNull("shipfmwhse") ? string.Empty : row.Field<string>("shipfmwhse");
         entity.shipfmname = row.IsNull("shipfmname") ? string.Empty : row.Field<string>("shipfmname");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.shiptoname = row.IsNull("shiptoname") ? string.Empty : row.Field<string>("shiptoname");
         entity.sortdt1 = row.Field<DateTime?>("sortdt1");
         entity.sortdt2 = row.Field<DateTime?>("sortdt2");
         entity.sortfld = row.IsNull("sortfld") ? string.Empty : row.Field<string>("sortfld");
         entity.amounti = row.IsNull("amounti") ? 0 : row.Field<int>("amounti");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadwteeresults(ref DataRow row, Loadwteeresults entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("wtnox", entity.wtnox);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("stagecdx", entity.stagecdx);
         row.SetField("transtype", entity.transtype);
         row.SetField("orderdt", entity.orderdt);
         row.SetField("receiptdt", entity.receiptdt);
         row.SetField("duedt", entity.duedt);
         row.SetField("shipfmwhse", entity.shipfmwhse);
         row.SetField("shipfmname", entity.shipfmname);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("shiptoname", entity.shiptoname);
         row.SetField("sortdt1", entity.sortdt1);
         row.SetField("sortdt2", entity.sortdt2);
         row.SetField("sortfld", entity.sortfld);
         row.SetField("amounti", entity.amounti);

      }
   
   }
}
#pragma warning restore 1591
