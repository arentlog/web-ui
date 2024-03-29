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
   using Sxe.SA.Data.Models.Pdssastaz;
   using Sxe.SA.Data.Repositories;
    
   [RoutePrefix("api/sa/sastaz")]
   public partial class SastazApiController : ApiControllerBase
   {
      private readonly SastazRepository repository;
    
      public SastazApiController(SastazRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Sastaz GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Sastaz> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Sastaz>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Sastaz> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Sastaz Get(string codeiden = "", string primarykey = "", string secondarykey = "", string fldlist = "")
      {
         return this.repository.Get(0, codeiden, primarykey, secondarykey, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string codeiden = "", string primarykey = "", string secondarykey = "")
      {
         return (this.repository.Get(0, codeiden, primarykey, secondarykey, 1, string.Empty) != null);
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
      [Route("listbylabel")]
      public IEnumerable<Sastaz> GetListByLabel(bool labelfl = false, string codeiden = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByLabel(0, labelfl, codeiden, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprimary")]
      public IEnumerable<Sastaz> GetListByPrimary(bool labelfl = false, string codeiden = "", string primarykey = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByPrimary(0, labelfl, codeiden, primarykey, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbysecond")]
      public IEnumerable<Sastaz> GetListBySecond(string codeiden = "", string secondarykey = "", string primarykey = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySecond(0, codeiden, secondarykey, primarykey, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Sastaz Insert(Sastaz record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Sastaz Update(Sastaz record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Sastaz record)
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
  