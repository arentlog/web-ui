using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsendOfDay;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class EndOfDayService : ServiceBase, IEndOfDayService
   {
      private readonly EndOfDayRepository endOfDayRepository;

      public EndOfDayService(EndOfDayRepository endOfDayRepository)
      {
         this.endOfDayRepository = endOfDayRepository;
      }

      public IEnumerable<EndOfDay> GetTWLEndOfDays(GetTWLEndOfDaysApi getTWLEndOfDaysApi)
        {
            var sb = new StringBuilder();
            if (!string.IsNullOrWhiteSpace(getTWLEndOfDaysApi.recType))
            {
                sb.AppendFormatWithEscape("end_of_day.rec_type = '{0}'", getTWLEndOfDaysApi.recType);
            }
            var where = sb.ToString();
            return this.endOfDayRepository.GetList(where, getTWLEndOfDaysApi.batchsize, getTWLEndOfDaysApi.fldlist);
        }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.endOfDayRepository?.Dispose();
         base.Dispose(true);
      }
   }
}