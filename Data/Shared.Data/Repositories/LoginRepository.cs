using System;
using Infor.Sxe.Shared.Data.Adapters;
using Infor.Sxe.Shared.Data.Models;
using Infor.Sxe.Shared.Data.Models.Pdschangepassword;
using ServiceInterfaceClient.Progress;
using Infor.Sxe.Shared.Data.Models.Pdcrtsasoofromifs;

namespace Infor.Sxe.Shared.Data.Repositories
{
   public class LoginRepository : IDisposable
   {
      private readonly LoginAdapter loginAdapter;

      public LoginRepository(IProgressConnection connection)
      {
         this.loginAdapter = new LoginAdapter(connection);
      }

      public LoginInternalResult Login(string username, string password, int companyNumber, string languageId, bool firstLogin, bool singleTenant)
      {
         return this.loginAdapter.Login(username, password, companyNumber, languageId, firstLogin, singleTenant);
      }

      public Crtsasoofromifs CreateSASOOFromIFS(Crtsasoofromifs crtsasoofromifs)
      {
         return this.loginAdapter.CreateSasooFromIfs(crtsasoofromifs);
      }

      public long Renew(Guid sessionId, string username, int companyNumber)
      {
         return this.loginAdapter.Renew(sessionId, username, companyNumber);
      }

      public LogoutResults Logout(Guid sessionId, string username, int companyNumber)
      {
         return this.loginAdapter.Logout(sessionId, username, companyNumber);
      }

      public string ChangePassword(Changepassword changePassword, int companyNumber)
      {
         return this.loginAdapter.ChangePassword(changePassword, companyNumber);
      }

      public string ClearOperator(int cono, string oper)
      {
         return this.loginAdapter.ClearOperator(cono, oper);
      }

      protected bool disposed;

      public void Dispose()
      {
         this.Dispose(true);
         GC.SuppressFinalize(this);
      }

      ~LoginRepository()
      {
         this.Dispose(false);
      }

      protected void Dispose(bool disposing)
      {
         if (this.disposed)
         {
            return;
         }
         if (disposing)
         {
            this.loginAdapter?.Dispose();
         }
         this.disposed = true;
      }
   }
}