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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.VA
{  
   using Sxe.VA.Data.Models.PdsContext;
   using Sxe.VA.Data.Models.Pdsvaelo;
   using Sxe.VA.Data.Repositories;
    
   [RoutePrefix("api/va/vaelo")]
   public partial class VaeloApiController : ApiControllerBase
   {
      private readonly VaeloRepository repository;
    
      public VaeloApiController(VaeloRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Vaelo GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Vaelo> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Vaelo>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Vaelo> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Vaelo Get(int vano = 0, int vasuf = 0, int lineno = 0, int seqno = 0, string fldlist = "")
      {
         return this.repository.Get(0, vano, vasuf, lineno, seqno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int vano = 0, int vasuf = 0, int lineno = 0, int seqno = 0)
      {
         return (this.repository.Get(0, vano, vasuf, lineno, seqno, 1, string.Empty) != null);
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
      [Route("listbyorder")]
      public IEnumerable<Vaelo> GetListByOrder(string ordertype = "", int orderaltno = 0, int orderaltsuf = 0, int linealtno = 0, int seqaltno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByOrder(0, ordertype, orderaltno, orderaltsuf, linealtno, seqaltno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Vaelo Insert(Vaelo record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Vaelo Update(Vaelo record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Vaelo record)
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
  