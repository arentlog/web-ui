using System;

namespace General.Business.Interfaces.OE
{
   public interface IOeehService : IDisposable
   {
      bool OeehExistsForCustnoOrderNumberMinimumStage(decimal custno, int orderno, int ordersuf, int stagecd);
   }
}