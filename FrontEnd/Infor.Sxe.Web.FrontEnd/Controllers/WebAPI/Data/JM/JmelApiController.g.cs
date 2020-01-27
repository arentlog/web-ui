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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.JM
{  
   using Sxe.JM.Data.Models.PdsContext;
   using Sxe.JM.Data.Models.Pdsjmel;
   using Sxe.JM.Data.Repositories;
    
   [RoutePrefix("api/jm/jmel")]
   public partial class JmelApiController : ApiControllerBase
   {
      private readonly JmelRepository repository;
    
      public JmelApiController(JmelRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Jmel GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Jmel> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Jmel>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Jmel> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Jmel Get(string jobid = "", int jobrevno = 0, int lineno = 0, string fldlist = "")
      {
         return this.repository.Get(0, jobid, jobrevno, lineno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string jobid = "", int jobrevno = 0, int lineno = 0)
      {
         return (this.repository.Get(0, jobid, jobrevno, lineno, 1, string.Empty) != null);
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
      [Route("listbylineprod")]
      public IEnumerable<Jmel> GetListByLineprod(string jobid = "", int jobrevno = 0, string prod = "", int lineno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByLineprod(0, jobid, jobrevno, prod, lineno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbylinety")]
      public IEnumerable<Jmel> GetListByLinety(string jobid = "", int jobrevno = 0, string linetype = "", int lineno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByLinety(0, jobid, jobrevno, linetype, lineno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprod")]
      public IEnumerable<Jmel> GetListByProd(string prod = "", string jobid = "", int jobrevno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, prod, jobid, jobrevno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyrelease")]
      public IEnumerable<Jmel> GetListByRelease(string jobid = "", int jobrevno = 0, string relaccepttype = "", int lineno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByRelease(0, jobid, jobrevno, relaccepttype, lineno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyspecns")]
      public IEnumerable<Jmel> GetListBySpecns(string linestat = "", string specnstype = "", string whse = "", DateTime? canceldt = null, string prod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySpecns(0, linestat, specnstype, whse, canceldt, prod, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Jmel Insert(Jmel record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Jmel Update(Jmel record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Jmel record)
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
  