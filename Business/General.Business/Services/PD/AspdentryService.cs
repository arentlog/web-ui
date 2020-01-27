using System.Collections.Generic;
using System.Linq;
using General.Business.Interfaces.PD;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Complex;
using Infor.Sxe.PD.Data.Models.Pdsmessaging;
using Infor.Sxe.PD.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.PD
{
   public class AspdentryService : ServiceBase, IAspdentryService
   {
      private readonly AspdentryRepository repository;

      public AspdentryService(AspdentryRepository repository)
      {
         this.repository = repository;
      }

      public IEnumerable<PDEMLookupReturnModel> PDEMLookupDelimSourceTypes()
      {
         var pdemLookup = repository.PDEMLookupSourceTypes();
         var pvSrctypes = pdemLookup.pvSrctypes.Split(',').ToList();
         var pvSrcdesc = pdemLookup.pvSrcdesc.Split(',').ToList();
         return pvSrctypes.Select((t, index) => new PDEMLookupReturnModel {codeval = t, descrip = pvSrcdesc[index]}).ToList();
      }

      public IEnumerable<Messaging> PDEMGridUpdatePDSC1Multiple(IEnumerable<AspdentryPDEMGridUpdatePDSC1RequestAPI> requestAPIList)
      {
         IList<Messaging> messagings = new List<Messaging>();
         foreach (AspdentryPDEMGridUpdatePDSC1RequestAPI requestData in requestAPIList)
         {
             IList<Messaging> messaggingErrors = repository.PDEMGridUpdatePDSC1(requestData).ToList();
             foreach (Messaging messaggingError in messaggingErrors)
             {
                 messagings.Add(messaggingError);
             }
         }
         return messagings.Distinct();
      }

      public IEnumerable<Messaging> PDEMGridUpdatePDSC2Multiple(IEnumerable<AspdentryPDEMGridUpdatePDSC2RequestAPI> requestAPIList)
      {
          IList<Messaging> messagings = new List<Messaging>();
          foreach (AspdentryPDEMGridUpdatePDSC2RequestAPI requestData in requestAPIList)
          {
              IList<Messaging> messaggingErrors = repository.PDEMGridUpdatePDSC2(requestData).ToList();
              foreach (Messaging messaggingError in messaggingErrors)
              {
                  messagings.Add(messaggingError);
              }
          }
          return messagings.Distinct();
      }

      public IEnumerable<Messaging> PDEMGridUpdatePDSC3Multiple(IEnumerable<AspdentryPDEMGridUpdatePDSC3RequestAPI> requestAPIList)
      {
          IList<Messaging> messagings = new List<Messaging>();
          foreach (AspdentryPDEMGridUpdatePDSC3RequestAPI requestData in requestAPIList)
          {
              IList<Messaging> messaggingErrors = repository.PDEMGridUpdatePDSC3(requestData).ToList();
              foreach (Messaging messaggingError in messaggingErrors)
              {
                  messagings.Add(messaggingError);
              }
          }
          return messagings.Distinct();
      }

      public IEnumerable<Messaging> PDEMGridUpdatePDSRMultiple(IEnumerable<AspdentryPDEMGridUpdatePDSRRequestAPI> requestAPIList)
      {
          IList<Messaging> messagings = new List<Messaging>();
          foreach (AspdentryPDEMGridUpdatePDSRRequestAPI requestData in requestAPIList)
          {
              IList<Messaging> messaggingErrors = repository.PDEMGridUpdatePDSR(requestData).ToList();
              foreach (Messaging messaggingError in messaggingErrors)
              {
                  messagings.Add(messaggingError);
              }
          }
          return messagings.Distinct();
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