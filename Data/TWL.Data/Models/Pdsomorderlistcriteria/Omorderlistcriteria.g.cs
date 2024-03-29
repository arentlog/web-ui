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

namespace Infor.Sxe.TWL.Data.Models.Pdsomorderlistcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsomorderlistcriteria.Omorderlistcriteria")]
   public partial class Omorderlistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      public int batch { get; set; }
      [StringValidationAttribute]
      public string batchList { get; set; }
      [StringValidationAttribute]
      public string branchIdList { get; set; }
      [StringValidationAttribute]
      public string carrierList { get; set; }
      public bool onlyBlankCarriers { get; set; }
      [StringValidationAttribute]
      public string customerList { get; set; }
      [StringValidationAttribute]
      public string customerNameList { get; set; }
      [StringValidationAttribute]
      public string customerShipToList { get; set; }
      public DateTime? latestExpShipDate { get; set; }
      [StringValidationAttribute]
      public string orderList { get; set; }
      [StringValidationAttribute]
      public string orderClassList { get; set; }
      [StringValidationAttribute]
      public string orderTypeList { get; set; }
      [StringValidationAttribute]
      public string orderStatusList { get; set; }
      [StringValidationAttribute]
      public string priorityList { get; set; }
      [StringValidationAttribute]
      public string routeList { get; set; }
      [StringValidationAttribute]
      public string singlesList { get; set; }
      [StringValidationAttribute]
      public string warehouseZoneList { get; set; }
      [StringValidationAttribute]
      public string workOrderDeptList { get; set; }
      public bool isAssigned { get; set; }
      public bool isUnassigned { get; set; }
      public bool includeOnHold { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Omorderlistcriteria BuildOmorderlistcriteriaFromRow(DataRow row)
      {
         Omorderlistcriteria entity = new Omorderlistcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.batch = row.IsNull("batch") ? 0 : row.Field<int>("batch");
         entity.batchList = row.IsNull("batch_list") ? string.Empty : row.Field<string>("batch_list");
         entity.branchIdList = row.IsNull("branch_id_list") ? string.Empty : row.Field<string>("branch_id_list");
         entity.carrierList = row.IsNull("carrier_list") ? string.Empty : row.Field<string>("carrier_list");
         entity.onlyBlankCarriers = row.Field<bool>("only_blank_carriers");
         entity.customerList = row.IsNull("customer_list") ? string.Empty : row.Field<string>("customer_list");
         entity.customerNameList = row.IsNull("customer_name_list") ? string.Empty : row.Field<string>("customer_name_list");
         entity.customerShipToList = row.IsNull("customer_ship_to_list") ? string.Empty : row.Field<string>("customer_ship_to_list");
         entity.latestExpShipDate = row.Field<DateTime?>("latest_exp_ship_date");
         entity.orderList = row.IsNull("order_list") ? string.Empty : row.Field<string>("order_list");
         entity.orderClassList = row.IsNull("order_class_list") ? string.Empty : row.Field<string>("order_class_list");
         entity.orderTypeList = row.IsNull("order_type_list") ? string.Empty : row.Field<string>("order_type_list");
         entity.orderStatusList = row.IsNull("order_status_list") ? string.Empty : row.Field<string>("order_status_list");
         entity.priorityList = row.IsNull("priority_list") ? string.Empty : row.Field<string>("priority_list");
         entity.routeList = row.IsNull("route_list") ? string.Empty : row.Field<string>("route_list");
         entity.singlesList = row.IsNull("singles_list") ? string.Empty : row.Field<string>("singles_list");
         entity.warehouseZoneList = row.IsNull("warehouse_zone_list") ? string.Empty : row.Field<string>("warehouse_zone_list");
         entity.workOrderDeptList = row.IsNull("work_order_dept_list") ? string.Empty : row.Field<string>("work_order_dept_list");
         entity.isAssigned = row.Field<bool>("is_assigned");
         entity.isUnassigned = row.Field<bool>("is_unassigned");
         entity.includeOnHold = row.Field<bool>("include_on_hold");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOmorderlistcriteria(ref DataRow row, Omorderlistcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("batch", entity.batch);
         row.SetField("batch_list", entity.batchList);
         row.SetField("branch_id_list", entity.branchIdList);
         row.SetField("carrier_list", entity.carrierList);
         row.SetField("only_blank_carriers", entity.onlyBlankCarriers);
         row.SetField("customer_list", entity.customerList);
         row.SetField("customer_name_list", entity.customerNameList);
         row.SetField("customer_ship_to_list", entity.customerShipToList);
         row.SetField("latest_exp_ship_date", entity.latestExpShipDate);
         row.SetField("order_list", entity.orderList);
         row.SetField("order_class_list", entity.orderClassList);
         row.SetField("order_type_list", entity.orderTypeList);
         row.SetField("order_status_list", entity.orderStatusList);
         row.SetField("priority_list", entity.priorityList);
         row.SetField("route_list", entity.routeList);
         row.SetField("singles_list", entity.singlesList);
         row.SetField("warehouse_zone_list", entity.warehouseZoneList);
         row.SetField("work_order_dept_list", entity.workOrderDeptList);
         row.SetField("is_assigned", entity.isAssigned);
         row.SetField("is_unassigned", entity.isUnassigned);
         row.SetField("include_on_hold", entity.includeOnHold);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
