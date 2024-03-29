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

namespace Infor.Sxe.IC.Data.Models.Pdsicspclookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicspclookup.Icspclookupresults")]
   public partial class Icspclookupresults : ModelBase
   {
      public int cono { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnoname { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string shiptoname { get; set; }
      [StringValidationAttribute]
      public string shiptogrp { get; set; }
      [StringValidationAttribute]
      public string shiptogrpname { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public DateTime? startdt { get; set; }
      public DateTime? expiredt { get; set; }
      public bool activefl { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public int fillpriority { get; set; }
      public DateTime? createdt { get; set; }
      [StringValidationAttribute]
      public string qtyreserved { get; set; }
      [StringValidationAttribute]
      public string qtyrequired { get; set; }
      [StringValidationAttribute]
      public string qtyforecast { get; set; }
      [StringValidationAttribute]
      public string qtyremaining { get; set; }
      [StringValidationAttribute]
      public string stkqtytopurchase { get; set; }
      [StringValidationAttribute]
      public string unitstock { get; set; }
      [StringValidationAttribute]
      public string qtytopurchase { get; set; }
      [StringValidationAttribute]
      public string unitbuy { get; set; }
      [StringValidationAttribute]
      public string creditmessage { get; set; }
      [StringValidationAttribute]
      public string rrarreportno { get; set; }
      public DateTime? rrarupddt { get; set; }
      [StringValidationAttribute]
      public string icspcRowpointer { get; set; }
      [StringValidationAttribute]
      public string srcrowpointer { get; set; }
      [StringValidationAttribute]
      public string recordtype { get; set; }
      [StringValidationAttribute]
      public string icspRowpointer { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icspclookupresults BuildIcspclookupresultsFromRow(DataRow row)
      {
         Icspclookupresults entity = new Icspclookupresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnoname = row.IsNull("custnoname") ? string.Empty : row.Field<string>("custnoname");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shiptoname = row.IsNull("shiptoname") ? string.Empty : row.Field<string>("shiptoname");
         entity.shiptogrp = row.IsNull("shiptogrp") ? string.Empty : row.Field<string>("shiptogrp");
         entity.shiptogrpname = row.IsNull("shiptogrpname") ? string.Empty : row.Field<string>("shiptogrpname");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.expiredt = row.Field<DateTime?>("expiredt");
         entity.activefl = row.Field<bool>("activefl");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.fillpriority = row.IsNull("fillpriority") ? 0 : row.Field<int>("fillpriority");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.qtyreserved = row.IsNull("qtyreserved") ? string.Empty : row.Field<string>("qtyreserved");
         entity.qtyrequired = row.IsNull("qtyrequired") ? string.Empty : row.Field<string>("qtyrequired");
         entity.qtyforecast = row.IsNull("qtyforecast") ? string.Empty : row.Field<string>("qtyforecast");
         entity.qtyremaining = row.IsNull("qtyremaining") ? string.Empty : row.Field<string>("qtyremaining");
         entity.stkqtytopurchase = row.IsNull("stkqtytopurchase") ? string.Empty : row.Field<string>("stkqtytopurchase");
         entity.unitstock = row.IsNull("unitstock") ? string.Empty : row.Field<string>("unitstock");
         entity.qtytopurchase = row.IsNull("qtytopurchase") ? string.Empty : row.Field<string>("qtytopurchase");
         entity.unitbuy = row.IsNull("unitbuy") ? string.Empty : row.Field<string>("unitbuy");
         entity.creditmessage = row.IsNull("creditmessage") ? string.Empty : row.Field<string>("creditmessage");
         entity.rrarreportno = row.IsNull("rrarreportno") ? string.Empty : row.Field<string>("rrarreportno");
         entity.rrarupddt = row.Field<DateTime?>("rrarupddt");
         entity.icspcRowpointer = row.IsNull("icspc-rowpointer") ? string.Empty : row.Field<string>("icspc-rowpointer");
         entity.srcrowpointer = row.IsNull("srcrowpointer") ? string.Empty : row.Field<string>("srcrowpointer");
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.icspRowpointer = row.IsNull("icsp-rowpointer") ? string.Empty : row.Field<string>("icsp-rowpointer");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcspclookupresults(ref DataRow row, Icspclookupresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("custno", entity.custno);
         row.SetField("custnoname", entity.custnoname);
         row.SetField("shipto", entity.shipto);
         row.SetField("shiptoname", entity.shiptoname);
         row.SetField("shiptogrp", entity.shiptogrp);
         row.SetField("shiptogrpname", entity.shiptogrpname);
         row.SetField("whse", entity.whse);
         row.SetField("startdt", entity.startdt);
         row.SetField("expiredt", entity.expiredt);
         row.SetField("activefl", entity.activefl);
         row.SetField("contractno", entity.contractno);
         row.SetField("refer", entity.refer);
         row.SetField("fillpriority", entity.fillpriority);
         row.SetField("createdt", entity.createdt);
         row.SetField("qtyreserved", entity.qtyreserved);
         row.SetField("qtyrequired", entity.qtyrequired);
         row.SetField("qtyforecast", entity.qtyforecast);
         row.SetField("qtyremaining", entity.qtyremaining);
         row.SetField("stkqtytopurchase", entity.stkqtytopurchase);
         row.SetField("unitstock", entity.unitstock);
         row.SetField("qtytopurchase", entity.qtytopurchase);
         row.SetField("unitbuy", entity.unitbuy);
         row.SetField("creditmessage", entity.creditmessage);
         row.SetField("rrarreportno", entity.rrarreportno);
         row.SetField("rrarupddt", entity.rrarupddt);
         row.SetField("icspc-rowpointer", entity.icspcRowpointer);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("recordtype", entity.recordtype);
         row.SetField("icsp-rowpointer", entity.icspRowpointer);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
