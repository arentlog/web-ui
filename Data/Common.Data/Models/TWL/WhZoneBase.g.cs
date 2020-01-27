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
   /// All warehouse zones
   /// </summary>
   
   public partial class WhZoneBase: ModelBase
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
      /// Pick Sequence
      /// </summary>
      [Key,Order]
      public int pickSequence { get; set; }

      /// <summary>
      /// Warehouse Zone
      /// </summary>
      [StringValidationAttribute]
      public string whZone { get; set; }

      /// <summary>
      /// First Aisle
      /// </summary>
      public int firstAisle { get; set; }

      /// <summary>
      /// Last Aisle
      /// </summary>
      public int lastAisle { get; set; }

      /// <summary>
      /// Zone Description
      /// </summary>
      [StringValidationAttribute]
      public string zoneDesc { get; set; }

      /// <summary>
      /// Zone Type
      /// </summary>
      [StringValidationAttribute]
      public string zoneType { get; set; }

      /// <summary>
      /// Control Pick Area
      /// </summary>
      [StringValidationAttribute]
      public string controlPickArea { get; set; }

      /// <summary>
      /// Carousel Type
      /// </summary>
      [StringValidationAttribute]
      public string carouselType { get; set; }

      /// <summary>
      /// Allow Put-Away
      /// </summary>
      public bool allowPutaway { get; set; }

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
      /// EOD Cycle
      /// </summary>
      public bool allowEodCycle { get; set; }

      /// <summary>
      /// Seq
      /// </summary>
      public int putawaySequence { get; set; }

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
      /// Allow Picking
      /// </summary>
      public bool allowPicking { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildWhZoneBaseFromRow<T>(DataRow row) where T:WhZoneBase, new()
      {
         T entity = new T();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.whZone = row.IsNull("wh_zone") ? string.Empty : row.Field<string>("wh_zone");
         entity.firstAisle = row.IsNull("first_aisle") ? 0 : row.Field<int>("first_aisle");
         entity.lastAisle = row.IsNull("last_aisle") ? 0 : row.Field<int>("last_aisle");
         entity.zoneDesc = row.IsNull("zone_desc") ? string.Empty : row.Field<string>("zone_desc");
         entity.zoneType = row.IsNull("zone_type") ? string.Empty : row.Field<string>("zone_type");
         entity.controlPickArea = row.IsNull("control_pick_area") ? string.Empty : row.Field<string>("control_pick_area");
         entity.pickSequence = row.IsNull("pick_sequence") ? 0 : row.Field<int>("pick_sequence");
         entity.carouselType = row.IsNull("carousel_type") ? string.Empty : row.Field<string>("carousel_type");
         entity.allowPutaway = row.Field<bool>("allow_putaway");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.allowEodCycle = row.Field<bool>("allow_eod_cycle");
         entity.putawaySequence = row.IsNull("putaway_sequence") ? 0 : row.Field<int>("putaway_sequence");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.allowPicking = row.Field<bool>("allow_picking");
         entity.rowID = row.Field<byte[]>("wh_zoneRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWhZoneBase(ref DataRow row, WhZoneBase entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("wh_zone", entity.whZone);
         row.SetField("first_aisle", entity.firstAisle);
         row.SetField("last_aisle", entity.lastAisle);
         row.SetField("zone_desc", entity.zoneDesc);
         row.SetField("zone_type", entity.zoneType);
         row.SetField("control_pick_area", entity.controlPickArea);
         row.SetField("pick_sequence", entity.pickSequence);
         row.SetField("carousel_type", entity.carouselType);
         row.SetField("allow_putaway", entity.allowPutaway);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("allow_eod_cycle", entity.allowEodCycle);
         row.SetField("putaway_sequence", entity.putawaySequence);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("allow_picking", entity.allowPicking);
         row.SetField("wh_zoneRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, WhZoneBase entity)
      {
         row.SetField("coNum", entity.coNum);
         row.SetField("whNum", entity.whNum);
         row.SetField("pickSequence", entity.pickSequence);
         row.SetField("wh_zoneRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	