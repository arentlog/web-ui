using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssassp;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sassp")]
   public class SasspController : ApiControllerBase
   {
      private readonly ISasspService sasspService;

      public SasspController(ISasspService sasspService)
      {
         this.sasspService = sasspService;
      }

      [HttpPost]
      [Route("getsassplistbyareacode")]
      public IEnumerable<Sassp> GetSasspListByAreaCode(GetSasspListByAreaCodeRequestApi getSasspListByAreaCodeRequestApi)
      {
         return this.sasspService.GetSasspListByAreaCode(getSasspListByAreaCodeRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasspService?.Dispose();
         base.Dispose(true);
      }
   }
}