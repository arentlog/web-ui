using System;
using System.Collections.Generic;
using General.Business.Models.PO;
using Infor.Sxe.PO.Data.Models.Pdspoerah;

namespace General.Business.Interfaces.PO
{
   public interface IPoerahService : IDisposable
   {
      IEnumerable<Poerah> GetPoerahListByVendWhseProdLine(GetPoerahListByVendWhseProdLineRequestApi getPoerahListByVendWhseProdLineRequestApi);
   }
}