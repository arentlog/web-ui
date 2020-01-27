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

namespace Infor.Sxe.IC.Data.Models.Pdsiclotlookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiclotlookup.Iclotlookupcriteria")]
   public partial class Iclotlookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string lotno { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      public int recordlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iclotlookupcriteria BuildIclotlookupcriteriaFromRow(DataRow row)
      {
         Iclotlookupcriteria entity = new Iclotlookupcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.lotno = row.IsNull("lotno") ? string.Empty : row.Field<string>("lotno");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIclotlookupcriteria(ref DataRow row, Iclotlookupcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("lotno", entity.lotno);
         row.SetField("statustype", entity.statustype);
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
