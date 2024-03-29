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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.RS
{  
   using Sxe.RS.Data.Models.PdsContext;
   using Sxe.RS.Data.Models.Pdsrssq;
   using Sxe.RS.Data.Models.Pdsrsqueuelookup;
   using Sxe.RS.Data.Models.Complex;
   using Sxe.RS.Data.Repositories;
    
   [RoutePrefix("api/rs/rssq")]
   public partial class RssqApiController : ApiControllerBase
   {
      private readonly RssqRepository repository;
    
      public RssqApiController(RssqRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Rssq GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Rssq> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Rssq>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Rssq Get(string queuenm = "", string fldlist = "")
      {
         return this.repository.Get(queuenm, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string queuenm = "")
      {
         return (this.repository.Get(queuenm, 1, string.Empty) != null);
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
      [Route("listbypriority")]
      public IEnumerable<Rssq> GetListByPriority(int queuepri = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByPriority(queuepri, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbystatus")]
      public IEnumerable<Rssq> GetListByStatus(bool statustype = false, int queuepri = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByStatus(statustype, queuepri, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Rssq Insert(Rssq record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Rssq Update(Rssq record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Rssq record)
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
      public RssqLookupResponseAPI Lookup(Rsqueuelookupcriteria rsqueuelookupcriteria)
      {
         return this.repository.Lookup(rsqueuelookupcriteria);
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
  