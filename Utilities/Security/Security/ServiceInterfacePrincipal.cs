using System;
using System.Security.Principal;

namespace Security.Security
{
   public class ServiceInterfacePrincipal : GenericPrincipal
   {
      public ServiceInterfacePrincipal(TokenObject tokenObject, string host, Uri urlReferrer, IIdentity identity, string callGuid, string bearerToken)
         : base(identity, null)
      {
         this.TokenObject = tokenObject;
         this.Host = host;
         this.UrlReferrer = urlReferrer;
         this.Cono = tokenObject.Cono;
         this.CallGuid = callGuid;
         this.BearerToken = bearerToken;
      }

      public ServiceInterfacePrincipal(IIdentity identity)
         : base(identity, null)
      {
      }

      public GenericIdentity ServiceInterfaceIdentity => this.Identity as GenericIdentity;

      public TokenObject TokenObject { get; set; }

      public string Host { get; set; }

      public Uri UrlReferrer { get; set; }

      public int Cono { get; set; }

      public string CallGuid { get; set; }

      public string BearerToken { get; set; }
   }
}