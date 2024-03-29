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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.IC
{  
   using Sxe.IC.Data.Models.PdsContext;
   using Sxe.IC.Data.Models.Pdsbuildcomptt;
   using Sxe.IC.Data.Models.Pdscheckprodxref;
   using Sxe.IC.Data.Models.Pdscreateicfuturett;
   using Sxe.IC.Data.Models.Pdscreateictranstt;
   using Sxe.IC.Data.Models.Pdsiciafetchprod;
   using Sxe.IC.Data.Models.Pdsicipfetchadj;
   using Sxe.IC.Data.Models.Pdsicipfetchbal;
   using Sxe.IC.Data.Models.Pdsicipfetchpricing;
   using Sxe.IC.Data.Models.Pdsicipfetchprod;
   using Sxe.IC.Data.Models.Pdsicipfetchrepl;
   using Sxe.IC.Data.Models.Pdsicipfetchrollup;
   using Sxe.IC.Data.Models.Pdsicipfetchroai;
   using Sxe.IC.Data.Models.Pdsicipfetchtransdet;
   using Sxe.IC.Data.Models.Pdsicipfetchtrend;
   using Sxe.IC.Data.Models.Pdsloadaltvendtt;
   using Sxe.IC.Data.Models.Pdsloadcrossreftt;
   using Sxe.IC.Data.Models.Pdsloadlotshisttt;
   using Sxe.IC.Data.Models.Pdsloadserialshisttt;
   using Sxe.IC.Data.Models.Pdsloadunavailtt;
   using Sxe.IC.Data.Models.Complex;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/asicwhseprod")]
   public partial class AsicwhseprodApiController : ApiControllerBase
   {
      private readonly AsicwhseprodRepository repository;
    
      public AsicwhseprodApiController(AsicwhseprodRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("buildcomponenttemptable")]
      [HttpPost]
      public AsicwhseprodBuildComponentTempTableResponseAPI BuildComponentTempTable(Buildcompttcriteria buildcompttcriteria)
      {
         return this.repository.BuildComponentTempTable(buildcompttcriteria);
      } 
  
      
      [Route("checkproductcrossreference")]
      [HttpPost]
      public AsicwhseprodCheckProductCrossReferenceResponseAPI CheckProductCrossReference(Checkprodxrefcriteria checkprodxrefcriteria)
      {
         return this.repository.CheckProductCrossReference(checkprodxrefcriteria);
      } 
  
      
      [Route("createicfutureavailtt")]
      [HttpPost]
      public AsicwhseprodCreateICFutureAvailTTResponseAPI CreateICFutureAvailTT(Createicfuturettcriteria createicfuturettcriteria)
      {
         return this.repository.CreateICFutureAvailTT(createicfuturettcriteria);
      } 
  
      
      [Route("createictranstt")]
      [HttpPost]
      public AsicwhseprodCreateICTransTTResponseAPI CreateICTransTT(Createictransttcriteria createictransttcriteria)
      {
         return this.repository.CreateICTransTT(createictransttcriteria);
      } 
  
      
      [Route("iciafetchproduct")]
      [HttpPost]
      public Iciafetchprodresults ICIAFetchProduct(Iciafetchprodcriteria iciafetchprodcriteria)
      {
         return this.repository.ICIAFetchProduct(iciafetchprodcriteria);
      } 
  
      
      [Route("icipfetchadjusters")]
      [HttpPost]
      public Icipfetchadjresults ICIPFetchAdjusters(Icipfetchadjcriteria icipfetchadjcriteria)
      {
         return this.repository.ICIPFetchAdjusters(icipfetchadjcriteria);
      } 
  
      
      [Route("icipfetchbalances")]
      [HttpPost]
      public Icipfetchbalresults ICIPFetchBalances(Icipfetchbalcriteria icipfetchbalcriteria)
      {
         return this.repository.ICIPFetchBalances(icipfetchbalcriteria);
      } 
  
      
      [Route("icipfetchpricing")]
      [HttpPost]
      public Icipfetchpricingresults ICIPFetchPricing(Icipfetchpricingcriteria icipfetchpricingcriteria)
      {
         return this.repository.ICIPFetchPricing(icipfetchpricingcriteria);
      } 
  
      
      [Route("icipfetchproduct")]
      [HttpPost]
      public Icipfetchprodresults ICIPFetchProduct(Icipfetchprodcriteria icipfetchprodcriteria)
      {
         return this.repository.ICIPFetchProduct(icipfetchprodcriteria);
      } 
  
      
      [Route("icipfetchreplenishment")]
      [HttpPost]
      public Icipfetchreplresults ICIPFetchReplenishment(Icipfetchreplcriteria icipfetchreplcriteria)
      {
         return this.repository.ICIPFetchReplenishment(icipfetchreplcriteria);
      } 
  
      
      [Route("icipfetchrollup/{cWhse}/{cProd}")]
      [HttpGet]
      public IEnumerable<Icipfetchrollup> ICIPFetchRollup(string cWhse, string cProd)
      {
         return this.repository.ICIPFetchRollup(cWhse, cProd);
      } 
  
      
      [Route("icipfetchroai")]
      [HttpPost]
      public Icipfetchroairesults ICIPFetchROAI(Icipfetchroaicriteria icipfetchroaicriteria)
      {
         return this.repository.ICIPFetchROAI(icipfetchroaicriteria);
      } 
  
      
      [Route("icipfetchtransdetail")]
      [HttpPost]
      public Icipfetchtransdetresults ICIPFetchTransDetail(Icipfetchtransdetcriteria icipfetchtransdetcriteria)
      {
         return this.repository.ICIPFetchTransDetail(icipfetchtransdetcriteria);
      } 
  
      
      [Route("icipfetchtrend")]
      [HttpPost]
      public Icipfetchtrendresults ICIPFetchTrend(Icipfetchtrendcriteria icipfetchtrendcriteria)
      {
         return this.repository.ICIPFetchTrend(icipfetchtrendcriteria);
      } 
  
      
      [Route("loadaltvendorstt")]
      [HttpPost]
      public IEnumerable<Loadaltvendttresults> LoadAltVendorsTT(Loadaltvendttcriteria loadaltvendttcriteria)
      {
         return this.repository.LoadAltVendorsTT(loadaltvendttcriteria);
      } 
  
      
      [Route("loadcrossreferencett")]
      [HttpPost]
      public AsicwhseprodLoadCrossReferenceTTResponseAPI LoadCrossReferenceTT(Loadcrossrefttcriteria loadcrossrefttcriteria)
      {
         return this.repository.LoadCrossReferenceTT(loadcrossrefttcriteria);
      } 
  
      
      [Route("loadlotshistorytt")]
      [HttpPost]
      public IEnumerable<Loadlotshistttresults> LoadLotsHistoryTT(Loadlotshistttcriteria loadlotshistttcriteria)
      {
         return this.repository.LoadLotsHistoryTT(loadlotshistttcriteria);
      } 
  
      
      [Route("loadserialshistorytt")]
      [HttpPost]
      public IEnumerable<Loadserialshistttresults> LoadSerialsHistoryTT(Loadserialshistttcriteria loadserialshistttcriteria)
      {
         return this.repository.LoadSerialsHistoryTT(loadserialshistttcriteria);
      } 
  
      
      [Route("loadunavailablett")]
      [HttpPost]
      public IEnumerable<Loadunavailttresults> LoadUnavailableTT(Loadunavailttcriteria loadunavailttcriteria)
      {
         return this.repository.LoadUnavailableTT(loadunavailttcriteria);
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
  