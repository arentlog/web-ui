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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.AP
{  
   using Sxe.AP.Data.Models.PdsContext;
   using Sxe.AP.Data.Models.Pdsapeie;
   using Sxe.AP.Data.Repositories;
    
   [RoutePrefix("api/ap/apeie")]
   public partial class ApeieApiController : ApiControllerBase
   {
      private readonly ApeieRepository repository;
    
      public ApeieApiController(ApeieRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Apeie GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Apeie> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Apeie>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Apeie> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Apeie Get(string groupnm = "", DateTime? createddt = null, int groupseqno = 0, string tablenm = "", int invseqno = 0, int errorseqno = 0, string fldlist = "")
      {
         return this.repository.Get(0, groupnm, createddt, groupseqno, tablenm, invseqno, errorseqno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string groupnm = "", DateTime? createddt = null, int groupseqno = 0, string tablenm = "", int invseqno = 0, int errorseqno = 0)
      {
         return (this.repository.Get(0, groupnm, createddt, groupseqno, tablenm, invseqno, errorseqno, 1, string.Empty) != null);
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
      [Route("listbyapinvno")]
      public IEnumerable<Apeie> GetListByApinvno(decimal vendno = 0, string apinvno = "", string tablenm = "", int invseqno = 0, int errorseqno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByApinvno(0, vendno, apinvno, tablenm, invseqno, errorseqno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbybuyer")]
      public IEnumerable<Apeie> GetListByBuyer(string buyer = "", string tablenm = "", int pono = 0, decimal posuf = 0, decimal lineno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByBuyer(0, buyer, tablenm, pono, posuf, lineno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Apeie Insert(Apeie record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Apeie Update(Apeie record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Apeie record)
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
  