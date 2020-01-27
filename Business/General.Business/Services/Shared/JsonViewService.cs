using System.Collections.Generic;
using System.Linq;
using System.Web;
using General.Business.Interfaces.Shared;
using Infor.Sxe.PV.Data.Repositories;
using Infor.Sxe.SA.Data.Models.Pdssasta;
using Infor.Sxe.SA.Data.Repositories;
using Infor.Sxe.Shared.Data.Models.Pdswebextendcriteria;
using Infor.Sxe.Shared.Data.Models.Pdswebextendrecord;
using Infor.Sxe.Shared.Data.Models.Pdswebmodcriteria;
using Infor.Sxe.Shared.Data.Models.Pdswebmodlistcriteria;
using Infor.Sxe.Shared.Data.Models.Pdswebmodrecord;
using Infor.Sxe.Shared.Data.Repositories;
using Logging.Helpers;
using Newtonsoft.Json;
using Security.Security;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Utilities;

namespace General.Business.Services.Shared
{
   public class JsonViewService : ServiceBase, IJsonViewService
   {
      private const string Noprofile = "No Profile";

      private readonly AssharedinquiryRepository _assharedinquiryRepository;

      private readonly AssharedentryRepository _assharedentryRepository;

      private readonly PvUserRepository _pvUserRepository;

      private readonly SastaRepository _sastaRepository;

      private readonly TokenObject _tokenObject;

      public JsonViewService(AssharedinquiryRepository assharedinquiryRepository, AssharedentryRepository assharedentryRepository, PvUserRepository pvUserRepository, SastaRepository sastaRepository)
      {
         this._assharedinquiryRepository = assharedinquiryRepository;
         this._assharedentryRepository = assharedentryRepository;
         this._pvUserRepository = pvUserRepository;
         this._sastaRepository = sastaRepository;
         string myhost;
         this._tokenObject = ApplicationCookieUtilities.Principal(HttpContext.Current.User, out myhost);
      }

      public byte[] ExportExtensions(IEnumerable<string> rowIds)
      {
         var webextendRecords = rowIds.Select(rowId => this._assharedinquiryRepository.WebExtensionRetrieve(new Webextendcriteria {webextensionrowid = rowId})).Where(returnRecord => returnRecord != null).ToList();
         return webextendRecords.Count > 0 ? ZipClass.Compress(JsonConvert.SerializeObject(webextendRecords)) : null;
      }

      public byte[] ExportWebModifications(IEnumerable<string> rowIds)
      {
         var webmodRecords = rowIds.Select(rowId => this._assharedentryRepository.WebModificationRead(new Webmodcriteria { webmodRowID = rowId})).Where(returnRecord => returnRecord != null).ToList();
         return webmodRecords.Count > 0 ? ZipClass.Compress(JsonConvert.SerializeObject(webmodRecords)) : null;
      }

      public IEnumerable<Webextendrecord> ImportExtensionsPartOne(byte[] zipFile)
      {
         var importObjectString = ZipClass.Decompress(zipFile);
         var webextendrecords = JsonConvert.DeserializeObject<IEnumerable<Webextendrecord>>(importObjectString);
         var importExtensions = webextendrecords as Webextendrecord[] ?? webextendrecords.ToArray();
         foreach (var webextendrecord in importExtensions)
         {
            if (webextendrecord.cono != 0)
            {
               webextendrecord.cono = this._tokenObject.Cono;
            }
         }
         return importExtensions;
      }

      public IEnumerable<Webmodrecord> ImportWebModificationsPartOne(byte[] zipFile)
      {
         var user = this._pvUserRepository.Get(this._tokenObject.Cono, this._tokenObject.Oper.StripOffDomain(), 1, "webmodificationaccesslevel");
         var allowCompany = user.webmodificationaccesslevel.ToLower() == "c";
         var allowProfile = allowCompany || user.webmodificationaccesslevel.ToLower() == "p";
         var allowUser = allowCompany || allowProfile || user.webmodificationaccesslevel.ToLower() == "u";

         if (!allowUser)
         {
            ErrorReportingHelper.ReportErrors("special.saapa.import.denied");
         }

         var importObjectString = ZipClass.Decompress(zipFile);
         var webmodRecords = JsonConvert.DeserializeObject<IEnumerable<Webmodrecord>>(importObjectString);
         var importWebMods = webmodRecords as Webmodrecord[] ?? webmodRecords.ToArray();
         foreach (var webmodrecord in importWebMods)
         {
            webmodrecord.cono = this._tokenObject.Cono;
            if (allowCompany && string.IsNullOrEmpty(webmodrecord.profile) &&
                string.IsNullOrEmpty(webmodrecord.@operator))
            {
               continue;
            }
            if (allowProfile)
            {
               if (string.IsNullOrEmpty(webmodrecord.profile) && string.IsNullOrEmpty(webmodrecord.@operator))
               {
                  webmodrecord.@operator = this.CheckUser(webmodrecord.@operator);
                  webmodrecord.errorMessage = "special.saapa.import.defaultoperatorset";

                  continue;
               }
               if (!string.IsNullOrEmpty(webmodrecord.profile))
               {
                  var profile  = this.CheckProfle(webmodrecord.profile);
                  if (profile == Noprofile)
                  {
                     webmodrecord.errorMessage = "special.saapa.import.noprofile";
                     webmodrecord.profile = string.Empty;
                     webmodrecord.profile = this.CheckUser(webmodrecord.@operator);
                  }

                  if (profile != webmodrecord.profile)
                  {
                     webmodrecord.errorMessage = "special.saapa.import.profileset";
                  }

                  webmodrecord.profile = this.CheckProfle(webmodrecord.profile);
                  continue;
               }
               var oper = this.CheckUser(webmodrecord.@operator);
               if (oper != webmodrecord.@operator)
               {
                  webmodrecord.errorMessage = "special.saapa.import.defaultoperatorset";
               }
               webmodrecord.@operator = oper;
               continue;
            }
            webmodrecord.profile = string.Empty;
            var operAlllowUser = this.CheckUser(webmodrecord.@operator);
            if (operAlllowUser != webmodrecord.@operator)
            {
               webmodrecord.errorMessage = "special.saapa.import.defaultoperatorset";
            }
            webmodrecord.@operator = operAlllowUser;
         }

         foreach (var webmodrecord in importWebMods)

         {
            var criteria = new Webmodlistcriteria() { screenname = webmodrecord.screenname, functionname = webmodrecord.functionname, recordcountlimit = 1 };
            if (string.IsNullOrEmpty(webmodrecord.profile) && string.IsNullOrEmpty(webmodrecord.@operator))
            {
               criteria.level = "c";
            }
            if (!string.IsNullOrEmpty(webmodrecord.profile))
            {
               criteria.level = "p";
               criteria.profile = webmodrecord.profile;
            }
            if (!string.IsNullOrEmpty(webmodrecord.@operator))
            {
               criteria.level = "o";
               criteria.@operator = webmodrecord.@operator;
            }

            webmodrecord.willOverwrite = this._assharedentryRepository.GetWebModificationList(criteria).webmodlistresults.Any();
         }
         return importWebMods;
      }

      public void ImportExtensionsPartTwo(IEnumerable<Webextendrecord> webextendrecords)
      {
         foreach (var webextendrecord in webextendrecords.OrderBy(a => a.screenname).ThenBy(a => a.revision))
         {
            var criteria = new Webextendcriteria { cono = webextendrecord.cono, screenname = webextendrecord.screenname, latestrevisiononly = true, level = "b", statustype = "b"};
            var list = this._assharedinquiryRepository.GetWebExtensionList(criteria).webextendrecord.Where(x => x.cono == webextendrecord.cono).ToList();
            if (list?.Count > 0)
            {
               var firstRecord = list.First();
               var newExtendRecord = this._assharedinquiryRepository.WebExtensionCreateRevision(new Webextendcriteria { webextensionrowid = firstRecord.webextendRowID });
               newExtendRecord.activefl = webextendrecord.activefl;
               newExtendRecord.functionname = firstRecord.functionname;
               newExtendRecord.screenname = firstRecord.screenname;
               newExtendRecord.settingvalue = webextendrecord.settingvalue;
               newExtendRecord.tag = webextendrecord.tag;
               newExtendRecord.descrip = webextendrecord.descrip;
               this._assharedinquiryRepository.WebExtensionUpdate(newExtendRecord);
               continue;
            }
            webextendrecord.rowpointer = string.Empty;
            this._assharedinquiryRepository.WebExtensionCreate(webextendrecord);
         }
      }

      public void ImportWebModificationsPartTwo(IEnumerable<Webmodrecord> webmodrecords)
      {
         foreach (var webmodrecord in webmodrecords.OrderBy(a => a.screenname))
         {
            var criteria = new Webmodlistcriteria() { screenname = webmodrecord.screenname, functionname = webmodrecord.functionname, recordcountlimit = 1 };
            if (string.IsNullOrEmpty(webmodrecord.profile) && string.IsNullOrEmpty(webmodrecord.@operator))
            {
               criteria.level = "c";
            }
            if (!string.IsNullOrEmpty(webmodrecord.profile))
            {
               criteria.level = "p";
               criteria.profile = webmodrecord.profile;
            }
            if (!string.IsNullOrEmpty(webmodrecord.@operator))
            {
               criteria.level = "o";
               criteria.@operator = webmodrecord.@operator;
            }

            var list = this._assharedentryRepository.GetWebModificationList(criteria);
            if (list?.webmodlistresults.Count > 0)
            {
               var firstRecord = list.webmodlistresults.First();
               var newExtendRecord = this._assharedentryRepository.WebModificationRead(new Webmodcriteria { webmodRowID = firstRecord.webmodRowID });
               newExtendRecord.settingvalue = webmodrecord.settingvalue;
               this._assharedentryRepository.WebModificationUpdate(newExtendRecord);
               continue;
            }
            webmodrecord.rowpointer = string.Empty;
            webmodrecord.webmodRowID = string.Empty;
            this._assharedentryRepository.WebModificationCreate(webmodrecord);
         }
      }

      private string CheckUser(string oper)
      {
         if (string.IsNullOrEmpty(oper))
         {
            return this._tokenObject.Oper.StripOffDomain();
         }
         var user = this._pvUserRepository.Get(this._tokenObject.Cono, oper, 1, "webmodificationaccesslevel");
         return user != null ? oper : this._tokenObject.Oper.StripOffDomain();
      }

      private string CheckProfle(string profile)
      {
         if (string.IsNullOrEmpty(profile))
         {
            return this.ReturnDefaultProfile();
         }
         var profileRecord = this._sastaRepository.Get(this._tokenObject.Cono, "PF", profile, 1, "codeval");
         return profileRecord != null ? profileRecord.codeval : this.ReturnDefaultProfile();
      }

      private string ReturnDefaultProfile()
      {
         var profile = this._sastaRepository.GetListAllByCono(this._tokenObject.Cono, 1, "codeval");
         var enumerable = profile as Sasta[] ?? profile.ToArray();
         return enumerable.Any() ? enumerable.First().codeval : Noprofile;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this._assharedinquiryRepository.Dispose();
         this._assharedentryRepository.Dispose();
         this._pvUserRepository.Dispose();
         this._sastaRepository.Dispose();
         base.Dispose(true);
      }
   }
}