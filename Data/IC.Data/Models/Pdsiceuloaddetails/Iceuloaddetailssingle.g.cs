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

namespace Infor.Sxe.IC.Data.Models.Pdsiceuloaddetails
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceuloaddetails.Iceuloaddetailssingle")]
   public partial class Iceuloaddetailssingle : ModelBase
   {
      public bool wlwhsefl { get; set; }
      public bool wlesbfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceuloaddetailssingle BuildIceuloaddetailssingleFromRow(DataRow row)
      {
         Iceuloaddetailssingle entity = new Iceuloaddetailssingle();
         entity.wlwhsefl = row.Field<bool>("wlwhsefl");
         entity.wlesbfl = row.Field<bool>("wlesbfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceuloaddetailssingle(ref DataRow row, Iceuloaddetailssingle entity)
      {
         row.SetField("wlwhsefl", entity.wlwhsefl);
         row.SetField("wlesbfl", entity.wlesbfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
