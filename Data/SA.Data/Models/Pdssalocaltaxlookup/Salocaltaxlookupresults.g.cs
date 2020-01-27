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

namespace Infor.Sxe.SA.Data.Models.Pdssalocaltaxlookup
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssalocaltaxlookup.Salocaltaxlookupresults")]
   public partial class Salocaltaxlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string taxauth { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string glno { get; set; }
      [StringValidationAttribute]
      public string rowidSasgl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Salocaltaxlookupresults BuildSalocaltaxlookupresultsFromRow(DataRow row)
      {
         Salocaltaxlookupresults entity = new Salocaltaxlookupresults();
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.taxauth = row.IsNull("taxauth") ? string.Empty : row.Field<string>("taxauth");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.glno = row.IsNull("glno") ? string.Empty : row.Field<string>("glno");
         entity.rowidSasgl = row.Field<byte[]>("rowid-sasgl").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSalocaltaxlookupresults(ref DataRow row, Salocaltaxlookupresults entity)
      {
         row.SetField("state", entity.state);
         row.SetField("taxauth", entity.taxauth);
         row.SetField("descrip", entity.descrip);
         row.SetField("glno", entity.glno);
         row.SetField("rowid-sasgl", entity.rowidSasgl.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591