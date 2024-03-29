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

namespace Infor.Sxe.IC.Data.Models.Pdsicepequickcntentry
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicepequickcntentry.Icepequickcntentry")]
   public partial class Icepequickcntentry : ModelBase
   {
      [StringValidationAttribute]
      public string binloc { get; set; }
      [StringValidationAttribute]
      public string cntoper { get; set; }
      public bool createfl { get; set; }
      public bool entfl { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public decimal qtycnt { get; set; }
      public decimal qtyexp { get; set; }
      [StringValidationAttribute]
      public string rectype { get; set; }
      public int runno { get; set; }
      public int ticketno { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public int uticketno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public bool wmfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icepequickcntentry BuildIcepequickcntentryFromRow(DataRow row)
      {
         Icepequickcntentry entity = new Icepequickcntentry();
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.cntoper = row.IsNull("cntoper") ? string.Empty : row.Field<string>("cntoper");
         entity.createfl = row.Field<bool>("createfl");
         entity.entfl = row.Field<bool>("entfl");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.qtycnt = row.IsNull("qtycnt") ? decimal.Zero : row.Field<decimal>("qtycnt");
         entity.qtyexp = row.IsNull("qtyexp") ? decimal.Zero : row.Field<decimal>("qtyexp");
         entity.rectype = row.IsNull("rectype") ? string.Empty : row.Field<string>("rectype");
         entity.runno = row.IsNull("runno") ? 0 : row.Field<int>("runno");
         entity.ticketno = row.IsNull("ticketno") ? 0 : row.Field<int>("ticketno");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.uticketno = row.IsNull("uticketno") ? 0 : row.Field<int>("uticketno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.wmfl = row.Field<bool>("wmfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcepequickcntentry(ref DataRow row, Icepequickcntentry entity)
      {
         row.SetField("binloc", entity.binloc);
         row.SetField("cntoper", entity.cntoper);
         row.SetField("createfl", entity.createfl);
         row.SetField("entfl", entity.entfl);
         row.SetField("prod", entity.prod);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("qtycnt", entity.qtycnt);
         row.SetField("qtyexp", entity.qtyexp);
         row.SetField("rectype", entity.rectype);
         row.SetField("runno", entity.runno);
         row.SetField("ticketno", entity.ticketno);
         row.SetField("unit", entity.unit);
         row.SetField("uticketno", entity.uticketno);
         row.SetField("whse", entity.whse);
         row.SetField("wmfl", entity.wmfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
