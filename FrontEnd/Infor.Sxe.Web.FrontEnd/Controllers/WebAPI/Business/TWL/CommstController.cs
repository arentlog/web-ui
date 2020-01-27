using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscommst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/commst")]
   public class CommstController : ApiControllerBase
   {
      private readonly ICommstService commstService;

      public CommstController(ICommstService commstService)
      {
         this.commstService = commstService;
      }

      [HttpPost]
      [Route("gettwlcommstinterfaces")]
      public IEnumerable<Commst> GetTWLCommstInterfaces(GetTWLCommstInterfacesApi getTWLCommstInterfacesApi)
      {
         return this.commstService.GetTWLCommstInterfaces(getTWLCommstInterfacesApi);
      }

      [HttpGet]
      [Route("gettwlcommstinterfaces/{recordType:maxLength(16)}/{version:maxLength(12)}")]
      public IEnumerable<Commst> GetTWLCommstInterfaces(string recordType, string version, int batchsize = 0, string fldlist = "")
      {
         var getTWLCommstInterfacesApi = new GetTWLCommstInterfacesApi()
         {
            recordType = recordType,
            version = version,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.commstService.GetTWLCommstInterfaces(getTWLCommstInterfacesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.commstService?.Dispose();
         base.Dispose(true);
      }
   }
}