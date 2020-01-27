using System;
using Infor.Sxe.TWL.Data.Models.Pdsparameters;

namespace General.Business.Interfaces.TWL
{
   public interface IParametersService : IDisposable
   {
      Parameters GetForCompany(string coNum, int batchsize, string fldList);
   }
}