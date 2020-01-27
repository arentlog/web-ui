using System;
using General.Business.Models.SA;

namespace General.Business.Interfaces.SA
{
   public interface ICenpos : IDisposable
   {
      CenPosModel BuildCenPosUrl(
         string operation,
         int mediacd,
         decimal custno,
         string shipTo,
         string whse,
         string tokenId,
         string invoiceNo,
         string oneTimeType,
         decimal amountdecimal,
         bool runArsocPrecall,
         string ipaddress = "",
         decimal taxAmount = 0);
   }
}