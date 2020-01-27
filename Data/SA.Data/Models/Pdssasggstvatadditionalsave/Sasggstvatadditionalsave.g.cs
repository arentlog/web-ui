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

namespace Infor.Sxe.SA.Data.Models.Pdssasggstvatadditionalsave
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasggstvatadditionalsave.Sasggstvatadditionalsave")]
   public partial class Sasggstvatadditionalsave : ModelBase
   {
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string callingfunction { get; set; }
      public int glyear { get; set; }
      [StringValidationAttribute]
      public string acctno { get; set; }
      [StringValidationAttribute]
      public string acctdesc { get; set; }
      [StringValidationAttribute]
      public string arcashglno { get; set; }
      [StringValidationAttribute]
      public string arcashgldesc { get; set; }
      [StringValidationAttribute]
      public string taxmethodty { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasggstvatadditionalsave BuildSasggstvatadditionalsaveFromRow(DataRow row)
      {
         Sasggstvatadditionalsave entity = new Sasggstvatadditionalsave();
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.callingfunction = row.IsNull("callingfunction") ? string.Empty : row.Field<string>("callingfunction");
         entity.glyear = row.IsNull("glyear") ? 0 : row.Field<int>("glyear");
         entity.acctno = row.IsNull("acctno") ? string.Empty : row.Field<string>("acctno");
         entity.acctdesc = row.IsNull("acctdesc") ? string.Empty : row.Field<string>("acctdesc");
         entity.arcashglno = row.IsNull("arcashglno") ? string.Empty : row.Field<string>("arcashglno");
         entity.arcashgldesc = row.IsNull("arcashgldesc") ? string.Empty : row.Field<string>("arcashgldesc");
         entity.taxmethodty = row.IsNull("taxmethodty") ? string.Empty : row.Field<string>("taxmethodty");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasggstvatadditionalsave(ref DataRow row, Sasggstvatadditionalsave entity)
      {
         row.SetField("state", entity.state);
         row.SetField("callingfunction", entity.callingfunction);
         row.SetField("glyear", entity.glyear);
         row.SetField("acctno", entity.acctno);
         row.SetField("acctdesc", entity.acctdesc);
         row.SetField("arcashglno", entity.arcashglno);
         row.SetField("arcashgldesc", entity.arcashgldesc);
         row.SetField("taxmethodty", entity.taxmethodty);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
