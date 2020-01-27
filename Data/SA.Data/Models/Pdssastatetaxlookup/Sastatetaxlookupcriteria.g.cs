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

namespace Infor.Sxe.SA.Data.Models.Pdssastatetaxlookup
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssastatetaxlookup.Sastatetaxlookupcriteria")]
   public partial class Sastatetaxlookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string state { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sastatetaxlookupcriteria BuildSastatetaxlookupcriteriaFromRow(DataRow row)
      {
         Sastatetaxlookupcriteria entity = new Sastatetaxlookupcriteria();
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSastatetaxlookupcriteria(ref DataRow row, Sastatetaxlookupcriteria entity)
      {
         row.SetField("state", entity.state);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591