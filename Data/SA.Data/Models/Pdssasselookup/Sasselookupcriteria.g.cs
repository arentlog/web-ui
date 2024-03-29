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

namespace Infor.Sxe.SA.Data.Models.Pdssasselookup
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasselookup.Sasselookupcriteria")]
   public partial class Sasselookupcriteria : ModelBase
   {
      public int errorno { get; set; }
      [StringValidationAttribute]
      public string errormsg { get; set; }
      [StringValidationAttribute]
      public string trmgrlang { get; set; }
      public bool lalllanguages { get; set; }
      public int recordlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasselookupcriteria BuildSasselookupcriteriaFromRow(DataRow row)
      {
         Sasselookupcriteria entity = new Sasselookupcriteria();
         entity.errorno = row.IsNull("errorno") ? 0 : row.Field<int>("errorno");
         entity.errormsg = row.IsNull("errormsg") ? string.Empty : row.Field<string>("errormsg");
         entity.trmgrlang = row.IsNull("trmgrlang") ? string.Empty : row.Field<string>("trmgrlang");
         entity.lalllanguages = row.Field<bool>("lalllanguages");
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasselookupcriteria(ref DataRow row, Sasselookupcriteria entity)
      {
         row.SetField("errorno", entity.errorno);
         row.SetField("errormsg", entity.errormsg);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("lalllanguages", entity.lalllanguages);
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
