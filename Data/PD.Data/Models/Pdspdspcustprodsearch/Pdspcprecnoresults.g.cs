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

namespace Infor.Sxe.PD.Data.Models.Pdspdspcustprodsearch
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdspcustprodsearch.Pdspcprecnoresults")]
   public partial class Pdspcprecnoresults : ModelBase
   {
      public bool lMaintmode { get; set; }
      [StringValidationAttribute]
      public string cType { get; set; }
      public int iRecno { get; set; }
      [StringValidationAttribute]
      public string rowidPdsc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdspcprecnoresults BuildPdspcprecnoresultsFromRow(DataRow row)
      {
         Pdspcprecnoresults entity = new Pdspcprecnoresults();
         entity.lMaintmode = row.Field<bool>("lMaintmode");
         entity.cType = row.IsNull("cType") ? string.Empty : row.Field<string>("cType");
         entity.iRecno = row.IsNull("iRecno") ? 0 : row.Field<int>("iRecno");
         entity.rowidPdsc = row.Field<byte[]>("rowid-pdsc").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdspcprecnoresults(ref DataRow row, Pdspcprecnoresults entity)
      {
         row.SetField("lMaintmode", entity.lMaintmode);
         row.SetField("cType", entity.cType);
         row.SetField("iRecno", entity.iRecno);
         row.SetField("rowid-pdsc", entity.rowidPdsc.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
