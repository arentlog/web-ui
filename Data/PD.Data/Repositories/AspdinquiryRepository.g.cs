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
    
namespace Infor.Sxe.PD.Data.Repositories
{
   using Infor.Sxe.PD.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspdgetpdscrecords;
   using Models.Pdspdgetpdsrrecords;
   using Models.Pdspdenhlookupcriteria;
   using Models.Pdspdenhlookupresults;
   using Models.Pdspdinsearchcriteria;
   using Models.Pdspdinsearchresults;
   using Models.Pdspdinheadercriteria;
   using Models.Pdspdinheaderresults;
   using Models.Pdspdinlinesresults;
   using Models.Pdspdinaction;
   using Models.Complex;

   public partial class AspdinquiryRepository : RepositoryBase
   {
      private AspdinquiryAdapter adapter;
  
      public AspdinquiryRepository(IProgressConnection connection)
      {
         this.adapter = new AspdinquiryAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public AspdinquiryPDGetPDSCRecordsResponseAPI PDGetPDSCRecords(Pdgetpdscrecordscriteria pdgetpdscrecordscriteria)
      {
         return this.adapter.PDGetPDSCRecords(pdgetpdscrecordscriteria);
      }
  
      public AspdinquiryPDGetPDSRRecordsResponseAPI PDGetPDSRRecords(Pdgetpdsrrecordscriteria pdgetpdsrrecordscriteria)
      {
         return this.adapter.PDGetPDSRRecords(pdgetpdsrrecordscriteria);
      }
  
      public AspdinquiryPDENHLookupResponseAPI PDENHLookup(Pdenhlookupcriteria pdenhlookupcriteria)
      {
         return this.adapter.PDENHLookup(pdenhlookupcriteria);
      }
  
      public AspdinquiryPDINSearchResponseAPI PDINSearch(Pdinsearchcriteria pdinsearchcriteria)
      {
         return this.adapter.PDINSearch(pdinsearchcriteria);
      }
  
      public Pdinheaderresults PDINHeader(Pdinheadercriteria pdinheadercriteria)
      {
         return this.adapter.PDINHeader(pdinheadercriteria);
      }
  
      public IEnumerable<Pdinlinesresults> PDINLines(Pdinheadercriteria pdinheadercriteria)
      {
         return this.adapter.PDINLines(pdinheadercriteria);
      }
  
      public void PDINAction(IEnumerable<Pdinaction> pdinaction)
      {
         this.adapter.PDINAction(pdinaction);
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
  