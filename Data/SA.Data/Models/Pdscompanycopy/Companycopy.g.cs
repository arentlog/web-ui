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

namespace Infor.Sxe.SA.Data.Models.Pdscompanycopy
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdscompanycopy.Companycopy")]
   public partial class Companycopy : ModelBase
   {
      public int newcono { get; set; }
      [StringValidationAttribute]
      public string newname { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Companycopy BuildCompanycopyFromRow(DataRow row)
      {
         Companycopy entity = new Companycopy();
         entity.newcono = row.IsNull("newcono") ? 0 : row.Field<int>("newcono");
         entity.newname = row.IsNull("newname") ? string.Empty : row.Field<string>("newname");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCompanycopy(ref DataRow row, Companycopy entity)
      {
         row.SetField("newcono", entity.newcono);
         row.SetField("newname", entity.newname);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
