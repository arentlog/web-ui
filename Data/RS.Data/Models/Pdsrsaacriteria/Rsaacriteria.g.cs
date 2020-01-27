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

namespace Infor.Sxe.RS.Data.Models.Pdsrsaacriteria
{
   [ModelName("Infor.Sxe.RS.Data.Models.Pdsrsaacriteria.Rsaacriteria")]
   public partial class Rsaacriteria : ModelBase
   {
      [StringValidationAttribute]
      public string queuenm { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string queuepri { get; set; }
      [StringValidationAttribute]
      public string jobcount { get; set; }
      [StringValidationAttribute]
      public string nomaxjobs { get; set; }
      [StringValidationAttribute]
      public string begintm { get; set; }
      [StringValidationAttribute]
      public string endtm { get; set; }
      public int cono { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public bool typefl { get; set; }
      [StringValidationAttribute]
      public string jobnm { get; set; }
      [StringValidationAttribute]
      public string proc { get; set; }
      [StringValidationAttribute]
      public string statuscd { get; set; }
      [StringValidationAttribute]
      public string starttype { get; set; }
      [StringValidationAttribute]
      public string rpttype { get; set; }
      public DateTime? startdt { get; set; }
      public int fromhour { get; set; }
      public int fromminute { get; set; }
      [StringValidationAttribute]
      public string fromam { get; set; }
      public int tohour { get; set; }
      public int tominute { get; set; }
      [StringValidationAttribute]
      public string toam { get; set; }
      [StringValidationAttribute]
      public string printtype { get; set; }
      [StringValidationAttribute]
      public string printer { get; set; }
      [StringValidationAttribute]
      public string jobtmp { get; set; }
      [StringValidationAttribute]
      public string grouptmp { get; set; }
      public bool ladminfl { get; set; }
      [StringValidationAttribute]
      public string cTrMgrLang { get; set; }
      [StringValidationAttribute]
      public string useindex { get; set; }
      public int timezoneclient { get; set; }
      public bool printerhidden { get; set; }
      public int recordCountLimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Rsaacriteria BuildRsaacriteriaFromRow(DataRow row)
      {
         Rsaacriteria entity = new Rsaacriteria();
         entity.queuenm = row.IsNull("queuenm") ? string.Empty : row.Field<string>("queuenm");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.queuepri = row.IsNull("queuepri") ? string.Empty : row.Field<string>("queuepri");
         entity.jobcount = row.IsNull("jobcount") ? string.Empty : row.Field<string>("jobcount");
         entity.nomaxjobs = row.IsNull("nomaxjobs") ? string.Empty : row.Field<string>("nomaxjobs");
         entity.begintm = row.IsNull("begintm") ? string.Empty : row.Field<string>("begintm");
         entity.endtm = row.IsNull("endtm") ? string.Empty : row.Field<string>("endtm");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.typefl = row.Field<bool>("typefl");
         entity.jobnm = row.IsNull("jobnm") ? string.Empty : row.Field<string>("jobnm");
         entity.proc = row.IsNull("proc") ? string.Empty : row.Field<string>("proc");
         entity.statuscd = row.IsNull("statuscd") ? string.Empty : row.Field<string>("statuscd");
         entity.starttype = row.IsNull("starttype") ? string.Empty : row.Field<string>("starttype");
         entity.rpttype = row.IsNull("rpttype") ? string.Empty : row.Field<string>("rpttype");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.fromhour = row.IsNull("fromhour") ? 0 : row.Field<int>("fromhour");
         entity.fromminute = row.IsNull("fromminute") ? 0 : row.Field<int>("fromminute");
         entity.fromam = row.IsNull("fromam") ? string.Empty : row.Field<string>("fromam");
         entity.tohour = row.IsNull("tohour") ? 0 : row.Field<int>("tohour");
         entity.tominute = row.IsNull("tominute") ? 0 : row.Field<int>("tominute");
         entity.toam = row.IsNull("toam") ? string.Empty : row.Field<string>("toam");
         entity.printtype = row.IsNull("printtype") ? string.Empty : row.Field<string>("printtype");
         entity.printer = row.IsNull("printer") ? string.Empty : row.Field<string>("printer");
         entity.jobtmp = row.IsNull("jobtmp") ? string.Empty : row.Field<string>("jobtmp");
         entity.grouptmp = row.IsNull("grouptmp") ? string.Empty : row.Field<string>("grouptmp");
         entity.ladminfl = row.Field<bool>("ladminfl");
         entity.cTrMgrLang = row.IsNull("cTrMgrLang") ? string.Empty : row.Field<string>("cTrMgrLang");
         entity.useindex = row.IsNull("useindex") ? string.Empty : row.Field<string>("useindex");
         entity.timezoneclient = row.IsNull("timezoneclient") ? 0 : row.Field<int>("timezoneclient");
         entity.printerhidden = row.Field<bool>("printerhidden");
         entity.recordCountLimit = row.IsNull("recordCountLimit") ? 0 : row.Field<int>("recordCountLimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromRsaacriteria(ref DataRow row, Rsaacriteria entity)
      {
         row.SetField("queuenm", entity.queuenm);
         row.SetField("descrip", entity.descrip);
         row.SetField("statustype", entity.statustype);
         row.SetField("queuepri", entity.queuepri);
         row.SetField("jobcount", entity.jobcount);
         row.SetField("nomaxjobs", entity.nomaxjobs);
         row.SetField("begintm", entity.begintm);
         row.SetField("endtm", entity.endtm);
         row.SetField("cono", entity.cono);
         row.SetField("operinit", entity.operinit);
         row.SetField("typefl", entity.typefl);
         row.SetField("jobnm", entity.jobnm);
         row.SetField("proc", entity.proc);
         row.SetField("statuscd", entity.statuscd);
         row.SetField("starttype", entity.starttype);
         row.SetField("rpttype", entity.rpttype);
         row.SetField("startdt", entity.startdt);
         row.SetField("fromhour", entity.fromhour);
         row.SetField("fromminute", entity.fromminute);
         row.SetField("fromam", entity.fromam);
         row.SetField("tohour", entity.tohour);
         row.SetField("tominute", entity.tominute);
         row.SetField("toam", entity.toam);
         row.SetField("printtype", entity.printtype);
         row.SetField("printer", entity.printer);
         row.SetField("jobtmp", entity.jobtmp);
         row.SetField("grouptmp", entity.grouptmp);
         row.SetField("ladminfl", entity.ladminfl);
         row.SetField("cTrMgrLang", entity.cTrMgrLang);
         row.SetField("useindex", entity.useindex);
         row.SetField("timezoneclient", entity.timezoneclient);
         row.SetField("printerhidden", entity.printerhidden);
         row.SetField("recordCountLimit", entity.recordCountLimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
