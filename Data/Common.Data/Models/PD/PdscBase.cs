using ServiceInterfaceClient.Attributes;

namespace Infor.Sxe.Common.Data.Models.PD
{
   public partial class PdscBase
   {
      [DrillbackParam("id", 1)]
      public int DrillBackRowId => this.pdrecno;
   }
}