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
   using Sxe.OE.Data.Models.Pdsoeelbr;
   using Sxe.OE.Data.Repositories;
    
   [RoutePrefix("api/oe/oeelbr")]
   public partial class OeelbrApiController : ApiControllerBase
   {
      private readonly OeelbrRepository repository;
    
      public OeelbrApiController(OeelbrRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Oeelbr GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Oeelbr> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Oeelbr>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Oeelbr> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Oeelbr Get(string batchnm = "", int seqno = 0, int orderno = 0, int ordersuf = 0, int lineno = 0, string fldlist = "")
      {
         return this.repository.Get(0, batchnm, seqno, orderno, ordersuf, lineno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string batchnm = "", int seqno = 0, int orderno = 0, int ordersuf = 0, int lineno = 0)
      {
         return (this.repository.Get(0, batchnm, seqno, orderno, ordersuf, lineno, 1, string.Empty) != null);
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
	  

      [HttpPost]
      [Route("")]
      public Oeelbr Insert(Oeelbr record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Oeelbr Update(Oeelbr record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Oeelbr record)
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
  