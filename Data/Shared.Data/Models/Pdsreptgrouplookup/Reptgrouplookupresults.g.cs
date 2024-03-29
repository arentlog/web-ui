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

namespace Infor.Sxe.Shared.Data.Models.Pdsreptgrouplookup
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsreptgrouplookup.Reptgrouplookupresults")]
   public partial class Reptgrouplookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string batchnm { get; set; }
      public int cono { get; set; }
      public int priority { get; set; }
      [StringValidationAttribute]
      public string reportnm { get; set; }
      [StringValidationAttribute]
      public string rpttitle { get; set; }
      [StringValidationAttribute]
      public string currproc { get; set; }
      [StringValidationAttribute]
      public string sapbRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Reptgrouplookupresults BuildReptgrouplookupresultsFromRow(DataRow row)
      {
         Reptgrouplookupresults entity = new Reptgrouplookupresults();
         entity.batchnm = row.IsNull("batchnm") ? string.Empty : row.Field<string>("batchnm");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.priority = row.IsNull("priority") ? 0 : row.Field<int>("priority");
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.rpttitle = row.IsNull("rpttitle") ? string.Empty : row.Field<string>("rpttitle");
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.sapbRowid = row.Field<byte[]>("sapb-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromReptgrouplookupresults(ref DataRow row, Reptgrouplookupresults entity)
      {
         row.SetField("batchnm", entity.batchnm);
         row.SetField("cono", entity.cono);
         row.SetField("priority", entity.priority);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("rpttitle", entity.rpttitle);
         row.SetField("currproc", entity.currproc);
         row.SetField("sapb-rowid", entity.sapbRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
