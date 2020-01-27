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

namespace Infor.Sxe.IC.Data.Models.Pdsloadexcptusagett
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsloadexcptusagett.Loadexcptusagettcriteria")]
   public partial class Loadexcptusagettcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadexcptusagettcriteria BuildLoadexcptusagettcriteriaFromRow(DataRow row)
      {
         Loadexcptusagettcriteria entity = new Loadexcptusagettcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadexcptusagettcriteria(ref DataRow row, Loadexcptusagettcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
