using System;
using System.Security.Principal;
using System.Web.Http.Controllers;
using Newtonsoft.Json;

namespace Security.Security
{
   public static class ApplicationCookieUtilities
   {
      public const string TokenName = "Token";

      public const string CallGuidName = "CallGuid";

      public const string BearerToken = "BearerToken";

      public static string ReturnFunctionFromActionContext(HttpActionContext actionContext)
      {
         var actionName = string.Empty;
         var controllerName = string.Empty;

         if (actionContext?.ActionDescriptor != null)
         {
            actionName = actionContext.ActionDescriptor.ActionName;
            if (actionContext.ActionDescriptor.ControllerDescriptor != null)
            {
               controllerName = actionContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            }
         }
         return controllerName + "\\" + actionName;
      }

      public static bool TokenToObject(string token, string encryptKey, string encryptIv, out TokenObject tokenObject)
      {
         tokenObject = new TokenObject();
         try
         {
            if (string.IsNullOrEmpty(token))
            {
               return false;
            }
            token = StringProtector.Unprotect(token, encryptKey, encryptIv);
            tokenObject = JsonConvert.DeserializeObject<TokenObject>(token);
            return true;
         }
         catch (Exception)
         {
            return false;
         }
      }

      public static string ObjectToToken(TokenObject tokenObject, string encryptKey, string encryptIv)
      {
         var token = JsonConvert.SerializeObject(tokenObject);
         return StringProtector.Protect(token, encryptKey, encryptIv);
      }

      public static TokenObject Principal(IPrincipal user, out string host)
      {
         host = string.Empty;
         if (user is ServiceInterfacePrincipal principal)
         {
            host = principal.Host;
            return principal.TokenObject;
         }
         return null;
      }

      private static string CallGuid(IPrincipal user)
      {
         return user is ServiceInterfacePrincipal principal ? principal.CallGuid : string.Empty;
      }

      public static string BearerTokenValue(IPrincipal user)
      {
         return user is ServiceInterfacePrincipal principal ? principal.BearerToken : string.Empty;
      }

      public static LoggingParams GetLoggingParams(
                                    IPrincipal user,
                                    string functionName)
      {
         var tokenObject = Principal(user, out var host);
         var loggingParams = new LoggingParams
         {
            tenant = tokenObject.Tenant,
            cono = tokenObject.Cono,
            function = functionName,
            IsAuthenticated = user.Identity.IsAuthenticated,
            host = host,
            sessionid = tokenObject.SessionidGuid,
            oper = tokenObject.Oper,
            callGuid = CallGuid(user)
         };
         return loggingParams;
      }
   }
}