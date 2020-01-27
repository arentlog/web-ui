using System;
using System.Collections.Generic;
using Infor.Sxe.PO.Data.Models.Pdspoebtdeletebatch;
using Infor.Sxe.PO.Data.Models.Pdspoebtupdatedata;

namespace General.Business.Interfaces.PO
{
   public interface IAspoentryService : IDisposable
   {
      void PoebtDeleteBatchCollection(IEnumerable<Poebtdeletebatch> poebtdeletebatchCollection);

      void PoebtUpdateCollection(IEnumerable<Poebtupdatedata> poebtupdateCollection);
   }
}