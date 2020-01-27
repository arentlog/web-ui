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

namespace Infor.Sxe.AP.Data.Models.Pdsappurchasehist
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsappurchasehist.Appurchasehistcriteria")]
   public partial class Appurchasehistcriteria : ModelBase
   {
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      public int yr { get; set; }
      [StringValidationAttribute]
      public string customparam { get; set; }


      public static Appurchasehistcriteria BuildAppurchasehistcriteriaFromRow(DataRow row)
      {
         Appurchasehistcriteria entity = new Appurchasehistcriteria();
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.yr = row.IsNull("yr") ? 0 : row.Field<int>("yr");
         entity.customparam = row.IsNull("customparam") ? string.Empty : row.Field<string>("customparam");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAppurchasehistcriteria(ref DataRow row, Appurchasehistcriteria entity)
      {
         row.SetField("vendno", entity.vendno);
         row.SetField("whse", entity.whse);
         row.SetField("prodline", entity.prodline);
         row.SetField("yr", entity.yr);
         row.SetField("customparam", entity.customparam);

      }
   
   }
}
#pragma warning restore 1591