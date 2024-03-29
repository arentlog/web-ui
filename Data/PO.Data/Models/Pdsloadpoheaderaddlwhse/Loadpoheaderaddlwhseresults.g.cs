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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpoheaderaddlwhse
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpoheaderaddlwhse.Loadpoheaderaddlwhseresults")]
   public partial class Loadpoheaderaddlwhseresults : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string billtowhse { get; set; }
      [StringValidationAttribute]
      public string shiptonm { get; set; }
      [StringValidationAttribute]
      public string billtoname { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr1 { get; set; }
      [StringValidationAttribute]
      public string billtoaddr1 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr2 { get; set; }
      [StringValidationAttribute]
      public string billtoaddr2 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr3 { get; set; }
      [StringValidationAttribute]
      public string billtoaddr3 { get; set; }
      [StringValidationAttribute]
      public string shiptocity { get; set; }
      [StringValidationAttribute]
      public string billtocity { get; set; }
      [StringValidationAttribute]
      public string shiptost { get; set; }
      [StringValidationAttribute]
      public string shiptozip { get; set; }
      [StringValidationAttribute]
      public string billtost { get; set; }
      [StringValidationAttribute]
      public string billtozip { get; set; }
      [StringValidationAttribute]
      public string billtophoneno { get; set; }
      [StringValidationAttribute]
      public string shiptophone { get; set; }
      [StringValidationAttribute]
      public string countrycd { get; set; }
      [StringValidationAttribute]
      public string billtocountrycd { get; set; }
      public string CompleteAddress { get { return this.shiptoaddr1 + "," + this.shiptocity + "," + this.shiptost + "," + this.shiptozip; } }


      public static Loadpoheaderaddlwhseresults BuildLoadpoheaderaddlwhseresultsFromRow(DataRow row)
      {
         Loadpoheaderaddlwhseresults entity = new Loadpoheaderaddlwhseresults();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.billtowhse = row.IsNull("billtowhse") ? string.Empty : row.Field<string>("billtowhse");
         entity.shiptonm = row.IsNull("shiptonm") ? string.Empty : row.Field<string>("shiptonm");
         entity.billtoname = row.IsNull("billtoname") ? string.Empty : row.Field<string>("billtoname");
         entity.shiptoaddr1 = row.IsNull("shiptoaddr1") ? string.Empty : row.Field<string>("shiptoaddr1");
         entity.billtoaddr1 = row.IsNull("billtoaddr1") ? string.Empty : row.Field<string>("billtoaddr1");
         entity.shiptoaddr2 = row.IsNull("shiptoaddr2") ? string.Empty : row.Field<string>("shiptoaddr2");
         entity.billtoaddr2 = row.IsNull("billtoaddr2") ? string.Empty : row.Field<string>("billtoaddr2");
         entity.shiptoaddr3 = row.IsNull("shiptoaddr3") ? string.Empty : row.Field<string>("shiptoaddr3");
         entity.billtoaddr3 = row.IsNull("billtoaddr3") ? string.Empty : row.Field<string>("billtoaddr3");
         entity.shiptocity = row.IsNull("shiptocity") ? string.Empty : row.Field<string>("shiptocity");
         entity.billtocity = row.IsNull("billtocity") ? string.Empty : row.Field<string>("billtocity");
         entity.shiptost = row.IsNull("shiptost") ? string.Empty : row.Field<string>("shiptost");
         entity.shiptozip = row.IsNull("shiptozip") ? string.Empty : row.Field<string>("shiptozip");
         entity.billtost = row.IsNull("billtost") ? string.Empty : row.Field<string>("billtost");
         entity.billtozip = row.IsNull("billtozip") ? string.Empty : row.Field<string>("billtozip");
         entity.billtophoneno = row.IsNull("billtophoneno") ? string.Empty : row.Field<string>("billtophoneno");
         entity.shiptophone = row.IsNull("shiptophone") ? string.Empty : row.Field<string>("shiptophone");
         entity.countrycd = row.IsNull("countrycd") ? string.Empty : row.Field<string>("countrycd");
         entity.billtocountrycd = row.IsNull("billtocountrycd") ? string.Empty : row.Field<string>("billtocountrycd");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpoheaderaddlwhseresults(ref DataRow row, Loadpoheaderaddlwhseresults entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("billtowhse", entity.billtowhse);
         row.SetField("shiptonm", entity.shiptonm);
         row.SetField("billtoname", entity.billtoname);
         row.SetField("shiptoaddr1", entity.shiptoaddr1);
         row.SetField("billtoaddr1", entity.billtoaddr1);
         row.SetField("shiptoaddr2", entity.shiptoaddr2);
         row.SetField("billtoaddr2", entity.billtoaddr2);
         row.SetField("shiptoaddr3", entity.shiptoaddr3);
         row.SetField("billtoaddr3", entity.billtoaddr3);
         row.SetField("shiptocity", entity.shiptocity);
         row.SetField("billtocity", entity.billtocity);
         row.SetField("shiptost", entity.shiptost);
         row.SetField("shiptozip", entity.shiptozip);
         row.SetField("billtost", entity.billtost);
         row.SetField("billtozip", entity.billtozip);
         row.SetField("billtophoneno", entity.billtophoneno);
         row.SetField("shiptophone", entity.shiptophone);
         row.SetField("countrycd", entity.countrycd);
         row.SetField("billtocountrycd", entity.billtocountrycd);

      }
   
   }
}
#pragma warning restore 1591
