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

namespace Infor.Sxe.KP.Data.Models.Pdskptallymixlookup
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdskptallymixlookup.Kptallymixlookupresults")]
   public partial class Kptallymixlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string comprod { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public int length { get; set; }
      public int pomixpct { get; set; }
      public int oemixpct { get; set; }
      [StringValidationAttribute]
      public string rowidKpsm { get; set; }


      public static Kptallymixlookupresults BuildKptallymixlookupresultsFromRow(DataRow row)
      {
         Kptallymixlookupresults entity = new Kptallymixlookupresults();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.comprod = row.IsNull("comprod") ? string.Empty : row.Field<string>("comprod");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.length = row.IsNull("length") ? 0 : row.Field<int>("length");
         entity.pomixpct = row.IsNull("pomixpct") ? 0 : row.Field<int>("pomixpct");
         entity.oemixpct = row.IsNull("oemixpct") ? 0 : row.Field<int>("oemixpct");
         entity.rowidKpsm = row.Field<byte[]>("rowid-kpsm").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKptallymixlookupresults(ref DataRow row, Kptallymixlookupresults entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("comprod", entity.comprod);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("descrip", entity.descrip);
         row.SetField("length", entity.length);
         row.SetField("pomixpct", entity.pomixpct);
         row.SetField("oemixpct", entity.oemixpct);
         row.SetField("rowid-kpsm", entity.rowidKpsm.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591
