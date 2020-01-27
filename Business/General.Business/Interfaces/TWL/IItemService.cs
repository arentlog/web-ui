using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsitem;

namespace General.Business.Interfaces.TWL
{
   public interface IItemService : IDisposable
   {
      IEnumerable<Item> GetTWLItems(GetTWLItemsApi getTWLItemsApi);
   }
}