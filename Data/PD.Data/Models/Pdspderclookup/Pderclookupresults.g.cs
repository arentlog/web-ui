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

namespace Infor.Sxe.PD.Data.Models.Pdspderclookup
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspderclookup.Pderclookupresults")]
   public partial class Pderclookupresults : ModelBase
   {
      public int claimno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendnotes { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      public DateTime? claimDate { get; set; }
      public decimal claimAmount { get; set; }
      [StringValidationAttribute]
      public string claimType { get; set; }
      [StringValidationAttribute]
      public string currencyty { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pderclookupresults BuildPderclookupresultsFromRow(DataRow row)
      {
         Pderclookupresults entity = new Pderclookupresults();
         entity.claimno = row.IsNull("claimno") ? 0 : row.Field<int>("claimno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendnotes = row.IsNull("vendnotes") ? string.Empty : row.Field<string>("vendnotes");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.claimDate = row.Field<DateTime?>("claimDate");
         entity.claimAmount = row.IsNull("claimAmount") ? decimal.Zero : row.Field<decimal>("claimAmount");
         entity.claimType = row.IsNull("claimType") ? string.Empty : row.Field<string>("claimType");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPderclookupresults(ref DataRow row, Pderclookupresults entity)
      {
         row.SetField("claimno", entity.claimno);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendnotes", entity.vendnotes);
         row.SetField("statustype", entity.statustype);
         row.SetField("claimDate", entity.claimDate);
         row.SetField("claimAmount", entity.claimAmount);
         row.SetField("claimType", entity.claimType);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591