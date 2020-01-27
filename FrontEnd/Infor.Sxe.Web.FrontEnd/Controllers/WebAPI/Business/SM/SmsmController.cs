using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SM;
using General.Business.Models.SM;
using Infor.Sxe.SM.Data.Models.Pdssmsm;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SM
{
   [RoutePrefix("api/sm/smsm")]
   public class SmsmController : ApiControllerBase
   {
      private readonly ISmsmService smsmService;

      public SmsmController(ISmsmService smsmService)
      {
         this.smsmService = smsmService;
      }

      [HttpPost]
      [Route("getsmsmes")]

      public IEnumerable<Smsm> GetSmsmes(GetSmsmesRequestApi GetSmsmesRequestApi)
      {
         return this.smsmService.GetSmsmes(GetSmsmesRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.smsmService?.Dispose();
         base.Dispose(true);
      }
   }
}