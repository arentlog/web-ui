using System.Collections.Generic;
using System.Globalization;
using Infor.Sxe.Shared.Data.Models.Pdsmenusecurity;

namespace General.Business.Models.Shared
{
   public class TopLevelList : Menusecuritytop
   {
      public TopLevelList()
      {
      }

      public TopLevelList(Menusecuritytop item)
      {
         this.functionname = item.functionname.ToLower(CultureInfo.InvariantCulture);
         this.commandparameter = item.commandparameter;
         this.commandtype = item.commandtype;
         this.menutitle = item.menutitle;
         this.moduleresource = item.moduleresource;
         this.parentpos = item.parentpos;
         this.securitylevel = item.securitylevel;
      }

      public List<SecondLevelMenu> SecondLevelMenus { get; set; }
   }
}