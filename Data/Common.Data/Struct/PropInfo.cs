using System.Reflection;
using Infor.Sxe.Common.Data.Helpers;

namespace Infor.Sxe.Common.Data.Struct
{
   public struct PropInfo
   {
      private readonly object _client;

      public PropInfo(PropertyInfo prop, object client)
      {
         this.Prop = prop;
         this._client = client;
      }

      public PropertyInfo Prop { get; set; }

      public string Value
      {
         get => this._client != null ? ClassHelper.GetPropertyValue(this.Prop, this._client) : string.Empty;
         set => this.Prop.SetValue(this._client, value, null);
      }
   }
}