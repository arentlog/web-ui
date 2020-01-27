using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsempmst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/empmst")]
   public class EmpmstController : ApiControllerBase
   {
      private readonly IEmpmstService empmstService;

      public EmpmstController(IEmpmstService empmstService)
      {
         this.empmstService = empmstService;
      }

      [HttpPost]
      [Route("gettwlemployees")]
      public IEnumerable<Empmst> GetTWLEmployees(GetTWLEmployeesApi getTWLEmployeesApi)
      {
         return this.empmstService.GetTWLEmployees(getTWLEmployeesApi);
      }

      [HttpGet]
      [Route("gettwlemployees/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{empNum:maxLength(18)}/{empName:maxLength(70)}")]
      public IEnumerable<Empmst> GetTWLEmployees(string coNum, string whNum, string empNum, string empName, int batchsize = 0, string fldlist = "")
      {
         var getTWLEmployeesApi = new GetTWLEmployeesApi()
         {
            coNum = coNum,
            whNum = whNum,
            empNum = empNum,
            empName = empName,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.empmstService.GetTWLEmployees(getTWLEmployeesApi);
      }

      [HttpGet]
      [Route("gettwlemployees/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{empNum:maxLength(18)}")]
      public IEnumerable<Empmst> GetTWLEmployees(string coNum, string whNum, string empNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLEmployeesApi = new GetTWLEmployeesApi()
         {
            coNum = coNum,
            whNum = whNum,
            empNum = empNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.empmstService.GetTWLEmployees(getTWLEmployeesApi);
      }

      [HttpGet]
      [Route("gettwlemployees/{coNum:maxLength(4)}/{type:int}/{empNum:maxLength(18)}")]
      public IEnumerable<Empmst> GetTWLEmployees(string coNum, int type, string empNum, int batchsize = 0, string fldlist = "")
      {
         if (type == 1)
         {
            var getTWLEmployeesApi = new GetTWLEmployeesApi()
            {
               coNum = coNum,
               whNum = string.Empty,
               empNum = empNum,
               batchsize = batchsize,
               fldlist = fldlist
            };
            return this.empmstService.GetTWLEmployees(getTWLEmployeesApi);
         } else
         {
            return null;
         }
      }

      [HttpGet]
      [Route("gettwlemployees/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Empmst> GetTWLEmployees(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLEmployeesApi = new GetTWLEmployeesApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.empmstService.GetTWLEmployees(getTWLEmployeesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.empmstService?.Dispose();
         base.Dispose(true);
      }
   }
}