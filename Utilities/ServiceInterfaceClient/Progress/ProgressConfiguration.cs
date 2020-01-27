using System;
using System.Collections.Specialized;
using System.Configuration;
using System.Globalization;
using System.Linq;
using Security.Security;

namespace ServiceInterfaceClient.Progress
{
   public class ProgressConfiguration : IProgressConfiguration
   {
      private const string SettingKeyPrimaryAppServerConnectionUrl = "PROGRESS.Session.Url";


      // Single Sign On - Multi Tenant
      private const string SettingKeyInforSsoEnabled = "Infor.SSO.Enabled";
      private const string SettingKeyInforSsoTokenforidentity = "Infor.SSO.TokenForIdentity";
      private const string SettingKeyInforSsoTokenfortenant = "Infor.SSO.TokenForTenant";
      private const string SettingKeyInforNonssoListoftenants = "Infor.NonSSO.ListOfTenants";
      private const string SettingKeyInforMultitenant = "Infor.MultiTenant";
      private const string SettingKeyInforSsoDeveloperlogin = "Infor.SSO.DeveloperLogin";
      private const string SettingKeyInforSsoDevelopertenant = "Infor.SSO.DeveloperTenant";
      private const string SettingKeyInforProgressOwnsconnection = "Infor.Progress.OwnsConnection";

      // Auto Provision
      private const string SettingKeyAutoProvisionEnabled = "Infor.SSO.AutoProvisionEnabled";
      private const string SettingKeyAutoProvisionTokenForEmail = "Infor.SSO.TokenForEmail";
      private const string SettingKeyAutoProvisionTokenForGivenName = "Infor.SSO.TokenForGivenName";
      private const string SettingKeyAutoProvisionTokenForLastName = "Infor.SSO.TokenForLastName";
      private const string SettingKeyAutoProvisionTokenForAccountingEntities = "Infor.SSO.TokenForAccountingEntities";
      private const string SettingKeyAutoProvisionTokenForSecurity = "Infor.SSO.TokenForSecurity";

      // Progress Compression Settings.
      private const string SettingKeyProgressSessionCompressionEnabled = "PROGRESS.Session.CompressionEnabled";
      private const string SettingKeyProgressSessionCompressionLevel = "PROGRESS.Session.CompressionLevel";
      private const string SettingKeyProgressSessionCompressionThreshold = "PROGRESS.Session.CompressionThreshold";

      // IDM Configuration.
      private const string SettingKeyInforIDMConsumerKey = "Infor.IDM.ConsumerKey";
      private const string SettingKeyInforIDMSharedSecret = "Infor.IDM.SharedSecret";
      private const string SettingKeyInforIDMUseCache = "Infor.IDM.UseCache";
      private const string SettingKeyInforIDMCacheExpirationAbsolute = "Infor.IDM.CacheExpirationAbsolute";

      // ION API Configuration
      private const string SettingKeyInforIONAPIRpEndpoint = "Infor.IONAPI.RpEndpoint";
      private const string SettingKeyInforIONAPIAppliesToEndpoint = "Infor.IONAPI.AppliesToEndpoint";
      private const string SettingKeyInforIONAPITokenType = "Infor.IONAPI.TokenType";
      private const string SettingKeyInforIONBearerTokenMinutes = "Infor.IONAPI.BearerToken.Lasts";

      //SSL Certificate override
      private const string SettingKeyInforOverrideHTTPSErrors = "Infor.Override.HTTPS";

      // Encrypt keys for token.
      private const string ApplicationEncryptKeyKey = "Infor.EncryptKey";
      private const string ApplicationEncryptIvKey = "Infor.EncryptIV";

      // Password for AO functions.
      private const string AoFunctionPW = "Infor.AO.Function.PW";


      private readonly NameValueCollection _appSettings;

      public ProgressConfiguration()
      {
         this._appSettings = ConfigurationManager.AppSettings;
      }

      public bool ProgressSessionCompressionEnabled => this._appSettings.AllKeys.Contains(SettingKeyProgressSessionCompressionEnabled) && this._appSettings[SettingKeyProgressSessionCompressionEnabled].Equals("true", StringComparison.CurrentCultureIgnoreCase);

      public int ProgressSessionCompressionLevel
      {
         get
         {
            if (this._appSettings.AllKeys.Contains(SettingKeyProgressSessionCompressionLevel))
            {
               if (int.TryParse(this._appSettings[SettingKeyProgressSessionCompressionEnabled], out var compressionLevel))
               {
                  return compressionLevel;
               }
            }
            return 0;
         }
      }

      public int ProgressSessionCompressionThreshold
      {
         get
         {
            if (this._appSettings.AllKeys.Contains(SettingKeyProgressSessionCompressionThreshold))
            {
               if (int.TryParse(this._appSettings[SettingKeyProgressSessionCompressionThreshold], out var compressionThreshhold))
               {
                  return compressionThreshhold;
               }
            }
            return 0;
         }
      }

      public string ApplicationEncryptKey => this._appSettings.AllKeys.Contains(ApplicationEncryptKeyKey) ? this._appSettings[ApplicationEncryptKeyKey] : string.Empty;

      public string ApplicationEncryptIv => this._appSettings.AllKeys.Contains(ApplicationEncryptIvKey) ? this._appSettings[ApplicationEncryptIvKey] : string.Empty;

      public string InforIdmConsumerKey => this._appSettings.AllKeys.Contains(SettingKeyInforIDMConsumerKey) ? this._appSettings[SettingKeyInforIDMConsumerKey] : string.Empty;

      public string InforIdmSharedSecret => this._appSettings.AllKeys.Contains(SettingKeyInforIDMSharedSecret) ? this._appSettings[SettingKeyInforIDMSharedSecret] : string.Empty;

      public bool InforIdmUseCache => this._appSettings.AllKeys.Contains(SettingKeyInforIDMUseCache) && this._appSettings[SettingKeyInforIDMUseCache].ToLower(CultureInfo.InvariantCulture) == "true";

      public int InforIdmCacheExpirationAbsolute
      {
         get
         {
            if (this._appSettings.AllKeys.Contains(SettingKeyInforIDMCacheExpirationAbsolute))
            {
               if (int.TryParse(this._appSettings[SettingKeyInforIDMCacheExpirationAbsolute], out var idmCacheExpiration))
               {
                  return idmCacheExpiration;
               }
            }
            return 120;
         }
      }

      public int InforIonBearerTokenLasts
      {
         get
         {
            if (this._appSettings.AllKeys.Contains(SettingKeyInforIONBearerTokenMinutes))
            {
               if (int.TryParse(this._appSettings[SettingKeyInforIONBearerTokenMinutes], out var ionBearerTokenLasts))
               {
                  return ionBearerTokenLasts;
               }
            }
            return 90;
         }
      }

      public string InforAoPassword => this._appSettings.AllKeys.Contains(AoFunctionPW) ? this._appSettings[AoFunctionPW] : "trout";

      public bool InforOverrideHttps => this._appSettings.AllKeys.Contains(SettingKeyInforOverrideHTTPSErrors) && this._appSettings[SettingKeyInforOverrideHTTPSErrors].ToLower(CultureInfo.InvariantCulture) == "true";

      public string InforIonApiRpEndpoint => this._appSettings.AllKeys.Contains(SettingKeyInforIONAPIRpEndpoint) ? this._appSettings[SettingKeyInforIONAPIRpEndpoint] : string.Empty;

      public string InforIonApiAppliesToEndpoint => this._appSettings.AllKeys.Contains(SettingKeyInforIONAPIAppliesToEndpoint) ? this._appSettings[SettingKeyInforIONAPIAppliesToEndpoint] : string.Empty;

      public string InforIonApiTokenType => this._appSettings.AllKeys.Contains(SettingKeyInforIONAPITokenType) ? this._appSettings[SettingKeyInforIONAPITokenType] : string.Empty;

      public bool InforProgressOwnsConnection => this._appSettings.AllKeys.Contains(SettingKeyInforProgressOwnsconnection) && this._appSettings[SettingKeyInforProgressOwnsconnection].Equals("true", StringComparison.CurrentCultureIgnoreCase);

      public string AppServerConnectionUrl => this._appSettings.AllKeys.Contains(SettingKeyPrimaryAppServerConnectionUrl) ? this._appSettings[SettingKeyPrimaryAppServerConnectionUrl] : string.Empty;

      public string TokenForIdentity => this._appSettings.AllKeys.Contains(SettingKeyInforSsoTokenforidentity) ? this._appSettings[SettingKeyInforSsoTokenforidentity] : string.Empty;

      public string TokenForTenant => this._appSettings.AllKeys.Contains(SettingKeyInforSsoTokenfortenant) ? this._appSettings[SettingKeyInforSsoTokenfortenant] : string.Empty;

      public bool SSoEnabled => this._appSettings.AllKeys.Contains(SettingKeyInforSsoEnabled) && this._appSettings[SettingKeyInforSsoEnabled].ToLower(CultureInfo.InvariantCulture) == "true";

      public bool AutoProvisionEnabled => this._appSettings.AllKeys.Contains(SettingKeyAutoProvisionEnabled) && this._appSettings[SettingKeyAutoProvisionEnabled].ToLower(CultureInfo.InvariantCulture) == "true";

      public string TokenForEmail => this._appSettings.AllKeys.Contains(SettingKeyAutoProvisionTokenForEmail) ? this._appSettings[SettingKeyAutoProvisionTokenForEmail] : string.Empty;

      public string TokenForGivenName => this._appSettings.AllKeys.Contains(SettingKeyAutoProvisionTokenForGivenName) ? this._appSettings[SettingKeyAutoProvisionTokenForGivenName] : string.Empty;

      public string AutoProvisionTokenForLastName => this._appSettings.AllKeys.Contains(SettingKeyAutoProvisionTokenForLastName) ? this._appSettings[SettingKeyAutoProvisionTokenForLastName] : string.Empty;

      public string AutoProvisionTokenForAccountingEntities => this._appSettings.AllKeys.Contains(SettingKeyAutoProvisionTokenForAccountingEntities) ? this._appSettings[SettingKeyAutoProvisionTokenForAccountingEntities] : string.Empty;

      public string AutoProvisionTokenForSecurity => this._appSettings.AllKeys.Contains(SettingKeyAutoProvisionTokenForSecurity) ? this._appSettings[SettingKeyAutoProvisionTokenForSecurity] : string.Empty;

      public string ListOfTenants => this._appSettings.AllKeys.Contains(SettingKeyInforNonssoListoftenants) ? this._appSettings[SettingKeyInforNonssoListoftenants] : string.Empty;

      public bool MultiTenant => this._appSettings.AllKeys.Contains(SettingKeyInforMultitenant) && this._appSettings[SettingKeyInforMultitenant].ToLower(CultureInfo.InvariantCulture) == "true";

      public string SsoDeveloperLogin => this._appSettings.AllKeys.Contains(SettingKeyInforSsoDeveloperlogin) ? this._appSettings[SettingKeyInforSsoDeveloperlogin] : string.Empty;

      public string SsoDeveloperTenant => this._appSettings.AllKeys.Contains(SettingKeyInforSsoDevelopertenant) ? this._appSettings[SettingKeyInforSsoDevelopertenant] : string.Empty;
   }
}