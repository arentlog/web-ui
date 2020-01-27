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

namespace Infor.Sxe.RS.Data.Models.Pdsrssjlookupresults
{
   [ModelName("Infor.Sxe.RS.Data.Models.Pdsrssjlookupresults.Rssjlookupresults")]
   public partial class Rssjlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string groupnm { get; set; }
      [StringValidationAttribute]
      public string jobdesc { get; set; }
      [StringValidationAttribute]
      public string runtydesc { get; set; }
      public int interval { get; set; }
      [StringValidationAttribute]
      public string starttype { get; set; }
      public DateTime? startdt { get; set; }
      [StringValidationAttribute]
      public string starttmdisp { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Rssjlookupresults BuildRssjlookupresultsFromRow(DataRow row)
      {
         Rssjlookupresults entity = new Rssjlookupresults();
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.jobdesc = row.IsNull("jobdesc") ? string.Empty : row.Field<string>("jobdesc");
         entity.runtydesc = row.IsNull("runtydesc") ? string.Empty : row.Field<string>("runtydesc");
         entity.interval = row.IsNull("interval") ? 0 : row.Field<int>("interval");
         entity.starttype = row.IsNull("starttype") ? string.Empty : row.Field<string>("starttype");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.starttmdisp = row.IsNull("starttmdisp") ? string.Empty : row.Field<string>("starttmdisp");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromRssjlookupresults(ref DataRow row, Rssjlookupresults entity)
      {
         row.SetField("groupnm", entity.groupnm);
         row.SetField("jobdesc", entity.jobdesc);
         row.SetField("runtydesc", entity.runtydesc);
         row.SetField("interval", entity.interval);
         row.SetField("starttype", entity.starttype);
         row.SetField("startdt", entity.startdt);
         row.SetField("starttmdisp", entity.starttmdisp);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
