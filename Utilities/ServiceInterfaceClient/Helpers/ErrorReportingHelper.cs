using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Logging.Logging;
using Newtonsoft.Json;
using ServiceInterfaceClient.Resources;
using ServiceInterfaceClient.Utilities;

namespace ServiceInterfaceClient.Helpers
{
   public static class ErrorReportingHelper
   {
      private const string SessionIdNotFound = "SESSION ID NOT FOUND IN CORE_SESSION";

      private const string ClientPrincipalExired = "CLIENT-PRINCIPAL:VALIDATE-SEAL failed because object expired (14541)";

      public static void ReportErrors(string errorMessage, int returnCode)
      {
         if (string.IsNullOrWhiteSpace(errorMessage))
         {
            return;
         }
         var nLogLogger = new NLogLogger("ReportErrors");
         if (errorMessage.Equals(SessionIdNotFound, StringComparison.InvariantCultureIgnoreCase) || errorMessage.Equals(ClientPrincipalExired, StringComparison.InvariantCultureIgnoreCase))
         {
            nLogLogger.Warn(errorMessage);
            throw new HttpResponseException(CreateReponse(HttpStatusCode.Unauthorized, CommonStrings.Token_Invalid));
         }
         nLogLogger.Info($"{returnCode}-{errorMessage}");
         throw new HttpResponseException(CreateReponse((HttpStatusCode)returnCode, errorMessage, returnCode != 401 ? CommonStrings.Error_FromSxe : CommonStrings.Token_Invalid));
      }

      public static void ReportErrors(string errorMessage)
      {
         ReportErrors(errorMessage, 420);
      }

      public static void ReportProgramErrors(string errorMessage)
      {
         if (string.IsNullOrWhiteSpace(errorMessage))
         {
            return;
         }
         var nLogLogger = new NLogLogger("ReportProgramErrors");
         nLogLogger.Error(errorMessage);
#if !DEBUG
         errorMessage = CommonStrings.Error_GenericError;
#endif
         throw new HttpResponseException(CreateReponse(HttpStatusCode.InternalServerError, errorMessage));
      }

      public static HttpResponseMessage CreateReponse(HttpStatusCode httpStatusCode, string error, string reasonPhrase)
      {
         var responseMessage = new HttpResponseMessage(httpStatusCode)
                                  {
                                     Content =
                                        new StringContent(
                                        JsonConvert.SerializeObject(
                                           new ErrorResponseJson
                                              {
                                                 Message = error
                                              }))
                                  };
         if (!string.IsNullOrEmpty(reasonPhrase))
         {
            responseMessage.ReasonPhrase = reasonPhrase;
         }
         // PMC 07/14/2016 - IBM AppScan - This has been manually reviewed and passed as being safe
         if (responseMessage.Content.Headers.Contains("Content-Type"))
         {
            responseMessage.Content.Headers.Remove("Content-Type");
         }
         responseMessage.Content.Headers.Add("Content-Type", "application/json");
         return responseMessage;
      }

      public static HttpResponseMessage CreateReponse(HttpStatusCode httpStatusCode, string error)
      {
         return CreateReponse(httpStatusCode, error, string.Empty);
      }
   }
}