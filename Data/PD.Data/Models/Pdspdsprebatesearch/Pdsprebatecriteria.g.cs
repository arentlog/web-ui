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

namespace Infor.Sxe.PD.Data.Models.Pdspdsprebatesearch
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdsprebatesearch.Pdsprebatecriteria")]
   public partial class Pdsprebatecriteria : ModelBase
   {
      [StringValidationAttribute]
      public string clevelcd { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal vendno { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string rebtype { get; set; }
      [StringValidationAttribute]
      public string rebsubty { get; set; }
      [StringValidationAttribute]
      public string rebcustty { get; set; }
      [StringValidationAttribute]
      public string prodpricety { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string rebatecd { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public DateTime? startdt { get; set; }
      [StringValidationAttribute]
      public string shiptype { get; set; }
      public bool expiredfl { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      public int contractline { get; set; }
      public bool lUseContractvfl { get; set; }
      public int pdrecno { get; set; }
      public decimal price { get; set; }
      [StringValidationAttribute]
      public string prccurrencyty { get; set; }
      public bool lUsePricevfl { get; set; }
      public int iRecordlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsprebatecriteria BuildPdsprebatecriteriaFromRow(DataRow row)
      {
         Pdsprebatecriteria entity = new Pdsprebatecriteria();
         entity.clevelcd = row.IsNull("clevelcd") ? string.Empty : row.Field<string>("clevelcd");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.rebtype = row.IsNull("rebtype") ? string.Empty : row.Field<string>("rebtype");
         entity.rebsubty = row.IsNull("rebsubty") ? string.Empty : row.Field<string>("rebsubty");
         entity.rebcustty = row.IsNull("rebcustty") ? string.Empty : row.Field<string>("rebcustty");
         entity.prodpricety = row.IsNull("prodpricety") ? string.Empty : row.Field<string>("prodpricety");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.rebatecd = row.IsNull("rebatecd") ? string.Empty : row.Field<string>("rebatecd");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.shiptype = row.IsNull("shiptype") ? string.Empty : row.Field<string>("shiptype");
         entity.expiredfl = row.Field<bool>("expiredfl");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.contractline = row.IsNull("contractline") ? 0 : row.Field<int>("contractline");
         entity.lUseContractvfl = row.Field<bool>("lUseContractvfl");
         entity.pdrecno = row.IsNull("pdrecno") ? 0 : row.Field<int>("pdrecno");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.prccurrencyty = row.IsNull("prccurrencyty") ? string.Empty : row.Field<string>("prccurrencyty");
         entity.lUsePricevfl = row.Field<bool>("lUsePricevfl");
         entity.iRecordlimit = row.IsNull("iRecordlimit") ? 0 : row.Field<int>("iRecordlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsprebatecriteria(ref DataRow row, Pdsprebatecriteria entity)
      {
         row.SetField("clevelcd", entity.clevelcd);
         row.SetField("prod", entity.prod);
         row.SetField("vendno", entity.vendno);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("rebtype", entity.rebtype);
         row.SetField("rebsubty", entity.rebsubty);
         row.SetField("rebcustty", entity.rebcustty);
         row.SetField("prodpricety", entity.prodpricety);
         row.SetField("prodline", entity.prodline);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("rebatecd", entity.rebatecd);
         row.SetField("whse", entity.whse);
         row.SetField("startdt", entity.startdt);
         row.SetField("shiptype", entity.shiptype);
         row.SetField("expiredfl", entity.expiredfl);
         row.SetField("contractno", entity.contractno);
         row.SetField("contractline", entity.contractline);
         row.SetField("lUseContractvfl", entity.lUseContractvfl);
         row.SetField("pdrecno", entity.pdrecno);
         row.SetField("price", entity.price);
         row.SetField("prccurrencyty", entity.prccurrencyty);
         row.SetField("lUsePricevfl", entity.lUsePricevfl);
         row.SetField("iRecordlimit", entity.iRecordlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591