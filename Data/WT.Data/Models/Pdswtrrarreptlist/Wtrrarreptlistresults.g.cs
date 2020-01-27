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

namespace Infor.Sxe.WT.Data.Models.Pdswtrrarreptlist
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtrrarreptlist.Wtrrarreptlistresults")]
   public partial class Wtrrarreptlistresults : ModelBase
   {
      public int reportno { get; set; }
      [StringValidationAttribute]
      public string shipfmwhse { get; set; }
      [StringValidationAttribute]
      public string shipfmname { get; set; }
      [StringValidationAttribute]
      public string shiptowhse { get; set; }
      [StringValidationAttribute]
      public string shiptoname { get; set; }
      public DateTime? duedt { get; set; }
      public DateTime? reqshipdt { get; set; }
      public int nolines { get; set; }
      public bool mergefl { get; set; }
      public int totsuper { get; set; }
      public int amounti { get; set; }
      public decimal totlineamtdec { get; set; }
      [StringValidationAttribute]
      public string rowidWterah { get; set; }
      public int seqno { get; set; }
      public bool rushfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtrrarreptlistresults BuildWtrrarreptlistresultsFromRow(DataRow row)
      {
         Wtrrarreptlistresults entity = new Wtrrarreptlistresults();
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.shipfmwhse = row.IsNull("shipfmwhse") ? string.Empty : row.Field<string>("shipfmwhse");
         entity.shipfmname = row.IsNull("shipfmname") ? string.Empty : row.Field<string>("shipfmname");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.shiptoname = row.IsNull("shiptoname") ? string.Empty : row.Field<string>("shiptoname");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.nolines = row.IsNull("nolines") ? 0 : row.Field<int>("nolines");
         entity.mergefl = row.Field<bool>("mergefl");
         entity.totsuper = row.IsNull("totsuper") ? 0 : row.Field<int>("totsuper");
         entity.amounti = row.IsNull("amounti") ? 0 : row.Field<int>("amounti");
         entity.totlineamtdec = row.IsNull("totlineamtdec") ? decimal.Zero : row.Field<decimal>("totlineamtdec");
         entity.rowidWterah = row.Field<byte[]>("rowid-wterah").ToStringEncoded();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtrrarreptlistresults(ref DataRow row, Wtrrarreptlistresults entity)
      {
         row.SetField("reportno", entity.reportno);
         row.SetField("shipfmwhse", entity.shipfmwhse);
         row.SetField("shipfmname", entity.shipfmname);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("shiptoname", entity.shiptoname);
         row.SetField("duedt", entity.duedt);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("nolines", entity.nolines);
         row.SetField("mergefl", entity.mergefl);
         row.SetField("totsuper", entity.totsuper);
         row.SetField("amounti", entity.amounti);
         row.SetField("totlineamtdec", entity.totlineamtdec);
         row.SetField("rowid-wterah", entity.rowidWterah.ToByteArray());
         row.SetField("seqno", entity.seqno);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591