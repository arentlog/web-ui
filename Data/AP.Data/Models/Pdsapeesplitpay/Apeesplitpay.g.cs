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

namespace Infor.Sxe.AP.Data.Models.Pdsapeesplitpay
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeesplitpay.Apeesplitpay")]
   public partial class Apeesplitpay : ModelBase
   {
      public int paymentno { get; set; }
      public decimal amount { get; set; }
      public decimal discount { get; set; }
      public bool disputed { get; set; }
      public DateTime? duedate { get; set; }
      public DateTime? discountdate { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeesplitpay BuildApeesplitpayFromRow(DataRow row)
      {
         Apeesplitpay entity = new Apeesplitpay();
         entity.paymentno = row.IsNull("paymentno") ? 0 : row.Field<int>("paymentno");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.discount = row.IsNull("discount") ? decimal.Zero : row.Field<decimal>("discount");
         entity.disputed = row.Field<bool>("disputed");
         entity.duedate = row.Field<DateTime?>("duedate");
         entity.discountdate = row.Field<DateTime?>("discountdate");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeesplitpay(ref DataRow row, Apeesplitpay entity)
      {
         row.SetField("paymentno", entity.paymentno);
         row.SetField("amount", entity.amount);
         row.SetField("discount", entity.discount);
         row.SetField("disputed", entity.disputed);
         row.SetField("duedate", entity.duedate);
         row.SetField("discountdate", entity.discountdate);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
