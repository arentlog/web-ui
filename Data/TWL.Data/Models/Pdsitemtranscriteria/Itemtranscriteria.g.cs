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

namespace Infor.Sxe.TWL.Data.Models.Pdsitemtranscriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsitemtranscriteria.Itemtranscriteria")]
   public partial class Itemtranscriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      public DateTime? fromdate { get; set; }
      public DateTime? todate { get; set; }
      [StringValidationAttribute]
      public string fromtime { get; set; }
      [StringValidationAttribute]
      public string totime { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string itemtranscriteriauserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Itemtranscriteria BuildItemtranscriteriaFromRow(DataRow row)
      {
         Itemtranscriteria entity = new Itemtranscriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.fromdate = row.Field<DateTime?>("fromdate");
         entity.todate = row.Field<DateTime?>("todate");
         entity.fromtime = row.IsNull("fromtime") ? string.Empty : row.Field<string>("fromtime");
         entity.totime = row.IsNull("totime") ? string.Empty : row.Field<string>("totime");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.itemtranscriteriauserfield = row.IsNull("itemtranscriteriauserfield") ? string.Empty : row.Field<string>("itemtranscriteriauserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromItemtranscriteria(ref DataRow row, Itemtranscriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("fromdate", entity.fromdate);
         row.SetField("todate", entity.todate);
         row.SetField("fromtime", entity.fromtime);
         row.SetField("totime", entity.totime);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("itemtranscriteriauserfield", entity.itemtranscriteriauserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591