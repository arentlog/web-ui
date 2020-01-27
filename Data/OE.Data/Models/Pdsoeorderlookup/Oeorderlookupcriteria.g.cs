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

namespace Infor.Sxe.OE.Data.Models.Pdsoeorderlookup
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeorderlookup.Oeorderlookupcriteria")]
   public partial class Oeorderlookupcriteria : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string stage { get; set; }
      public bool openonly { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string customfield { get; set; }


      public static Oeorderlookupcriteria BuildOeorderlookupcriteriaFromRow(DataRow row)
      {
         Oeorderlookupcriteria entity = new Oeorderlookupcriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.stage = row.IsNull("stage") ? string.Empty : row.Field<string>("stage");
         entity.openonly = row.Field<bool>("openonly");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.customfield = row.IsNull("customfield") ? string.Empty : row.Field<string>("customfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeorderlookupcriteria(ref DataRow row, Oeorderlookupcriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("transtype", entity.transtype);
         row.SetField("stage", entity.stage);
         row.SetField("openonly", entity.openonly);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("customfield", entity.customfield);

      }
   
   }
}
#pragma warning restore 1591