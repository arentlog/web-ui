using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/businessrules")]
   public class BusinessRulesApiController : ApiControllerBase
   {
      private readonly IBusinessRules businessRules;

      public BusinessRulesApiController(IBusinessRules businessRules)
      {
         this.businessRules = businessRules;
      }

      [HttpGet]
      [Route("getbusinessrules/{cono:int:min(1):max(9999)}")]
      public Dictionary<string, string> GetConfiguration(int cono, string category = "", string nodeNm = "", string ruleType = "", string attrnm = "")
      {
         return this.businessRules.GetConfiguration(cono, category, nodeNm, ruleType, attrnm);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.businessRules?.Dispose();
         base.Dispose(true);
      }
   }
}