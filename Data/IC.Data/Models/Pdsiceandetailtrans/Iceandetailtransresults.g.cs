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

namespace Infor.Sxe.IC.Data.Models.Pdsiceandetailtrans
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceandetailtrans.Iceandetailtransresults")]
   public partial class Iceandetailtransresults : ModelBase
   {
      public int jrnlno { get; set; }
      public int seqnod { get; set; }
      [StringValidationAttribute]
      public string cOrder { get; set; }
      [StringValidationAttribute]
      public string cLineNo { get; set; }
      [StringValidationAttribute]
      public string cOrdTypel { get; set; }
      public decimal dQuantity { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal dAmount { get; set; }
      public decimal dTotal { get; set; }
      public DateTime? postdt { get; set; }
      [StringValidationAttribute]
      public string binloc { get; set; }
      [StringValidationAttribute]
      public string cOrderStg { get; set; }
      [StringValidationAttribute]
      public string cTiedType { get; set; }
      [StringValidationAttribute]
      public string cQtyStatus { get; set; }
      public bool brokenTieFl { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceandetailtransresults BuildIceandetailtransresultsFromRow(DataRow row)
      {
         Iceandetailtransresults entity = new Iceandetailtransresults();
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.seqnod = row.IsNull("seqnod") ? 0 : row.Field<int>("seqnod");
         entity.cOrder = row.IsNull("cOrder") ? string.Empty : row.Field<string>("cOrder");
         entity.cLineNo = row.IsNull("cLineNo") ? string.Empty : row.Field<string>("cLineNo");
         entity.cOrdTypel = row.IsNull("cOrdTypel") ? string.Empty : row.Field<string>("cOrdTypel");
         entity.dQuantity = row.IsNull("dQuantity") ? decimal.Zero : row.Field<decimal>("dQuantity");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.dAmount = row.IsNull("dAmount") ? decimal.Zero : row.Field<decimal>("dAmount");
         entity.dTotal = row.IsNull("dTotal") ? decimal.Zero : row.Field<decimal>("dTotal");
         entity.postdt = row.Field<DateTime?>("postdt");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.cOrderStg = row.IsNull("cOrderStg") ? string.Empty : row.Field<string>("cOrderStg");
         entity.cTiedType = row.IsNull("cTiedType") ? string.Empty : row.Field<string>("cTiedType");
         entity.cQtyStatus = row.IsNull("cQtyStatus") ? string.Empty : row.Field<string>("cQtyStatus");
         entity.brokenTieFl = row.Field<bool>("BrokenTieFl");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceandetailtransresults(ref DataRow row, Iceandetailtransresults entity)
      {
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("seqnod", entity.seqnod);
         row.SetField("cOrder", entity.cOrder);
         row.SetField("cLineNo", entity.cLineNo);
         row.SetField("cOrdTypel", entity.cOrdTypel);
         row.SetField("dQuantity", entity.dQuantity);
         row.SetField("unit", entity.unit);
         row.SetField("dAmount", entity.dAmount);
         row.SetField("dTotal", entity.dTotal);
         row.SetField("postdt", entity.postdt);
         row.SetField("binloc", entity.binloc);
         row.SetField("cOrderStg", entity.cOrderStg);
         row.SetField("cTiedType", entity.cTiedType);
         row.SetField("cQtyStatus", entity.cQtyStatus);
         row.SetField("BrokenTieFl", entity.brokenTieFl);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
