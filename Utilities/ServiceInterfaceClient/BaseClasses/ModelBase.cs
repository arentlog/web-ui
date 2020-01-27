using System.Linq;

namespace ServiceInterfaceClient.BaseClasses
{
   public class ModelBase
   {
      protected ModelBase()
      {
      }

      #region Public Methods and Operators

      public static object SetKeyFields(object parent, object child, string parentFields, string childFields)
      {
         parentFields = parentFields.Replace(" ", string.Empty);
         childFields = childFields.Replace(" ", string.Empty);
         if (string.IsNullOrEmpty(parentFields) || string.IsNullOrEmpty(childFields))
         {
            return child;
         }
         var parentFieldsArr = parentFields.Split(',');
         var childFieldsArr = childFields.Split(',');
         if (parentFieldsArr.Count() != childFieldsArr.Count())
         {
            return child;
         }
         for (var i = 0; i < parentFieldsArr.Count(); i++)
         {
            var fromProperty = parent.GetType().GetProperty(parentFieldsArr[i]);
            var toProperty = child.GetType().GetProperty(childFieldsArr[i]);
            if (fromProperty == null || toProperty == null)
            {
               continue;
            }
            var valuePropertyInfo = fromProperty.GetValue(parent, null);
            toProperty.SetValue(child, valuePropertyInfo, null);
         }
         return child;
      }

   #endregion
   }
}