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

namespace Infor.Sxe.IC.Data.Models.Pdsicamrupdselectmethod
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamrupdselectmethod.Icamrupdselectmethod")]
   public partial class Icamrupdselectmethod : ModelBase
   {
      public int cono { get; set; }
      public int reportno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string icamapRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamrupdselectmethod BuildIcamrupdselectmethodFromRow(DataRow row)
      {
         Icamrupdselectmethod entity = new Icamrupdselectmethod();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.icamapRowID = row.Field<byte[]>("icamapRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamrupdselectmethod(ref DataRow row, Icamrupdselectmethod entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("reportno", entity.reportno);
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("icamapRowID", entity.icamapRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
