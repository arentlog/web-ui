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

namespace Infor.Sxe.SL.Data.Models.Pdsslvendcdlookup
{
   [ModelName("Infor.Sxe.SL.Data.Models.Pdsslvendcdlookup.Slvendcdlookupresults")]
   public partial class Slvendcdlookupresults : ModelBase
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string imptype { get; set; }
      [StringValidationAttribute]
      public string vendcd { get; set; }
      [StringValidationAttribute]
      public string lookupnm { get; set; }
      [StringValidationAttribute]
      public string linecd { get; set; }
      [StringValidationAttribute]
      public string slsnrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Slvendcdlookupresults BuildSlvendcdlookupresultsFromRow(DataRow row)
      {
         Slvendcdlookupresults entity = new Slvendcdlookupresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.imptype = row.IsNull("imptype") ? string.Empty : row.Field<string>("imptype");
         entity.vendcd = row.IsNull("vendcd") ? string.Empty : row.Field<string>("vendcd");
         entity.lookupnm = row.IsNull("lookupnm") ? string.Empty : row.Field<string>("lookupnm");
         entity.linecd = row.IsNull("linecd") ? string.Empty : row.Field<string>("linecd");
         entity.slsnrowid = row.Field<byte[]>("slsnrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSlvendcdlookupresults(ref DataRow row, Slvendcdlookupresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("imptype", entity.imptype);
         row.SetField("vendcd", entity.vendcd);
         row.SetField("lookupnm", entity.lookupnm);
         row.SetField("linecd", entity.linecd);
         row.SetField("slsnrowid", entity.slsnrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
