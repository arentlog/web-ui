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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpoapdetail
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpoapdetail.Loadpoapdetailresults")]
   public partial class Loadpoapdetailresults : ModelBase
   {
      public int jrnlno { get; set; }
      public int setno { get; set; }
      [StringValidationAttribute]
      public string type { get; set; }
      [StringValidationAttribute]
      public string apinvno { get; set; }
      public DateTime? invdt { get; set; }
      public DateTime? paymtdt { get; set; }
      public decimal amount { get; set; }


      public static Loadpoapdetailresults BuildLoadpoapdetailresultsFromRow(DataRow row)
      {
         Loadpoapdetailresults entity = new Loadpoapdetailresults();
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.apinvno = row.IsNull("apinvno") ? string.Empty : row.Field<string>("apinvno");
         entity.invdt = row.Field<DateTime?>("invdt");
         entity.paymtdt = row.Field<DateTime?>("paymtdt");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpoapdetailresults(ref DataRow row, Loadpoapdetailresults entity)
      {
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("type", entity.type);
         row.SetField("apinvno", entity.apinvno);
         row.SetField("invdt", entity.invdt);
         row.SetField("paymtdt", entity.paymtdt);
         row.SetField("amount", entity.amount);

      }
   
   }
}
#pragma warning restore 1591
