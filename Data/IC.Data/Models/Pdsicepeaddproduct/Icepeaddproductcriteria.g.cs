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

namespace Infor.Sxe.IC.Data.Models.Pdsicepeaddproduct
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicepeaddproduct.Icepeaddproductcriteria")]
   public partial class Icepeaddproductcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      public int runno { get; set; }
      public int ticketno { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string binloc { get; set; }
      public decimal qtyexp { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public bool unavailfl { get; set; }
      public bool diffbinconfirm { get; set; }
      public bool anothercountconfirm { get; set; }
      public bool createbinconfirm { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icepeaddproductcriteria BuildIcepeaddproductcriteriaFromRow(DataRow row)
      {
         Icepeaddproductcriteria entity = new Icepeaddproductcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.runno = row.IsNull("runno") ? 0 : row.Field<int>("runno");
         entity.ticketno = row.IsNull("ticketno") ? 0 : row.Field<int>("ticketno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.qtyexp = row.IsNull("qtyexp") ? decimal.Zero : row.Field<decimal>("qtyexp");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.unavailfl = row.Field<bool>("unavailfl");
         entity.diffbinconfirm = row.Field<bool>("diffbinconfirm");
         entity.anothercountconfirm = row.Field<bool>("anothercountconfirm");
         entity.createbinconfirm = row.Field<bool>("createbinconfirm");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcepeaddproductcriteria(ref DataRow row, Icepeaddproductcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("runno", entity.runno);
         row.SetField("ticketno", entity.ticketno);
         row.SetField("prod", entity.prod);
         row.SetField("binloc", entity.binloc);
         row.SetField("qtyexp", entity.qtyexp);
         row.SetField("unit", entity.unit);
         row.SetField("unavailfl", entity.unavailfl);
         row.SetField("diffbinconfirm", entity.diffbinconfirm);
         row.SetField("anothercountconfirm", entity.anothercountconfirm);
         row.SetField("createbinconfirm", entity.createbinconfirm);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591