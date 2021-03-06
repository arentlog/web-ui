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

namespace Infor.Sxe.TWL.Data.Models.Pdsphysinvsummary
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsphysinvsummary.Physinvsummary")]
   public partial class Physinvsummary : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string userId { get; set; }
      [StringValidationAttribute]
      public string elapsed { get; set; }
      [StringValidationAttribute]
      public string lastCnt { get; set; }
      [StringValidationAttribute]
      public string startDt { get; set; }
      [StringValidationAttribute]
      public string endDt { get; set; }
      [StringValidationAttribute]
      public string chStart { get; set; }
      [StringValidationAttribute]
      public string chEnd { get; set; }
      [StringValidationAttribute]
      public string physStatus { get; set; }
      public decimal invCompPcnt { get; set; }
      public decimal invCorPcnt { get; set; }
      public decimal locCompPcnt { get; set; }
      public decimal locCorPcnt { get; set; }
      public decimal unitCompPcnt { get; set; }
      public decimal unitCorPcnt { get; set; }
      public int invCnt { get; set; }
      public int invCor { get; set; }
      public int invUnc { get; set; }
      public int locCnt { get; set; }
      public int locCor { get; set; }
      public int locUnc { get; set; }
      public decimal unitCnt { get; set; }
      public decimal unitCor { get; set; }
      public decimal unitUnc { get; set; }
      public bool isLocUnc { get; set; }
      public bool isInvUnc { get; set; }
      public bool isLocDis { get; set; }
      public bool isInvDis { get; set; }
      public bool isZoneDis { get; set; }
      public bool isLocNact { get; set; }
      public bool isPhysical { get; set; }
      public bool isDeactivated { get; set; }
      [StringValidationAttribute]
      public string deactivateDt { get; set; }
      public int countBinsLeft { get; set; }
      public int countInvsLeft { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Physinvsummary BuildPhysinvsummaryFromRow(DataRow row)
      {
         Physinvsummary entity = new Physinvsummary();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.userId = row.IsNull("user_id") ? string.Empty : row.Field<string>("user_id");
         entity.elapsed = row.IsNull("elapsed") ? string.Empty : row.Field<string>("elapsed");
         entity.lastCnt = row.IsNull("last_cnt") ? string.Empty : row.Field<string>("last_cnt");
         entity.startDt = row.IsNull("start_dt") ? string.Empty : row.Field<string>("start_dt");
         entity.endDt = row.IsNull("end_dt") ? string.Empty : row.Field<string>("end_dt");
         entity.chStart = row.IsNull("ch_start") ? string.Empty : row.Field<string>("ch_start");
         entity.chEnd = row.IsNull("ch_end") ? string.Empty : row.Field<string>("ch_end");
         entity.physStatus = row.IsNull("phys_status") ? string.Empty : row.Field<string>("phys_status");
         entity.invCompPcnt = row.IsNull("inv_comp_pcnt") ? decimal.Zero : row.Field<decimal>("inv_comp_pcnt");
         entity.invCorPcnt = row.IsNull("inv_cor_pcnt") ? decimal.Zero : row.Field<decimal>("inv_cor_pcnt");
         entity.locCompPcnt = row.IsNull("loc_comp_pcnt") ? decimal.Zero : row.Field<decimal>("loc_comp_pcnt");
         entity.locCorPcnt = row.IsNull("loc_cor_pcnt") ? decimal.Zero : row.Field<decimal>("loc_cor_pcnt");
         entity.unitCompPcnt = row.IsNull("unit_comp-pcnt") ? decimal.Zero : row.Field<decimal>("unit_comp-pcnt");
         entity.unitCorPcnt = row.IsNull("unit_cor_pcnt") ? decimal.Zero : row.Field<decimal>("unit_cor_pcnt");
         entity.invCnt = row.IsNull("inv_cnt") ? 0 : row.Field<int>("inv_cnt");
         entity.invCor = row.IsNull("inv_cor") ? 0 : row.Field<int>("inv_cor");
         entity.invUnc = row.IsNull("inv_unc") ? 0 : row.Field<int>("inv_unc");
         entity.locCnt = row.IsNull("loc_cnt") ? 0 : row.Field<int>("loc_cnt");
         entity.locCor = row.IsNull("loc_cor") ? 0 : row.Field<int>("loc_cor");
         entity.locUnc = row.IsNull("loc_unc") ? 0 : row.Field<int>("loc_unc");
         entity.unitCnt = row.IsNull("unit_cnt") ? decimal.Zero : row.Field<decimal>("unit_cnt");
         entity.unitCor = row.IsNull("unit_cor") ? decimal.Zero : row.Field<decimal>("unit_cor");
         entity.unitUnc = row.IsNull("unit_unc") ? decimal.Zero : row.Field<decimal>("unit_unc");
         entity.isLocUnc = row.Field<bool>("is_loc_unc");
         entity.isInvUnc = row.Field<bool>("is_inv_unc");
         entity.isLocDis = row.Field<bool>("is_loc_dis");
         entity.isInvDis = row.Field<bool>("is_inv_dis");
         entity.isZoneDis = row.Field<bool>("is_zone_dis");
         entity.isLocNact = row.Field<bool>("is_loc_nact");
         entity.isPhysical = row.Field<bool>("is_physical");
         entity.isDeactivated = row.Field<bool>("is_deactivated");
         entity.deactivateDt = row.IsNull("deactivate_dt") ? string.Empty : row.Field<string>("deactivate_dt");
         entity.countBinsLeft = row.IsNull("count_bins_left") ? 0 : row.Field<int>("count_bins_left");
         entity.countInvsLeft = row.IsNull("count_invs_left") ? 0 : row.Field<int>("count_invs_left");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPhysinvsummary(ref DataRow row, Physinvsummary entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("user_id", entity.userId);
         row.SetField("elapsed", entity.elapsed);
         row.SetField("last_cnt", entity.lastCnt);
         row.SetField("start_dt", entity.startDt);
         row.SetField("end_dt", entity.endDt);
         row.SetField("ch_start", entity.chStart);
         row.SetField("ch_end", entity.chEnd);
         row.SetField("phys_status", entity.physStatus);
         row.SetField("inv_comp_pcnt", entity.invCompPcnt);
         row.SetField("inv_cor_pcnt", entity.invCorPcnt);
         row.SetField("loc_comp_pcnt", entity.locCompPcnt);
         row.SetField("loc_cor_pcnt", entity.locCorPcnt);
         row.SetField("unit_comp-pcnt", entity.unitCompPcnt);
         row.SetField("unit_cor_pcnt", entity.unitCorPcnt);
         row.SetField("inv_cnt", entity.invCnt);
         row.SetField("inv_cor", entity.invCor);
         row.SetField("inv_unc", entity.invUnc);
         row.SetField("loc_cnt", entity.locCnt);
         row.SetField("loc_cor", entity.locCor);
         row.SetField("loc_unc", entity.locUnc);
         row.SetField("unit_cnt", entity.unitCnt);
         row.SetField("unit_cor", entity.unitCor);
         row.SetField("unit_unc", entity.unitUnc);
         row.SetField("is_loc_unc", entity.isLocUnc);
         row.SetField("is_inv_unc", entity.isInvUnc);
         row.SetField("is_loc_dis", entity.isLocDis);
         row.SetField("is_inv_dis", entity.isInvDis);
         row.SetField("is_zone_dis", entity.isZoneDis);
         row.SetField("is_loc_nact", entity.isLocNact);
         row.SetField("is_physical", entity.isPhysical);
         row.SetField("is_deactivated", entity.isDeactivated);
         row.SetField("deactivate_dt", entity.deactivateDt);
         row.SetField("count_bins_left", entity.countBinsLeft);
         row.SetField("count_invs_left", entity.countInvsLeft);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
