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

namespace Infor.Sxe.IC.Data.Models.Pdsicseglookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicseglookup.Icseglookupresults")]
   public partial class Icseglookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string icsegrowid { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string custtype { get; set; }
      [StringValidationAttribute]
      public string salesrep { get; set; }
      [StringValidationAttribute]
      public string cogsadj { get; set; }
      [StringValidationAttribute]
      public string key1 { get; set; }
      [StringValidationAttribute]
      public string key2 { get; set; }
      [StringValidationAttribute]
      public string prodcatdesc { get; set; }
      [StringValidationAttribute]
      public string whsename { get; set; }
      [StringValidationAttribute]
      public string custtypedesc { get; set; }
      [StringValidationAttribute]
      public string salesrepname { get; set; }
      [StringValidationAttribute]
      public string cogsadjdesc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icseglookupresults BuildIcseglookupresultsFromRow(DataRow row)
      {
         Icseglookupresults entity = new Icseglookupresults();
         entity.icsegrowid = row.Field<byte[]>("icsegrowid").ToStringEncoded();
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.custtype = row.IsNull("custtype") ? string.Empty : row.Field<string>("custtype");
         entity.salesrep = row.IsNull("salesrep") ? string.Empty : row.Field<string>("salesrep");
         entity.cogsadj = row.IsNull("cogsadj") ? string.Empty : row.Field<string>("cogsadj");
         entity.key1 = row.IsNull("key1") ? string.Empty : row.Field<string>("key1");
         entity.key2 = row.IsNull("key2") ? string.Empty : row.Field<string>("key2");
         entity.prodcatdesc = row.IsNull("prodcatdesc") ? string.Empty : row.Field<string>("prodcatdesc");
         entity.whsename = row.IsNull("whsename") ? string.Empty : row.Field<string>("whsename");
         entity.custtypedesc = row.IsNull("custtypedesc") ? string.Empty : row.Field<string>("custtypedesc");
         entity.salesrepname = row.IsNull("salesrepname") ? string.Empty : row.Field<string>("salesrepname");
         entity.cogsadjdesc = row.IsNull("cogsadjdesc") ? string.Empty : row.Field<string>("cogsadjdesc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcseglookupresults(ref DataRow row, Icseglookupresults entity)
      {
         row.SetField("icsegrowid", entity.icsegrowid.ToByteArray());
         row.SetField("prodcat", entity.prodcat);
         row.SetField("whse", entity.whse);
         row.SetField("custtype", entity.custtype);
         row.SetField("salesrep", entity.salesrep);
         row.SetField("cogsadj", entity.cogsadj);
         row.SetField("key1", entity.key1);
         row.SetField("key2", entity.key2);
         row.SetField("prodcatdesc", entity.prodcatdesc);
         row.SetField("whsename", entity.whsename);
         row.SetField("custtypedesc", entity.custtypedesc);
         row.SetField("salesrepname", entity.salesrepname);
         row.SetField("cogsadjdesc", entity.cogsadjdesc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
