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

namespace Infor.Sxe.AR.Data.Models.Pdsarsosearch
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarsosearch.Arsosearchcriteria")]
   public partial class Arsosearchcriteria : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custtype { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arsosearchcriteria BuildArsosearchcriteriaFromRow(DataRow row)
      {
         Arsosearchcriteria entity = new Arsosearchcriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custtype = row.IsNull("custtype") ? string.Empty : row.Field<string>("custtype");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArsosearchcriteria(ref DataRow row, Arsosearchcriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("custtype", entity.custtype);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
