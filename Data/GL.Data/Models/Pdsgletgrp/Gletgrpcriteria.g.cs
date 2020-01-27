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

namespace Infor.Sxe.GL.Data.Models.Pdsgletgrp
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsgletgrp.Gletgrpcriteria")]
   public partial class Gletgrpcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string grpname { get; set; }
      public bool lClear { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Gletgrpcriteria BuildGletgrpcriteriaFromRow(DataRow row)
      {
         Gletgrpcriteria entity = new Gletgrpcriteria();
         entity.grpname = row.IsNull("grpname") ? string.Empty : row.Field<string>("grpname");
         entity.lClear = row.Field<bool>("lClear");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGletgrpcriteria(ref DataRow row, Gletgrpcriteria entity)
      {
         row.SetField("grpname", entity.grpname);
         row.SetField("lClear", entity.lClear);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
