using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.Pdsauthpoints;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.Shared
{
   [RoutePrefix("api/shared/authpoints")]
   public class AuthpointsController : ApiControllerBase
   {
      private readonly IAuthpointsService authpointsService;

      public AuthpointsController(IAuthpointsService authpointsService)
      {
         this.authpointsService = authpointsService;
      }

      [HttpPost]
      [Route("getauthorizationpoints")]
      public IEnumerable<Authpoints> GetAuthorizationPoints(GetAuthorizationPointsApi criteria)
      {
         return this.authpointsService.GetAuthorizationPoints(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.authpointsService?.Dispose();
         base.Dispose(true);
      }
   }
}