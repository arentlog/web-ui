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

namespace Infor.Sxe.AR.Data.Models.Pdscustpmtsdisplay
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdscustpmtsdisplay.Custpmtsdisplayresults")]
   public partial class Custpmtsdisplayresults : ModelBase
   {
      public decimal currbal { get; set; }
      public decimal pastbal { get; set; }
      public decimal pastpct { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Custpmtsdisplayresults BuildCustpmtsdisplayresultsFromRow(DataRow row)
      {
         Custpmtsdisplayresults entity = new Custpmtsdisplayresults();
         entity.currbal = row.IsNull("currbal") ? decimal.Zero : row.Field<decimal>("currbal");
         entity.pastbal = row.IsNull("pastbal") ? decimal.Zero : row.Field<decimal>("pastbal");
         entity.pastpct = row.IsNull("pastpct") ? decimal.Zero : row.Field<decimal>("pastpct");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCustpmtsdisplayresults(ref DataRow row, Custpmtsdisplayresults entity)
      {
         row.SetField("currbal", entity.currbal);
         row.SetField("pastbal", entity.pastbal);
         row.SetField("pastpct", entity.pastpct);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
