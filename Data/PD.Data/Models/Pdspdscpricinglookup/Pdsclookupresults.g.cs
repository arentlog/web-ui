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

namespace Infor.Sxe.PD.Data.Models.Pdspdscpricinglookup
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdscpricinglookup.Pdsclookupresults")]
   public partial class Pdsclookupresults : ModelBase
   {
      public DateTime? startdt { get; set; }
      public DateTime? enddt { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public bool statustype { get; set; }
      [StringValidationAttribute]
      public string rowidPdsc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsclookupresults BuildPdsclookupresultsFromRow(DataRow row)
      {
         Pdsclookupresults entity = new Pdsclookupresults();
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.enddt = row.Field<DateTime?>("enddt");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.statustype = row.Field<bool>("statustype");
         entity.rowidPdsc = row.Field<byte[]>("rowid-pdsc").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsclookupresults(ref DataRow row, Pdsclookupresults entity)
      {
         row.SetField("startdt", entity.startdt);
         row.SetField("enddt", entity.enddt);
         row.SetField("refer", entity.refer);
         row.SetField("statustype", entity.statustype);
         row.SetField("rowid-pdsc", entity.rowidPdsc.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591