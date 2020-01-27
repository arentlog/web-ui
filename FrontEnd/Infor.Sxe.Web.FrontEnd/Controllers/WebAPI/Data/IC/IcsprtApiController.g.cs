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
   using Sxe.IC.Data.Models.Pdsicsprt;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icsprt")]
   public partial class IcsprtApiController : ApiControllerBase
   {
      private readonly IcsprtRepository repository;
    
      public IcsprtApiController(IcsprtRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icsprt GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icsprt> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icsprt>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Icsprt> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Icsprt Get(string srcrowpointer = "", string territorycd = "", int seqno = 0, string fldlist = "")
      {
         return this.repository.Get(0, srcrowpointer, territorycd, seqno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string srcrowpointer = "", string territorycd = "", int seqno = 0)
      {
         return (this.repository.Get(0, srcrowpointer, territorycd, seqno, 1, string.Empty) != null);
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
      [Route("listbycertcode")]
      public IEnumerable<Icsprt> GetListByCertcode(string certcode = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCertcode(0, certcode, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycountrycd")]
      public IEnumerable<Icsprt> GetListByCountrycd(string countrycd = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCountrycd(0, countrycd, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycustno")]
      public IEnumerable<Icsprt> GetListByCustno(decimal custno = 0, string shipto = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCustno(0, custno, shipto, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycusttype")]
      public IEnumerable<Icsprt> GetListByCusttype(string custtype = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCusttype(0, custtype, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbypricetype")]
      public IEnumerable<Icsprt> GetListByPricetype(string pricetype = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByPricetype(0, pricetype, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbysalesterr")]
      public IEnumerable<Icsprt> GetListBySalesterr(string salesterr = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySalesterr(0, salesterr, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbystate")]
      public IEnumerable<Icsprt> GetListByState(string state = "", string zipcd = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByState(0, state, zipcd, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icsprt Insert(Icsprt record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icsprt Update(Icsprt record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icsprt record)
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
  