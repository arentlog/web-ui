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

namespace Infor.Sxe.IC.Data.Models.Pdsicsebdelete
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsebdelete.Icsebdelete")]
   public partial class Icsebdelete : ModelBase
   {
      [StringValidationAttribute]
      public string functionname { get; set; }
      [StringValidationAttribute]
      public string intype { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string bundleid { get; set; }
      [StringValidationAttribute]
      public string units { get; set; }
      public bool inquirefl { get; set; }
      public int secure { get; set; }
      public int bundleseqno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsebdelete BuildIcsebdeleteFromRow(DataRow row)
      {
         Icsebdelete entity = new Icsebdelete();
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.intype = row.IsNull("intype") ? string.Empty : row.Field<string>("intype");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.bundleid = row.IsNull("bundleid") ? string.Empty : row.Field<string>("bundleid");
         entity.units = row.IsNull("units") ? string.Empty : row.Field<string>("units");
         entity.inquirefl = row.Field<bool>("inquirefl");
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.bundleseqno = row.IsNull("bundleseqno") ? 0 : row.Field<int>("bundleseqno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsebdelete(ref DataRow row, Icsebdelete entity)
      {
         row.SetField("functionname", entity.functionname);
         row.SetField("intype", entity.intype);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("bundleid", entity.bundleid);
         row.SetField("units", entity.units);
         row.SetField("inquirefl", entity.inquirefl);
         row.SetField("secure", entity.secure);
         row.SetField("bundleseqno", entity.bundleseqno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
