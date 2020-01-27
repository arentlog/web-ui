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

namespace Infor.Sxe.GL.Data.Models.Pdsglaccountcopy
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglaccountcopy.Glaccountcopy")]
   public partial class Glaccountcopy : ModelBase
   {
      public int fromyr { get; set; }
      public int toyr { get; set; }
      [StringValidationAttribute]
      public string fromglno { get; set; }
      [StringValidationAttribute]
      public string toglno { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glaccountcopy BuildGlaccountcopyFromRow(DataRow row)
      {
         Glaccountcopy entity = new Glaccountcopy();
         entity.fromyr = row.IsNull("fromyr") ? 0 : row.Field<int>("fromyr");
         entity.toyr = row.IsNull("toyr") ? 0 : row.Field<int>("toyr");
         entity.fromglno = row.IsNull("fromglno") ? string.Empty : row.Field<string>("fromglno");
         entity.toglno = row.IsNull("toglno") ? string.Empty : row.Field<string>("toglno");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlaccountcopy(ref DataRow row, Glaccountcopy entity)
      {
         row.SetField("fromyr", entity.fromyr);
         row.SetField("toyr", entity.toyr);
         row.SetField("fromglno", entity.fromglno);
         row.SetField("toglno", entity.toglno);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591