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

namespace Infor.Sxe.TWL.Data.Models.Pdszoneinventory
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdszoneinventory.Zoneinventory")]
   public partial class Zoneinventory : ModelBase
   {
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      public decimal totalQty { get; set; }
      [StringValidationAttribute]
      public string palletId { get; set; }
      [StringValidationAttribute]
      public string stockStat { get; set; }
      [StringValidationAttribute]
      public string dateTimeRec { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      public DateTime? dateExpiration { get; set; }
      public decimal caseQuantity { get; set; }
      public bool cycleFlag { get; set; }
      [StringValidationAttribute]
      public string binmstRowID { get; set; }
      [StringValidationAttribute]
      public string inventoryRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Zoneinventory BuildZoneinventoryFromRow(DataRow row)
      {
         Zoneinventory entity = new Zoneinventory();
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.totalQty = row.IsNull("total_qty") ? decimal.Zero : row.Field<decimal>("total_qty");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.stockStat = row.IsNull("stock_stat") ? string.Empty : row.Field<string>("stock_stat");
         entity.dateTimeRec = row.IsNull("date_time_rec") ? string.Empty : row.Field<string>("date_time_rec");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.dateExpiration = row.Field<DateTime?>("date_expiration");
         entity.caseQuantity = row.IsNull("case_quantity") ? decimal.Zero : row.Field<decimal>("case_quantity");
         entity.cycleFlag = row.Field<bool>("cycle_flag");
         entity.binmstRowID = row.Field<byte[]>("binmstRowID").ToStringEncoded();
         entity.inventoryRowID = row.Field<byte[]>("inventoryRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromZoneinventory(ref DataRow row, Zoneinventory entity)
      {
         row.SetField("bin_num", entity.binNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("total_qty", entity.totalQty);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("stock_stat", entity.stockStat);
         row.SetField("date_time_rec", entity.dateTimeRec);
         row.SetField("lot", entity.lot);
         row.SetField("date_expiration", entity.dateExpiration);
         row.SetField("case_quantity", entity.caseQuantity);
         row.SetField("cycle_flag", entity.cycleFlag);
         row.SetField("binmstRowID", entity.binmstRowID.ToByteArray());
         row.SetField("inventoryRowID", entity.inventoryRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
