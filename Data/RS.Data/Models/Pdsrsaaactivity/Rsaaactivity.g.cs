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

namespace Infor.Sxe.RS.Data.Models.Pdsrsaaactivity
{
   [ModelName("Infor.Sxe.RS.Data.Models.Pdsrsaaactivity.Rsaaactivity")]
   public partial class Rsaaactivity : ModelBase
   {
      [StringValidationAttribute]
      public string queuenm { get; set; }
      public DateTime? startdt { get; set; }
      public int starttm { get; set; }
      [StringValidationAttribute]
      public string starttmdisp { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string jobnm { get; set; }
      [StringValidationAttribute]
      public string inusety { get; set; }
      public int cono { get; set; }
      public bool reportfl { get; set; }
      [StringValidationAttribute]
      public string startty { get; set; }
      public bool delfl { get; set; }
      [StringValidationAttribute]
      public string currproc { get; set; }
      [StringValidationAttribute]
      public string rpttitle { get; set; }
      public DateTime? lastrundt { get; set; }
      [StringValidationAttribute]
      public string lastruntm { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string printernm { get; set; }
      [StringValidationAttribute]
      public string rsesrowid { get; set; }
      [StringValidationAttribute]
      public string sapbrowid { get; set; }
      [StringValidationAttribute]
      public string reportnm { get; set; }
      public DateTime? startdtclient { get; set; }
      [StringValidationAttribute]
      public string cstarttmclient { get; set; }
      public int starttmclient { get; set; }
      public DateTime? lastrundtclient { get; set; }
      [StringValidationAttribute]
      public string clastruntmclient { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Rsaaactivity BuildRsaaactivityFromRow(DataRow row)
      {
         Rsaaactivity entity = new Rsaaactivity();
         entity.queuenm = row.IsNull("queuenm") ? string.Empty : row.Field<string>("queuenm");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.starttm = row.IsNull("starttm") ? 0 : row.Field<int>("starttm");
         entity.starttmdisp = row.IsNull("starttmdisp") ? string.Empty : row.Field<string>("starttmdisp");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.jobnm = row.IsNull("jobnm") ? string.Empty : row.Field<string>("jobnm");
         entity.inusety = row.IsNull("inusety") ? string.Empty : row.Field<string>("inusety");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.reportfl = row.Field<bool>("reportfl");
         entity.startty = row.IsNull("startty") ? string.Empty : row.Field<string>("startty");
         entity.delfl = row.Field<bool>("delfl");
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.rpttitle = row.IsNull("rpttitle") ? string.Empty : row.Field<string>("rpttitle");
         entity.lastrundt = row.Field<DateTime?>("lastrundt");
         entity.lastruntm = row.IsNull("lastruntm") ? string.Empty : row.Field<string>("lastruntm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.printernm = row.IsNull("printernm") ? string.Empty : row.Field<string>("printernm");
         entity.rsesrowid = row.Field<byte[]>("rsesrowid").ToStringEncoded();
         entity.sapbrowid = row.Field<byte[]>("sapbrowid").ToStringEncoded();
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.startdtclient = row.Field<DateTime?>("startdtclient");
         entity.cstarttmclient = row.IsNull("cstarttmclient") ? string.Empty : row.Field<string>("cstarttmclient");
         entity.starttmclient = row.IsNull("starttmclient") ? 0 : row.Field<int>("starttmclient");
         entity.lastrundtclient = row.Field<DateTime?>("lastrundtclient");
         entity.clastruntmclient = row.IsNull("clastruntmclient") ? string.Empty : row.Field<string>("clastruntmclient");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromRsaaactivity(ref DataRow row, Rsaaactivity entity)
      {
         row.SetField("queuenm", entity.queuenm);
         row.SetField("startdt", entity.startdt);
         row.SetField("starttm", entity.starttm);
         row.SetField("starttmdisp", entity.starttmdisp);
         row.SetField("seqno", entity.seqno);
         row.SetField("jobnm", entity.jobnm);
         row.SetField("inusety", entity.inusety);
         row.SetField("cono", entity.cono);
         row.SetField("reportfl", entity.reportfl);
         row.SetField("startty", entity.startty);
         row.SetField("delfl", entity.delfl);
         row.SetField("currproc", entity.currproc);
         row.SetField("rpttitle", entity.rpttitle);
         row.SetField("lastrundt", entity.lastrundt);
         row.SetField("lastruntm", entity.lastruntm);
         row.SetField("operinit", entity.operinit);
         row.SetField("printernm", entity.printernm);
         row.SetField("rsesrowid", entity.rsesrowid.ToByteArray());
         row.SetField("sapbrowid", entity.sapbrowid.ToByteArray());
         row.SetField("reportnm", entity.reportnm);
         row.SetField("startdtclient", entity.startdtclient);
         row.SetField("cstarttmclient", entity.cstarttmclient);
         row.SetField("starttmclient", entity.starttmclient);
         row.SetField("lastrundtclient", entity.lastrundtclient);
         row.SetField("clastruntmclient", entity.clastruntmclient);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
