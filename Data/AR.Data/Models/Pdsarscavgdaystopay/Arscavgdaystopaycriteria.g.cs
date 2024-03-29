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

namespace Infor.Sxe.AR.Data.Models.Pdsarscavgdaystopay
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarscavgdaystopay.Arscavgdaystopaycriteria")]
   public partial class Arscavgdaystopaycriteria : ModelBase
   {
      public decimal custno { get; set; }
      public DateTime? startdt { get; set; }
      public DateTime? enddt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arscavgdaystopaycriteria BuildArscavgdaystopaycriteriaFromRow(DataRow row)
      {
         Arscavgdaystopaycriteria entity = new Arscavgdaystopaycriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.enddt = row.Field<DateTime?>("enddt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArscavgdaystopaycriteria(ref DataRow row, Arscavgdaystopaycriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("startdt", entity.startdt);
         row.SetField("enddt", entity.enddt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
