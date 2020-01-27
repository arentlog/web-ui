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

namespace Infor.Sxe.PTX.Data.Models.Pdsptxqueuebatchdetail
{
   [ModelName("Infor.Sxe.PTX.Data.Models.Pdsptxqueuebatchdetail.Ptxqueuebatchdetailcriteria")]
   public partial class Ptxqueuebatchdetailcriteria : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string rwid { get; set; }


      public static Ptxqueuebatchdetailcriteria BuildPtxqueuebatchdetailcriteriaFromRow(DataRow row)
      {
         Ptxqueuebatchdetailcriteria entity = new Ptxqueuebatchdetailcriteria();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.rwid = row.Field<byte[]>("rwid").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPtxqueuebatchdetailcriteria(ref DataRow row, Ptxqueuebatchdetailcriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("rwid", entity.rwid.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591
