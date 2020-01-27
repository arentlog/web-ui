using System.Linq;

namespace General.Business.Models.Shared
{
   public class Items
   {
      public string searchXQuery { get; set; }
      public Item[] item { get; set; }

      public string ReturnUrl(string prod, string imageType)
      {
         var itemFound = this.item?.FirstOrDefault(x => x.attrs.IsForProduct(prod));
         return itemFound != null ? itemFound.resrs.ReturnUrl(imageType) : string.Empty;
      }
   }
}