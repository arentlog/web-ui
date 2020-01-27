using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/cenpos")]
   public class CenposApiController : ApiControllerBase
   {
      private readonly ICenpos cenpos;

      public CenposApiController(ICenpos cenpos)
      {
         this.cenpos = cenpos;
      }

      /// <summary>
      /// Adds the card URI.
      /// </summary>
      /// <param name="mediacd">The mediacd.</param>
      /// <param name="custno">The custno.</param>
      /// <param name="shipto">The shipto.</param>
      /// <param name="invoiceNo">The invoice no.</param>
      /// <param name="runarsocprecall"></param>
      /// <param name="ipaddress">The shipto.</param>
      /// <returns></returns>
      [HttpGet]
      [Route("addcarduri/{mediacd:int}/{custno:decimal}")]
      public CenPosModel AddCardUri(int mediacd,
                                       decimal custno,
                                       string shipto = "",
                                       string invoiceNo = "0-0",
                                       bool runarsocprecall = true,
                                       string ipaddress = "")
      {
         return this.cenpos.BuildCenPosUrl(
            "add",
            mediacd,
            custno,
            shipto,
            string.Empty,
            string.Empty,
            invoiceNo,
            string.Empty,
            0,
            runarsocprecall,
            ipaddress);
      }

      /// <summary>
      /// Modifies the card URI.
      /// </summary>
      /// <param name="mediacd">The mediacd.</param>
      /// <param name="custno">The custno.</param>
      /// <param name="tokenid"></param>
      /// <param name="shipto">The shipto.</param>
      /// <param name="ipaddress">The shipto.</param>
      /// <returns></returns>
      [HttpGet]
      [Route("modifycarduri/{mediacd:int}/{custno:decimal}/{tokenid:maxLength(50)}")]
      public CenPosModel ModifyCardUri(int mediacd,
                                 decimal custno,
                                 string tokenid,
                                 string shipto = "",
                                 string ipaddress = "")
      {
         return this.cenpos.BuildCenPosUrl(
            "modify",
            mediacd,
            custno,
            shipto,
            string.Empty,
            tokenid,
            "0-0",
            string.Empty,
            0,
            false,
            ipaddress);
      }

      /// <summary>
      /// Deletes the card URI.
      /// </summary>
      /// <param name="mediacd">The mediacd.</param>
      /// <param name="custno">The custno.</param>
      /// <param name="tokenId">The token identifier.</param>
      /// <param name="shipto">The shipto.</param>
      /// <param name="ipaddress">The shipto.</param>
      /// <returns></returns>
      [HttpGet]
      [Route("deletecarduri/{mediacd:int}/{custno:decimal}/{tokenid:maxLength(50)}")]
      public CenPosModel DeleteCardUri(int mediacd,
                           decimal custno,
                           string tokenId,
                           string shipto = "",
                           string ipaddress = "")
      {
         return this.cenpos.BuildCenPosUrl(
            "delete",
            mediacd,
            custno,
            shipto,
            string.Empty,
            tokenId,
            "0-0",
            string.Empty,
            0,
            false,
            ipaddress);
      }

      /// <summary>
      /// Authorizes the credit card URI.
      /// </summary>
      /// <param name="mediacd">The mediacd.</param>
      /// <param name="custno">The custno.</param>
      /// <param name="whse">The whse.</param>
      /// <param name="invoiceno">The invoiceno.</param>
      /// <param name="onetimetype">The onetimetype.</param>
      /// <param name="amount">The amount.</param>
      /// <param name="taxamount">The taxamount.</param>
      /// <param name="shipto">The shipto.</param>
      /// <param name="ipaddress">The shipto.</param>
      /// <returns></returns>
      [HttpGet]
      [Route("authorizecreditcarduri/{mediacd:int}/{custno:decimal}/{whse:maxLength(4)}/{invoiceno:maxLength(11)}/{onetimetype:length(3,9)}/{amount:decimal}/{taxamount:decimal}")]
      public CenPosModel AuthorizeCreditCardUri(int mediacd,
                     decimal custno,
                     string whse,
                     string invoiceno,
                     string onetimetype,
                     decimal amount,
                     decimal taxamount,
                     string shipto = "",
                     string ipaddress = "")
      {
         return this.cenpos.BuildCenPosUrl(
            "auth",
            mediacd,
            custno,
            shipto,
            whse,
            string.Empty,
            invoiceno,
            onetimetype,
            amount,
            false,
            ipaddress,
            taxamount);
      }

      /// <summary>
      /// Sales the credit card URI.
      /// </summary>
      /// <param name="mediacd">The mediacd.</param>
      /// <param name="custno">The custno.</param>
      /// <param name="whse">The whse.</param>
      /// <param name="invoiceno">The invoiceno.</param>
      /// <param name="onetimetype">The onetimetype.</param>
      /// <param name="amount">The amount.</param>
      /// <param name="taxamount">The taxamount.</param>
      /// <param name="shipto">The shipto.</param>
      /// <param name="ipaddress">The shipto.</param>
      /// <returns></returns>
      [HttpGet]
      [Route("salecreditcarduri/{mediacd:int}/{custno:decimal}/{whse:maxLength(4)}/{invoiceno:maxLength(11)}/{onetimetype:length(3,9)}/{amount:decimal}/{taxamount:decimal}")]
      public CenPosModel SaleCreditCardUri(int mediacd,
               decimal custno,
               string whse,
               string invoiceno,
               string onetimetype,
               decimal amount,
               decimal taxamount,
               string shipto = "",
               string ipaddress = "")
      {
         return this.cenpos.BuildCenPosUrl(
            "sale",
            mediacd,
            custno,
            shipto,
            whse,
            string.Empty,
            invoiceno,
            onetimetype,
            amount,
            false,
            ipaddress,
            taxamount);
      }
      /// <summary>
      /// Adds the Signature URI.
      /// </summary>
      /// <param name="mediacd">The mediacd.</param>
      /// <param name="invoiceNo">The invoice no.</param>
      /// <param name="ipaddress">The shipto.</param>
      /// <returns></returns>
      [HttpGet]
      [Route("addsignatureuri/{mediacd:int}/{invoiceno:maxLength(11)}")]
      public CenPosModel AddSignatureUri(int mediacd,
                                       string invoiceNo = "0-0",
                                       string ipaddress = "")
      {
         return this.cenpos.BuildCenPosUrl(
            "signature",
            mediacd,
            0,
            string.Empty,
            string.Empty,
            string.Empty,
            invoiceNo,
            string.Empty,
            0,
            false,
            ipaddress);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.cenpos?.Dispose();
         base.Dispose(true);
      }
   }
}