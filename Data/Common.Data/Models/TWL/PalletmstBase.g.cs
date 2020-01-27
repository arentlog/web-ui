//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 12700 $
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
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;
       
namespace Infor.Sxe.Common.Data.Models.TWL
{
   /// <summary>
   /// Pallets
   /// </summary>
   
   public partial class PalletmstBase: ModelBase
   {

      /// <summary>
      /// Company
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string coNum { get; set; }

      /// <summary>
      /// Warehouse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whNum { get; set; }

      /// <summary>
      /// Pallet Id
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string palletId { get; set; }

      /// <summary>
      /// Pallet Number
      /// </summary>
      public int palletNum { get; set; }

      /// <summary>
      /// Tracking ID
      /// </summary>
      [StringValidationAttribute]
      public string trackingId { get; set; }

      /// <summary>
      /// Warehouse Zone
      /// </summary>
      [StringValidationAttribute]
      public string whZone { get; set; }

      /// <summary>
      /// Skid Full
      /// </summary>
      public bool full { get; set; }

      /// <summary>
      /// Pallet Type
      /// </summary>
      [StringValidationAttribute]
      public string palletType { get; set; }

      /// <summary>
      /// Cart ID
      /// </summary>
      [StringValidationAttribute]
      public string cartId { get; set; }

      /// <summary>
      /// Cart Bin
      /// </summary>
      [StringValidationAttribute]
      public string cartBin { get; set; }

      /// <summary>
      /// custom_data1
      /// </summary>
      [StringValidationAttribute]
      public string customData1 { get; set; }
      [StringValidationAttribute]
      public string customData2 { get; set; }
      [StringValidationAttribute]
      public string customData3 { get; set; }
      [StringValidationAttribute]
      public string customData4 { get; set; }
      [StringValidationAttribute]
      public string customData5 { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      [StringValidationAttribute]
      public string rowStatus { get; set; }

      /// <summary>
      /// Carrier ID
      /// </summary>
      [StringValidationAttribute]
      public string carrierId { get; set; }

      /// <summary>
      /// Customer Code
      /// </summary>
      [StringValidationAttribute]
      public string custCode { get; set; }

      /// <summary>
      /// trans_user
      /// </summary>
      [StringValidationAttribute]
      public string transUser { get; set; }

      /// <summary>
      /// trans_date
      /// </summary>
      [StringValidationAttribute]
      public string transDate { get; set; }

      /// <summary>
      /// trans_proc
      /// </summary>
      [StringValidationAttribute]
      public string transProc { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildPalletmstBaseFromRow<T>(DataRow row) where T:PalletmstBase, new()
      {
         T entity = new T();
         entity.palletNum = row.IsNull("pallet_num") ? 0 : row.Field<int>("pallet_num");
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.trackingId = row.IsNull("tracking_id") ? string.Empty : row.Field<string>("tracking_id");
         entity.whZone = row.IsNull("wh_zone") ? string.Empty : row.Field<string>("wh_zone");
         entity.full = row.Field<bool>("full");
         entity.palletType = row.IsNull("pallet_type") ? string.Empty : row.Field<string>("pallet_type");
         entity.cartId = row.IsNull("cart_id") ? string.Empty : row.Field<string>("cart_id");
         entity.cartBin = row.IsNull("cart_bin") ? string.Empty : row.Field<string>("cart_bin");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.rowStatus = row.IsNull("row_status") ? string.Empty : row.Field<string>("row_status");
         entity.carrierId = row.IsNull("carrier_id") ? string.Empty : row.Field<string>("carrier_id");
         entity.custCode = row.IsNull("cust_code") ? string.Empty : row.Field<string>("cust_code");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.rowID = row.Field<byte[]>("palletmstRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPalletmstBase(ref DataRow row, PalletmstBase entity)
      {
         row.SetField("pallet_num", entity.palletNum);
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("tracking_id", entity.trackingId);
         row.SetField("wh_zone", entity.whZone);
         row.SetField("full", entity.full);
         row.SetField("pallet_type", entity.palletType);
         row.SetField("cart_id", entity.cartId);
         row.SetField("cart_bin", entity.cartBin);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("carrier_id", entity.carrierId);
         row.SetField("cust_code", entity.custCode);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("palletmstRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PalletmstBase entity)
      {
         row.SetField("coNum", entity.coNum);
         row.SetField("whNum", entity.whNum);
         row.SetField("palletId", entity.palletId);
         row.SetField("palletmstRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	