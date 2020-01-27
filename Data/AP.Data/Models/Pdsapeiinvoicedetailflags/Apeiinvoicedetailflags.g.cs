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

namespace Infor.Sxe.AP.Data.Models.Pdsapeiinvoicedetailflags
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeiinvoicedetailflags.Apeiinvoicedetailflags")]
   public partial class Apeiinvoicedetailflags : ModelBase
   {
      public bool disputefl { get; set; }
      public bool suspfl { get; set; }
      public bool reconoverfl { get; set; }
      [StringValidationAttribute]
      public string apeiRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeiinvoicedetailflags BuildApeiinvoicedetailflagsFromRow(DataRow row)
      {
         Apeiinvoicedetailflags entity = new Apeiinvoicedetailflags();
         entity.disputefl = row.Field<bool>("disputefl");
         entity.suspfl = row.Field<bool>("suspfl");
         entity.reconoverfl = row.Field<bool>("reconoverfl");
         entity.apeiRowid = row.Field<byte[]>("apei-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeiinvoicedetailflags(ref DataRow row, Apeiinvoicedetailflags entity)
      {
         row.SetField("disputefl", entity.disputefl);
         row.SetField("suspfl", entity.suspfl);
         row.SetField("reconoverfl", entity.reconoverfl);
         row.SetField("apei-rowid", entity.apeiRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
