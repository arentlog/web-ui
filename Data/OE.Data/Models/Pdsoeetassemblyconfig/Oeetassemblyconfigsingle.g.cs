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

namespace Infor.Sxe.OE.Data.Models.Pdsoeetassemblyconfig
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeetassemblyconfig.Oeetassemblyconfigsingle")]
   public partial class Oeetassemblyconfigsingle : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string vawhse { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public bool btnokenabled { get; set; }
      public int numsegments { get; set; }
      public int verno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeetassemblyconfigsingle BuildOeetassemblyconfigsingleFromRow(DataRow row)
      {
         Oeetassemblyconfigsingle entity = new Oeetassemblyconfigsingle();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.vawhse = row.IsNull("vawhse") ? string.Empty : row.Field<string>("vawhse");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.btnokenabled = row.Field<bool>("btnokenabled");
         entity.numsegments = row.IsNull("numsegments") ? 0 : row.Field<int>("numsegments");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeetassemblyconfigsingle(ref DataRow row, Oeetassemblyconfigsingle entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("vawhse", entity.vawhse);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("btnokenabled", entity.btnokenabled);
         row.SetField("numsegments", entity.numsegments);
         row.SetField("verno", entity.verno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591