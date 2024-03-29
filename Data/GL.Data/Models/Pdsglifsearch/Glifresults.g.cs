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
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglifsearch.Glifresults")]
   public partial class Glifresults : ModelBase
   {
      [StringValidationAttribute]
      public string prtline { get; set; }
      [StringValidationAttribute]
      public string recordty { get; set; }
      [StringValidationAttribute]
      public string rowidGlif { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glifresults BuildGlifresultsFromRow(DataRow row)
      {
         Glifresults entity = new Glifresults();
         entity.prtline = row.IsNull("prtline") ? string.Empty : row.Field<string>("prtline");
         entity.recordty = row.IsNull("recordty") ? string.Empty : row.Field<string>("recordty");
         entity.rowidGlif = row.Field<byte[]>("rowid-glif").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlifresults(ref DataRow row, Glifresults entity)
      {
         row.SetField("prtline", entity.prtline);
         row.SetField("recordty", entity.recordty);
         row.SetField("rowid-glif", entity.rowidGlif.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
