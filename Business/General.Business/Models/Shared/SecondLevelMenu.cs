using System.Collections.Generic;
using System.Globalization;
using Infor.Sxe.Shared.Data.Models.Pdsmenusecurity;

namespace General.Business.Models.Shared
{
   public class SecondLevelMenu : Menusecuritymenu
   {
      public SecondLevelMenu()
      {
      }

      public SecondLevelMenu(Menusecuritymenu item)
      {
         this.functionname = item.functionname.ToLower(CultureInfo.InvariantCulture);
         this.menutitle = item.menutitle;
         this.moduleresource = item.moduleresource;
         this.parentpos = item.parentpos;
         this.securitylevel = item.securitylevel;
      }

      public List<MenuSecurityFunction> MenuFunctions { get; set; }
   }
}