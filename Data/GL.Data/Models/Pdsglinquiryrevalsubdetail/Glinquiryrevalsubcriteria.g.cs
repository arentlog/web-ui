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

namespace Infor.Sxe.GL.Data.Models.Pdsglinquiryrevalsubdetail
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglinquiryrevalsubdetail.Glinquiryrevalsubcriteria")]
   public partial class Glinquiryrevalsubcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string rowidGletv { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glinquiryrevalsubcriteria BuildGlinquiryrevalsubcriteriaFromRow(DataRow row)
      {
         Glinquiryrevalsubcriteria entity = new Glinquiryrevalsubcriteria();
         entity.rowidGletv = row.Field<byte[]>("rowid-gletv").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlinquiryrevalsubcriteria(ref DataRow row, Glinquiryrevalsubcriteria entity)
      {
         row.SetField("rowid-gletv", entity.rowidGletv.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
