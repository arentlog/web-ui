using Infor.Sxe.SW.Data.Models.Pdsswicsp;

namespace Infor.Sxe.SW.Data.Repositories
{
   public partial class SwicspRepository
   {
      public Swicsp GetByProdWithStatusFl(int cono, string prod, string setupfl, int batchsize, string fldlist)
      {
         return this.adapter.GetByProdWithStatusFl(cono, prod, setupfl, batchsize, fldlist);
      }
   }
}