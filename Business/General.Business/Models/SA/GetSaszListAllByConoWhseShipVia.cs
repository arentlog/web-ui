﻿using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSaszListAllByConoWhseShipViaRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string whse { get; set; }

      [StringValidation]
      public string shipVia { get; set; }
   }
}