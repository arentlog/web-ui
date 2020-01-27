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

namespace Infor.Sxe.TWL.Data.Models.Pdsgetpocriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsgetpocriteria.Getpocriteria")]
   public partial class Getpocriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string poNum { get; set; }
      [StringValidationAttribute]
      public string poSuffix { get; set; }
      [StringValidationAttribute]
      public string vendorId { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string getpocriteriauserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Getpocriteria BuildGetpocriteriaFromRow(DataRow row)
      {
         Getpocriteria entity = new Getpocriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.poNum = row.IsNull("po_num") ? string.Empty : row.Field<string>("po_num");
         entity.poSuffix = row.IsNull("po_suffix") ? string.Empty : row.Field<string>("po_suffix");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.getpocriteriauserfield = row.IsNull("getpocriteriauserfield") ? string.Empty : row.Field<string>("getpocriteriauserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGetpocriteria(ref DataRow row, Getpocriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("po_num", entity.poNum);
         row.SetField("po_suffix", entity.poSuffix);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("getpocriteriauserfield", entity.getpocriteriauserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
