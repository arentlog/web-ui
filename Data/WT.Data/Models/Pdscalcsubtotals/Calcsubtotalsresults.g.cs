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

namespace Infor.Sxe.WT.Data.Models.Pdscalcsubtotals
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdscalcsubtotals.Calcsubtotalsresults")]
   public partial class Calcsubtotalsresults : ModelBase
   {
      public decimal totqtyord { get; set; }
      public decimal totqtyshp { get; set; }
      public decimal totlineamt { get; set; }
      public decimal totweight { get; set; }
      public decimal totcubes { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Calcsubtotalsresults BuildCalcsubtotalsresultsFromRow(DataRow row)
      {
         Calcsubtotalsresults entity = new Calcsubtotalsresults();
         entity.totqtyord = row.IsNull("totqtyord") ? decimal.Zero : row.Field<decimal>("totqtyord");
         entity.totqtyshp = row.IsNull("totqtyshp") ? decimal.Zero : row.Field<decimal>("totqtyshp");
         entity.totlineamt = row.IsNull("totlineamt") ? decimal.Zero : row.Field<decimal>("totlineamt");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.totcubes = row.IsNull("totcubes") ? decimal.Zero : row.Field<decimal>("totcubes");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCalcsubtotalsresults(ref DataRow row, Calcsubtotalsresults entity)
      {
         row.SetField("totqtyord", entity.totqtyord);
         row.SetField("totqtyshp", entity.totqtyshp);
         row.SetField("totlineamt", entity.totlineamt);
         row.SetField("totweight", entity.totweight);
         row.SetField("totcubes", entity.totcubes);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
