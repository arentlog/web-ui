using System;
using System.IdentityModel.Services;
using System.IdentityModel.Tokens;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Xml;
using Logging.Logging;
using Security.Security;
using ServiceInterfaceClient.Progress;

namespace ServiceInterfaceClient.Utilities
{
   public class BearerToken
   {
      public static string GetBearerToken(ILogger nLogger)
      {
         string bearerToken = null;
         nLogger?.Info("Begin GetBearerToken");

         //don't block login from completing if call fails
         try
         {
            var claimsPrincipal = Thread.CurrentPrincipal as ClaimsPrincipal;
            var context = (BootstrapContext)claimsPrincipal?.Identities.First().BootstrapContext;
            nLogger?.Info("Starting harvesting of OAuth2 token");
            if (context == null)
            {
               nLogger?.Error("context is null");
            }
            var contextSecurityToken = context?.SecurityToken;
            if (contextSecurityToken == null)
            {
               nLogger?.Info("context?.SecurityToken is null");
            }
            if (string.IsNullOrEmpty(context?.Token))
            {
               nLogger?.Info("context?.Token is null or empty");
            }

            SecurityToken finalToken;

            if (contextSecurityToken == null && !string.IsNullOrEmpty(context?.Token))
            {
               var handlers =
                  FederatedAuthentication.FederationConfiguration.IdentityConfiguration.SecurityTokenHandlers;
               finalToken = handlers.ReadToken(new XmlTextReader(new StringReader(context.Token)));
               if (finalToken == null)
               {
                  nLogger?.Error("handlers security token is null");
               }
            }
            else
            {
               finalToken = contextSecurityToken;
            }

            var progressConfiguration = new ProgressConfiguration();
            var oauth = new OAuthBase();
            string rpEndpoint;
            string appliesTo;
            var localTokenType = progressConfiguration.InforIonApiTokenType;
            nLogger?.Info($"localTokenType - {localTokenType}");

            var issuer = FederatedAuthentication.FederationConfiguration.WsFederationConfiguration.Issuer;
            nLogger?.Info($"issuer - {issuer}");

            //on-prem install
            if (issuer.Contains("adfs"))
            {
               nLogger?.Info("contains adfs");
               rpEndpoint = progressConfiguration.InforIonApiRpEndpoint;
               appliesTo = progressConfiguration.InforIonApiAppliesToEndpoint;
               nLogger?.Info($"rpEndpoint - {rpEndpoint}");
               nLogger?.Info($"appliesTo - {appliesTo}");
            }
            //ce install
            else
            {
               nLogger?.Info("ce");
               var uri = new Uri(issuer);
               var baseUri = uri.GetLeftPart(UriPartial.Authority);
               nLogger?.Info($"baseUri - {baseUri}");
               rpEndpoint = baseUri + progressConfiguration.InforIonApiRpEndpoint;
               appliesTo = baseUri + progressConfiguration.InforIonApiAppliesToEndpoint;
               nLogger?.Info($"rpEndpoint - {rpEndpoint}");
               nLogger?.Info($"appliesTo - {appliesTo}");
            }

            if (finalToken != null)
            {
               var xmlTokenOauthToken =
                  (GenericXmlSecurityToken)
                  oauth.IssueOAuth2SecurityToken(finalToken, rpEndpoint, appliesTo, localTokenType,
                     out var rstr);
               if (xmlTokenOauthToken != null)
               {
                  var base64Token = xmlTokenOauthToken.TokenXml?.InnerText;
                  if (!string.IsNullOrEmpty(base64Token))
                  {
                     nLogger?.Info($"base64Token - {base64Token}");
                     var data = Convert.FromBase64String(base64Token);
                     nLogger?.Info($"data - {data}");
                     bearerToken = Encoding.UTF8.GetString(data);
                  }
                  else
                  {
                     nLogger?.Info("base64Token is empty");
                  }
               }
            }
            else
            {
               nLogger?.Info("Token Empty - Will not process further");
            }
         }
         catch (Exception e)
         {
            nLogger?.ErrorException("GetBearerToken", e);
         }
         nLogger?.Info("End GetBearerToken");
         return bearerToken;
      }
   }
}
