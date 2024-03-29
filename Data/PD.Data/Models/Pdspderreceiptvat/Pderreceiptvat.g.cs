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

namespace Infor.Sxe.PD.Data.Models.Pdspderreceiptvat
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspderreceiptvat.Pderreceiptvat")]
   public partial class Pderreceiptvat : ModelBase
   {
      [StringValidationAttribute]
      public string recordtype { get; set; }
      public int claimno { get; set; }
      public int claimseqno { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      public decimal receiptamt { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string currencyty { get; set; }
      [StringValidationAttribute]
      public string proctype { get; set; }
      public decimal settamt { get; set; }
      public bool settenabled { get; set; }
      public bool vatenabled { get; set; }
      [StringValidationAttribute]
      public string vatdomain { get; set; }
      public decimal vatproof { get; set; }
      public bool vatproofhidden { get; set; }
      public decimal vat1taxamt { get; set; }
      public decimal vat1goodsamt { get; set; }
      public decimal vat1taxrate { get; set; }
      public bool vat1enabled { get; set; }
      public bool vat1hidden { get; set; }
      public int vat1groupno { get; set; }
      public bool vat1OverTol { get; set; }
      public decimal vat2taxamt { get; set; }
      public decimal vat2goodsamt { get; set; }
      public decimal vat2taxrate { get; set; }
      public bool vat2enabled { get; set; }
      public bool vat2hidden { get; set; }
      public int vat2groupno { get; set; }
      public bool vat2OverTol { get; set; }
      public decimal vat3taxamt { get; set; }
      public decimal vat3goodsamt { get; set; }
      public decimal vat3taxrate { get; set; }
      public bool vat3enabled { get; set; }
      public bool vat3hidden { get; set; }
      public int vat3groupno { get; set; }
      public bool vat3OverTol { get; set; }
      public decimal vat4taxamt { get; set; }
      public decimal vat4goodsamt { get; set; }
      public decimal vat4taxrate { get; set; }
      public bool vat4enabled { get; set; }
      public bool vat4hidden { get; set; }
      public int vat4groupno { get; set; }
      public bool vat4OverTol { get; set; }
      public decimal vat5taxamt { get; set; }
      public decimal vat5goodsamt { get; set; }
      public decimal vat5taxrate { get; set; }
      public bool vat5enabled { get; set; }
      public bool vat5hidden { get; set; }
      public int vat5groupno { get; set; }
      public bool vat5OverTol { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pderreceiptvat BuildPderreceiptvatFromRow(DataRow row)
      {
         Pderreceiptvat entity = new Pderreceiptvat();
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.claimno = row.IsNull("claimno") ? 0 : row.Field<int>("claimno");
         entity.claimseqno = row.IsNull("claimseqno") ? 0 : row.Field<int>("claimseqno");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.receiptamt = row.IsNull("receiptamt") ? decimal.Zero : row.Field<decimal>("receiptamt");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.proctype = row.IsNull("proctype") ? string.Empty : row.Field<string>("proctype");
         entity.settamt = row.IsNull("settamt") ? decimal.Zero : row.Field<decimal>("settamt");
         entity.settenabled = row.Field<bool>("settenabled");
         entity.vatenabled = row.Field<bool>("vatenabled");
         entity.vatdomain = row.IsNull("vatdomain") ? string.Empty : row.Field<string>("vatdomain");
         entity.vatproof = row.IsNull("vatproof") ? decimal.Zero : row.Field<decimal>("vatproof");
         entity.vatproofhidden = row.Field<bool>("vatproofhidden");
         entity.vat1taxamt = row.IsNull("vat1taxamt") ? decimal.Zero : row.Field<decimal>("vat1taxamt");
         entity.vat1goodsamt = row.IsNull("vat1goodsamt") ? decimal.Zero : row.Field<decimal>("vat1goodsamt");
         entity.vat1taxrate = row.IsNull("vat1taxrate") ? decimal.Zero : row.Field<decimal>("vat1taxrate");
         entity.vat1enabled = row.Field<bool>("vat1enabled");
         entity.vat1hidden = row.Field<bool>("vat1hidden");
         entity.vat1groupno = row.IsNull("vat1groupno") ? 0 : row.Field<int>("vat1groupno");
         entity.vat1OverTol = row.Field<bool>("Vat1OverTol");
         entity.vat2taxamt = row.IsNull("vat2taxamt") ? decimal.Zero : row.Field<decimal>("vat2taxamt");
         entity.vat2goodsamt = row.IsNull("vat2goodsamt") ? decimal.Zero : row.Field<decimal>("vat2goodsamt");
         entity.vat2taxrate = row.IsNull("vat2taxrate") ? decimal.Zero : row.Field<decimal>("vat2taxrate");
         entity.vat2enabled = row.Field<bool>("vat2enabled");
         entity.vat2hidden = row.Field<bool>("vat2hidden");
         entity.vat2groupno = row.IsNull("vat2groupno") ? 0 : row.Field<int>("vat2groupno");
         entity.vat2OverTol = row.Field<bool>("Vat2OverTol");
         entity.vat3taxamt = row.IsNull("vat3taxamt") ? decimal.Zero : row.Field<decimal>("vat3taxamt");
         entity.vat3goodsamt = row.IsNull("vat3goodsamt") ? decimal.Zero : row.Field<decimal>("vat3goodsamt");
         entity.vat3taxrate = row.IsNull("vat3taxrate") ? decimal.Zero : row.Field<decimal>("vat3taxrate");
         entity.vat3enabled = row.Field<bool>("vat3enabled");
         entity.vat3hidden = row.Field<bool>("vat3hidden");
         entity.vat3groupno = row.IsNull("vat3groupno") ? 0 : row.Field<int>("vat3groupno");
         entity.vat3OverTol = row.Field<bool>("Vat3OverTol");
         entity.vat4taxamt = row.IsNull("vat4taxamt") ? decimal.Zero : row.Field<decimal>("vat4taxamt");
         entity.vat4goodsamt = row.IsNull("vat4goodsamt") ? decimal.Zero : row.Field<decimal>("vat4goodsamt");
         entity.vat4taxrate = row.IsNull("vat4taxrate") ? decimal.Zero : row.Field<decimal>("vat4taxrate");
         entity.vat4enabled = row.Field<bool>("vat4enabled");
         entity.vat4hidden = row.Field<bool>("vat4hidden");
         entity.vat4groupno = row.IsNull("vat4groupno") ? 0 : row.Field<int>("vat4groupno");
         entity.vat4OverTol = row.Field<bool>("Vat4OverTol");
         entity.vat5taxamt = row.IsNull("vat5taxamt") ? decimal.Zero : row.Field<decimal>("vat5taxamt");
         entity.vat5goodsamt = row.IsNull("vat5goodsamt") ? decimal.Zero : row.Field<decimal>("vat5goodsamt");
         entity.vat5taxrate = row.IsNull("vat5taxrate") ? decimal.Zero : row.Field<decimal>("vat5taxrate");
         entity.vat5enabled = row.Field<bool>("vat5enabled");
         entity.vat5hidden = row.Field<bool>("vat5hidden");
         entity.vat5groupno = row.IsNull("vat5groupno") ? 0 : row.Field<int>("vat5groupno");
         entity.vat5OverTol = row.Field<bool>("Vat5OverTol");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPderreceiptvat(ref DataRow row, Pderreceiptvat entity)
      {
         row.SetField("recordtype", entity.recordtype);
         row.SetField("claimno", entity.claimno);
         row.SetField("claimseqno", entity.claimseqno);
         row.SetField("statustype", entity.statustype);
         row.SetField("receiptamt", entity.receiptamt);
         row.SetField("vendno", entity.vendno);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("proctype", entity.proctype);
         row.SetField("settamt", entity.settamt);
         row.SetField("settenabled", entity.settenabled);
         row.SetField("vatenabled", entity.vatenabled);
         row.SetField("vatdomain", entity.vatdomain);
         row.SetField("vatproof", entity.vatproof);
         row.SetField("vatproofhidden", entity.vatproofhidden);
         row.SetField("vat1taxamt", entity.vat1taxamt);
         row.SetField("vat1goodsamt", entity.vat1goodsamt);
         row.SetField("vat1taxrate", entity.vat1taxrate);
         row.SetField("vat1enabled", entity.vat1enabled);
         row.SetField("vat1hidden", entity.vat1hidden);
         row.SetField("vat1groupno", entity.vat1groupno);
         row.SetField("Vat1OverTol", entity.vat1OverTol);
         row.SetField("vat2taxamt", entity.vat2taxamt);
         row.SetField("vat2goodsamt", entity.vat2goodsamt);
         row.SetField("vat2taxrate", entity.vat2taxrate);
         row.SetField("vat2enabled", entity.vat2enabled);
         row.SetField("vat2hidden", entity.vat2hidden);
         row.SetField("vat2groupno", entity.vat2groupno);
         row.SetField("Vat2OverTol", entity.vat2OverTol);
         row.SetField("vat3taxamt", entity.vat3taxamt);
         row.SetField("vat3goodsamt", entity.vat3goodsamt);
         row.SetField("vat3taxrate", entity.vat3taxrate);
         row.SetField("vat3enabled", entity.vat3enabled);
         row.SetField("vat3hidden", entity.vat3hidden);
         row.SetField("vat3groupno", entity.vat3groupno);
         row.SetField("Vat3OverTol", entity.vat3OverTol);
         row.SetField("vat4taxamt", entity.vat4taxamt);
         row.SetField("vat4goodsamt", entity.vat4goodsamt);
         row.SetField("vat4taxrate", entity.vat4taxrate);
         row.SetField("vat4enabled", entity.vat4enabled);
         row.SetField("vat4hidden", entity.vat4hidden);
         row.SetField("vat4groupno", entity.vat4groupno);
         row.SetField("Vat4OverTol", entity.vat4OverTol);
         row.SetField("vat5taxamt", entity.vat5taxamt);
         row.SetField("vat5goodsamt", entity.vat5goodsamt);
         row.SetField("vat5taxrate", entity.vat5taxrate);
         row.SetField("vat5enabled", entity.vat5enabled);
         row.SetField("vat5hidden", entity.vat5hidden);
         row.SetField("vat5groupno", entity.vat5groupno);
         row.SetField("Vat5OverTol", entity.vat5OverTol);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
