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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.VA
{  
   using Sxe.VA.Data.Models.PdsContext;
   using Sxe.VA.Data.Models.Pdsvaesl;
   using Sxe.VA.Data.Repositories;
    
   [RoutePrefix("api/va/vaesl")]
   public partial class VaeslApiController : ApiControllerBase
   {
      private readonly VaeslRepository repository;
    
      public VaeslApiController(VaeslRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Vaesl GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Vaesl> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Vaesl>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Vaesl> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Vaesl Get(int vano = 0, int vasuf = 0, int seqno = 0, int lineno = 0, string fldlist = "")
      {
         return this.repository.Get(0, vano, vasuf, seqno, lineno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int vano = 0, int vasuf = 0, int seqno = 0, int lineno = 0)
      {
         return (this.repository.Get(0, vano, vasuf, seqno, lineno, 1, string.Empty) != null);
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
      [Route("listbyactive")]
      public IEnumerable<Vaesl> GetListByActive(string sctntype = "", bool completefl = false, int vano = 0, int vasuf = 0, int seqno = 0, int lineno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByActive(0, sctntype, completefl, vano, vasuf, seqno, lineno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprod")]
      public IEnumerable<Vaesl> GetListByProd(string shipprod = "", string whse = "", string sctntype = "", bool completefl = false, int vano = 0, int vasuf = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, shipprod, whse, sctntype, completefl, vano, vasuf, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyspecns")]
      public IEnumerable<Vaesl> GetListBySpecns(bool completefl = false, string nonstockty = "", string whse = "", string orderalttype = "", string arpwhse = "", decimal arpvendno = 0, string arpprodline = "", string shipprod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySpecns(0, completefl, nonstockty, whse, orderalttype, arpwhse, arpvendno, arpprodline, shipprod, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Vaesl Insert(Vaesl record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Vaesl Update(Vaesl record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Vaesl record)
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
  