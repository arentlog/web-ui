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

namespace Infor.Sxe.SW.Data.Models.Pdssworderlookup
{
   [ModelName("Infor.Sxe.SW.Data.Models.Pdssworderlookup.Sworderlookupcriteria")]
   public partial class Sworderlookupcriteria : ModelBase
   {
      public decimal custno { get; set; }
      public int repairordno { get; set; }
      public int repairordsuf { get; set; }
      public bool openonly { get; set; }
      [StringValidationAttribute]
      public string ordtype { get; set; }
      [StringValidationAttribute]
      public string stage { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string customfield { get; set; }


      public static Sworderlookupcriteria BuildSworderlookupcriteriaFromRow(DataRow row)
      {
         Sworderlookupcriteria entity = new Sworderlookupcriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.repairordno = row.IsNull("repairordno") ? 0 : row.Field<int>("repairordno");
         entity.repairordsuf = row.IsNull("repairordsuf") ? 0 : row.Field<int>("repairordsuf");
         entity.openonly = row.Field<bool>("openonly");
         entity.ordtype = row.IsNull("ordtype") ? string.Empty : row.Field<string>("ordtype");
         entity.stage = row.IsNull("stage") ? string.Empty : row.Field<string>("stage");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.customfield = row.IsNull("customfield") ? string.Empty : row.Field<string>("customfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSworderlookupcriteria(ref DataRow row, Sworderlookupcriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("repairordno", entity.repairordno);
         row.SetField("repairordsuf", entity.repairordsuf);
         row.SetField("openonly", entity.openonly);
         row.SetField("ordtype", entity.ordtype);
         row.SetField("stage", entity.stage);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("customfield", entity.customfield);

      }
   
   }
}
#pragma warning restore 1591
