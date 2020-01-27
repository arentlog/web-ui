using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsbinmst;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class BinmstService : ServiceBase, IBinmstService
   {
      private readonly BinmstRepository binmstRepository;

      public BinmstService(BinmstRepository binmstRepository)
      {
         this.binmstRepository = binmstRepository;
      }

      public IEnumerable<Binmst> GetTWLBinLocations(GetTWLBinLocationsApi getTWLBinLocationsApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLBinLocationsApi.coNum))
         {
            sb.AppendFormatWithEscape("binmst.co_num = '{0}'", getTWLBinLocationsApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLBinLocationsApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND binmst.wh_num = '{0}'", getTWLBinLocationsApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLBinLocationsApi.binNum))
            {
               sb.AppendFormatWithEscape(" AND binmst.bin_num begins '{0}'", getTWLBinLocationsApi.binNum);
            }
         }
         var where = sb.ToString();
         return this.binmstRepository.GetList(where, getTWLBinLocationsApi.batchsize, getTWLBinLocationsApi.fldlist);
      }
      public IEnumerable<Binmst> GetTWLBinsNotActive(GetTWLBinsNotActiveApi getTWLBinsNotActiveApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLBinsNotActiveApi.coNum))
         {
            sb.AppendFormatWithEscape("binmst.co_num = '{0}'", getTWLBinsNotActiveApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLBinsNotActiveApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND binmst.wh_num = '{0}'", getTWLBinsNotActiveApi.whNum);
            }
            sb.AppendFormatWithEscape(" AND binmst.row_status = false");
         }
         var where = sb.ToString();
         return this.binmstRepository.GetList(where, getTWLBinsNotActiveApi.batchsize, getTWLBinsNotActiveApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.binmstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}