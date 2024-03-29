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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SA
{  
   using Sxe.SA.Data.Models.PdsContext;
   using Sxe.SA.Data.Models.Pdssasga;
   using Sxe.SA.Data.Repositories;
    
   [RoutePrefix("api/sa/sasga")]
   public partial class SasgaApiController : ApiControllerBase
   {
      private readonly SasgaRepository repository;
    
      public SasgaApiController(SasgaRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Sasga GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Sasga> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Sasga>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Sasga> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Sasga Get(string tablety = "", int recty = 0, int taxgroup = 0, string statecd = "", string countycd = "", string citycd = "", string othercd = "", int addonno = 0, string fldlist = "")
      {
         return this.repository.Get(0, tablety, recty, taxgroup, statecd, countycd, citycd, othercd, addonno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string tablety = "", int recty = 0, int taxgroup = 0, string statecd = "", string countycd = "", string citycd = "", string othercd = "", int addonno = 0)
      {
         return (this.repository.Get(0, tablety, recty, taxgroup, statecd, countycd, citycd, othercd, addonno, 1, string.Empty) != null);
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
      public IEnumerable<Sasga> GetListByAddonno(string tablety = "", int addonno = 0, int recty = 0, int taxgroup = 0, string statecd = "", string countycd = "", string citycd = "", string othercd = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByAddonno(0, tablety, addonno, recty, taxgroup, statecd, countycd, citycd, othercd, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Sasga Insert(Sasga record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Sasga Update(Sasga record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Sasga record)
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
  