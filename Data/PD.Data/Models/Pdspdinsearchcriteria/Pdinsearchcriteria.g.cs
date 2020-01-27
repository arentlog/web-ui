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

namespace Infor.Sxe.PD.Data.Models.Pdspdinsearchcriteria
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdinsearchcriteria.Pdinsearchcriteria")]
   public partial class Pdinsearchcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string orderno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string claimno { get; set; }
      public DateTime? invfrdt { get; set; }
      public DateTime? invtodt { get; set; }
      [StringValidationAttribute]
      public string origordno { get; set; }
      public DateTime? paidfrdt { get; set; }
      public DateTime? paidtodt { get; set; }
      [StringValidationAttribute]
      public string origordpo { get; set; }
      [StringValidationAttribute]
      public string statusty { get; set; }
      public bool tolexpfl { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdinsearchcriteria BuildPdinsearchcriteriaFromRow(DataRow row)
      {
         Pdinsearchcriteria entity = new Pdinsearchcriteria();
         entity.orderno = row.IsNull("orderno") ? string.Empty : row.Field<string>("orderno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.claimno = row.IsNull("claimno") ? string.Empty : row.Field<string>("claimno");
         entity.invfrdt = row.Field<DateTime?>("invfrdt");
         entity.invtodt = row.Field<DateTime?>("invtodt");
         entity.origordno = row.IsNull("origordno") ? string.Empty : row.Field<string>("origordno");
         entity.paidfrdt = row.Field<DateTime?>("paidfrdt");
         entity.paidtodt = row.Field<DateTime?>("paidtodt");
         entity.origordpo = row.IsNull("origordpo") ? string.Empty : row.Field<string>("origordpo");
         entity.statusty = row.IsNull("statusty") ? string.Empty : row.Field<string>("statusty");
         entity.tolexpfl = row.Field<bool>("tolexpfl");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdinsearchcriteria(ref DataRow row, Pdinsearchcriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("vendno", entity.vendno);
         row.SetField("claimno", entity.claimno);
         row.SetField("invfrdt", entity.invfrdt);
         row.SetField("invtodt", entity.invtodt);
         row.SetField("origordno", entity.origordno);
         row.SetField("paidfrdt", entity.paidfrdt);
         row.SetField("paidtodt", entity.paidtodt);
         row.SetField("origordpo", entity.origordpo);
         row.SetField("statusty", entity.statusty);
         row.SetField("tolexpfl", entity.tolexpfl);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
