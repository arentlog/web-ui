using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsfileRetent;

namespace General.Business.Interfaces.TWL
{
   public interface IFileRetentService : IDisposable
   {
      IEnumerable<FileRetent> GetTWLFileRetentions(GetTWLFileRetentionsApi getTWLFileRetentionsApi);
   }
}