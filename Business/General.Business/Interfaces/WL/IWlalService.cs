using System;
using System.Collections.Generic;
using General.Business.Models.WL;
using Infor.Sxe.WL.Data.Models.Pdswlal;

namespace General.Business.Interfaces.WL
{
   public interface IWlalService : IDisposable
   {
      IEnumerable<Wlal> GetWlalByLocationDescription(GetWlalByLocationDescriptionApi getWlalByLocationDescriptionApi);
   }
}