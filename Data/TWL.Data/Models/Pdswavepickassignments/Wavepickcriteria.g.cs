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

namespace Infor.Sxe.TWL.Data.Models.Pdswavepickassignments
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdswavepickassignments.Wavepickcriteria")]
   public partial class Wavepickcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      public int batchid { get; set; }
      [StringValidationAttribute]
      public string order { get; set; }
      [StringValidationAttribute]
      public string viewtype { get; set; }
      public bool includeUnassigned { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wavepickcriteria BuildWavepickcriteriaFromRow(DataRow row)
      {
         Wavepickcriteria entity = new Wavepickcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.batchid = row.IsNull("batchid") ? 0 : row.Field<int>("batchid");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.viewtype = row.IsNull("viewtype") ? string.Empty : row.Field<string>("viewtype");
         entity.includeUnassigned = row.Field<bool>("include_unassigned");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWavepickcriteria(ref DataRow row, Wavepickcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("emp_num", entity.empNum);
         row.SetField("batchid", entity.batchid);
         row.SetField("order", entity.order);
         row.SetField("viewtype", entity.viewtype);
         row.SetField("include_unassigned", entity.includeUnassigned);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
