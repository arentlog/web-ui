using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PD;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Complex;
using Infor.Sxe.PD.Data.Models.Pdsmessaging;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PD
{
   [RoutePrefix("api/pd/aspdentry")]
   public partial class AspdentryController : ApiControllerBase
   {
      private readonly IAspdentryService service;

      public AspdentryController(IAspdentryService service)
      {
         this.service = service;
      }

      [Route("pdemlookupdelimsourcetypes")]
      [HttpGet]
      public IEnumerable<PDEMLookupReturnModel> PDEMLookupDelimSourceTypes()
      {
         return this.service.PDEMLookupDelimSourceTypes();
      }

      [Route("pdemgridupdatepdsc1multiple")]
      [HttpPost]
      public IEnumerable<Messaging> PDEMGridUpdatePDSC1Multiple(IEnumerable<AspdentryPDEMGridUpdatePDSC1RequestAPI> requestAPIList)
      {
          return this.service.PDEMGridUpdatePDSC1Multiple(requestAPIList);
      }

      [Route("pdemgridupdatepdsc2multiple")]
      [HttpPost]
      public IEnumerable<Messaging> PDEMGridUpdatePDSC2Multiple(IEnumerable<AspdentryPDEMGridUpdatePDSC2RequestAPI> requestAPIList)
      {
          return this.service.PDEMGridUpdatePDSC2Multiple(requestAPIList);
      }
        
      [Route("pdemgridupdatepdsc3multiple")]
      [HttpPost]
      public IEnumerable<Messaging> PDEMGridUpdatePDSC3Multiple(IEnumerable<AspdentryPDEMGridUpdatePDSC3RequestAPI> requestAPIList)
      {
          return this.service.PDEMGridUpdatePDSC3Multiple(requestAPIList);
      }

      [Route("pdemgridupdatepdsrmultiple")]
      [HttpPost]
      public IEnumerable<Messaging> PDEMGridUpdatePDSRMultiple(IEnumerable<AspdentryPDEMGridUpdatePDSRRequestAPI> requestAPIList)
      {
          return this.service.PDEMGridUpdatePDSRMultiple(requestAPIList);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.service?.Dispose();
         base.Dispose(true);
      }
   }
}