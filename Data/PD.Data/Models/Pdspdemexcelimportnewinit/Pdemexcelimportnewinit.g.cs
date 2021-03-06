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

namespace Infor.Sxe.PD.Data.Models.Pdspdemexcelimportnewinit
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdemexcelimportnewinit.Pdemexcelimportnewinit")]
   public partial class Pdemexcelimportnewinit : ModelBase
   {
      public DateTime? fiStartDtValue { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdemexcelimportnewinit BuildPdemexcelimportnewinitFromRow(DataRow row)
      {
         Pdemexcelimportnewinit entity = new Pdemexcelimportnewinit();
         entity.fiStartDtValue = row.Field<DateTime?>("fiStartDt-Value");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdemexcelimportnewinit(ref DataRow row, Pdemexcelimportnewinit entity)
      {
         row.SetField("fiStartDt-Value", entity.fiStartDtValue);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
