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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.KP
{  
   using Sxe.KP.Data.Models.PdsContext;
   using Sxe.KP.Data.Models.Pdskpsg;
   using Sxe.KP.Data.Models.Pdskpgrouplookup;
   using Sxe.KP.Data.Repositories;
    
   [RoutePrefix("api/kp/kpsg")]
   public partial class KpsgApiController : ApiControllerBase
   {
      private readonly KpsgRepository repository;
    
      public KpsgApiController(KpsgRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Kpsg GetByRowId(string rowid, bool fillmode = false, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fillmode, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Kpsg> GetListByRowIdList(List<string> rowids, bool fillmode = false, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Kpsg>();
         }
         return this.repository.GetListByRowIdList(rowids, fillmode, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Kpsg> GetListAllByCono(bool fillmode = false, int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, fillmode, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Kpsg Get(string groupname = "", int seqno = 0, bool fillmode = false, string fldlist = "")
      {
         return this.repository.Get(0, groupname, seqno, fillmode, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string groupname = "", int seqno = 0)
      {
         return (this.repository.Get(0, groupname, seqno, false, 1, string.Empty) != null);
      }

      [HttpGet]
      [Route("existsbyrowid/{rowid:maxLength(30)}")]
      public bool ExistsByRowId(string rowid)
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return false;
         }
         return (this.repository.GetByRowId(rowid, false, string.Empty) != null);
      }
	  

      [HttpGet]
      [Route("listbycomprod")]
      public IEnumerable<Kpsg> GetListByComprod(string comprod = "",  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByComprod(0, comprod, fillmode, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Kpsg Insert(Kpsg record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Kpsg Update(Kpsg record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Kpsg record)
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
      public IEnumerable<Kpgrouplookupresults> Lookup(Kpgrouplookupcriteria kpgrouplookupcriteria)
      {
         return this.repository.Lookup(kpgrouplookupcriteria);
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
  