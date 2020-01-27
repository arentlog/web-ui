using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PV;
using Infor.Sxe.PV.Data.Models.PdspvRecovery;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PV
{
   [RoutePrefix("api/pv/pvrecovery")]
   public class PvRecoveryController : ApiControllerBase
   {
      private readonly IPvRecoveryService pvRecoveryService;

      public PvRecoveryController(IPvRecoveryService pvRecoveryService)
      {
         this.pvRecoveryService = pvRecoveryService;
      }

      [HttpGet]
      [Route("getpvrecoverylistbyoperator/{oper2:maxLength(4)}")]
      public IEnumerable<PvRecovery> GetPvRecoveryListByOperator(string oper2, int batchsize = 0, string fldlist = "")
      {
         return this.pvRecoveryService.GetPvRecoveryListByOperator(oper2, batchsize, fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvRecoveryService?.Dispose();
         base.Dispose(true);
      }
   }
}