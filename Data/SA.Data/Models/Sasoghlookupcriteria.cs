using ServiceInterfaceClient.Attributes;

namespace Infor.Sxe.SA.Data.Models
{
   public class Sasoghlookupcriteria
   {
      [StringValidation]
      public string groupname { get; set; }
      public int recordcountlimit { get; set; }
   }
}