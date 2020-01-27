using System.Collections.Generic;
using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.SA
{
   public class DeleteSaegGroupsByOperRequestApi
   {
      public List<string> groupNames { get; set; }

      [StringValidation]
      public string oper { get; set; }
   }
}