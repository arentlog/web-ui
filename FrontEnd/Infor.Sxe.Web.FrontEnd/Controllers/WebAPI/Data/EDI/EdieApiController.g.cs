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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.EDI
{  
   using Sxe.EDI.Data.Models.PdsContext;
   using Sxe.EDI.Data.Models.Pdsedie;
   using Sxe.EDI.Data.Repositories;
    
   [RoutePrefix("api/edi/edie")]
   public partial class EdieApiController : ApiControllerBase
   {
      private readonly EdieRepository repository;
    
      public EdieApiController(EdieRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Edie GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Edie> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Edie>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Edie> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Edie Get(string batchnm = "", int seqno = 0, bool level = false, int lineno = 0, int errseqno = 0, string docty = "", string fldlist = "")
      {
         return this.repository.Get(0, batchnm, seqno, level, lineno, errseqno, docty, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string batchnm = "", int seqno = 0, bool level = false, int lineno = 0, int errseqno = 0, string docty = "")
      {
         return (this.repository.Get(0, batchnm, seqno, level, lineno, errseqno, docty, 1, string.Empty) != null);
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
      [Route("listbycustno")]
      public IEnumerable<Edie> GetListByCustno(decimal custno = 0, string whse = "", string docty = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCustno(0, custno, whse, docty, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyediline")]
      public IEnumerable<Edie> GetListByEdiline(string batchnm = "", int seqno = 0, bool level = false, string edilineno = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByEdiline(0, batchnm, seqno, level, edilineno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyerrty")]
      public IEnumerable<Edie> GetListByErrty(string whse = "", string errty = "", string docty = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByErrty(0, whse, errty, docty, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbywhse")]
      public IEnumerable<Edie> GetListByWhse(string whse = "", string docty = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByWhse(0, whse, docty, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Edie Insert(Edie record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Edie Update(Edie record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Edie record)
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
  