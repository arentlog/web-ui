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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.WM
{  
   using Sxe.WM.Data.Models.PdsContext;
   using Sxe.WM.Data.Models.Pdswmbincriteria;
   using Sxe.WM.Data.Models.Pdswmbin;
   using Sxe.WM.Data.Models.Pdswmbinproducts;
   using Sxe.WM.Data.Models.Pdswmproductcriteria;
   using Sxe.WM.Data.Models.Pdswmproductbins;
   using Sxe.WM.Data.Models.Pdswmprimaryreplenishment;
   using Sxe.WM.Data.Models.Complex;
   using Sxe.WM.Data.Repositories;
    
   [RoutePrefix("api/wm/aswminquiry")]
   public partial class AswminquiryApiController : ApiControllerBase
   {
      private readonly AswminquiryRepository repository;
    
      public AswminquiryApiController(AswminquiryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("wmbinretrieve")]
      [HttpPost]
      public AswminquiryWMBinRetrieveResponseAPI WMBinRetrieve(Wmbincriteria wmbincriteria)
      {
         return this.repository.WMBinRetrieve(wmbincriteria);
      } 
  
      
      [Route("wmproductretrieve")]
      [HttpPost]
      public IEnumerable<Wmproductbins> WMProductRetrieve(Wmproductcriteria wmproductcriteria)
      {
         return this.repository.WMProductRetrieve(wmproductcriteria);
      } 
  
      
      [Route("wmprimaryreplenishmentretrieve")]
      [HttpPost]
      public AswminquiryWMPrimaryReplenishmentRetrieveResponseAPI WMPrimaryReplenishmentRetrieve(AswminquiryWMPrimaryReplenishmentRetrieveRequestAPI AswminquiryWMPrimaryReplenishmentRetrieveRequestAPI)
      {
         return this.repository.WMPrimaryReplenishmentRetrieve(AswminquiryWMPrimaryReplenishmentRetrieveRequestAPI);
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
  