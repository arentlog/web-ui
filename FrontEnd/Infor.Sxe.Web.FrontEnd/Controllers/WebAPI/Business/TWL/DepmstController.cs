using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsdepmst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/depmst")]
   public class DepmstController : ApiControllerBase
   {
      private readonly IDepmstService depmstService;

      public DepmstController(IDepmstService depmstService)
      {
         this.depmstService = depmstService;
      }

      [HttpPost]
      [Route("gettwldepartments")]
      public IEnumerable<Depmst> GetTWLDepartments(GetTWLDepartmentsApi getTWLDepartmentsApi)
      {
         return this.depmstService.GetTWLDepartments(getTWLDepartmentsApi);
      }

      [HttpGet]
      [Route("gettwldepartments/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{deptNum:int}")]
      public IEnumerable<Depmst> GetTWLDepartments(string coNum, string whNum, int deptNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLDepartmentsApi = new GetTWLDepartmentsApi()
         {
            coNum = coNum,
            whNum = whNum,
            deptNum = deptNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.depmstService.GetTWLDepartments(getTWLDepartmentsApi);
      }

      [HttpGet]
      [Route("gettwldepartments/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Depmst> GetTWLDepartments(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLDepartmentsApi = new GetTWLDepartmentsApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.depmstService.GetTWLDepartments(getTWLDepartmentsApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.depmstService?.Dispose();
         base.Dispose(true);
      }
   }
}