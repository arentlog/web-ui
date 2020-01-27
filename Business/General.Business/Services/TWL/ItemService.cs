using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsitem;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class ItemService : ServiceBase, IItemService
   {
      private readonly ItemRepository itemRepository;

      public ItemService(ItemRepository itemRepository)
      {
         this.itemRepository = itemRepository;
      }

      public IEnumerable<Item> GetTWLItems(GetTWLItemsApi getTWLItemsApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLItemsApi.coNum))
         {
            sb.AppendFormatWithEscape("item.co_num = '{0}'", getTWLItemsApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLItemsApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND item.wh_num = '{0}'", getTWLItemsApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLItemsApi.absNum))
            {
               sb.AppendFormatWithEscape(" AND item.abs_num = '{0}'", getTWLItemsApi.absNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLItemsApi.itemType))
            {
               sb.AppendFormatWithEscape(" AND item.item_type = '{0}'", getTWLItemsApi.itemType);
            }
            if (!string.IsNullOrWhiteSpace(getTWLItemsApi.prodGrp))
            {
               sb.AppendFormatWithEscape(" AND item.prod_grp = '{0}'", getTWLItemsApi.prodGrp);
            }
         }
         var where = sb.ToString();
         return this.itemRepository.GetList(where, getTWLItemsApi.batchsize, getTWLItemsApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.itemRepository?.Dispose();
         base.Dispose(true);
      }
   }
}