using Infor.Sxe.AR.Data.Models.Pdsaret;

using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.AR.Data.Repositories
{
   public partial class AretRepository : IUseKeys
   {
      public bool UseKeys => false;

      public Aret GetBusinessContext(int cono, int jrnlno, int setno)
      {
         return this.Get(cono, jrnlno, setno, 1, string.Empty);
      }
   }
}