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

namespace Infor.Sxe.PD.Data.Models.Pdspdsprebatesearch
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdsprebatesearch.Pdsprbrecnoresults")]
   public partial class Pdsprbrecnoresults : ModelBase
   {
      public bool lMaintmode { get; set; }
      [StringValidationAttribute]
      public string cType { get; set; }
      public int iPDRecno { get; set; }
      [StringValidationAttribute]
      public string rowidPdsr { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsprbrecnoresults BuildPdsprbrecnoresultsFromRow(DataRow row)
      {
         Pdsprbrecnoresults entity = new Pdsprbrecnoresults();
         entity.lMaintmode = row.Field<bool>("lMaintmode");
         entity.cType = row.IsNull("cType") ? string.Empty : row.Field<string>("cType");
         entity.iPDRecno = row.IsNull("iPDRecno") ? 0 : row.Field<int>("iPDRecno");
         entity.rowidPdsr = row.Field<byte[]>("rowid-pdsr").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsprbrecnoresults(ref DataRow row, Pdsprbrecnoresults entity)
      {
         row.SetField("lMaintmode", entity.lMaintmode);
         row.SetField("cType", entity.cType);
         row.SetField("iPDRecno", entity.iPDRecno);
         row.SetField("rowid-pdsr", entity.rowidPdsr.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591