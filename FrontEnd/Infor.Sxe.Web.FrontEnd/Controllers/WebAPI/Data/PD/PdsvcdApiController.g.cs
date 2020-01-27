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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.PD
{  
   using Sxe.PD.Data.Models.PdsContext;
   using Sxe.PD.Data.Models.Pdspdsvcd;
   using Sxe.PD.Data.Repositories;
    
   [RoutePrefix("api/pd/pdsvcd")]
   public partial class PdsvcdApiController : ApiControllerBase
   {
      private readonly PdsvcdRepository repository;
    
      public PdsvcdApiController(PdsvcdRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Pdsvcd GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Pdsvcd> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Pdsvcd>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Pdsvcd> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Pdsvcd Get(string whse = "", decimal vendno = 0, int shipfmno = 0, string prod = "", string prodline = "", DateTime? startdt = null, string fldlist = "")
      {
         return this.repository.Get(0, whse, vendno, shipfmno, prod, prodline, startdt, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string whse = "", decimal vendno = 0, int shipfmno = 0, string prod = "", string prodline = "", DateTime? startdt = null)
      {
         return (this.repository.Get(0, whse, vendno, shipfmno, prod, prodline, startdt, 1, string.Empty) != null);
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
      [Route("listbyprod")]
      public IEnumerable<Pdsvcd> GetListByProd(string prod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, prod, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprodline")]
      public IEnumerable<Pdsvcd> GetListByProdline(string whse = "", string prodline = "", DateTime? startdt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProdline(0, whse, prodline, startdt, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyvendor")]
      public IEnumerable<Pdsvcd> GetListByVendor(decimal vendno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVendor(0, vendno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyvendpdrecno")]
      public IEnumerable<Pdsvcd> GetListByVendpdrecno(int vendpdrecno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVendpdrecno(0, vendpdrecno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Pdsvcd Insert(Pdsvcd record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Pdsvcd Update(Pdsvcd record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Pdsvcd record)
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
  