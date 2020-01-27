using General.Business.Interfaces.TWL;
using Infor.Sxe.TWL.Data.Models.Pdswlpasswd;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.TWL
{
   public class WlpasswdService : ServiceBase, IWlpasswdService
   {
      private readonly WlpasswdRepository wlpasswdRepository;

      public WlpasswdService(WlpasswdRepository wlpasswdRepository)
      {
         this.wlpasswdRepository = wlpasswdRepository;
      }

      public Wlpasswd GetTWLSecurity(int batchsize, string fldList)
      {
         var result = new Wlpasswd();
         var where = string.Empty;

         var results = wlpasswdRepository.GetList(where, batchsize, fldList);
         foreach (var row in results)
         {
            result = row;
            if (result != null)
            {
               break;
            }
         }
         return result;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.wlpasswdRepository?.Dispose();
         base.Dispose(true);
      }
   }
}