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

namespace Infor.Sxe.IC.Data.Models.Pdsicspcaddchg
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicspcaddchg.Icspcaddchg")]
   public partial class Icspcaddchg : ModelBase, IUserFields
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string updatetype { get; set; }
      [StringValidationAttribute]
      public string recordtype { get; set; }
      [StringValidationAttribute]
      public string srcrowpointer { get; set; }
      [StringValidationAttribute]
      public string setuptype { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string shiptogrp { get; set; }
      public bool shiptogrpfl { get; set; }
      public DateTime? startdt { get; set; }
      public DateTime? expiredt { get; set; }
      public bool activefl { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public int fillpriority { get; set; }
      public bool fillpriorityfl { get; set; }
      public DateTime? createdt { get; set; }
      public int expectedratepct { get; set; }
      public bool expectedratepctfl { get; set; }
      [StringValidationAttribute]
      public string expiredusagetype { get; set; }
      public bool expiredusagetypefl { get; set; }
      [StringValidationAttribute]
      public string copyusage { get; set; }
      public bool copyusagefl { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user3 { get; set; }
      [StringValidationAttribute]
      public string user4 { get; set; }
      [StringValidationAttribute]
      public string user5 { get; set; }
      public decimal? user6 { get; set; }
      public decimal? user7 { get; set; }
      public DateTime? user8 { get; set; }
      public DateTime? user9 { get; set; }
      [StringValidationAttribute]
      public string icspcRowpointer { get; set; }
      public bool copydetailfl { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icspcaddchg BuildIcspcaddchgFromRow(DataRow row)
      {
         Icspcaddchg entity = new Icspcaddchg();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.updatetype = row.IsNull("updatetype") ? string.Empty : row.Field<string>("updatetype");
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.srcrowpointer = row.IsNull("srcrowpointer") ? string.Empty : row.Field<string>("srcrowpointer");
         entity.setuptype = row.IsNull("setuptype") ? string.Empty : row.Field<string>("setuptype");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shiptogrp = row.IsNull("shiptogrp") ? string.Empty : row.Field<string>("shiptogrp");
         entity.shiptogrpfl = row.Field<bool>("shiptogrpfl");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.expiredt = row.Field<DateTime?>("expiredt");
         entity.activefl = row.Field<bool>("activefl");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.fillpriority = row.IsNull("fillpriority") ? 0 : row.Field<int>("fillpriority");
         entity.fillpriorityfl = row.Field<bool>("fillpriorityfl");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.expectedratepct = row.IsNull("expectedratepct") ? 0 : row.Field<int>("expectedratepct");
         entity.expectedratepctfl = row.Field<bool>("expectedratepctfl");
         entity.expiredusagetype = row.IsNull("expiredusagetype") ? string.Empty : row.Field<string>("expiredusagetype");
         entity.expiredusagetypefl = row.Field<bool>("expiredusagetypefl");
         entity.copyusage = row.IsNull("copyusage") ? string.Empty : row.Field<string>("copyusage");
         entity.copyusagefl = row.Field<bool>("copyusagefl");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.icspcRowpointer = row.IsNull("icspc-rowpointer") ? string.Empty : row.Field<string>("icspc-rowpointer");
         entity.copydetailfl = row.Field<bool>("copydetailfl");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcspcaddchg(ref DataRow row, Icspcaddchg entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("updatetype", entity.updatetype);
         row.SetField("recordtype", entity.recordtype);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("setuptype", entity.setuptype);
         row.SetField("whse", entity.whse);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("shiptogrp", entity.shiptogrp);
         row.SetField("shiptogrpfl", entity.shiptogrpfl);
         row.SetField("startdt", entity.startdt);
         row.SetField("expiredt", entity.expiredt);
         row.SetField("activefl", entity.activefl);
         row.SetField("contractno", entity.contractno);
         row.SetField("refer", entity.refer);
         row.SetField("fillpriority", entity.fillpriority);
         row.SetField("fillpriorityfl", entity.fillpriorityfl);
         row.SetField("createdt", entity.createdt);
         row.SetField("expectedratepct", entity.expectedratepct);
         row.SetField("expectedratepctfl", entity.expectedratepctfl);
         row.SetField("expiredusagetype", entity.expiredusagetype);
         row.SetField("expiredusagetypefl", entity.expiredusagetypefl);
         row.SetField("copyusage", entity.copyusage);
         row.SetField("copyusagefl", entity.copyusagefl);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("icspc-rowpointer", entity.icspcRowpointer);
         row.SetField("copydetailfl", entity.copydetailfl);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591