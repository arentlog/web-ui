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

namespace Infor.Sxe.GL.Data.Models.Pdsglifsearch
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglifsearch.Glifcriteria")]
   public partial class Glifcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string groupnm { get; set; }
      [StringValidationAttribute]
      public string reportnm { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glifcriteria BuildGlifcriteriaFromRow(DataRow row)
      {
         Glifcriteria entity = new Glifcriteria();
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlifcriteria(ref DataRow row, Glifcriteria entity)
      {
         row.SetField("groupnm", entity.groupnm);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
