using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicseps;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.IC
{
   [RoutePrefix("api/ic/icseps")]
   public class IcsepsController : ApiControllerBase
   {
      private readonly IIcsepsService service;

      public IcsepsController(IIcsepsService service)
      {
         this.service = service;
      }

      [HttpPost]
      [Route("getlistbypk")]
      public IEnumerable<Icseps> GetListByPk(IcsepsGetListByPkRequestApi icsepsGetListByPkRequestApi)
      {
         return this.service.GetListByPk(icsepsGetListByPkRequestApi);
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