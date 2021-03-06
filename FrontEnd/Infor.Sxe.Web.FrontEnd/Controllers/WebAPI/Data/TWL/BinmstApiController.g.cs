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
   using Sxe.TWL.Data.Models.Pdsbinmst;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/binmst")]
   public partial class BinmstApiController : ApiControllerBase
   {
      private readonly BinmstRepository repository;
    
      public BinmstApiController(BinmstRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Binmst GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Binmst> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Binmst>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Binmst Get(string coNum = "", string whNum = "", string binNum = "", string fldlist = "")
      {
         return this.repository.Get(coNum, whNum, binNum, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string coNum = "", string whNum = "", string binNum = "")
      {
         return (this.repository.Get(coNum, whNum, binNum, 1, string.Empty) != null);
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
      [Route("listbycowhabc")]
      public IEnumerable<Binmst> GetListByCoWhAbc(string coNum = "", string whNum = "", string abc = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhAbc(coNum, whNum, abc, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhabcpending")]
      public IEnumerable<Binmst> GetListByCoWhAbcPending(string coNum = "", string whNum = "", string abcPending = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhAbcPending(coNum, whNum, abcPending, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhpickseqbin")]
      public IEnumerable<Binmst> GetListByCoWhPickseqBin(string coNum = "", string whNum = "", int pickSequence = 0, string binNum = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhPickseqBin(coNum, whNum, pickSequence, binNum, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhprimabstype")]
      public IEnumerable<Binmst> GetListByCoWhPrimAbsType(string coNum = "", string whNum = "", bool primPick = false, string absNum = "", string primPickType = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhPrimAbsType(coNum, whNum, primPick, absNum, primPickType, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhputgrp")]
      public IEnumerable<Binmst> GetListByCoWhPutgrp(string coNum = "", string whNum = "", string putawayGroup = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhPutgrp(coNum, whNum, putawayGroup, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhzoneabccubebin")]
      public IEnumerable<Binmst> GetListByCoWhZoneAbcCubeBin(string coNum = "", string whNum = "", string whZone = "", string abc = "", decimal cube = 0, string binNum = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhZoneAbcCubeBin(coNum, whNum, whZone, abc, cube, binNum, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhzoneaislebin")]
      public IEnumerable<Binmst> GetListByCoWhZoneAisleBin(string coNum = "", string whNum = "", string whZone = "", int aisle = 0, string binNum = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhZoneAisleBin(coNum, whNum, whZone, aisle, binNum, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Binmst Insert(Binmst record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Binmst Update(Binmst record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Binmst record)
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
  