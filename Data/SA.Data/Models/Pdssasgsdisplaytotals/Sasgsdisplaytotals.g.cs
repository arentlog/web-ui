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

namespace Infor.Sxe.SA.Data.Models.Pdssasgsdisplaytotals
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasgsdisplaytotals.Sasgsdisplaytotals")]
   public partial class Sasgsdisplaytotals : ModelBase
   {
      [StringValidationAttribute]
      public string sasgmRowid { get; set; }
      [StringValidationAttribute]
      public string otherTot { get; set; }
      public bool otherTothidden { get; set; }
      [StringValidationAttribute]
      public string cityTot { get; set; }
      public bool cityTothidden { get; set; }
      [StringValidationAttribute]
      public string countyTot { get; set; }
      public bool countyTothidden { get; set; }
      [StringValidationAttribute]
      public string stateTot { get; set; }
      public bool stateTothidden { get; set; }
      [StringValidationAttribute]
      public string federalTot { get; set; }
      public bool federalTothidden { get; set; }
      [StringValidationAttribute]
      public string totalTot { get; set; }
      public bool totalTothidden { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasgsdisplaytotals BuildSasgsdisplaytotalsFromRow(DataRow row)
      {
         Sasgsdisplaytotals entity = new Sasgsdisplaytotals();
         entity.sasgmRowid = row.Field<byte[]>("sasgm-rowid").ToStringEncoded();
         entity.otherTot = row.IsNull("other-tot") ? string.Empty : row.Field<string>("other-tot");
         entity.otherTothidden = row.Field<bool>("other-tothidden");
         entity.cityTot = row.IsNull("city-tot") ? string.Empty : row.Field<string>("city-tot");
         entity.cityTothidden = row.Field<bool>("city-tothidden");
         entity.countyTot = row.IsNull("county-tot") ? string.Empty : row.Field<string>("county-tot");
         entity.countyTothidden = row.Field<bool>("county-tothidden");
         entity.stateTot = row.IsNull("state-tot") ? string.Empty : row.Field<string>("state-tot");
         entity.stateTothidden = row.Field<bool>("state-tothidden");
         entity.federalTot = row.IsNull("federal-tot") ? string.Empty : row.Field<string>("federal-tot");
         entity.federalTothidden = row.Field<bool>("federal-tothidden");
         entity.totalTot = row.IsNull("total-tot") ? string.Empty : row.Field<string>("total-tot");
         entity.totalTothidden = row.Field<bool>("total-tothidden");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasgsdisplaytotals(ref DataRow row, Sasgsdisplaytotals entity)
      {
         row.SetField("sasgm-rowid", entity.sasgmRowid.ToByteArray());
         row.SetField("other-tot", entity.otherTot);
         row.SetField("other-tothidden", entity.otherTothidden);
         row.SetField("city-tot", entity.cityTot);
         row.SetField("city-tothidden", entity.cityTothidden);
         row.SetField("county-tot", entity.countyTot);
         row.SetField("county-tothidden", entity.countyTothidden);
         row.SetField("state-tot", entity.stateTot);
         row.SetField("state-tothidden", entity.stateTothidden);
         row.SetField("federal-tot", entity.federalTot);
         row.SetField("federal-tothidden", entity.federalTothidden);
         row.SetField("total-tot", entity.totalTot);
         row.SetField("total-tothidden", entity.totalTothidden);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591