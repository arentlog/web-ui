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
   using Sxe.AP.Data.Models.Pdsapeia;
   using Sxe.AP.Data.Repositories;
    
   [RoutePrefix("api/ap/apeia")]
   public partial class ApeiaApiController : ApiControllerBase
   {
      private readonly ApeiaRepository repository;
    
      public ApeiaApiController(ApeiaRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Apeia GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Apeia> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Apeia>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Apeia> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Apeia Get(string groupnm = "", DateTime? createddt = null, int groupseqno = 0, int addonseqno = 0, string fldlist = "")
      {
         return this.repository.Get(0, groupnm, createddt, groupseqno, addonseqno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string groupnm = "", DateTime? createddt = null, int groupseqno = 0, int addonseqno = 0)
      {
         return (this.repository.Get(0, groupnm, createddt, groupseqno, addonseqno, 1, string.Empty) != null);
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
      [Route("listbyaddonno")]
      public IEnumerable<Apeia> GetListByAddonno(string groupnm = "", DateTime? createddt = null, int groupseqno = 0, int addonno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByAddonno(0, groupnm, createddt, groupseqno, addonno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbystatus")]
      public IEnumerable<Apeia> GetListByStatus(bool statustype = false, decimal vendno = 0, string apinvno = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByStatus(0, statustype, vendno, apinvno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Apeia Insert(Apeia record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Apeia Update(Apeia record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Apeia record)
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
  