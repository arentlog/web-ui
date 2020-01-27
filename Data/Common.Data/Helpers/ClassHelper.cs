using System;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Infor.Sxe.Common.Data.BusinessContext;
using Infor.Sxe.Common.Data.Struct;
using Newtonsoft.Json.Linq;

namespace Infor.Sxe.Common.Data.Helpers
{
   public static class ClassHelper
   {
      public static string GetPropertyValue(PropertyInfo property, object reference)
      {
         if (property != null && reference != null)
         {
            object value = property.GetValue(reference, null);
            return value?.ToString() ?? string.Empty;
         }
         return string.Empty;
      }

      public static Type ReturnClassType(string className)
      {
         var typesToReturn = GetTypeByName(className);
         return typesToReturn.Any() ? typesToReturn[0] : null;
      }

      public static Type[] GetTypeByName(string className)
      {
         var assemblyTypes = Assembly.GetExecutingAssembly().GetTypes();
         return assemblyTypes.Where(t => t.Name == className).ToArray();
      }

      public static JObject ReturnAddress(object result)
      {
         var prop = result.GetType().GetProperty("CompleteAddress");
         var propValue = prop?.GetValue(result, null);
         if (!string.IsNullOrEmpty(propValue as string))
         {
            var returnAddress = new JObject { { "completeAddress", JToken.FromObject(propValue) } };
            return returnAddress;
         }
         return null;
      }

      public static JObject ReturnMessage(object result, int cono, bool ignoreKeys, string viewId, string logicalLid)
      {
         var returnObject = new JObject();
         var busContextFormatter = new BusinessContextFormatter(result, cono);

         var listIds = busContextFormatter.ReturnKeyAndIDs(ignoreKeys);
         var i = 1;
         foreach (var id in listIds)
         {
            returnObject.Add(Fields.Id(i), JToken.FromObject(id));
            i++;
         }
         if (!string.IsNullOrEmpty(busContextFormatter.EntityType))
         {
            returnObject.Add(Fields.EntityType, JToken.FromObject(busContextFormatter.EntityType));
         }
         returnObject.Add(Fields.Visible, JToken.FromObject(true));
         returnObject.Add(Fields.ReadOnly, JToken.FromObject(false));
         if (!string.IsNullOrEmpty(busContextFormatter.Name.Value))
         {
            returnObject.Add(Fields.Name, JToken.FromObject(busContextFormatter.Name.Value));
         }
         if (!string.IsNullOrEmpty(busContextFormatter.Description.Value))
         {
            returnObject.Add(Fields.Description, JToken.FromObject(busContextFormatter.Description.Value));
         }
         if (!string.IsNullOrEmpty(busContextFormatter.AccountingEntity.Value))
         {
            returnObject.Add(Fields.AccountingEntity, JToken.FromObject(busContextFormatter.AccountingEntity.Value));
         }
         if (!string.IsNullOrEmpty(busContextFormatter.Location.Value))
         {
            returnObject.Add(Fields.Location, JToken.FromObject(busContextFormatter.Location.Value));
         }
         if (!string.IsNullOrEmpty(busContextFormatter.Noun))
         {
            var bodObject = new JObject
                               {
                                  {
                                     BodReferenceFields.BodReferenceNoun,
                                     JToken.FromObject(busContextFormatter.Noun)
                                  }
                               };
            if (!string.IsNullOrEmpty(busContextFormatter.BodAccountingEntity.Value))
            {
               bodObject.Add(BodReferenceFields.BodReferenceAccountingEntity, JToken.FromObject(busContextFormatter.BodAccountingEntity.Value));
            }
            if (!string.IsNullOrEmpty(busContextFormatter.BodLocation.Value))
            {
               bodObject.Add(BodReferenceFields.BodReferenceLocation, JToken.FromObject(busContextFormatter.BodLocation.Value));
            }
            if (!string.IsNullOrEmpty(busContextFormatter.GetBodIds))
            {
               bodObject.Add(BodReferenceFields.BodReferenceDocumentId, JToken.FromObject(busContextFormatter.GetBodIds));
            }
            returnObject.Add(Fields.BodReference, JToken.FromObject(bodObject));
         }
         if ((!string.IsNullOrEmpty(busContextFormatter.DrillbackUrl) && !busContextFormatter.DrillbackUrl.ToUpper(CultureInfo.InvariantCulture).Equals("TBD")) || !string.IsNullOrEmpty(viewId))
         {
            var drillbackUrl = busContextFormatter.DrillBackParamData.Aggregate("?", (current, pair) => current + ((current.Length > 1 ? "&" : string.Empty) + ((ServiceInterfaceClient.Attributes.DrillbackParamAttribute)(pair.Value[0])).Name + "=" + pair.Key.Value));
            drillbackUrl += "&" + Fields.ViewId + "=" + (!string.IsNullOrEmpty(viewId) ? viewId : busContextFormatter.DrillbackUrl);
            drillbackUrl += "&" + Fields.LogicalId + "=" + logicalLid;
            drillbackUrl += "&" + Fields.AccountingEntity + "=" + cono;
            returnObject.Add(Fields.DrillbackUrl, JToken.FromObject(drillbackUrl));
         }
         return returnObject;
      }
   }
}