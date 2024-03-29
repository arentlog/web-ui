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

namespace Infor.Sxe.AR.Data.Models.Pdsarilworesults
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarilworesults.Arilworesults")]
   public partial class Arilworesults : ModelBase
   {
      [StringValidationAttribute]
      public string account { get; set; }
      public decimal amount { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public decimal origtaxamt { get; set; }
      public decimal taxexemptamt { get; set; }
      public decimal origbaseamt { get; set; }
      public decimal adjbaseamt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arilworesults BuildArilworesultsFromRow(DataRow row)
      {
         Arilworesults entity = new Arilworesults();
         entity.account = row.IsNull("account") ? string.Empty : row.Field<string>("account");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.origtaxamt = row.IsNull("origtaxamt") ? decimal.Zero : row.Field<decimal>("origtaxamt");
         entity.taxexemptamt = row.IsNull("taxexemptamt") ? decimal.Zero : row.Field<decimal>("taxexemptamt");
         entity.origbaseamt = row.IsNull("origbaseamt") ? decimal.Zero : row.Field<decimal>("origbaseamt");
         entity.adjbaseamt = row.IsNull("adjbaseamt") ? decimal.Zero : row.Field<decimal>("adjbaseamt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArilworesults(ref DataRow row, Arilworesults entity)
      {
         row.SetField("account", entity.account);
         row.SetField("amount", entity.amount);
         row.SetField("descrip", entity.descrip);
         row.SetField("origtaxamt", entity.origtaxamt);
         row.SetField("taxexemptamt", entity.taxexemptamt);
         row.SetField("origbaseamt", entity.origbaseamt);
         row.SetField("adjbaseamt", entity.adjbaseamt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
