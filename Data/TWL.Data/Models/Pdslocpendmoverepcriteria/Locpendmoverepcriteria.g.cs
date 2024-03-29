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

namespace Infor.Sxe.TWL.Data.Models.Pdslocpendmoverepcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdslocpendmoverepcriteria.Locpendmoverepcriteria")]
   public partial class Locpendmoverepcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string chCo { get; set; }
      [StringValidationAttribute]
      public string chWh { get; set; }
      [StringValidationAttribute]
      public string chLoc { get; set; }
      [StringValidationAttribute]
      public string locpendmoverepcriteriauserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Locpendmoverepcriteria BuildLocpendmoverepcriteriaFromRow(DataRow row)
      {
         Locpendmoverepcriteria entity = new Locpendmoverepcriteria();
         entity.chCo = row.IsNull("ch_co") ? string.Empty : row.Field<string>("ch_co");
         entity.chWh = row.IsNull("ch_wh") ? string.Empty : row.Field<string>("ch_wh");
         entity.chLoc = row.IsNull("ch_loc") ? string.Empty : row.Field<string>("ch_loc");
         entity.locpendmoverepcriteriauserfield = row.IsNull("locpendmoverepcriteriauserfield") ? string.Empty : row.Field<string>("locpendmoverepcriteriauserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLocpendmoverepcriteria(ref DataRow row, Locpendmoverepcriteria entity)
      {
         row.SetField("ch_co", entity.chCo);
         row.SetField("ch_wh", entity.chWh);
         row.SetField("ch_loc", entity.chLoc);
         row.SetField("locpendmoverepcriteriauserfield", entity.locpendmoverepcriteriauserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
