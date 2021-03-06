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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.OE
{  
   using Sxe.OE.Data.Models.PdsContext;
   using Sxe.OE.Data.Models.Pdsoeeha;
   using Sxe.OE.Data.Repositories;
    
   [RoutePrefix("api/oe/oeeha")]
   public partial class OeehaApiController : ApiControllerBase
   {
      private readonly OeehaRepository repository;
    
      public OeehaApiController(OeehaRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Oeeha GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Oeeha> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Oeeha>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Oeeha> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Oeeha Get(int orderno = 0, int ordersuf = 0, int mediacd = 0, string cardno = "", string transcd = "", int seqno = 0, string fldlist = "")
      {
         return this.repository.Get(0, orderno, ordersuf, mediacd, cardno, transcd, seqno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int orderno = 0, int ordersuf = 0, int mediacd = 0, string cardno = "", string transcd = "", int seqno = 0)
      {
         return (this.repository.Get(0, orderno, ordersuf, mediacd, cardno, transcd, seqno, 1, string.Empty) != null);
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
      [Route("listbybatch")]
      public IEnumerable<Oeeha> GetListByBatch(int processno = 0, int processcd = 0, bool statustype = false, int orderno = 0, int ordersuf = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByBatch(0, processno, processcd, statustype, orderno, ordersuf, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyccqueue")]
      public IEnumerable<Oeeha> GetListByCcqueue(int processcd = 0, bool statustype = false, DateTime? createdt = null, string createtm = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCcqueue(0, processcd, statustype, createdt, createtm, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprocess")]
      public IEnumerable<Oeeha> GetListByProcess(int processcd = 0, int processno = 0, DateTime? createdt = null, string createtm = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProcess(processcd, processno, createdt, createtm, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbystatustype")]
      public IEnumerable<Oeeha> GetListByStatustype(int mediacd = 0, string cardno = "", bool statustype = false, int processcd = 0, int commcd = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByStatustype(0, mediacd, cardno, statustype, processcd, commcd, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbysubmit")]
      public IEnumerable<Oeeha> GetListBySubmit(bool statustype = false, DateTime? submitdt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySubmit(0, statustype, submitdt, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Oeeha Insert(Oeeha record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Oeeha Update(Oeeha record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Oeeha record)
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
  