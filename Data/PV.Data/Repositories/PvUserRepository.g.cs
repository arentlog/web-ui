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
    
namespace Infor.Sxe.PV.Data.Repositories
{
   using Infor.Sxe.PV.Data.Adapters;
   
   using Models.PdsContext;
   using Models.PdspvUser;

   public partial class PvUserRepository : RepositoryBase
   {
      private PvUserAdapter adapter;
  
      public PvUserRepository(IProgressConnection connection)
      {
         this.adapter = new PvUserAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public PvUser GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<PvUser> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<PvUser> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<PvUser> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public PvUser Get(int cono, string oper2, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, oper2, batchsize, fldList);
      }
      
      public IEnumerable<PvUser> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public PvUser GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<PvUser> GetListBySessionid(string sessionid, int batchsize, string fldList)
      {
         return this.adapter.GetListBySessionid(sessionid, batchsize, fldList);
      }

      public IEnumerable<PvUser> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public IEnumerable<PvUser> GetListByUserid(string userid, int batchsize, string fldList)
      {
         return this.adapter.GetListByUserid(userid, batchsize, fldList);
      }

      public IEnumerable<PvUser> GetListByUserName(string userName, int batchsize, string fldList)
      {
         return this.adapter.GetListByUserName(userName, batchsize, fldList);
      }

      public PvUser Insert(PvUser record)
      {
         return this.adapter.Insert(record);        
      }
  
      public PvUser Update(PvUser record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(PvUser record)
      {
         this.adapter.Delete(record);
      }
  
      public void DeleteListByRowIds(List<string> rowIds)
      {
         this.adapter.DeleteListByRowIds(rowIds);
      }
	   

      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         this.adapter.DeleteListByRowPointers(rowpointers);
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
  