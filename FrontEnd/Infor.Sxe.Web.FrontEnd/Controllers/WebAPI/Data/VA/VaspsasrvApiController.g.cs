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
   using Sxe.VA.Data.Models.Pdsvaspsasrv;
   using Sxe.VA.Data.Models.Pdsvasprulelookup;
   using Sxe.VA.Data.Models.Complex;
   using Sxe.VA.Data.Repositories;
    
   [RoutePrefix("api/va/vaspsasrv")]
   public partial class VaspsasrvApiController : ApiControllerBase
   {
      private readonly VaspsasrvRepository repository;
    
      public VaspsasrvApiController(VaspsasrvRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Vaspsasrv GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Vaspsasrv> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Vaspsasrv>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Vaspsasrv> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Vaspsasrv Get(string shipprod = "", string whse = "", int verno = 0, int segment = 0, int sequence = 0, string fldlist = "")
      {
         return this.repository.Get(0, shipprod, whse, verno, segment, sequence, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string shipprod = "", string whse = "", int verno = 0, int segment = 0, int sequence = 0)
      {
         return (this.repository.Get(0, shipprod, whse, verno, segment, sequence, 1, string.Empty) != null);
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
      public Vaspsasrv Insert(Vaspsasrv record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Vaspsasrv Update(Vaspsasrv record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Vaspsasrv record)
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
      public VaspsasrvLookupResponseAPI Lookup(Vasprulelookupcriteria vasprulelookupcriteria)
      {
         return this.repository.Lookup(vasprulelookupcriteria);
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
  