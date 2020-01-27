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

namespace Infor.Sxe.AR.Data.Models.Pdscustpmtsdisplay
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdscustpmtsdisplay.Custpmtsdisplaycriteria")]
   public partial class Custpmtsdisplaycriteria : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string groupid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Custpmtsdisplaycriteria BuildCustpmtsdisplaycriteriaFromRow(DataRow row)
      {
         Custpmtsdisplaycriteria entity = new Custpmtsdisplaycriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.groupid = row.IsNull("groupid") ? string.Empty : row.Field<string>("groupid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCustpmtsdisplaycriteria(ref DataRow row, Custpmtsdisplaycriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("groupid", entity.groupid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591