using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdstransType;

namespace General.Business.Interfaces.TWL
{
   public interface ITransTypeService : IDisposable
   {
      IEnumerable<TransType> GetTWLTransTypes(GetTWLTransTypesApi getTWLTransTypesApi);
   }
}