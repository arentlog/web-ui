using General.Business.Interfaces.Shared;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Progress;

namespace General.Business.Services.Shared
{
   public class AoSharedService : ServiceBase, IAoSharedService
   {
      private readonly ProgressConfiguration _progressConfiguration;

      public AoSharedService(ProgressConfiguration progressConfiguration)
      {
         this._progressConfiguration = progressConfiguration;
      }

      public bool CheckCredentials(string password)
      {
         return password.Equals(this._progressConfiguration.InforAoPassword);
      }
   }
}