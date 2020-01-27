namespace ServiceInterfaceClient.Progress
{
   public static class SessionModelConstants
   {
      // valid values for PROGRESS.Session.SessionModel to designate appserver operating mode
      public const int SessionManaged = 0; // stateless, state-reset or state-aware
      public const int SessionFree = 1; // state-free
   }
}