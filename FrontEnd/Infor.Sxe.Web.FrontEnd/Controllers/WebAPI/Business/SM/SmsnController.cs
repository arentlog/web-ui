using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SM;
using General.Business.Models.SM;
using Infor.Sxe.SM.Data.Models.Pdssmsn;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SM
{
   [RoutePrefix("api/sm/smsn")]
   public class SmsnController : ApiControllerBase
   {
      private readonly ISmsnService smsnService;

      public SmsnController(ISmsnService smsnService)
      {
         this.smsnService = smsnService;
      }

      [HttpPost]
      [Route("getsmsnlistbysalesrepandname")]

      public IEnumerable<Smsn> GetSmsnListBySalesRepAndName(GetSmsnListBySalesRepAndNameRequestApi GetSmsnListBySalesRepAndNameRequestApi)
      {
         return this.smsnService.GetSmsnListBySalesRepAndName(GetSmsnListBySalesRepAndNameRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.smsnService?.Dispose();
         base.Dispose(true);
      }
   }
}