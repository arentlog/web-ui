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

namespace Infor.Sxe.SA.Data.Models.Pdssasgaddonscriteria
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasgaddonscriteria.Sasgaddonscriteria")]
   public partial class Sasgaddonscriteria : ModelBase
   {
      [StringValidationAttribute]
      public string callingfunction { get; set; }
      [StringValidationAttribute]
      public string tableRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasgaddonscriteria BuildSasgaddonscriteriaFromRow(DataRow row)
      {
         Sasgaddonscriteria entity = new Sasgaddonscriteria();
         entity.callingfunction = row.IsNull("callingfunction") ? string.Empty : row.Field<string>("callingfunction");
         entity.tableRowid = row.Field<byte[]>("table-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasgaddonscriteria(ref DataRow row, Sasgaddonscriteria entity)
      {
         row.SetField("callingfunction", entity.callingfunction);
         row.SetField("table-rowid", entity.tableRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
