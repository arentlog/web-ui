using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using General.Business.Interfaces.SA;
using Infor.Sxe.SA.Data.Models.Complex;
using Infor.Sxe.SA.Data.Models.Pdssasbrcriteria;
using Infor.Sxe.SA.Data.Models.Pdssasbrresults;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.SA
{
   public class BusinessRules : ServiceBase, IBusinessRules
   {
      private readonly AssasetupRepository assasetupRepository;

      public BusinessRules(AssasetupRepository assasetupRepository)
      {
         this.assasetupRepository = assasetupRepository;
      }

      public Dictionary<string, string> GetConfiguration(int cono, string category, string nodeNm, string ruleType, string attrnm)
      {
         var webuiSettings = ReturnFilteredList(this.assasetupRepository.SASBRLoad(new Sasbrcriteria { category = category, nodenm = nodeNm, ruletype = ruleType, attrnm = attrnm, }), cono);
         return webuiSettings.ToDictionary(setting => setting.ruletype.ToUpper(CultureInfo.InvariantCulture) + "-" + setting.nodeNm.ToUpper(CultureInfo.InvariantCulture) + "-" + setting.attrNm.ToUpper(CultureInfo.InvariantCulture), setting => setting.rulevalue); ;
      }

      public Dictionary<string, string> GetConfigurationAtLogin(int cono)
      {
         this.assasetupRepository.SetConnectionFromToken();
         var webuiSettings = ReturnFilteredList(this.assasetupRepository.SASBRLoad(new Sasbrcriteria { category = "CONFIG", nodenm = "Infor.Webui" }), cono);
         return webuiSettings.ToDictionary(setting => setting.nodeNm.ToUpper(CultureInfo.InvariantCulture) + "-" + setting.attrNm.ToUpper(CultureInfo.InvariantCulture), setting => setting.rulevalue);
      }

      private static IEnumerable<Sasbrresults> ReturnFilteredList(AssasetupSASBRLoadResponseAPI webUiResults, int cono)
      {
         webUiResults.sasbrresults.RemoveAll(x => x.cono != 0 && x.cono != cono);
         var manipulatedList = webUiResults.sasbrresults.Where(x => x.cono == 0).ToList();
         foreach (var sasbr in webUiResults.sasbrresults.Where(x => x.cono != 0))
         {
            manipulatedList.RemoveAll(x => x.nodeNm.Equals(sasbr.nodeNm, StringComparison.InvariantCultureIgnoreCase) && x.attrNm.Equals(sasbr.attrNm, StringComparison.InvariantCultureIgnoreCase));
            manipulatedList.Add(sasbr);
         }
         return manipulatedList;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.assasetupRepository?.Dispose();
         base.Dispose(true);
      }
   }
}