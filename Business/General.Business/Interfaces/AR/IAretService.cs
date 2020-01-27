using System;
using Infor.Sxe.AR.Data.Models.Complex;
using Infor.Sxe.AR.Data.Models.Pdsaret;
using Infor.Sxe.AR.Data.Models.Pdsaretlookup;

namespace General.Business.Interfaces.AR
{
   public interface IAretService : IDisposable
   {
      AretLookupResponseAPI LookupInvoiceSequence(Aretlookupcriteria aretlookupcriteria);

      Aret GetByInvNoInvSufSeqNo(int invno, int invsuf, int seqno);
   }
}