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
   using Models.Pdspoetprintlaunchcriteria;
   using Models.Pdsprintersettings;
   using Models.Pdspoetprint;
   using Models.Pdspoetprintloadcriteria;
   using Models.Pdspoetprintglobals;
   using Models.Pdspoheaderretrieve;
   using Models.Pdspohdr;
   using Models.Pdswlstatus;
   using Models.Pdsmessaging;
   using Models.Pdspoloadtranstypes;
   using Models.Pdspoheaderfinish;
   using Models.Pdspoordercancel;
   using Models.Pdspoordercopy;
   using Models.Pdspovendorcredit;
   using Models.Pdspoimportfile;
   using Models.Pdspoimportdata;
   using Models.Complex;

   public partial class AspoheaderRepository : RepositoryBase
   {
      private AspoheaderAdapter adapter;
  
      public AspoheaderRepository(IProgressConnection connection)
      {
         this.adapter = new AspoheaderAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public void POETPrintLaunch(AspoheaderPOETPrintLaunchRequestAPI AspoheaderPOETPrintLaunchRequestAPI)
      {
         this.adapter.POETPrintLaunch(AspoheaderPOETPrintLaunchRequestAPI);
      }
  
      public AspoheaderPOETPrintLoadResponseAPI POETPrintLoad(AspoheaderPOETPrintLoadRequestAPI AspoheaderPOETPrintLoadRequestAPI)
      {
         return this.adapter.POETPrintLoad(AspoheaderPOETPrintLoadRequestAPI);
      }
  
      public AspoheaderPOETPrintLoadChangeOrderResponseAPI POETPrintLoadChangeOrder(AspoheaderPOETPrintLoadChangeOrderRequestAPI AspoheaderPOETPrintLoadChangeOrderRequestAPI)
      {
         return this.adapter.POETPrintLoadChangeOrder(AspoheaderPOETPrintLoadChangeOrderRequestAPI);
      }
  
      public Poetprintscreensingle POETPrintValidate(AspoheaderPOETPrintValidateRequestAPI AspoheaderPOETPrintValidateRequestAPI)
      {
         return this.adapter.POETPrintValidate(AspoheaderPOETPrintValidateRequestAPI);
      }
  
      public AspoheaderPOHeaderRetrieveResponseAPI POHeaderRetrieve(Poheaderretrievecriteria poheaderretrievecriteria)
      {
         return this.adapter.POHeaderRetrieve(poheaderretrievecriteria);
      }
  
      public AspoheaderPOLoadBannerWhseResponseAPI POLoadBannerWhse()
      {
         return this.adapter.POLoadBannerWhse();
      }
  
      public IEnumerable<Poloadtranstypes> POLoadTransTypes(bool lCheckSecurity, string cSpecial)
      {
         return this.adapter.POLoadTransTypes(lCheckSecurity, cSpecial);
      }
  
      public AspoheaderPOHeaderCreateResponseAPI POHeaderCreate(Pohdr pohdr)
      {
         return this.adapter.POHeaderCreate(pohdr);
      }
  
      public AspoheaderPOHeaderFieldLeaveResponseAPI POHeaderFieldLeave(AspoheaderPOHeaderFieldLeaveRequestAPI AspoheaderPOHeaderFieldLeaveRequestAPI)
      {
         return this.adapter.POHeaderFieldLeave(AspoheaderPOHeaderFieldLeaveRequestAPI);
      }
  
      public string POHeaderFinish(Poheaderfinishcriteria poheaderfinishcriteria)
      {
         return this.adapter.POHeaderFinish(poheaderfinishcriteria);
      }
  
      public IEnumerable<Messaging> POHeaderUpdate(AspoheaderPOHeaderUpdateRequestAPI AspoheaderPOHeaderUpdateRequestAPI)
      {
         return this.adapter.POHeaderUpdate(AspoheaderPOHeaderUpdateRequestAPI);
      }
  
      public string POOrderCancel(Poordercancel poordercancel)
      {
         return this.adapter.POOrderCancel(poordercancel);
      }
  
      public Poordercopy POOrderCopyInitiate(int iSecure)
      {
         return this.adapter.POOrderCopyInitiate(iSecure);
      }
  
      public AspoheaderPOOrderCopyFieldLeaveResponseAPI POOrderCopyFieldLeave(AspoheaderPOOrderCopyFieldLeaveRequestAPI AspoheaderPOOrderCopyFieldLeaveRequestAPI)
      {
         return this.adapter.POOrderCopyFieldLeave(AspoheaderPOOrderCopyFieldLeaveRequestAPI);
      }
  
      public AspoheaderPOOrderCopyUpdateResponseAPI POOrderCopyUpdate(Poordercopy poordercopy)
      {
         return this.adapter.POOrderCopyUpdate(poordercopy);
      }
  
      public IEnumerable<Povendorcredit> POVendorCreditRetrieve(decimal pvVendno)
      {
         return this.adapter.POVendorCreditRetrieve(pvVendno);
      }
  
      public IEnumerable<Povendorcredit> POVendorCreditFieldLeave(AspoheaderPOVendorCreditFieldLeaveRequestAPI AspoheaderPOVendorCreditFieldLeaveRequestAPI)
      {
         return this.adapter.POVendorCreditFieldLeave(AspoheaderPOVendorCreditFieldLeaveRequestAPI);
      }
  
      public IEnumerable<Povendorcredit> POVendorCreditUpdate(IEnumerable<Povendorcredit> povendorcredit)
      {
         return this.adapter.POVendorCreditUpdate(povendorcredit);
      }
  
      public void PORemoveSoftLock(int iPONo, int iPOSuf)
      {
         this.adapter.PORemoveSoftLock(iPONo, iPOSuf);
      }
  
      public AspoheaderPOImportLoadResponseAPI POImportLoad(AspoheaderPOImportLoadRequestAPI AspoheaderPOImportLoadRequestAPI)
      {
         return this.adapter.POImportLoad(AspoheaderPOImportLoadRequestAPI);
      }
  
      public IEnumerable<Messaging> POImportUpdate(AspoheaderPOImportUpdateRequestAPI AspoheaderPOImportUpdateRequestAPI)
      {
         return this.adapter.POImportUpdate(AspoheaderPOImportUpdateRequestAPI);
      }
  
      public AspoheaderPOImportValidateResponseAPI POImportValidate(IEnumerable<Poimportdata> poimportdata)
      {
         return this.adapter.POImportValidate(poimportdata);
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
  