using System.Collections.Generic;
using System.Linq;
using System.Text;
using General.Business.Interfaces.AR;
using Infor.Sxe.AR.Data.Models.Complex;
using Infor.Sxe.AR.Data.Models.Pdsaret;
using Infor.Sxe.AR.Data.Models.Pdsaretlookup;
using Infor.Sxe.AR.Data.Models.Pdsarsc;
using Infor.Sxe.AR.Data.Models.Pdsarss;
using Infor.Sxe.AR.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.AR
{
   public class AretService : ServiceBase, IAretService
   {
      private readonly AretRepository aretRepository;
      private readonly ArscRepository arscRepository;
      private readonly ArssRepository arssRepository;

      public AretService(AretRepository aretRepository, ArscRepository arscRepository, ArssRepository arssRepository)
      {
         this.aretRepository = aretRepository;
         this.arscRepository = arscRepository;
         this.arssRepository = arssRepository;
      }

      public AretLookupResponseAPI LookupInvoiceSequence(Aretlookupcriteria aretlookupcriteria)
      {
         var arsc = new Arsc();
         var arsses = new List<Arss>();

         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", this.aretRepository.Cono);
         sb.AppendFormatWithEscape(" AND aret.invno = {0}", aretlookupcriteria.invno);
         sb.AppendFormatWithEscape(" AND aret.invsuf = {0}", aretlookupcriteria.invsuf);
         sb.AppendFormatWithEscape(" AND aret.seqno >= {0}", aretlookupcriteria.seqno);
         sb.AppendFormatWithEscape(" AND aret.custno = {0}", aretlookupcriteria.custno);
         sb.AppendFormatWithEscape(" AND aret.statustype = {0}", aretlookupcriteria.statustype);
         sb.AppendFormatWithEscape(" AND aret.transcd = {0}", aretlookupcriteria.transcd);
         var where = sb.ToString();
         var resultFetchWhere = this.aretRepository.GetList(where, aretlookupcriteria.IsAutoComplete ? 10 : aretlookupcriteria.recordcountlimit, aretlookupcriteria.IsAutoComplete ? "seqno" : "seqno,amount,rowID,custno,invdt,invno,invsuf,jrnlno,notesfl,refer,shipto,statustype,transcd,notesfl").ToList();

         if (resultFetchWhere.Count > 0 && !aretlookupcriteria.IsAutoComplete)
         {
            arsc = this.arscRepository.Get(0, aretlookupcriteria.custno, false, 1, "custno,name,notefl") ?? new Arsc();
         }

         var results = new AretLookupResponseAPI();

         foreach (var fwResult in resultFetchWhere)
         {
            var result = new Aretlookupresults {seqno = fwResult.seqno};

            if (!aretlookupcriteria.IsAutoComplete)
            {
               var arss = arsses.FirstOrDefault(x => x.shipto == fwResult.shipto);
               if (arss == null)
               {
                  if (string.IsNullOrEmpty(fwResult.shipto))
                  {
                     arss = new Arss{ shipto = "", name = string.Empty };
                  }
                  else
                  {
                     arss = this.arssRepository.Get(0, fwResult.custno, fwResult.shipto, 1, "shipto,name") ?? new Arss { shipto = fwResult.shipto, name = string.Empty };
                  }
                  arsses.Add(arss);
               }

               result.amount = fwResult.amount;
               result.aretRowid = fwResult.rowID;
               result.custno = fwResult.custno;
               result.invdt = fwResult.invdt;
               result.invno = fwResult.invno;
               result.invsuf = fwResult.invsuf;
               result.jrnlno = fwResult.jrnlno;
               result.notesfl = fwResult.notesfl;
               result.refer = fwResult.refer;
               result.shipto = fwResult.shipto;
               result.statustype = fwResult.statustype;
               result.transcd = fwResult.transcd;
               result.arscName = arsc.name;
               result.custnotesfl = arsc.notesfl;
               result.arssName = arss.name;
            }
            results.aretlookupresults.Add(result);
         }
         return results;
      }

      public Aret GetByInvNoInvSufSeqNo(int invno, int invsuf, int seqno)
      {
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", this.aretRepository.Cono);
         sb.AppendFormatWithEscape(" AND aret.invno = {0}", invno);
         sb.AppendFormatWithEscape(" AND aret.invsuf = {0}", invsuf);
         sb.AppendFormatWithEscape(" AND aret.seqno = {0}", seqno);
         var where = sb.ToString();
         return this.aretRepository.GetList(where, 1, string.Empty).FirstOrDefault();
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.aretRepository?.Dispose();
         this.arscRepository?.Dispose();
         this.arssRepository?.Dispose();
         base.Dispose(true);
      }
   }
}