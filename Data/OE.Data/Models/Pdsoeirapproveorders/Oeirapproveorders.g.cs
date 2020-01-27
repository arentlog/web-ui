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

namespace Infor.Sxe.OE.Data.Models.Pdsoeirapproveorders
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeirapproveorders.Oeirapproveorders")]
   public partial class Oeirapproveorders : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string ccOverrideMsg { get; set; }
      public bool ccApprovalfl { get; set; }
      [StringValidationAttribute]
      public string approvty { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeirapproveorders BuildOeirapproveordersFromRow(DataRow row)
      {
         Oeirapproveorders entity = new Oeirapproveorders();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.ccOverrideMsg = row.IsNull("ccOverrideMsg") ? string.Empty : row.Field<string>("ccOverrideMsg");
         entity.ccApprovalfl = row.Field<bool>("ccApprovalfl");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeirapproveorders(ref DataRow row, Oeirapproveorders entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("ccOverrideMsg", entity.ccOverrideMsg);
         row.SetField("ccApprovalfl", entity.ccApprovalfl);
         row.SetField("approvty", entity.approvty);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591