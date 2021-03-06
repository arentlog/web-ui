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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.Shared
{  
   using Sxe.Shared.Data.Models.PdsContext;
   using Sxe.Shared.Data.Models.Pdsvehicle;
   using Sxe.Shared.Data.Repositories;
    
   [RoutePrefix("api/shared/vehicle")]
   public partial class VehicleApiController : ApiControllerBase
   {
      private readonly VehicleRepository repository;
    
      public VehicleApiController(VehicleRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Vehicle GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Vehicle> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Vehicle>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Vehicle> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Vehicle Get(decimal custno = 0, string shipto = "", string vehicleid = "", string fldlist = "")
      {
         return this.repository.Get(0, custno, shipto, vehicleid, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(decimal custno = 0, string shipto = "", string vehicleid = "")
      {
         return (this.repository.Get(0, custno, shipto, vehicleid, 1, string.Empty) != null);
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
      [Route("listbypmaint")]
      public IEnumerable<Vehicle> GetListByPmaint(bool pmaintfl = false, DateTime? pmaintdt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByPmaint(0, pmaintfl, pmaintdt, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyvehicleid")]
      public IEnumerable<Vehicle> GetListByVehicleid(string vehicleid = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVehicleid(0, vehicleid, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyvinno")]
      public IEnumerable<Vehicle> GetListByVinno(string vinno = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVinno(0, vinno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Vehicle Insert(Vehicle record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Vehicle Update(Vehicle record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Vehicle record)
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
  