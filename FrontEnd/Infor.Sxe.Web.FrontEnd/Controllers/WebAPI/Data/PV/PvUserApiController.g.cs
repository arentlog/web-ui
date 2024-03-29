//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 7622 $
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
using System.Web.Http;
using ServiceInterfaceClient.BaseClasses;
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.PV
{  
   using Sxe.PV.Data.Models.PdsContext;
   using Sxe.PV.Data.Models.PdspvUser;
   using Sxe.PV.Data.Repositories;
    
   [RoutePrefix("api/pv/pvuser")]
   public partial class PvUserApiController : ApiControllerBase
   {
      private readonly PvUserRepository repository;
    
      public PvUserApiController(PvUserRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public PvUser GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<PvUser> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<PvUser>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<PvUser> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<PvUser> GetListByRowpointers(List<string> rowpointers, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<PvUser>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public PvUser Get(string oper2 = "", string fldlist = "")
      {
         return this.repository.Get(0, oper2, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string oper2 = "")
      {
         return (this.repository.Get(0, oper2, 1, string.Empty) != null);
      }

      [HttpGet]
      [Route("existsbyrowid/{rowid:maxLength(30)}")]
      public bool ExistsByRowId(string rowid)
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return false;
         }
         return (this.repository.GetByRowId(rowid, string.Empty) != null);
      }
	  

      [HttpGet]
      [Route("existsbyrowpointer/{rowpointer:guid}")]
      public bool ExistsByRowpointer(string rowpointer)
      {
         if (string.IsNullOrEmpty(rowpointer))
         {
            return false;
         }
         return (this.repository.GetByRowpointer(rowpointer, string.Empty) != null);
      }
	  
	  
      [HttpGet]
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public PvUser GetByRowpointer(string rowpointer, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fldlist);
      }

      [HttpGet]
      [Route("listbysessionid")]
      public IEnumerable<PvUser> GetListBySessionid(string sessionid = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySessionid(sessionid, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbytransdttmz")]
      public IEnumerable<PvUser> GetListByTransdttmz(DateTime? transdttmz = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByTransdttmz(transdttmz, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyuserid")]
      public IEnumerable<PvUser> GetListByUserid(string userid = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByUserid(userid, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyusername")]
      public IEnumerable<PvUser> GetListByUserName(string userName = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByUserName(userName, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public PvUser Insert(PvUser record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public PvUser Update(PvUser record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(PvUser record)
      {
         this.repository.Delete(record);
      }
  
      [HttpDelete]
      [Route("deletelistbyrowids")]
      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds == null || rowIds.Count == 0)
         {
            return;
         }
         this.repository.DeleteListByRowIds(rowIds);
      }
	   
	  
      [HttpDelete]
      [Route("deletelistbyrowpointers")]
      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return;
         }
         this.repository.DeleteListByRowPointers(rowpointers);
      }
	  
      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.repository?.Dispose();
         base.Dispose(true);
      }
   }   
}
#pragma warning restore 1591
  