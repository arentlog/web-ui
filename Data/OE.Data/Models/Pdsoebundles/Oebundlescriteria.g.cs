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

namespace Infor.Sxe.OE.Data.Models.Pdsoebundles
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoebundles.Oebundlescriteria")]
   public partial class Oebundlescriteria : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public bool inquirefl { get; set; }
      [StringValidationAttribute]
      public string functionname { get; set; }
      public decimal qtyreq { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string units { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public decimal price { get; set; }
      [StringValidationAttribute]
      public string bundleid { get; set; }
      public int iSecurity { get; set; }
      public bool setprevfl { get; set; }
      public bool getbundlefl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oebundlescriteria BuildOebundlescriteriaFromRow(DataRow row)
      {
         Oebundlescriteria entity = new Oebundlescriteria();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.inquirefl = row.Field<bool>("inquirefl");
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.qtyreq = row.IsNull("qtyreq") ? decimal.Zero : row.Field<decimal>("qtyreq");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.units = row.IsNull("units") ? string.Empty : row.Field<string>("units");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.bundleid = row.IsNull("bundleid") ? string.Empty : row.Field<string>("bundleid");
         entity.iSecurity = row.IsNull("iSecurity") ? 0 : row.Field<int>("iSecurity");
         entity.setprevfl = row.Field<bool>("setprevfl");
         entity.getbundlefl = row.Field<bool>("getbundlefl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOebundlescriteria(ref DataRow row, Oebundlescriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("inquirefl", entity.inquirefl);
         row.SetField("functionname", entity.functionname);
         row.SetField("qtyreq", entity.qtyreq);
         row.SetField("prod", entity.prod);
         row.SetField("units", entity.units);
         row.SetField("whse", entity.whse);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("price", entity.price);
         row.SetField("bundleid", entity.bundleid);
         row.SetField("iSecurity", entity.iSecurity);
         row.SetField("setprevfl", entity.setprevfl);
         row.SetField("getbundlefl", entity.getbundlefl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
