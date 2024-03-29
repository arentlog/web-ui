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

namespace Infor.Sxe.PO.Data.Models.Pdspoeidetailtotal
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoeidetailtotal.Poeidetailtotal")]
   public partial class Poeidetailtotal : ModelBase
   {
      public decimal totlineamt { get; set; }
      public decimal totrcvamt { get; set; }
      public decimal totqtyord { get; set; }
      public decimal totqtyrcv { get; set; }
      public decimal totweight { get; set; }
      public decimal totqtycost { get; set; }
      public decimal totcubes { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Poeidetailtotal BuildPoeidetailtotalFromRow(DataRow row)
      {
         Poeidetailtotal entity = new Poeidetailtotal();
         entity.totlineamt = row.IsNull("totlineamt") ? decimal.Zero : row.Field<decimal>("totlineamt");
         entity.totrcvamt = row.IsNull("totrcvamt") ? decimal.Zero : row.Field<decimal>("totrcvamt");
         entity.totqtyord = row.IsNull("totqtyord") ? decimal.Zero : row.Field<decimal>("totqtyord");
         entity.totqtyrcv = row.IsNull("totqtyrcv") ? decimal.Zero : row.Field<decimal>("totqtyrcv");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.totqtycost = row.IsNull("totqtycost") ? decimal.Zero : row.Field<decimal>("totqtycost");
         entity.totcubes = row.IsNull("totcubes") ? decimal.Zero : row.Field<decimal>("totcubes");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoeidetailtotal(ref DataRow row, Poeidetailtotal entity)
      {
         row.SetField("totlineamt", entity.totlineamt);
         row.SetField("totrcvamt", entity.totrcvamt);
         row.SetField("totqtyord", entity.totqtyord);
         row.SetField("totqtyrcv", entity.totqtyrcv);
         row.SetField("totweight", entity.totweight);
         row.SetField("totqtycost", entity.totqtycost);
         row.SetField("totcubes", entity.totcubes);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
