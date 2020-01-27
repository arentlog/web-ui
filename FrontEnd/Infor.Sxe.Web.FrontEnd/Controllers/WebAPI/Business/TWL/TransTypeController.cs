using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdstransType;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/transtype")]
   public class TransTypeController : ApiControllerBase
   {
      private readonly ITransTypeService transTypeService;

      public TransTypeController(ITransTypeService transTypeService)
      {
         this.transTypeService = transTypeService;
      }

      [HttpPost]
      [Route("gettwltranstypes")]
      public IEnumerable<TransType> GetTWLTransTypes(GetTWLTransTypesApi getTWLTransTypesApi)
      {
         return this.transTypeService.GetTWLTransTypes(getTWLTransTypesApi);
      }

      [HttpGet]
      [Route("gettwltranstypes")]
      public IEnumerable<TransType> GetTWLTransTypes(int batchsize = 0, string fldlist = "")
      {
         var getTWLTransTypesApi = new GetTWLTransTypesApi()
         {
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.transTypeService.GetTWLTransTypes(getTWLTransTypesApi);
      }      

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.transTypeService?.Dispose();
         base.Dispose(true);
      }
   }
}