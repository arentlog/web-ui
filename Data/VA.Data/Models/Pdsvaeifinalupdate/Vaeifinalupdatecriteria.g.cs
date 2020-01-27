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

namespace Infor.Sxe.VA.Data.Models.Pdsvaeifinalupdate
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaeifinalupdate.Vaeifinalupdatecriteria")]
   public partial class Vaeifinalupdatecriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      public int period { get; set; }
      public DateTime? postdt { get; set; }
      public bool stkadjfl { get; set; }
      public bool stkadjenablefl { get; set; }
      public bool routefl { get; set; }
      [StringValidationAttribute]
      public string receiptsprinter { get; set; }
      public bool receiptsenabled { get; set; }
      [StringValidationAttribute]
      public string receiptsptype { get; set; }
      [StringValidationAttribute]
      public string pickticketprinter { get; set; }
      public bool pickticketenabled { get; set; }
      [StringValidationAttribute]
      public string pickticketptype { get; set; }
      public int totalcount { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaeifinalupdatecriteria BuildVaeifinalupdatecriteriaFromRow(DataRow row)
      {
         Vaeifinalupdatecriteria entity = new Vaeifinalupdatecriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.period = row.IsNull("period") ? 0 : row.Field<int>("period");
         entity.postdt = row.Field<DateTime?>("postdt");
         entity.stkadjfl = row.Field<bool>("stkadjfl");
         entity.stkadjenablefl = row.Field<bool>("stkadjenablefl");
         entity.routefl = row.Field<bool>("routefl");
         entity.receiptsprinter = row.IsNull("receiptsprinter") ? string.Empty : row.Field<string>("receiptsprinter");
         entity.receiptsenabled = row.Field<bool>("receiptsenabled");
         entity.receiptsptype = row.IsNull("receiptsptype") ? string.Empty : row.Field<string>("receiptsptype");
         entity.pickticketprinter = row.IsNull("pickticketprinter") ? string.Empty : row.Field<string>("pickticketprinter");
         entity.pickticketenabled = row.Field<bool>("pickticketenabled");
         entity.pickticketptype = row.IsNull("pickticketptype") ? string.Empty : row.Field<string>("pickticketptype");
         entity.totalcount = row.IsNull("totalcount") ? 0 : row.Field<int>("totalcount");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaeifinalupdatecriteria(ref DataRow row, Vaeifinalupdatecriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("period", entity.period);
         row.SetField("postdt", entity.postdt);
         row.SetField("stkadjfl", entity.stkadjfl);
         row.SetField("stkadjenablefl", entity.stkadjenablefl);
         row.SetField("routefl", entity.routefl);
         row.SetField("receiptsprinter", entity.receiptsprinter);
         row.SetField("receiptsenabled", entity.receiptsenabled);
         row.SetField("receiptsptype", entity.receiptsptype);
         row.SetField("pickticketprinter", entity.pickticketprinter);
         row.SetField("pickticketenabled", entity.pickticketenabled);
         row.SetField("pickticketptype", entity.pickticketptype);
         row.SetField("totalcount", entity.totalcount);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
