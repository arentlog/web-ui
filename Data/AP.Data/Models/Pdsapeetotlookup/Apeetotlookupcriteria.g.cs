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

namespace Infor.Sxe.AP.Data.Models.Pdsapeetotlookup
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeetotlookup.Apeetotlookupcriteria")]
   public partial class Apeetotlookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string reportnm { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeetotlookupcriteria BuildApeetotlookupcriteriaFromRow(DataRow row)
      {
         Apeetotlookupcriteria entity = new Apeetotlookupcriteria();
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeetotlookupcriteria(ref DataRow row, Apeetotlookupcriteria entity)
      {
         row.SetField("reportnm", entity.reportnm);
         row.SetField("vendno", entity.vendno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
