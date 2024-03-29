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

namespace Infor.Sxe.SL.Data.Models.Pdsslvendcdlookup
{
   [ModelName("Infor.Sxe.SL.Data.Models.Pdsslvendcdlookup.Slvendcdlookupcriteria")]
   public partial class Slvendcdlookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string imptype { get; set; }
      [StringValidationAttribute]
      public string vendcd { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Slvendcdlookupcriteria BuildSlvendcdlookupcriteriaFromRow(DataRow row)
      {
         Slvendcdlookupcriteria entity = new Slvendcdlookupcriteria();
         entity.imptype = row.IsNull("imptype") ? string.Empty : row.Field<string>("imptype");
         entity.vendcd = row.IsNull("vendcd") ? string.Empty : row.Field<string>("vendcd");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSlvendcdlookupcriteria(ref DataRow row, Slvendcdlookupcriteria entity)
      {
         row.SetField("imptype", entity.imptype);
         row.SetField("vendcd", entity.vendcd);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
