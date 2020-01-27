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

namespace Infor.Sxe.EDI.Data.Models.Pdsetccdoclistoecriteria
{
   [ModelName("Infor.Sxe.EDI.Data.Models.Pdsetccdoclistoecriteria.Etccdoclistoecriteria")]
   public partial class Etccdoclistoecriteria : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string custpo { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string approvty { get; set; }
      [StringValidationAttribute]
      public string slsrepout { get; set; }
      [StringValidationAttribute]
      public string slsrepin { get; set; }
      public DateTime? duedt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Etccdoclistoecriteria BuildEtccdoclistoecriteriaFromRow(DataRow row)
      {
         Etccdoclistoecriteria entity = new Etccdoclistoecriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.custpo = row.IsNull("custpo") ? string.Empty : row.Field<string>("custpo");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEtccdoclistoecriteria(ref DataRow row, Etccdoclistoecriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("custpo", entity.custpo);
         row.SetField("whse", entity.whse);
         row.SetField("approvty", entity.approvty);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("duedt", entity.duedt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591