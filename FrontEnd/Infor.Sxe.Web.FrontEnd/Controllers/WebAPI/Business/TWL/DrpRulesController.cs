using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsdrpRules;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/drprules")]
   public class DrpRulesController : ApiControllerBase
   {
      private readonly IDrpRulesService drpRulesService;

      public DrpRulesController(IDrpRulesService drpRulesService)
      {
         this.drpRulesService = drpRulesService;
      }

      [HttpPost]
      [Route("gettwlautodroprules")]
      public IEnumerable<DrpRules> GetTWLAutoDropRules(GetTWLAutoDropRulesApi getTWLAutoDropRulesApi)
      {
         return this.drpRulesService.GetTWLAutoDropRules(getTWLAutoDropRulesApi);
      }

      [HttpGet]
      [Route("gettwlautodroprules/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{ruleCode:maxLength(18)}")]
      public IEnumerable<DrpRules> GetTWLDrpRulesInterfaces(string coNum, string whNum, string ruleCode, int batchsize = 0, string fldlist = "")
      {
         var getTWLAutoDropRulesApi = new GetTWLAutoDropRulesApi()
         {
            coNum = coNum,
            whNum = whNum,
            ruleCode = ruleCode,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.drpRulesService.GetTWLAutoDropRules(getTWLAutoDropRulesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.drpRulesService?.Dispose();
         base.Dispose(true);
      }
   }
}