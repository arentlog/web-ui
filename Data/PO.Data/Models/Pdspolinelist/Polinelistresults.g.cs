//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 13370 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using HelpPageErrorSimulator.HelpArea.Areas.HelpPage.ModelDescriptions;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.PO.Data.Models.Pdspolinelist
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspolinelist.Polinelistresults")]
   public partial class Polinelistresults : ModelBase
   {
      public int pono { get; set; }
      public int posuf { get; set; }
      public bool commentfl { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      [StringValidationAttribute]
      public string nonstocktytxt { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string cdescription { get; set; }
      public DateTime? enterdt { get; set; }
      [StringValidationAttribute]
      public string cnotesfl { get; set; }
      public DateTime? duedt { get; set; }
      public bool ignoreltfl { get; set; }
      public decimal dqtyord { get; set; }
      public decimal dstkqtyord { get; set; }
      public decimal dprice { get; set; }
      public decimal dnetamt { get; set; }
      public int pdsvcrecno { get; set; }
      [StringValidationAttribute]
      public string cvendquote { get; set; }
      public bool tiesexistfl { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      public bool impliedcorefl { get; set; }
      [StringValidationAttribute]
      public string ncnr { get; set; }
      public decimal dutyrate { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      public bool msdsfl { get; set; }
      [StringValidationAttribute]
      public string upcid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Polinelistresults BuildPolinelistresultsFromRow(DataRow row)
      {
         Polinelistresults entity = new Polinelistresults();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.nonstocktytxt = row.IsNull("nonstocktytxt") ? string.Empty : row.Field<string>("nonstocktytxt");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.cdescription = row.IsNull("cdescription") ? string.Empty : row.Field<string>("cdescription");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.cnotesfl = row.IsNull("cnotesfl") ? string.Empty : row.Field<string>("cnotesfl");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.ignoreltfl = row.Field<bool>("ignoreltfl");
         entity.dqtyord = row.IsNull("dqtyord") ? decimal.Zero : row.Field<decimal>("dqtyord");
         entity.dstkqtyord = row.IsNull("dstkqtyord") ? decimal.Zero : row.Field<decimal>("dstkqtyord");
         entity.dprice = row.IsNull("dprice") ? decimal.Zero : row.Field<decimal>("dprice");
         entity.dnetamt = row.IsNull("dnetamt") ? decimal.Zero : row.Field<decimal>("dnetamt");
         entity.pdsvcrecno = row.IsNull("pdsvcrecno") ? 0 : row.Field<int>("pdsvcrecno");
         entity.cvendquote = row.IsNull("cvendquote") ? string.Empty : row.Field<string>("cvendquote");
         entity.tiesexistfl = row.Field<bool>("tiesexistfl");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.impliedcorefl = row.Field<bool>("impliedcorefl");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.dutyrate = row.IsNull("dutyrate") ? decimal.Zero : row.Field<decimal>("dutyrate");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.upcid = row.IsNull("upcid") ? string.Empty : row.Field<string>("upcid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPolinelistresults(ref DataRow row, Polinelistresults entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("lineno", entity.lineno);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("nonstocktytxt", entity.nonstocktytxt);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("unit", entity.unit);
         row.SetField("cdescription", entity.cdescription);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("cnotesfl", entity.cnotesfl);
         row.SetField("duedt", entity.duedt);
         row.SetField("ignoreltfl", entity.ignoreltfl);
         row.SetField("dqtyord", entity.dqtyord);
         row.SetField("dstkqtyord", entity.dstkqtyord);
         row.SetField("dprice", entity.dprice);
         row.SetField("dnetamt", entity.dnetamt);
         row.SetField("pdsvcrecno", entity.pdsvcrecno);
         row.SetField("cvendquote", entity.cvendquote);
         row.SetField("tiesexistfl", entity.tiesexistfl);
         row.SetField("statustype", entity.statustype);
         row.SetField("impliedcorefl", entity.impliedcorefl);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("dutyrate", entity.dutyrate);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("upcid", entity.upcid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
