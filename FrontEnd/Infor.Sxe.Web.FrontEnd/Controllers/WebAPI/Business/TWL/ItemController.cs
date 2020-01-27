using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsitem;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/item")]
   public class ItemController : ApiControllerBase
   {
      private readonly IItemService itemService;

      public ItemController(IItemService itemService)
      {
         this.itemService = itemService;
      }

      [HttpPost]
      [Route("gettwlitems")]
      public IEnumerable<Item> GetTWLItems(GetTWLItemsApi getTWLItemsApi)
      {
         return this.itemService.GetTWLItems(getTWLItemsApi);
      }

      [HttpGet]
      [Route("gettwlitems/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{absNum:maxLength(60)}/{itemType:maxLength(10)}/{prodGrp:maxLength(14)}")]
      public IEnumerable<Item> GetTWLItems(string coNum, string whNum, string absNum, string itemType, string prodGrp, int batchsize = 0, string fldlist = "")
      {
         var getTWLItemsApi = new GetTWLItemsApi()
         {
            coNum = coNum,
            whNum = whNum,
            absNum = absNum,
            itemType = itemType,
            prodGrp = prodGrp,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.itemService.GetTWLItems(getTWLItemsApi);
      }

      [HttpGet]
      [Route("gettwlitems/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Item> GetTWLItems(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLItemsApi = new GetTWLItemsApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.itemService.GetTWLItems(getTWLItemsApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.itemService?.Dispose();
         base.Dispose(true);
      }
   }
}