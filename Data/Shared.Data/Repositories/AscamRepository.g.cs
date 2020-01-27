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
    
namespace Infor.Sxe.Shared.Data.Repositories
{
   using Infor.Sxe.Shared.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdscontactscrt;
   using Models.Pdscamsubject;
   using Models.Pdscamcontactlist;
   using Models.Pdscamcontact;
   using Models.Pdsmessaging;
   using Models.Pdscammethodtypes;
   using Models.Pdscamcontactsearch;
   using Models.Pdscamcontactties;
   using Models.Complex;

   public partial class AscamRepository : RepositoryBase
   {
      private AscamAdapter adapter;
  
      public AscamRepository(IProgressConnection connection)
      {
         this.adapter = new AscamAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public IEnumerable<Contactscrt> ContactCreate(IEnumerable<Contactscrt> contactscrt)
      {
         return this.adapter.ContactCreate(contactscrt);
      }
  
      public Contactscrt ContactUpdate(Contactscrt contactscrt)
      {
         return this.adapter.ContactUpdate(contactscrt);
      }
  
      public IEnumerable<Camcontactlist> CAMBuildContactList(Camsubject camsubject)
      {
         return this.adapter.CAMBuildContactList(camsubject);
      }
  
      public void CAMContactDelete(decimal dContactid)
      {
         this.adapter.CAMContactDelete(dContactid);
      }
  
      public AscamCAMContactInitializeResponseAPI CAMContactInitialize(AscamCAMContactInitializeRequestAPI AscamCAMContactInitializeRequestAPI)
      {
         return this.adapter.CAMContactInitialize(AscamCAMContactInitializeRequestAPI);
      }
  
      public void CAMContactAddToSubject(AscamCAMContactAddToSubjectRequestAPI AscamCAMContactAddToSubjectRequestAPI)
      {
         this.adapter.CAMContactAddToSubject(AscamCAMContactAddToSubjectRequestAPI);
      }
  
      public void CAMContactRemoveFromSubject(AscamCAMContactRemoveFromSubjectRequestAPI AscamCAMContactRemoveFromSubjectRequestAPI)
      {
         this.adapter.CAMContactRemoveFromSubject(AscamCAMContactRemoveFromSubjectRequestAPI);
      }
  
      public bool CAMContactSearchDupName(string cFirstName, string cLastName)
      {
         return this.adapter.CAMContactSearchDupName(cFirstName, cLastName);
      }
  
      public AscamCAMContactUpdateResponseAPI CAMContactUpdate(AscamCAMContactUpdateRequestAPI AscamCAMContactUpdateRequestAPI)
      {
         return this.adapter.CAMContactUpdate(AscamCAMContactUpdateRequestAPI);
      }
  
      public IEnumerable<Cammethodtypes> CAMMethodTypesRetrieve()
      {
         return this.adapter.CAMMethodTypesRetrieve();
      }
  
      public Camsubject CAMRetrieveSubjectForOrder(string pvOrdertype, int pvOrderno, int pvOrdersuf)
      {
         return this.adapter.CAMRetrieveSubjectForOrder(pvOrdertype, pvOrderno, pvOrdersuf);
      }
  
      public AscamCAMContactSearchResponseAPI CAMContactSearch(Camcontactcriteria camcontactcriteria)
      {
         return this.adapter.CAMContactSearch(camcontactcriteria);
      }
  
      public IEnumerable<Camcontactties> CAMContactGetTies(decimal dContactid)
      {
         return this.adapter.CAMContactGetTies(dContactid);
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
  