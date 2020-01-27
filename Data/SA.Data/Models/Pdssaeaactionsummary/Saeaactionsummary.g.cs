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

namespace Infor.Sxe.SA.Data.Models.Pdssaeaactionsummary
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaeaactionsummary.Saeaactionsummary")]
   public partial class Saeaactionsummary : ModelBase
   {
      public int actionseqno { get; set; }
      [StringValidationAttribute]
      public string cActionType { get; set; }
      [StringValidationAttribute]
      public string cSubjectType { get; set; }
      [StringValidationAttribute]
      public string cWhseRange { get; set; }
      [StringValidationAttribute]
      public string cRegionRange { get; set; }
      [StringValidationAttribute]
      public string cCustomerRange { get; set; }
      [StringValidationAttribute]
      public string cVendorRange { get; set; }
      [StringValidationAttribute]
      public string cProductRange { get; set; }
      [StringValidationAttribute]
      public string cProdCatRange { get; set; }
      [StringValidationAttribute]
      public string cAmountSelection { get; set; }
      [StringValidationAttribute]
      public string cCharSelection { get; set; }
      [StringValidationAttribute]
      public string cPriceSelection { get; set; }
      [StringValidationAttribute]
      public string cDateSelection { get; set; }
      public bool lActive { get; set; }
      public DateTime? expiredt { get; set; }
      [StringValidationAttribute]
      public string eventname { get; set; }
      [StringValidationAttribute]
      public string actionrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saeaactionsummary BuildSaeaactionsummaryFromRow(DataRow row)
      {
         Saeaactionsummary entity = new Saeaactionsummary();
         entity.actionseqno = row.IsNull("actionseqno") ? 0 : row.Field<int>("actionseqno");
         entity.cActionType = row.IsNull("cActionType") ? string.Empty : row.Field<string>("cActionType");
         entity.cSubjectType = row.IsNull("cSubjectType") ? string.Empty : row.Field<string>("cSubjectType");
         entity.cWhseRange = row.IsNull("cWhseRange") ? string.Empty : row.Field<string>("cWhseRange");
         entity.cRegionRange = row.IsNull("cRegionRange") ? string.Empty : row.Field<string>("cRegionRange");
         entity.cCustomerRange = row.IsNull("cCustomerRange") ? string.Empty : row.Field<string>("cCustomerRange");
         entity.cVendorRange = row.IsNull("cVendorRange") ? string.Empty : row.Field<string>("cVendorRange");
         entity.cProductRange = row.IsNull("cProductRange") ? string.Empty : row.Field<string>("cProductRange");
         entity.cProdCatRange = row.IsNull("cProdCatRange") ? string.Empty : row.Field<string>("cProdCatRange");
         entity.cAmountSelection = row.IsNull("cAmountSelection") ? string.Empty : row.Field<string>("cAmountSelection");
         entity.cCharSelection = row.IsNull("cCharSelection") ? string.Empty : row.Field<string>("cCharSelection");
         entity.cPriceSelection = row.IsNull("cPriceSelection") ? string.Empty : row.Field<string>("cPriceSelection");
         entity.cDateSelection = row.IsNull("cDateSelection") ? string.Empty : row.Field<string>("cDateSelection");
         entity.lActive = row.Field<bool>("lActive");
         entity.expiredt = row.Field<DateTime?>("expiredt");
         entity.eventname = row.IsNull("eventname") ? string.Empty : row.Field<string>("eventname");
         entity.actionrowid = row.Field<byte[]>("actionrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaeaactionsummary(ref DataRow row, Saeaactionsummary entity)
      {
         row.SetField("actionseqno", entity.actionseqno);
         row.SetField("cActionType", entity.cActionType);
         row.SetField("cSubjectType", entity.cSubjectType);
         row.SetField("cWhseRange", entity.cWhseRange);
         row.SetField("cRegionRange", entity.cRegionRange);
         row.SetField("cCustomerRange", entity.cCustomerRange);
         row.SetField("cVendorRange", entity.cVendorRange);
         row.SetField("cProductRange", entity.cProductRange);
         row.SetField("cProdCatRange", entity.cProdCatRange);
         row.SetField("cAmountSelection", entity.cAmountSelection);
         row.SetField("cCharSelection", entity.cCharSelection);
         row.SetField("cPriceSelection", entity.cPriceSelection);
         row.SetField("cDateSelection", entity.cDateSelection);
         row.SetField("lActive", entity.lActive);
         row.SetField("expiredt", entity.expiredt);
         row.SetField("eventname", entity.eventname);
         row.SetField("actionrowid", entity.actionrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591