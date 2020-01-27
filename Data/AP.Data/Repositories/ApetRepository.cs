using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.AP.Data.Repositories
{
   public partial class ApetRepository : IUseKeys
   {
      public bool UseKeys => false;
   }
}
