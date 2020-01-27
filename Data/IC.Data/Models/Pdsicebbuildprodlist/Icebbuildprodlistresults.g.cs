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

namespace Infor.Sxe.IC.Data.Models.Pdsicebbuildprodlist
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicebbuildprodlist.Icebbuildprodlistresults")]
   public partial class Icebbuildprodlistresults : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string cDesc { get; set; }
      [StringValidationAttribute]
      public string binloc1 { get; set; }
      [StringValidationAttribute]
      public string binloc2 { get; set; }
      [StringValidationAttribute]
      public string cProdnotes { get; set; }
      [StringValidationAttribute]
      public string cMoreBins { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icebbuildprodlistresults BuildIcebbuildprodlistresultsFromRow(DataRow row)
      {
         Icebbuildprodlistresults entity = new Icebbuildprodlistresults();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.cDesc = row.IsNull("cDesc") ? string.Empty : row.Field<string>("cDesc");
         entity.binloc1 = row.IsNull("binloc1") ? string.Empty : row.Field<string>("binloc1");
         entity.binloc2 = row.IsNull("binloc2") ? string.Empty : row.Field<string>("binloc2");
         entity.cProdnotes = row.IsNull("cProdnotes") ? string.Empty : row.Field<string>("cProdnotes");
         entity.cMoreBins = row.IsNull("cMoreBins") ? string.Empty : row.Field<string>("cMoreBins");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcebbuildprodlistresults(ref DataRow row, Icebbuildprodlistresults entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("cDesc", entity.cDesc);
         row.SetField("binloc1", entity.binloc1);
         row.SetField("binloc2", entity.binloc2);
         row.SetField("cProdnotes", entity.cProdnotes);
         row.SetField("cMoreBins", entity.cMoreBins);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
