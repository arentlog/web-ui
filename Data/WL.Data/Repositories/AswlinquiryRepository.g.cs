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
    
namespace Infor.Sxe.WL.Data.Repositories
{
   using Infor.Sxe.WL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsloadwlcartons;
   using Models.Pdsloadwlinq;
   using Models.Pdswlaowhsesettings;
   using Models.Pdswlaowhsecriteria;
   using Models.Pdswlstatus;
   using Models.Pdsmessaging;
   using Models.Pdswlcsship;
   using Models.Pdswlaicriteria;
   using Models.Pdswlitcriteria;
   using Models.Pdswlitresults;
   using Models.Pdswlitorderlinecriteria;
   using Models.Pdswlitorderlineresults;
   using Models.Pdswlitmstrresults;
   using Models.Complex;

   public partial class AswlinquiryRepository : RepositoryBase
   {
      private AswlinquiryAdapter adapter;
  
      public AswlinquiryRepository(IProgressConnection connection)
      {
         this.adapter = new AswlinquiryAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public IEnumerable<Loadwlcartonsresults> LoadWLCartons(Loadwlcartonscriteria loadwlcartonscriteria)
      {
         return this.adapter.LoadWLCartons(loadwlcartonscriteria);
      }
  
      public AswlinquiryLoadWLInquiryResponseAPI LoadWLInquiry(Loadwlinqcriteria loadwlinqcriteria)
      {
         return this.adapter.LoadWLInquiry(loadwlinqcriteria);
      }
  
      public IEnumerable<Wlaowhsesettings> GetWLAOWhseSettings(string cWhse, int iToCono)
      {
         return this.adapter.GetWLAOWhseSettings(cWhse, iToCono);
      }
  
      public AswlinquiryGetWLAOManyWhseSettingsResponseAPI GetWLAOManyWhseSettings(IEnumerable<Wlaowhsecriteria> wlaowhsecriteria)
      {
         return this.adapter.GetWLAOManyWhseSettings(wlaowhsecriteria);
      }
  
      public Wlstatus WLStatusGetNew(string cProcedure, int iOrderNo, int iOrderSuf, string cUpdateType)
      {
         return this.adapter.WLStatusGetNew(cProcedure, iOrderNo, iOrderSuf, cUpdateType);
      }
  
      public Wlstatus WLStatusInitiate(Wlstatus wlstatus)
      {
         return this.adapter.WLStatusInitiate(wlstatus);
      }
  
      public Wlstatus WLStatusLeaveUnPickOEFl(Wlstatus wlstatus)
      {
         return this.adapter.WLStatusLeaveUnPickOEFl(wlstatus);
      }
  
      public Wlstatus WLStatusLeaveWhseChgFl(Wlstatus wlstatus)
      {
         return this.adapter.WLStatusLeaveWhseChgFl(wlstatus);
      }
  
      public AswlinquiryWLStatusCompleteResponseAPI WLStatusComplete(AswlinquiryWLStatusCompleteRequestAPI AswlinquiryWLStatusCompleteRequestAPI)
      {
         return this.adapter.WLStatusComplete(AswlinquiryWLStatusCompleteRequestAPI);
      }
  
      public Wlcsship WLCsShipRetrieve(int iOrderno, int iOrdersuf)
      {
         return this.adapter.WLCsShipRetrieve(iOrderno, iOrdersuf);
      }
  
      public IEnumerable<Messaging> WLCsShipUpdate(Wlcsship wlcsship)
      {
         return this.adapter.WLCsShipUpdate(wlcsship);
      }
  
      public AswlinquiryWLAIFieldChangeWhseResponseAPI WLAIFieldChangeWhse(Wlaicriteria wlaicriteria)
      {
         return this.adapter.WLAIFieldChangeWhse(wlaicriteria);
      }
  
      public IEnumerable<Messaging> WLAIUpdate(Wlaicriteria wlaicriteria)
      {
         return this.adapter.WLAIUpdate(wlaicriteria);
      }
  
      public void WLICSDClearWMFlags(string cWhse)
      {
         this.adapter.WLICSDClearWMFlags(cWhse);
      }
  
      public AswlinquiryWLITGetListResponseAPI WLITGetList(Wlitcriteria wlitcriteria)
      {
         return this.adapter.WLITGetList(wlitcriteria);
      }
  
      public Wlitresults WLITUpdateStatus(AswlinquiryWLITUpdateStatusRequestAPI AswlinquiryWLITUpdateStatusRequestAPI)
      {
         return this.adapter.WLITUpdateStatus(AswlinquiryWLITUpdateStatusRequestAPI);
      }
  
      public AswlinquiryWLITOrderLineGetListResponseAPI WLITOrderLineGetList(Wlitorderlinecriteria wlitorderlinecriteria)
      {
         return this.adapter.WLITOrderLineGetList(wlitorderlinecriteria);
      }
  
      public IEnumerable<Wlitresults> WLITResetWIPTrans(IEnumerable<Wlitresults> wlitresults)
      {
         return this.adapter.WLITResetWIPTrans(wlitresults);
      }
  
      public AswlinquiryWLITMstrGetListResponseAPI WLITMstrGetList(Wlitcriteria wlitcriteria)
      {
         return this.adapter.WLITMstrGetList(wlitcriteria);
      }
  
      public Wlitmstrresults WLITMstrUpdateStatus(AswlinquiryWLITMstrUpdateStatusRequestAPI AswlinquiryWLITMstrUpdateStatusRequestAPI)
      {
         return this.adapter.WLITMstrUpdateStatus(AswlinquiryWLITMstrUpdateStatusRequestAPI);
      }
  
      public AswlinquiryWLITReturnsPOGetListResponseAPI WLITReturnsPOGetList(Wlitcriteria wlitcriteria)
      {
         return this.adapter.WLITReturnsPOGetList(wlitcriteria);
      }
  
      public Wlitresults WLITReturnsPOUpdateStatus(AswlinquiryWLITReturnsPOUpdateStatusRequestAPI AswlinquiryWLITReturnsPOUpdateStatusRequestAPI)
      {
         return this.adapter.WLITReturnsPOUpdateStatus(AswlinquiryWLITReturnsPOUpdateStatusRequestAPI);
      }
  
      public IEnumerable<Wlitmstrresults> WLITMstrResetWIPTrans(IEnumerable<Wlitmstrresults> wlitmstrresults)
      {
         return this.adapter.WLITMstrResetWIPTrans(wlitmstrresults);
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
  