using System;
using System.Collections.Generic;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicseps;

namespace General.Business.Interfaces.IC
{
   public interface IIcsepsService : IDisposable
   {
      IEnumerable<Icseps> GetListByPk(IcsepsGetListByPkRequestApi icsepsGetListByPkRequestApi);
   }
}