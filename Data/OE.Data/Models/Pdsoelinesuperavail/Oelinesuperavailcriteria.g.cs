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

namespace Infor.Sxe.OE.Data.Models.Pdsoelinesuperavail
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelinesuperavail.Oelinesuperavailcriteria")]
   public partial class Oelinesuperavailcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public bool superfl { get; set; }
      public bool porrarfl { get; set; }


      public static Oelinesuperavailcriteria BuildOelinesuperavailcriteriaFromRow(DataRow row)
      {
         Oelinesuperavailcriteria entity = new Oelinesuperavailcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.superfl = row.Field<bool>("superfl");
         entity.porrarfl = row.Field<bool>("porrarfl");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinesuperavailcriteria(ref DataRow row, Oelinesuperavailcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("superfl", entity.superfl);
         row.SetField("porrarfl", entity.porrarfl);

      }
   
   }
}
#pragma warning restore 1591
