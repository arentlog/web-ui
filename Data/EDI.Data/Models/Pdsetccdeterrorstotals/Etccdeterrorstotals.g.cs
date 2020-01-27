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

namespace Infor.Sxe.EDI.Data.Models.Pdsetccdeterrorstotals
{
   [ModelName("Infor.Sxe.EDI.Data.Models.Pdsetccdeterrorstotals.Etccdeterrorstotals")]
   public partial class Etccdeterrorstotals : ModelBase
   {
      public int toterr { get; set; }
      public int tothdrerr { get; set; }
      public int totlnerr { get; set; }
      public int totexc { get; set; }
      public int tothdrexc { get; set; }
      public int totlnexc { get; set; }
      public int totinf { get; set; }
      public int tothdrinf { get; set; }
      public int totlninf { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Etccdeterrorstotals BuildEtccdeterrorstotalsFromRow(DataRow row)
      {
         Etccdeterrorstotals entity = new Etccdeterrorstotals();
         entity.toterr = row.IsNull("toterr") ? 0 : row.Field<int>("toterr");
         entity.tothdrerr = row.IsNull("tothdrerr") ? 0 : row.Field<int>("tothdrerr");
         entity.totlnerr = row.IsNull("totlnerr") ? 0 : row.Field<int>("totlnerr");
         entity.totexc = row.IsNull("totexc") ? 0 : row.Field<int>("totexc");
         entity.tothdrexc = row.IsNull("tothdrexc") ? 0 : row.Field<int>("tothdrexc");
         entity.totlnexc = row.IsNull("totlnexc") ? 0 : row.Field<int>("totlnexc");
         entity.totinf = row.IsNull("totinf") ? 0 : row.Field<int>("totinf");
         entity.tothdrinf = row.IsNull("tothdrinf") ? 0 : row.Field<int>("tothdrinf");
         entity.totlninf = row.IsNull("totlninf") ? 0 : row.Field<int>("totlninf");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEtccdeterrorstotals(ref DataRow row, Etccdeterrorstotals entity)
      {
         row.SetField("toterr", entity.toterr);
         row.SetField("tothdrerr", entity.tothdrerr);
         row.SetField("totlnerr", entity.totlnerr);
         row.SetField("totexc", entity.totexc);
         row.SetField("tothdrexc", entity.tothdrexc);
         row.SetField("totlnexc", entity.totlnexc);
         row.SetField("totinf", entity.totinf);
         row.SetField("tothdrinf", entity.tothdrinf);
         row.SetField("totlninf", entity.totlninf);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
