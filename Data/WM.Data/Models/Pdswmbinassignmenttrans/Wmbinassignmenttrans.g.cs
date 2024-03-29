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

namespace Infor.Sxe.WM.Data.Models.Pdswmbinassignmenttrans
{
   [ModelName("Infor.Sxe.WM.Data.Models.Pdswmbinassignmenttrans.Wmbinassignmenttrans")]
   public partial class Wmbinassignmenttrans : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string binloc { get; set; }
      public decimal stockqty { get; set; }
      public decimal stockqtyprev { get; set; }
      public decimal stockqtyorig { get; set; }
      [StringValidationAttribute]
      public string stockunit { get; set; }
      public decimal buysellqty { get; set; }
      public decimal buysellqtyprev { get; set; }
      [StringValidationAttribute]
      public string buysellunit { get; set; }
      public decimal convv { get; set; }
      [StringValidationAttribute]
      public string cerrormessage { get; set; }
      public bool buysellqtyenabled { get; set; }
      [StringValidationAttribute]
      public string wmetrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wmbinassignmenttrans BuildWmbinassignmenttransFromRow(DataRow row)
      {
         Wmbinassignmenttrans entity = new Wmbinassignmenttrans();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.stockqty = row.IsNull("stockqty") ? decimal.Zero : row.Field<decimal>("stockqty");
         entity.stockqtyprev = row.IsNull("stockqtyprev") ? decimal.Zero : row.Field<decimal>("stockqtyprev");
         entity.stockqtyorig = row.IsNull("stockqtyorig") ? decimal.Zero : row.Field<decimal>("stockqtyorig");
         entity.stockunit = row.IsNull("stockunit") ? string.Empty : row.Field<string>("stockunit");
         entity.buysellqty = row.IsNull("buysellqty") ? decimal.Zero : row.Field<decimal>("buysellqty");
         entity.buysellqtyprev = row.IsNull("buysellqtyprev") ? decimal.Zero : row.Field<decimal>("buysellqtyprev");
         entity.buysellunit = row.IsNull("buysellunit") ? string.Empty : row.Field<string>("buysellunit");
         entity.convv = row.IsNull("convv") ? decimal.Zero : row.Field<decimal>("convv");
         entity.cerrormessage = row.IsNull("cerrormessage") ? string.Empty : row.Field<string>("cerrormessage");
         entity.buysellqtyenabled = row.Field<bool>("buysellqtyenabled");
         entity.wmetrowid = row.Field<byte[]>("wmetrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWmbinassignmenttrans(ref DataRow row, Wmbinassignmenttrans entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("binloc", entity.binloc);
         row.SetField("stockqty", entity.stockqty);
         row.SetField("stockqtyprev", entity.stockqtyprev);
         row.SetField("stockqtyorig", entity.stockqtyorig);
         row.SetField("stockunit", entity.stockunit);
         row.SetField("buysellqty", entity.buysellqty);
         row.SetField("buysellqtyprev", entity.buysellqtyprev);
         row.SetField("buysellunit", entity.buysellunit);
         row.SetField("convv", entity.convv);
         row.SetField("cerrormessage", entity.cerrormessage);
         row.SetField("buysellqtyenabled", entity.buysellqtyenabled);
         row.SetField("wmetrowid", entity.wmetrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
