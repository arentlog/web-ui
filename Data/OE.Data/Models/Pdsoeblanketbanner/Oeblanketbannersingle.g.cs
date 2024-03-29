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

namespace Infor.Sxe.OE.Data.Models.Pdsoeblanketbanner
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeblanketbanner.Oeblanketbannersingle")]
   public partial class Oeblanketbannersingle : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnotesfl { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string shiptonotesfl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string custpo { get; set; }
      [StringValidationAttribute]
      public string boflag { get; set; }
      [StringValidationAttribute]
      public string stage { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      public bool resetstagefl { get; set; }
      [StringValidationAttribute]
      public string openinit { get; set; }
      [StringValidationAttribute]
      public string saleswhse { get; set; }
      [StringValidationAttribute]
      public string arscrowid { get; set; }
      [StringValidationAttribute]
      public string arssrowid { get; set; }


      public static Oeblanketbannersingle BuildOeblanketbannersingleFromRow(DataRow row)
      {
         Oeblanketbannersingle entity = new Oeblanketbannersingle();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnotesfl = row.IsNull("custnotesfl") ? string.Empty : row.Field<string>("custnotesfl");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shiptonotesfl = row.IsNull("shiptonotesfl") ? string.Empty : row.Field<string>("shiptonotesfl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.custpo = row.IsNull("custpo") ? string.Empty : row.Field<string>("custpo");
         entity.boflag = row.IsNull("boflag") ? string.Empty : row.Field<string>("boflag");
         entity.stage = row.IsNull("stage") ? string.Empty : row.Field<string>("stage");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.resetstagefl = row.Field<bool>("resetstagefl");
         entity.openinit = row.IsNull("openinit") ? string.Empty : row.Field<string>("openinit");
         entity.saleswhse = row.IsNull("saleswhse") ? string.Empty : row.Field<string>("saleswhse");
         entity.arscrowid = row.Field<byte[]>("arscrowid").ToStringEncoded();
         entity.arssrowid = row.Field<byte[]>("arssrowid").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeblanketbannersingle(ref DataRow row, Oeblanketbannersingle entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("transtype", entity.transtype);
         row.SetField("custno", entity.custno);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("shipto", entity.shipto);
         row.SetField("shiptonotesfl", entity.shiptonotesfl);
         row.SetField("whse", entity.whse);
         row.SetField("custpo", entity.custpo);
         row.SetField("boflag", entity.boflag);
         row.SetField("stage", entity.stage);
         row.SetField("name", entity.name);
         row.SetField("resetstagefl", entity.resetstagefl);
         row.SetField("openinit", entity.openinit);
         row.SetField("saleswhse", entity.saleswhse);
         row.SetField("arscrowid", entity.arscrowid.ToByteArray());
         row.SetField("arssrowid", entity.arssrowid.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591
