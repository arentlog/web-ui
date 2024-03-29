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

namespace Infor.Sxe.KP.Data.Models.Pdskpgrouplookup
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdskpgrouplookup.Kpgrouplookupcriteria")]
   public partial class Kpgrouplookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string groupname { get; set; }


      public static Kpgrouplookupcriteria BuildKpgrouplookupcriteriaFromRow(DataRow row)
      {
         Kpgrouplookupcriteria entity = new Kpgrouplookupcriteria();
         entity.groupname = row.IsNull("groupname") ? string.Empty : row.Field<string>("groupname");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKpgrouplookupcriteria(ref DataRow row, Kpgrouplookupcriteria entity)
      {
         row.SetField("groupname", entity.groupname);

      }
   
   }
}
#pragma warning restore 1591
