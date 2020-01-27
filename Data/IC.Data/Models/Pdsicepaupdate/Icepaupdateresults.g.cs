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

namespace Infor.Sxe.IC.Data.Models.Pdsicepaupdate
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicepaupdate.Icepaupdateresults")]
   public partial class Icepaupdateresults : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodnotes { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public decimal qtycnt { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string icetnotes { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      public int notesid { get; set; }
      [StringValidationAttribute]
      public string iCETRowID { get; set; }
      [StringValidationAttribute]
      public string cICETRowId { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icepaupdateresults BuildIcepaupdateresultsFromRow(DataRow row)
      {
         Icepaupdateresults entity = new Icepaupdateresults();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodnotes = row.IsNull("prodnotes") ? string.Empty : row.Field<string>("prodnotes");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.qtycnt = row.IsNull("qtycnt") ? decimal.Zero : row.Field<decimal>("qtycnt");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.icetnotes = row.IsNull("icetnotes") ? string.Empty : row.Field<string>("icetnotes");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.notesid = row.IsNull("notesid") ? 0 : row.Field<int>("notesid");
         entity.iCETRowID = row.Field<byte[]>("ICETRowID").ToStringEncoded();
         entity.cICETRowId = row.IsNull("cICETRowId") ? string.Empty : row.Field<string>("cICETRowId");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcepaupdateresults(ref DataRow row, Icepaupdateresults entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("prodnotes", entity.prodnotes);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("qtycnt", entity.qtycnt);
         row.SetField("unit", entity.unit);
         row.SetField("icetnotes", entity.icetnotes);
         row.SetField("refer", entity.refer);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("notesid", entity.notesid);
         row.SetField("ICETRowID", entity.iCETRowID.ToByteArray());
         row.SetField("cICETRowId", entity.cICETRowId);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591