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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.AR
{  
   using Sxe.AR.Data.Models.PdsContext;
   using Sxe.AR.Data.Models.Pdsarbch;
   using Sxe.AR.Data.Models.Pdsarbchchecklookup;
   using Sxe.AR.Data.Models.Complex;
   using Sxe.AR.Data.Repositories;
    
   [RoutePrefix("api/ar/arbch")]
   public partial class ArbchApiController : ApiControllerBase
   {
      private readonly ArbchRepository repository;
    
      public ArbchApiController(ArbchRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Arbch GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Arbch> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Arbch>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Arbch> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Arbch Get(string batch = "", decimal custno = 0, int checkno = 0, string fldlist = "")
      {
         return this.repository.Get(0, batch, custno, checkno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string batch = "", decimal custno = 0, int checkno = 0)
      {
         return (this.repository.Get(0, batch, custno, checkno, 1, string.Empty) != null);
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
      [Route("listbyrecvdt")]
      public IEnumerable<Arbch> GetListByRecvdt(DateTime? recvdt = null, decimal custno = 0, int checkno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByRecvdt(0, recvdt, custno, checkno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyseqno")]
      public IEnumerable<Arbch> GetListBySeqno(string batch = "", int checkseq = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySeqno(0, batch, checkseq, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyxmit")]
      public IEnumerable<Arbch> GetListByXmit(string transmission = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByXmit(0, transmission, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Arbch Insert(Arbch record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Arbch Update(Arbch record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Arbch record)
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
	  
      
      [Route("lookup")]
      [HttpPost]
      public ArbchLookupResponseAPI Lookup(Arbchlookupcriteria arbchlookupcriteria)
      {
         return this.repository.Lookup(arbchlookupcriteria);
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
  