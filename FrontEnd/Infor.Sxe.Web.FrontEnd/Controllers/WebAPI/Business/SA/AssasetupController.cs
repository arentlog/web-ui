using System.Web.Http;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/assasetup")]
   public class AssasetupController : ApiControllerBase
   {
      private readonly AssasetupRepository repository;

      public AssasetupController(AssasetupRepository repository)
      {
         this.repository = repository;

      }

      [Route("sassegetnextwithparam")]
      [HttpGet]
      public int SASSEGetNextByParam(int ierrorno = 0, string ctrmgrlang = "")
      {
         return this.repository.SASSEGetNext(ierrorno, ctrmgrlang);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.repository?.Dispose();
         base.Dispose(true);
      }
   }
}