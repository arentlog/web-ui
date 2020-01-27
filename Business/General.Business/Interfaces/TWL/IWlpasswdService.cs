using System;
using Infor.Sxe.TWL.Data.Models.Pdswlpasswd;

namespace General.Business.Interfaces.TWL
{
   public interface IWlpasswdService : IDisposable
   {
      Wlpasswd GetTWLSecurity(int batchsize, string fldList);
   }
}