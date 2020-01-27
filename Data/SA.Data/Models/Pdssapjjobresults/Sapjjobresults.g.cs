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

namespace Infor.Sxe.SA.Data.Models.Pdssapjjobresults
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssapjjobresults.Sapjjobresults")]
   public partial class Sapjjobresults : ModelBase
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string reportnm { get; set; }
      [StringValidationAttribute]
      public string inusecd { get; set; }
      public bool delfl { get; set; }
      [StringValidationAttribute]
      public string currproc { get; set; }
      [StringValidationAttribute]
      public string rpttitle { get; set; }
      public bool demandfl { get; set; }
      [StringValidationAttribute]
      public string batchnm { get; set; }
      public int priority { get; set; }
      [StringValidationAttribute]
      public string printernm { get; set; }
      public DateTime? startdt { get; set; }
      public int starttm { get; set; }
      [StringValidationAttribute]
      public string starttmdisp { get; set; }
      [StringValidationAttribute]
      public string starttype { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string sapbrowid { get; set; }
      public DateTime? startdtclient { get; set; }
      public int starttmclient { get; set; }
      [StringValidationAttribute]
      public string cstarttmclient { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sapjjobresults BuildSapjjobresultsFromRow(DataRow row)
      {
         Sapjjobresults entity = new Sapjjobresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.inusecd = row.IsNull("inusecd") ? string.Empty : row.Field<string>("inusecd");
         entity.delfl = row.Field<bool>("delfl");
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.rpttitle = row.IsNull("rpttitle") ? string.Empty : row.Field<string>("rpttitle");
         entity.demandfl = row.Field<bool>("demandfl");
         entity.batchnm = row.IsNull("batchnm") ? string.Empty : row.Field<string>("batchnm");
         entity.priority = row.IsNull("priority") ? 0 : row.Field<int>("priority");
         entity.printernm = row.IsNull("printernm") ? string.Empty : row.Field<string>("printernm");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.starttm = row.IsNull("starttm") ? 0 : row.Field<int>("starttm");
         entity.starttmdisp = row.IsNull("starttmdisp") ? string.Empty : row.Field<string>("starttmdisp");
         entity.starttype = row.IsNull("starttype") ? string.Empty : row.Field<string>("starttype");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.sapbrowid = row.Field<byte[]>("sapbrowid").ToStringEncoded();
         entity.startdtclient = row.Field<DateTime?>("startdtclient");
         entity.starttmclient = row.IsNull("starttmclient") ? 0 : row.Field<int>("starttmclient");
         entity.cstarttmclient = row.IsNull("cstarttmclient") ? string.Empty : row.Field<string>("cstarttmclient");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSapjjobresults(ref DataRow row, Sapjjobresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("inusecd", entity.inusecd);
         row.SetField("delfl", entity.delfl);
         row.SetField("currproc", entity.currproc);
         row.SetField("rpttitle", entity.rpttitle);
         row.SetField("demandfl", entity.demandfl);
         row.SetField("batchnm", entity.batchnm);
         row.SetField("priority", entity.priority);
         row.SetField("printernm", entity.printernm);
         row.SetField("startdt", entity.startdt);
         row.SetField("starttm", entity.starttm);
         row.SetField("starttmdisp", entity.starttmdisp);
         row.SetField("starttype", entity.starttype);
         row.SetField("operinit", entity.operinit);
         row.SetField("sapbrowid", entity.sapbrowid.ToByteArray());
         row.SetField("startdtclient", entity.startdtclient);
         row.SetField("starttmclient", entity.starttmclient);
         row.SetField("cstarttmclient", entity.cstarttmclient);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
