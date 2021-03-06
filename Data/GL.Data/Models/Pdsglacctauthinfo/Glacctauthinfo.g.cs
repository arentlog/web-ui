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

namespace Infor.Sxe.GL.Data.Models.Pdsglacctauthinfo
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglacctauthinfo.Glacctauthinfo")]
   public partial class Glacctauthinfo : ModelBase
   {
      public bool userhassecurity { get; set; }
      public bool manpostfl { get; set; }
      public long glsarecid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glacctauthinfo BuildGlacctauthinfoFromRow(DataRow row)
      {
         Glacctauthinfo entity = new Glacctauthinfo();
         entity.userhassecurity = row.Field<bool>("userhassecurity");
         entity.manpostfl = row.Field<bool>("manpostfl");
         entity.glsarecid = row.IsNull("glsarecid") ? 0 : row.Field<long>("glsarecid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlacctauthinfo(ref DataRow row, Glacctauthinfo entity)
      {
         row.SetField("userhassecurity", entity.userhassecurity);
         row.SetField("manpostfl", entity.manpostfl);
         row.SetField("glsarecid", entity.glsarecid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
