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

namespace Infor.Sxe.AP.Data.Models.Pdsapeiinvdettermstotals
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeiinvdettermstotals.Apeiinvdettermstotals")]
   public partial class Apeiinvdettermstotals : ModelBase
   {
      public decimal proofinvamt { get; set; }
      public decimal proofinvpay { get; set; }
      public decimal proofinvremain { get; set; }
      public decimal prooforigdisc { get; set; }
      public decimal proofdiscpay { get; set; }
      public decimal proofdiscremain { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeiinvdettermstotals BuildApeiinvdettermstotalsFromRow(DataRow row)
      {
         Apeiinvdettermstotals entity = new Apeiinvdettermstotals();
         entity.proofinvamt = row.IsNull("proofinvamt") ? decimal.Zero : row.Field<decimal>("proofinvamt");
         entity.proofinvpay = row.IsNull("proofinvpay") ? decimal.Zero : row.Field<decimal>("proofinvpay");
         entity.proofinvremain = row.IsNull("proofinvremain") ? decimal.Zero : row.Field<decimal>("proofinvremain");
         entity.prooforigdisc = row.IsNull("prooforigdisc") ? decimal.Zero : row.Field<decimal>("prooforigdisc");
         entity.proofdiscpay = row.IsNull("proofdiscpay") ? decimal.Zero : row.Field<decimal>("proofdiscpay");
         entity.proofdiscremain = row.IsNull("proofdiscremain") ? decimal.Zero : row.Field<decimal>("proofdiscremain");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeiinvdettermstotals(ref DataRow row, Apeiinvdettermstotals entity)
      {
         row.SetField("proofinvamt", entity.proofinvamt);
         row.SetField("proofinvpay", entity.proofinvpay);
         row.SetField("proofinvremain", entity.proofinvremain);
         row.SetField("prooforigdisc", entity.prooforigdisc);
         row.SetField("proofdiscpay", entity.proofdiscpay);
         row.SetField("proofdiscremain", entity.proofdiscremain);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
