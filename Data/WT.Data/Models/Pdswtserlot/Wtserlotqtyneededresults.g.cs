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

namespace Infor.Sxe.WT.Data.Models.Pdswtserlot
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtserlot.Wtserlotqtyneededresults")]
   public partial class Wtserlotqtyneededresults : ModelBase
   {
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      public int lineno { get; set; }
      public decimal qtyneeded { get; set; }
      [StringValidationAttribute]
      public string resultmessage { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtserlotqtyneededresults BuildWtserlotqtyneededresultsFromRow(DataRow row)
      {
         Wtserlotqtyneededresults entity = new Wtserlotqtyneededresults();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.qtyneeded = row.IsNull("qtyneeded") ? decimal.Zero : row.Field<decimal>("qtyneeded");
         entity.resultmessage = row.IsNull("resultmessage") ? string.Empty : row.Field<string>("resultmessage");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtserlotqtyneededresults(ref DataRow row, Wtserlotqtyneededresults entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("qtyneeded", entity.qtyneeded);
         row.SetField("resultmessage", entity.resultmessage);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
