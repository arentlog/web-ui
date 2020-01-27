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

namespace Infor.Sxe.TWL.Data.Models.Pdsinvdiscbuildcountresults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsinvdiscbuildcountresults.Invdiscbuildcreated")]
   public partial class Invdiscbuildcreated : ModelBase
   {
      public int cycleId { get; set; }
      [StringValidationAttribute]
      public string cycleLevel { get; set; }
      public bool lCreated { get; set; }
      [StringValidationAttribute]
      public string cCreateInfo { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string aBSNum { get; set; }
      [StringValidationAttribute]
      public string palletId { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      [StringValidationAttribute]
      public string invdiscbuildinvprobuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Invdiscbuildcreated BuildInvdiscbuildcreatedFromRow(DataRow row)
      {
         Invdiscbuildcreated entity = new Invdiscbuildcreated();
         entity.cycleId = row.IsNull("cycle_id") ? 0 : row.Field<int>("cycle_id");
         entity.cycleLevel = row.IsNull("cycle_level") ? string.Empty : row.Field<string>("cycle_level");
         entity.lCreated = row.Field<bool>("lCreated");
         entity.cCreateInfo = row.IsNull("cCreateInfo") ? string.Empty : row.Field<string>("cCreateInfo");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.aBSNum = row.IsNull("ABS_num") ? string.Empty : row.Field<string>("ABS_num");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.invdiscbuildinvprobuserfield = row.IsNull("invdiscbuildinvprobuserfield") ? string.Empty : row.Field<string>("invdiscbuildinvprobuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromInvdiscbuildcreated(ref DataRow row, Invdiscbuildcreated entity)
      {
         row.SetField("cycle_id", entity.cycleId);
         row.SetField("cycle_level", entity.cycleLevel);
         row.SetField("lCreated", entity.lCreated);
         row.SetField("cCreateInfo", entity.cCreateInfo);
         row.SetField("bin_num", entity.binNum);
         row.SetField("ABS_num", entity.aBSNum);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("lot", entity.lot);
         row.SetField("invdiscbuildinvprobuserfield", entity.invdiscbuildinvprobuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591