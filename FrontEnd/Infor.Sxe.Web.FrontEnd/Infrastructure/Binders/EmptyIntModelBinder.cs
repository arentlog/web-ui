using System.Web.Http.Controllers;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.Binders
{
   public class EmptyIntModelBinder : System.Web.Http.ModelBinding.IModelBinder
   {
      public bool BindModel(HttpActionContext actionContext, System.Web.Http.ModelBinding.ModelBindingContext bindingContext)
      {
         if (bindingContext.ValueProvider.GetValue(bindingContext.ModelName) != null)
         {
            var val = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).AttemptedValue;
            bindingContext.Model = int.TryParse(val, out var newValue)
               ? newValue
               : (bindingContext.ModelName != "batchsize" ? int.MinValue : 0);
         }
         else
         {
            bindingContext.Model = bindingContext.ModelName != "batchsize" ? int.MinValue : 0;
         }
         return true;
      }
   }
}