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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.OE
{  
   using Sxe.OE.Data.Models.PdsContext;
   using Sxe.OE.Data.Models.Pdsoeeh;
   using Sxe.OE.Data.Models.Pdsoeorderlookup;
   using Sxe.OE.Data.Models.Pdsoeehrecentvisit;
   using Sxe.OE.Data.Models.Complex;
   using Sxe.OE.Data.Repositories;
    
   [RoutePrefix("api/oe/oeeh")]
   public partial class OeehApiController : ApiControllerBase
   {
      private readonly OeehRepository repository;
    
      public OeehApiController(OeehRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Oeeh GetByRowId(string rowid, bool fillmode = false, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fillmode, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Oeeh> GetListByRowIdList(List<string> rowids, bool fillmode = false, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Oeeh>();
         }
         return this.repository.GetListByRowIdList(rowids, fillmode, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Oeeh> GetListAllByCono(bool fillmode = false, int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, fillmode, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Oeeh> GetListByRowpointers(List<string> rowpointers, bool fillmode, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Oeeh>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fillmode, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Oeeh Get(int orderno = 0, int ordersuf = 0, bool fillmode = false, string fldlist = "")
      {
         return this.repository.Get(0, orderno, ordersuf, fillmode, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int orderno = 0, int ordersuf = 0)
      {
         return (this.repository.Get(0, orderno, ordersuf, false, 1, string.Empty) != null);
      }

      [HttpGet]
      [Route("existsbyrowid/{rowid:maxLength(30)}")]
      public bool ExistsByRowId(string rowid)
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return false;
         }
         return (this.repository.GetByRowId(rowid, false, string.Empty) != null);
      }
	  

      [HttpGet]
      [Route("existsbyrowpointer/{rowpointer:guid}")]
      public bool ExistsByRowpointer(string rowpointer)
      {
         if (string.IsNullOrEmpty(rowpointer))
         {
            return false;
         }
         return (this.repository.GetByRowpointer(rowpointer, false, string.Empty) != null);
      }
	  
	  
      [HttpGet]
      [Route("listbycustno")]
      public IEnumerable<Oeeh> GetListByCustno(decimal custno = 0, int stagecd = 0, int orderno = 0, int ordersuf = 0,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCustno(0, custno, stagecd, orderno, ordersuf, fillmode, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycustpo")]
      public IEnumerable<Oeeh> GetListByCustpo(string custpo = "", decimal custno = 0,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCustpo(0, custpo, custno, fillmode, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyinvproc")]
      public IEnumerable<Oeeh> GetListByInvproc(string whse = "", DateTime? invoicedt = null, string updtype = "",  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByInvproc(0, whse, invoicedt, updtype, fillmode, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyjrnl")]
      public IEnumerable<Oeeh> GetListByJrnl(int jrnlno = 0, int setno = 0, int orderno = 0, int ordersuf = 0,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByJrnl(0, jrnlno, setno, orderno, ordersuf, fillmode, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyjrnl2")]
      public IEnumerable<Oeeh> GetListByJrnl2(int jrnlno2 = 0, decimal setno2 = 0, int orderno = 0, int ordersuf = 0,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByJrnl2(0, jrnlno2, setno2, orderno, ordersuf, fillmode, batchsize, fldlist);
      }

      [HttpGet]
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Oeeh GetByRowpointer(string rowpointer, bool fillmode = false, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fillmode, fldlist);
      }

      [HttpGet]
      [Route("listbytransdttmz")]
      public IEnumerable<Oeeh> GetListByTransdttmz(DateTime? transdttmz = null,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByTransdttmz(transdttmz, fillmode, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbywhsestagecd")]
      public IEnumerable<Oeeh> GetListByWhsestagecd(string whse = "", int stagecd = 0, int orderno = 0, int ordersuf = 0,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByWhsestagecd(0, whse, stagecd, orderno, ordersuf, fillmode, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Oeeh Insert(Oeeh record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Oeeh Update(Oeeh record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Oeeh record)
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
	   
	  
      [HttpDelete]
      [Route("deletelistbyrowpointers")]
      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return;
         }
         this.repository.DeleteListByRowPointers(rowpointers);
      }
	  
      
      [Route("lookup")]
      [HttpPost]
      public OeehLookupResponseAPI Lookup(Oeorderlookupcriteria oeorderlookupcriteria)
      {
         return this.repository.Lookup(oeorderlookupcriteria);
      } 
  

      [HttpGet]
      [Route("listbywordindex")]
      public IEnumerable<Oeeh> GetListByWordIndex(string term = "", bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByWordIndex(term, fillmode, batchsize, fldlist);
      }
  
      
      [Route("getrecentvisitlist")]
      [HttpPost]
      public IEnumerable<Oeeh> GetRecentVisitList(OeehGetRecentVisitListRequestAPI OeehGetRecentVisitListRequestAPI)
      {
         return this.repository.GetRecentVisitList(OeehGetRecentVisitListRequestAPI);
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
  