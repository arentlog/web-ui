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

namespace Infor.Sxe.GL.Data.Models.Pdsglinquiryaccount
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglinquiryaccount.Glinquiryaccountcriteria")]
   public partial class Glinquiryaccountcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string glno { get; set; }
      public int glyear { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glinquiryaccountcriteria BuildGlinquiryaccountcriteriaFromRow(DataRow row)
      {
         Glinquiryaccountcriteria entity = new Glinquiryaccountcriteria();
         entity.glno = row.IsNull("glno") ? string.Empty : row.Field<string>("glno");
         entity.glyear = row.IsNull("glyear") ? 0 : row.Field<int>("glyear");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlinquiryaccountcriteria(ref DataRow row, Glinquiryaccountcriteria entity)
      {
         row.SetField("glno", entity.glno);
         row.SetField("glyear", entity.glyear);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
