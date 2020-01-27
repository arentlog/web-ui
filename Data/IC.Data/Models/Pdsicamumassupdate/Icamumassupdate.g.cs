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

namespace Infor.Sxe.IC.Data.Models.Pdsicamumassupdate
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamumassupdate.Icamumassupdate")]
   public partial class Icamumassupdate : ModelBase
   {
      [StringValidationAttribute]
      public string cStatustype { get; set; }
      public bool tbStatusType { get; set; }
      [StringValidationAttribute]
      public string cFrozenDate { get; set; }
      public bool tbFrozenDate { get; set; }
      [StringValidationAttribute]
      public string cPriceType { get; set; }
      public bool tbPriceType { get; set; }
      [StringValidationAttribute]
      public string cFrozentype { get; set; }
      public bool tbFrozenType { get; set; }
      public int iFrozenMonths { get; set; }
      public bool tbFrozenMonths { get; set; }
      public DateTime? dtAcquiredt { get; set; }
      public bool tbAcquireDt { get; set; }
      [StringValidationAttribute]
      public string cArptype { get; set; }
      public bool tbArpType { get; set; }
      [StringValidationAttribute]
      public string cArpPushFl { get; set; }
      public bool tbArpPushFl { get; set; }
      public decimal dArpVendorNo { get; set; }
      [StringValidationAttribute]
      public string txtArpVendorNo { get; set; }
      [StringValidationAttribute]
      public string cArpVendorNotesfl { get; set; }
      public bool tbArpVendorNo { get; set; }
      public decimal dUsageRate { get; set; }
      public bool tbUsageRate { get; set; }
      [StringValidationAttribute]
      public string cArpWhse { get; set; }
      public bool tbArpWhse { get; set; }
      [StringValidationAttribute]
      public string cWhseRank { get; set; }
      public bool tbWhseRank { get; set; }
      public int iUsageMonths { get; set; }
      public bool tbUsageMonths { get; set; }
      [StringValidationAttribute]
      public string cArpProdLine { get; set; }
      public bool tbArpProdLine { get; set; }
      public bool tbRankFreezeEntered { get; set; }
      public bool tbRankFreeze { get; set; }
      [StringValidationAttribute]
      public string cVendorProd { get; set; }
      public bool tbVendorProd { get; set; }
      public bool tbUsMthsFrzEntered { get; set; }
      public bool tbUsMthsFrz { get; set; }
      [StringValidationAttribute]
      public string cFamilyGroup { get; set; }
      public bool tbFamilyGroup { get; set; }
      [StringValidationAttribute]
      public string cUsagectrl { get; set; }
      public bool tbUsageCtrl { get; set; }
      [StringValidationAttribute]
      public string cSurplusTy { get; set; }
      public bool tbSurplusTy { get; set; }
      [StringValidationAttribute]
      public string cClass { get; set; }
      public bool tbClass { get; set; }
      public int iLeadTime { get; set; }
      public bool tbLeadTime { get; set; }
      [StringValidationAttribute]
      public string cSafeAllType { get; set; }
      public decimal dSafeAllAmt { get; set; }
      public bool tbSafeAllAmt { get; set; }
      [StringValidationAttribute]
      public string cRebateTy { get; set; }
      public bool tbRebateTy { get; set; }
      [StringValidationAttribute]
      public string cRebSubTy { get; set; }
      public bool tbRebSubTy { get; set; }
      public int iFrozenLeadTimeType { get; set; }
      public bool tbFrozenLeadTimeType { get; set; }
      public bool tbFrozenClass { get; set; }
      public bool tbFrozenClassEntered { get; set; }
      [StringValidationAttribute]
      public string cBuyingUnit { get; set; }
      public bool tbBuyingUnit { get; set; }
      [StringValidationAttribute]
      public string cStndUnit { get; set; }
      public bool tbStndUnit { get; set; }
      public int iSeasBegMM { get; set; }
      public bool tbSeasBegMM { get; set; }
      public int iSeasEndMM { get; set; }
      public bool tbSeasEndMM { get; set; }
      [StringValidationAttribute]
      public string cTransferUnit { get; set; }
      public bool tbTransferUnit { get; set; }
      public int iOrdQtyOut { get; set; }
      public bool tbOrdQtyOut { get; set; }
      [StringValidationAttribute]
      public string cOverreasout { get; set; }
      public bool tbOverReasOut { get; set; }
      public int iOrderPoint { get; set; }
      public bool tbOrderPoint { get; set; }
      public int iOrdQtyIn { get; set; }
      public bool tbOrdQtyIn { get; set; }
      public int iLinePoint { get; set; }
      public bool tbLinePoint { get; set; }
      public bool tbRollOANUsagefl { get; set; }
      public bool tbRollOANUsageUpdatefl { get; set; }
      [StringValidationAttribute]
      public string cRollOANUsageLbl { get; set; }
      public decimal dSeasTrendMin { get; set; }
      public bool tbSeasTrendMin { get; set; }
      [StringValidationAttribute]
      public string cOrdcalcty { get; set; }
      public bool tbOrdCalcTy { get; set; }
      [StringValidationAttribute]
      public string cOverreasin { get; set; }
      public bool tbOverReasIn { get; set; }
      public decimal dSeasTrendMax { get; set; }
      public bool tbSeasTrendMax { get; set; }
      public DateTime? dtSeasTrendExpDt { get; set; }
      public bool tbSeasTrendExpDt { get; set; }
      [StringValidationAttribute]
      public string cThreshRefer { get; set; }
      public bool tbThreshRefer { get; set; }
      public int iSeasTrendLyu { get; set; }
      public bool tbSeasTrendLYU { get; set; }
      public DateTime? dtMinThreshExpDt { get; set; }
      public bool tbMinThreshExpDt { get; set; }
      public decimal dMinThreshold { get; set; }
      public bool tbMinThreshold { get; set; }
      public int iSeasTrendTYU { get; set; }
      public bool tbSeasTrendTYU { get; set; }
      public decimal dASQDiff { get; set; }
      public bool tbASQDiff { get; set; }
      public bool tbAsqFlEntered { get; set; }
      public bool tbAsqFl { get; set; }
      public bool tbAsqDiffFlEntered { get; set; }
      public bool tbAsqDiffFl { get; set; }
      public decimal dHi5Diff { get; set; }
      public bool tbHi5Diff { get; set; }
      public bool tbHi5FlEntered { get; set; }
      public bool tbHi5Fl { get; set; }
      public bool tbHi5DiffFlEntered { get; set; }
      public bool tbHi5DiffFl { get; set; }
      [StringValidationAttribute]
      public string cReserveTy { get; set; }
      public bool tbReserveTy { get; set; }
      public int iReserveDays { get; set; }
      public bool tbReserveDays { get; set; }
      [StringValidationAttribute]
      public string cNCNR { get; set; }
      public bool tbNCNR { get; set; }
      [StringValidationAttribute]
      public string statusmess { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      public bool tbCountryofOrigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      public bool tbTariffCd { get; set; }
      [StringValidationAttribute]
      public string cProdPreference { get; set; }
      public bool tbProdPreference { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamumassupdate BuildIcamumassupdateFromRow(DataRow row)
      {
         Icamumassupdate entity = new Icamumassupdate();
         entity.cStatustype = row.IsNull("cStatustype") ? string.Empty : row.Field<string>("cStatustype");
         entity.tbStatusType = row.Field<bool>("tbStatusType");
         entity.cFrozenDate = row.IsNull("cFrozenDate") ? string.Empty : row.Field<string>("cFrozenDate");
         entity.tbFrozenDate = row.Field<bool>("tbFrozenDate");
         entity.cPriceType = row.IsNull("cPriceType") ? string.Empty : row.Field<string>("cPriceType");
         entity.tbPriceType = row.Field<bool>("tbPriceType");
         entity.cFrozentype = row.IsNull("cFrozentype") ? string.Empty : row.Field<string>("cFrozentype");
         entity.tbFrozenType = row.Field<bool>("tbFrozenType");
         entity.iFrozenMonths = row.IsNull("iFrozenMonths") ? 0 : row.Field<int>("iFrozenMonths");
         entity.tbFrozenMonths = row.Field<bool>("tbFrozenMonths");
         entity.dtAcquiredt = row.Field<DateTime?>("dtAcquiredt");
         entity.tbAcquireDt = row.Field<bool>("tbAcquireDt");
         entity.cArptype = row.IsNull("cArptype") ? string.Empty : row.Field<string>("cArptype");
         entity.tbArpType = row.Field<bool>("tbArpType");
         entity.cArpPushFl = row.IsNull("cArpPushFl") ? string.Empty : row.Field<string>("cArpPushFl");
         entity.tbArpPushFl = row.Field<bool>("tbArpPushFl");
         entity.dArpVendorNo = row.IsNull("dArpVendorNo") ? decimal.Zero : row.Field<decimal>("dArpVendorNo");
         entity.txtArpVendorNo = row.IsNull("txtArpVendorNo") ? string.Empty : row.Field<string>("txtArpVendorNo");
         entity.cArpVendorNotesfl = row.IsNull("cArpVendorNotesfl") ? string.Empty : row.Field<string>("cArpVendorNotesfl");
         entity.tbArpVendorNo = row.Field<bool>("tbArpVendorNo");
         entity.dUsageRate = row.IsNull("dUsageRate") ? decimal.Zero : row.Field<decimal>("dUsageRate");
         entity.tbUsageRate = row.Field<bool>("tbUsageRate");
         entity.cArpWhse = row.IsNull("cArpWhse") ? string.Empty : row.Field<string>("cArpWhse");
         entity.tbArpWhse = row.Field<bool>("tbArpWhse");
         entity.cWhseRank = row.IsNull("cWhseRank") ? string.Empty : row.Field<string>("cWhseRank");
         entity.tbWhseRank = row.Field<bool>("tbWhseRank");
         entity.iUsageMonths = row.IsNull("iUsageMonths") ? 0 : row.Field<int>("iUsageMonths");
         entity.tbUsageMonths = row.Field<bool>("tbUsageMonths");
         entity.cArpProdLine = row.IsNull("cArpProdLine") ? string.Empty : row.Field<string>("cArpProdLine");
         entity.tbArpProdLine = row.Field<bool>("tbArpProdLine");
         entity.tbRankFreezeEntered = row.Field<bool>("tbRankFreezeEntered");
         entity.tbRankFreeze = row.Field<bool>("tbRankFreeze");
         entity.cVendorProd = row.IsNull("cVendorProd") ? string.Empty : row.Field<string>("cVendorProd");
         entity.tbVendorProd = row.Field<bool>("tbVendorProd");
         entity.tbUsMthsFrzEntered = row.Field<bool>("tbUsMthsFrzEntered");
         entity.tbUsMthsFrz = row.Field<bool>("tbUsMthsFrz");
         entity.cFamilyGroup = row.IsNull("cFamilyGroup") ? string.Empty : row.Field<string>("cFamilyGroup");
         entity.tbFamilyGroup = row.Field<bool>("tbFamilyGroup");
         entity.cUsagectrl = row.IsNull("cUsagectrl") ? string.Empty : row.Field<string>("cUsagectrl");
         entity.tbUsageCtrl = row.Field<bool>("tbUsageCtrl");
         entity.cSurplusTy = row.IsNull("cSurplusTy") ? string.Empty : row.Field<string>("cSurplusTy");
         entity.tbSurplusTy = row.Field<bool>("tbSurplusTy");
         entity.cClass = row.IsNull("cClass") ? string.Empty : row.Field<string>("cClass");
         entity.tbClass = row.Field<bool>("tbClass");
         entity.iLeadTime = row.IsNull("iLeadTime") ? 0 : row.Field<int>("iLeadTime");
         entity.tbLeadTime = row.Field<bool>("tbLeadTime");
         entity.cSafeAllType = row.IsNull("cSafeAllType") ? string.Empty : row.Field<string>("cSafeAllType");
         entity.dSafeAllAmt = row.IsNull("dSafeAllAmt") ? decimal.Zero : row.Field<decimal>("dSafeAllAmt");
         entity.tbSafeAllAmt = row.Field<bool>("tbSafeAllAmt");
         entity.cRebateTy = row.IsNull("cRebateTy") ? string.Empty : row.Field<string>("cRebateTy");
         entity.tbRebateTy = row.Field<bool>("tbRebateTy");
         entity.cRebSubTy = row.IsNull("cRebSubTy") ? string.Empty : row.Field<string>("cRebSubTy");
         entity.tbRebSubTy = row.Field<bool>("tbRebSubTy");
         entity.iFrozenLeadTimeType = row.IsNull("iFrozenLeadTimeType") ? 0 : row.Field<int>("iFrozenLeadTimeType");
         entity.tbFrozenLeadTimeType = row.Field<bool>("tbFrozenLeadTimeType");
         entity.tbFrozenClass = row.Field<bool>("tbFrozenClass");
         entity.tbFrozenClassEntered = row.Field<bool>("tbFrozenClassEntered");
         entity.cBuyingUnit = row.IsNull("cBuyingUnit") ? string.Empty : row.Field<string>("cBuyingUnit");
         entity.tbBuyingUnit = row.Field<bool>("tbBuyingUnit");
         entity.cStndUnit = row.IsNull("cStndUnit") ? string.Empty : row.Field<string>("cStndUnit");
         entity.tbStndUnit = row.Field<bool>("tbStndUnit");
         entity.iSeasBegMM = row.IsNull("iSeasBegMM") ? 0 : row.Field<int>("iSeasBegMM");
         entity.tbSeasBegMM = row.Field<bool>("tbSeasBegMM");
         entity.iSeasEndMM = row.IsNull("iSeasEndMM") ? 0 : row.Field<int>("iSeasEndMM");
         entity.tbSeasEndMM = row.Field<bool>("tbSeasEndMM");
         entity.cTransferUnit = row.IsNull("cTransferUnit") ? string.Empty : row.Field<string>("cTransferUnit");
         entity.tbTransferUnit = row.Field<bool>("tbTransferUnit");
         entity.iOrdQtyOut = row.IsNull("iOrdQtyOut") ? 0 : row.Field<int>("iOrdQtyOut");
         entity.tbOrdQtyOut = row.Field<bool>("tbOrdQtyOut");
         entity.cOverreasout = row.IsNull("cOverreasout") ? string.Empty : row.Field<string>("cOverreasout");
         entity.tbOverReasOut = row.Field<bool>("tbOverReasOut");
         entity.iOrderPoint = row.IsNull("iOrderPoint") ? 0 : row.Field<int>("iOrderPoint");
         entity.tbOrderPoint = row.Field<bool>("tbOrderPoint");
         entity.iOrdQtyIn = row.IsNull("iOrdQtyIn") ? 0 : row.Field<int>("iOrdQtyIn");
         entity.tbOrdQtyIn = row.Field<bool>("tbOrdQtyIn");
         entity.iLinePoint = row.IsNull("iLinePoint") ? 0 : row.Field<int>("iLinePoint");
         entity.tbLinePoint = row.Field<bool>("tbLinePoint");
         entity.tbRollOANUsagefl = row.Field<bool>("tbRollOANUsagefl");
         entity.tbRollOANUsageUpdatefl = row.Field<bool>("tbRollOANUsageUpdatefl");
         entity.cRollOANUsageLbl = row.IsNull("cRollOANUsageLbl") ? string.Empty : row.Field<string>("cRollOANUsageLbl");
         entity.dSeasTrendMin = row.IsNull("dSeasTrendMin") ? decimal.Zero : row.Field<decimal>("dSeasTrendMin");
         entity.tbSeasTrendMin = row.Field<bool>("tbSeasTrendMin");
         entity.cOrdcalcty = row.IsNull("cOrdcalcty") ? string.Empty : row.Field<string>("cOrdcalcty");
         entity.tbOrdCalcTy = row.Field<bool>("tbOrdCalcTy");
         entity.cOverreasin = row.IsNull("cOverreasin") ? string.Empty : row.Field<string>("cOverreasin");
         entity.tbOverReasIn = row.Field<bool>("tbOverReasIn");
         entity.dSeasTrendMax = row.IsNull("dSeasTrendMax") ? decimal.Zero : row.Field<decimal>("dSeasTrendMax");
         entity.tbSeasTrendMax = row.Field<bool>("tbSeasTrendMax");
         entity.dtSeasTrendExpDt = row.Field<DateTime?>("dtSeasTrendExpDt");
         entity.tbSeasTrendExpDt = row.Field<bool>("tbSeasTrendExpDt");
         entity.cThreshRefer = row.IsNull("cThreshRefer") ? string.Empty : row.Field<string>("cThreshRefer");
         entity.tbThreshRefer = row.Field<bool>("tbThreshRefer");
         entity.iSeasTrendLyu = row.IsNull("iSeasTrendLyu") ? 0 : row.Field<int>("iSeasTrendLyu");
         entity.tbSeasTrendLYU = row.Field<bool>("tbSeasTrendLYU");
         entity.dtMinThreshExpDt = row.Field<DateTime?>("dtMinThreshExpDt");
         entity.tbMinThreshExpDt = row.Field<bool>("tbMinThreshExpDt");
         entity.dMinThreshold = row.IsNull("dMinThreshold") ? decimal.Zero : row.Field<decimal>("dMinThreshold");
         entity.tbMinThreshold = row.Field<bool>("tbMinThreshold");
         entity.iSeasTrendTYU = row.IsNull("iSeasTrendTYU") ? 0 : row.Field<int>("iSeasTrendTYU");
         entity.tbSeasTrendTYU = row.Field<bool>("tbSeasTrendTYU");
         entity.dASQDiff = row.IsNull("dASQDiff") ? decimal.Zero : row.Field<decimal>("dASQDiff");
         entity.tbASQDiff = row.Field<bool>("tbASQDiff");
         entity.tbAsqFlEntered = row.Field<bool>("tbAsqFlEntered");
         entity.tbAsqFl = row.Field<bool>("tbAsqFl");
         entity.tbAsqDiffFlEntered = row.Field<bool>("tbAsqDiffFlEntered");
         entity.tbAsqDiffFl = row.Field<bool>("tbAsqDiffFl");
         entity.dHi5Diff = row.IsNull("dHi5Diff") ? decimal.Zero : row.Field<decimal>("dHi5Diff");
         entity.tbHi5Diff = row.Field<bool>("tbHi5Diff");
         entity.tbHi5FlEntered = row.Field<bool>("tbHi5FlEntered");
         entity.tbHi5Fl = row.Field<bool>("tbHi5Fl");
         entity.tbHi5DiffFlEntered = row.Field<bool>("tbHi5DiffFlEntered");
         entity.tbHi5DiffFl = row.Field<bool>("tbHi5DiffFl");
         entity.cReserveTy = row.IsNull("cReserveTy") ? string.Empty : row.Field<string>("cReserveTy");
         entity.tbReserveTy = row.Field<bool>("tbReserveTy");
         entity.iReserveDays = row.IsNull("iReserveDays") ? 0 : row.Field<int>("iReserveDays");
         entity.tbReserveDays = row.Field<bool>("tbReserveDays");
         entity.cNCNR = row.IsNull("cNCNR") ? string.Empty : row.Field<string>("cNCNR");
         entity.tbNCNR = row.Field<bool>("tbNCNR");
         entity.statusmess = row.IsNull("statusmess") ? string.Empty : row.Field<string>("statusmess");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tbCountryofOrigin = row.Field<bool>("tbCountryofOrigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.tbTariffCd = row.Field<bool>("tbTariffCd");
         entity.cProdPreference = row.IsNull("cProdPreference") ? string.Empty : row.Field<string>("cProdPreference");
         entity.tbProdPreference = row.Field<bool>("tbProdPreference");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamumassupdate(ref DataRow row, Icamumassupdate entity)
      {
         row.SetField("cStatustype", entity.cStatustype);
         row.SetField("tbStatusType", entity.tbStatusType);
         row.SetField("cFrozenDate", entity.cFrozenDate);
         row.SetField("tbFrozenDate", entity.tbFrozenDate);
         row.SetField("cPriceType", entity.cPriceType);
         row.SetField("tbPriceType", entity.tbPriceType);
         row.SetField("cFrozentype", entity.cFrozentype);
         row.SetField("tbFrozenType", entity.tbFrozenType);
         row.SetField("iFrozenMonths", entity.iFrozenMonths);
         row.SetField("tbFrozenMonths", entity.tbFrozenMonths);
         row.SetField("dtAcquiredt", entity.dtAcquiredt);
         row.SetField("tbAcquireDt", entity.tbAcquireDt);
         row.SetField("cArptype", entity.cArptype);
         row.SetField("tbArpType", entity.tbArpType);
         row.SetField("cArpPushFl", entity.cArpPushFl);
         row.SetField("tbArpPushFl", entity.tbArpPushFl);
         row.SetField("dArpVendorNo", entity.dArpVendorNo);
         row.SetField("txtArpVendorNo", entity.txtArpVendorNo);
         row.SetField("cArpVendorNotesfl", entity.cArpVendorNotesfl);
         row.SetField("tbArpVendorNo", entity.tbArpVendorNo);
         row.SetField("dUsageRate", entity.dUsageRate);
         row.SetField("tbUsageRate", entity.tbUsageRate);
         row.SetField("cArpWhse", entity.cArpWhse);
         row.SetField("tbArpWhse", entity.tbArpWhse);
         row.SetField("cWhseRank", entity.cWhseRank);
         row.SetField("tbWhseRank", entity.tbWhseRank);
         row.SetField("iUsageMonths", entity.iUsageMonths);
         row.SetField("tbUsageMonths", entity.tbUsageMonths);
         row.SetField("cArpProdLine", entity.cArpProdLine);
         row.SetField("tbArpProdLine", entity.tbArpProdLine);
         row.SetField("tbRankFreezeEntered", entity.tbRankFreezeEntered);
         row.SetField("tbRankFreeze", entity.tbRankFreeze);
         row.SetField("cVendorProd", entity.cVendorProd);
         row.SetField("tbVendorProd", entity.tbVendorProd);
         row.SetField("tbUsMthsFrzEntered", entity.tbUsMthsFrzEntered);
         row.SetField("tbUsMthsFrz", entity.tbUsMthsFrz);
         row.SetField("cFamilyGroup", entity.cFamilyGroup);
         row.SetField("tbFamilyGroup", entity.tbFamilyGroup);
         row.SetField("cUsagectrl", entity.cUsagectrl);
         row.SetField("tbUsageCtrl", entity.tbUsageCtrl);
         row.SetField("cSurplusTy", entity.cSurplusTy);
         row.SetField("tbSurplusTy", entity.tbSurplusTy);
         row.SetField("cClass", entity.cClass);
         row.SetField("tbClass", entity.tbClass);
         row.SetField("iLeadTime", entity.iLeadTime);
         row.SetField("tbLeadTime", entity.tbLeadTime);
         row.SetField("cSafeAllType", entity.cSafeAllType);
         row.SetField("dSafeAllAmt", entity.dSafeAllAmt);
         row.SetField("tbSafeAllAmt", entity.tbSafeAllAmt);
         row.SetField("cRebateTy", entity.cRebateTy);
         row.SetField("tbRebateTy", entity.tbRebateTy);
         row.SetField("cRebSubTy", entity.cRebSubTy);
         row.SetField("tbRebSubTy", entity.tbRebSubTy);
         row.SetField("iFrozenLeadTimeType", entity.iFrozenLeadTimeType);
         row.SetField("tbFrozenLeadTimeType", entity.tbFrozenLeadTimeType);
         row.SetField("tbFrozenClass", entity.tbFrozenClass);
         row.SetField("tbFrozenClassEntered", entity.tbFrozenClassEntered);
         row.SetField("cBuyingUnit", entity.cBuyingUnit);
         row.SetField("tbBuyingUnit", entity.tbBuyingUnit);
         row.SetField("cStndUnit", entity.cStndUnit);
         row.SetField("tbStndUnit", entity.tbStndUnit);
         row.SetField("iSeasBegMM", entity.iSeasBegMM);
         row.SetField("tbSeasBegMM", entity.tbSeasBegMM);
         row.SetField("iSeasEndMM", entity.iSeasEndMM);
         row.SetField("tbSeasEndMM", entity.tbSeasEndMM);
         row.SetField("cTransferUnit", entity.cTransferUnit);
         row.SetField("tbTransferUnit", entity.tbTransferUnit);
         row.SetField("iOrdQtyOut", entity.iOrdQtyOut);
         row.SetField("tbOrdQtyOut", entity.tbOrdQtyOut);
         row.SetField("cOverreasout", entity.cOverreasout);
         row.SetField("tbOverReasOut", entity.tbOverReasOut);
         row.SetField("iOrderPoint", entity.iOrderPoint);
         row.SetField("tbOrderPoint", entity.tbOrderPoint);
         row.SetField("iOrdQtyIn", entity.iOrdQtyIn);
         row.SetField("tbOrdQtyIn", entity.tbOrdQtyIn);
         row.SetField("iLinePoint", entity.iLinePoint);
         row.SetField("tbLinePoint", entity.tbLinePoint);
         row.SetField("tbRollOANUsagefl", entity.tbRollOANUsagefl);
         row.SetField("tbRollOANUsageUpdatefl", entity.tbRollOANUsageUpdatefl);
         row.SetField("cRollOANUsageLbl", entity.cRollOANUsageLbl);
         row.SetField("dSeasTrendMin", entity.dSeasTrendMin);
         row.SetField("tbSeasTrendMin", entity.tbSeasTrendMin);
         row.SetField("cOrdcalcty", entity.cOrdcalcty);
         row.SetField("tbOrdCalcTy", entity.tbOrdCalcTy);
         row.SetField("cOverreasin", entity.cOverreasin);
         row.SetField("tbOverReasIn", entity.tbOverReasIn);
         row.SetField("dSeasTrendMax", entity.dSeasTrendMax);
         row.SetField("tbSeasTrendMax", entity.tbSeasTrendMax);
         row.SetField("dtSeasTrendExpDt", entity.dtSeasTrendExpDt);
         row.SetField("tbSeasTrendExpDt", entity.tbSeasTrendExpDt);
         row.SetField("cThreshRefer", entity.cThreshRefer);
         row.SetField("tbThreshRefer", entity.tbThreshRefer);
         row.SetField("iSeasTrendLyu", entity.iSeasTrendLyu);
         row.SetField("tbSeasTrendLYU", entity.tbSeasTrendLYU);
         row.SetField("dtMinThreshExpDt", entity.dtMinThreshExpDt);
         row.SetField("tbMinThreshExpDt", entity.tbMinThreshExpDt);
         row.SetField("dMinThreshold", entity.dMinThreshold);
         row.SetField("tbMinThreshold", entity.tbMinThreshold);
         row.SetField("iSeasTrendTYU", entity.iSeasTrendTYU);
         row.SetField("tbSeasTrendTYU", entity.tbSeasTrendTYU);
         row.SetField("dASQDiff", entity.dASQDiff);
         row.SetField("tbASQDiff", entity.tbASQDiff);
         row.SetField("tbAsqFlEntered", entity.tbAsqFlEntered);
         row.SetField("tbAsqFl", entity.tbAsqFl);
         row.SetField("tbAsqDiffFlEntered", entity.tbAsqDiffFlEntered);
         row.SetField("tbAsqDiffFl", entity.tbAsqDiffFl);
         row.SetField("dHi5Diff", entity.dHi5Diff);
         row.SetField("tbHi5Diff", entity.tbHi5Diff);
         row.SetField("tbHi5FlEntered", entity.tbHi5FlEntered);
         row.SetField("tbHi5Fl", entity.tbHi5Fl);
         row.SetField("tbHi5DiffFlEntered", entity.tbHi5DiffFlEntered);
         row.SetField("tbHi5DiffFl", entity.tbHi5DiffFl);
         row.SetField("cReserveTy", entity.cReserveTy);
         row.SetField("tbReserveTy", entity.tbReserveTy);
         row.SetField("iReserveDays", entity.iReserveDays);
         row.SetField("tbReserveDays", entity.tbReserveDays);
         row.SetField("cNCNR", entity.cNCNR);
         row.SetField("tbNCNR", entity.tbNCNR);
         row.SetField("statusmess", entity.statusmess);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tbCountryofOrigin", entity.tbCountryofOrigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("tbTariffCd", entity.tbTariffCd);
         row.SetField("cProdPreference", entity.cProdPreference);
         row.SetField("tbProdPreference", entity.tbProdPreference);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591