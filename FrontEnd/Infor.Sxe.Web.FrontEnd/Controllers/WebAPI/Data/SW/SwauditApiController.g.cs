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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SW
{  
   using Sxe.SW.Data.Models.PdsContext;
   using Sxe.SW.Data.Models.Pdsswaudit;
   using Sxe.SW.Data.Repositories;
    
   [RoutePrefix("api/sw/swaudit")]
   public partial class SwauditApiController : ApiControllerBase
   {
      private readonly SwauditRepository repository;
    
      public SwauditApiController(SwauditRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Swaudit GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Swaudit> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Swaudit>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Swaudit> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Swaudit Get(string whse = "", int repairordno = 0, int repairordsuf = 0, int rolineno = 0, int solineno = 0, string fldlist = "")
      {
         return this.repository.Get(0, whse, repairordno, repairordsuf, rolineno, solineno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string whse = "", int repairordno = 0, int repairordsuf = 0, int rolineno = 0, int solineno = 0)
      {
         return (this.repository.Get(0, whse, repairordno, repairordsuf, rolineno, solineno, 1, string.Empty) != null);
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
      [Route("listbydelete")]
      public IEnumerable<Swaudit> GetListByDelete(string whse = "", int repairordno = 0, DateTime? transdt = null, string operinit = "", bool printfl = false,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByDelete(0, whse, repairordno, transdt, operinit, printfl, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Swaudit Insert(Swaudit record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Swaudit Update(Swaudit record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Swaudit record)
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
  