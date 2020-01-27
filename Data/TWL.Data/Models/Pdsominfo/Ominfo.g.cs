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

namespace Infor.Sxe.TWL.Data.Models.Pdsominfo
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsominfo.Ominfo")]
   public partial class Ominfo : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string userId { get; set; }
      [StringValidationAttribute]
      public string altWhNumList { get; set; }
      [StringValidationAttribute]
      public string twlPrinterId { get; set; }
      public bool isEmergencyAnywhere { get; set; }
      public bool isExceptionsAnywhere { get; set; }
      [StringValidationAttribute]
      public string firstExceptionType { get; set; }
      [StringValidationAttribute]
      public string paramDropCriteria { get; set; }
      public int paramAutoDropType { get; set; }
      [StringValidationAttribute]
      public string paramHowPickTickets { get; set; }
      public bool paramPrintPickTickets { get; set; }
      public bool paramOneItemPicks { get; set; }
      public int paramWaveSize { get; set; }
      [StringValidationAttribute]
      public string paramCustomsReleaseAdj { get; set; }
      public int paramBreakPickByCarton { get; set; }
      public bool paramPickLaborItems { get; set; }
      [StringValidationAttribute]
      public string paramBodKitDrop { get; set; }
      [StringValidationAttribute]
      public string paramPreKitDrop { get; set; }
      public bool paramPartialPrimaryPick { get; set; }
      public bool paramReviewZeroShip { get; set; }
      public bool isLabelPrinting { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ominfo BuildOminfoFromRow(DataRow row)
      {
         Ominfo entity = new Ominfo();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.userId = row.IsNull("user_id") ? string.Empty : row.Field<string>("user_id");
         entity.altWhNumList = row.IsNull("alt_wh_num_list") ? string.Empty : row.Field<string>("alt_wh_num_list");
         entity.twlPrinterId = row.IsNull("twl_printer_id") ? string.Empty : row.Field<string>("twl_printer_id");
         entity.isEmergencyAnywhere = row.Field<bool>("is_emergency_anywhere");
         entity.isExceptionsAnywhere = row.Field<bool>("is_exceptions_anywhere");
         entity.firstExceptionType = row.IsNull("first_exception_type") ? string.Empty : row.Field<string>("first_exception_type");
         entity.paramDropCriteria = row.IsNull("param_drop_criteria") ? string.Empty : row.Field<string>("param_drop_criteria");
         entity.paramAutoDropType = row.IsNull("param_auto_drop_type") ? 0 : row.Field<int>("param_auto_drop_type");
         entity.paramHowPickTickets = row.IsNull("param_how_pick_tickets") ? string.Empty : row.Field<string>("param_how_pick_tickets");
         entity.paramPrintPickTickets = row.Field<bool>("param_print_pick_tickets");
         entity.paramOneItemPicks = row.Field<bool>("param_one_item_picks");
         entity.paramWaveSize = row.IsNull("param_wave_size") ? 0 : row.Field<int>("param_wave_size");
         entity.paramCustomsReleaseAdj = row.IsNull("param_customs_release_adj") ? string.Empty : row.Field<string>("param_customs_release_adj");
         entity.paramBreakPickByCarton = row.IsNull("param_break_pick_by_carton") ? 0 : row.Field<int>("param_break_pick_by_carton");
         entity.paramPickLaborItems = row.Field<bool>("param_pick_labor_items");
         entity.paramBodKitDrop = row.IsNull("param_bod_kit_drop") ? string.Empty : row.Field<string>("param_bod_kit_drop");
         entity.paramPreKitDrop = row.IsNull("param_pre_kit_drop") ? string.Empty : row.Field<string>("param_pre_kit_drop");
         entity.paramPartialPrimaryPick = row.Field<bool>("param_partial_primary_pick");
         entity.paramReviewZeroShip = row.Field<bool>("param_review_zero_ship");
         entity.isLabelPrinting = row.Field<bool>("is_label_printing");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOminfo(ref DataRow row, Ominfo entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("user_id", entity.userId);
         row.SetField("alt_wh_num_list", entity.altWhNumList);
         row.SetField("twl_printer_id", entity.twlPrinterId);
         row.SetField("is_emergency_anywhere", entity.isEmergencyAnywhere);
         row.SetField("is_exceptions_anywhere", entity.isExceptionsAnywhere);
         row.SetField("first_exception_type", entity.firstExceptionType);
         row.SetField("param_drop_criteria", entity.paramDropCriteria);
         row.SetField("param_auto_drop_type", entity.paramAutoDropType);
         row.SetField("param_how_pick_tickets", entity.paramHowPickTickets);
         row.SetField("param_print_pick_tickets", entity.paramPrintPickTickets);
         row.SetField("param_one_item_picks", entity.paramOneItemPicks);
         row.SetField("param_wave_size", entity.paramWaveSize);
         row.SetField("param_customs_release_adj", entity.paramCustomsReleaseAdj);
         row.SetField("param_break_pick_by_carton", entity.paramBreakPickByCarton);
         row.SetField("param_pick_labor_items", entity.paramPickLaborItems);
         row.SetField("param_bod_kit_drop", entity.paramBodKitDrop);
         row.SetField("param_pre_kit_drop", entity.paramPreKitDrop);
         row.SetField("param_partial_primary_pick", entity.paramPartialPrimaryPick);
         row.SetField("param_review_zero_ship", entity.paramReviewZeroShip);
         row.SetField("is_label_printing", entity.isLabelPrinting);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
