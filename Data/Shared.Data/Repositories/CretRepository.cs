namespace Infor.Sxe.Shared.Data.Repositories
{
   using Models.Pdscret;
   public partial class CretRepository
   {
      public Cret Get(int cono, int bankno, decimal checkno, int ckrectype, decimal vendno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, bankno, checkno, ckrectype, vendno, batchsize, fldList);
      }
   }
}