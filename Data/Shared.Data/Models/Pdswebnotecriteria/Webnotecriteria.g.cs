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

namespace Infor.Sxe.Shared.Data.Models.Pdswebnotecriteria
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdswebnotecriteria.Webnotecriteria")]
   public partial class Webnotecriteria : ModelBase
   {
      [StringValidationAttribute]
      public string webnoteRowID { get; set; }
      [StringValidationAttribute]
      public string webnoteuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Webnotecriteria BuildWebnotecriteriaFromRow(DataRow row)
      {
         Webnotecriteria entity = new Webnotecriteria();
         entity.webnoteRowID = row.Field<byte[]>("webnoteRowID").ToStringEncoded();
         entity.webnoteuserfield = row.IsNull("webnoteuserfield") ? string.Empty : row.Field<string>("webnoteuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWebnotecriteria(ref DataRow row, Webnotecriteria entity)
      {
         row.SetField("webnoteRowID", entity.webnoteRowID.ToByteArray());
         row.SetField("webnoteuserfield", entity.webnoteuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591