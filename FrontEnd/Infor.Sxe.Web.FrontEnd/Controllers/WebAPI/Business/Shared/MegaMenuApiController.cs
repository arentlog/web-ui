using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.Shared
{
   /// <summary>
   /// Functions for formatting the megaMenu to a more useable form
   /// </summary>
   [RoutePrefix("api/shared/megamenu")]
   public class MegaMenuApiController : ApiControllerBase
   {
      private readonly IMegaMenuService megaMenuService;

      public MegaMenuApiController(IMegaMenuService megaMenuService)
      {
         this.megaMenuService = megaMenuService;
      }

      /// <summary>
      /// Build usable, tiered mega menu list
      /// </summary>
      [HttpGet]
      [Route("buildmegamenu")]
      public List<TopLevelList> GetMegaMenu()
      {
         var megaMenu =  megaMenuService.BuildMegaMenu();
         if (megaMenu != null)
         {
            return megaMenu;
         }
         return new List<TopLevelList>();
      }

      /// <summary>
      /// Compile list of available menu functions
      /// </summary>
      [HttpGet]
      [Route("buildmenufunctionlist")]
      public List<MenuDetailsModel> GetMenuFunctions()
      {
         var menuFunctionDictionary = megaMenuService.BuildMenuFunctions();
         if (menuFunctionDictionary != null)
         {
               return menuFunctionDictionary;
         }
         return new List<MenuDetailsModel>();
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.megaMenuService?.Dispose();
         base.Dispose(true);
      }
   }
}