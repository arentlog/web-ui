using System;

namespace Logging.Logging
{
   public interface ILogger
   {
      void Debug(string message);
      void Trace(string message);
      void Info(string message);
      void Warn(string message);
      void Error(string message);
      void ErrorException(string message, Exception exception);
      void Fatal(string message);
      void FatalException(string message, Exception exception);
      void Debug(string message, string functionName);
      void Trace(string message, string functionName);
      void Info(string message, string functionName);
      void Warn(string message, string functionName);
      void Error(string message, string functionName);
      void ErrorException(string message, Exception exception, string functionName);
      void Fatal(string message, string functionName);
      void FatalException(string message, Exception exception, string functionName);
   }
}