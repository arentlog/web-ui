namespace Security.Enums
{
   public enum LoginErrorEnums
   {
      TenantPassedInNotRequired = 1,
      TenantNotPassedInRequired = 2,
      TenantDoesntExist = 3,
      DeveloperTenantNotSet = 4,
      SSOPrincipalIssue = 5,
      KeyMissingFromWebConfig = 6,
      ClaimValueNotFound = 7,
      NoCombinationOfUsersPassedBack = 8,
      AutoProvisionFailed = 9,
      NoUsersReturnedAfterAutoProvision = 10,
      TenantListNotProvided = 11,
      Unknown = 12
   }
}