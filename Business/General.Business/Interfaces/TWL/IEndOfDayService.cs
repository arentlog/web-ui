using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsendOfDay;

namespace General.Business.Interfaces.TWL
{
   public interface IEndOfDayService : IDisposable
   {
      IEnumerable<EndOfDay> GetTWLEndOfDays(GetTWLEndOfDaysApi getTWLEndOfDaysApi);
   }
}