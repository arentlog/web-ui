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

namespace Infor.Sxe.AR.Data.Models.Pdsartransdetail
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsartransdetail.Artransdetailcriteria")]
   public partial class Artransdetailcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string rwid { get; set; }
      [StringValidationAttribute]
      public string customfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Artransdetailcriteria BuildArtransdetailcriteriaFromRow(DataRow row)
      {
         Artransdetailcriteria entity = new Artransdetailcriteria();
         entity.rwid = row.Field<byte[]>("rwid").ToStringEncoded();
         entity.customfield = row.IsNull("customfield") ? string.Empty : row.Field<string>("customfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArtransdetailcriteria(ref DataRow row, Artransdetailcriteria entity)
      {
         row.SetField("rwid", entity.rwid.ToByteArray());
         row.SetField("customfield", entity.customfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591