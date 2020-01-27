using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscomdet;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/comdet")]
   public class ComdetController : ApiControllerBase
   {
      private readonly IComdetService comdetService;

      public ComdetController(IComdetService comdetService)
      {
         this.comdetService = comdetService;
      }

      [HttpPost]
      [Route("gettwlcomdetinterfaces")]
      public IEnumerable<Comdet> GetTWLComdetInterfaces(GetTWLComdetInterfacesApi getTWLComdetInterfacesApi)
      {
         return this.comdetService.GetTWLComdetInterfaces(getTWLComdetInterfacesApi);
      }

      [HttpGet]
      [Route("gettwlcomdetinterfaces/{recordType:maxLength(16)}/{version:maxLength(12)}")]
      public IEnumerable<Comdet> GetTWLComdetInterfaces(string recordType, string version, int batchsize = 0, string fldlist = "")
      {
         var getTWLComdetInterfacesApi = new GetTWLComdetInterfacesApi()
         {
            recordType = recordType,
            version = version,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.comdetService.GetTWLComdetInterfaces(getTWLComdetInterfacesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.comdetService?.Dispose();
         base.Dispose(true);
      }
   }
}