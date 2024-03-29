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

namespace Infor.Sxe.VA.Data.Models.Pdsvaspheaderadd
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaspheaderadd.Vaspheaderaddcriteria")]
   public partial class Vaspheaderaddcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public int verno { get; set; }
      public int nodaysfab { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string verrefer { get; set; }
      [StringValidationAttribute]
      public string cVANotes { get; set; }
      [StringValidationAttribute]
      public string cProdNotes { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string proddesc2 { get; set; }
      [StringValidationAttribute]
      public string whsedesc { get; set; }
      public bool catfl { get; set; }
      public bool vaassemblyfl { get; set; }
      [StringValidationAttribute]
      public string vaassemblyty { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaspheaderaddcriteria BuildVaspheaderaddcriteriaFromRow(DataRow row)
      {
         Vaspheaderaddcriteria entity = new Vaspheaderaddcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         entity.nodaysfab = row.IsNull("nodaysfab") ? 0 : row.Field<int>("nodaysfab");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.verrefer = row.IsNull("verrefer") ? string.Empty : row.Field<string>("verrefer");
         entity.cVANotes = row.IsNull("cVANotes") ? string.Empty : row.Field<string>("cVANotes");
         entity.cProdNotes = row.IsNull("cProdNotes") ? string.Empty : row.Field<string>("cProdNotes");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.whsedesc = row.IsNull("whsedesc") ? string.Empty : row.Field<string>("whsedesc");
         entity.catfl = row.Field<bool>("catfl");
         entity.vaassemblyfl = row.Field<bool>("vaassemblyfl");
         entity.vaassemblyty = row.IsNull("vaassemblyty") ? string.Empty : row.Field<string>("vaassemblyty");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaspheaderaddcriteria(ref DataRow row, Vaspheaderaddcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("verno", entity.verno);
         row.SetField("nodaysfab", entity.nodaysfab);
         row.SetField("refer", entity.refer);
         row.SetField("verrefer", entity.verrefer);
         row.SetField("cVANotes", entity.cVANotes);
         row.SetField("cProdNotes", entity.cProdNotes);
         row.SetField("descrip", entity.descrip);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("whsedesc", entity.whsedesc);
         row.SetField("catfl", entity.catfl);
         row.SetField("vaassemblyfl", entity.vaassemblyfl);
         row.SetField("vaassemblyty", entity.vaassemblyty);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
