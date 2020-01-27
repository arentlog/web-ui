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

namespace Infor.Sxe.IC.Data.Models.Pdsicsrcostmatrixcriteria
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsrcostmatrixcriteria.Icsrcostmatrixcriteria")]
   public partial class Icsrcostmatrixcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsrcostmatrixcriteria BuildIcsrcostmatrixcriteriaFromRow(DataRow row)
      {
         Icsrcostmatrixcriteria entity = new Icsrcostmatrixcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsrcostmatrixcriteria(ref DataRow row, Icsrcostmatrixcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("vendno", entity.vendno);
         row.SetField("prodline", entity.prodline);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
