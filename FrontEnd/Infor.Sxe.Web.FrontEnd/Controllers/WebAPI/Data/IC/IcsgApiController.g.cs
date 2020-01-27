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
   using Sxe.IC.Data.Models.Pdsicsg;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icsg")]
   public partial class IcsgApiController : ApiControllerBase
   {
      private readonly IcsgRepository repository;
    
      public IcsgApiController(IcsgRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icsg GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icsg> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icsg>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Icsg Get(int groupno = 0, string fldlist = "")
      {
         return this.repository.Get(groupno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int groupno = 0)
      {
         return (this.repository.Get(groupno, 1, string.Empty) != null);
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
      public IEnumerable<Icsg> GetListByBatch(string ecbatchnm = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByBatch(ecbatchnm, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbydescrip")]
      public IEnumerable<Icsg> GetListByDescrip(string descrip = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByDescrip(descrip, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbylangcd")]
      public IEnumerable<Icsg> GetListByLangcd(string langcd = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByLangcd(langcd, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbystoreid")]
      public IEnumerable<Icsg> GetListByStoreid(int corpid = 0, int storeid = 0, int groupno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByStoreid(corpid, storeid, groupno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icsg Insert(Icsg record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icsg Update(Icsg record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icsg record)
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
  