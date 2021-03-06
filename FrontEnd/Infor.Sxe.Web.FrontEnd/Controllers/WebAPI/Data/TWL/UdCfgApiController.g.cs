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
   using Sxe.TWL.Data.Models.PdsudCfg;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/udcfg")]
   public partial class UdCfgApiController : ApiControllerBase
   {
      private readonly UdCfgRepository repository;
    
      public UdCfgApiController(UdCfgRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public UdCfg GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<UdCfg> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<UdCfg>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public UdCfg Get(string coNum = "", string whNum = "", int deptNum = 0, string empNum = "", string udcType = "", string udcId = "", string fldlist = "")
      {
         return this.repository.Get(coNum, whNum, deptNum, empNum, udcType, udcId, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string coNum = "", string whNum = "", int deptNum = 0, string empNum = "", string udcType = "", string udcId = "")
      {
         return (this.repository.Get(coNum, whNum, deptNum, empNum, udcType, udcId, 1, string.Empty) != null);
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
      [Route("listbycowhsysnameudctypeudcidempn")]
      public IEnumerable<UdCfg> GetListByCoWhSysnameUdctypeUdcidEmpn(string coNum = "", string whNum = "", string sysName = "", string udcType = "", string udcId = "", string empNum = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhSysnameUdctypeUdcidEmpn(coNum, whNum, sysName, udcType, udcId, empNum, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public UdCfg Insert(UdCfg record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public UdCfg Update(UdCfg record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(UdCfg record)
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
  