using System.Collections.Generic;
using System.Linq;
using General.Business.Interfaces.GL;
using Infor.Sxe.GL.Data.Models.Complex;
using Infor.Sxe.GL.Data.Models.Pdsglaccountlookup;
using Infor.Sxe.GL.Data.Repositories;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;

namespace General.Business.Services.GL
{
   public class GlsaService : ServiceBase, IGlsaService
   {
      private readonly GlsaRepository repository;

      private readonly SascRepository sascRepository;

      public GlsaService(GlsaRepository repository, SascRepository sascRepository)
      {
         this.repository = repository;
         this.sascRepository = sascRepository;
      }

      public GlsaLookupResponseAPI AdvancedLookup(Glaccountlookupcriteria glaccountlookupcriteria)
      {
         if (!glaccountlookupcriteria.IsAutoComplete)
         {
            return this.repository.Lookup(glaccountlookupcriteria);
         }
         else
         {
            var glsaLookupResponseApi = new GlsaLookupResponseAPI { glaccountlookupresults = new List<Glaccountlookupresults>()};
            var glsas = this.repository.GetListByWordIndex(glaccountlookupcriteria.Term, 20, "");
            if (!glsas.Any())
            {
               var year = glaccountlookupcriteria.yr.ToString();
               if (year == "0")
               {
                  year = "";
               }
               else
               {
                  if (year.Length == 1)
                  {
                     year = "0" + year;
                  } else if (year.Length >= 3)
                  {
                     year = year.Substring(year.Length - 2);
                  }
                  year = $"and yr ={year}";
               }
               glsas = this.repository.GetList($"glsa.cono = {this.repository.Cono} {year} and glsa.lookupnm MATCHES '{glaccountlookupcriteria.Term}*'", 20, "");
            }
            if (glsas.Any())
            {
               var sasc = sascRepository.Get(0, 1, string.Empty);
               if (sasc != null)
               {
                  var glFormatter = new GlAccountFormatter(sasc.glsize1, sasc.glsize2, sasc.glsize3, sasc.glsize4,
                     sasc.gldelim1, sasc.gldelim2, sasc.gldelim3);
                  foreach (var glsa in glsas)
                  {
                     var glaccountlookupresults = new Glaccountlookupresults();
                     var glNo = glFormatter.ReturnFormattedAccount(glsa.gldivno, glsa.gldeptno, glsa.glacctno,
                        glsa.glsubno, glaccountlookupcriteria.IsForGlsf);
                     var existingGlsa = glsaLookupResponseApi.glaccountlookupresults.FirstOrDefault(x => x.glno == glNo);
                     if (existingGlsa == null)
                     {
                        glaccountlookupresults.cono = glsa.cono;
                        glaccountlookupresults.glno = glNo;
                        glaccountlookupresults.gltitle = glaccountlookupcriteria.IsForGlsf ? string.Empty : glsa.gltitle;
                        glaccountlookupresults.notesfl = glaccountlookupcriteria.IsForGlsf ? string.Empty : glsa.notesfl;
                        glaccountlookupresults.lookupnm = glaccountlookupcriteria.IsForGlsf
                           ? string.Empty
                           : glsa.lookupnm;
                        glaccountlookupresults.yr = glsa.yr;
                        glaccountlookupresults.rowidGlsa = glaccountlookupcriteria.IsForGlsf ? string.Empty : glsa.rowID;
                        glaccountlookupresults.userfield = string.Empty;
                        glsaLookupResponseApi.glaccountlookupresults.Add(glaccountlookupresults);
                     }

                     if (glsaLookupResponseApi.glaccountlookupresults.Count >= 10)
                     {
                        break;
                     }
                  }
               }
            }
            return glsaLookupResponseApi;
         }
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.repository?.Dispose();
         this.sascRepository?.Dispose();
         base.Dispose(true);
      }
   }
}