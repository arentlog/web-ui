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

namespace Infor.Sxe.WT.Data.Models.Pdsloadwtlinesettings
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdsloadwtlinesettings.Loadwtlinesettings")]
   public partial class Loadwtlinesettings : ModelBase
   {
      public bool lICSNPOFl { get; set; }
      [StringValidationAttribute]
      public string cWTSerialEntTy { get; set; }
      [StringValidationAttribute]
      public string cWTLotEntTy { get; set; }
      public bool lNonStockEntry { get; set; }
      [StringValidationAttribute]
      public string cDefaultNonStockTy { get; set; }
      [StringValidationAttribute]
      public string cWTApprWhse { get; set; }
      public bool lSeeCostFl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadwtlinesettings BuildLoadwtlinesettingsFromRow(DataRow row)
      {
         Loadwtlinesettings entity = new Loadwtlinesettings();
         entity.lICSNPOFl = row.Field<bool>("lICSNPOFl");
         entity.cWTSerialEntTy = row.IsNull("cWTSerialEntTy") ? string.Empty : row.Field<string>("cWTSerialEntTy");
         entity.cWTLotEntTy = row.IsNull("cWTLotEntTy") ? string.Empty : row.Field<string>("cWTLotEntTy");
         entity.lNonStockEntry = row.Field<bool>("lNonStockEntry");
         entity.cDefaultNonStockTy = row.IsNull("cDefaultNonStockTy") ? string.Empty : row.Field<string>("cDefaultNonStockTy");
         entity.cWTApprWhse = row.IsNull("cWTApprWhse") ? string.Empty : row.Field<string>("cWTApprWhse");
         entity.lSeeCostFl = row.Field<bool>("lSeeCostFl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadwtlinesettings(ref DataRow row, Loadwtlinesettings entity)
      {
         row.SetField("lICSNPOFl", entity.lICSNPOFl);
         row.SetField("cWTSerialEntTy", entity.cWTSerialEntTy);
         row.SetField("cWTLotEntTy", entity.cWTLotEntTy);
         row.SetField("lNonStockEntry", entity.lNonStockEntry);
         row.SetField("cDefaultNonStockTy", entity.cDefaultNonStockTy);
         row.SetField("cWTApprWhse", entity.cWTApprWhse);
         row.SetField("lSeeCostFl", entity.lSeeCostFl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591