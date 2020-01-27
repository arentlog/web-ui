using System;
using System.Linq;
using System.Web;

namespace ServiceInterfaceClient.Helpers
{
   public static class AwsElbUtils
   {
      private const string ElbProtoHeader = "X-Forwarded-Proto";

      private const string ElbPortHeader = "X-Forwarded-Port";

      public static AwsElbSchemeAndPort ReturnAwsSettings(HttpRequest httpRequest)
      {
         var awsElbSchemeAndPort = new AwsElbSchemeAndPort { Scheme = string.Empty };
         var protoHeaderValue = httpRequest.Headers[ElbProtoHeader];
         if (!string.IsNullOrEmpty(protoHeaderValue))
         {
            awsElbSchemeAndPort.AwsSchemePresent = true;
            awsElbSchemeAndPort.Scheme = protoHeaderValue;
            awsElbSchemeAndPort.IgnorePortAssignment = true;
         }
         var protoPortValue = httpRequest.Headers[ElbPortHeader];
         if (!string.IsNullOrEmpty(protoPortValue))
         {
            int iProtoPortValue;
            if (int.TryParse(protoPortValue, out iProtoPortValue)
                && (iProtoPortValue == 443 && awsElbSchemeAndPort.AwsSchemePresent
                    && awsElbSchemeAndPort.Scheme.Equals(Uri.UriSchemeHttps, StringComparison.CurrentCultureIgnoreCase)))
            {
               iProtoPortValue = 0;
               awsElbSchemeAndPort.IgnorePortAssignment = true;
            }
            if (iProtoPortValue == 0) return (awsElbSchemeAndPort);
            awsElbSchemeAndPort.Port = iProtoPortValue;
            awsElbSchemeAndPort.AwsPortPresent = true;
         }
         return (awsElbSchemeAndPort);
      }

      public static string ReturnUrlRequired(HttpRequest httpRequest)
      {
         var host = httpRequest.Url.Host;
         var port = 0;
         var scheme = string.Empty;
         var awsSchemePort = ReturnAwsSettings(httpRequest);
         scheme = awsSchemePort.AwsSchemePresent ? awsSchemePort.Scheme : httpRequest.Url.Scheme;
         if (awsSchemePort.AwsPortPresent)
         {
            port = awsSchemePort.Port;
         }
         else
         {
            if (!awsSchemePort.IgnorePortAssignment)
            {
               port = httpRequest.Url.Port;
            }
         }
         var portAssignment = string.Empty;
         var isStandardPorts = (scheme.Equals(Uri.UriSchemeHttp, StringComparison.CurrentCultureIgnoreCase)
                                && port == 80)
                               || (scheme.Equals(Uri.UriSchemeHttps, StringComparison.CurrentCultureIgnoreCase)
                                   && port == 443);
         if (!isStandardPorts && port != 0)
         {
            portAssignment = ":" + port;
         }
         var segments = httpRequest.Url.Segments.TakeWhile(segment => segment != "api/").Aggregate("", (current1, segment) => current1 + segment);
         return $"{scheme}://{host}{portAssignment}{segments}";
      }
   }

   public class AwsElbSchemeAndPort
   {
      public string Scheme { get; set; }

      public int Port { get; set; }

      public bool AwsSchemePresent { get; set; }

      public bool AwsPortPresent { get; set; }

      public bool IgnorePortAssignment { get; set; }
   }
}
