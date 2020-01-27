using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ServiceInterfaceClient.Utilities
{
   public class CoudSuiteWebClient : WebClient
   {
      protected override WebRequest GetWebRequest(Uri address)
      {
         if (base.GetWebRequest(address) is HttpWebRequest request)
         {
            request.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;
            return request;
         }
         return null;
      }
   }
}
