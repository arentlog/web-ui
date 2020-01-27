﻿using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsshpmst;

namespace General.Business.Interfaces.TWL
{
   public interface IShpmstService : IDisposable
   {
      IEnumerable<Shpmst> GetTWLShpmst(GetTWLShpmstApi getTWLShpmstApi);
   }
}