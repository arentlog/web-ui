using System.Collections.Generic;
using System.Linq;
using Infor.Sxe.Shared.Data.Models.Pdsmenusecurity;

namespace General.Business.Models.Shared
{
   public class MegaMenuModel
   {
      public List<Menusecuritytop> TopLevelMenus { get; set; }
      public List<Menusecuritymenu> SecondLevelMenues { get; set; }
      public List<Menusecurityfunction> MenuFunctions { get; set; }

      /// <summary>
      /// Build a hierarchical structure of the mega menu where a list of top level menu
      /// functions is returned and each top level menu contains sub lists of associated menu functions.
      /// </summary>
      /// <returns>This method returns a list of top level menu functions each containing sub lists of associated menu </returns>
      public List<TopLevelList> BuildList()
      {
         var megaMenuList = new List<TopLevelList>();

         // for each top level menu option get the second level menu items
         // then for each second level menu option get the associated menu functions
         foreach (var topLevel in TopLevelMenus.OrderBy(x => x.parentpos))
         {
            var topLevelItem = new TopLevelList(topLevel) { SecondLevelMenus = new List<SecondLevelMenu>() };

            foreach (var secondLevel in this.SecondLevelMenues.OrderBy(x => x.parentpos))
            {
               if (secondLevel.parentmenu == topLevel.functionname)
               {
                  var secondLevelItem = new SecondLevelMenu(secondLevel)
                                           {
                                              MenuFunctions =
                                                 new List<MenuSecurityFunction>()
                                           };

                  foreach (var menuFunction in this.MenuFunctions.OrderBy(x => x.parentpos).Where(menuFunction => menuFunction.parentmenu == secondLevel.functionname))
                  {
                     secondLevelItem.MenuFunctions.Add(new MenuSecurityFunction(menuFunction));
                  }
                  topLevelItem.SecondLevelMenus.Add(secondLevelItem);
               }
            }
            megaMenuList.Add(topLevelItem);
         }

         return megaMenuList;
      }
   }
}