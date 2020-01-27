using System.Collections.Generic;
using General.Business.Enums.Shared;
using Infor.Sxe.Shared.Data.Models.PdsUserLogin;
using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class PreLoginResults
   {
      public PreLoginModes LoginMode { get; set; }
      public List<string> AvailableTenants { get; set; }
      public List<AvailUsers> AvailableLogin { get; set; }
      [StringValidation]
      public string DefaultLogin { get; set; }
   }
}