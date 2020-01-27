using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsautodrpcfg;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/autodrpcfg")]
   public class AutodrpcfgController : ApiControllerBase
   {
      private readonly IAutodrpcfgService autodropcfgService;

      public AutodrpcfgController(IAutodrpcfgService autodropcfgService)
      {
         this.autodropcfgService = autodropcfgService;
      }

      [HttpPost]
      [Route("gettwlautodropconfigs")]
      public IEnumerable<Autodrpcfg> GetTWLAutoDropConfigs(GetTWLAutoDropConfigsApi getTWLAutoDropConfigsApi)
      {
         return this.autodropcfgService.GetTWLAutoDropConfigs(getTWLAutoDropConfigsApi);
      }

      [HttpGet]
      [Route("gettwlautodropconfigs/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Autodrpcfg> GetTWLAutoDropConfigs(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLAutoDropConfigsApi = new GetTWLAutoDropConfigsApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist,
         };
         return this.autodropcfgService.GetTWLAutoDropConfigs(getTWLAutoDropConfigsApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.autodropcfgService?.Dispose();
         base.Dispose(true);
      }
   }
}