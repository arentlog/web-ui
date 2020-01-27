using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using com.infor.sxproxy.sharedproxy;
using com.infor.sxproxy.sharedproxy.StrongTypesNS;
using CommandLine;
using Progress.Open4GL.Proxy;

namespace CreateVersion
{
   internal static class CreateVersion
   {
      #region Constants

      private const string AbsolutePath = "WORKSPACE";

      private const string OperInUse = "operator in use.";

      private const string ReportName = "BuildVersion.txt";

      private const string WebConfigFile = "web.config";

      #endregion

      #region Static Fields

      private static readonly string[] ListOfVariableToPull = { "BUILD_NUMBER", "BUILD_ID", "SVN_REVISION" };

      #endregion

      #region Methods

      private static int Main(string[] args)
      {
         var errorLogPath = AppDomain.CurrentDomain.BaseDirectory + "\\ErrorLog.Txt";
         File.Delete(errorLogPath);
         var errorLines = new List<string> { "Build Version Error Log", "--------------------", string.Empty, "From Jenkins:" };
         // ----------------------------------
         // Pick up options from arguments
         // ----------------------------------
         var returnCode = 0;
         Parser.Default.ParseArguments<Options>(args)
            .WithParsed(opts =>
            {
               if (string.IsNullOrEmpty(opts.Password))
               {
                  opts.Password = opts.User;
               }
               var absolutePath = Environment.GetEnvironmentVariable(AbsolutePath);
               if (absolutePath == null)
               {
                  returnCode = - 1;
                  return;
               }

               if (!opts.NoAppServerCall)
               {
                  if (string.IsNullOrEmpty(opts.AppServerUrl))
                  {
                     // ----------------------------
                     // Read the web.config and attempt to get the URL from there
                     // ----------------------------
                     var webConfigFullName = Path.Combine(absolutePath, opts.HomeForReport, WebConfigFile);
                     if (!File.Exists(webConfigFullName))
                     {
                        errorLines.Add("web.config not found");
                        File.WriteAllLines(errorLogPath, errorLines);
                        returnCode = -2;
                        return;
                     }
                     var webConfig = XDocument.Load(webConfigFullName);
                     var firstOrDefault =
                        webConfig.Root?.Descendants("add")
                           .FirstOrDefault(x => x.Attribute("key")?.Value == "PROGRESS.Session.Url");
                     if (firstOrDefault != null)
                     {
                        opts.AppServerUrl = firstOrDefault.Attribute("value")?.Value;
                     }
                  }
                  if (string.IsNullOrEmpty(opts.AppServerUrl))
                  {
                     errorLines.Add("Never got an appserver url");
                     File.WriteAllLines(errorLogPath, errorLines);
                     returnCode = -2;
                     return;
                  }
               }

               // ----------------------------------
               // Jenkins Build Information
               // ----------------------------------
               var reportPathAndName = Path.Combine(absolutePath, opts.HomeForReport, ReportName);

               File.Delete(reportPathAndName);
               var lines = new List<string> { $"Build Version Report {Assembly.GetEntryAssembly().GetName().Version}", "------------------------------", string.Empty, DateTime.Now.ToLongDateString(), string.Empty, opts.Identity, string.Empty, string.Empty, "From Jenkins:" };
               lines.AddRange(
                  from environmentVar in ListOfVariableToPull
                  let environmentValue = Environment.GetEnvironmentVariable(environmentVar)
                  select $"  {environmentVar,-15}: {environmentValue ?? "Not set!"}");
               lines.Add(string.Empty);


               if (!opts.NoAppServerCall)
               {
                  // ----------------------------------
                  // DLL Processing
                  // ----------------------------------
                  lines.Add("From DLLs:");
                  var dlls = Directory.GetFiles(Path.Combine(absolutePath, opts.DllLocation), "*ProxyAppObject.DLL");
                  var versionList = new Dictionary<string, string>();
                  var defaultVersion = string.Empty;
                  var maxLength = 0;
                  foreach (var dll in dlls)
                  {
                     var assembly = Assembly.LoadFrom(dll);
                     var version = assembly.GetName().Version.ToString();
                     if (string.IsNullOrEmpty(defaultVersion))
                     {
                        defaultVersion = version;
                     }
                     var name = assembly.GetName().Name;
                     if (name.Length > maxLength)
                     {
                        maxLength = name.Length;
                     }
                     versionList.Add(name, version);
                  }
                  if (!string.IsNullOrEmpty(defaultVersion))
                  {
                     var countOfDefaultVersion = versionList.Count(d => d.Value.Equals(defaultVersion));
                     if (countOfDefaultVersion != versionList.Count)
                     {
                        lines.Add("  Warning not all DLL's contain the same version");
                        lines.AddRange(
                           versionList.Select(version => $"  {version.Key,-20}: {version.Value}"));
                     }
                     else
                     {
                        lines.Add($"  All DLLS are at version {defaultVersion}");
                     }
                  }
                  else
                  {
                     lines.Add("  Error getting SI version from DLL's");
                  }

                  // ----------------------------------------
                  // Progress SI Call to get more information
                  // ----------------------------------------
                  try
                  {
                     lines.Add(string.Empty);
                     lines.Add("From Sxe:");
                     var connection = new Connection(opts.AppServerUrl, "", "", "")
                     {
                        SessionModel = opts.SessionModel == "SL" ? 0 : 1
                     };
                     var sharedProxyAppObject = new SharedProxyAppObject(connection);
                     var pdsContextDataSet = new pdsContextDataSet();
                     var loginproxy = sharedProxyAppObject.CreatePO_loginproxy();

                     var pdsUserLoginDataSet = new pdsUserLoginDataSet();
                     pdsUserLoginDataSet.ttblUserLogin.AddttblUserLoginRow(
                        opts.User,
                        opts.Password,
                        opts.Cono,
                        string.Empty,
                        false,
                        !opts.Multitenant);
                     loginproxy.Login(ref pdsContextDataSet, ref pdsUserLoginDataSet, out var cErrorMessage);
                     var doRest = true;
                     if (pdsContextDataSet.HasErrors)
                     {
                        lines.Add(cErrorMessage);
                        doRest = false;
                     }
                     if (!string.IsNullOrEmpty(cErrorMessage) && !cErrorMessage.ToLower(CultureInfo.InvariantCulture).Contains(OperInUse.ToLower(CultureInfo.InvariantCulture)))
                     {
                        lines.Add(cErrorMessage);
                        doRest = false;
                     }
                     if (string.IsNullOrEmpty(cErrorMessage))
                     {
                        cErrorMessage = string.Empty;
                     }
                     if (doRest && cErrorMessage.ToLower(CultureInfo.InvariantCulture).Contains(OperInUse.ToLower(CultureInfo.InvariantCulture)))
                     {
                        loginproxy.ClearCoreSession(ref pdsContextDataSet, opts.Cono, opts.User, out cErrorMessage);
                        if (string.IsNullOrEmpty(cErrorMessage))
                        {
                           pdsUserLoginDataSet.ttblUserLogin.AddttblUserLoginRow(
                              opts.User,
                              opts.Password,
                              opts.Cono,
                              string.Empty,
                              false,
                              !opts.Multitenant);
                           loginproxy.Login(ref pdsContextDataSet, ref pdsUserLoginDataSet, out cErrorMessage);
                           if (!string.IsNullOrEmpty(cErrorMessage))
                           {
                              lines.Add(cErrorMessage);
                              doRest = false;
                           }
                        }
                        else
                        {
                           lines.Add(cErrorMessage);
                           doRest = false;
                        }
                     }
                     if (doRest)
                     {
                        string cDisplayVersion;
                        string cInternalVersion;
                        string cEsbVersion;
                        string cSiVersion;
                        using (var poAssharedinquiryproxy = sharedProxyAppObject.CreatePO_assharedinquiryproxy()
                           )
                        {
                           poAssharedinquiryproxy.GetSXVersionNumbers(
                              ref pdsContextDataSet,
                              out cErrorMessage,
                              out cDisplayVersion,
                              out cInternalVersion,
                              out cEsbVersion,
                              out cSiVersion);
                        }
                        if (!string.IsNullOrEmpty(cErrorMessage))
                        {
                           lines.Add(cErrorMessage);
                        }
                        else
                        {
                           lines.Add(string.Format($"  {"DisplayVersion",-20}: {cDisplayVersion}"));
                           lines.Add(string.Format($"  {"InternalVersion",-20}: {cInternalVersion}"));
                           lines.Add(string.Format($"  {"ESBVersion",-20}: {cEsbVersion}"));
                           lines.Add(string.Format($"  {"SIVersion",-20}: {cSiVersion}"));
                        }
                        loginproxy.Logout(ref pdsContextDataSet, out cErrorMessage);
                     }
                  }
                  catch (Exception e)
                  {
                     errorLines.Add(e.Message);
                     File.WriteAllLines(errorLogPath, errorLines);
                     returnCode = -3;
                     return;
                  }
               }

               // ----------------------------------
               // Write Final Build Information
               // ----------------------------------

               File.WriteAllLines(reportPathAndName, lines);
               returnCode = 0;

            })
            .WithNotParsed<Options>(errs =>
            {
            });

         return returnCode;
      }

      #endregion
   }

   internal class Options
   {
      #region Public Properties

      [Option('n', "noappservercall", Required = false, Default = false, HelpText = "noappservercall: True for  don't check DLL's or AppServer call")]
      public bool NoAppServerCall { get; set; }


      [Option('a', "appserverurl", Required = false, HelpText = "appserverurl: App Server URL")]
      public string AppServerUrl { get; set; }


      [Option('c', "cono", Required = false, Default = 5000, HelpText = "cono: Company number for Sxe")]
      public int Cono { get; set; }

      [Option('p', "password", Required = false, HelpText = "password: Sxe Password (if left blank same as user")]
      public string Password { get; set; }

      [Option('s', "sessionmodel", Default = "SF", Required = false,
         HelpText = "sessionmodel: SL=stateless, state-reset or state-aware, SF=state-free")]
      public string SessionModel { get; set; }

      [Option('h', "homeforreport", Required = false, Default = "FrontEnd\\Infor.Sxe.Web.FrontEnd",
      HelpText = "homeforreport: Where the report will be place")]
      public string HomeForReport { get; set; }

      [Option('u', "user", Required = false, Default = "sys", HelpText = "user:")]
      public string User { get; set; }

      [Option('d', "dlllocation", Required = false, Default = "lib\\ServiceInterfaceProxy", HelpText = "dlllocation: folder where dlls are")]
      public string DllLocation { get; set; }

      [Option('i', "identity", Required = true, Default = "", HelpText = "identity: folder where dlls are")]
      public string Identity { get; set; }

      [Option('m', "multitenant", Required = true, Default = false, HelpText = "multitenant: true for a multitenant login")]
      public bool Multitenant { get; set; }

      #endregion
   }
}