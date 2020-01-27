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

namespace Infor.Sxe.IC.Data.Models.Pdsicsprsrcsearch
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsprsrcsearch.Icsprsrcsearchcriteria")]
   public partial class Icsprsrcsearchcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string restricttype { get; set; }
      [StringValidationAttribute]
      public string product { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public DateTime? startdt { get; set; }
      [StringValidationAttribute]
      public string statuscd { get; set; }
      public bool restrictovrfl { get; set; }
      public int recordlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsprsrcsearchcriteria BuildIcsprsrcsearchcriteriaFromRow(DataRow row)
      {
         Icsprsrcsearchcriteria entity = new Icsprsrcsearchcriteria();
         entity.restricttype = row.IsNull("restricttype") ? string.Empty : row.Field<string>("restricttype");
         entity.product = row.IsNull("product") ? string.Empty : row.Field<string>("product");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.statuscd = row.IsNull("statuscd") ? string.Empty : row.Field<string>("statuscd");
         entity.restrictovrfl = row.Field<bool>("restrictovrfl");
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsprsrcsearchcriteria(ref DataRow row, Icsprsrcsearchcriteria entity)
      {
         row.SetField("restricttype", entity.restricttype);
         row.SetField("product", entity.product);
         row.SetField("prodline", entity.prodline);
         row.SetField("vendno", entity.vendno);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("whse", entity.whse);
         row.SetField("startdt", entity.startdt);
         row.SetField("statuscd", entity.statuscd);
         row.SetField("restrictovrfl", entity.restrictovrfl);
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591