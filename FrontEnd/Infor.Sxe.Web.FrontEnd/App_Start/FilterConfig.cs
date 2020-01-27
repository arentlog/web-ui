using System.Web.Mvc;

namespace Infor.Sxe.Web.FrontEnd
{
   public static class FilterConfig
   {
      public static void RegisterGlobalFilters(GlobalFilterCollection filters)
      {
         filters.Add(new HandleErrorAttribute());
      }
   }
}