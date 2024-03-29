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

namespace Infor.Sxe.GL.Data.Models.Pdsgldistribution
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsgldistribution.Gldistributionresults")]
   public partial class Gldistributionresults : ModelBase
   {
      public int jrnlno { get; set; }
      public int setno { get; set; }
      public int transno { get; set; }
      [StringValidationAttribute]
      public string glaccountnumber { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string gltitle { get; set; }
      public int transcd { get; set; }
      public bool displaydebit { get; set; }
      public decimal debit { get; set; }
      public bool displaycredit { get; set; }
      public decimal credit { get; set; }


      public static Gldistributionresults BuildGldistributionresultsFromRow(DataRow row)
      {
         Gldistributionresults entity = new Gldistributionresults();
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.transno = row.IsNull("transno") ? 0 : row.Field<int>("transno");
         entity.glaccountnumber = row.IsNull("glaccountnumber") ? string.Empty : row.Field<string>("glaccountnumber");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.gltitle = row.IsNull("gltitle") ? string.Empty : row.Field<string>("gltitle");
         entity.transcd = row.IsNull("transcd") ? 0 : row.Field<int>("transcd");
         entity.displaydebit = row.Field<bool>("displaydebit");
         entity.debit = row.IsNull("debit") ? decimal.Zero : row.Field<decimal>("debit");
         entity.displaycredit = row.Field<bool>("displaycredit");
         entity.credit = row.IsNull("credit") ? decimal.Zero : row.Field<decimal>("credit");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGldistributionresults(ref DataRow row, Gldistributionresults entity)
      {
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("transno", entity.transno);
         row.SetField("glaccountnumber", entity.glaccountnumber);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("gltitle", entity.gltitle);
         row.SetField("transcd", entity.transcd);
         row.SetField("displaydebit", entity.displaydebit);
         row.SetField("debit", entity.debit);
         row.SetField("displaycredit", entity.displaycredit);
         row.SetField("credit", entity.credit);

      }
   
   }
}
#pragma warning restore 1591
