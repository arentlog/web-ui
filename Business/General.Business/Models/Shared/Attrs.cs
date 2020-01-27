using System.Linq;

namespace General.Business.Models.Shared
{
   public class Attrs
   {
      public bool IsForProduct(string prod)
      {
         return attr?.Any(x => x.name == "Product_Number" && x.value == prod) ?? false;
      }

      public Attr[] attr { get; set; }
   }
}