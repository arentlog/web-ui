using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsprodcat;

namespace General.Business.Interfaces.TWL
{
   public interface IProdcatService : IDisposable
   {
      IEnumerable<Prodcat> GetTWLProdcats(GetTWLProdcatsApi getTWLProdcatsApi);
      IEnumerable<Prodcat> GetTWLProdcatList(GetTWLProdcatListApi getTWLProdcatListApi);
   }
}