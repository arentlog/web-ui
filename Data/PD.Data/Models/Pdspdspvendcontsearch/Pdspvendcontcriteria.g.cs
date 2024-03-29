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

namespace Infor.Sxe.PD.Data.Models.Pdspdspvendcontsearch
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdspvendcontsearch.Pdspvendcontcriteria")]
   public partial class Pdspvendcontcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string clevelcd { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodpricety { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string rebtype { get; set; }
      [StringValidationAttribute]
      public string rebsubty { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public DateTime? startdt { get; set; }
      public bool inactivefl { get; set; }
      public int pdrecno { get; set; }
      public int iRecordlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdspvendcontcriteria BuildPdspvendcontcriteriaFromRow(DataRow row)
      {
         Pdspvendcontcriteria entity = new Pdspvendcontcriteria();
         entity.clevelcd = row.IsNull("clevelcd") ? string.Empty : row.Field<string>("clevelcd");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodpricety = row.IsNull("prodpricety") ? string.Empty : row.Field<string>("prodpricety");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.rebtype = row.IsNull("rebtype") ? string.Empty : row.Field<string>("rebtype");
         entity.rebsubty = row.IsNull("rebsubty") ? string.Empty : row.Field<string>("rebsubty");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.inactivefl = row.Field<bool>("inactivefl");
         entity.pdrecno = row.IsNull("pdrecno") ? 0 : row.Field<int>("pdrecno");
         entity.iRecordlimit = row.IsNull("iRecordlimit") ? 0 : row.Field<int>("iRecordlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdspvendcontcriteria(ref DataRow row, Pdspvendcontcriteria entity)
      {
         row.SetField("clevelcd", entity.clevelcd);
         row.SetField("contractno", entity.contractno);
         row.SetField("prod", entity.prod);
         row.SetField("prodpricety", entity.prodpricety);
         row.SetField("vendno", entity.vendno);
         row.SetField("rebtype", entity.rebtype);
         row.SetField("rebsubty", entity.rebsubty);
         row.SetField("unit", entity.unit);
         row.SetField("whse", entity.whse);
         row.SetField("startdt", entity.startdt);
         row.SetField("inactivefl", entity.inactivefl);
         row.SetField("pdrecno", entity.pdrecno);
         row.SetField("iRecordlimit", entity.iRecordlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
