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

namespace Infor.Sxe.TWL.Data.Models.Pdsccinvtrans
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsccinvtrans.Ccinvtranssummary")]
   public partial class Ccinvtranssummary : ModelBase
   {
      public decimal goodQty { get; set; }
      public decimal discQty { get; set; }
      public decimal totalQty { get; set; }
      [StringValidationAttribute]
      public string requestedDate { get; set; }
      [StringValidationAttribute]
      public string startedDate { get; set; }
      [StringValidationAttribute]
      public string completedDate { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ccinvtranssummary BuildCcinvtranssummaryFromRow(DataRow row)
      {
         Ccinvtranssummary entity = new Ccinvtranssummary();
         entity.goodQty = row.IsNull("good_qty") ? decimal.Zero : row.Field<decimal>("good_qty");
         entity.discQty = row.IsNull("disc_qty") ? decimal.Zero : row.Field<decimal>("disc_qty");
         entity.totalQty = row.IsNull("total_qty") ? decimal.Zero : row.Field<decimal>("total_qty");
         entity.requestedDate = row.IsNull("requested_date") ? string.Empty : row.Field<string>("requested_date");
         entity.startedDate = row.IsNull("started_date") ? string.Empty : row.Field<string>("started_date");
         entity.completedDate = row.IsNull("completed_date") ? string.Empty : row.Field<string>("completed_date");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCcinvtranssummary(ref DataRow row, Ccinvtranssummary entity)
      {
         row.SetField("good_qty", entity.goodQty);
         row.SetField("disc_qty", entity.discQty);
         row.SetField("total_qty", entity.totalQty);
         row.SetField("requested_date", entity.requestedDate);
         row.SetField("started_date", entity.startedDate);
         row.SetField("completed_date", entity.completedDate);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
