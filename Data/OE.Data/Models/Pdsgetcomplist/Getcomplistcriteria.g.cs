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

namespace Infor.Sxe.OE.Data.Models.Pdsgetcomplist
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsgetcomplist.Getcomplistcriteria")]
   public partial class Getcomplistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string customparam { get; set; }


      public static Getcomplistcriteria BuildGetcomplistcriteriaFromRow(DataRow row)
      {
         Getcomplistcriteria entity = new Getcomplistcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.customparam = row.IsNull("customparam") ? string.Empty : row.Field<string>("customparam");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGetcomplistcriteria(ref DataRow row, Getcomplistcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("customparam", entity.customparam);

      }
   
   }
}
#pragma warning restore 1591