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
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtrrarreptlist.Wtrrarreptlistcriteria")]
   public partial class Wtrrarreptlistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string fromwhse { get; set; }
      [StringValidationAttribute]
      public string towhse { get; set; }
      public int tocono { get; set; }
      [StringValidationAttribute]
      public string sort1 { get; set; }
      [StringValidationAttribute]
      public string sort2 { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtrrarreptlistcriteria BuildWtrrarreptlistcriteriaFromRow(DataRow row)
      {
         Wtrrarreptlistcriteria entity = new Wtrrarreptlistcriteria();
         entity.fromwhse = row.IsNull("fromwhse") ? string.Empty : row.Field<string>("fromwhse");
         entity.towhse = row.IsNull("towhse") ? string.Empty : row.Field<string>("towhse");
         entity.tocono = row.IsNull("tocono") ? 0 : row.Field<int>("tocono");
         entity.sort1 = row.IsNull("sort1") ? string.Empty : row.Field<string>("sort1");
         entity.sort2 = row.IsNull("sort2") ? string.Empty : row.Field<string>("sort2");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtrrarreptlistcriteria(ref DataRow row, Wtrrarreptlistcriteria entity)
      {
         row.SetField("fromwhse", entity.fromwhse);
         row.SetField("towhse", entity.towhse);
         row.SetField("tocono", entity.tocono);
         row.SetField("sort1", entity.sort1);
         row.SetField("sort2", entity.sort2);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
