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

namespace Infor.Sxe.AP.Data.Models.Pdsapvendorlookup
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapvendorlookup.Apvendorlookupcriteria")]
   public partial class Apvendorlookupcriteria : ModelBase
   {
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string lookupnm { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string phoneno { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string zipcd { get; set; }
      [StringValidationAttribute]
      public string vendtype { get; set; }
      public bool allowpofl { get; set; }
      public bool includeinactive { get; set; }
      [StringValidationAttribute]
      public string firstnm { get; set; }
      [StringValidationAttribute]
      public string lastnm { get; set; }
      [StringValidationAttribute]
      public string keywords { get; set; }
      public int recordcountlimit { get; set; }


      public static Apvendorlookupcriteria BuildApvendorlookupcriteriaFromRow(DataRow row)
      {
         Apvendorlookupcriteria entity = new Apvendorlookupcriteria();
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.lookupnm = row.IsNull("lookupnm") ? string.Empty : row.Field<string>("lookupnm");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.phoneno = row.IsNull("phoneno") ? string.Empty : row.Field<string>("phoneno");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.vendtype = row.IsNull("vendtype") ? string.Empty : row.Field<string>("vendtype");
         entity.allowpofl = row.Field<bool>("allowpofl");
         entity.includeinactive = row.Field<bool>("includeinactive");
         entity.firstnm = row.IsNull("firstnm") ? string.Empty : row.Field<string>("firstnm");
         entity.lastnm = row.IsNull("lastnm") ? string.Empty : row.Field<string>("lastnm");
         entity.keywords = row.IsNull("keywords") ? string.Empty : row.Field<string>("keywords");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApvendorlookupcriteria(ref DataRow row, Apvendorlookupcriteria entity)
      {
         row.SetField("vendno", entity.vendno);
         row.SetField("lookupnm", entity.lookupnm);
         row.SetField("name", entity.name);
         row.SetField("phoneno", entity.phoneno);
         row.SetField("city", entity.city);
         row.SetField("state", entity.state);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("vendtype", entity.vendtype);
         row.SetField("allowpofl", entity.allowpofl);
         row.SetField("includeinactive", entity.includeinactive);
         row.SetField("firstnm", entity.firstnm);
         row.SetField("lastnm", entity.lastnm);
         row.SetField("keywords", entity.keywords);
         row.SetField("recordcountlimit", entity.recordcountlimit);

      }
   
   }
}
#pragma warning restore 1591