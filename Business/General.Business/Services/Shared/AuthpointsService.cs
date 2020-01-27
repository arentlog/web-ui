using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.Pdsauthpoints;
using Infor.Sxe.Shared.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.Shared
{
   public class AuthpointsService : ServiceBase, IAuthpointsService
   {
      private readonly AuthpointsRepository authpointsRepository;

      public AuthpointsService(AuthpointsRepository authpointsRepository)
      {
         this.authpointsRepository = authpointsRepository;
      }

      public IEnumerable<Authpoints> GetAuthorizationPoints(GetAuthorizationPointsApi criteria)
      {
         var where = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(criteria.ourproc))
         {
            where.Append($"authpoints.ourproc >= '{criteria.ourproc}'");
         }
         if (criteria.trmgrlang != null)
         {
            if (!string.IsNullOrWhiteSpace(criteria.ourproc))
            {
               where.AppendFormat(" AND ");
            }
            where.AppendFormatWithEscape("authpoints.trmgrlang = '{0}'", criteria.trmgrlang);
         }
         return this.authpointsRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);

      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.authpointsRepository?.Dispose();
         base.Dispose(true);
      }
   }
}