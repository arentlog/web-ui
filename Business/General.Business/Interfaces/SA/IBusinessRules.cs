using System;
using System.Collections.Generic;

namespace General.Business.Interfaces.SA
{
   public interface IBusinessRules : IDisposable
   {
      Dictionary<string, string> GetConfiguration(int cono, string category, string nodeNm, string ruleType, string attrname);

      Dictionary<string, string> GetConfigurationAtLogin(int cono);
   }
}