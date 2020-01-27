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

namespace Infor.Sxe.PD.Data.Models.Pdspdeminitializepdsc1
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdeminitializepdsc1.Pdeminitializepdsc1")]
   public partial class Pdeminitializepdsc1 : ModelBase
   {
      public bool fiShipToVisible { get; set; }
      public bool fiShipToSensitive { get; set; }
      public bool btnLookupShipToVisible { get; set; }
      public bool btnLookupShipToSensitive { get; set; }
      public bool lblShipToVisible { get; set; }
      public bool lblShipToSensitive { get; set; }
      public bool fiWhseVisible { get; set; }
      public bool fiWhseSensitive { get; set; }
      public bool btnLookupWhseVisible { get; set; }
      public bool btnLookupWhseSensitive { get; set; }
      [StringValidationAttribute]
      public string lblCustNoScreenValue { get; set; }
      [StringValidationAttribute]
      public string lblShipToScreenValue { get; set; }
      [StringValidationAttribute]
      public string lblProdScreenValue { get; set; }
      public bool fiProdVisible { get; set; }
      public bool btnLookupProdVisible { get; set; }
      public bool lblProdVisible { get; set; }
      public bool fiCustNoVisible { get; set; }
      public bool btnLookupCustnoVisible { get; set; }
      public bool lblCustNoVisible { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdeminitializepdsc1 BuildPdeminitializepdsc1FromRow(DataRow row)
      {
         Pdeminitializepdsc1 entity = new Pdeminitializepdsc1();
         entity.fiShipToVisible = row.Field<bool>("fiShipTo-visible");
         entity.fiShipToSensitive = row.Field<bool>("fiShipTo-sensitive");
         entity.btnLookupShipToVisible = row.Field<bool>("btnLookupShipTo-visible");
         entity.btnLookupShipToSensitive = row.Field<bool>("btnLookupShipTo-sensitive");
         entity.lblShipToVisible = row.Field<bool>("lblShipTo-visible");
         entity.lblShipToSensitive = row.Field<bool>("lblShipTo-sensitive");
         entity.fiWhseVisible = row.Field<bool>("fiWhse-visible");
         entity.fiWhseSensitive = row.Field<bool>("fiWhse-sensitive");
         entity.btnLookupWhseVisible = row.Field<bool>("btnLookupWhse-visible");
         entity.btnLookupWhseSensitive = row.Field<bool>("btnLookupWhse-sensitive");
         entity.lblCustNoScreenValue = row.IsNull("lblCustNo-screen-value") ? string.Empty : row.Field<string>("lblCustNo-screen-value");
         entity.lblShipToScreenValue = row.IsNull("lblShipTo-screen-value") ? string.Empty : row.Field<string>("lblShipTo-screen-value");
         entity.lblProdScreenValue = row.IsNull("lblProd-screen-value") ? string.Empty : row.Field<string>("lblProd-screen-value");
         entity.fiProdVisible = row.Field<bool>("fiProd-visible");
         entity.btnLookupProdVisible = row.Field<bool>("btnLookupProd-visible");
         entity.lblProdVisible = row.Field<bool>("lblProd-visible");
         entity.fiCustNoVisible = row.Field<bool>("fiCustNo-visible");
         entity.btnLookupCustnoVisible = row.Field<bool>("btnLookupCustno-visible");
         entity.lblCustNoVisible = row.Field<bool>("lblCustNo-visible");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdeminitializepdsc1(ref DataRow row, Pdeminitializepdsc1 entity)
      {
         row.SetField("fiShipTo-visible", entity.fiShipToVisible);
         row.SetField("fiShipTo-sensitive", entity.fiShipToSensitive);
         row.SetField("btnLookupShipTo-visible", entity.btnLookupShipToVisible);
         row.SetField("btnLookupShipTo-sensitive", entity.btnLookupShipToSensitive);
         row.SetField("lblShipTo-visible", entity.lblShipToVisible);
         row.SetField("lblShipTo-sensitive", entity.lblShipToSensitive);
         row.SetField("fiWhse-visible", entity.fiWhseVisible);
         row.SetField("fiWhse-sensitive", entity.fiWhseSensitive);
         row.SetField("btnLookupWhse-visible", entity.btnLookupWhseVisible);
         row.SetField("btnLookupWhse-sensitive", entity.btnLookupWhseSensitive);
         row.SetField("lblCustNo-screen-value", entity.lblCustNoScreenValue);
         row.SetField("lblShipTo-screen-value", entity.lblShipToScreenValue);
         row.SetField("lblProd-screen-value", entity.lblProdScreenValue);
         row.SetField("fiProd-visible", entity.fiProdVisible);
         row.SetField("btnLookupProd-visible", entity.btnLookupProdVisible);
         row.SetField("lblProd-visible", entity.lblProdVisible);
         row.SetField("fiCustNo-visible", entity.fiCustNoVisible);
         row.SetField("btnLookupCustno-visible", entity.btnLookupCustnoVisible);
         row.SetField("lblCustNo-visible", entity.lblCustNoVisible);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591