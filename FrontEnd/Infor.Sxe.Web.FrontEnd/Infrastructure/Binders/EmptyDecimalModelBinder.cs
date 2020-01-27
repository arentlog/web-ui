using System.Web.Http.Controllers;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.Binders
{
   public class EmptyDecimalModelBinder : System.Web.Http.ModelBinding.IModelBinder
   {
      public bool BindModel(HttpActionContext actionContext, System.Web.Http.ModelBinding.ModelBindingContext bindingContext)
      {
         if (bindingContext.ValueProvider.GetValue(bindingContext.ModelName) != null)
         {
            var val = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).AttemptedValue;
            if (string.IsNullOrEmpty(val))
            {
               val = "0";
            }
            bindingContext.Model = decimal.TryParse(val, out var newValue) ? newValue : decimal.MinValue;
         }
         else
         {
            bindingContext.Model = decimal.MinValue;
         }
         return true;
      }
   }
}