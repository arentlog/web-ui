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

namespace Infor.Sxe.PTX.Data.Models.Pdsptxtranslist
{
   [ModelName("Infor.Sxe.PTX.Data.Models.Pdsptxtranslist.Ptxtranslistcriteria")]
   public partial class Ptxtranslistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string exchgtransty { get; set; }
      [StringValidationAttribute]
      public string distpartnerid { get; set; }
      public decimal vendno { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string custpartnerid { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string reportcd { get; set; }
      public DateTime? begrecondt { get; set; }
      public DateTime? endrecondt { get; set; }
      public DateTime? begenterdt { get; set; }
      public DateTime? endenterdt { get; set; }
      public DateTime? begdistinvdt { get; set; }
      public DateTime? enddistinvdt { get; set; }
      public DateTime? begreporteddt { get; set; }
      public DateTime? endreporteddt { get; set; }
      [StringValidationAttribute]
      public string keywordhdr { get; set; }
      public int recordcountlimit { get; set; }


      public static Ptxtranslistcriteria BuildPtxtranslistcriteriaFromRow(DataRow row)
      {
         Ptxtranslistcriteria entity = new Ptxtranslistcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.exchgtransty = row.IsNull("exchgtransty") ? string.Empty : row.Field<string>("exchgtransty");
         entity.distpartnerid = row.IsNull("distpartnerid") ? string.Empty : row.Field<string>("distpartnerid");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.custpartnerid = row.IsNull("custpartnerid") ? string.Empty : row.Field<string>("custpartnerid");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.reportcd = row.IsNull("reportcd") ? string.Empty : row.Field<string>("reportcd");
         entity.begrecondt = row.Field<DateTime?>("begrecondt");
         entity.endrecondt = row.Field<DateTime?>("endrecondt");
         entity.begenterdt = row.Field<DateTime?>("begenterdt");
         entity.endenterdt = row.Field<DateTime?>("endenterdt");
         entity.begdistinvdt = row.Field<DateTime?>("begdistinvdt");
         entity.enddistinvdt = row.Field<DateTime?>("enddistinvdt");
         entity.begreporteddt = row.Field<DateTime?>("begreporteddt");
         entity.endreporteddt = row.Field<DateTime?>("endreporteddt");
         entity.keywordhdr = row.IsNull("keywordhdr") ? string.Empty : row.Field<string>("keywordhdr");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPtxtranslistcriteria(ref DataRow row, Ptxtranslistcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("exchgtransty", entity.exchgtransty);
         row.SetField("distpartnerid", entity.distpartnerid);
         row.SetField("vendno", entity.vendno);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("custpartnerid", entity.custpartnerid);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("statustype", entity.statustype);
         row.SetField("reportcd", entity.reportcd);
         row.SetField("begrecondt", entity.begrecondt);
         row.SetField("endrecondt", entity.endrecondt);
         row.SetField("begenterdt", entity.begenterdt);
         row.SetField("endenterdt", entity.endenterdt);
         row.SetField("begdistinvdt", entity.begdistinvdt);
         row.SetField("enddistinvdt", entity.enddistinvdt);
         row.SetField("begreporteddt", entity.begreporteddt);
         row.SetField("endreporteddt", entity.endreporteddt);
         row.SetField("keywordhdr", entity.keywordhdr);
         row.SetField("recordcountlimit", entity.recordcountlimit);

      }
   
   }
}
#pragma warning restore 1591
