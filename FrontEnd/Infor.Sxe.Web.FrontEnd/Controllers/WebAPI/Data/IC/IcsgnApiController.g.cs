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
   using Sxe.IC.Data.Models.Pdsicsgn;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icsgn")]
   public partial class IcsgnApiController : ApiControllerBase
   {
      private readonly IcsgnRepository repository;
    
      public IcsgnApiController(IcsgnRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icsgn GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icsgn> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icsgn>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Icsgn Get(int nodeid = 0, string fldlist = "")
      {
         return this.repository.Get(nodeid, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int nodeid = 0)
      {
         return (this.repository.Get(nodeid, 1, string.Empty) != null);
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
      public IEnumerable<Icsgn> GetListByBatch(string ecbatchnm = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByBatch(ecbatchnm, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbygav")]
      public IEnumerable<Icsgn> GetListByGav(string gav = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByGav(gav, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbygroup")]
      public IEnumerable<Icsgn> GetListByGroup(int groupno = 0, string gav = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByGroup(groupno, gav, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbynodekey")]
      public IEnumerable<Icsgn> GetListByNodekey(string nodekey = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByNodekey(nodekey, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbystoreid")]
      public IEnumerable<Icsgn> GetListByStoreid(int corpid = 0, int storeid = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByStoreid(corpid, storeid, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icsgn Insert(Icsgn record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icsgn Update(Icsgn record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icsgn record)
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
  