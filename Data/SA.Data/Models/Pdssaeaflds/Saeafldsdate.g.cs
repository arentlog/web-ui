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

namespace Infor.Sxe.SA.Data.Models.Pdssaeaflds
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaeaflds.Saeafldsdate")]
   public partial class Saeafldsdate : ModelBase
   {
      public int slctdateary { get; set; }
      [StringValidationAttribute]
      public string fieldname { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saeafldsdate BuildSaeafldsdateFromRow(DataRow row)
      {
         Saeafldsdate entity = new Saeafldsdate();
         entity.slctdateary = row.IsNull("slctdateary") ? 0 : row.Field<int>("slctdateary");
         entity.fieldname = row.IsNull("fieldname") ? string.Empty : row.Field<string>("fieldname");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaeafldsdate(ref DataRow row, Saeafldsdate entity)
      {
         row.SetField("slctdateary", entity.slctdateary);
         row.SetField("fieldname", entity.fieldname);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
