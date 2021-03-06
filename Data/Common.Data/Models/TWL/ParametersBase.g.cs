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
   /// This table has parameters for system level (co_num eq 0, wh_num eq 0) and warehouse level (co_num ne 0, wh_num ne 0)  TWL will be installed with only the system level defaults set
   /// </summary>
   
   public partial class ParametersBase: ModelBase
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
      /// Warehouse Type
      /// </summary>
      [StringValidationAttribute]
      public string whType { get; set; }

      /// <summary>
      /// Pallet Id Flag
      /// </summary>
      [StringValidationAttribute]
      public string rcvPalletIdFlag { get; set; }

      /// <summary>
      /// Line Item Qty Check
      /// </summary>
      [StringValidationAttribute]
      public string rcvQtyCheck { get; set; }

      /// <summary>
      /// Back Orders Processing
      /// </summary>
      [StringValidationAttribute]
      public string rcvBackOrders { get; set; }

      /// <summary>
      /// RMA Prefix
      /// </summary>
      [StringValidationAttribute]
      public string rcvRmaPrefix { get; set; }

      /// <summary>
      /// Material Put Away
      /// </summary>
      [StringValidationAttribute]
      public string matPutAway { get; set; }

      /// <summary>
      /// Replenishment
      /// </summary>
      [StringValidationAttribute]
      public string matReplFlag { get; set; }

      /// <summary>
      /// Order Release Flag
      /// </summary>
      [StringValidationAttribute]
      public string picReleaseFlag { get; set; }

      /// <summary>
      /// Order Release Cutoff
      /// </summary>
      [StringValidationAttribute]
      public string picReleaseTime { get; set; }

      /// <summary>
      /// Large Orders To Hold
      /// </summary>
      public int picHoldLines { get; set; }

      /// <summary>
      /// pic_hold_types
      /// </summary>
      [StringValidationAttribute]
      public string picHoldTypes { get; set; }

      /// <summary>
      /// Print Pick Labels
      /// </summary>
      [StringValidationAttribute]
      public string picLabelFlag { get; set; }

      /// <summary>
      /// Pick From Dock
      /// </summary>
      [StringValidationAttribute]
      public string picFromDock { get; set; }

      /// <summary>
      /// Packing Type
      /// </summary>
      [StringValidationAttribute]
      public string pacType { get; set; }

      /// <summary>
      /// Packing List By
      /// </summary>
      [StringValidationAttribute]
      public string pacListFlag { get; set; }

      /// <summary>
      /// Hold to Complete
      /// </summary>
      [StringValidationAttribute]
      public string shpHoldFlag { get; set; }

      /// <summary>
      /// Allow Force Shipping
      /// </summary>
      [StringValidationAttribute]
      public string shpForceFlag { get; set; }

      /// <summary>
      /// Physical In Progress
      /// </summary>
      public bool physicalFlag { get; set; }

      /// <summary>
      /// Comments
      /// </summary>
      [StringValidationAttribute]
      public string comments { get; set; }

      /// <summary>
      /// Active
      /// </summary>
      public bool rowStatus { get; set; }

      /// <summary>
      /// Employee Number
      /// </summary>
      [StringValidationAttribute]
      public string empNum { get; set; }

      /// <summary>
      /// Display C.C.
      /// </summary>
      public bool displayCycleQty { get; set; }

      /// <summary>
      /// Display Qty
      /// </summary>
      public bool displayPhysQty { get; set; }

      /// <summary>
      /// C.C. Adj
      /// </summary>
      public bool cycleAdj { get; set; }

      /// <summary>
      /// Phys. Adj
      /// </summary>
      public bool physAdj { get; set; }

      /// <summary>
      /// CC Adj In
      /// </summary>
      [StringValidationAttribute]
      public string cycleAdjCodeIn { get; set; }

      /// <summary>
      /// CC Adj Out
      /// </summary>
      [StringValidationAttribute]
      public string cycleAdjCodeOut { get; set; }

      /// <summary>
      /// Phys Adj In
      /// </summary>
      [StringValidationAttribute]
      public string physAdjCodeIn { get; set; }

      /// <summary>
      /// Phys Adj Out
      /// </summary>
      [StringValidationAttribute]
      public string physAdjCodeOut { get; set; }

      /// <summary>
      /// Time Stamp
      /// </summary>
      [StringValidationAttribute]
      public string dateTime { get; set; }

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
      /// Label Type
      /// </summary>
      [StringValidationAttribute]
      public string labelPrintType { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildParametersBaseFromRow<T>(DataRow row) where T:ParametersBase, new()
      {
         T entity = new T();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.whType = row.IsNull("wh_type") ? string.Empty : row.Field<string>("wh_type");
         entity.rcvPalletIdFlag = row.IsNull("rcv_pallet_id_flag") ? string.Empty : row.Field<string>("rcv_pallet_id_flag");
         entity.rcvQtyCheck = row.IsNull("rcv_qty_check") ? string.Empty : row.Field<string>("rcv_qty_check");
         entity.rcvBackOrders = row.IsNull("rcv_back_orders") ? string.Empty : row.Field<string>("rcv_back_orders");
         entity.rcvRmaPrefix = row.IsNull("rcv_rma_prefix") ? string.Empty : row.Field<string>("rcv_rma_prefix");
         entity.matPutAway = row.IsNull("mat_put_away") ? string.Empty : row.Field<string>("mat_put_away");
         entity.matReplFlag = row.IsNull("mat_repl_flag") ? string.Empty : row.Field<string>("mat_repl_flag");
         entity.picReleaseFlag = row.IsNull("pic_release_flag") ? string.Empty : row.Field<string>("pic_release_flag");
         entity.picReleaseTime = row.IsNull("pic_release_time") ? string.Empty : row.Field<string>("pic_release_time");
         entity.picHoldLines = row.IsNull("pic_hold_lines") ? 0 : row.Field<int>("pic_hold_lines");
         entity.picHoldTypes = row.IsNull("pic_hold_types") ? string.Empty : row.Field<string>("pic_hold_types");
         entity.picLabelFlag = row.IsNull("pic_label_flag") ? string.Empty : row.Field<string>("pic_label_flag");
         entity.picFromDock = row.IsNull("pic_from_dock") ? string.Empty : row.Field<string>("pic_from_dock");
         entity.pacType = row.IsNull("pac_type") ? string.Empty : row.Field<string>("pac_type");
         entity.pacListFlag = row.IsNull("pac_list_flag") ? string.Empty : row.Field<string>("pac_list_flag");
         entity.shpHoldFlag = row.IsNull("shp_hold_flag") ? string.Empty : row.Field<string>("shp_hold_flag");
         entity.shpForceFlag = row.IsNull("shp_force_flag") ? string.Empty : row.Field<string>("shp_force_flag");
         entity.physicalFlag = row.Field<bool>("physical_flag");
         entity.comments = row.IsNull("comments") ? string.Empty : row.Field<string>("comments");
         entity.rowStatus = row.Field<bool>("row_status");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.displayCycleQty = row.Field<bool>("display_cycle_qty");
         entity.displayPhysQty = row.Field<bool>("display_phys_qty");
         entity.cycleAdj = row.Field<bool>("cycle_adj");
         entity.physAdj = row.Field<bool>("phys_adj");
         entity.cycleAdjCodeIn = row.IsNull("cycle_adj_code_in") ? string.Empty : row.Field<string>("cycle_adj_code_in");
         entity.cycleAdjCodeOut = row.IsNull("cycle_adj_code_out") ? string.Empty : row.Field<string>("cycle_adj_code_out");
         entity.physAdjCodeIn = row.IsNull("phys_adj_code_in") ? string.Empty : row.Field<string>("phys_adj_code_in");
         entity.physAdjCodeOut = row.IsNull("phys_adj_code_out") ? string.Empty : row.Field<string>("phys_adj_code_out");
         entity.dateTime = row.IsNull("date_time") ? string.Empty : row.Field<string>("date_time");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.labelPrintType = row.IsNull("label_print_type") ? string.Empty : row.Field<string>("label_print_type");
         entity.rowID = row.Field<byte[]>("parametersRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromParametersBase(ref DataRow row, ParametersBase entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("wh_type", entity.whType);
         row.SetField("rcv_pallet_id_flag", entity.rcvPalletIdFlag);
         row.SetField("rcv_qty_check", entity.rcvQtyCheck);
         row.SetField("rcv_back_orders", entity.rcvBackOrders);
         row.SetField("rcv_rma_prefix", entity.rcvRmaPrefix);
         row.SetField("mat_put_away", entity.matPutAway);
         row.SetField("mat_repl_flag", entity.matReplFlag);
         row.SetField("pic_release_flag", entity.picReleaseFlag);
         row.SetField("pic_release_time", entity.picReleaseTime);
         row.SetField("pic_hold_lines", entity.picHoldLines);
         row.SetField("pic_hold_types", entity.picHoldTypes);
         row.SetField("pic_label_flag", entity.picLabelFlag);
         row.SetField("pic_from_dock", entity.picFromDock);
         row.SetField("pac_type", entity.pacType);
         row.SetField("pac_list_flag", entity.pacListFlag);
         row.SetField("shp_hold_flag", entity.shpHoldFlag);
         row.SetField("shp_force_flag", entity.shpForceFlag);
         row.SetField("physical_flag", entity.physicalFlag);
         row.SetField("comments", entity.comments);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("emp_num", entity.empNum);
         row.SetField("display_cycle_qty", entity.displayCycleQty);
         row.SetField("display_phys_qty", entity.displayPhysQty);
         row.SetField("cycle_adj", entity.cycleAdj);
         row.SetField("phys_adj", entity.physAdj);
         row.SetField("cycle_adj_code_in", entity.cycleAdjCodeIn);
         row.SetField("cycle_adj_code_out", entity.cycleAdjCodeOut);
         row.SetField("phys_adj_code_in", entity.physAdjCodeIn);
         row.SetField("phys_adj_code_out", entity.physAdjCodeOut);
         row.SetField("date_time", entity.dateTime);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("label_print_type", entity.labelPrintType);
         row.SetField("parametersRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, ParametersBase entity)
      {
         row.SetField("coNum", entity.coNum);
         row.SetField("whNum", entity.whNum);
         row.SetField("parametersRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	