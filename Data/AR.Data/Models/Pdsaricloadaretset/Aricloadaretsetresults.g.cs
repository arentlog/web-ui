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

namespace Infor.Sxe.AR.Data.Models.Pdsaricloadaretset
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsaricloadaretset.Aricloadaretsetresults")]
   public partial class Aricloadaretsetresults : ModelBase
   {
      public int cono { get; set; }
      public int invno { get; set; }
      public int invsuf { get; set; }
      public int seqno { get; set; }
      public decimal custno { get; set; }
      public int jrnlno { get; set; }
      public int setno { get; set; }
      [StringValidationAttribute]
      public string transcd { get; set; }
      public decimal amount { get; set; }
      public decimal paymtamt { get; set; }
      public decimal pifamt { get; set; }
      public decimal discamt { get; set; }
      public DateTime? paymtdt { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Aricloadaretsetresults BuildAricloadaretsetresultsFromRow(DataRow row)
      {
         Aricloadaretsetresults entity = new Aricloadaretsetresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.invno = row.IsNull("invno") ? 0 : row.Field<int>("invno");
         entity.invsuf = row.IsNull("invsuf") ? 0 : row.Field<int>("invsuf");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.transcd = row.IsNull("transcd") ? string.Empty : row.Field<string>("transcd");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.paymtamt = row.IsNull("paymtamt") ? decimal.Zero : row.Field<decimal>("paymtamt");
         entity.pifamt = row.IsNull("pifamt") ? decimal.Zero : row.Field<decimal>("pifamt");
         entity.discamt = row.IsNull("discamt") ? decimal.Zero : row.Field<decimal>("discamt");
         entity.paymtdt = row.Field<DateTime?>("paymtdt");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAricloadaretsetresults(ref DataRow row, Aricloadaretsetresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("invno", entity.invno);
         row.SetField("invsuf", entity.invsuf);
         row.SetField("seqno", entity.seqno);
         row.SetField("custno", entity.custno);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("transcd", entity.transcd);
         row.SetField("amount", entity.amount);
         row.SetField("paymtamt", entity.paymtamt);
         row.SetField("pifamt", entity.pifamt);
         row.SetField("discamt", entity.discamt);
         row.SetField("paymtdt", entity.paymtdt);
         row.SetField("statustype", entity.statustype);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
