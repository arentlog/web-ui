using System;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models;

namespace General.Business.Interfaces.Shared
{
   public interface ILoginService : IDisposable
   {
      LoginResponseModel Login(LoginRequestModel loginRequest, string host);
      PreLoginResults PreLogin(string host);
      string ClearOperator(LoginRequestModel loginRequest, string host);
      LogoutResults Logout(LoginRequestModel loginRequest, string host, Guid sessionId);
      long Renew(LoginRequestModel loginRequest, string host, Guid sessionId);
      string ChangePassword(ChangePasswordRequestModel changePasswordRequestModel, string host);
   }
}