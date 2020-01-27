using System.Web.Http.Controllers;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.Binders
{
   public class EmptyLongModelBinder : System.Web.Http.ModelBinding.IModelBinder
   {
      public bool BindModel(HttpActionContext actionContext, System.Web.Http.ModelBinding.ModelBindingContext bindingContext)
      {
         if (bindingContext.ValueProvider.GetValue(bindingContext.ModelName) != null)
         {
            var val = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).AttemptedValue;
            bindingContext.Model = long.TryParse(val, out var newValue) ? newValue : long.MinValue;
         }
         else
         {
            bindingContext.Model = long.MinValue;
         }
         return true;
      }
   }
}