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

namespace Infor.Sxe.PD.Data.Models.Pdspdemimportnewfile
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdemimportnewfile.Pdemimportnewfiledata")]
   public partial class Pdemimportnewfiledata : ModelBase
   {
      [StringValidationAttribute]
      public string cColValues { get; set; }
      public int rowNumber { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdemimportnewfiledata BuildPdemimportnewfiledataFromRow(DataRow row)
      {
         Pdemimportnewfiledata entity = new Pdemimportnewfiledata();
         entity.cColValues = row.IsNull("cColValues") ? string.Empty : row.Field<string>("cColValues");
         entity.rowNumber = row.IsNull("RowNumber") ? 0 : row.Field<int>("RowNumber");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdemimportnewfiledata(ref DataRow row, Pdemimportnewfiledata entity)
      {
         row.SetField("cColValues", entity.cColValues);
         row.SetField("RowNumber", entity.rowNumber);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
