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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.CM
{  
   using Sxe.CM.Data.Models.PdsContext;
   using Sxe.CM.Data.Models.Pdscmsi;
   using Sxe.CM.Data.Repositories;
    
   [RoutePrefix("api/cm/cmsi")]
   public partial class CmsiApiController : ApiControllerBase
   {
      private readonly CmsiRepository repository;
    
      public CmsiApiController(CmsiRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Cmsi GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Cmsi> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Cmsi>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Cmsi Get(decimal prosno = 0, string interest = "", string fldlist = "")
      {
         return this.repository.Get(prosno, interest, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(decimal prosno = 0, string interest = "")
      {
         return (this.repository.Get(prosno, interest, 1, string.Empty) != null);
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
      [Route("listbyinterest")]
      public IEnumerable<Cmsi> GetListByInterest(string interest = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByInterest(interest, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprod")]
      public IEnumerable<Cmsi> GetListByProd(decimal prosno = 0, string prod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(prosno, prod, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprosno")]
      public IEnumerable<Cmsi> GetListByProsno(decimal prosno = 0, DateTime? transdt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProsno(prosno, transdt, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Cmsi Insert(Cmsi record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Cmsi Update(Cmsi record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Cmsi record)
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
  