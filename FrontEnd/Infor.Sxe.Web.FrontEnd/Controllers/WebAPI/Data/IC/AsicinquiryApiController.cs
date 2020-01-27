using System.Collections.Generic;
using System.Web.Http;
using Infor.Sxe.IC.Data.Models.Pdsicir;
using Infor.Sxe.IC.Data.Models.Pdsicirquorders;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.IC
{
   public partial class AsicinquiryApiController
   {
      [Route("icirquordersbatch")]
      [HttpPost]
      public IEnumerable<Icirquorders> IcirquOrdersBatch(IEnumerable<Icirresults> icirresults)
      {
         var returnOrders = new List<Icirquorders>();
         foreach (var batch in icirresults.Batch(20))
         {
            var returnBatch = this.repository.ICIRQUOrders(batch);
            returnOrders.AddRange(returnBatch);
         }
         return returnOrders;
      }
   }
}