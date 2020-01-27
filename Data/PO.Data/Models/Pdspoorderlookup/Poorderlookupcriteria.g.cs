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

namespace Infor.Sxe.PO.Data.Models.Pdspoorderlookup
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoorderlookup.Poorderlookupcriteria")]
   public partial class Poorderlookupcriteria : ModelBase
   {
      public decimal vendno { get; set; }
      public int pono { get; set; }
      public int posuf { get; set; }
      public bool openonly { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string stage { get; set; }
      [StringValidationAttribute]
      public string receiverno { get; set; }
      [StringValidationAttribute]
      public string approvty { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string customfield { get; set; }


      public static Poorderlookupcriteria BuildPoorderlookupcriteriaFromRow(DataRow row)
      {
         Poorderlookupcriteria entity = new Poorderlookupcriteria();
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.openonly = row.Field<bool>("openonly");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.stage = row.IsNull("stage") ? string.Empty : row.Field<string>("stage");
         entity.receiverno = row.IsNull("receiverno") ? string.Empty : row.Field<string>("receiverno");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.customfield = row.IsNull("customfield") ? string.Empty : row.Field<string>("customfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoorderlookupcriteria(ref DataRow row, Poorderlookupcriteria entity)
      {
         row.SetField("vendno", entity.vendno);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("openonly", entity.openonly);
         row.SetField("transtype", entity.transtype);
         row.SetField("stage", entity.stage);
         row.SetField("receiverno", entity.receiverno);
         row.SetField("approvty", entity.approvty);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("customfield", entity.customfield);

      }
   
   }
}
#pragma warning restore 1591
