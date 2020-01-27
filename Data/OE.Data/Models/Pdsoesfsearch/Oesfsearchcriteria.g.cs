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

namespace Infor.Sxe.OE.Data.Models.Pdsoesfsearch
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoesfsearch.Oesfsearchcriteria")]
   public partial class Oesfsearchcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string recordtype { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oesfsearchcriteria BuildOesfsearchcriteriaFromRow(DataRow row)
      {
         Oesfsearchcriteria entity = new Oesfsearchcriteria();
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOesfsearchcriteria(ref DataRow row, Oesfsearchcriteria entity)
      {
         row.SetField("recordtype", entity.recordtype);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("whse", entity.whse);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591