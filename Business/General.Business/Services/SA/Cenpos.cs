using System;
using System.Globalization;
using System.Text;
using System.Web;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.AR.Data.Models.Complex;
using Infor.Sxe.AR.Data.Repositories;
using Infor.Sxe.OE.Data.Repositories;
using Infor.Sxe.SA.Data.Models.Pdssastplookup;
using Infor.Sxe.SA.Data.Repositories;
using Infor.Sxe.Shared.Data.Repositories;
using Logging.Helpers;
using Security.Security;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;

namespace General.Business.Services.SA
{
   public class Cenpos : ServiceBase, ICenpos
   {
      private readonly SastnRepository sastnRepository;

      private readonly AssainquiryRepository assainquiryRepository;

      private readonly AssasetupRepository assasetupRepository;

      private readonly AsoeheaderRepository asoeheaderRepository;

      private readonly AssharedinquiryRepository assharedinquiryRepository;

      private readonly ArssRepository arssRepository;

      private readonly ArscRepository arscRepository;

      private readonly AsarsetupRepository asarsetupRepository;

      public Cenpos(SastnRepository sastnRepository, AssainquiryRepository assainquiryRepository, AssasetupRepository assasetupRepository, AsoeheaderRepository asoeheaderRepository, AssharedinquiryRepository assharedinquiryRepository, ArssRepository arssRepository, ArscRepository arscRepository, AsarsetupRepository asarsetupRepository)
      {
         this.sastnRepository = sastnRepository;
         this.assainquiryRepository = assainquiryRepository;
         this.assasetupRepository = assasetupRepository;
         this.asoeheaderRepository = asoeheaderRepository;
         this.assharedinquiryRepository = assharedinquiryRepository;
         this.arssRepository = arssRepository;
         this.arscRepository = arscRepository;
         this.asarsetupRepository = asarsetupRepository;
      }

      public CenPosModel BuildCenPosUrl(
         string operation,
         int mediacd,
         decimal custno,
         string shipTo,
         string whse,
         string tokenId,
         string invoiceNo,
         string oneTimeType,
         decimal amountdecimal,
         bool runArsocPrecall,
         string ipaddress = "",
         decimal taxAmount = 0)
      {
         operation = operation.ToLower(CultureInfo.InvariantCulture);
         oneTimeType = oneTimeType.ToLower(CultureInfo.InvariantCulture);
         if ((operation != "sale") && (operation != "auth") && (operation != "add") && (operation != "modify")
             && (operation != "delete") && (operation != "signature"))
         {
            ErrorReportingHelper.ReportErrors("error.credit.card.invalidoperation", 421);
         }

         string myhost;
         var tokenObject = ApplicationCookieUtilities.Principal(HttpContext.Current.User, out myhost);

         switch (operation)
         {
            case "add":
               if (runArsocPrecall)
               {
                  var asarsetupARSOCCreditCardAddValidateRequestAPI =
                     new AsarsetupARSOCCreditCardAddValidateRequestAPI
                     {
                        dCustno = custno,
                        cShipTo = shipTo,
                        cMediaCd = mediacd.ToString()
                     };

                  this.asarsetupRepository.ARSOCCreditCardAddValidate(asarsetupARSOCCreditCardAddValidateRequestAPI);
               }
               break;
         }

         var merchantOveeride = false;
         var merchantId = string.Empty;
         var merchantUserId = string.Empty;
         var merchantUserPw = string.Empty;
         if (operation.Equals("auth")
             || operation.Equals("sale"))
         {
            var merchantResult = this.asoeheaderRepository.LoadOETenderingMerchant(whse, mediacd);
            if (!string.IsNullOrEmpty(merchantResult?.cMerchantID) && !string.IsNullOrEmpty(merchantResult.cMerchantUserID) && !string.IsNullOrEmpty(merchantResult.cMerchantUserPW))
            {
               merchantOveeride = true;
               merchantId = merchantResult.cMerchantID;
               merchantUserId = merchantResult.cMerchantUserID;
               merchantUserPw = merchantResult.cMerchantUserPW;
            }
         }

         var sastn = this.sastnRepository.Get(tokenObject.Cono, "p", mediacd, 1, "processor,addtaxfl,chkauth,ccaddontype,ccaddon");
            if (sastn == null)
            {
                ErrorReportingHelper.ReportErrors("error.credit.card.nosastn", 421);
                return null;
            }
            if (string.IsNullOrEmpty(sastn.processor))
            {
                ErrorReportingHelper.ReportErrors("error.credit.card.sastpempty", 421);
            }

            var sastplookupcriteria = new Sastplookupcriteria() { processno = Convert.ToInt32(sastn.processor) };
            var sastp = this.assainquiryRepository.SASTPlookup(sastplookupcriteria);
         if (string.IsNullOrEmpty(sastp?.callingURLH5))
         {
            ErrorReportingHelper.ReportErrors("error.credit.card.nosastp", 421);
         }

         var sb = new StringBuilder();
         sb.Append(sastp.callingURLH5);

         var cenPosModel = new CenPosModel();

         switch (operation)
         {
            case "signature":
                    cenPosModel.PopTitleType = "cenpos.popup.signature";
                    sb.Append("?type=signature");
                    break;

            case "sale":
               if (sastn.addtaxfl)
               {
                  if (string.Equals(oneTimeType, "sale") || string.Equals(oneTimeType, "roa"))
                  {
                     sb.Append("?type=SALE");
                     cenPosModel.PopTitleType = "global.cenpos.one.time.sale";
                  }
                  else if (string.Equals(oneTimeType, "credit"))
                  {
                     sb.Append("?type=Credit");
                     cenPosModel.PopTitleType = "global.cenpos.one.time.credit";
                  }
               }
               if (sastn.chkauth)
               {
                  if (string.Equals(oneTimeType, "achdebit") || string.Equals(oneTimeType, "roa"))
                  {
                     sb.Append("?type=ACHDebit");
                     cenPosModel.PopTitleType = "global.cenpos.one.time.ach";
                  }
                  else if (string.Equals(oneTimeType, "achcredit"))
                  {
                     sb.Append("?type=ACHCredit");
                     cenPosModel.PopTitleType = "global.cenpos.one.time.ach.credit";
                  }
               }
               sb.Append("&amount=" + Math.Abs(amountdecimal));
               sb.Append("&taxamount=" + (taxAmount));
               sb.Append("&receipts=false");
               break;
            case "auth":
               sb.Append("?type=Auth");
               sb.Append("&taxamount=" + (taxAmount));
               cenPosModel.PopTitleType = "global.cenpos.one.time.auth";

               if (sastn.ccaddontype)
               {
                  var newAmount = amountdecimal + sastn.ccaddon;
                  sb.Append("&amount=" + newAmount);
               }
               else
               {
                  var addonPercentage = sastn.ccaddon / 100;
                  var addonAmount = amountdecimal * addonPercentage;
                  var newAmount = amountdecimal + addonAmount;
                  sb.Append("&amount=" + newAmount);
               }
               sb.Append("&receipts=false");
               break;

            case "add":
            case "delete":
            case "modify":
               sb.Append(sastn.chkauth ? "?type=TokenCheck" : "?type=CreateToken");
               if (operation == "add")
               {
                  var taxableFlag = false;
                  if (string.IsNullOrEmpty(shipTo))
                  {
                     var arss = this.arssRepository.Get(tokenObject.Cono, custno, shipTo, 1, "taxablety");
                     if (arss != null)
                     {
                        taxableFlag = arss.taxablety.Equals("Y", StringComparison.InvariantCultureIgnoreCase)
                                      || arss.taxablety.Equals("V", StringComparison.InvariantCultureIgnoreCase);
                     }
                  }
                  else
                  {
                     var arsc = this.arscRepository.Get(tokenObject.Cono, custno, false, 1, "taxablety");
                     if (arsc != null)
                     {
                        taxableFlag = arsc.taxablety.Equals("Y", StringComparison.InvariantCultureIgnoreCase)
                                      || arsc.taxablety.Equals("V", StringComparison.InvariantCultureIgnoreCase);
                     }
                  }
                  sb.Append("&taxamount=" + (taxableFlag ? "1" : "0"));
               }

               if (sastn.chkauth && operation == "modify")
               {
                  ErrorReportingHelper.ReportErrors("message.ach.tokens.cannot.be.modified", 421);
               }
               switch (operation)
               {
                  case "add":
                     cenPosModel.PopTitleType = "cenpos.popup.onetimecardadd";
                     break;
                  case "modify":
                     cenPosModel.PopTitleType = "cenpos.popup.onetimecardmodify";
                     sb.Append("&operation=modify");
                     sb.Append("&token=" + tokenId);
                     sb.Append("&modifyavs=true");
                     break;

                  case "delete":
                     cenPosModel.PopTitleType = "cenpos.popup.onetimecarddelete";
                     sb.Append("&operation=delete");
                     sb.Append("&token=" + tokenId);
                     sb.Append("&modifyavs=true");
                     break;
               }
                    break;
         }
         sb.Append("&merchantid=" + (merchantOveeride ? merchantId : sastp.processorvendorid));
         sb.Append("&customercode=" + custno + (string.IsNullOrEmpty(shipTo) ? string.Empty : "|" + HttpUtility.UrlEncode(shipTo)));
         sb.Append("&invoice=" + invoiceNo);
         sb.Append("&userid=" + (merchantOveeride ? merchantUserId : sastp.processoruserid));
         var encodedPassword = Encoding.UTF8.GetBytes(merchantOveeride ? merchantUserPw : sastp.processoruserpw);
         var basePassword = Convert.ToBase64String(encodedPassword);
         var httpPassword = HttpUtility.UrlEncode(basePassword);
         sb.Append("&password=" + httpPassword);
         sb.Append("&sessionID=" + tokenObject.Cono.ToString("D4") + tokenObject.Oper.StripOffDomain());

         // For the signature operation we tell cenpos to respond via a window message instead of a url redirect because of url size constraints
         string responseType;
         if (operation == "signature") {
            responseType = "message";
         } else {
            responseType = sastp.responseURLH5.StartsWith("https", StringComparison.CurrentCultureIgnoreCase) ? "Restful" : "get";
         }
         sb.Append("&ResponseType=" + responseType);
         sb.Append("&RedirectType=self");

         if (!string.IsNullOrEmpty(ipaddress))
         {
            sb.Append("&ip=" + ipaddress);
         }

         // PMC 02/09/2018 - IBM AppScan - Reviewed, this code is coded as it should be.  The date time manipulation is to design.
         var externalToken = DateTime.UtcNow.ToString("yyyy-MM-ddHH:mm:ss.fff", CultureInfo.InvariantCulture);
         var addToResponse =
            $"?cono={tokenObject.Cono}&oper={tokenObject.Oper.StripOffDomain()}&sessionidprogress={tokenObject.Sessionid}&tokenpostgres={externalToken}";
         var request = AwsElbUtils.ReturnUrlRequired(HttpContext.Current.Request); ;
         // SAS 07/26/2016 - harcoding the repsonse URL for CenPOS
         var responseUrl = request + "ui/app/modules/shared/cen-pos/cen-pos-response.html";
         var encodedUrlResponse = Encoding.UTF8.GetBytes(responseUrl + addToResponse);
         var baseUrlResponse = Convert.ToBase64String(encodedUrlResponse);
         var httpUrlResponse = HttpUtility.UrlEncode(baseUrlResponse);
         sb.Append("&urlresponse=" + httpUrlResponse);
         cenPosModel.CenPosUri = sb.ToString();
         this.assharedinquiryRepository.CenPOSLogURL(cenPosModel.CenPosUri);
         return cenPosModel;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sastnRepository?.Dispose();
         this.assainquiryRepository?.Dispose();
         this.assasetupRepository?.Dispose();
         this.asoeheaderRepository?.Dispose();
         this.arssRepository?.Dispose();
         this.arscRepository?.Dispose();
         base.Dispose(true);
      }
   }
}