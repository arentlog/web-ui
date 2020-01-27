namespace ServiceInterfaceClient.Helpers
{
   public static class PathHelpers
   {
      public static string CleanPath(string basePath, string fileName)
      {
         var fullPath = System.IO.Path.GetFullPath(System.IO.Path.Combine(basePath, fileName));
         return fullPath.StartsWith(basePath) ? fullPath : string.Empty;
      }
   }
}