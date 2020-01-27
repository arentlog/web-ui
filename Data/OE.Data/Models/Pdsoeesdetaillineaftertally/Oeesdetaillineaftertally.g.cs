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

namespace Infor.Sxe.OE.Data.Models.Pdsoeesdetaillineaftertally
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeesdetaillineaftertally.Oeesdetaillineaftertally")]
   public partial class Oeesdetaillineaftertally : ModelBase
   {
      public int lineno { get; set; }
      public bool holddelayfl { get; set; }
      public decimal qtyord { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeesdetaillineaftertally BuildOeesdetaillineaftertallyFromRow(DataRow row)
      {
         Oeesdetaillineaftertally entity = new Oeesdetaillineaftertally();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.holddelayfl = row.Field<bool>("holddelayfl");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeesdetaillineaftertally(ref DataRow row, Oeesdetaillineaftertally entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("holddelayfl", entity.holddelayfl);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("unit", entity.unit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591