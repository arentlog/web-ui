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

namespace Infor.Sxe.IC.Data.Models.Pdsiceanchgbinloccheck
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceanchgbinloccheck.Iceanchgbinloccheckresults")]
   public partial class Iceanchgbinloccheckresults : ModelBase
   {
      public bool oeprompt { get; set; }
      [StringValidationAttribute]
      public string oepromptmess { get; set; }
      public bool wtprompt { get; set; }
      [StringValidationAttribute]
      public string wtpromptmess { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceanchgbinloccheckresults BuildIceanchgbinloccheckresultsFromRow(DataRow row)
      {
         Iceanchgbinloccheckresults entity = new Iceanchgbinloccheckresults();
         entity.oeprompt = row.Field<bool>("oeprompt");
         entity.oepromptmess = row.IsNull("oepromptmess") ? string.Empty : row.Field<string>("oepromptmess");
         entity.wtprompt = row.Field<bool>("wtprompt");
         entity.wtpromptmess = row.IsNull("wtpromptmess") ? string.Empty : row.Field<string>("wtpromptmess");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceanchgbinloccheckresults(ref DataRow row, Iceanchgbinloccheckresults entity)
      {
         row.SetField("oeprompt", entity.oeprompt);
         row.SetField("oepromptmess", entity.oepromptmess);
         row.SetField("wtprompt", entity.wtprompt);
         row.SetField("wtpromptmess", entity.wtpromptmess);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
