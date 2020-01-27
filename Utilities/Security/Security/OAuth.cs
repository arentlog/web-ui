using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Protocols.WSTrust;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.ServiceModel.Security;
using System.Text;

namespace Security.Security
{
   public class OAuthBase
   {
      protected class QueryParameter
      {
         public QueryParameter(string name, string value)
         {
            this.Name = name;
            this.Value = value;
         }

         public string Name { get; }

         public string Value { get; set; }
      }

      protected class QueryParameterComparer : IComparer<QueryParameter>
      {
         public int Compare(QueryParameter x, QueryParameter y)
         {
            return x.Name == y.Name ? string.CompareOrdinal(x.Value, y.Value) : string.CompareOrdinal(x.Name, y.Name);
         }
      }

      protected const string OAuthVersion = "1.0";
      protected const string OAuthParameterPrefix = "oauth_";

      // List of known and used oauth parameters' names
      protected const string OAuthConsumerKeyKey = "oauth_consumer_key";
      protected const string OAuthCallbackKey = "oauth_callback";
      protected const string OAuthVersionKey = "oauth_version";
      protected const string OAuthSignatureMethodKey = "oauth_signature_method";
      protected const string OAuthSignatureKey = "oauth_signature";
      protected const string OAuthTimestampKey = "oauth_timestamp";
      protected const string OAuthNonceKey = "oauth_nonce";
      protected const string OAuthTokenKey = "oauth_token";
      protected const string OAuthTokenSecretKey = "oauth_token_secret";

      protected string UnreservedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~";

      private string ComputeHash(HashAlgorithm hashAlgorithm, string data)
      {
         if (hashAlgorithm == null)
         {
            // PMC 02/14/2018 - IBM AppScan - Does not reveal error, logs securely
            throw new ArgumentNullException(nameof(hashAlgorithm));
         }

         if (string.IsNullOrEmpty(data))
         {
            // PMC 02/14/2018 - IBM AppScan - Does not reveal error, logs securely
            throw new ArgumentNullException(nameof(data));
         }

         var dataBuffer = Encoding.ASCII.GetBytes(data);
         var hashBytes = hashAlgorithm.ComputeHash(dataBuffer);

         return Convert.ToBase64String(hashBytes);
      }

      private static List<QueryParameter> GetQueryParameters(string parameters)
      {
         if (parameters.StartsWith("?"))
         {
            parameters = parameters.Remove(0, 1);
         }

         var result = new List<QueryParameter>();

         if (string.IsNullOrEmpty(parameters))
         {
            return result;
         }
         var p = parameters.Split('&');
         foreach (var s in p.Where(s => !string.IsNullOrEmpty(s) && !s.StartsWith(OAuthParameterPrefix)))
         {
            if (s.IndexOf('=') > -1)
            {
               var temp = s.Split('=');
               result.Add(new QueryParameter(temp[0], temp[1]));
            }
            else
            {
               result.Add(new QueryParameter(s, string.Empty));
            }
         }

         return result;
      }

      protected string UrlEncode(string value)
      {
         var result = new StringBuilder();

         foreach (var symbol in value)
         {
            if (this.UnreservedChars.IndexOf(symbol) != -1)
            {
               result.Append(symbol);
            }
            else
            {
               result.Append('%' + $"{(int)symbol:X2}");
            }
         }

         return result.ToString();
      }

      protected string NormalizeRequestParameters(IList<QueryParameter> parameters)
      {
         var sb = new StringBuilder();
         for (var i = 0; i < parameters.Count; i++)
         {
            var p = parameters[i];
            sb.AppendFormat("{0}={1}", p.Name, p.Value);

            if (i < parameters.Count - 1)
            {
               sb.Append("&");
            }
         }

         return sb.ToString();
      }

      public string GenerateSignatureBase(Uri url, string consumerKey, string token, string tokenSecret, string httpMethod, string timeStamp, string nonce)
      {
         if (token == null)
         {
            token = string.Empty;
         }

         if (string.IsNullOrEmpty(consumerKey))
         {
            // PMC 02/14/2018 - IBM AppScan - Does not reveal error, logs securely
            throw new ArgumentNullException(nameof(consumerKey));
         }

         if (string.IsNullOrEmpty(httpMethod))
         {
            // PMC 02/14/2018 - IBM AppScan - Does not reveal error, logs securely
            throw new ArgumentNullException(nameof(httpMethod));
         }

         var parameters = GetQueryParameters(url.Query);

         parameters.Add(new QueryParameter(OAuthVersionKey, OAuthVersion));
         parameters.Add(new QueryParameter(OAuthNonceKey, nonce));
         parameters.Add(new QueryParameter(OAuthTimestampKey, timeStamp));
         parameters.Add(new QueryParameter(OAuthSignatureMethodKey, "HMAC-SHA256"));
         parameters.Add(new QueryParameter(OAuthConsumerKeyKey, consumerKey));

         if (!string.IsNullOrEmpty(token))
         {
            parameters.Add(new QueryParameter(OAuthTokenKey, token));
         }

         parameters.Sort(new QueryParameterComparer());

         string normalizedUrl = $"{url.Scheme}://{url.Host}";
         if (!((url.Scheme == "http" && url.Port == 80) || (url.Scheme == "https" && url.Port == 443)))
         {
            normalizedUrl += ":" + url.Port;
         }
         normalizedUrl += url.AbsolutePath;
         var normalizedRequestParameters = this.NormalizeRequestParameters(parameters);

         var signatureBase = new StringBuilder();
         signatureBase.AppendFormat("{0}&", httpMethod.ToUpper(CultureInfo.InvariantCulture));
         signatureBase.AppendFormat("{0}&", UrlEncode(normalizedUrl));
         signatureBase.AppendFormat("{0}", UrlEncode(normalizedRequestParameters));
         return signatureBase.ToString();
      }

      public string GenerateSignatureUsingHash(string signatureBase, HashAlgorithm hash)
      {
         return this.ComputeHash(hash, signatureBase);
      }

      public string GenerateSignature(Uri url, string consumerKey, string consumerSecret, string token, string tokenSecret, string httpMethod, string timeStamp, string nonce)
      {
         var signatureBase = GenerateSignatureBase(url, consumerKey, token, tokenSecret, httpMethod, timeStamp, nonce);
         var hmacsha256 = new HMACSHA256
         {
            Key = Encoding.ASCII.GetBytes($"{this.UrlEncode(consumerSecret)}&{(string.IsNullOrEmpty(tokenSecret) ? "" : this.UrlEncode(tokenSecret))}")
         };
         HashAlgorithm hash = hmacsha256;
         var signature = this.GenerateSignatureUsingHash(signatureBase, hash);
         signature = UrlEncode(signature);
         return
            $"OAuth oauth_consumer_key=\"{consumerKey}\",oauth_signature_method=\"HMAC-SHA256\",oauth_timestamp=\"{timeStamp}\",oauth_nonce=\"{nonce}\",oauth_version=\"1.0\",oauth_signature=\"{signature}\"";
      }

      public virtual string GenerateTimeStamp()
      {
         // PMC 02/09/2018 - IBM AppScan - Reviewed, this code is coded as it should be.  The date time manipulation is to design
         var ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
         return Convert.ToInt64(ts.TotalSeconds).ToString();
      }

      private static readonly RNGCryptoServiceProvider Random = new RNGCryptoServiceProvider();

      public virtual string GenerateNonce(int length)
      {
         var data = new byte[length];
         Random.GetNonZeroBytes(data);
         return this.UrlEncode(Convert.ToBase64String(data));
      }

      public string CreateQueryParam(string paramName, string paramValue)
      {
         paramName = this.UrlEncode(paramName);
         paramValue = this.UrlEncode(paramValue);
         return $"{paramName}={paramValue}";
      }

      public string Base64Encode(string plainText)
      {
         var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
         return Convert.ToBase64String(plainTextBytes);
      }

      public SecurityToken IssueOAuth2SecurityToken(SecurityToken foreignToken, string rpEndpoint, string appliesTo, string localTokenType, out RequestSecurityTokenResponse rstr)
      {
         return IssueOAuth2SecurityToken(foreignToken, rpEndpoint, appliesTo, localTokenType, out rstr, KeyTypes.Bearer);
      }

      public SecurityToken IssueOAuth2SecurityToken(SecurityToken foreignToken, string rpEndpoint, string appliesTo, string localTokenType, out RequestSecurityTokenResponse rstr, string keyType)
      {
         ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
         // Authenticate with a SAML Bearer token
         var wsHttpBinding = new WS2007FederationHttpBinding(WSFederationHttpSecurityMode.TransportWithMessageCredential);

         wsHttpBinding.Security.Message.EstablishSecurityContext = false;

         wsHttpBinding.Security.Message.NegotiateServiceCredential = false;

         wsHttpBinding.Security.Message.IssuedKeyType = SecurityKeyType.BearerKey;

         Binding binding = wsHttpBinding;

         // Define the STS endpoint
         var endpoint = new EndpointAddress(new Uri(rpEndpoint));

         var factory = new WSTrustChannelFactory(binding, endpoint) { TrustVersion = TrustVersion.WSTrust13 };
         if (factory.Credentials != null)
         {
            factory.Credentials.SupportInteractive = false; // avoid that Cardspace dialog

            //http://stackoverflow.com/questions/11312314/cannot-serialize-saml2assertionkeyidentifierclause
            factory.Credentials.UseIdentityConfiguration = true;
         }

         // Now we define the Request for Security Token (RST)
         var rst = new RequestSecurityToken()
         {
            //identifiy which local token we want
            AppliesTo = new EndpointReference(appliesTo),

            //identify what type of request this is (Issue or Validate)
            RequestType = RequestTypes.Issue,

            //set what kind of token we want returned (appliesTo will override this)
            TokenType = localTokenType,

            //set the keytype (symmetric, asymmetric (pub key) or bearer - null = Sender Vouches)
            KeyType = null
         };

         //create the channel (using the SAML token received from the WSC)
         var channel = factory.CreateChannelWithIssuedToken(foreignToken);

         //send the token issuance command
         var token = channel.Issue(rst, out rstr);

         return token;
      }
   }
}