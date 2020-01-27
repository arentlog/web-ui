using System.Linq;
using System.Text;
using General.Business.Interfaces.OE;
using Infor.Sxe.OE.Data.Repositories;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.OE.Business.Services
{
   public class OeehService : ServiceBase, IOeehService
   {
      private readonly OeehRepository oeehrepository;
      public OeehService(OeehRepository oeehrepository)
      {
         this.oeehrepository = oeehrepository;
      }

      public bool OeehExistsForCustnoOrderNumberMinimumStage(decimal custno, int orderno, int ordersuf, int stagecd)
      {
         var sb = new StringBuilder();
         sb.Append($"oeeh.cono = {this.oeehrepository.Cono}");
         sb.Append($" AND oeeh.custno = {custno}");
         sb.Append($" AND oeeh.orderno = {orderno}");
         sb.Append($" AND oeeh.ordersuf = {ordersuf}");
         sb.Append($" AND oeeh.stagecd > {stagecd}");
         var where = sb.ToString();
         var oeehList = this.oeehrepository.GetList(where, false, 1, "cono");
         return (oeehList != null && oeehList.Any());
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.oeehrepository?.Dispose();
         base.Dispose(true);
      }
   }
}