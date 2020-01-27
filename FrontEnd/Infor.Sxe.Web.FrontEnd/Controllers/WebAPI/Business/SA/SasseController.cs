using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasse;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sasse")]
   public class SasseController : ApiControllerBase
   {
      private readonly ISasseService sasseService;

      public SasseController(ISasseService sasseService)
      {
         this.sasseService = sasseService;
      }

      [HttpPost]
      [Route("getsasselistallbyerrorandlang")]
      public IEnumerable<Sasse> GetSasseListAllByErrorAndLang(GetSasseListAllByErrorAndLangRequestApi getSasseListAllByErrorAndLangRequestApi)
      {
         return this.sasseService.GetSasseListAllByErrorAndLang(getSasseListAllByErrorAndLangRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasseService?.Dispose();
         base.Dispose(true);
      }
   }
}