namespace Security.Security
{
   public interface IProgressConfiguration
   {
      bool ProgressSessionCompressionEnabled { get; }
      int ProgressSessionCompressionLevel { get; }
      int ProgressSessionCompressionThreshold { get; }
      bool InforProgressOwnsConnection { get; }
      string AppServerConnectionUrl { get; }
      string TokenForIdentity { get; }
      string TokenForTenant { get; }
      bool SSoEnabled { get; }
      bool AutoProvisionEnabled { get; }
      string TokenForEmail { get; }
      string TokenForGivenName { get; }
      string AutoProvisionTokenForLastName { get; }
      string AutoProvisionTokenForAccountingEntities { get; }
      string AutoProvisionTokenForSecurity { get; }
      string ListOfTenants { get; }
      bool MultiTenant { get; }
      string SsoDeveloperLogin { get; }
      string SsoDeveloperTenant { get; }
      bool InforIdmUseCache { get; }
      int InforIdmCacheExpirationAbsolute { get; }
      bool InforOverrideHttps { get; }
      string InforIonApiRpEndpoint { get; }
      string InforIonApiAppliesToEndpoint { get; }
      string InforIonApiTokenType { get; }
      string ApplicationEncryptKey { get; }
      string ApplicationEncryptIv { get; }
   }
}