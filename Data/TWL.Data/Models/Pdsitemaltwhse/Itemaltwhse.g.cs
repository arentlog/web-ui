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

namespace Infor.Sxe.TWL.Data.Models.Pdsitemaltwhse
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsitemaltwhse.Itemaltwhse")]
   public partial class Itemaltwhse : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      public decimal availQty { get; set; }
      public decimal resvQty { get; set; }
      public decimal unavQty { get; set; }
      public decimal totQty { get; set; }
      [StringValidationAttribute]
      public string itemaltwhseuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Itemaltwhse BuildItemaltwhseFromRow(DataRow row)
      {
         Itemaltwhse entity = new Itemaltwhse();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.availQty = row.IsNull("availQty") ? decimal.Zero : row.Field<decimal>("availQty");
         entity.resvQty = row.IsNull("resvQty") ? decimal.Zero : row.Field<decimal>("resvQty");
         entity.unavQty = row.IsNull("unavQty") ? decimal.Zero : row.Field<decimal>("unavQty");
         entity.totQty = row.IsNull("totQty") ? decimal.Zero : row.Field<decimal>("totQty");
         entity.itemaltwhseuserfield = row.IsNull("itemaltwhseuserfield") ? string.Empty : row.Field<string>("itemaltwhseuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromItemaltwhse(ref DataRow row, Itemaltwhse entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("availQty", entity.availQty);
         row.SetField("resvQty", entity.resvQty);
         row.SetField("unavQty", entity.unavQty);
         row.SetField("totQty", entity.totQty);
         row.SetField("itemaltwhseuserfield", entity.itemaltwhseuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
