using System.Text;
using General.Business.Interfaces.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsparameters;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class ParametersService : ServiceBase, IParametersService
   {
      private readonly ParametersRepository parametersRepository;

      public ParametersService(ParametersRepository parametersRepository)
      {
         this.parametersRepository = parametersRepository;
      }

      public Parameters GetForCompany(string coNum, int batchsize, string fldList)
      {
         var sb = new StringBuilder();
         var result = new Parameters();
         sb.AppendFormatWithEscape("parameters.co_num = '{0}' and parameters.wh_num = ''", coNum);
         var where = sb.ToString();
         var results = this.parametersRepository.GetList(where, batchsize, fldList);
         foreach (var row in results)
         {
            result = row;
         }
         return result;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.parametersRepository?.Dispose();
         base.Dispose(true);
      }
   }
}