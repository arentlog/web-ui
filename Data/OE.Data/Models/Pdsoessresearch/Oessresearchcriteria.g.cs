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

namespace Infor.Sxe.OE.Data.Models.Pdsoessresearch
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoessresearch.Oessresearchcriteria")]
   public partial class Oessresearchcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string recordtype { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string slsrepin { get; set; }
      [StringValidationAttribute]
      public string slsrepout { get; set; }
      public int recordcountlimit { get; set; }


      public static Oessresearchcriteria BuildOessresearchcriteriaFromRow(DataRow row)
      {
         Oessresearchcriteria entity = new Oessresearchcriteria();
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOessresearchcriteria(ref DataRow row, Oessresearchcriteria entity)
      {
         row.SetField("recordtype", entity.recordtype);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("recordcountlimit", entity.recordcountlimit);

      }
   
   }
}
#pragma warning restore 1591
