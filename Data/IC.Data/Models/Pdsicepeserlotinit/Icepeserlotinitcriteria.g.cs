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

namespace Infor.Sxe.IC.Data.Models.Pdsicepeserlotinit
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicepeserlotinit.Icepeserlotinitcriteria")]
   public partial class Icepeserlotinitcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      public int runno { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public bool unavailfl { get; set; }
      public decimal qtycnt { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public int ticketno { get; set; }
      public bool adjustfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icepeserlotinitcriteria BuildIcepeserlotinitcriteriaFromRow(DataRow row)
      {
         Icepeserlotinitcriteria entity = new Icepeserlotinitcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.runno = row.IsNull("runno") ? 0 : row.Field<int>("runno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.unavailfl = row.Field<bool>("unavailfl");
         entity.qtycnt = row.IsNull("qtycnt") ? decimal.Zero : row.Field<decimal>("qtycnt");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.ticketno = row.IsNull("ticketno") ? 0 : row.Field<int>("ticketno");
         entity.adjustfl = row.Field<bool>("adjustfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcepeserlotinitcriteria(ref DataRow row, Icepeserlotinitcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("runno", entity.runno);
         row.SetField("prod", entity.prod);
         row.SetField("unavailfl", entity.unavailfl);
         row.SetField("qtycnt", entity.qtycnt);
         row.SetField("unit", entity.unit);
         row.SetField("ticketno", entity.ticketno);
         row.SetField("adjustfl", entity.adjustfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591