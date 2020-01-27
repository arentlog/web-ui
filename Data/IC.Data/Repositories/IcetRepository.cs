using System;
using Infor.Sxe.IC.Data.Models.Pdsicet;

using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.IC.Data.Repositories
{
   public partial class IcetRepository : IUseKeys
   {
      public bool UseKeys => false;

      public Icet GetBusinessContext(int cono, string whse, string prod, DateTime? postdt, string transtype)
      {
         return this.Get(cono, whse, prod, postdt, transtype, 1, string.Empty);
      }
   }
}