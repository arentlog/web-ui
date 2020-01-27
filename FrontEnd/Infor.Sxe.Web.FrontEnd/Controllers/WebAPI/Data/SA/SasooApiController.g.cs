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
   using Sxe.SA.Data.Models.Pdssasoo;
   using Sxe.SA.Data.Repositories;
    
   [RoutePrefix("api/sa/sasoo")]
   public partial class SasooApiController : ApiControllerBase
   {
      private readonly SasooRepository repository;
    
      public SasooApiController(SasooRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Sasoo GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Sasoo> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Sasoo>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Sasoo> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Sasoo Get(string oper2 = "", string fldlist = "")
      {
         return this.repository.Get(0, oper2, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string oper2 = "")
      {
         return (this.repository.Get(0, oper2, 1, string.Empty) != null);
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
      [Route("listbyifsuser")]
      public IEnumerable<Sasoo> GetListByIfsuser(string ifsuser = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByIfsuser(0, ifsuser, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyoper2")]
      public IEnumerable<Sasoo> GetListByOper2(bool loginfl = false, string oper2 = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByOper2(loginfl, oper2, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyusers")]
      public IEnumerable<Sasoo> GetListByUsers(bool loginfl = false, string ourproc = "", string oper2 = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByUsers(loginfl, ourproc, oper2, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Sasoo Insert(Sasoo record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Sasoo Update(Sasoo record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Sasoo record)
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
  