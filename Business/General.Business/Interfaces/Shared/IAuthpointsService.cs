using System;
using System.Collections.Generic;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.Pdsauthpoints;

namespace General.Business.Interfaces.Shared
{
   public interface IAuthpointsService : IDisposable
   {
      IEnumerable<Authpoints> GetAuthorizationPoints(GetAuthorizationPointsApi criteria);
   }
}