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

namespace Infor.Sxe.OE.Data.Models.Pdsloadoelinesettings
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsloadoelinesettings.Loadoelinesettings")]
   public partial class Loadoelinesettings : ModelBase
   {
      public bool lAllowExpandedProduct { get; set; }
      [StringValidationAttribute]
      public string cCurrSymbol { get; set; }
      [StringValidationAttribute]
      public string cDefaultOEFrzRebTy { get; set; }
      public bool lForceSerLot { get; set; }
      public bool lForceSerLotKit { get; set; }
      public bool lGeocdfl { get; set; }
      [StringValidationAttribute]
      public string cGeoindxty { get; set; }
      public bool lGeotxrgfl { get; set; }
      [StringValidationAttribute]
      public string cICDATCLabel { get; set; }
      public bool lModVTfl { get; set; }
      public bool lNonStockEntry { get; set; }
      [StringValidationAttribute]
      public string cNSCrtOanTy { get; set; }
      [StringValidationAttribute]
      public string cOECostOverTy { get; set; }
      [StringValidationAttribute]
      public string cOELotEntTy { get; set; }
      [StringValidationAttribute]
      public string cOENSQtyShpTy { get; set; }
      [StringValidationAttribute]
      public string cOEQtyShipTy { get; set; }
      [StringValidationAttribute]
      public string cOESerialEntTy { get; set; }
      [StringValidationAttribute]
      public string cOETieType { get; set; }
      public bool lSlsRepInFl { get; set; }
      public bool lSlsRepOutFl { get; set; }
      [StringValidationAttribute]
      public string cStorefrontURL { get; set; }
      [StringValidationAttribute]
      public string cStorefrontUserID { get; set; }
      [StringValidationAttribute]
      public string cTaxInterfaceTy { get; set; }
      [StringValidationAttribute]
      public string cTaxMethodTy { get; set; }
      public bool lCfgInstalled { get; set; }
      public bool lCCInstalled { get; set; }
      [StringValidationAttribute]
      public string cSupplierAccessHttpServerName { get; set; }
      public int iSupplierAccessHttpServerPortNum { get; set; }
      public int iSupplierAccessPauseSeconds { get; set; }
      public int iSupplierAccessPauseTimes { get; set; }
      [StringValidationAttribute]
      public string cDefaultSpecNSType { get; set; }
      [StringValidationAttribute]
      public string cVaWorkFlow { get; set; }
      public bool lValProd { get; set; }
      public bool lValQtyOrd { get; set; }
      public bool lValUnit { get; set; }
      public bool lValPrice { get; set; }
      public bool lValDiscAmt { get; set; }
      public bool lValQtyShip { get; set; }
      [StringValidationAttribute]
      public string cAltProdWF { get; set; }
      [StringValidationAttribute]
      public string cSuperWF { get; set; }
      public bool lICSNPOFl { get; set; }
      [StringValidationAttribute]
      public string cICLotRcptType { get; set; }
      public bool lQtyShipEnabled { get; set; }
      [StringValidationAttribute]
      public string cICNSProdCat { get; set; }
      public bool lNsCommfl { get; set; }
      public bool lUsePrevNsFl { get; set; }
      public bool lICCatStockFl { get; set; }
      public bool lLostBusReasonFl { get; set; }
      public bool lNCNREntryfl { get; set; }
      [StringValidationAttribute]
      public string cPromoPrcDflt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadoelinesettings BuildLoadoelinesettingsFromRow(DataRow row)
      {
         Loadoelinesettings entity = new Loadoelinesettings();
         entity.lAllowExpandedProduct = row.Field<bool>("lAllowExpandedProduct");
         entity.cCurrSymbol = row.IsNull("cCurrSymbol") ? string.Empty : row.Field<string>("cCurrSymbol");
         entity.cDefaultOEFrzRebTy = row.IsNull("cDefaultOEFrzRebTy") ? string.Empty : row.Field<string>("cDefaultOEFrzRebTy");
         entity.lForceSerLot = row.Field<bool>("lForceSerLot");
         entity.lForceSerLotKit = row.Field<bool>("lForceSerLotKit");
         entity.lGeocdfl = row.Field<bool>("lGeocdfl");
         entity.cGeoindxty = row.IsNull("cGeoindxty") ? string.Empty : row.Field<string>("cGeoindxty");
         entity.lGeotxrgfl = row.Field<bool>("lGeotxrgfl");
         entity.cICDATCLabel = row.IsNull("cICDATCLabel") ? string.Empty : row.Field<string>("cICDATCLabel");
         entity.lModVTfl = row.Field<bool>("lModVTfl");
         entity.lNonStockEntry = row.Field<bool>("lNonStockEntry");
         entity.cNSCrtOanTy = row.IsNull("cNSCrtOanTy") ? string.Empty : row.Field<string>("cNSCrtOanTy");
         entity.cOECostOverTy = row.IsNull("cOECostOverTy") ? string.Empty : row.Field<string>("cOECostOverTy");
         entity.cOELotEntTy = row.IsNull("cOELotEntTy") ? string.Empty : row.Field<string>("cOELotEntTy");
         entity.cOENSQtyShpTy = row.IsNull("cOENSQtyShpTy") ? string.Empty : row.Field<string>("cOENSQtyShpTy");
         entity.cOEQtyShipTy = row.IsNull("cOEQtyShipTy") ? string.Empty : row.Field<string>("cOEQtyShipTy");
         entity.cOESerialEntTy = row.IsNull("cOESerialEntTy") ? string.Empty : row.Field<string>("cOESerialEntTy");
         entity.cOETieType = row.IsNull("cOETieType") ? string.Empty : row.Field<string>("cOETieType");
         entity.lSlsRepInFl = row.Field<bool>("lSlsRepInFl");
         entity.lSlsRepOutFl = row.Field<bool>("lSlsRepOutFl");
         entity.cStorefrontURL = row.IsNull("cStorefrontURL") ? string.Empty : row.Field<string>("cStorefrontURL");
         entity.cStorefrontUserID = row.IsNull("cStorefrontUserID") ? string.Empty : row.Field<string>("cStorefrontUserID");
         entity.cTaxInterfaceTy = row.IsNull("cTaxInterfaceTy") ? string.Empty : row.Field<string>("cTaxInterfaceTy");
         entity.cTaxMethodTy = row.IsNull("cTaxMethodTy") ? string.Empty : row.Field<string>("cTaxMethodTy");
         entity.lCfgInstalled = row.Field<bool>("lCfgInstalled");
         entity.lCCInstalled = row.Field<bool>("lCCInstalled");
         entity.cSupplierAccessHttpServerName = row.IsNull("cSupplierAccessHttpServerName") ? string.Empty : row.Field<string>("cSupplierAccessHttpServerName");
         entity.iSupplierAccessHttpServerPortNum = row.IsNull("iSupplierAccessHttpServerPortNum") ? 0 : row.Field<int>("iSupplierAccessHttpServerPortNum");
         entity.iSupplierAccessPauseSeconds = row.IsNull("iSupplierAccessPauseSeconds") ? 0 : row.Field<int>("iSupplierAccessPauseSeconds");
         entity.iSupplierAccessPauseTimes = row.IsNull("iSupplierAccessPauseTimes") ? 0 : row.Field<int>("iSupplierAccessPauseTimes");
         entity.cDefaultSpecNSType = row.IsNull("cDefaultSpecNSType") ? string.Empty : row.Field<string>("cDefaultSpecNSType");
         entity.cVaWorkFlow = row.IsNull("cVaWorkFlow") ? string.Empty : row.Field<string>("cVaWorkFlow");
         entity.lValProd = row.Field<bool>("lValProd");
         entity.lValQtyOrd = row.Field<bool>("lValQtyOrd");
         entity.lValUnit = row.Field<bool>("lValUnit");
         entity.lValPrice = row.Field<bool>("lValPrice");
         entity.lValDiscAmt = row.Field<bool>("lValDiscAmt");
         entity.lValQtyShip = row.Field<bool>("lValQtyShip");
         entity.cAltProdWF = row.IsNull("cAltProdWF") ? string.Empty : row.Field<string>("cAltProdWF");
         entity.cSuperWF = row.IsNull("cSuperWF") ? string.Empty : row.Field<string>("cSuperWF");
         entity.lICSNPOFl = row.Field<bool>("lICSNPOFl");
         entity.cICLotRcptType = row.IsNull("cICLotRcptType") ? string.Empty : row.Field<string>("cICLotRcptType");
         entity.lQtyShipEnabled = row.Field<bool>("lQtyShipEnabled");
         entity.cICNSProdCat = row.IsNull("cICNSProdCat") ? string.Empty : row.Field<string>("cICNSProdCat");
         entity.lNsCommfl = row.Field<bool>("lNsCommfl");
         entity.lUsePrevNsFl = row.Field<bool>("lUsePrevNsFl");
         entity.lICCatStockFl = row.Field<bool>("lICCatStockFl");
         entity.lLostBusReasonFl = row.Field<bool>("lLostBusReasonFl");
         entity.lNCNREntryfl = row.Field<bool>("lNCNREntryfl");
         entity.cPromoPrcDflt = row.IsNull("cPromoPrcDflt") ? string.Empty : row.Field<string>("cPromoPrcDflt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadoelinesettings(ref DataRow row, Loadoelinesettings entity)
      {
         row.SetField("lAllowExpandedProduct", entity.lAllowExpandedProduct);
         row.SetField("cCurrSymbol", entity.cCurrSymbol);
         row.SetField("cDefaultOEFrzRebTy", entity.cDefaultOEFrzRebTy);
         row.SetField("lForceSerLot", entity.lForceSerLot);
         row.SetField("lForceSerLotKit", entity.lForceSerLotKit);
         row.SetField("lGeocdfl", entity.lGeocdfl);
         row.SetField("cGeoindxty", entity.cGeoindxty);
         row.SetField("lGeotxrgfl", entity.lGeotxrgfl);
         row.SetField("cICDATCLabel", entity.cICDATCLabel);
         row.SetField("lModVTfl", entity.lModVTfl);
         row.SetField("lNonStockEntry", entity.lNonStockEntry);
         row.SetField("cNSCrtOanTy", entity.cNSCrtOanTy);
         row.SetField("cOECostOverTy", entity.cOECostOverTy);
         row.SetField("cOELotEntTy", entity.cOELotEntTy);
         row.SetField("cOENSQtyShpTy", entity.cOENSQtyShpTy);
         row.SetField("cOEQtyShipTy", entity.cOEQtyShipTy);
         row.SetField("cOESerialEntTy", entity.cOESerialEntTy);
         row.SetField("cOETieType", entity.cOETieType);
         row.SetField("lSlsRepInFl", entity.lSlsRepInFl);
         row.SetField("lSlsRepOutFl", entity.lSlsRepOutFl);
         row.SetField("cStorefrontURL", entity.cStorefrontURL);
         row.SetField("cStorefrontUserID", entity.cStorefrontUserID);
         row.SetField("cTaxInterfaceTy", entity.cTaxInterfaceTy);
         row.SetField("cTaxMethodTy", entity.cTaxMethodTy);
         row.SetField("lCfgInstalled", entity.lCfgInstalled);
         row.SetField("lCCInstalled", entity.lCCInstalled);
         row.SetField("cSupplierAccessHttpServerName", entity.cSupplierAccessHttpServerName);
         row.SetField("iSupplierAccessHttpServerPortNum", entity.iSupplierAccessHttpServerPortNum);
         row.SetField("iSupplierAccessPauseSeconds", entity.iSupplierAccessPauseSeconds);
         row.SetField("iSupplierAccessPauseTimes", entity.iSupplierAccessPauseTimes);
         row.SetField("cDefaultSpecNSType", entity.cDefaultSpecNSType);
         row.SetField("cVaWorkFlow", entity.cVaWorkFlow);
         row.SetField("lValProd", entity.lValProd);
         row.SetField("lValQtyOrd", entity.lValQtyOrd);
         row.SetField("lValUnit", entity.lValUnit);
         row.SetField("lValPrice", entity.lValPrice);
         row.SetField("lValDiscAmt", entity.lValDiscAmt);
         row.SetField("lValQtyShip", entity.lValQtyShip);
         row.SetField("cAltProdWF", entity.cAltProdWF);
         row.SetField("cSuperWF", entity.cSuperWF);
         row.SetField("lICSNPOFl", entity.lICSNPOFl);
         row.SetField("cICLotRcptType", entity.cICLotRcptType);
         row.SetField("lQtyShipEnabled", entity.lQtyShipEnabled);
         row.SetField("cICNSProdCat", entity.cICNSProdCat);
         row.SetField("lNsCommfl", entity.lNsCommfl);
         row.SetField("lUsePrevNsFl", entity.lUsePrevNsFl);
         row.SetField("lICCatStockFl", entity.lICCatStockFl);
         row.SetField("lLostBusReasonFl", entity.lLostBusReasonFl);
         row.SetField("lNCNREntryfl", entity.lNCNREntryfl);
         row.SetField("cPromoPrcDflt", entity.cPromoPrcDflt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
