using System.Globalization;
using Infor.Sxe.Shared.Data.Models.Pdsmenusecurity;

namespace General.Business.Models.Shared
{
   public class MenuSecurityFunction : Menusecurityfunction
   {
      public MenuSecurityFunction()
      {
      }

      public MenuSecurityFunction(Menusecurityfunction item)
      {
         this.functionname = item.functionname.ToLower(CultureInfo.InvariantCulture);
         this.menutitle = item.menutitle;
         this.parentmenu = item.parentmenu;
         this.parentpos = item.parentpos;
         this.commandparameter = item.commandparameter;
         this.commandtype = item.commandtype;
         this.moduleresource = item.moduleresource;
         this.drilldown = item.drilldown;
         this.securitylevel = item.securitylevel;
         this.subsecuritylevels = item.subsecuritylevels;
         this.subsecurityresource = item.subsecurityresource;
      }
   }
}