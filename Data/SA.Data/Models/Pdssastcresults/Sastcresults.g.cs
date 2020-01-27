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

namespace Infor.Sxe.SA.Data.Models.Pdssastcresults
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssastcresults.Sastcresults")]
   public partial class Sastcresults : ModelBase
   {
      [StringValidationAttribute]
      public string currencyty { get; set; }
      [StringValidationAttribute]
      public string glno { get; set; }
      [StringValidationAttribute]
      public string glnodesc { get; set; }
      [StringValidationAttribute]
      public string rvglno { get; set; }
      [StringValidationAttribute]
      public string rvglnodesc { get; set; }
      [StringValidationAttribute]
      public string shortdesc { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public int bankno { get; set; }
      [StringValidationAttribute]
      public string bankname { get; set; }
      public bool draftfl { get; set; }
      public decimal vouchexrate { get; set; }
      public decimal purchexrate { get; set; }
      public decimal salesexrate { get; set; }
      public decimal arexrate { get; set; }
      public decimal rvglexchrate { get; set; }
      [StringValidationAttribute]
      public string ratesource { get; set; }
      public bool ratesourcechange { get; set; }
      [StringValidationAttribute]
      public string edicurrency { get; set; }
      public int glacctno { get; set; }
      public int gldeptno { get; set; }
      public int gldivno { get; set; }
      public int glsubno { get; set; }
      public int rvglacctno { get; set; }
      public int rvgldeptno { get; set; }
      public int rvgldivno { get; set; }
      public int rvglsubno { get; set; }
      [StringValidationAttribute]
      public string currsymbol { get; set; }
      [StringValidationAttribute]
      public string stndcurrcd { get; set; }
      [StringValidationAttribute]
      public string rowidSastc { get; set; }
      public bool changebank { get; set; }
      public bool addmode { get; set; }
      public bool historyfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sastcresults BuildSastcresultsFromRow(DataRow row)
      {
         Sastcresults entity = new Sastcresults();
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.glno = row.IsNull("glno") ? string.Empty : row.Field<string>("glno");
         entity.glnodesc = row.IsNull("glnodesc") ? string.Empty : row.Field<string>("glnodesc");
         entity.rvglno = row.IsNull("rvglno") ? string.Empty : row.Field<string>("rvglno");
         entity.rvglnodesc = row.IsNull("rvglnodesc") ? string.Empty : row.Field<string>("rvglnodesc");
         entity.shortdesc = row.IsNull("shortdesc") ? string.Empty : row.Field<string>("shortdesc");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.bankno = row.IsNull("bankno") ? 0 : row.Field<int>("bankno");
         entity.bankname = row.IsNull("bankname") ? string.Empty : row.Field<string>("bankname");
         entity.draftfl = row.Field<bool>("draftfl");
         entity.vouchexrate = row.IsNull("vouchexrate") ? decimal.Zero : row.Field<decimal>("vouchexrate");
         entity.purchexrate = row.IsNull("purchexrate") ? decimal.Zero : row.Field<decimal>("purchexrate");
         entity.salesexrate = row.IsNull("salesexrate") ? decimal.Zero : row.Field<decimal>("salesexrate");
         entity.arexrate = row.IsNull("arexrate") ? decimal.Zero : row.Field<decimal>("arexrate");
         entity.rvglexchrate = row.IsNull("rvglexchrate") ? decimal.Zero : row.Field<decimal>("rvglexchrate");
         entity.ratesource = row.IsNull("ratesource") ? string.Empty : row.Field<string>("ratesource");
         entity.ratesourcechange = row.Field<bool>("ratesourcechange");
         entity.edicurrency = row.IsNull("edicurrency") ? string.Empty : row.Field<string>("edicurrency");
         entity.glacctno = row.IsNull("glacctno") ? 0 : row.Field<int>("glacctno");
         entity.gldeptno = row.IsNull("gldeptno") ? 0 : row.Field<int>("gldeptno");
         entity.gldivno = row.IsNull("gldivno") ? 0 : row.Field<int>("gldivno");
         entity.glsubno = row.IsNull("glsubno") ? 0 : row.Field<int>("glsubno");
         entity.rvglacctno = row.IsNull("rvglacctno") ? 0 : row.Field<int>("rvglacctno");
         entity.rvgldeptno = row.IsNull("rvgldeptno") ? 0 : row.Field<int>("rvgldeptno");
         entity.rvgldivno = row.IsNull("rvgldivno") ? 0 : row.Field<int>("rvgldivno");
         entity.rvglsubno = row.IsNull("rvglsubno") ? 0 : row.Field<int>("rvglsubno");
         entity.currsymbol = row.IsNull("currsymbol") ? string.Empty : row.Field<string>("currsymbol");
         entity.stndcurrcd = row.IsNull("stndcurrcd") ? string.Empty : row.Field<string>("stndcurrcd");
         entity.rowidSastc = row.Field<byte[]>("rowid-sastc").ToStringEncoded();
         entity.changebank = row.Field<bool>("changebank");
         entity.addmode = row.Field<bool>("addmode");
         entity.historyfl = row.Field<bool>("historyfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSastcresults(ref DataRow row, Sastcresults entity)
      {
         row.SetField("currencyty", entity.currencyty);
         row.SetField("glno", entity.glno);
         row.SetField("glnodesc", entity.glnodesc);
         row.SetField("rvglno", entity.rvglno);
         row.SetField("rvglnodesc", entity.rvglnodesc);
         row.SetField("shortdesc", entity.shortdesc);
         row.SetField("descrip", entity.descrip);
         row.SetField("bankno", entity.bankno);
         row.SetField("bankname", entity.bankname);
         row.SetField("draftfl", entity.draftfl);
         row.SetField("vouchexrate", entity.vouchexrate);
         row.SetField("purchexrate", entity.purchexrate);
         row.SetField("salesexrate", entity.salesexrate);
         row.SetField("arexrate", entity.arexrate);
         row.SetField("rvglexchrate", entity.rvglexchrate);
         row.SetField("ratesource", entity.ratesource);
         row.SetField("ratesourcechange", entity.ratesourcechange);
         row.SetField("edicurrency", entity.edicurrency);
         row.SetField("glacctno", entity.glacctno);
         row.SetField("gldeptno", entity.gldeptno);
         row.SetField("gldivno", entity.gldivno);
         row.SetField("glsubno", entity.glsubno);
         row.SetField("rvglacctno", entity.rvglacctno);
         row.SetField("rvgldeptno", entity.rvgldeptno);
         row.SetField("rvgldivno", entity.rvgldivno);
         row.SetField("rvglsubno", entity.rvglsubno);
         row.SetField("currsymbol", entity.currsymbol);
         row.SetField("stndcurrcd", entity.stndcurrcd);
         row.SetField("rowid-sastc", entity.rowidSastc.ToByteArray());
         row.SetField("changebank", entity.changebank);
         row.SetField("addmode", entity.addmode);
         row.SetField("historyfl", entity.historyfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591