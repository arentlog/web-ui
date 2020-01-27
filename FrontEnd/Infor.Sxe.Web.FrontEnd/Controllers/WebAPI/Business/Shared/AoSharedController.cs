using System.Web.Http;
using General.Business.Interfaces.Shared;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.Shared
{
   [RoutePrefix("api/shared/authpoints")]
   public class AoSharedController : ApiControllerBase
   {
      private readonly IAoSharedService _aoSharedService;

      public AoSharedController(IAoSharedService aoSharedService)
      {
         this._aoSharedService = aoSharedService;
      }

      [HttpGet]
      [Route("checkcredentials")]
      public bool CheckCredentials(string password)
      {
         return this._aoSharedService.CheckCredentials(password);
      }
   }
}