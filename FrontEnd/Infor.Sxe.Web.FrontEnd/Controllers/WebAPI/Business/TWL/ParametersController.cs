using System.Web.Http;
using General.Business.Interfaces.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsparameters;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/parameters")]
   public class ParametersController : ApiControllerBase
   {
      private readonly IParametersService parametersService;

      public ParametersController(IParametersService parametersService)
      {
         this.parametersService = parametersService;
      }

      [HttpGet]
      [Route("getforcompany/{coNum:maxLength(4)}")]
      public Parameters GetForCompany(string coNum, int batchsize = 0, string fldlist = "")
      {
         return this.parametersService.GetForCompany(coNum, batchsize, fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.parametersService?.Dispose();
         base.Dispose(true);
      }
   }
}