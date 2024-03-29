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

namespace Infor.Sxe.SA.Data.Models.Pdssaeggroup
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaeggroup.Saeggroups")]
   public partial class Saeggroups : ModelBase
   {
      [StringValidationAttribute]
      public string oper { get; set; }
      [StringValidationAttribute]
      public string groupnm { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saeggroups BuildSaeggroupsFromRow(DataRow row)
      {
         Saeggroups entity = new Saeggroups();
         entity.oper = row.IsNull("oper") ? string.Empty : row.Field<string>("oper");
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaeggroups(ref DataRow row, Saeggroups entity)
      {
         row.SetField("oper", entity.oper);
         row.SetField("groupnm", entity.groupnm);
         row.SetField("descrip", entity.descrip);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
