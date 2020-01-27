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

namespace Infor.Sxe.IC.Data.Models.Pdsiceavdetail
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceavdetail.Iceavdetail")]
   public partial class Iceavdetail : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string whseName { get; set; }
      [StringValidationAttribute]
      public string origprod { get; set; }
      [StringValidationAttribute]
      public string origdescrip { get; set; }
      [StringValidationAttribute]
      public string coredescrip { get; set; }
      [StringValidationAttribute]
      public string coreprod { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendname { get; set; }
      public decimal qtyimply { get; set; }
      public decimal qtyoh { get; set; }
      public decimal qtywarr { get; set; }
      [StringValidationAttribute]
      public string iceavRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceavdetail BuildIceavdetailFromRow(DataRow row)
      {
         Iceavdetail entity = new Iceavdetail();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.whseName = row.IsNull("WhseName") ? string.Empty : row.Field<string>("WhseName");
         entity.origprod = row.IsNull("origprod") ? string.Empty : row.Field<string>("origprod");
         entity.origdescrip = row.IsNull("origdescrip") ? string.Empty : row.Field<string>("origdescrip");
         entity.coredescrip = row.IsNull("coredescrip") ? string.Empty : row.Field<string>("coredescrip");
         entity.coreprod = row.IsNull("coreprod") ? string.Empty : row.Field<string>("coreprod");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendname = row.IsNull("vendname") ? string.Empty : row.Field<string>("vendname");
         entity.qtyimply = row.IsNull("qtyimply") ? decimal.Zero : row.Field<decimal>("qtyimply");
         entity.qtyoh = row.IsNull("qtyoh") ? decimal.Zero : row.Field<decimal>("qtyoh");
         entity.qtywarr = row.IsNull("qtywarr") ? decimal.Zero : row.Field<decimal>("qtywarr");
         entity.iceavRowid = row.Field<byte[]>("iceav-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceavdetail(ref DataRow row, Iceavdetail entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("WhseName", entity.whseName);
         row.SetField("origprod", entity.origprod);
         row.SetField("origdescrip", entity.origdescrip);
         row.SetField("coredescrip", entity.coredescrip);
         row.SetField("coreprod", entity.coreprod);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendname", entity.vendname);
         row.SetField("qtyimply", entity.qtyimply);
         row.SetField("qtyoh", entity.qtyoh);
         row.SetField("qtywarr", entity.qtywarr);
         row.SetField("iceav-rowid", entity.iceavRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
