using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.Pdswebextendcriteria;
using Infor.Sxe.Shared.Data.Models.Pdswebextendrecord;
using Infor.Sxe.Shared.Data.Models.Pdswebmodlistcriteria;
using Infor.Sxe.Shared.Data.Models.Pdswebmodrecord;
using Infor.Sxe.Shared.Data.Repositories;
using Newtonsoft.Json;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.Shared
{
   /// <summary>
   /// Functions for handling JSON-based views
   /// </summary>
   [RoutePrefix("api/shared/jsonview")]
   public class JsonViewApiController : ApiControllerBase
   {
      private readonly AssharedentryRepository _entryRepository;
      private readonly AssharedinquiryRepository _inquiryRepository;
      private readonly IJsonViewService _jsonViewService;
      private readonly string _currentBasePath;
      private const string BasePath = "/ui/app/";
      private const string BaseModulesPath = "ui/app/modules/";

      public JsonViewApiController(AssharedentryRepository entryRepository, AssharedinquiryRepository inquiryRepository, IJsonViewService jsonViewService)
      {
         this._entryRepository = entryRepository;
         this._inquiryRepository = inquiryRepository;
         this._jsonViewService = jsonViewService;
         this._currentBasePath = HttpContext.Current.Server.MapPath("~" + BasePath);
      }

      /// <summary>
      /// Export extensions based on rowids
      /// </summary>
      [HttpPost]
      [Route("exportextensions")]
      public HttpResponseMessage ExportExtensions(IEnumerable<string> rowIds)
      {
         var returnValue = this._jsonViewService.ExportExtensions(rowIds);
         var result = new HttpResponseMessage(HttpStatusCode.OK);
         if (returnValue != null)
         {
            result.Content = new ByteArrayContent(returnValue);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/binary");
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
               FileName = "extensions.zip"
            };
         }
         return result;
      }

      /// <summary>
      /// Export webmodifications based on rowids
      /// </summary>
      [HttpPost]
      [Route("exportwebmodifications")]
      public HttpResponseMessage ExportWebModifications(IEnumerable<string> rowIds)
      {
         var returnValue = this._jsonViewService.ExportWebModifications(rowIds);
         var result = new HttpResponseMessage(HttpStatusCode.OK);
         if (returnValue != null)
         {
            result.Content = new ByteArrayContent(returnValue);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/binary");
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
               FileName = "webmodifications.zip"
            };
         }
         return result;
      }

      /// <summary>
      /// Import extensions (Part 1)
      /// </summary>
      [HttpPost]
      [Route("importextensionspartone")]
      public async Task<IEnumerable<Webextendrecord>> ImportExtensionsPartOne(HttpRequestMessage request)
      {
         var requestStream = await request.Content.ReadAsByteArrayAsync();
         if (requestStream != null)
         {
            return this._jsonViewService.ImportExtensionsPartOne(requestStream);
         }
         return new List<Webextendrecord>();
      }

      /// <summary>
      /// Import web modifications (Part 1)
      /// </summary>
      [HttpPost]
      [Route("importwebmodificationspartone")]
      public async Task<IEnumerable<Webmodrecord>> ImportWebModificationsPartOne(HttpRequestMessage request)
      {
         var requestStream = await request.Content.ReadAsByteArrayAsync();
         if (requestStream != null)
         {
            return this._jsonViewService.ImportWebModificationsPartOne(requestStream);
         }
         return new List<Webmodrecord>();
      }

      /// <summary>
      /// Import extensions (Part 2)
      /// </summary>
      [HttpPost]
      [Route("importextensionsparttwo")]
      public void ImportExtensionsPartTwo(IEnumerable<Webextendrecord> webextendrecords)
      {
         this._jsonViewService.ImportExtensionsPartTwo(webextendrecords);
      }

      /// <summary>
      /// Import web modifications (Part 2)
      /// </summary>
      [HttpPost]
      [Route("importwebmodificationsparttwo")]
      public void ImportWebModificationsPartTwo(IEnumerable<Webmodrecord> webmodrecords)
      {
         this._jsonViewService.ImportWebModificationsPartTwo(webmodrecords);
      }


      /// <summary>
      /// Get a default json view from the file system
      /// </summary>
      [HttpGet]
      [Route("getdefaultview")]
      public string GetDefaultView(string path = "")
      {
         // Get file by path
         var viewAbsPath = GetViewFilePath(path);
         var defaultView = File.ReadAllText(viewAbsPath, Encoding.UTF8);
         return defaultView;
      }

      /// <summary>
      /// Get the default json view with the personalization data to be applied for this user
      /// </summary>
      [HttpGet]
      [Route("getview")]
      public JsonViewResponseApi GetView(string path = "", string profile = "", string user = "", bool disableExtensions = false, bool disablePersonalization = false)
      {
         var jsonViewResponseApi = new JsonViewResponseApi();
         var isExtensionView = IsExtensionView(path);
         string viewId;

         // Get default view file
         if (!isExtensionView)
         {
            var viewAbsPath = GetViewFilePath(path);
            var defaultView = File.ReadAllText(viewAbsPath, Encoding.UTF8);
            jsonViewResponseApi.view = defaultView;

            // Get viewId from json content in the file
            viewId = GetViewId(defaultView);
         }
         else
         {
            // For extension views the path is the viewId
            viewId = path;
         }

         if (viewId != string.Empty)
         {
            if (!disableExtensions)
            {
               // Build criteria to find the active extension record to use
               // Note: The call first tries to find a record for the current cono, otherwise for the system (cono of 0).
               var criteria = new Webextendcriteria {screenname = viewId};

               // Get extension record
               var webExtendRecord = this._inquiryRepository.GetActiveWebExtension(criteria);

               // Set the response with the found record or with null (the backend can't return null so it instead returns an object with null values)
               jsonViewResponseApi.webextendrecord = (webExtendRecord?.webextendRowID != null) ? webExtendRecord : null;
            }

            if (!disablePersonalization)
            {
               // Build criteria to find the active personalization record to use
               // Note: The call uses this criteria in a very specific way, following our personalization priorty order.
               //       1st, it tries to find a record by screenname, cono, and operator.
               //       2nd (if 1st fails), it tries to find a record by screenname, cono, and profile.
               //       3rd (if 2nd fails), it tries to find a record by screenname and cono.
               var criteria = new Webmodlistcriteria
               {
                  screenname = viewId,
                  profile = profile,
                  @operator = user
               };

               // Get personalization record
               var webModRecord = this._entryRepository.GetActiveWebModification(criteria);

               // Set the response with the found record or with null (the backend can't return null so it instead returns an object with null values)
               jsonViewResponseApi.webmodrecord = (webModRecord?.webmodRowID != null) ? webModRecord : null;
            }
         }

         return jsonViewResponseApi;
      }

      /// <summary>
      /// Get a view path from the given view id
      /// </summary>
      [HttpGet]
      [Route("getviewpathfromid")]
      public string GetViewPathFromId(string id = "")
      {
         string path = null;

         // The viewId is stored in the json of the default view files. To match the viewId with the file path
         // we need to read files until we find a match.

         // Get directory to search for the file (we know the module from the 1st piece of the viewId so we can narrow the search down)
         var module = (id.IndexOf('-') > 0) ? id.Substring(0, id.IndexOf('-')) : "";
         var absDirPath = PathHelpers.CleanPath(this._currentBasePath + "modules\\", module);
         if (string.IsNullOrEmpty(absDirPath))
         {
            ErrorReportingHelper.ReportProgramErrors("Attempt to traverse outside allowed bounds ({id})");
            return string.Empty;
         }

         // Get list of json view files
         var files = Directory.GetFiles(absDirPath, "*.json", SearchOption.AllDirectories);

         // Check each file
         foreach (var fileName in files)
         {
            var json = File.ReadAllText(fileName, Encoding.UTF8);

            // If found the file, then return the relative path
            if (id == GetViewId(json)) {
               path = fileName.Replace("\\", "/");
               path = path.Substring(path.LastIndexOf(BaseModulesPath, StringComparison.Ordinal) + 15);
               break;
            }
         }

         return path;
      }

      /// <summary>
      /// Get a template
      /// </summary>
      [HttpGet]
      [Route("gettemplate")]
      public string GetTemplate(string type = "")
      {
         string templateFile;

         switch (type.ToUpper())
         {
            case "BLANK":
               templateFile = "blank.json";
               break;
            case "STANDARD":
               templateFile = "module-container.json";
               break;
            case "CAP":
               templateFile = "contextual-action-panel.json";
               break;
            case "LOOKUP_MODAL":
               templateFile = "lookup-modal.json";
               break;
            case "LOOKUP_MODAL_IES":
               templateFile = "lookup-modal-ies.json";
               break;
            case "MODAL":
               templateFile = "modal.json";
               break;
            case "ROW_DETAIL":
               templateFile = "row-detail.json";
               break;
            default:
               templateFile = "blank.json";
               break;
         }
         var absPath = PathHelpers.CleanPath(HttpContext.Current.Server.MapPath("~" + "\\Controllers\\WebAPI\\CodeGen\\Templates\\Shared\\"), templateFile);
         return File.ReadAllText(absPath, Encoding.UTF8);
      }

      /// <summary>
      /// Generate a custom inquiry function
      /// </summary>
      [HttpPost]
      [Route("getcustomsource/inquiry")]
      public Dictionary<string, string> GenerateCustomInquiryFunction()
      {
         var map = new Dictionary<string, string>();
         string templateDir = "Controllers/WebAPI/CodeGen/TemplatesCustom/Inquiry/";

         // Get code gen params
         string module = HttpContext.Current.Request.Params["module"];
         string menuFn = HttpContext.Current.Request.Params["menuFn"];
         string recordName = HttpContext.Current.Request.Params["recordName"];
         string menuFnCapitalized = menuFn.Substring(0, 1).ToUpper() + menuFn.Substring(1);
         string keyField = HttpContext.Current.Request.Params["keyField"];

         // Get file contents for templates
         string functionTemplateContent = ReadFile(templateDir + "inquiry.js");
         string masterTemplateContent = ReadFile(templateDir + "master.json");
         string detailTemplateContent = ReadFile(templateDir + "detail.json");
         string searchTemplateContent = ReadFile(templateDir + "search.json");

         // Generate function js
         string functionNewContent = functionTemplateContent;
         functionNewContent = functionNewContent.Replace("Xxxx", menuFnCapitalized);
         functionNewContent = functionNewContent.Replace("xxxx", menuFn);
         functionNewContent = functionNewContent.Replace("xx", module);
         functionNewContent = functionNewContent.Replace("RECORD_NAME", recordName);

         // Generate master view
         string masterNewContent = masterTemplateContent;
         masterNewContent = masterNewContent.Replace("xxxx", menuFn);
         masterNewContent = masterNewContent.Replace("xx", module);

         // Generate detail view
         string detailNewContent = detailTemplateContent;
         detailNewContent = detailNewContent.Replace("xxxx", menuFn);
         detailNewContent = detailNewContent.Replace("xx", module);
         detailNewContent = detailNewContent.Replace("KEY_FIELD", keyField);

         // Generate search view
         string searchNewContent = searchTemplateContent;
         searchNewContent = searchNewContent.Replace("xxxx", menuFn);
         searchNewContent = searchNewContent.Replace("xx", module);
         searchNewContent = searchNewContent.Replace("KEY_FIELD", keyField);

         map.Add("jsCode", functionNewContent);
         map.Add("masterView", masterNewContent);
         map.Add("detailView", detailNewContent);
         map.Add("searchView", searchNewContent);

         return map;
      }

      /// <summary>
      /// Generate a custom setup function
      /// </summary>
      [HttpPost]
      [Route("getcustomsource/setup")]
      public Dictionary<string, string> GenerateCustomSetupFunction()
      {
         var map = new Dictionary<string, string>();
         string templateDir = "Controllers/WebAPI/CodeGen/TemplatesCustom/Setup/";

         // Get code gen params
         string module = HttpContext.Current.Request.Params["module"];
         string menuFn = HttpContext.Current.Request.Params["menuFn"];
         string menuFnCapitalized = menuFn.Substring(0, 1).ToUpper() + menuFn.Substring(1);
         string keyField = HttpContext.Current.Request.Params["keyField"];
         string searchMethod = HttpContext.Current.Request.Params["searchMethod"];
         string searchPath = HttpContext.Current.Request.Params["searchPath"];
         string searchResultsField = HttpContext.Current.Request.Params["searchResultsField"];
         string resultsRowIdField = HttpContext.Current.Request.Params["resultsRowIdField"];

         // Get file contents for templates
         string functionTemplateContent = ReadFile(templateDir + "setup.js");
         string masterTemplateContent = ReadFile(templateDir + "master.json");
         string detailTemplateContent = ReadFile(templateDir + "detail.json");
         string searchTemplateContent = ReadFile(templateDir + "search.json");

         // Generate function js
         string functionNewContent = functionTemplateContent;
         functionNewContent = functionNewContent.Replace("Xxxx", menuFnCapitalized);
         functionNewContent = functionNewContent.Replace("xxxx", menuFn);
         functionNewContent = functionNewContent.Replace("xx", module);
         functionNewContent = functionNewContent.Replace("KEY_FIELD", keyField);
         functionNewContent = functionNewContent.Replace("SEARCH_METHOD", searchMethod);
         functionNewContent = functionNewContent.Replace("SEARCH_PATH", searchPath);
         functionNewContent = functionNewContent.Replace("SEARCH_RESULTS_FIELD", searchResultsField);
         functionNewContent = functionNewContent.Replace("RESULTS_ROW_ID_FIELD", resultsRowIdField);

         // Generate master view
         string masterNewContent = masterTemplateContent;
         masterNewContent = masterNewContent.Replace("xxxx", menuFn);
         masterNewContent = masterNewContent.Replace("xx", module);
         masterNewContent = masterNewContent.Replace("KEY_FIELD", keyField);

         // Generate detail view
         string detailNewContent = detailTemplateContent;
         detailNewContent = detailNewContent.Replace("xxxx", menuFn);
         detailNewContent = detailNewContent.Replace("xx", module);
         detailNewContent = detailNewContent.Replace("KEY_FIELD", keyField);

         // Generate search view
         string searchNewContent = searchTemplateContent;
         searchNewContent = searchNewContent.Replace("xxxx", menuFn);
         searchNewContent = searchNewContent.Replace("xx", module);
         searchNewContent = searchNewContent.Replace("KEY_FIELD", keyField);

         map.Add("jsCode", functionNewContent);
         map.Add("masterView", masterNewContent);
         map.Add("detailView", detailNewContent);
         map.Add("searchView", searchNewContent);

         return map;
      }

      /// <summary>
      /// Generate a custom transaction function
      /// </summary>
      [HttpPost]
      [Route("getcustomsource/transaction")]
      public Dictionary<string, string> GenerateCustomTransactionFunction()
      {
         var map = new Dictionary<string, string>();
         string templateDir = "Controllers/WebAPI/CodeGen/TemplatesCustom/Transaction/";

         // Get code gen params
         string module = HttpContext.Current.Request.Params["module"];
         string menuFn = HttpContext.Current.Request.Params["menuFn"];
         string menuFnCapitalized = menuFn.Substring(0, 1).ToUpper() + menuFn.Substring(1);
         string keyField = HttpContext.Current.Request.Params["keyField"];

         // Get file contents for templates
         string ctrlTemplateContent = ReadFile(templateDir + "transaction.js");
         string masterTemplateContent = ReadFile(templateDir + "master.json");
         string detailTemplateContent = ReadFile(templateDir + "detail.json");
         string searchTemplateContent = ReadFile(templateDir + "search.json");

         // Generate ctrl
         string ctrlNewContent = ctrlTemplateContent;
         ctrlNewContent = ctrlNewContent.Replace("Xxxx", menuFnCapitalized);
         ctrlNewContent = ctrlNewContent.Replace("xxxx", menuFn);
         ctrlNewContent = ctrlNewContent.Replace("xx", module);

         // Generate master view
         string masterNewContent = masterTemplateContent;
         masterNewContent = masterNewContent.Replace("xxxx", menuFn);
         masterNewContent = masterNewContent.Replace("xx", module);

         // Generate detail view
         string detailNewContent = detailTemplateContent;
         detailNewContent = detailNewContent.Replace("xxxx", menuFn);
         detailNewContent = detailNewContent.Replace("xx", module);
         detailNewContent = detailNewContent.Replace("KEY_FIELD", keyField);

         // Generate search view
         string searchNewContent = searchTemplateContent;
         searchNewContent = searchNewContent.Replace("xxxx", menuFn);
         searchNewContent = searchNewContent.Replace("xx", module);
         searchNewContent = searchNewContent.Replace("KEY_FIELD", keyField);

         map.Add("jsCode", ctrlNewContent);
         map.Add("masterView", masterNewContent);
         map.Add("detailView", detailNewContent);
         map.Add("searchView", searchNewContent);

         return map;
      }

#if DEBUG
      /// <summary>
      /// Save a default view to a json file
      /// </summary>
      [HttpPost]
      [Route("savedefaultview")]
      public void SaveDefaultView(string path = "")
      {
         // Get json file path
         var jsonFilePath = GetViewFilePath(path);

         // Get json from request body
         var receiveStream = HttpContext.Current.Request.InputStream;
         var readStream = new StreamReader(receiveStream, Encoding.UTF8);
         var jsonString = readStream.ReadToEnd();

         // Format JSON to be readable before saving
         using (var stringReader = new StringReader(jsonString))
         using (var stringWriter = new StringWriter())
         using (var jsonReader = new JsonTextReader(stringReader))
         using (var jsonWriter = new JsonTextWriter(stringWriter) { Formatting = Formatting.Indented })
         {
            jsonWriter.WriteToken(jsonReader);
            jsonString = stringWriter.ToString();
         }

         // Write to json file
         File.WriteAllText(jsonFilePath, jsonString);
      }
#endif

      /// <summary>
      /// Get source code tree
      /// </summary>
      [HttpGet]
      [Route("getsourcecodetree")]
      public string GetSourceCodeTree()
      {
         // Let the root of the source code tree be the "/ui" folder
         string rootSourcePath = PathHelpers.CleanPath(HttpContext.Current.Server.MapPath("~/ui"), "");

         // Determine length of absolute path to remove from files in order to have relative web file paths
         int basePathLength = HttpContext.Current.Server.MapPath("~/").Length;

         // Traverse root and recursively all children
         string str = TraverseDirectory(rootSourcePath, basePathLength);

         return str;
      }

      /// <summary>
      /// Recursive function to build json for a directory
      /// </summary>
      private string TraverseDirectory(string directory, int basePathLength)
      {
         // Add this dir
         string str = "{\"name\": \"" + Path.GetFileName(directory) + "\", ";

         // Get files and sub directories
         string[] files = Directory.GetFiles(directory, "*.*", SearchOption.TopDirectoryOnly);
         string[] directories = Directory.GetDirectories(directory, "*", SearchOption.TopDirectoryOnly);

         // Add files
         string fileStr = "";
         foreach (string file in files) {
            // Get relative path and convert system slashes to web slashes
            string path = file.Remove(0, basePathLength).Replace("\\", "/");

            // Exclude some files from customer visibility
            if (path.Equals("ui/app/app.min.js") || path.Equals("ui/app/index.html") || path.Equals("ui/lib/vendor.js")) {
               continue;
            }

            if (fileStr.Length > 0) {
               fileStr += ", ";
            }

            // Add file name
            fileStr += "{\"name\": " + "\"" + Path.GetFileName(file) + "\", ";

            // Add relative path
            fileStr += "\"path\": \"" + path + "\"}";
         }
         str += "\"files\": [" + fileStr + "], ";

         // Process children dirs
         string dirStr = "";
         foreach (string dir in directories) {
            // Exclude the "dev" folder from customer visibility
            if (dir.Replace("\\", "/").EndsWith("ui/app/dev")) {
               continue;
            }

            if (dirStr.Length > 0) {
               dirStr += ", ";
            }

            // Traverse child
            dirStr += TraverseDirectory(dir, basePathLength);
         }
         str += "\"children\": [" + dirStr + "]";

         return str + "}";
      }

      /// <summary>
      /// Check if is extension view (meaning no default view)
      /// </summary>
      private static bool IsExtensionView(string viewPath)
      {
         // We know it's an extension view (no default view) if the path starts with "extension-"
         return viewPath.StartsWith("extension-");
      }

      /// <summary>
      /// Get absolute view file path from the viewPath
      /// </summary>
      private string GetViewFilePath(string viewPath)
      {
         var reportViewPath = viewPath;
         if (string.IsNullOrEmpty(viewPath))
         {
            ErrorReportingHelper.ReportProgramErrors("Viewpath is empty");
            return string.Empty;
         }
         if (viewPath.StartsWith("/"))
         {
            viewPath = viewPath.Replace("/ui/app/", string.Empty);
            viewPath = PathHelpers.CleanPath(this._currentBasePath, viewPath);
         }
         else
         {
            viewPath = PathHelpers.CleanPath(this._currentBasePath + "modules\\", viewPath);
         }

         if (!string.IsNullOrEmpty(viewPath))
         {
            viewPath = Path.GetExtension(viewPath).Equals(".json", StringComparison.InvariantCultureIgnoreCase) ? viewPath : "";
            if (string.IsNullOrEmpty(viewPath))
            {
               ErrorReportingHelper.ReportProgramErrors($"Only json files can be retrieved. ({reportViewPath})");
               return string.Empty;
            }
         }
         else
         {
            ErrorReportingHelper.ReportProgramErrors($"Viewpath was outside of allowed folders ({reportViewPath})");
            return string.Empty;
         }
         return viewPath;
      }

      /// <summary>
      /// Get viewId from the given json view string
      /// </summary>
      private string GetViewId(string json)
      {
         // Note: For the sake of performance we are extracting the value from the string using indexOf
         //       instead of converting to an object and then accessing.

         // Get index of the start of the viewId property
         var propertyIndex = json.IndexOf("\"viewId\"", StringComparison.InvariantCultureIgnoreCase);

         if (propertyIndex >= 0)
         {
            // Get index right after the viewId property ends (after the 2nd quote in "viewId")
            var separatorIndex = propertyIndex + 8;

            // Get index of the " that starts the viewId value (and add 1)
            var startIndex = json.IndexOf("\"", separatorIndex, StringComparison.InvariantCultureIgnoreCase) + 1;

            // Get index of the " that ends the value
            var endIndex = json.IndexOf("\"", startIndex, StringComparison.InvariantCultureIgnoreCase);
            var length = endIndex - startIndex;

            // Extract the viewId value
            return json.Substring(startIndex, length);
         }
         else
         {
            return string.Empty;
         }
      }

      /// <summary>
      /// Read a file
      /// </summary>
      private string ReadFile(string relPath)
      {
         string absPath = HttpContext.Current.Server.MapPath("~/" + relPath);
         return File.ReadAllText(absPath, Encoding.UTF8);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         _entryRepository?.Dispose();
         _inquiryRepository?.Dispose();
         _jsonViewService?.Dispose();
         base.Dispose(true);
      }
   }
}