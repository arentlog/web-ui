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
   using Sxe.IC.Data.Models.Pdsicsv;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icsv")]
   public partial class IcsvApiController : ApiControllerBase
   {
      private readonly IcsvRepository repository;
    
      public IcsvApiController(IcsvRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icsv GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icsv> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icsv>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Icsv> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Icsv Get(string type = "", string prod = "", decimal vendno = 0, string fldlist = "")
      {
         return this.repository.Get(0, type, prod, vendno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string type = "", string prod = "", decimal vendno = 0)
      {
         return (this.repository.Get(0, type, prod, vendno, 1, string.Empty) != null);
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
      [Route("listbybatch")]
      public IEnumerable<Icsv> GetListByBatch(string ecbatchnm = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByBatch(ecbatchnm, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprod")]
      public IEnumerable<Icsv> GetListByProd(string prod = "", string type = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, prod, type, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprodupc")]
      public IEnumerable<Icsv> GetListByProdupc(decimal section4 = 0, decimal section3 = 0, decimal vendno = 0, decimal section2 = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProdupc(0, section4, section3, vendno, section2, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyupc")]
      public IEnumerable<Icsv> GetListByUpc(decimal section1 = 0, decimal section2 = 0, decimal section3 = 0, decimal section4 = 0, decimal section5 = 0, decimal section6 = 0, string type = "", string prod = "", decimal vendno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByUpc(0, section1, section2, section3, section4, section5, section6, type, prod, vendno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyvendno")]
      public IEnumerable<Icsv> GetListByVendno(decimal vendno = 0, string prod = "", string type = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVendno(0, vendno, prod, type, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyvendprod")]
      public IEnumerable<Icsv> GetListByVendprod(string vendprod = "", decimal vendno = 0, string type = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVendprod(0, vendprod, vendno, type, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icsv Insert(Icsv record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icsv Update(Icsv record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icsv record)
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
  