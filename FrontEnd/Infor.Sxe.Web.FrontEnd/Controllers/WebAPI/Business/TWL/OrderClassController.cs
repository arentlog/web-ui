using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsorderClass;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/orderclass")]
   public class OrderClassController : ApiControllerBase
   {
      private readonly IOrderClassService orderClassService;

      public OrderClassController(IOrderClassService orderClassService)
      {
         this.orderClassService = orderClassService;
      }

      [HttpPost]
      [Route("gettwlorderclasses")]
      public IEnumerable<OrderClass> GetTWLOrderClasses(GetTWLOrderClassesApi getTWLOrderClassesApi)
      {
         return this.orderClassService.GetTWLOrderClasses(getTWLOrderClassesApi);
      }

      [HttpGet]
      [Route("gettwlorderclasses/{code:maxLength(11)}/{name:MaxLength(22)}")]
      public IEnumerable<OrderClass> GetTWLOrderClasses(string code, string name, int batchsize = 0, string fldlist = "")
      {
         var getTWLOrderClassesApi = new GetTWLOrderClassesApi()
         {
            code = code,
            name = name,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.orderClassService.GetTWLOrderClasses(getTWLOrderClassesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.orderClassService?.Dispose();
         base.Dispose(true);
      }
   }
}