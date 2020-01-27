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

namespace Infor.Sxe.Shared.Data.Models.Pdsemaillistforedi
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsemaillistforedi.Emaillistforediresults")]
   public partial class Emaillistforediresults : ModelBase
   {
      [StringValidationAttribute]
      public string firstnm { get; set; }
      [StringValidationAttribute]
      public string lastnm { get; set; }
      [StringValidationAttribute]
      public string email { get; set; }
      [StringValidationAttribute]
      public string doctype { get; set; }
      [StringValidationAttribute]
      public string primarykey { get; set; }
      [StringValidationAttribute]
      public string secondarykey { get; set; }
      public decimal contactid { get; set; }
      [StringValidationAttribute]
      public string csubtype { get; set; }
      public bool lselect { get; set; }
      public bool emaillinkexists { get; set; }


      public static Emaillistforediresults BuildEmaillistforediresultsFromRow(DataRow row)
      {
         Emaillistforediresults entity = new Emaillistforediresults();
         entity.firstnm = row.IsNull("firstnm") ? string.Empty : row.Field<string>("firstnm");
         entity.lastnm = row.IsNull("lastnm") ? string.Empty : row.Field<string>("lastnm");
         entity.email = row.IsNull("email") ? string.Empty : row.Field<string>("email");
         entity.doctype = row.IsNull("doctype") ? string.Empty : row.Field<string>("doctype");
         entity.primarykey = row.IsNull("primarykey") ? string.Empty : row.Field<string>("primarykey");
         entity.secondarykey = row.IsNull("secondarykey") ? string.Empty : row.Field<string>("secondarykey");
         entity.contactid = row.IsNull("contactid") ? decimal.Zero : row.Field<decimal>("contactid");
         entity.csubtype = row.IsNull("csubtype") ? string.Empty : row.Field<string>("csubtype");
         entity.lselect = row.Field<bool>("lselect");
         entity.emaillinkexists = row.Field<bool>("emaillinkexists");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEmaillistforediresults(ref DataRow row, Emaillistforediresults entity)
      {
         row.SetField("firstnm", entity.firstnm);
         row.SetField("lastnm", entity.lastnm);
         row.SetField("email", entity.email);
         row.SetField("doctype", entity.doctype);
         row.SetField("primarykey", entity.primarykey);
         row.SetField("secondarykey", entity.secondarykey);
         row.SetField("contactid", entity.contactid);
         row.SetField("csubtype", entity.csubtype);
         row.SetField("lselect", entity.lselect);
         row.SetField("emaillinkexists", entity.emaillinkexists);

      }
   
   }
}
#pragma warning restore 1591