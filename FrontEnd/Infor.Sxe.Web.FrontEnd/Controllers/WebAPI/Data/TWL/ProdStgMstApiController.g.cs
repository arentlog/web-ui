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
   using Sxe.TWL.Data.Models.PdsprodStgMst;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/prodstgmst")]
   public partial class ProdStgMstApiController : ApiControllerBase
   {
      private readonly ProdStgMstRepository repository;
    
      public ProdStgMstApiController(ProdStgMstRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public ProdStgMst GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<ProdStgMst> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<ProdStgMst>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public ProdStgMst Get(int id = 0, string fldlist = "")
      {
         return this.repository.Get(id, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int id = 0)
      {
         return (this.repository.Get(id, 1, string.Empty) != null);
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
      [Route("listbycowhdate")]
      public IEnumerable<ProdStgMst> GetListByCoWhDate(string coNum = "", string whNum = "", string dateTime = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhDate(coNum, whNum, dateTime, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhdeptdate")]
      public IEnumerable<ProdStgMst> GetListByCoWhDeptDate(string coNum = "", string whNum = "", int deptNum = 0, string dateTime = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhDeptDate(coNum, whNum, deptNum, dateTime, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhdeptnamedate")]
      public IEnumerable<ProdStgMst> GetListByCoWhDeptNameDate(string coNum = "", string whNum = "", int deptNum = 0, string name = "", string dateTime = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhDeptNameDate(coNum, whNum, deptNum, name, dateTime, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhnamedate")]
      public IEnumerable<ProdStgMst> GetListByCoWhNameDate(string coNum = "", string whNum = "", string name = "", string dateTime = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhNameDate(coNum, whNum, name, dateTime, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhnameline")]
      public IEnumerable<ProdStgMst> GetListByCoWhNameLine(string coNum = "", string whNum = "", string name = "", int orderLine = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhNameLine(coNum, whNum, name, orderLine, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhstgdate")]
      public IEnumerable<ProdStgMst> GetListByCoWhStgDate(string coNum = "", string whNum = "", string stagingStatus = "", string dateTime = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhStgDate(coNum, whNum, stagingStatus, dateTime, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public ProdStgMst Insert(ProdStgMst record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public ProdStgMst Update(ProdStgMst record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(ProdStgMst record)
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
  