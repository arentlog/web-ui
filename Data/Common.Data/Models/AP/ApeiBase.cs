using ServiceInterfaceClient.Attributes;

namespace Infor.Sxe.Common.Data.Models.AP
{
   public partial class ApeiBase
   {
      [DrillbackParam("id", 1), StringValidation]
      public string DrillBackRowId => this.rowID;
   }
}