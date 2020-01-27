using System;
using System.Collections.Generic;
using General.Business.Models.Shared;

namespace General.Business.Interfaces.Shared
{
   public interface IMegaMenuService : IDisposable
   {
      List<TopLevelList> BuildMegaMenu();
      List<MenuDetailsModel> BuildMenuFunctions();
   }
}