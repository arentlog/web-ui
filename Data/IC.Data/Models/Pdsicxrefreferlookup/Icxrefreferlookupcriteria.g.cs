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

namespace Infor.Sxe.IC.Data.Models.Pdsicxrefreferlookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicxrefreferlookup.Icxrefreferlookupcriteria")]
   public partial class Icxrefreferlookupcriteria : ModelBase
   {
      public bool byreference { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string type { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icxrefreferlookupcriteria BuildIcxrefreferlookupcriteriaFromRow(DataRow row)
      {
         Icxrefreferlookupcriteria entity = new Icxrefreferlookupcriteria();
         entity.byreference = row.Field<bool>("byreference");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcxrefreferlookupcriteria(ref DataRow row, Icxrefreferlookupcriteria entity)
      {
         row.SetField("byreference", entity.byreference);
         row.SetField("prod", entity.prod);
         row.SetField("type", entity.type);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591