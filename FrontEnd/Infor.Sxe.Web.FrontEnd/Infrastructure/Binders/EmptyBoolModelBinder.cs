using System.Web.Http.Controllers;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.Binders
{
   public class EmptyBoolModelBinder : System.Web.Http.ModelBinding.IModelBinder
   {
      public bool BindModel(HttpActionContext actionContext, System.Web.Http.ModelBinding.ModelBindingContext bindingContext)
      {
         if (bindingContext.ValueProvider.GetValue(bindingContext.ModelName) != null)
         {
            var val = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).AttemptedValue;
            bool.TryParse(val, out var newValue);
            bindingContext.Model = newValue;
         }
         else
         {
            bindingContext.Model = false;
         }
         return true;
      }
   }
}