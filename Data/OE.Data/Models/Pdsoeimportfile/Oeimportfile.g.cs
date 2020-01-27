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

namespace Infor.Sxe.OE.Data.Models.Pdsoeimportfile
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeimportfile.Oeimportfile")]
   public partial class Oeimportfile : ModelBase
   {
      public int iRow { get; set; }
      [StringValidationAttribute]
      public string cWorkSheet { get; set; }
      [StringValidationAttribute]
      public string cColValues { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeimportfile BuildOeimportfileFromRow(DataRow row)
      {
         Oeimportfile entity = new Oeimportfile();
         entity.iRow = row.IsNull("iRow") ? 0 : row.Field<int>("iRow");
         entity.cWorkSheet = row.IsNull("cWorkSheet") ? string.Empty : row.Field<string>("cWorkSheet");
         entity.cColValues = row.IsNull("cColValues") ? string.Empty : row.Field<string>("cColValues");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeimportfile(ref DataRow row, Oeimportfile entity)
      {
         row.SetField("iRow", entity.iRow);
         row.SetField("cWorkSheet", entity.cWorkSheet);
         row.SetField("cColValues", entity.cColValues);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591