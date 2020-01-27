using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssaspg;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.SA
{
   public class SaspgService : ServiceBase, ISaspgService
   {
      private readonly SaspgRepository saspgRepository;

      public SaspgService(SaspgRepository saspgRepository)
      {
         this.saspgRepository = saspgRepository;
      }

      public IEnumerable<Saspg> GetSaspgPrinterGroup(GetSaspgPrinterGroupRequestApi getSaspgPrinterGroupRequestApi)
      {
         var sb = new StringBuilder();

         sb.Append($"saspg.saspgroup Begins '{getSaspgPrinterGroupRequestApi.@group}'");
         var where = sb.ToString();
         return this.saspgRepository.GetList(where, getSaspgPrinterGroupRequestApi.batchsize, getSaspgPrinterGroupRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.saspgRepository?.Dispose();
         base.Dispose(true);
      }
   }
}