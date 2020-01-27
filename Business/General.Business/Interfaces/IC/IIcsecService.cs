using System;
using System.Collections.Generic;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicsec;

namespace General.Business.Interfaces.IC
{
    public interface IIcsecService : IDisposable
    {
        IEnumerable<Icsec> GetIcsecsByTypeProd(GetIcsecsByTypeProdRequestApi getIcsecsByTypeProdRequestApi);
        IEnumerable<Icsec> GetIcsecsByTypeProdAltProd(GetIcsecsByTypeProdAltProdRequestApi getIcsecsByTypeProdAltProdRequestApi);
        IEnumerable<Icsec> GetIcsecsByTypeKeyNoProdCustShipTo(GetIcsecsByTypeKeyNoProdCustShipToRequestApi getIcsecsByTypeKeyNoProdCustShipToRequestApi);
    }
}