using System.Web.Http;
using General.Business.Interfaces.TWL;
using Infor.Sxe.TWL.Data.Models.Pdswlpasswd;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/wlpasswd")]
   public class WlpasswdController : ApiControllerBase
   {
      private readonly IWlpasswdService wlpasswdService;

      public WlpasswdController(IWlpasswdService wlpasswdService)
      {
         this.wlpasswdService = wlpasswdService;
      }

      [HttpGet]
      [Route("gettwlsecurity")]
      public Wlpasswd GetTWLSecurity(int batchsize = 0, string fldlist = "")
      {
         return this.wlpasswdService.GetTWLSecurity(batchsize, fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.wlpasswdService?.Dispose();
         base.Dispose(true);
      }
   }
}