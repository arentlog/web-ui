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
    
namespace Infor.Sxe.SM.Data.Repositories
{
   using Infor.Sxe.SM.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdssmsalesrepcopy;
   using Models.Pdssmcommissioncopy;

   public partial class AssmsetupRepository : RepositoryBase
   {
      private AssmsetupAdapter adapter;
  
      public AssmsetupRepository(IProgressConnection connection)
      {
         this.adapter = new AssmsetupAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public IEnumerable<Smsalesrepcopy> SMSalesRepCopy(IEnumerable<Smsalesrepcopy> smsalesrepcopy)
      {
         return this.adapter.SMSalesRepCopy(smsalesrepcopy);
      }
  
      public IEnumerable<Smcommissioncopy> SMCommissionCopy(IEnumerable<Smcommissioncopy> smcommissioncopy)
      {
         return this.adapter.SMCommissionCopy(smcommissioncopy);
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
  