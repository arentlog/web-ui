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

namespace Infor.Sxe.OE.Data.Models.Pdsoeblanketupdate
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeblanketupdate.Oeblanketupdatecriteria")]
   public partial class Oeblanketupdatecriteria : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public DateTime? promisedt { get; set; }
      public DateTime? origpromisedt { get; set; }
      public DateTime? reqshipdt { get; set; }
      public DateTime? billdt { get; set; }
      [StringValidationAttribute]
      public string shipviaty { get; set; }
      [StringValidationAttribute]
      public string customparam { get; set; }


      public static Oeblanketupdatecriteria BuildOeblanketupdatecriteriaFromRow(DataRow row)
      {
         Oeblanketupdatecriteria entity = new Oeblanketupdatecriteria();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.origpromisedt = row.Field<DateTime?>("origpromisedt");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.billdt = row.Field<DateTime?>("billdt");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.customparam = row.IsNull("customparam") ? string.Empty : row.Field<string>("customparam");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeblanketupdatecriteria(ref DataRow row, Oeblanketupdatecriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("shipto", entity.shipto);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("origpromisedt", entity.origpromisedt);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("billdt", entity.billdt);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("customparam", entity.customparam);

      }
   
   }
}
#pragma warning restore 1591