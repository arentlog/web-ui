using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssabs;

namespace General.Business.Interfaces.SA
{
   public interface ISabsService : IDisposable
   {
      IEnumerable<Sabs> GetSabssWithBlankGroupName(GetSabssWithBlankGroupNameRequestApi getSabssWithBlankGroupNameRequestApi);
   }
}