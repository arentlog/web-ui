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

namespace Infor.Sxe.GL.Data.Models.Pdsgldivisioncreate
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsgldivisioncreate.Gldivisioncreate")]
   public partial class Gldivisioncreate : ModelBase
   {
      [StringValidationAttribute]
      public string gltitle { get; set; }
      [StringValidationAttribute]
      public string lookupnm { get; set; }
      [StringValidationAttribute]
      public string accttype { get; set; }
      public bool baltype { get; set; }
      [StringValidationAttribute]
      public string glrptgroup { get; set; }
      public bool printtype { get; set; }
      public bool manpostfl { get; set; }
      [StringValidationAttribute]
      public string glsaRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Gldivisioncreate BuildGldivisioncreateFromRow(DataRow row)
      {
         Gldivisioncreate entity = new Gldivisioncreate();
         entity.gltitle = row.IsNull("gltitle") ? string.Empty : row.Field<string>("gltitle");
         entity.lookupnm = row.IsNull("lookupnm") ? string.Empty : row.Field<string>("lookupnm");
         entity.accttype = row.IsNull("accttype") ? string.Empty : row.Field<string>("accttype");
         entity.baltype = row.Field<bool>("baltype");
         entity.glrptgroup = row.IsNull("glrptgroup") ? string.Empty : row.Field<string>("glrptgroup");
         entity.printtype = row.Field<bool>("printtype");
         entity.manpostfl = row.Field<bool>("manpostfl");
         entity.glsaRowid = row.Field<byte[]>("glsa-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGldivisioncreate(ref DataRow row, Gldivisioncreate entity)
      {
         row.SetField("gltitle", entity.gltitle);
         row.SetField("lookupnm", entity.lookupnm);
         row.SetField("accttype", entity.accttype);
         row.SetField("baltype", entity.baltype);
         row.SetField("glrptgroup", entity.glrptgroup);
         row.SetField("printtype", entity.printtype);
         row.SetField("manpostfl", entity.manpostfl);
         row.SetField("glsa-rowid", entity.glsaRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591