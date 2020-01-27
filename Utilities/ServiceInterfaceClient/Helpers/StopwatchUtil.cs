using System;
using System.Diagnostics;

using NLog;

namespace ServiceInterfaceClient.Helpers
{
   public static class StopwatchUtil
   {
      public static TimeSpan Time(Action action)
      {
         var stopwatch = Stopwatch.StartNew();
         action();
         stopwatch.Stop();
         MappedDiagnosticsContext.Set("elapsed", stopwatch.Elapsed.ToString());
         return stopwatch.Elapsed;
      }
   }
}