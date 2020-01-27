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
   /// Has information about production stages
   /// </summary>
   
   public partial class ProdStgMstBase: ModelBase
   {

      /// <summary>
      /// Id
      /// </summary>
      [Key,Order]
      public int id { get; set; }

      /// <summary>
      /// Company
      /// </summary>
      [StringValidationAttribute]
      public string coNum { get; set; }

      /// <summary>
      /// Warehouse
      /// </summary>
      [StringValidationAttribute]
      public string whNum { get; set; }

      /// <summary>
      /// Department Number
      /// </summary>
      public int deptNum { get; set; }

      /// <summary>
      /// Name
      /// </summary>
      [StringValidationAttribute]
      public string name { get; set; }

      /// <summary>
      /// Promise Date
      /// </summary>
      [StringValidationAttribute]
      public string dateTime { get; set; }

      /// <summary>
      /// Staging Status
      /// </summary>
      [StringValidationAttribute]
      public string stagingStatus { get; set; }

      /// <summary>
      /// Allocated
      /// </summary>
      public bool allocationStatus { get; set; }

      /// <summary>
      /// Type
      /// </summary>
      [StringValidationAttribute]
      public string typeId { get; set; }

      /// <summary>
      /// Wave
      /// </summary>
      public int batch { get; set; }

      /// <summary>
      /// Order Line
      /// </summary>
      public int orderLine { get; set; }

      /// <summary>
      /// Kit Build Type
      /// </summary>
      [StringValidationAttribute]
      public string kitBuildType { get; set; }

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
      /// wo_done
      /// </summary>
      public bool woDone { get; set; }

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
      public static T BuildProdStgMstBaseFromRow<T>(DataRow row) where T:ProdStgMstBase, new()
      {
         T entity = new T();
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.deptNum = row.IsNull("dept_num") ? 0 : row.Field<int>("dept_num");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.dateTime = row.IsNull("date_time") ? string.Empty : row.Field<string>("date_time");
         entity.stagingStatus = row.IsNull("staging_status") ? string.Empty : row.Field<string>("staging_status");
         entity.allocationStatus = row.Field<bool>("allocation_status");
         entity.typeId = row.IsNull("type_id") ? string.Empty : row.Field<string>("type_id");
         entity.batch = row.IsNull("batch") ? 0 : row.Field<int>("batch");
         entity.orderLine = row.IsNull("order_line") ? 0 : row.Field<int>("order_line");
         entity.kitBuildType = row.IsNull("kit_build_type") ? string.Empty : row.Field<string>("kit_build_type");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.woDone = row.Field<bool>("wo_done");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.rowID = row.Field<byte[]>("prod_stg_mstRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromProdStgMstBase(ref DataRow row, ProdStgMstBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("dept_num", entity.deptNum);
         row.SetField("name", entity.name);
         row.SetField("date_time", entity.dateTime);
         row.SetField("staging_status", entity.stagingStatus);
         row.SetField("allocation_status", entity.allocationStatus);
         row.SetField("type_id", entity.typeId);
         row.SetField("batch", entity.batch);
         row.SetField("order_line", entity.orderLine);
         row.SetField("kit_build_type", entity.kitBuildType);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("wo_done", entity.woDone);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("prod_stg_mstRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, ProdStgMstBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("prod_stg_mstRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	