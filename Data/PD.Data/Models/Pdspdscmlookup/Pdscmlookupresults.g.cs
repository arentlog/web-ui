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

namespace Infor.Sxe.PD.Data.Models.Pdspdscmlookup
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdscmlookup.Pdscmlookupresults")]
   public partial class Pdscmlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string modifiernm { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string rankty { get; set; }
      [StringValidationAttribute]
      public string rankdesc { get; set; }
      public decimal pct1 { get; set; }
      public decimal pct2 { get; set; }
      public decimal pct3 { get; set; }
      public decimal pct4 { get; set; }
      public decimal pct5 { get; set; }
      public decimal pct6 { get; set; }
      public decimal pct7 { get; set; }
      public decimal pct8 { get; set; }
      public decimal pct9 { get; set; }
      public decimal pct10 { get; set; }
      public decimal pct11 { get; set; }
      public decimal pct12 { get; set; }
      public decimal pct13 { get; set; }
      public decimal pct14 { get; set; }
      public decimal pct15 { get; set; }
      public decimal pct16 { get; set; }
      public decimal pct17 { get; set; }
      public decimal pct18 { get; set; }
      public decimal pct19 { get; set; }
      public decimal pct20 { get; set; }
      public decimal pct21 { get; set; }
      public decimal pct22 { get; set; }
      public decimal pct23 { get; set; }
      public decimal pct24 { get; set; }
      public decimal pct25 { get; set; }
      public decimal pct26 { get; set; }
      public decimal nonstockpct { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transtm { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string lblpct1 { get; set; }
      [StringValidationAttribute]
      public string lblpct2 { get; set; }
      [StringValidationAttribute]
      public string lblpct3 { get; set; }
      [StringValidationAttribute]
      public string lblpct4 { get; set; }
      [StringValidationAttribute]
      public string lblpct5 { get; set; }
      [StringValidationAttribute]
      public string lblpct6 { get; set; }
      [StringValidationAttribute]
      public string lblpct7 { get; set; }
      [StringValidationAttribute]
      public string lblpct8 { get; set; }
      [StringValidationAttribute]
      public string lblpct9 { get; set; }
      [StringValidationAttribute]
      public string lblpct10 { get; set; }
      [StringValidationAttribute]
      public string lblpct11 { get; set; }
      [StringValidationAttribute]
      public string lblpct12 { get; set; }
      [StringValidationAttribute]
      public string lblpct13 { get; set; }
      [StringValidationAttribute]
      public string lblpct14 { get; set; }
      [StringValidationAttribute]
      public string lblpct15 { get; set; }
      [StringValidationAttribute]
      public string lblpct16 { get; set; }
      [StringValidationAttribute]
      public string lblpct17 { get; set; }
      [StringValidationAttribute]
      public string lblpct18 { get; set; }
      [StringValidationAttribute]
      public string lblpct19 { get; set; }
      [StringValidationAttribute]
      public string lblpct20 { get; set; }
      [StringValidationAttribute]
      public string lblpct21 { get; set; }
      [StringValidationAttribute]
      public string lblpct22 { get; set; }
      [StringValidationAttribute]
      public string lblpct23 { get; set; }
      [StringValidationAttribute]
      public string lblpct24 { get; set; }
      [StringValidationAttribute]
      public string lblpct25 { get; set; }
      [StringValidationAttribute]
      public string lblpct26 { get; set; }
      [StringValidationAttribute]
      public string pdscmrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdscmlookupresults BuildPdscmlookupresultsFromRow(DataRow row)
      {
         Pdscmlookupresults entity = new Pdscmlookupresults();
         entity.modifiernm = row.IsNull("modifiernm") ? string.Empty : row.Field<string>("modifiernm");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.rankty = row.IsNull("rankty") ? string.Empty : row.Field<string>("rankty");
         entity.rankdesc = row.IsNull("rankdesc") ? string.Empty : row.Field<string>("rankdesc");
         entity.pct1 = row.IsNull("pct1") ? decimal.Zero : row.Field<decimal>("pct1");
         entity.pct2 = row.IsNull("pct2") ? decimal.Zero : row.Field<decimal>("pct2");
         entity.pct3 = row.IsNull("pct3") ? decimal.Zero : row.Field<decimal>("pct3");
         entity.pct4 = row.IsNull("pct4") ? decimal.Zero : row.Field<decimal>("pct4");
         entity.pct5 = row.IsNull("pct5") ? decimal.Zero : row.Field<decimal>("pct5");
         entity.pct6 = row.IsNull("pct6") ? decimal.Zero : row.Field<decimal>("pct6");
         entity.pct7 = row.IsNull("pct7") ? decimal.Zero : row.Field<decimal>("pct7");
         entity.pct8 = row.IsNull("pct8") ? decimal.Zero : row.Field<decimal>("pct8");
         entity.pct9 = row.IsNull("pct9") ? decimal.Zero : row.Field<decimal>("pct9");
         entity.pct10 = row.IsNull("pct10") ? decimal.Zero : row.Field<decimal>("pct10");
         entity.pct11 = row.IsNull("pct11") ? decimal.Zero : row.Field<decimal>("pct11");
         entity.pct12 = row.IsNull("pct12") ? decimal.Zero : row.Field<decimal>("pct12");
         entity.pct13 = row.IsNull("pct13") ? decimal.Zero : row.Field<decimal>("pct13");
         entity.pct14 = row.IsNull("pct14") ? decimal.Zero : row.Field<decimal>("pct14");
         entity.pct15 = row.IsNull("pct15") ? decimal.Zero : row.Field<decimal>("pct15");
         entity.pct16 = row.IsNull("pct16") ? decimal.Zero : row.Field<decimal>("pct16");
         entity.pct17 = row.IsNull("pct17") ? decimal.Zero : row.Field<decimal>("pct17");
         entity.pct18 = row.IsNull("pct18") ? decimal.Zero : row.Field<decimal>("pct18");
         entity.pct19 = row.IsNull("pct19") ? decimal.Zero : row.Field<decimal>("pct19");
         entity.pct20 = row.IsNull("pct20") ? decimal.Zero : row.Field<decimal>("pct20");
         entity.pct21 = row.IsNull("pct21") ? decimal.Zero : row.Field<decimal>("pct21");
         entity.pct22 = row.IsNull("pct22") ? decimal.Zero : row.Field<decimal>("pct22");
         entity.pct23 = row.IsNull("pct23") ? decimal.Zero : row.Field<decimal>("pct23");
         entity.pct24 = row.IsNull("pct24") ? decimal.Zero : row.Field<decimal>("pct24");
         entity.pct25 = row.IsNull("pct25") ? decimal.Zero : row.Field<decimal>("pct25");
         entity.pct26 = row.IsNull("pct26") ? decimal.Zero : row.Field<decimal>("pct26");
         entity.nonstockpct = row.IsNull("nonstockpct") ? decimal.Zero : row.Field<decimal>("nonstockpct");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.lblpct1 = row.IsNull("lblpct1") ? string.Empty : row.Field<string>("lblpct1");
         entity.lblpct2 = row.IsNull("lblpct2") ? string.Empty : row.Field<string>("lblpct2");
         entity.lblpct3 = row.IsNull("lblpct3") ? string.Empty : row.Field<string>("lblpct3");
         entity.lblpct4 = row.IsNull("lblpct4") ? string.Empty : row.Field<string>("lblpct4");
         entity.lblpct5 = row.IsNull("lblpct5") ? string.Empty : row.Field<string>("lblpct5");
         entity.lblpct6 = row.IsNull("lblpct6") ? string.Empty : row.Field<string>("lblpct6");
         entity.lblpct7 = row.IsNull("lblpct7") ? string.Empty : row.Field<string>("lblpct7");
         entity.lblpct8 = row.IsNull("lblpct8") ? string.Empty : row.Field<string>("lblpct8");
         entity.lblpct9 = row.IsNull("lblpct9") ? string.Empty : row.Field<string>("lblpct9");
         entity.lblpct10 = row.IsNull("lblpct10") ? string.Empty : row.Field<string>("lblpct10");
         entity.lblpct11 = row.IsNull("lblpct11") ? string.Empty : row.Field<string>("lblpct11");
         entity.lblpct12 = row.IsNull("lblpct12") ? string.Empty : row.Field<string>("lblpct12");
         entity.lblpct13 = row.IsNull("lblpct13") ? string.Empty : row.Field<string>("lblpct13");
         entity.lblpct14 = row.IsNull("lblpct14") ? string.Empty : row.Field<string>("lblpct14");
         entity.lblpct15 = row.IsNull("lblpct15") ? string.Empty : row.Field<string>("lblpct15");
         entity.lblpct16 = row.IsNull("lblpct16") ? string.Empty : row.Field<string>("lblpct16");
         entity.lblpct17 = row.IsNull("lblpct17") ? string.Empty : row.Field<string>("lblpct17");
         entity.lblpct18 = row.IsNull("lblpct18") ? string.Empty : row.Field<string>("lblpct18");
         entity.lblpct19 = row.IsNull("lblpct19") ? string.Empty : row.Field<string>("lblpct19");
         entity.lblpct20 = row.IsNull("lblpct20") ? string.Empty : row.Field<string>("lblpct20");
         entity.lblpct21 = row.IsNull("lblpct21") ? string.Empty : row.Field<string>("lblpct21");
         entity.lblpct22 = row.IsNull("lblpct22") ? string.Empty : row.Field<string>("lblpct22");
         entity.lblpct23 = row.IsNull("lblpct23") ? string.Empty : row.Field<string>("lblpct23");
         entity.lblpct24 = row.IsNull("lblpct24") ? string.Empty : row.Field<string>("lblpct24");
         entity.lblpct25 = row.IsNull("lblpct25") ? string.Empty : row.Field<string>("lblpct25");
         entity.lblpct26 = row.IsNull("lblpct26") ? string.Empty : row.Field<string>("lblpct26");
         entity.pdscmrowid = row.Field<byte[]>("pdscmrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdscmlookupresults(ref DataRow row, Pdscmlookupresults entity)
      {
         row.SetField("modifiernm", entity.modifiernm);
         row.SetField("whse", entity.whse);
         row.SetField("rankty", entity.rankty);
         row.SetField("rankdesc", entity.rankdesc);
         row.SetField("pct1", entity.pct1);
         row.SetField("pct2", entity.pct2);
         row.SetField("pct3", entity.pct3);
         row.SetField("pct4", entity.pct4);
         row.SetField("pct5", entity.pct5);
         row.SetField("pct6", entity.pct6);
         row.SetField("pct7", entity.pct7);
         row.SetField("pct8", entity.pct8);
         row.SetField("pct9", entity.pct9);
         row.SetField("pct10", entity.pct10);
         row.SetField("pct11", entity.pct11);
         row.SetField("pct12", entity.pct12);
         row.SetField("pct13", entity.pct13);
         row.SetField("pct14", entity.pct14);
         row.SetField("pct15", entity.pct15);
         row.SetField("pct16", entity.pct16);
         row.SetField("pct17", entity.pct17);
         row.SetField("pct18", entity.pct18);
         row.SetField("pct19", entity.pct19);
         row.SetField("pct20", entity.pct20);
         row.SetField("pct21", entity.pct21);
         row.SetField("pct22", entity.pct22);
         row.SetField("pct23", entity.pct23);
         row.SetField("pct24", entity.pct24);
         row.SetField("pct25", entity.pct25);
         row.SetField("pct26", entity.pct26);
         row.SetField("nonstockpct", entity.nonstockpct);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("lblpct1", entity.lblpct1);
         row.SetField("lblpct2", entity.lblpct2);
         row.SetField("lblpct3", entity.lblpct3);
         row.SetField("lblpct4", entity.lblpct4);
         row.SetField("lblpct5", entity.lblpct5);
         row.SetField("lblpct6", entity.lblpct6);
         row.SetField("lblpct7", entity.lblpct7);
         row.SetField("lblpct8", entity.lblpct8);
         row.SetField("lblpct9", entity.lblpct9);
         row.SetField("lblpct10", entity.lblpct10);
         row.SetField("lblpct11", entity.lblpct11);
         row.SetField("lblpct12", entity.lblpct12);
         row.SetField("lblpct13", entity.lblpct13);
         row.SetField("lblpct14", entity.lblpct14);
         row.SetField("lblpct15", entity.lblpct15);
         row.SetField("lblpct16", entity.lblpct16);
         row.SetField("lblpct17", entity.lblpct17);
         row.SetField("lblpct18", entity.lblpct18);
         row.SetField("lblpct19", entity.lblpct19);
         row.SetField("lblpct20", entity.lblpct20);
         row.SetField("lblpct21", entity.lblpct21);
         row.SetField("lblpct22", entity.lblpct22);
         row.SetField("lblpct23", entity.lblpct23);
         row.SetField("lblpct24", entity.lblpct24);
         row.SetField("lblpct25", entity.lblpct25);
         row.SetField("lblpct26", entity.lblpct26);
         row.SetField("pdscmrowid", entity.pdscmrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
