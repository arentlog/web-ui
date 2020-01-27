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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.PO
{  
   using Sxe.PO.Data.Models.PdsContext;
   using Sxe.PO.Data.Models.Pdspoela;
   using Sxe.PO.Data.Repositories;
    
   [RoutePrefix("api/po/poela")]
   public partial class PoelaApiController : ApiControllerBase
   {
      private readonly PoelaRepository repository;
    
      public PoelaApiController(PoelaRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Poela GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Poela> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Poela>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Poela> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Poela Get(int jrnlno = 0, int setno = 0, int addonno = 0, int pono = 0, int posuf = 0, int lineno = 0, int compseqno = 0, string bundleid = "", string fldlist = "")
      {
         return this.repository.Get(0, jrnlno, setno, addonno, pono, posuf, lineno, compseqno, bundleid, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int jrnlno = 0, int setno = 0, int addonno = 0, int pono = 0, int posuf = 0, int lineno = 0, int compseqno = 0, string bundleid = "")
      {
         return (this.repository.Get(0, jrnlno, setno, addonno, pono, posuf, lineno, compseqno, bundleid, 1, string.Empty) != null);
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
      [Route("listbypono")]
      public IEnumerable<Poela> GetListByPono(int pono = 0, int posuf = 0, int lineno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByPono(0, pono, posuf, lineno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Poela Insert(Poela record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Poela Update(Poela record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Poela record)
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
  