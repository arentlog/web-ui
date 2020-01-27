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

namespace Infor.Sxe.PTX.Data.Models.Pdsptxrouting
{
   [ModelName("Infor.Sxe.PTX.Data.Models.Pdsptxrouting.Ptxroutingcriteria")]
   public partial class Ptxroutingcriteria : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      public int hierarchy { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ptxroutingcriteria BuildPtxroutingcriteriaFromRow(DataRow row)
      {
         Ptxroutingcriteria entity = new Ptxroutingcriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.hierarchy = row.IsNull("hierarchy") ? 0 : row.Field<int>("hierarchy");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPtxroutingcriteria(ref DataRow row, Ptxroutingcriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("prod", entity.prod);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("hierarchy", entity.hierarchy);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591