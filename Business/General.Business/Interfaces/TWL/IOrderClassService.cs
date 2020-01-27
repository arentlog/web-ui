using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsorderClass;

namespace General.Business.Interfaces.TWL
{
   public interface IOrderClassService : IDisposable
   {
      IEnumerable<OrderClass> GetTWLOrderClasses(GetTWLOrderClassesApi getTWLOrderClassesApi);
   }
}