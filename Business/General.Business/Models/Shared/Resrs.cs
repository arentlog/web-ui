using System.Linq;

namespace General.Business.Models.Shared
{
   public class Resrs
   {
      public string ReturnUrl(string imageType)
      {
         var url = this.res.FirstOrDefault(x => x.name == imageType);
         return url != null ? url.url : string.Empty;
      }

      public Re[] res { get; set; }
   }
}