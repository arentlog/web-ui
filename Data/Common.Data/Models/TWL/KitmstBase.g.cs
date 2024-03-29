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
   /// Table contains items which make up a kit and their quantities
   /// </summary>
   
   public partial class KitmstBase: ModelBase
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
      /// Item Number
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string kitNum { get; set; }

      /// <summary>
      /// Kit Id
      /// </summary>
      public int id { get; set; }

      /// <summary>
      /// Kit Type
      /// </summary>
      public bool preBuilt { get; set; }

      /// <summary>
      /// Assembly Required
      /// </summary>
      public bool assemblyRequired { get; set; }

      /// <summary>
      /// Assembly instructions
      /// </summary>
      [StringValidationAttribute]
      public string assemblyInstructions { get; set; }

      /// <summary>
      /// Department Number
      /// </summary>
      public int deptNum { get; set; }

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
      /// Active
      /// </summary>
      public bool rowStatus { get; set; }

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
      public static T BuildKitmstBaseFromRow<T>(DataRow row) where T:KitmstBase, new()
      {
         T entity = new T();
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.kitNum = row.IsNull("kit_num") ? string.Empty : row.Field<string>("kit_num");
         entity.preBuilt = row.Field<bool>("pre_built");
         entity.assemblyRequired = row.Field<bool>("assembly_required");
         entity.assemblyInstructions = row.IsNull("assembly_instructions") ? string.Empty : row.Field<string>("assembly_instructions");
         entity.deptNum = row.IsNull("dept_num") ? 0 : row.Field<int>("dept_num");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.rowStatus = row.Field<bool>("row_status");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.rowID = row.Field<byte[]>("kitmstRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKitmstBase(ref DataRow row, KitmstBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("kit_num", entity.kitNum);
         row.SetField("pre_built", entity.preBuilt);
         row.SetField("assembly_required", entity.assemblyRequired);
         row.SetField("assembly_instructions", entity.assemblyInstructions);
         row.SetField("dept_num", entity.deptNum);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("kitmstRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, KitmstBase entity)
      {
         row.SetField("coNum", entity.coNum);
         row.SetField("whNum", entity.whNum);
         row.SetField("kitNum", entity.kitNum);
         row.SetField("kitmstRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	