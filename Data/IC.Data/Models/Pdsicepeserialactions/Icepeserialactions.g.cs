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

namespace Infor.Sxe.IC.Data.Models.Pdsicepeserialactions
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicepeserialactions.Icepeserialactions")]
   public partial class Icepeserialactions : ModelBase
   {
      public int cono { get; set; }
      public int runno { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string serialno { get; set; }
      public bool unavailfl { get; set; }
      [StringValidationAttribute]
      public string rectype { get; set; }
      [StringValidationAttribute]
      public string incfl { get; set; }
      [StringValidationAttribute]
      public string binloc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icepeserialactions BuildIcepeserialactionsFromRow(DataRow row)
      {
         Icepeserialactions entity = new Icepeserialactions();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.runno = row.IsNull("runno") ? 0 : row.Field<int>("runno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.serialno = row.IsNull("serialno") ? string.Empty : row.Field<string>("serialno");
         entity.unavailfl = row.Field<bool>("unavailfl");
         entity.rectype = row.IsNull("rectype") ? string.Empty : row.Field<string>("rectype");
         entity.incfl = row.IsNull("incfl") ? string.Empty : row.Field<string>("incfl");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcepeserialactions(ref DataRow row, Icepeserialactions entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("runno", entity.runno);
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("serialno", entity.serialno);
         row.SetField("unavailfl", entity.unavailfl);
         row.SetField("rectype", entity.rectype);
         row.SetField("incfl", entity.incfl);
         row.SetField("binloc", entity.binloc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
