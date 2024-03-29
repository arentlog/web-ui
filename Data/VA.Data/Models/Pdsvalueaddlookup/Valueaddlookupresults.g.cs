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

namespace Infor.Sxe.VA.Data.Models.Pdsvalueaddlookup
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvalueaddlookup.Valueaddlookupresults")]
   public partial class Valueaddlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      public int vano { get; set; }
      public int vasuf { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      public decimal qtyord { get; set; }
      public DateTime? enterdt { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string stagecdword { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      [StringValidationAttribute]
      public string proddescrip { get; set; }
      [StringValidationAttribute]
      public string icspnotesfl { get; set; }
      public bool serialfl { get; set; }
      public bool lotfl { get; set; }
      public bool wmfl { get; set; }
      [StringValidationAttribute]
      public string vaehRowid { get; set; }


      public static Valueaddlookupresults BuildValueaddlookupresultsFromRow(DataRow row)
      {
         Valueaddlookupresults entity = new Valueaddlookupresults();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.vano = row.IsNull("vano") ? 0 : row.Field<int>("vano");
         entity.vasuf = row.IsNull("vasuf") ? 0 : row.Field<int>("vasuf");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.stagecdword = row.IsNull("stagecdword") ? string.Empty : row.Field<string>("stagecdword");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.proddescrip = row.IsNull("proddescrip") ? string.Empty : row.Field<string>("proddescrip");
         entity.icspnotesfl = row.IsNull("icspnotesfl") ? string.Empty : row.Field<string>("icspnotesfl");
         entity.serialfl = row.Field<bool>("serialfl");
         entity.lotfl = row.Field<bool>("lotfl");
         entity.wmfl = row.Field<bool>("wmfl");
         entity.vaehRowid = row.Field<byte[]>("vaeh-rowid").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromValueaddlookupresults(ref DataRow row, Valueaddlookupresults entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("vano", entity.vano);
         row.SetField("vasuf", entity.vasuf);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("transtype", entity.transtype);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("stagecdword", entity.stagecdword);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("proddescrip", entity.proddescrip);
         row.SetField("icspnotesfl", entity.icspnotesfl);
         row.SetField("serialfl", entity.serialfl);
         row.SetField("lotfl", entity.lotfl);
         row.SetField("wmfl", entity.wmfl);
         row.SetField("vaeh-rowid", entity.vaehRowid.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591
