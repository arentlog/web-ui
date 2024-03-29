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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfdesigndesc
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfdesigndesc.Glsfdesigndesccriteria")]
   public partial class Glsfdesigndesccriteria : ModelBase
   {
      [StringValidationAttribute]
      public string designName { get; set; }
      [StringValidationAttribute]
      public string designDesc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfdesigndesccriteria BuildGlsfdesigndesccriteriaFromRow(DataRow row)
      {
         Glsfdesigndesccriteria entity = new Glsfdesigndesccriteria();
         entity.designName = row.IsNull("designName") ? string.Empty : row.Field<string>("designName");
         entity.designDesc = row.IsNull("designDesc") ? string.Empty : row.Field<string>("designDesc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfdesigndesccriteria(ref DataRow row, Glsfdesigndesccriteria entity)
      {
         row.SetField("designName", entity.designName);
         row.SetField("designDesc", entity.designDesc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
