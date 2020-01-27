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

namespace Infor.Sxe.SA.Data.Models.Pdssasglglsave
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasglglsave.Sasglglsave")]
   public partial class Sasglglsave : ModelBase
   {
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string taxauth { get; set; }
      [StringValidationAttribute]
      public string provinceglno { get; set; }
      [StringValidationAttribute]
      public string gstglno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasglglsave BuildSasglglsaveFromRow(DataRow row)
      {
         Sasglglsave entity = new Sasglglsave();
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.taxauth = row.IsNull("taxauth") ? string.Empty : row.Field<string>("taxauth");
         entity.provinceglno = row.IsNull("provinceglno") ? string.Empty : row.Field<string>("provinceglno");
         entity.gstglno = row.IsNull("gstglno") ? string.Empty : row.Field<string>("gstglno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasglglsave(ref DataRow row, Sasglglsave entity)
      {
         row.SetField("state", entity.state);
         row.SetField("taxauth", entity.taxauth);
         row.SetField("provinceglno", entity.provinceglno);
         row.SetField("gstglno", entity.gstglno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
