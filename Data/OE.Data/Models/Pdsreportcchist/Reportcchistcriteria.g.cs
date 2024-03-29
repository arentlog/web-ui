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

namespace Infor.Sxe.OE.Data.Models.Pdsreportcchist
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsreportcchist.Reportcchistcriteria")]
   public partial class Reportcchistcriteria : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string customparam { get; set; }


      public static Reportcchistcriteria BuildReportcchistcriteriaFromRow(DataRow row)
      {
         Reportcchistcriteria entity = new Reportcchistcriteria();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.customparam = row.IsNull("customparam") ? string.Empty : row.Field<string>("customparam");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromReportcchistcriteria(ref DataRow row, Reportcchistcriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("customparam", entity.customparam);

      }
   
   }
}
#pragma warning restore 1591
