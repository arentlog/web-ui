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

namespace Infor.Sxe.Shared.Data.Models.Pdsgeticetnotesidbyrowid
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsgeticetnotesidbyrowid.Geticetnotesidbyrowid")]
   public partial class Geticetnotesidbyrowid : ModelBase
   {
      [StringValidationAttribute]
      public string icetrowid { get; set; }
      public bool createfl { get; set; }
      public int icetnotesid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Geticetnotesidbyrowid BuildGeticetnotesidbyrowidFromRow(DataRow row)
      {
         Geticetnotesidbyrowid entity = new Geticetnotesidbyrowid();
         entity.icetrowid = row.Field<byte[]>("icetrowid").ToStringEncoded();
         entity.createfl = row.Field<bool>("createfl");
         entity.icetnotesid = row.IsNull("icetnotesid") ? 0 : row.Field<int>("icetnotesid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGeticetnotesidbyrowid(ref DataRow row, Geticetnotesidbyrowid entity)
      {
         row.SetField("icetrowid", entity.icetrowid.ToByteArray());
         row.SetField("createfl", entity.createfl);
         row.SetField("icetnotesid", entity.icetnotesid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591