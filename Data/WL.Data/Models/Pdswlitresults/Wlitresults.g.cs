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

namespace Infor.Sxe.WL.Data.Models.Pdswlitresults
{
   [ModelName("Infor.Sxe.WL.Data.Models.Pdswlitresults.Wlitresults")]
   public partial class Wlitresults : ModelBase
   {
      [StringValidationAttribute]
      public string statustype { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int vaSeq { get; set; }
      [StringValidationAttribute]
      public string processty { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string updtype { get; set; }
      public decimal custno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string shipfm { get; set; }
      public DateTime? duedt { get; set; }
      public DateTime? orderdt { get; set; }
      public DateTime? createdt { get; set; }
      [StringValidationAttribute]
      public string createtm { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string setno { get; set; }
      [StringValidationAttribute]
      public string errormsg { get; set; }
      public long wlehrecid { get; set; }
      [StringValidationAttribute]
      public string wlehrowid { get; set; }
      [StringValidationAttribute]
      public string wletstatus { get; set; }
      [StringValidationAttribute]
      public string cWLETstatus { get; set; }
      [StringValidationAttribute]
      public string cWLETstatustype { get; set; }
      [StringValidationAttribute]
      public string cWLETProcessty { get; set; }
      [StringValidationAttribute]
      public string cWLETOrdertype { get; set; }
      [StringValidationAttribute]
      public string cWLETUpdatetype { get; set; }
      [StringValidationAttribute]
      public string cWLETTranstype { get; set; }
      [StringValidationAttribute]
      public string cEDIShipmentID { get; set; }
      [StringValidationAttribute]
      public string cEDIPackageID { get; set; }
      public bool lOtherRecords { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wlitresults BuildWlitresultsFromRow(DataRow row)
      {
         Wlitresults entity = new Wlitresults();
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.vaSeq = row.IsNull("va-seq") ? 0 : row.Field<int>("va-seq");
         entity.processty = row.IsNull("processty") ? string.Empty : row.Field<string>("processty");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.updtype = row.IsNull("updtype") ? string.Empty : row.Field<string>("updtype");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shipfm = row.IsNull("shipfm") ? string.Empty : row.Field<string>("shipfm");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.orderdt = row.Field<DateTime?>("orderdt");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.createtm = row.IsNull("createtm") ? string.Empty : row.Field<string>("createtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.setno = row.IsNull("setno") ? string.Empty : row.Field<string>("setno");
         entity.errormsg = row.IsNull("errormsg") ? string.Empty : row.Field<string>("errormsg");
         entity.wlehrecid = row.IsNull("wlehrecid") ? 0 : row.Field<long>("wlehrecid");
         entity.wlehrowid = row.Field<byte[]>("wlehrowid").ToStringEncoded();
         entity.wletstatus = row.IsNull("wletstatus") ? string.Empty : row.Field<string>("wletstatus");
         entity.cWLETstatus = row.IsNull("cWLETstatus") ? string.Empty : row.Field<string>("cWLETstatus");
         entity.cWLETstatustype = row.IsNull("cWLETstatustype") ? string.Empty : row.Field<string>("cWLETstatustype");
         entity.cWLETProcessty = row.IsNull("cWLETProcessty") ? string.Empty : row.Field<string>("cWLETProcessty");
         entity.cWLETOrdertype = row.IsNull("cWLETOrdertype") ? string.Empty : row.Field<string>("cWLETOrdertype");
         entity.cWLETUpdatetype = row.IsNull("cWLETUpdatetype") ? string.Empty : row.Field<string>("cWLETUpdatetype");
         entity.cWLETTranstype = row.IsNull("cWLETTranstype") ? string.Empty : row.Field<string>("cWLETTranstype");
         entity.cEDIShipmentID = row.IsNull("cEDIShipmentID") ? string.Empty : row.Field<string>("cEDIShipmentID");
         entity.cEDIPackageID = row.IsNull("cEDIPackageID") ? string.Empty : row.Field<string>("cEDIPackageID");
         entity.lOtherRecords = row.Field<bool>("lOtherRecords");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWlitresults(ref DataRow row, Wlitresults entity)
      {
         row.SetField("statustype", entity.statustype);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("va-seq", entity.vaSeq);
         row.SetField("processty", entity.processty);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("transtype", entity.transtype);
         row.SetField("updtype", entity.updtype);
         row.SetField("custno", entity.custno);
         row.SetField("vendno", entity.vendno);
         row.SetField("whse", entity.whse);
         row.SetField("name", entity.name);
         row.SetField("shipto", entity.shipto);
         row.SetField("shipfm", entity.shipfm);
         row.SetField("duedt", entity.duedt);
         row.SetField("orderdt", entity.orderdt);
         row.SetField("createdt", entity.createdt);
         row.SetField("createtm", entity.createtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("setno", entity.setno);
         row.SetField("errormsg", entity.errormsg);
         row.SetField("wlehrecid", entity.wlehrecid);
         row.SetField("wlehrowid", entity.wlehrowid.ToByteArray());
         row.SetField("wletstatus", entity.wletstatus);
         row.SetField("cWLETstatus", entity.cWLETstatus);
         row.SetField("cWLETstatustype", entity.cWLETstatustype);
         row.SetField("cWLETProcessty", entity.cWLETProcessty);
         row.SetField("cWLETOrdertype", entity.cWLETOrdertype);
         row.SetField("cWLETUpdatetype", entity.cWLETUpdatetype);
         row.SetField("cWLETTranstype", entity.cWLETTranstype);
         row.SetField("cEDIShipmentID", entity.cEDIShipmentID);
         row.SetField("cEDIPackageID", entity.cEDIPackageID);
         row.SetField("lOtherRecords", entity.lOtherRecords);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
