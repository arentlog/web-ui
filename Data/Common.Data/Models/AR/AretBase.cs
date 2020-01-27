using ServiceInterfaceClient.Attributes;

namespace Infor.Sxe.Common.Data.Models.AR
{
   public partial class AretBase
   {

      [BodID(1, RequiredId.True), StringValidation]
      public string CompoundBodId => $"{this.custno}-{this.jrnlno}-{this.invno}-{this.invsuf}-{this.seqno:D3}";
   }
}