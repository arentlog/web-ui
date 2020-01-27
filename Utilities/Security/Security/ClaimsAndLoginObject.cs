using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using Security.Enums;
using System.IdentityModel.Tokens;
using System;
using System.Xml;
using System.IO;
using System.IdentityModel.Services;

namespace Security.Security
{
   public class ClaimsAndLoginObject
   {
      private readonly IProgressConfiguration progressConfiguration;

      public ClaimsAndLoginObject(IProgressConfiguration progressConfiguration, bool preLogin, string tenant)
      {
         this.LoggingEMessages = new Dictionary<string, LoginErrorEnums>();
         this.LoggingIMessages = new List<string>();
         this.LoggingWMessages = new List<string>();
         this.InvalidLogin = false;

         try
         {
            this.progressConfiguration = progressConfiguration;
         }
         catch (Exception ex)
         {
            // PMC 02/09/2018 - IBM AppScan - This has been manually reviewed and passed as being safe - Does not reveal error, logs securely
            this.LoggingEMessages.Add("Part1 --> " + ex.Message, LoginErrorEnums.Unknown);
            return;
         }
         if (!this.SsoEnabled)
         {
            this.AutoProvisionEnabled = false;
            if (!preLogin)
            {
               if (!this.MultiTenant && !string.IsNullOrEmpty(tenant))
               {
                  this.InvalidLogin = true;
                  this.LoggingEMessages.Add("Tenant passed into login, not required",
                     LoginErrorEnums.TenantPassedInNotRequired);
                  return;
               }
               if (this.MultiTenant && string.IsNullOrEmpty(tenant))
               {
                  this.InvalidLogin = true;
                  this.LoggingEMessages.Add("No tenant passed into login, is required",
                     LoginErrorEnums.TenantNotPassedInRequired);
                  return;
               }
               if (this.MultiTenant && !this.ListOfTenants.Contains(tenant))
               {
                  this.InvalidLogin = true;
                  this.LoggingEMessages.Add("Tenant passed into login that does not exist",
                     LoginErrorEnums.TenantDoesntExist);
                  return;
               }
            }
            else
            {
               if (!string.IsNullOrEmpty(this.DeveloperLogin) && this.MultiTenant &&
                   string.IsNullOrEmpty(this.DeveloperTenant))
               {
                  this.InvalidLogin = true;
                  this.LoggingEMessages.Add("Developer Login Selected for multi-tenant but no tenant set",
                     LoginErrorEnums.DeveloperTenantNotSet);
                  return;
               }
               if (string.IsNullOrEmpty(this.DeveloperLogin) && this.MultiTenant && !this.ListOfTenants.Any())
               {
                  this.InvalidLogin = true;
                  this.LoggingEMessages.Add("Multi-Tenant Selected but no list provided",
                     LoginErrorEnums.TenantListNotProvided);
               }
            }
         }
         else
         {
            try
            {

               var claimsPrincipal = Thread.CurrentPrincipal as ClaimsPrincipal;
               this.InvalidLogin = !(claimsPrincipal != null && claimsPrincipal.Identity.IsAuthenticated);

               if (this.InvalidLogin)
               {
                  this.LoggingEMessages.Add("SSO Selected but no claims principal found or this is an unauthenticated user", LoginErrorEnums.SSOPrincipalIssue);
                  return;
               }
               if (claimsPrincipal != null)
               {
                  foreach (var claim in claimsPrincipal.Claims)
                  {
                     this.LoggingIMessages.Add($"Claim-{claim.Type} Value={claim.Value}");
                  }
               }
               this.Identity = this.ReturnClaimValueIfItExists("SettingKeyInforSsoTokenforidentity", progressConfiguration.TokenForIdentity, claimsPrincipal);
               if (string.IsNullOrEmpty(this.Identity))
               {
                  this.InvalidLogin = true;
                  return;
               }
               if (this.MultiTenant)
               {
                  this.Tenant = this.ReturnClaimValueIfItExists("SettingKeyInforSsoTokenfortenant", progressConfiguration.TokenForTenant, claimsPrincipal);
                  if (string.IsNullOrEmpty(this.Tenant))
                  {
                     this.InvalidLogin = true;
                     return;
                  }
               }
               this.AutoProvisionEnabled = this.progressConfiguration.AutoProvisionEnabled;
               if (this.AutoProvisionEnabled)
               {
                  this.IfsEmail = this.ReturnClaimValueIfItExists("SettingKeyAutoProvisionTokenForEmail", progressConfiguration.TokenForEmail, claimsPrincipal);
                  this.IfsGivenName = this.ReturnClaimValueIfItExists("SettingKeyAutoProvisionTokenForGivenName", progressConfiguration.TokenForGivenName, claimsPrincipal);
                  this.IfsLastName = this.ReturnClaimValueIfItExists("SettingKeyAutoProvisionTokenForLastName", progressConfiguration.AutoProvisionTokenForLastName, claimsPrincipal);
                  this.IfsAccountingEntities = this.ReturnClaimValueIfItExists("SettingKeyAutoProvisionTokenForAccountingEntities", progressConfiguration.AutoProvisionTokenForAccountingEntities, claimsPrincipal, false);
                  this.IfsSecurity = this.ReturnClaimValueIfItExists("SettingKeyAutoProvisionTokenForSecurity", progressConfiguration.AutoProvisionTokenForSecurity, claimsPrincipal);
                  this.AutoProvisionEnabled = !string.IsNullOrEmpty(this.IfsEmail) && !string.IsNullOrEmpty(this.IfsGivenName) && !string.IsNullOrEmpty(this.IfsLastName) && !string.IsNullOrEmpty(this.IfsSecurity);
                  if (!this.AutoProvisionEnabled)
                  {
                     this.LoggingWMessages.Add("Auto Provision has been diabled because a required value is missing");
                  }
               }
            }
            catch (Exception ex)
            {
               // PMC 02/09/2018 - IBM AppScan - This has been manually reviewed and passed as being safe - Does not reveal error, logs securely
               this.LoggingEMessages.Add($"ClaimsAndLoginObject error - {ex.Message}", LoginErrorEnums.Unknown);
            }
         }
      }

      public ClaimsAndLoginObject(IProgressConfiguration progressConfiguration, bool preLogin)
         : this(progressConfiguration, preLogin, string.Empty)
      {
      }

      public ClaimsAndLoginObject(IProgressConfiguration progressConfiguration)
         : this(progressConfiguration, true, string.Empty)
      {
      }

      public Dictionary<string, LoginErrorEnums> LoggingEMessages { get; set; }

      public List<string> LoggingIMessages { get; set; }

      public List<string> LoggingWMessages { get; set; }

      public string IfsEmail { get; }

      public string IfsGivenName { get; }

      public string IfsLastName { get; }

      public string IfsAccountingEntities { get; }

      public string IfsSecurity { get; }

      public string Tenant { get; }

      public string Identity { get; }

      public bool AutoProvisionEnabled { get; }

      public bool InvalidLogin { get; set; }

      public bool SsoEnabled => this.progressConfiguration.SSoEnabled;

      public bool MultiTenant => this.progressConfiguration.MultiTenant;

      public List<string> ListOfTenants
      {
         get
         {
            if (this.MultiTenant && !this.SsoEnabled && !string.IsNullOrEmpty(this.progressConfiguration.ListOfTenants))
            {
               return this.progressConfiguration.ListOfTenants.Split(';').ToList();
            }
            return new List<string>();
         }
      }

      public string DeveloperLogin
      {
         get
         {
#if (!DEBUG)
            return string.Empty;
#endif
            return this.progressConfiguration.SsoDeveloperLogin;
         }
      }

      public string DeveloperTenant
      {
         get
         {
#if (!DEBUG)
            return string.Empty;
#endif
            return this.progressConfiguration.SsoDeveloperTenant;
         }
      }

      private string ReturnClaimValueIfItExists(string claimType, string claimTypeValue, ClaimsPrincipal claimsPrincipal, bool error = true)
      {
         var returnValue = string.Empty;
         if (string.IsNullOrEmpty(claimTypeValue))
         {
            this.LoggingEMessages.Add($"Claim Type -{claimType} ClaimTypeValue Empty", LoginErrorEnums.KeyMissingFromWebConfig);
         }

         returnValue = claimsPrincipal.Claims.Where(x => x.Type == claimTypeValue).Aggregate(returnValue, (current, claim) => current + (string.IsNullOrEmpty(current) ? string.Empty : ",") + claim.Value);
         if (!string.IsNullOrEmpty(returnValue))
         {
            return returnValue;
         }

         if (error)
         {
            this.LoggingEMessages.Add($"Claim Type -{claimType} ClaimTypeValue -{claimTypeValue} Claim Empty", LoginErrorEnums.ClaimValueNotFound);
         }
         else
         {
            this.LoggingIMessages.Add($"Claim Type -{claimType} ClaimTypeValue -{claimTypeValue} Claim Empty");
         }
         return returnValue;
      }
   }
}