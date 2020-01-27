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

namespace Infor.Sxe.IC.Data.Models.Pdsicseglookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicseglookup.Icseglookupcriteria")]
   public partial class Icseglookupcriteria : ModelBase
   {
      public int recordlimit { get; set; }
      public bool accttype { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string custtype { get; set; }
      [StringValidationAttribute]
      public string salesrep { get; set; }
      [StringValidationAttribute]
      public string cogsadj { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icseglookupcriteria BuildIcseglookupcriteriaFromRow(DataRow row)
      {
         Icseglookupcriteria entity = new Icseglookupcriteria();
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.accttype = row.Field<bool>("accttype");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.custtype = row.IsNull("custtype") ? string.Empty : row.Field<string>("custtype");
         entity.salesrep = row.IsNull("salesrep") ? string.Empty : row.Field<string>("salesrep");
         entity.cogsadj = row.IsNull("cogsadj") ? string.Empty : row.Field<string>("cogsadj");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcseglookupcriteria(ref DataRow row, Icseglookupcriteria entity)
      {
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("accttype", entity.accttype);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("whse", entity.whse);
         row.SetField("custtype", entity.custtype);
         row.SetField("salesrep", entity.salesrep);
         row.SetField("cogsadj", entity.cogsadj);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
