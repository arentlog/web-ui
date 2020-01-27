using System;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using Logging.Logging;
using Newtonsoft.Json;
using ServiceInterfaceClient.Progress;

namespace ServiceInterfaceClient.Utilities
{
    public static class MakeWebCall
   {
      public static T DoWebCallString<T>(Uri uri, bool upload, string payload, WebHeaderCollection headers, out bool error, NLogLogger myLogger, bool ignoreResponse = false)
      {
         error = false;
         var webClient = new CoudSuiteWebClient();
         var progressSettings = new ProgressConfiguration();
         for (var index = 0; index < headers.Count; index++)
         {
            webClient.Headers.Add(headers.AllKeys[index], headers[index]);
         }
         if (progressSettings.InforOverrideHttps)
         {
            myLogger.Trace("Over-riding HTTPS errors");
            ServicePointManager.ServerCertificateValidationCallback += ValidateRemoteCertificate;
         }
         ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
         try
         {
            var response = upload ? webClient.UploadString(uri, payload) : webClient.DownloadString(uri);
            return ignoreResponse ? default(T) : JsonConvert.DeserializeObject<T>(response);
         }
         catch (Exception ex)
         {
            myLogger.ErrorException("Web Call Failed", ex);
            error = true;
         }
         finally
         {
            webClient.Dispose();
         }
         return default(T);
      }

      private static bool ValidateRemoteCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
      {
         return true;
      }
   }
}
