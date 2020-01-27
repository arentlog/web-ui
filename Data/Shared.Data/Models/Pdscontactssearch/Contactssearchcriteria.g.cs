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

namespace Infor.Sxe.Shared.Data.Models.Pdscontactssearch
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdscontactssearch.Contactssearchcriteria")]
   public partial class Contactssearchcriteria : ModelBase
   {
      public decimal contactid { get; set; }
      [StringValidationAttribute]
      public string subjectroletype { get; set; }
      [StringValidationAttribute]
      public string subjectprimarykey { get; set; }
      [StringValidationAttribute]
      public string subjectsecondarykey { get; set; }
      [StringValidationAttribute]
      public string firstnm { get; set; }
      [StringValidationAttribute]
      public string lastnm { get; set; }
      [StringValidationAttribute]
      public string contacttype { get; set; }
      public int priority { get; set; }
      [StringValidationAttribute]
      public string sort { get; set; }
      public int recordlimit { get; set; }
      public bool extractnotesfl { get; set; }
      [StringValidationAttribute]
      public string delim { get; set; }


      public static Contactssearchcriteria BuildContactssearchcriteriaFromRow(DataRow row)
      {
         Contactssearchcriteria entity = new Contactssearchcriteria();
         entity.contactid = row.IsNull("contactid") ? decimal.Zero : row.Field<decimal>("contactid");
         entity.subjectroletype = row.IsNull("subjectroletype") ? string.Empty : row.Field<string>("subjectroletype");
         entity.subjectprimarykey = row.IsNull("subjectprimarykey") ? string.Empty : row.Field<string>("subjectprimarykey");
         entity.subjectsecondarykey = row.IsNull("subjectsecondarykey") ? string.Empty : row.Field<string>("subjectsecondarykey");
         entity.firstnm = row.IsNull("firstnm") ? string.Empty : row.Field<string>("firstnm");
         entity.lastnm = row.IsNull("lastnm") ? string.Empty : row.Field<string>("lastnm");
         entity.contacttype = row.IsNull("contacttype") ? string.Empty : row.Field<string>("contacttype");
         entity.priority = row.IsNull("priority") ? 0 : row.Field<int>("priority");
         entity.sort = row.IsNull("sort") ? string.Empty : row.Field<string>("sort");
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.extractnotesfl = row.Field<bool>("extractnotesfl");
         entity.delim = row.IsNull("delim") ? string.Empty : row.Field<string>("delim");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromContactssearchcriteria(ref DataRow row, Contactssearchcriteria entity)
      {
         row.SetField("contactid", entity.contactid);
         row.SetField("subjectroletype", entity.subjectroletype);
         row.SetField("subjectprimarykey", entity.subjectprimarykey);
         row.SetField("subjectsecondarykey", entity.subjectsecondarykey);
         row.SetField("firstnm", entity.firstnm);
         row.SetField("lastnm", entity.lastnm);
         row.SetField("contacttype", entity.contacttype);
         row.SetField("priority", entity.priority);
         row.SetField("sort", entity.sort);
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("extractnotesfl", entity.extractnotesfl);
         row.SetField("delim", entity.delim);

      }
   
   }
}
#pragma warning restore 1591
