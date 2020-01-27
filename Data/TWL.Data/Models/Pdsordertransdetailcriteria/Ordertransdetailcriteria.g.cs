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

namespace Infor.Sxe.TWL.Data.Models.Pdsordertransdetailcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsordertransdetailcriteria.Ordertransdetailcriteria")]
   public partial class Ordertransdetailcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string order { get; set; }
      [StringValidationAttribute]
      public string orderSuffix { get; set; }
      public int line { get; set; }
      public int lineSequence { get; set; }
      [StringValidationAttribute]
      public string transType { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ordertransdetailcriteria BuildOrdertransdetailcriteriaFromRow(DataRow row)
      {
         Ordertransdetailcriteria entity = new Ordertransdetailcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.orderSuffix = row.IsNull("order_suffix") ? string.Empty : row.Field<string>("order_suffix");
         entity.line = row.IsNull("line") ? 0 : row.Field<int>("line");
         entity.lineSequence = row.IsNull("line_sequence") ? 0 : row.Field<int>("line_sequence");
         entity.transType = row.IsNull("trans_type") ? string.Empty : row.Field<string>("trans_type");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOrdertransdetailcriteria(ref DataRow row, Ordertransdetailcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("order", entity.order);
         row.SetField("order_suffix", entity.orderSuffix);
         row.SetField("line", entity.line);
         row.SetField("line_sequence", entity.lineSequence);
         row.SetField("trans_type", entity.transType);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
