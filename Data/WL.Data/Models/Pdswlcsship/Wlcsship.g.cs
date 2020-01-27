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

namespace Infor.Sxe.WL.Data.Models.Pdswlcsship
{
   [ModelName("Infor.Sxe.WL.Data.Models.Pdswlcsship.Wlcsship")]
   public partial class Wlcsship : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public bool ordervalid { get; set; }
      public bool twlvalid { get; set; }
      [StringValidationAttribute]
      public string displaymessage { get; set; }
      [StringValidationAttribute]
      public string promptmessage { get; set; }
      public bool promptresult { get; set; }
      public bool warningstatus { get; set; }
      [StringValidationAttribute]
      public string addr1 { get; set; }
      [StringValidationAttribute]
      public string addr2 { get; set; }
      [StringValidationAttribute]
      public string addr3 { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string zipCd { get; set; }
      [StringValidationAttribute]
      public string approvTy { get; set; }
      public bool blBoFl { get; set; }
      public decimal custNo { get; set; }
      [StringValidationAttribute]
      public string custPO { get; set; }
      [StringValidationAttribute]
      public string notesFl { get; set; }
      [StringValidationAttribute]
      public string orderDisp { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string shipToAddr1 { get; set; }
      [StringValidationAttribute]
      public string shipToAddr2 { get; set; }
      [StringValidationAttribute]
      public string shipToAddr3 { get; set; }
      [StringValidationAttribute]
      public string shipToCity { get; set; }
      [StringValidationAttribute]
      public string shipToName { get; set; }
      [StringValidationAttribute]
      public string shipToState { get; set; }
      [StringValidationAttribute]
      public string shipToZip { get; set; }
      [StringValidationAttribute]
      public string shipVia { get; set; }
      [StringValidationAttribute]
      public string slsRepIn { get; set; }
      [StringValidationAttribute]
      public string slsRepOut { get; set; }
      [StringValidationAttribute]
      public string stageCd { get; set; }
      [StringValidationAttribute]
      public string takenBy { get; set; }
      [StringValidationAttribute]
      public string termsTy { get; set; }
      [StringValidationAttribute]
      public string transType { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string wlStatus { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wlcsship BuildWlcsshipFromRow(DataRow row)
      {
         Wlcsship entity = new Wlcsship();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.ordervalid = row.Field<bool>("ordervalid");
         entity.twlvalid = row.Field<bool>("twlvalid");
         entity.displaymessage = row.IsNull("displaymessage") ? string.Empty : row.Field<string>("displaymessage");
         entity.promptmessage = row.IsNull("promptmessage") ? string.Empty : row.Field<string>("promptmessage");
         entity.promptresult = row.Field<bool>("promptresult");
         entity.warningstatus = row.Field<bool>("warningstatus");
         entity.addr1 = row.IsNull("Addr1") ? string.Empty : row.Field<string>("Addr1");
         entity.addr2 = row.IsNull("Addr2") ? string.Empty : row.Field<string>("Addr2");
         entity.addr3 = row.IsNull("Addr3") ? string.Empty : row.Field<string>("Addr3");
         entity.city = row.IsNull("City") ? string.Empty : row.Field<string>("City");
         entity.name = row.IsNull("Name") ? string.Empty : row.Field<string>("Name");
         entity.state = row.IsNull("State") ? string.Empty : row.Field<string>("State");
         entity.zipCd = row.IsNull("ZipCd") ? string.Empty : row.Field<string>("ZipCd");
         entity.approvTy = row.IsNull("ApprovTy") ? string.Empty : row.Field<string>("ApprovTy");
         entity.blBoFl = row.Field<bool>("BlBoFl");
         entity.custNo = row.IsNull("CustNo") ? decimal.Zero : row.Field<decimal>("CustNo");
         entity.custPO = row.IsNull("CustPO") ? string.Empty : row.Field<string>("CustPO");
         entity.notesFl = row.IsNull("NotesFl") ? string.Empty : row.Field<string>("NotesFl");
         entity.orderDisp = row.IsNull("OrderDisp") ? string.Empty : row.Field<string>("OrderDisp");
         entity.refer = row.IsNull("Refer") ? string.Empty : row.Field<string>("Refer");
         entity.shipToAddr1 = row.IsNull("ShipToAddr1") ? string.Empty : row.Field<string>("ShipToAddr1");
         entity.shipToAddr2 = row.IsNull("ShipToAddr2") ? string.Empty : row.Field<string>("ShipToAddr2");
         entity.shipToAddr3 = row.IsNull("ShipToAddr3") ? string.Empty : row.Field<string>("ShipToAddr3");
         entity.shipToCity = row.IsNull("ShipToCity") ? string.Empty : row.Field<string>("ShipToCity");
         entity.shipToName = row.IsNull("ShipToName") ? string.Empty : row.Field<string>("ShipToName");
         entity.shipToState = row.IsNull("ShipToState") ? string.Empty : row.Field<string>("ShipToState");
         entity.shipToZip = row.IsNull("ShipToZip") ? string.Empty : row.Field<string>("ShipToZip");
         entity.shipVia = row.IsNull("ShipVia") ? string.Empty : row.Field<string>("ShipVia");
         entity.slsRepIn = row.IsNull("SlsRepIn") ? string.Empty : row.Field<string>("SlsRepIn");
         entity.slsRepOut = row.IsNull("SlsRepOut") ? string.Empty : row.Field<string>("SlsRepOut");
         entity.stageCd = row.IsNull("StageCd") ? string.Empty : row.Field<string>("StageCd");
         entity.takenBy = row.IsNull("TakenBy") ? string.Empty : row.Field<string>("TakenBy");
         entity.termsTy = row.IsNull("TermsTy") ? string.Empty : row.Field<string>("TermsTy");
         entity.transType = row.IsNull("TransType") ? string.Empty : row.Field<string>("TransType");
         entity.whse = row.IsNull("Whse") ? string.Empty : row.Field<string>("Whse");
         entity.wlStatus = row.IsNull("WlStatus") ? string.Empty : row.Field<string>("WlStatus");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWlcsship(ref DataRow row, Wlcsship entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("ordervalid", entity.ordervalid);
         row.SetField("twlvalid", entity.twlvalid);
         row.SetField("displaymessage", entity.displaymessage);
         row.SetField("promptmessage", entity.promptmessage);
         row.SetField("promptresult", entity.promptresult);
         row.SetField("warningstatus", entity.warningstatus);
         row.SetField("Addr1", entity.addr1);
         row.SetField("Addr2", entity.addr2);
         row.SetField("Addr3", entity.addr3);
         row.SetField("City", entity.city);
         row.SetField("Name", entity.name);
         row.SetField("State", entity.state);
         row.SetField("ZipCd", entity.zipCd);
         row.SetField("ApprovTy", entity.approvTy);
         row.SetField("BlBoFl", entity.blBoFl);
         row.SetField("CustNo", entity.custNo);
         row.SetField("CustPO", entity.custPO);
         row.SetField("NotesFl", entity.notesFl);
         row.SetField("OrderDisp", entity.orderDisp);
         row.SetField("Refer", entity.refer);
         row.SetField("ShipToAddr1", entity.shipToAddr1);
         row.SetField("ShipToAddr2", entity.shipToAddr2);
         row.SetField("ShipToAddr3", entity.shipToAddr3);
         row.SetField("ShipToCity", entity.shipToCity);
         row.SetField("ShipToName", entity.shipToName);
         row.SetField("ShipToState", entity.shipToState);
         row.SetField("ShipToZip", entity.shipToZip);
         row.SetField("ShipVia", entity.shipVia);
         row.SetField("SlsRepIn", entity.slsRepIn);
         row.SetField("SlsRepOut", entity.slsRepOut);
         row.SetField("StageCd", entity.stageCd);
         row.SetField("TakenBy", entity.takenBy);
         row.SetField("TermsTy", entity.termsTy);
         row.SetField("TransType", entity.transType);
         row.SetField("Whse", entity.whse);
         row.SetField("WlStatus", entity.wlStatus);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
