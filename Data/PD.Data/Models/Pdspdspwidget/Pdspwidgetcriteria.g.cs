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

namespace Infor.Sxe.PD.Data.Models.Pdspdspwidget
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdspwidget.Pdspwidgetcriteria")]
   public partial class Pdspwidgetcriteria : ModelBase
   {
      public int iSecurity { get; set; }
      [StringValidationAttribute]
      public string cLevelcd { get; set; }
      [StringValidationAttribute]
      public string cLeveldata { get; set; }
      [StringValidationAttribute]
      public string cRebatecd { get; set; }
      [StringValidationAttribute]
      public string cSecurity { get; set; }
      public bool lUseContractvfl { get; set; }
      public bool lUsePricevfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdspwidgetcriteria BuildPdspwidgetcriteriaFromRow(DataRow row)
      {
         Pdspwidgetcriteria entity = new Pdspwidgetcriteria();
         entity.iSecurity = row.IsNull("iSecurity") ? 0 : row.Field<int>("iSecurity");
         entity.cLevelcd = row.IsNull("cLevelcd") ? string.Empty : row.Field<string>("cLevelcd");
         entity.cLeveldata = row.IsNull("cLeveldata") ? string.Empty : row.Field<string>("cLeveldata");
         entity.cRebatecd = row.IsNull("cRebatecd") ? string.Empty : row.Field<string>("cRebatecd");
         entity.cSecurity = row.IsNull("cSecurity") ? string.Empty : row.Field<string>("cSecurity");
         entity.lUseContractvfl = row.Field<bool>("lUseContractvfl");
         entity.lUsePricevfl = row.Field<bool>("lUsePricevfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdspwidgetcriteria(ref DataRow row, Pdspwidgetcriteria entity)
      {
         row.SetField("iSecurity", entity.iSecurity);
         row.SetField("cLevelcd", entity.cLevelcd);
         row.SetField("cLeveldata", entity.cLeveldata);
         row.SetField("cRebatecd", entity.cRebatecd);
         row.SetField("cSecurity", entity.cSecurity);
         row.SetField("lUseContractvfl", entity.lUseContractvfl);
         row.SetField("lUsePricevfl", entity.lUsePricevfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
