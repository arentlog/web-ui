using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssastn;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SastnService : ServiceBase, ISastnService
   {
      private readonly SastnRepository sastnRepository;

      public SastnService(SastnRepository sastnRepository)
      {
         this.sastnRepository = sastnRepository;
      }

      public IEnumerable<Sastn> GetSastnList(GetSastnListRequestApi getGetSastnListRequestApi)
      {
         var where = new StringBuilder();
         // First query - based on sastn.codeval.  It should be numeric search criteria for this first query
         // since sastn.codeval is an interger (but no Progress error occurs if alpha-numeric data is sent).
         where.Append($"sastn.cono = {this.sastnRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetSastnListRequestApi.codeiden))
         {
            where.AppendFormatWithEscape(" AND sastn.codeiden = '{0}'", getGetSastnListRequestApi.codeiden);
         }

         if (!string.IsNullOrEmpty(getGetSastnListRequestApi.codeval))
         {
            where.AppendFormatWithEscape(" AND sastn.codeval >= '{0}'", getGetSastnListRequestApi.codeval);
         }

         return this.sastnRepository.GetList(where.ToString(), getGetSastnListRequestApi.batchsize, getGetSastnListRequestApi.fldlist);
      }

      public IEnumerable<SastnLookupResponse> Lookup(SastnLookupRequest sastnLookupRequest)
      {
         sastnLookupRequest.term = sastnLookupRequest.term?.ToUpper() ?? string.Empty;
         var where = new StringBuilder();
         where.Append($"sastn.cono = {this.sastnRepository.Cono}");
         where.AppendFormatWithEscape(" AND sastn.codeiden = '{0}'", sastnLookupRequest.codeiden);
         var returnSastns = this.sastnRepository.GetList(where.ToString(), sastnLookupRequest.IsAutoComplete ? 500 : sastnLookupRequest.recordcountlimit, "codeiden,codeval,descrip,rowID");
         var list = new List<SastnLookupResponse>();
         foreach (var returnSastn in returnSastns)
         {
            var combinedValue = (returnSastn.codeval + returnSastn.descrip).ToUpper();
            if (combinedValue.Contains(sastnLookupRequest.term)) list.Add(new SastnLookupResponse {codeiden = returnSastn.codeiden, codeval = returnSastn.codeval, descrip = returnSastn.descrip, rowID = returnSastn.rowID});
            if (sastnLookupRequest.IsAutoComplete && list.Count == sastnLookupRequest.recordcountlimit)
            {
               break;
            }
         }
         return list;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sastnRepository?.Dispose();
         base.Dispose(true);
      }
   }
}