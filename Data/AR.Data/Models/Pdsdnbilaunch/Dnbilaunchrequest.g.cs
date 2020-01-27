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

namespace Infor.Sxe.AR.Data.Models.Pdsdnbilaunch
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsdnbilaunch.Dnbilaunchrequest")]
   public partial class Dnbilaunchrequest : ModelBase
   {
      [StringValidationAttribute]
      public string requesttype { get; set; }
      public decimal custno { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Dnbilaunchrequest BuildDnbilaunchrequestFromRow(DataRow row)
      {
         Dnbilaunchrequest entity = new Dnbilaunchrequest();
         entity.requesttype = row.IsNull("requesttype") ? string.Empty : row.Field<string>("requesttype");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromDnbilaunchrequest(ref DataRow row, Dnbilaunchrequest entity)
      {
         row.SetField("requesttype", entity.requesttype);
         row.SetField("custno", entity.custno);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591