using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdswave;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class WaveService : ServiceBase, IWaveService
   {
      private readonly WaveRepository waveRepository;

      public WaveService(WaveRepository waveRepository)
      {
         this.waveRepository = waveRepository;
      }

      public IEnumerable<Wave> GetTWLWaves(GetTWLWavesApi getTWLWavesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLWavesApi.coNum))
         {
            sb.AppendFormatWithEscape("wave.co_num = '{0}'", getTWLWavesApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLWavesApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND wave.wh_num = '{0}'", getTWLWavesApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLWavesApi.batch))
            {
               sb.AppendFormatWithEscape(" AND wave.batch {0} '{1}'",getTWLWavesApi.batchEquality , getTWLWavesApi.batch);
            }
            switch (getTWLWavesApi.waveStatus)
            {
               case "Open":
               case "Unfinished":
                  sb.AppendFormatWithEscape(" AND LENGTH ( TRIM ( wave.active_date_time ) ) = 0");
                  sb.AppendFormatWithEscape(" AND LENGTH ( TRIM ( wave.ship_date_time ) ) = 0");
                  break;
               case "Complete":
                  sb.AppendFormatWithEscape(" AND LENGTH ( TRIM ( wave.ship_date_time ) ) > 0");
                  break;
               case "Active":
                  sb.AppendFormatWithEscape(" AND LENGTH ( TRIM ( wave.active_date_time ) ) > 0");
                  sb.AppendFormatWithEscape(" AND LENGTH ( TRIM ( wave.ship_date_time ) ) = 0");
                  break;
            }
            if (getTWLWavesApi.dropDateFrom != null)
            {
               sb.AppendFormatWithEscape(" AND wave.drop_date_time GE '{0}'", getTWLWavesApi.dropDateFrom);
            }
            if (getTWLWavesApi.dropDateTo != null)
            {
               sb.AppendFormatWithEscape(" AND wave.drop_date_time LE '{0}'", getTWLWavesApi.dropDateTo);
            }
         }
         var where = sb.ToString();
         return this.waveRepository.GetList(where, getTWLWavesApi.batchsize, getTWLWavesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.waveRepository?.Dispose();
         base.Dispose(true);
      }
   }
}