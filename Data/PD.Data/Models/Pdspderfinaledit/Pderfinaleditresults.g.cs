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

namespace Infor.Sxe.PD.Data.Models.Pdspderfinaledit
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspderfinaledit.Pderfinaleditresults")]
   public partial class Pderfinaleditresults : ModelBase
   {
      public decimal proofAmt { get; set; }
      public decimal postAmt { get; set; }
      public decimal aPCreditAmt { get; set; }
      public decimal writeOffAmt { get; set; }
      public bool writeOffBalType { get; set; }
      [StringValidationAttribute]
      public string reference { get; set; }
      public decimal totalVendRcpts { get; set; }
      public decimal totalLineRcpts { get; set; }
      public int divno { get; set; }
      [StringValidationAttribute]
      public string currencyty { get; set; }
      public decimal reconexrate { get; set; }
      public bool currencytyhidden { get; set; }
      public bool currencytyenabled { get; set; }
      public bool reconexrateenabled { get; set; }
      [StringValidationAttribute]
      public string rowidpderc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pderfinaleditresults BuildPderfinaleditresultsFromRow(DataRow row)
      {
         Pderfinaleditresults entity = new Pderfinaleditresults();
         entity.proofAmt = row.IsNull("proofAmt") ? decimal.Zero : row.Field<decimal>("proofAmt");
         entity.postAmt = row.IsNull("postAmt") ? decimal.Zero : row.Field<decimal>("postAmt");
         entity.aPCreditAmt = row.IsNull("APCreditAmt") ? decimal.Zero : row.Field<decimal>("APCreditAmt");
         entity.writeOffAmt = row.IsNull("writeOffAmt") ? decimal.Zero : row.Field<decimal>("writeOffAmt");
         entity.writeOffBalType = row.Field<bool>("writeOffBalType");
         entity.reference = row.IsNull("reference") ? string.Empty : row.Field<string>("reference");
         entity.totalVendRcpts = row.IsNull("totalVendRcpts") ? decimal.Zero : row.Field<decimal>("totalVendRcpts");
         entity.totalLineRcpts = row.IsNull("totalLineRcpts") ? decimal.Zero : row.Field<decimal>("totalLineRcpts");
         entity.divno = row.IsNull("divno") ? 0 : row.Field<int>("divno");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.reconexrate = row.IsNull("reconexrate") ? decimal.Zero : row.Field<decimal>("reconexrate");
         entity.currencytyhidden = row.Field<bool>("currencytyhidden");
         entity.currencytyenabled = row.Field<bool>("currencytyenabled");
         entity.reconexrateenabled = row.Field<bool>("reconexrateenabled");
         entity.rowidpderc = row.Field<byte[]>("rowidpderc").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPderfinaleditresults(ref DataRow row, Pderfinaleditresults entity)
      {
         row.SetField("proofAmt", entity.proofAmt);
         row.SetField("postAmt", entity.postAmt);
         row.SetField("APCreditAmt", entity.aPCreditAmt);
         row.SetField("writeOffAmt", entity.writeOffAmt);
         row.SetField("writeOffBalType", entity.writeOffBalType);
         row.SetField("reference", entity.reference);
         row.SetField("totalVendRcpts", entity.totalVendRcpts);
         row.SetField("totalLineRcpts", entity.totalLineRcpts);
         row.SetField("divno", entity.divno);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("reconexrate", entity.reconexrate);
         row.SetField("currencytyhidden", entity.currencytyhidden);
         row.SetField("currencytyenabled", entity.currencytyenabled);
         row.SetField("reconexrateenabled", entity.reconexrateenabled);
         row.SetField("rowidpderc", entity.rowidpderc.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
