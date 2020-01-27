using System;
using System.Collections.Generic;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicamue;

namespace General.Business.Interfaces.IC
{
   public interface IIcamueService : IDisposable
   {
      IEnumerable<Icamue> GetIcamueList(GetIcamueListRequestApi getIcamueListRequestApi);
   }
}