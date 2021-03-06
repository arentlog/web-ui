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

namespace Infor.Sxe.IC.Data.Models.Pdsicsefresults
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsefresults.Icsefresults")]
   public partial class Icsefresults : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prodnotesfl { get; set; }
      [StringValidationAttribute]
      public string lookupnm { get; set; }
      public DateTime? receiptdt { get; set; }
      public int seqno { get; set; }
      public bool availfl { get; set; }
      public decimal quantity { get; set; }
      public decimal prodcost { get; set; }
      public decimal addoncost { get; set; }
      [StringValidationAttribute]
      public string prccostperlbl { get; set; }
      [StringValidationAttribute]
      public string icsefrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsefresults BuildIcsefresultsFromRow(DataRow row)
      {
         Icsefresults entity = new Icsefresults();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prodnotesfl = row.IsNull("prodnotesfl") ? string.Empty : row.Field<string>("prodnotesfl");
         entity.lookupnm = row.IsNull("lookupnm") ? string.Empty : row.Field<string>("lookupnm");
         entity.receiptdt = row.Field<DateTime?>("receiptdt");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.availfl = row.Field<bool>("availfl");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.addoncost = row.IsNull("addoncost") ? decimal.Zero : row.Field<decimal>("addoncost");
         entity.prccostperlbl = row.IsNull("prccostperlbl") ? string.Empty : row.Field<string>("prccostperlbl");
         entity.icsefrowid = row.Field<byte[]>("icsefrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsefresults(ref DataRow row, Icsefresults entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("prodnotesfl", entity.prodnotesfl);
         row.SetField("lookupnm", entity.lookupnm);
         row.SetField("receiptdt", entity.receiptdt);
         row.SetField("seqno", entity.seqno);
         row.SetField("availfl", entity.availfl);
         row.SetField("quantity", entity.quantity);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("addoncost", entity.addoncost);
         row.SetField("prccostperlbl", entity.prccostperlbl);
         row.SetField("icsefrowid", entity.icsefrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
