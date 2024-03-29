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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.IC
{  
   using Sxe.IC.Data.Models.PdsContext;
   using Sxe.IC.Data.Models.Pdsicsepa;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icsepa")]
   public partial class IcsepaApiController : ApiControllerBase
   {
      private readonly IcsepaRepository repository;
    
      public IcsepaApiController(IcsepaRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icsepa GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icsepa> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icsepa>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Icsepa> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Icsepa Get(string whse = "", int runno = 0, DateTime? updatedt = null, string binloc = "", string prod = "", string fldlist = "")
      {
         return this.repository.Get(0, whse, runno, updatedt, binloc, prod, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string whse = "", int runno = 0, DateTime? updatedt = null, string binloc = "", string prod = "")
      {
         return (this.repository.Get(0, whse, runno, updatedt, binloc, prod, 1, string.Empty) != null);
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
      [Route("listbyadjty")]
      public IEnumerable<Icsepa> GetListByAdjty(string whse = "", int runno = 0, string invadjustty = "", string binloc = "", string prod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByAdjty(0, whse, runno, invadjustty, binloc, prod, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbybin")]
      public IEnumerable<Icsepa> GetListByBin(string whse = "", int runno = 0, string binloc = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByBin(0, whse, runno, binloc, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprod")]
      public IEnumerable<Icsepa> GetListByProd(string whse = "", int runno = 0, string prod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, whse, runno, prod, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icsepa Insert(Icsepa record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icsepa Update(Icsepa record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icsepa record)
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
  