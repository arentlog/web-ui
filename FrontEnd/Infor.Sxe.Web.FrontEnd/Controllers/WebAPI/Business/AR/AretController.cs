using System.Web.Http;
using General.Business.Interfaces.AR;
using Infor.Sxe.AR.Data.Models.Complex;
using Infor.Sxe.AR.Data.Models.Pdsaret;
using Infor.Sxe.AR.Data.Models.Pdsaretlookup;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.AR
{
   [RoutePrefix("api/ar/aret")]
   public class AretController : ApiControllerBase
   {
      private readonly IAretService service;

      public AretController(IAretService aretService)
      {
         this.service = aretService;
      }

      [HttpPost]
      [Route("lookupinvoicesequence")]
      public AretLookupResponseAPI LookupInvoiceSequence(Aretlookupcriteria aretlookupcriteria)
      {
         return this.service.LookupInvoiceSequence(aretlookupcriteria);
      }

      [HttpGet]
      [Route("getbyinvnoinvsufseqno")]
      public Aret GetByInvNoInvSufSeqNo(int invno, int invsuf, int seqno)
      {
         return this.service.GetByInvNoInvSufSeqNo(invno, invsuf, seqno);
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