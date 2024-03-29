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

namespace Infor.Sxe.IC.Data.Models.Pdswarehouselookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdswarehouselookup.Warehouselookupcriteria")]
   public partial class Warehouselookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string phoneno { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Warehouselookupcriteria BuildWarehouselookupcriteriaFromRow(DataRow row)
      {
         Warehouselookupcriteria entity = new Warehouselookupcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.phoneno = row.IsNull("phoneno") ? string.Empty : row.Field<string>("phoneno");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWarehouselookupcriteria(ref DataRow row, Warehouselookupcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("phoneno", entity.phoneno);
         row.SetField("city", entity.city);
         row.SetField("state", entity.state);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
