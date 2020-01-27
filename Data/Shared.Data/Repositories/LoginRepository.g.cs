//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 21496 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.Collections.Generic;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;
    
namespace Infor.Sxe.Shared.Data.Repositories
{
   using Infor.Sxe.Shared.Data.Adapters;
   
   using Models.PdsContext;
   using Models.PdsUserLogin;
   using Models.Pdschangepassword;
   using Models.Pdcrtsasoofromifs;
   using Models.Complex;

   public partial class LoginRepository : RepositoryBase
   {
      private LoginAdapter adapter;
  
      public LoginRepository(IProgressConnection connection)
      {
         this.adapter = new LoginAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public LoginLoginResponseAPI Login(UserLogin UserLogin)
      {
         return this.adapter.Login(UserLogin);
      }
  
      public void Logout()
      {
         this.adapter.Logout();
      }
  
      public void RenewSession()
      {
         this.adapter.RenewSession();
      }
  
      public void ClearCoreSession(int iCompanyNumber, string cOperator)
      {
         this.adapter.ClearCoreSession(iCompanyNumber, cOperator);
      }
  
      public void ChangePassword(LoginChangePasswordRequestAPI LoginChangePasswordRequestAPI)
      {
         this.adapter.ChangePassword(LoginChangePasswordRequestAPI);
      }
  
      public Crtsasoofromifs CreateSASOOFromIFS(Crtsasoofromifs crtsasoofromifs)
      {
         return this.adapter.CreateSASOOFromIFS(crtsasoofromifs);
      }
  
      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }
         this.adapter?.Dispose();	
         this.adapter = null;
         base.Dispose(true);
      }
   }
}
#pragma warning restore 1591
  