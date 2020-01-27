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

namespace Infor.Sxe.VA.Data.Models.Pdsvaheadersettings
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaheadersettings.Vaheadersettings")]
   public partial class Vaheadersettings : ModelBase
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string vaheaderty { get; set; }
      public int sortby { get; set; }
      public bool lnonstockfl { get; set; }
      public bool homewhsefl { get; set; }
      [StringValidationAttribute]
      public string homewhse { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaheadersettings BuildVaheadersettingsFromRow(DataRow row)
      {
         Vaheadersettings entity = new Vaheadersettings();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.vaheaderty = row.IsNull("vaheaderty") ? string.Empty : row.Field<string>("vaheaderty");
         entity.sortby = row.IsNull("sortby") ? 0 : row.Field<int>("sortby");
         entity.lnonstockfl = row.Field<bool>("lnonstockfl");
         entity.homewhsefl = row.Field<bool>("homewhsefl");
         entity.homewhse = row.IsNull("homewhse") ? string.Empty : row.Field<string>("homewhse");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaheadersettings(ref DataRow row, Vaheadersettings entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("operinit", entity.operinit);
         row.SetField("vaheaderty", entity.vaheaderty);
         row.SetField("sortby", entity.sortby);
         row.SetField("lnonstockfl", entity.lnonstockfl);
         row.SetField("homewhsefl", entity.homewhsefl);
         row.SetField("homewhse", entity.homewhse);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
