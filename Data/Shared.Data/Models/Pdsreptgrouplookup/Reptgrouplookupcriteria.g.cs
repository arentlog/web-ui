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

namespace Infor.Sxe.Shared.Data.Models.Pdsreptgrouplookup
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsreptgrouplookup.Reptgrouplookupcriteria")]
   public partial class Reptgrouplookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string batchnm { get; set; }
      public int cono { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Reptgrouplookupcriteria BuildReptgrouplookupcriteriaFromRow(DataRow row)
      {
         Reptgrouplookupcriteria entity = new Reptgrouplookupcriteria();
         entity.batchnm = row.IsNull("batchnm") ? string.Empty : row.Field<string>("batchnm");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromReptgrouplookupcriteria(ref DataRow row, Reptgrouplookupcriteria entity)
      {
         row.SetField("batchnm", entity.batchnm);
         row.SetField("cono", entity.cono);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
