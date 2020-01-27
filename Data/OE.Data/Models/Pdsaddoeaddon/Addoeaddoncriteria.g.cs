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

namespace Infor.Sxe.OE.Data.Models.Pdsaddoeaddon
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsaddoeaddon.Addoeaddoncriteria")]
   public partial class Addoeaddoncriteria : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int addonno { get; set; }
      public decimal addonamt { get; set; }
      public bool addontype { get; set; }


      public static Addoeaddoncriteria BuildAddoeaddoncriteriaFromRow(DataRow row)
      {
         Addoeaddoncriteria entity = new Addoeaddoncriteria();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.addonno = row.IsNull("addonno") ? 0 : row.Field<int>("addonno");
         entity.addonamt = row.IsNull("addonamt") ? decimal.Zero : row.Field<decimal>("addonamt");
         entity.addontype = row.Field<bool>("addontype");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAddoeaddoncriteria(ref DataRow row, Addoeaddoncriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("addonno", entity.addonno);
         row.SetField("addonamt", entity.addonamt);
         row.SetField("addontype", entity.addontype);

      }
   
   }
}
#pragma warning restore 1591