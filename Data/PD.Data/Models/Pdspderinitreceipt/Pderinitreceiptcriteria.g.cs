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

namespace Infor.Sxe.PD.Data.Models.Pdspderinitreceipt
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspderinitreceipt.Pderinitreceiptcriteria")]
   public partial class Pderinitreceiptcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string receipttype { get; set; }
      public int claimno { get; set; }
      public decimal vendno { get; set; }
      public DateTime? receiptdt { get; set; }
      public int secure { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pderinitreceiptcriteria BuildPderinitreceiptcriteriaFromRow(DataRow row)
      {
         Pderinitreceiptcriteria entity = new Pderinitreceiptcriteria();
         entity.receipttype = row.IsNull("receipttype") ? string.Empty : row.Field<string>("receipttype");
         entity.claimno = row.IsNull("claimno") ? 0 : row.Field<int>("claimno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.receiptdt = row.Field<DateTime?>("receiptdt");
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPderinitreceiptcriteria(ref DataRow row, Pderinitreceiptcriteria entity)
      {
         row.SetField("receipttype", entity.receipttype);
         row.SetField("claimno", entity.claimno);
         row.SetField("vendno", entity.vendno);
         row.SetField("receiptdt", entity.receiptdt);
         row.SetField("secure", entity.secure);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
