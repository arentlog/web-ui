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

namespace Infor.Sxe.PO.Data.Models.Pdspoorderlookup
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoorderlookup.Poorderlookupresults")]
   public partial class Poorderlookupresults : ModelBase, IUserFields
   {
      public int pono { get; set; }
      public int posuf { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendnotesfl { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string stagecdword { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public DateTime? orderdt { get; set; }
      public DateTime? receiptdt { get; set; }
      [StringValidationAttribute]
      public string receiverno { get; set; }
      [StringValidationAttribute]
      public string approvty { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user3 { get; set; }
      [StringValidationAttribute]
      public string user4 { get; set; }
      [StringValidationAttribute]
      public string user5 { get; set; }
      public decimal? user6 { get; set; }
      public decimal? user7 { get; set; }
      public DateTime? user8 { get; set; }
      public DateTime? user9 { get; set; }
      [StringValidationAttribute]
      public string rowidPoeh { get; set; }


      public static Poorderlookupresults BuildPoorderlookupresultsFromRow(DataRow row)
      {
         Poorderlookupresults entity = new Poorderlookupresults();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendnotesfl = row.IsNull("vendnotesfl") ? string.Empty : row.Field<string>("vendnotesfl");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.stagecdword = row.IsNull("stagecdword") ? string.Empty : row.Field<string>("stagecdword");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.orderdt = row.Field<DateTime?>("orderdt");
         entity.receiptdt = row.Field<DateTime?>("receiptdt");
         entity.receiverno = row.IsNull("receiverno") ? string.Empty : row.Field<string>("receiverno");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowidPoeh = row.Field<byte[]>("rowid-poeh").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoorderlookupresults(ref DataRow row, Poorderlookupresults entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendnotesfl", entity.vendnotesfl);
         row.SetField("refer", entity.refer);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("stagecdword", entity.stagecdword);
         row.SetField("transtype", entity.transtype);
         row.SetField("orderdt", entity.orderdt);
         row.SetField("receiptdt", entity.receiptdt);
         row.SetField("receiverno", entity.receiverno);
         row.SetField("approvty", entity.approvty);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("rowid-poeh", entity.rowidPoeh.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591
