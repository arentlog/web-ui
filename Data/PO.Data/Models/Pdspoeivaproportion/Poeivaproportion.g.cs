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

namespace Infor.Sxe.PO.Data.Models.Pdspoeivaproportion
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoeivaproportion.Poeivaproportion")]
   public partial class Poeivaproportion : ModelBase
   {
      public int pono { get; set; }
      public int posuf { get; set; }
      public int lineno { get; set; }
      public bool proportionerr { get; set; }
      public decimal qtyrcv { get; set; }
      public decimal qtyord { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal qtyrcvfin { get; set; }
      public decimal qtyordfin { get; set; }
      [StringValidationAttribute]
      public string prodfin { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Poeivaproportion BuildPoeivaproportionFromRow(DataRow row)
      {
         Poeivaproportion entity = new Poeivaproportion();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.proportionerr = row.Field<bool>("proportionerr");
         entity.qtyrcv = row.IsNull("qtyrcv") ? decimal.Zero : row.Field<decimal>("qtyrcv");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.qtyrcvfin = row.IsNull("qtyrcvfin") ? decimal.Zero : row.Field<decimal>("qtyrcvfin");
         entity.qtyordfin = row.IsNull("qtyordfin") ? decimal.Zero : row.Field<decimal>("qtyordfin");
         entity.prodfin = row.IsNull("prodfin") ? string.Empty : row.Field<string>("prodfin");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoeivaproportion(ref DataRow row, Poeivaproportion entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("proportionerr", entity.proportionerr);
         row.SetField("qtyrcv", entity.qtyrcv);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("prod", entity.prod);
         row.SetField("qtyrcvfin", entity.qtyrcvfin);
         row.SetField("qtyordfin", entity.qtyordfin);
         row.SetField("prodfin", entity.prodfin);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
