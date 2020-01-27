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

namespace Infor.Sxe.KP.Data.Models.Pdskpoptionlookup
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdskpoptionlookup.Kpoptionlookupresults")]
   public partial class Kpoptionlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string optionname { get; set; }
      [StringValidationAttribute]
      public string rowidKpso { get; set; }


      public static Kpoptionlookupresults BuildKpoptionlookupresultsFromRow(DataRow row)
      {
         Kpoptionlookupresults entity = new Kpoptionlookupresults();
         entity.optionname = row.IsNull("optionname") ? string.Empty : row.Field<string>("optionname");
         entity.rowidKpso = row.Field<byte[]>("rowid-kpso").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKpoptionlookupresults(ref DataRow row, Kpoptionlookupresults entity)
      {
         row.SetField("optionname", entity.optionname);
         row.SetField("rowid-kpso", entity.rowidKpso.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591