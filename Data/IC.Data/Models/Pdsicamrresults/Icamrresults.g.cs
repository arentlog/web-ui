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

namespace Infor.Sxe.IC.Data.Models.Pdsicamrresults
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamrresults.Icamrresults")]
   public partial class Icamrresults : ModelBase
   {
      public int reportno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodnotesfl { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string origmethodcd { get; set; }
      [StringValidationAttribute]
      public string origmethoddesc { get; set; }
      [StringValidationAttribute]
      public string newmethodcd { get; set; }
      [StringValidationAttribute]
      public string newmethoddesc { get; set; }
      public decimal usagegoal { get; set; }
      public decimal usagerate { get; set; }
      public decimal percent { get; set; }
      [StringValidationAttribute]
      public string icamaprowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamrresults BuildIcamrresultsFromRow(DataRow row)
      {
         Icamrresults entity = new Icamrresults();
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodnotesfl = row.IsNull("prodnotesfl") ? string.Empty : row.Field<string>("prodnotesfl");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.origmethodcd = row.IsNull("origmethodcd") ? string.Empty : row.Field<string>("origmethodcd");
         entity.origmethoddesc = row.IsNull("origmethoddesc") ? string.Empty : row.Field<string>("origmethoddesc");
         entity.newmethodcd = row.IsNull("newmethodcd") ? string.Empty : row.Field<string>("newmethodcd");
         entity.newmethoddesc = row.IsNull("newmethoddesc") ? string.Empty : row.Field<string>("newmethoddesc");
         entity.usagegoal = row.IsNull("usagegoal") ? decimal.Zero : row.Field<decimal>("usagegoal");
         entity.usagerate = row.IsNull("usagerate") ? decimal.Zero : row.Field<decimal>("usagerate");
         entity.percent = row.IsNull("percent") ? decimal.Zero : row.Field<decimal>("percent");
         entity.icamaprowid = row.Field<byte[]>("icamaprowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamrresults(ref DataRow row, Icamrresults entity)
      {
         row.SetField("reportno", entity.reportno);
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("prodnotesfl", entity.prodnotesfl);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("origmethodcd", entity.origmethodcd);
         row.SetField("origmethoddesc", entity.origmethoddesc);
         row.SetField("newmethodcd", entity.newmethodcd);
         row.SetField("newmethoddesc", entity.newmethoddesc);
         row.SetField("usagegoal", entity.usagegoal);
         row.SetField("usagerate", entity.usagerate);
         row.SetField("percent", entity.percent);
         row.SetField("icamaprowid", entity.icamaprowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
