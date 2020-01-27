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

namespace Infor.Sxe.AP.Data.Models.Pdsapeemaint
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeemaint.Apeemaint")]
   public partial class Apeemaint : ModelBase
   {
      [StringValidationAttribute]
      public string invoiceno { get; set; }
      public decimal schedulepayment { get; set; }
      [StringValidationAttribute]
      public string currencyty { get; set; }
      public DateTime? invoicedate { get; set; }
      public DateTime? postdate { get; set; }
      public bool disputefl { get; set; }
      [StringValidationAttribute]
      public string invoicetype { get; set; }
      public DateTime? duedate { get; set; }
      public int duedatedays { get; set; }
      public DateTime? discdate { get; set; }
      public int discdatedays { get; set; }
      public decimal discountperc { get; set; }
      public decimal discountamount { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string apetrowid { get; set; }
      public int transcd { get; set; }
      public int jrnlno { get; set; }
      public int setno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeemaint BuildApeemaintFromRow(DataRow row)
      {
         Apeemaint entity = new Apeemaint();
         entity.invoiceno = row.IsNull("invoiceno") ? string.Empty : row.Field<string>("invoiceno");
         entity.schedulepayment = row.IsNull("schedulepayment") ? decimal.Zero : row.Field<decimal>("schedulepayment");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.invoicedate = row.Field<DateTime?>("invoicedate");
         entity.postdate = row.Field<DateTime?>("postdate");
         entity.disputefl = row.Field<bool>("disputefl");
         entity.invoicetype = row.IsNull("invoicetype") ? string.Empty : row.Field<string>("invoicetype");
         entity.duedate = row.Field<DateTime?>("duedate");
         entity.duedatedays = row.IsNull("duedatedays") ? 0 : row.Field<int>("duedatedays");
         entity.discdate = row.Field<DateTime?>("discdate");
         entity.discdatedays = row.IsNull("discdatedays") ? 0 : row.Field<int>("discdatedays");
         entity.discountperc = row.IsNull("discountperc") ? decimal.Zero : row.Field<decimal>("discountperc");
         entity.discountamount = row.IsNull("discountamount") ? decimal.Zero : row.Field<decimal>("discountamount");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.apetrowid = row.Field<byte[]>("apetrowid").ToStringEncoded();
         entity.transcd = row.IsNull("transcd") ? 0 : row.Field<int>("transcd");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeemaint(ref DataRow row, Apeemaint entity)
      {
         row.SetField("invoiceno", entity.invoiceno);
         row.SetField("schedulepayment", entity.schedulepayment);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("invoicedate", entity.invoicedate);
         row.SetField("postdate", entity.postdate);
         row.SetField("disputefl", entity.disputefl);
         row.SetField("invoicetype", entity.invoicetype);
         row.SetField("duedate", entity.duedate);
         row.SetField("duedatedays", entity.duedatedays);
         row.SetField("discdate", entity.discdate);
         row.SetField("discdatedays", entity.discdatedays);
         row.SetField("discountperc", entity.discountperc);
         row.SetField("discountamount", entity.discountamount);
         row.SetField("refer", entity.refer);
         row.SetField("apetrowid", entity.apetrowid.ToByteArray());
         row.SetField("transcd", entity.transcd);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
