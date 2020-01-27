//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 7622 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.Collections.Generic;
using System.Web.Http;
using ServiceInterfaceClient.BaseClasses;
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.VA
{  
   using Sxe.VA.Data.Models.PdsContext;
   using Sxe.VA.Data.Models.Pdsvaec;
   using Sxe.VA.Data.Models.Pdsmessaging;
   using Sxe.VA.Data.Models.Pdsvaifbuildvalist;
   using Sxe.VA.Data.Models.Complex;
   using Sxe.VA.Data.Repositories;
    
   [RoutePrefix("api/va/asvainquiry")]
   public partial class AsvainquiryApiController : ApiControllerBase
   {
      private readonly AsvainquiryRepository repository;
    
      public AsvainquiryApiController(AsvainquiryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("vaeccreatetemptable")]
      [HttpPost]
      public AsvainquiryVAECCreateTempTableResponseAPI VAECCreateTempTable(Vaeccriteria vaeccriteria)
      {
         return this.repository.VAECCreateTempTable(vaeccriteria);
      } 
  
      
      [Route("vaifbuildvalist")]
      [HttpPost]
      public AsvainquiryVAIFBuildVAListResponseAPI VAIFBuildVAList(Vaifbuildvalistcriteria vaifbuildvalistcriteria)
      {
         return this.repository.VAIFBuildVAList(vaifbuildvalistcriteria);
      } 
  
      
      [Route("vaifbuildvalistbyfetchwhere")]
      [HttpPost]
      public AsvainquiryVAIFBuildVAListbyFetchWhereResponseAPI VAIFBuildVAListbyFetchWhere()
      {
         return this.repository.VAIFBuildVAListbyFetchWhere();
      } 
  
      
      [Route("vaifbuildvalistbysearchwordindex")]
      [HttpPost]
      public AsvainquiryVAIFBuildVAListbySearchWordIndexResponseAPI VAIFBuildVAListbySearchWordIndex(AsvainquiryVAIFBuildVAListbySearchWordIndexRequestAPI AsvainquiryVAIFBuildVAListbySearchWordIndexRequestAPI)
      {
         return this.repository.VAIFBuildVAListbySearchWordIndex(AsvainquiryVAIFBuildVAListbySearchWordIndexRequestAPI);
      } 
  
      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.repository?.Dispose();
         base.Dispose(true);
      }
   }   
}
#pragma warning restore 1591
  