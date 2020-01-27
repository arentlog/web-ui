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

namespace Infor.Sxe.SA.Data.Models.Pdssabatchlookup
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssabatchlookup.Sabatchlookupresults")]
   public partial class Sabatchlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string batchnm { get; set; }
      [StringValidationAttribute]
      public string modulenm { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string ctype { get; set; }
      public int jrnlno { get; set; }
      [StringValidationAttribute]
      public string securinit { get; set; }
      public DateTime? createdt { get; set; }
      public DateTime? lastmtdt { get; set; }
      public DateTime? lastupdt { get; set; }
      [StringValidationAttribute]
      public string sabsRowID { get; set; }


      public static Sabatchlookupresults BuildSabatchlookupresultsFromRow(DataRow row)
      {
         Sabatchlookupresults entity = new Sabatchlookupresults();
         entity.batchnm = row.IsNull("batchnm") ? string.Empty : row.Field<string>("batchnm");
         entity.modulenm = row.IsNull("modulenm") ? string.Empty : row.Field<string>("modulenm");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.ctype = row.IsNull("ctype") ? string.Empty : row.Field<string>("ctype");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.securinit = row.IsNull("securinit") ? string.Empty : row.Field<string>("securinit");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.lastmtdt = row.Field<DateTime?>("lastmtdt");
         entity.lastupdt = row.Field<DateTime?>("lastupdt");
         entity.sabsRowID = row.Field<byte[]>("sabsRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSabatchlookupresults(ref DataRow row, Sabatchlookupresults entity)
      {
         row.SetField("batchnm", entity.batchnm);
         row.SetField("modulenm", entity.modulenm);
         row.SetField("descrip", entity.descrip);
         row.SetField("ctype", entity.ctype);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("securinit", entity.securinit);
         row.SetField("createdt", entity.createdt);
         row.SetField("lastmtdt", entity.lastmtdt);
         row.SetField("lastupdt", entity.lastupdt);
         row.SetField("sabsRowID", entity.sabsRowID.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591