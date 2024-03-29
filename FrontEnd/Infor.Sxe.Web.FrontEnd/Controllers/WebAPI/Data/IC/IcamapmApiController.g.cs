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
   using Sxe.IC.Data.Models.Pdsicamapm;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icamapm")]
   public partial class IcamapmApiController : ApiControllerBase
   {
      private readonly IcamapmRepository repository;
    
      public IcamapmApiController(IcamapmRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icamapm GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icamapm> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icamapm>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Icamapm> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Icamapm Get(int reportno = 0, string whse = "", string prod = "", string usagectrl = "", int usgmths = 0, string fldlist = "")
      {
         return this.repository.Get(0, reportno, whse, prod, usagectrl, usgmths, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int reportno = 0, string whse = "", string prod = "", string usagectrl = "", int usgmths = 0)
      {
         return (this.repository.Get(0, reportno, whse, prod, usagectrl, usgmths, 1, string.Empty) != null);
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
      [Route("listbynewmethod")]
      public IEnumerable<Icamapm> GetListByNewmethod(int reportno = 0, bool newmethodfl = false, string whse = "", string prod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByNewmethod(0, reportno, newmethodfl, whse, prod, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icamapm Insert(Icamapm record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icamapm Update(Icamapm record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icamapm record)
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
  