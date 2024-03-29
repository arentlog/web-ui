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

namespace Infor.Sxe.PD.Data.Models.Pdspdergetclaim
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdergetclaim.Pdergetclaimcriteria")]
   public partial class Pdergetclaimcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string receiptType { get; set; }
      public DateTime? receiptDateStart { get; set; }
      public DateTime? receiptDateEnd { get; set; }
      public DateTime? claimDateStart { get; set; }
      public DateTime? claimDateEnd { get; set; }
      public bool includeInActive { get; set; }
      [StringValidationAttribute]
      public string rebateType { get; set; }
      public decimal custno { get; set; }
      public decimal vendno { get; set; }
      public int claimNo { get; set; }
      [StringValidationAttribute]
      public string apInvoiceNo { get; set; }
      public int secure { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdergetclaimcriteria BuildPdergetclaimcriteriaFromRow(DataRow row)
      {
         Pdergetclaimcriteria entity = new Pdergetclaimcriteria();
         entity.receiptType = row.IsNull("receiptType") ? string.Empty : row.Field<string>("receiptType");
         entity.receiptDateStart = row.Field<DateTime?>("receiptDateStart");
         entity.receiptDateEnd = row.Field<DateTime?>("receiptDateEnd");
         entity.claimDateStart = row.Field<DateTime?>("claimDateStart");
         entity.claimDateEnd = row.Field<DateTime?>("claimDateEnd");
         entity.includeInActive = row.Field<bool>("includeInActive");
         entity.rebateType = row.IsNull("rebateType") ? string.Empty : row.Field<string>("rebateType");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.claimNo = row.IsNull("claimNo") ? 0 : row.Field<int>("claimNo");
         entity.apInvoiceNo = row.IsNull("apInvoiceNo") ? string.Empty : row.Field<string>("apInvoiceNo");
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdergetclaimcriteria(ref DataRow row, Pdergetclaimcriteria entity)
      {
         row.SetField("receiptType", entity.receiptType);
         row.SetField("receiptDateStart", entity.receiptDateStart);
         row.SetField("receiptDateEnd", entity.receiptDateEnd);
         row.SetField("claimDateStart", entity.claimDateStart);
         row.SetField("claimDateEnd", entity.claimDateEnd);
         row.SetField("includeInActive", entity.includeInActive);
         row.SetField("rebateType", entity.rebateType);
         row.SetField("custno", entity.custno);
         row.SetField("vendno", entity.vendno);
         row.SetField("claimNo", entity.claimNo);
         row.SetField("apInvoiceNo", entity.apInvoiceNo);
         row.SetField("secure", entity.secure);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
