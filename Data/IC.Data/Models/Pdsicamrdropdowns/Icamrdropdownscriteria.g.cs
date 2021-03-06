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

namespace Infor.Sxe.IC.Data.Models.Pdsicamrdropdowns
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamrdropdowns.Icamrdropdownscriteria")]
   public partial class Icamrdropdownscriteria : ModelBase
   {
      public int reportno { get; set; }
      [StringValidationAttribute]
      public string dropdowntype { get; set; }
      [StringValidationAttribute]
      public string customparam { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamrdropdownscriteria BuildIcamrdropdownscriteriaFromRow(DataRow row)
      {
         Icamrdropdownscriteria entity = new Icamrdropdownscriteria();
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.dropdowntype = row.IsNull("dropdowntype") ? string.Empty : row.Field<string>("dropdowntype");
         entity.customparam = row.IsNull("customparam") ? string.Empty : row.Field<string>("customparam");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamrdropdownscriteria(ref DataRow row, Icamrdropdownscriteria entity)
      {
         row.SetField("reportno", entity.reportno);
         row.SetField("dropdowntype", entity.dropdowntype);
         row.SetField("customparam", entity.customparam);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
