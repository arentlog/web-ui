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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.TWL
{  
   using Sxe.TWL.Data.Models.PdsContext;
   using Sxe.TWL.Data.Models.Pdscomdet;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/comdet")]
   public partial class ComdetApiController : ApiControllerBase
   {
      private readonly ComdetRepository repository;
    
      public ComdetApiController(ComdetRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Comdet GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Comdet> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Comdet>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Comdet Get(string version = "", string recordType = "", int fieldStart = 0, string fldlist = "")
      {
         return this.repository.Get(version, recordType, fieldStart, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string version = "", string recordType = "", int fieldStart = 0)
      {
         return (this.repository.Get(version, recordType, fieldStart, 1, string.Empty) != null);
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
      [Route("listbyversiontypeactivereplystart")]
      public IEnumerable<Comdet> GetListByVersionTypeActiveReplyStart(string version = "", string recordType = "", bool active = false, bool addInReply = false, int fieldStart = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVersionTypeActiveReplyStart(version, recordType, active, addInReply, fieldStart, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyversiontypename")]
      public IEnumerable<Comdet> GetListByVersionTypeName(string version = "", string recordType = "", string fieldName = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVersionTypeName(version, recordType, fieldName, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Comdet Insert(Comdet record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Comdet Update(Comdet record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Comdet record)
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
  