#if DEBUG
using Newtonsoft.Json;
using ServiceInterfaceClient.BaseClasses;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Http;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.CodeGen
{
   /// <summary>
   /// Functions for UI code generation
   /// </summary>
   [RoutePrefix("api/codegen")]
   public class CodeGenApiController : ApiControllerBase
   {
      /// <summary>
      /// Generate a view
      /// </summary>
      [HttpPost]
      [Route("view")]
      public string GenerateView()
      {
         string templateDir = "Controllers/WebAPI/CodeGen/Templates/Shared/";
         string templateFile = null;

         // Get code gen params
         string module = HttpContext.Current.Request.Params["module"];
         string menuFn = HttpContext.Current.Request.Params["menuFn"];
         string viewName = HttpContext.Current.Request.Params["viewName"];
         string viewFile = HttpContext.Current.Request.Params["viewFile"];
         string viewType = HttpContext.Current.Request.Params["viewType"];
         string parentViewId = HttpContext.Current.Request.Params["parentViewId"];

         // Get template file
         if (viewType == "BLANK") {
            templateFile = "blank.json";
         } else if (viewType == "STANDARD") {
            templateFile = "module-container.json";
         } else if (viewType == "CAP") {
            templateFile = "contextual-action-panel.json";
         } else if (viewType == "LOOKUP_MODAL") {
            templateFile = "lookup-modal.json";
         } else if (viewType == "LOOKUP_MODAL_IES") {
            templateFile = "lookup-modal-ies.json";
         } else if (viewType == "MODAL") {
            templateFile = "modal.json";
         } else if (viewType == "ROW_DETAIL") {
            templateFile = "row-detail.json";
         }

         // Get file contents for template
         string viewTemplateContent = ReadFile(templateDir + templateFile);

         // Generate view
         string viewNewContent = viewTemplateContent;
         viewNewContent = viewNewContent.Replace("xxxx", menuFn);
         viewNewContent = viewNewContent.Replace("xx", module);
         viewNewContent = viewNewContent.Replace("VIEW_NAME", viewName);
         if (parentViewId != null) {
            viewNewContent = viewNewContent.Replace("PARENT_VIEW_ID", parentViewId);
         }

         // Create directory (if it doesn't exist)
         string moduleDirRelPath = "ui/app/modules/" + module + "/" + menuFn;
         string moduleDirAbsPath = HttpContext.Current.Server.MapPath("~/" + moduleDirRelPath);
         Directory.CreateDirectory(moduleDirAbsPath);

         // Write new files
         string viewNewRelPath = moduleDirRelPath + "/" + viewFile;
         WriteFile(viewNewRelPath, viewNewContent);

         return "Created files: <br />" + viewNewRelPath;
      }

      /// <summary>
      /// Generate an inquiry function
      /// </summary>
      [HttpPost]
      [Route("function/inquiry")]
      public string GenerateInquiryFunction()
      {
         string templateDir = "Controllers/WebAPI/CodeGen/Templates/Inquiry/";
         string sharedDir = "Controllers/WebAPI/CodeGen/Templates/Shared/";

         // Get code gen params
         string module = HttpContext.Current.Request.Params["module"];
         string menuFn = HttpContext.Current.Request.Params["menuFn"];
         string recordName = HttpContext.Current.Request.Params["recordName"];
         string menuFnCapitalized = menuFn.Substring(0, 1).ToUpper() + menuFn.Substring(1);

         // Get file contents for templates
         string ctrlTemplateContent = ReadFile(templateDir + "inquiry.js");
         string masterTemplateContent = ReadFile(templateDir + "master.json");
         string detailTemplateContent = ReadFile(templateDir + "detail.json");
         string searchTemplateContent = ReadFile(sharedDir + "search.json");
         string advancedCriteriaTemplateContent = ReadFile(templateDir + "advanced-criteria.json");

         // Generate ctrl
         string ctrlNewContent = ctrlTemplateContent;
         ctrlNewContent = ctrlNewContent.Replace("Xxxx", menuFnCapitalized);
         ctrlNewContent = ctrlNewContent.Replace("xxxx", menuFn);
         ctrlNewContent = ctrlNewContent.Replace("xx", module);
         ctrlNewContent = ctrlNewContent.Replace("RECORD_NAME", recordName);

         // Generate master view
         string masterNewContent = masterTemplateContent;
         masterNewContent = masterNewContent.Replace("xxxx", menuFn);
         masterNewContent = masterNewContent.Replace("xx", module);

         // Generate detail view
         string detailNewContent = detailTemplateContent;
         detailNewContent = detailNewContent.Replace("xxxx", menuFn);
         detailNewContent = detailNewContent.Replace("xx", module);

         // Generate search view
         string searchNewContent = searchTemplateContent;
         searchNewContent = searchNewContent.Replace("xxxx", menuFn);
         searchNewContent = searchNewContent.Replace("xx", module);
         searchNewContent = searchNewContent.Replace("KEY_FIELD", "searchfield");

         // Generate advanced-criteria view
         string advancedCriteriaNewContent = advancedCriteriaTemplateContent;
         advancedCriteriaNewContent = advancedCriteriaNewContent.Replace("xxxx", menuFn);
         advancedCriteriaNewContent = advancedCriteriaNewContent.Replace("xx", module);

         // Create directory (if it doesn't exist)
         string moduleDirRelPath = "ui/app/modules/" + module + "/" + menuFn;
         string moduleDirAbsPath = HttpContext.Current.Server.MapPath("~/" + moduleDirRelPath);
         Directory.CreateDirectory(moduleDirAbsPath);

         // Create tabs directory
         Directory.CreateDirectory(moduleDirAbsPath + "/tabs");

         // Write new files
         string ctrlNewRelPath = moduleDirRelPath + "/" + menuFn + ".js";
         string masterNewRelPath = moduleDirRelPath + "/" + "master.json";
         string detailNewRelPath = moduleDirRelPath + "/" + "detail.json";
         string searchNewRelPath = moduleDirRelPath + "/" + "search.json";
         string advancedCriteriaNewRelPath = moduleDirRelPath + "/" + "advanced-criteria.json";
         WriteFile(ctrlNewRelPath, ctrlNewContent);
         WriteFile(masterNewRelPath, masterNewContent);
         WriteFile(detailNewRelPath, detailNewContent);
         WriteFile(searchNewRelPath, searchNewContent);
         WriteFile(advancedCriteriaNewRelPath, advancedCriteriaNewContent);

         // Add new include to index.html
         IncludeNewScript(ctrlNewRelPath);

         return "Created files: <br />" + ctrlNewRelPath + "<br />" + masterNewRelPath + "<br />" + detailNewRelPath + "<br />" + searchNewRelPath + "<br />" + advancedCriteriaNewRelPath;
      }

      /// <summary>
      /// Generate a setup function
      /// </summary>
      [HttpPost]
      [Route("function/setup")]
      public string GenerateSetupFunction()
      {
         string templateDir = "Controllers/WebAPI/CodeGen/Templates/Setup/";
         string sharedDir = "Controllers/WebAPI/CodeGen/Templates/Shared/";

         // Get code gen params
         // TODO: get these from request body instead of params
         string module = HttpContext.Current.Request.Params["module"];
         string menuFn = HttpContext.Current.Request.Params["menuFn"];
         string menuFnCapitalized = menuFn.Substring(0, 1).ToUpper() + menuFn.Substring(1);
         string keyField = HttpContext.Current.Request.Params["keyField"];
         string searchMethod = HttpContext.Current.Request.Params["searchMethod"];
         string searchPath = HttpContext.Current.Request.Params["searchPath"];
         string searchResultsField = HttpContext.Current.Request.Params["searchResultsField"];
         string resultsRowIdField = HttpContext.Current.Request.Params["resultsRowIdField"];

         // Get master grid columns from request body
         Stream receiveStream = HttpContext.Current.Request.InputStream;
         StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
         string masterGridColumns = readStream.ReadToEnd();

         // Get file contents for templates
         string functionTemplateContent = ReadFile(templateDir + "setup.js");
         string masterTemplateContent = ReadFile(templateDir + "master.json");
         string detailTemplateContent = ReadFile(templateDir + "detail.json");
         string searchTemplateContent = ReadFile(sharedDir + "search.json");

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
         masterNewContent = masterNewContent.Replace("\"MASTER_GRID_COLUMNS\"", masterGridColumns);
         // Need to format since master grid columns are dynamically built
         masterNewContent = FormatJson(masterNewContent);

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

         // Create directory (if it doesn't exist)
         string moduleDirRelPath = "ui/app/modules/" + module + "/" + menuFn;
         string moduleDirAbsPath = HttpContext.Current.Server.MapPath("~/" + moduleDirRelPath);
         Directory.CreateDirectory(moduleDirAbsPath);

         // Write new files
         string functionNewRelPath = moduleDirRelPath + "/" + menuFn + ".js";
         string masterNewRelPath = moduleDirRelPath + "/" + "master.json";
         string detailNewRelPath = moduleDirRelPath + "/" + "detail.json";
         string searchNewRelPath = moduleDirRelPath + "/" + "search.json";
         WriteFile(functionNewRelPath, functionNewContent);
         WriteFile(masterNewRelPath, masterNewContent);
         WriteFile(detailNewRelPath, detailNewContent);
         WriteFile(searchNewRelPath, searchNewContent);

         // Add new include to index.html
         IncludeNewScript(functionNewRelPath);

         return "Created files: <br />" + functionNewRelPath + "<br />" + masterNewRelPath + "<br />" + detailNewRelPath + "<br />" + searchNewRelPath;
      }

      /// <summary>
      /// Generate a transaction function
      /// </summary>
      [HttpPost]
      [Route("function/transaction")]
      public string GenerateTransactionFunction()
      {
         string templateDir = "Controllers/WebAPI/CodeGen/Templates/Transaction/";
         string sharedDir = "Controllers/WebAPI/CodeGen/Templates/Shared/";

         // Get code gen params
         string module = HttpContext.Current.Request.Params["module"];
         string menuFn = HttpContext.Current.Request.Params["menuFn"];
         string menuFnCapitalized = menuFn.Substring(0, 1).ToUpper() + menuFn.Substring(1);

         // Get file contents for templates
         string ctrlTemplateContent = ReadFile(templateDir + "transaction.js");
         string masterTemplateContent = ReadFile(templateDir + "master.json");
         string searchTemplateContent = ReadFile(sharedDir + "search.json");

         // Generate ctrl
         string ctrlNewContent = ctrlTemplateContent;
         ctrlNewContent = ctrlNewContent.Replace("Xxxx", menuFnCapitalized);
         ctrlNewContent = ctrlNewContent.Replace("xxxx", menuFn);
         ctrlNewContent = ctrlNewContent.Replace("xx", module);

         // Generate master view
         string masterNewContent = masterTemplateContent;
         masterNewContent = masterNewContent.Replace("xxxx", menuFn);
         masterNewContent = masterNewContent.Replace("xx", module);

         // Generate search view
         string searchNewContent = searchTemplateContent;
         searchNewContent = searchNewContent.Replace("xxxx", menuFn);
         searchNewContent = searchNewContent.Replace("xx", module);
         searchNewContent = searchNewContent.Replace("KEY_FIELD", "searchfield");

         // Create directory (if it doesn't exist)
         string moduleDirRelPath = "ui/app/modules/" + module + "/" + menuFn;
         string moduleDirAbsPath = HttpContext.Current.Server.MapPath("~/" + moduleDirRelPath);
         Directory.CreateDirectory(moduleDirAbsPath);

         // Write new files
         string ctrlNewRelPath = moduleDirRelPath + "/" + menuFn + ".js";
         string masterNewRelPath = moduleDirRelPath + "/" + "master.json";
         string searchNewRelPath = moduleDirRelPath + "/" + "search.json";
         WriteFile(ctrlNewRelPath, ctrlNewContent);
         WriteFile(masterNewRelPath, masterNewContent);
         WriteFile(searchNewRelPath, searchNewContent);

         // Add new include to index.html
         IncludeNewScript(ctrlNewRelPath);

         return "Created files: <br />" + ctrlNewRelPath + "<br />" + masterNewRelPath + "<br />" + searchNewRelPath;
      }

      /// <summary>
      /// Generate a simple entry function
      /// </summary>
      [HttpPost]
      [Route("function/simpleentry")]
      public string GenerateSimpleEntryFunction()
      {
         string templateDir = "Controllers/WebAPI/CodeGen/Templates/SimpleEntry/";

         // Get code gen params
         string module = HttpContext.Current.Request.Params["module"];
         string menuFn = HttpContext.Current.Request.Params["menuFn"];
         string menuFnCapitalized = menuFn.Substring(0, 1).ToUpper() + menuFn.Substring(1);

         // Get file contents for templates
         string ctrlTemplateContent = ReadFile(templateDir + "simple-entry.js");
         string masterTemplateContent = ReadFile(templateDir + "master.json");

         // Generate ctrl
         string ctrlNewContent = ctrlTemplateContent;
         ctrlNewContent = ctrlNewContent.Replace("Xxxx", menuFnCapitalized);
         ctrlNewContent = ctrlNewContent.Replace("xxxx", menuFn);
         ctrlNewContent = ctrlNewContent.Replace("xx", module);

         // Generate master view
         string masterNewContent = masterTemplateContent;
         masterNewContent = masterNewContent.Replace("xxxx", menuFn);
         masterNewContent = masterNewContent.Replace("xx", module);

         // Create directory (if it doesn't exist)
         string moduleDirRelPath = "ui/app/modules/" + module + "/" + menuFn;
         string moduleDirAbsPath = HttpContext.Current.Server.MapPath("~/" + moduleDirRelPath);
         Directory.CreateDirectory(moduleDirAbsPath);

         // Write new files
         string ctrlNewRelPath = moduleDirRelPath + "/" + menuFn + ".js";
         string masterNewRelPath = moduleDirRelPath + "/" + "master.json";
         WriteFile(ctrlNewRelPath, ctrlNewContent);
         WriteFile(masterNewRelPath, masterNewContent);

         // Add new include to index.html
         IncludeNewScript(ctrlNewRelPath);

         return "Created files: <br />" + ctrlNewRelPath + "<br />" + masterNewRelPath;
      }

      /// <summary>
      /// Read a file
      /// </summary>
      private string ReadFile(string relPath)
      {
         string absPath = HttpContext.Current.Server.MapPath("~/" + relPath);
         return File.ReadAllText(absPath, Encoding.UTF8);
      }

      /// <summary>
      /// Write a file
      /// </summary>
      private void WriteFile(string relPath, string content)
      {
         string absPath = HttpContext.Current.Server.MapPath("~/" + relPath);
         File.WriteAllText(absPath, content);
      }

      /// <summary>
      /// Add a new javascript include
      /// </summary>
      private void IncludeNewScript(string path)
      {
         string indexRelPath = "ui/app/index.html";
         string includesEndComment = "<!-- Menu functions:end -->";
         string menuFnInclude = "<script src=\"" + path + "\"></script>";
         string indexContent = ReadFile(indexRelPath);
         indexContent = indexContent.Replace(includesEndComment, menuFnInclude + "\n   " + includesEndComment);
         WriteFile(indexRelPath, indexContent);
      }

      /// <summary>
      /// Format JSON to be readable
      /// </summary>
      private string FormatJson(string input)
      {
         string json = null;

         using (var stringReader = new StringReader(input))
         using (var stringWriter = new StringWriter())
         using (var jsonReader = new JsonTextReader(stringReader))
         using (var jsonWriter = new JsonTextWriter(stringWriter) { Formatting = Formatting.Indented })
         {
            jsonWriter.WriteToken(jsonReader);
            json = stringWriter.ToString();
         }

         return json;
      }
   }
}
#endif