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
   using Sxe.IC.Data.Models.Pdsicsgk;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icsgk")]
   public partial class IcsgkApiController : ApiControllerBase
   {
      private readonly IcsgkRepository repository;
    
      public IcsgkApiController(IcsgkRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icsgk GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icsgk> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icsgk>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Icsgk Get(string tag = "", int corpid = 0, int storeid = 0, string fldlist = "")
      {
         return this.repository.Get(tag, corpid, storeid, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string tag = "", int corpid = 0, int storeid = 0)
      {
         return (this.repository.Get(tag, corpid, storeid, 1, string.Empty) != null);
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
      public IEnumerable<Icsgk> GetListByBatch(string ecbatchnm = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByBatch(ecbatchnm, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbygav")]
      public IEnumerable<Icsgk> GetListByGav(string gav = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByGav(gav, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbylevel")]
      public IEnumerable<Icsgk> GetListByLevel(int corpid = 0, string level1 = "", string level2 = "", string level3 = "", string level4 = "", string level5 = "", string level6 = "", string level7 = "", string level8 = "", string level9 = "", string level10 = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByLevel(corpid, level1, level2, level3, level4, level5, level6, level7, level8, level9, level10, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbynodeid")]
      public IEnumerable<Icsgk> GetListByNodeid(int nodeid = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByNodeid(nodeid, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyreferencepcat")]
      public IEnumerable<Icsgk> GetListByReferencePcat(string referencePcat = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByReferencePcat(referencePcat, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyreferenceprod")]
      public IEnumerable<Icsgk> GetListByReferenceProd(string referenceProd = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByReferenceProd(referenceProd, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbystoreid")]
      public IEnumerable<Icsgk> GetListByStoreid(int corpid = 0, int storeid = 0, string gav = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByStoreid(corpid, storeid, gav, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbytagno")]
      public IEnumerable<Icsgk> GetListByTagno(string tagType = "", int corpid = 0, int storeid = 0, int tagno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByTagno(tagType, corpid, storeid, tagno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbytype")]
      public IEnumerable<Icsgk> GetListByType(string tagType = "", int corpid = 0, int storeid = 0, string tag = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByType(tagType, corpid, storeid, tag, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icsgk Insert(Icsgk record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icsgk Update(Icsgk record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icsgk record)
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
  