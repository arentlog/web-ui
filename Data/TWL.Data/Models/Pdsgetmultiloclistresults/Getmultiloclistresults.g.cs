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

namespace Infor.Sxe.TWL.Data.Models.Pdsgetmultiloclistresults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsgetmultiloclistresults.Getmultiloclistresults")]
   public partial class Getmultiloclistresults : ModelBase
   {
      [StringValidationAttribute]
      public string binLoc { get; set; }
      public bool isDuplicate { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Getmultiloclistresults BuildGetmultiloclistresultsFromRow(DataRow row)
      {
         Getmultiloclistresults entity = new Getmultiloclistresults();
         entity.binLoc = row.IsNull("binLoc") ? string.Empty : row.Field<string>("binLoc");
         entity.isDuplicate = row.Field<bool>("isDuplicate");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGetmultiloclistresults(ref DataRow row, Getmultiloclistresults entity)
      {
         row.SetField("binLoc", entity.binLoc);
         row.SetField("isDuplicate", entity.isDuplicate);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
