//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 21496 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.Collections.Generic;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;
    
namespace Infor.Sxe.PO.Data.Repositories
{
   using Infor.Sxe.PO.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspolinelist;
   using Models.Pdsloadpolinesettings;
   using Models.Pdspolineinitialize;
   using Models.Pdspoline;
   using Models.Pdspolineretrieve;
   using Models.Pdspolineties;
   using Models.Pdsmessaging;
   using Models.Pdspolinecancelchange;
   using Models.Pdspolinenonstockhdr;
   using Models.Pdspolinenonstock;
   using Models.Pdspolinedelete;
   using Models.Pdspocoreallocation;
   using Models.Pdspocoreallocationupdate;
   using Models.Complex;

   public partial class AspolineRepository : RepositoryBase
   {
      private AspolineAdapter adapter;
  
      public AspolineRepository(IProgressConnection connection)
      {
         this.adapter = new AspolineAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public IEnumerable<Polinelistresults> LoadPOLineList(AspolineLoadPOLineListRequestAPI AspolineLoadPOLineListRequestAPI)
      {
         return this.adapter.LoadPOLineList(AspolineLoadPOLineListRequestAPI);
      }
  
      public Loadpolinesettings LoadPOLineSettings()
      {
         return this.adapter.LoadPOLineSettings();
      }
  
      public Poline POLineInitialize(Polineinitializecriteria polineinitializecriteria)
      {
         return this.adapter.POLineInitialize(polineinitializecriteria);
      }
  
      public AspolinePOLineRetrieveResponseAPI POLineRetrieve(Polineretrievecriteria polineretrievecriteria)
      {
         return this.adapter.POLineRetrieve(polineretrievecriteria);
      }
  
      public AspolinePOLineValidateResponseAPI POLineValidate(AspolinePOLineValidateRequestAPI AspolinePOLineValidateRequestAPI)
      {
         return this.adapter.POLineValidate(AspolinePOLineValidateRequestAPI);
      }
  
      public AspolinePOLineUpdateResponseAPI POLineUpdate(AspolinePOLineUpdateRequestAPI AspolinePOLineUpdateRequestAPI)
      {
         return this.adapter.POLineUpdate(AspolinePOLineUpdateRequestAPI);
      }
  
      public AspolinePOLineCreateResponseAPI POLineCreate(AspolinePOLineCreateRequestAPI AspolinePOLineCreateRequestAPI)
      {
         return this.adapter.POLineCreate(AspolinePOLineCreateRequestAPI);
      }
  
      public void POLineCancelChange(Polinecancelchangecriteria polinecancelchangecriteria)
      {
         this.adapter.POLineCancelChange(polinecancelchangecriteria);
      }
  
      public AspolinePOLineNonStockRetrieveResponseAPI POLineNonStockRetrieve(AspolinePOLineNonStockRetrieveRequestAPI AspolinePOLineNonStockRetrieveRequestAPI)
      {
         return this.adapter.POLineNonStockRetrieve(AspolinePOLineNonStockRetrieveRequestAPI);
      }
  
      public IEnumerable<Messaging> POLineNonStockValidate(AspolinePOLineNonStockValidateRequestAPI AspolinePOLineNonStockValidateRequestAPI)
      {
         return this.adapter.POLineNonStockValidate(AspolinePOLineNonStockValidateRequestAPI);
      }
  
      public AspolinePOLineNonStockFinalResponseAPI POLineNonStockFinal(AspolinePOLineNonStockFinalRequestAPI AspolinePOLineNonStockFinalRequestAPI)
      {
         return this.adapter.POLineNonStockFinal(AspolinePOLineNonStockFinalRequestAPI);
      }
  
      public AspolinePOLineNonStockLeaveFieldResponseAPI POLineNonStockLeaveField(AspolinePOLineNonStockLeaveFieldRequestAPI AspolinePOLineNonStockLeaveFieldRequestAPI)
      {
         return this.adapter.POLineNonStockLeaveField(AspolinePOLineNonStockLeaveFieldRequestAPI);
      }
  
      public AspolinePOLineTieValidateResponseAPI POLineTieValidate(AspolinePOLineTieValidateRequestAPI AspolinePOLineTieValidateRequestAPI)
      {
         return this.adapter.POLineTieValidate(AspolinePOLineTieValidateRequestAPI);
      }
  
      public IEnumerable<Messaging> POLineDelete(int pvPono, int pvPosuf, int pvLineno)
      {
         return this.adapter.POLineDelete(pvPono, pvPosuf, pvLineno);
      }
  
      public IEnumerable<Messaging> POLineDeleteList(IEnumerable<Polinedeletecriteria> polinedeletecriteria)
      {
         return this.adapter.POLineDeleteList(polinedeletecriteria);
      }
  
      public Poline POLinePricingWorksheetCalculate(AspolinePOLinePricingWorksheetCalculateRequestAPI AspolinePOLinePricingWorksheetCalculateRequestAPI)
      {
         return this.adapter.POLinePricingWorksheetCalculate(AspolinePOLinePricingWorksheetCalculateRequestAPI);
      }
  
      public AspolinePOCoreAllocationLeaveFieldResponseAPI POCoreAllocationLeaveField(AspolinePOCoreAllocationLeaveFieldRequestAPI AspolinePOCoreAllocationLeaveFieldRequestAPI)
      {
         return this.adapter.POCoreAllocationLeaveField(AspolinePOCoreAllocationLeaveFieldRequestAPI);
      }
  
      public AspolinePOCoreAllocationLoadResponseAPI POCoreAllocationLoad(Pocoreallocationcriteria pocoreallocationcriteria)
      {
         return this.adapter.POCoreAllocationLoad(pocoreallocationcriteria);
      }
  
      public AspolinePOCoreAllocationUpdateResponseAPI POCoreAllocationUpdate(AspolinePOCoreAllocationUpdateRequestAPI AspolinePOCoreAllocationUpdateRequestAPI)
      {
         return this.adapter.POCoreAllocationUpdate(AspolinePOCoreAllocationUpdateRequestAPI);
      }
  
      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }
         this.adapter?.Dispose();	
         this.adapter = null;
         base.Dispose(true);
      }
   }
}
#pragma warning restore 1591
  