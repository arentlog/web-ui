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

namespace Infor.Sxe.AR.Data.Models.Pdsareceupdatescrnoutput
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsareceupdatescrnoutput.Areceupdatescrnoutput")]
   public partial class Areceupdatescrnoutput : ModelBase
   {
      public decimal dCustno { get; set; }
      [StringValidationAttribute]
      public string cReference { get; set; }
      public decimal deCredit { get; set; }
      public bool lUpdate { get; set; }
      [StringValidationAttribute]
      public string cDivnos { get; set; }
      [StringValidationAttribute]
      public string cDivamounts { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Areceupdatescrnoutput BuildAreceupdatescrnoutputFromRow(DataRow row)
      {
         Areceupdatescrnoutput entity = new Areceupdatescrnoutput();
         entity.dCustno = row.IsNull("d-custno") ? decimal.Zero : row.Field<decimal>("d-custno");
         entity.cReference = row.IsNull("c-reference") ? string.Empty : row.Field<string>("c-reference");
         entity.deCredit = row.IsNull("de-credit") ? decimal.Zero : row.Field<decimal>("de-credit");
         entity.lUpdate = row.Field<bool>("l-update");
         entity.cDivnos = row.IsNull("c-divnos") ? string.Empty : row.Field<string>("c-divnos");
         entity.cDivamounts = row.IsNull("c-divamounts") ? string.Empty : row.Field<string>("c-divamounts");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAreceupdatescrnoutput(ref DataRow row, Areceupdatescrnoutput entity)
      {
         row.SetField("d-custno", entity.dCustno);
         row.SetField("c-reference", entity.cReference);
         row.SetField("de-credit", entity.deCredit);
         row.SetField("l-update", entity.lUpdate);
         row.SetField("c-divnos", entity.cDivnos);
         row.SetField("c-divamounts", entity.cDivamounts);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
