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
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspderclookup.Pderclookupcriteria")]
   public partial class Pderclookupcriteria : ModelBase
   {
      public int claimno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string claimtype { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pderclookupcriteria BuildPderclookupcriteriaFromRow(DataRow row)
      {
         Pderclookupcriteria entity = new Pderclookupcriteria();
         entity.claimno = row.IsNull("claimno") ? 0 : row.Field<int>("claimno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.claimtype = row.IsNull("claimtype") ? string.Empty : row.Field<string>("claimtype");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPderclookupcriteria(ref DataRow row, Pderclookupcriteria entity)
      {
         row.SetField("claimno", entity.claimno);
         row.SetField("vendno", entity.vendno);
         row.SetField("statustype", entity.statustype);
         row.SetField("claimtype", entity.claimtype);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
