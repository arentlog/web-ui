using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdswave;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/wave")]
   public class WaveController : ApiControllerBase
   {
      private readonly IWaveService waveService;

      public WaveController(IWaveService waveService)
      {
         this.waveService = waveService;
      }

      [HttpPost]
      [Route("gettwlwaves")]
      public IEnumerable<Wave> GetTWLWaves(GetTWLWavesApi getTWLWavesApi)
      {
         return this.waveService.GetTWLWaves(getTWLWavesApi);
      }
      
      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.waveService?.Dispose();
         base.Dispose(true);
      }
   }
}