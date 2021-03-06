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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarreptlist
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarreptlist.Porrarreptlistcriteria")]
   public partial class Porrarreptlistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string buyer { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string frtconsolidation { get; set; }
      [StringValidationAttribute]
      public string sort1 { get; set; }
      [StringValidationAttribute]
      public string sort2 { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Porrarreptlistcriteria BuildPorrarreptlistcriteriaFromRow(DataRow row)
      {
         Porrarreptlistcriteria entity = new Porrarreptlistcriteria();
         entity.buyer = row.IsNull("buyer") ? string.Empty : row.Field<string>("buyer");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.frtconsolidation = row.IsNull("frtconsolidation") ? string.Empty : row.Field<string>("frtconsolidation");
         entity.sort1 = row.IsNull("sort1") ? string.Empty : row.Field<string>("sort1");
         entity.sort2 = row.IsNull("sort2") ? string.Empty : row.Field<string>("sort2");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarreptlistcriteria(ref DataRow row, Porrarreptlistcriteria entity)
      {
         row.SetField("buyer", entity.buyer);
         row.SetField("whse", entity.whse);
         row.SetField("vendno", entity.vendno);
         row.SetField("frtconsolidation", entity.frtconsolidation);
         row.SetField("sort1", entity.sort1);
         row.SetField("sort2", entity.sort2);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
