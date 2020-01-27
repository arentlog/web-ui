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

namespace Infor.Sxe.KP.Data.Models.Pdscreatewolisttt
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdscreatewolisttt.Createwolistttcriteria")]
   public partial class Createwolistttcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string compprod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public DateTime? enterdt { get; set; }
      [StringValidationAttribute]
      public string stagecd { get; set; }
      [StringValidationAttribute]
      public string botype { get; set; }
      public int begwono { get; set; }
      [StringValidationAttribute]
      public string createdby { get; set; }
      public int recordcountlimit { get; set; }
      public int verno { get; set; }


      public static Createwolistttcriteria BuildCreatewolistttcriteriaFromRow(DataRow row)
      {
         Createwolistttcriteria entity = new Createwolistttcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.compprod = row.IsNull("compprod") ? string.Empty : row.Field<string>("compprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.stagecd = row.IsNull("stagecd") ? string.Empty : row.Field<string>("stagecd");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.begwono = row.IsNull("begwono") ? 0 : row.Field<int>("begwono");
         entity.createdby = row.IsNull("createdby") ? string.Empty : row.Field<string>("createdby");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCreatewolistttcriteria(ref DataRow row, Createwolistttcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("compprod", entity.compprod);
         row.SetField("whse", entity.whse);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("botype", entity.botype);
         row.SetField("begwono", entity.begwono);
         row.SetField("createdby", entity.createdby);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("verno", entity.verno);

      }
   
   }
}
#pragma warning restore 1591
