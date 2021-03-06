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

namespace Infor.Sxe.AR.Data.Models.Pdsbuildcustcredit
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsbuildcustcredit.Buildcustcreditcriteria")]
   public partial class Buildcustcreditcriteria : ModelBase
   {
      public int cono { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string groupid { get; set; }
      [StringValidationAttribute]
      public string period { get; set; }
      public decimal credlim { get; set; }
      public decimal totalbalance { get; set; }
      [StringValidationAttribute]
      public string creditmgr { get; set; }
      public bool holdonly { get; set; }
      public bool dsplshipto { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Buildcustcreditcriteria BuildBuildcustcreditcriteriaFromRow(DataRow row)
      {
         Buildcustcreditcriteria entity = new Buildcustcreditcriteria();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.groupid = row.IsNull("groupid") ? string.Empty : row.Field<string>("groupid");
         entity.period = row.IsNull("period") ? string.Empty : row.Field<string>("period");
         entity.credlim = row.IsNull("credlim") ? decimal.Zero : row.Field<decimal>("credlim");
         entity.totalbalance = row.IsNull("totalbalance") ? decimal.Zero : row.Field<decimal>("totalbalance");
         entity.creditmgr = row.IsNull("creditmgr") ? string.Empty : row.Field<string>("creditmgr");
         entity.holdonly = row.Field<bool>("holdonly");
         entity.dsplshipto = row.Field<bool>("dsplshipto");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromBuildcustcreditcriteria(ref DataRow row, Buildcustcreditcriteria entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("groupid", entity.groupid);
         row.SetField("period", entity.period);
         row.SetField("credlim", entity.credlim);
         row.SetField("totalbalance", entity.totalbalance);
         row.SetField("creditmgr", entity.creditmgr);
         row.SetField("holdonly", entity.holdonly);
         row.SetField("dsplshipto", entity.dsplshipto);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
