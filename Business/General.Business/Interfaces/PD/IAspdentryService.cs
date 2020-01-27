using System;
using System.Collections.Generic;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Complex;
using Infor.Sxe.PD.Data.Models.Pdsmessaging;

namespace General.Business.Interfaces.PD
{
   public interface IAspdentryService : IDisposable
   {
      IEnumerable<PDEMLookupReturnModel> PDEMLookupDelimSourceTypes();

      IEnumerable<Messaging> PDEMGridUpdatePDSC1Multiple(IEnumerable<AspdentryPDEMGridUpdatePDSC1RequestAPI> requestAPIList);

      IEnumerable<Messaging> PDEMGridUpdatePDSC2Multiple(IEnumerable<AspdentryPDEMGridUpdatePDSC2RequestAPI> requestAPIList);

      IEnumerable<Messaging> PDEMGridUpdatePDSC3Multiple(IEnumerable<AspdentryPDEMGridUpdatePDSC3RequestAPI> requestAPIList);

      IEnumerable<Messaging> PDEMGridUpdatePDSRMultiple(IEnumerable<AspdentryPDEMGridUpdatePDSRRequestAPI> requestAPIList);
    }
}