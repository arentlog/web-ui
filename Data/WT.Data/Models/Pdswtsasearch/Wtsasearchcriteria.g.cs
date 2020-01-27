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

namespace Infor.Sxe.WT.Data.Models.Pdswtsasearch
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtsasearch.Wtsasearchcriteria")]
   public partial class Wtsasearchcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string recordtype { get; set; }
      [StringValidationAttribute]
      public string shipfmwhse { get; set; }
      [StringValidationAttribute]
      public string shiptowhse { get; set; }
      public int cono2 { get; set; }
      [StringValidationAttribute]
      public string product { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string prodprctype { get; set; }
      [StringValidationAttribute]
      public string altprodgrp { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtsasearchcriteria BuildWtsasearchcriteriaFromRow(DataRow row)
      {
         Wtsasearchcriteria entity = new Wtsasearchcriteria();
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.shipfmwhse = row.IsNull("shipfmwhse") ? string.Empty : row.Field<string>("shipfmwhse");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.cono2 = row.IsNull("cono2") ? 0 : row.Field<int>("cono2");
         entity.product = row.IsNull("product") ? string.Empty : row.Field<string>("product");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodprctype = row.IsNull("prodprctype") ? string.Empty : row.Field<string>("prodprctype");
         entity.altprodgrp = row.IsNull("altprodgrp") ? string.Empty : row.Field<string>("altprodgrp");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtsasearchcriteria(ref DataRow row, Wtsasearchcriteria entity)
      {
         row.SetField("recordtype", entity.recordtype);
         row.SetField("shipfmwhse", entity.shipfmwhse);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("cono2", entity.cono2);
         row.SetField("product", entity.product);
         row.SetField("prodline", entity.prodline);
         row.SetField("vendno", entity.vendno);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodprctype", entity.prodprctype);
         row.SetField("altprodgrp", entity.altprodgrp);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591