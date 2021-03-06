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

namespace Infor.Sxe.SA.Data.Models.Pdssaeievent
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaeievent.Saeieventresults")]
   public partial class Saeieventresults : ModelBase
   {
      [StringValidationAttribute]
      public string eventname { get; set; }
      public DateTime? eventdt { get; set; }
      [StringValidationAttribute]
      public string eventtm { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custname { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public decimal vendno { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string vendname { get; set; }
      [StringValidationAttribute]
      public string documentdata { get; set; }
      public int numberofactions { get; set; }
      public int docorderno { get; set; }
      public int docordersuf { get; set; }
      [StringValidationAttribute]
      public string docjobid { get; set; }
      [StringValidationAttribute]
      public string doctype { get; set; }
      [StringValidationAttribute]
      public string rowidEvent { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saeieventresults BuildSaeieventresultsFromRow(DataRow row)
      {
         Saeieventresults entity = new Saeieventresults();
         entity.eventname = row.IsNull("eventname") ? string.Empty : row.Field<string>("eventname");
         entity.eventdt = row.Field<DateTime?>("eventdt");
         entity.eventtm = row.IsNull("eventtm") ? string.Empty : row.Field<string>("eventtm");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custname = row.IsNull("custname") ? string.Empty : row.Field<string>("custname");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.vendname = row.IsNull("vendname") ? string.Empty : row.Field<string>("vendname");
         entity.documentdata = row.IsNull("documentdata") ? string.Empty : row.Field<string>("documentdata");
         entity.numberofactions = row.IsNull("numberofactions") ? 0 : row.Field<int>("numberofactions");
         entity.docorderno = row.IsNull("docorderno") ? 0 : row.Field<int>("docorderno");
         entity.docordersuf = row.IsNull("docordersuf") ? 0 : row.Field<int>("docordersuf");
         entity.docjobid = row.IsNull("docjobid") ? string.Empty : row.Field<string>("docjobid");
         entity.doctype = row.IsNull("doctype") ? string.Empty : row.Field<string>("doctype");
         entity.rowidEvent = row.Field<byte[]>("rowid-event").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaeieventresults(ref DataRow row, Saeieventresults entity)
      {
         row.SetField("eventname", entity.eventname);
         row.SetField("eventdt", entity.eventdt);
         row.SetField("eventtm", entity.eventtm);
         row.SetField("whse", entity.whse);
         row.SetField("custno", entity.custno);
         row.SetField("custname", entity.custname);
         row.SetField("shipto", entity.shipto);
         row.SetField("vendno", entity.vendno);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("vendname", entity.vendname);
         row.SetField("documentdata", entity.documentdata);
         row.SetField("numberofactions", entity.numberofactions);
         row.SetField("docorderno", entity.docorderno);
         row.SetField("docordersuf", entity.docordersuf);
         row.SetField("docjobid", entity.docjobid);
         row.SetField("doctype", entity.doctype);
         row.SetField("rowid-event", entity.rowidEvent.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
