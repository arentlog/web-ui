using System.Collections.Generic;
using System.Linq;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Repositories;
using Infor.Sxe.Shared.Data.Models.Pdsmenusecurity;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.Shared
{
   using System.Globalization;

   public class MegaMenuService : ServiceBase, IMegaMenuService
   {
      private readonly AssharedentryRepository assharedentryRepository;

      public MegaMenuService(AssharedentryRepository assharedentryRepository)
      {
         this.assharedentryRepository = assharedentryRepository;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.assharedentryRepository?.Dispose();
         base.Dispose(true);
      }

      public List<TopLevelList> BuildMegaMenu()
      {
         var menuFunctionList = this.assharedentryRepository.MenuFunctionSecuritySettings(string.Empty);

         if (menuFunctionList != null)
         {
            var megaMenu = new MegaMenuModel
                              {
                                 TopLevelMenus = menuFunctionList.menusecuritytop,
                                 SecondLevelMenues = menuFunctionList.menusecuritymenu,
                                 MenuFunctions = menuFunctionList.menusecurityfunction
                              };


            return megaMenu.BuildList();
         }
         return new List<TopLevelList>();
      }

      public List<MenuDetailsModel> BuildMenuFunctions()
      {
         var menuFunctionList = this.assharedentryRepository.MenuFunctionSecuritySettings(string.Empty);
         var menuDetailsList = new List<MenuDetailsModel>();

         if (menuFunctionList != null)
         {
            menuDetailsList.AddRange(menuFunctionList.menusecurityfunction.Select(msf => new MenuDetailsModel()
            {
                FunctionName = msf.functionname.ToLower(CultureInfo.InvariantCulture),
                MenuTitle = msf.menutitle //"Window Title" in AO Menu setup
            }));

            return menuDetailsList;
         }

         return new List<MenuDetailsModel>();
      }
   }
}