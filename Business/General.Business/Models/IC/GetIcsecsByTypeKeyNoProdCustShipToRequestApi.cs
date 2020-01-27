using System;
using System.Collections.Generic;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
namespace General.Business.Models.IC
{
   public class GetIcsecsByTypeKeyNoProdCustShipToRequestApi: FetchWhereRequestBase
    {
        [StringValidation]
        public string rectype { get; set; }

        [StringValidation]
        public string prod { get; set; }

        [StringValidation]
        public decimal keyno { get; set; }

        [StringValidation]
        public decimal custno { get; set; }
              
        [StringValidation]
        public string  shipto { get; set; }
    }
}