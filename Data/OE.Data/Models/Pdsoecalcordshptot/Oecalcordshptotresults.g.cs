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

namespace Infor.Sxe.OE.Data.Models.Pdsoecalcordshptot
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoecalcordshptot.Oecalcordshptotresults")]
   public partial class Oecalcordshptotresults : ModelBase
   {
      public decimal shplineamt { get; set; }
      public decimal ordlineamt { get; set; }
      public decimal shpdiscamt { get; set; }
      public decimal orddiscamt { get; set; }
      public decimal shpaddonamt { get; set; }
      public decimal ordaddonamt { get; set; }
      public decimal shptaxamt { get; set; }
      public decimal ordtaxamt { get; set; }
      public decimal shptotalamt { get; set; }
      public decimal ordtotalamt { get; set; }
      public decimal ordpsttaxamt { get; set; }
      public decimal shppsttaxamt { get; set; }
      public decimal ordgsttaxamt { get; set; }
      public decimal shpgsttaxamt { get; set; }
      public decimal ordbotendamt { get; set; }
      public bool ordboexist { get; set; }
      public int nextlineno { get; set; }
      public decimal ordtottendamt { get; set; }
      public decimal shptottendamt { get; set; }
      public decimal orddue { get; set; }
      public decimal shpdue { get; set; }
      public bool taxordhidden { get; set; }
      public bool gstordhidden { get; set; }
      [StringValidationAttribute]
      public string gstordlabel { get; set; }
      public bool pstordhidden { get; set; }
      public decimal ordgstdspl { get; set; }
      [StringValidationAttribute]
      public string totdatccostlabel { get; set; }
      public decimal wodiscamtdspl { get; set; }
      public bool wodiscamtenabled { get; set; }
      [StringValidationAttribute]
      public string marginlabel { get; set; }
      public decimal totdomsale { get; set; }
      [StringValidationAttribute]
      public string totdomsalelabel { get; set; }
      public bool totdomsalehidden { get; set; }
      [StringValidationAttribute]
      public string custcurrsymbol { get; set; }
      public decimal exchrate { get; set; }
      public bool lotpricefl { get; set; }
      public int nplinecount { get; set; }
      public decimal nptotshipamt { get; set; }
      [StringValidationAttribute]
      public string statecd { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oecalcordshptotresults BuildOecalcordshptotresultsFromRow(DataRow row)
      {
         Oecalcordshptotresults entity = new Oecalcordshptotresults();
         entity.shplineamt = row.IsNull("shplineamt") ? decimal.Zero : row.Field<decimal>("shplineamt");
         entity.ordlineamt = row.IsNull("ordlineamt") ? decimal.Zero : row.Field<decimal>("ordlineamt");
         entity.shpdiscamt = row.IsNull("shpdiscamt") ? decimal.Zero : row.Field<decimal>("shpdiscamt");
         entity.orddiscamt = row.IsNull("orddiscamt") ? decimal.Zero : row.Field<decimal>("orddiscamt");
         entity.shpaddonamt = row.IsNull("shpaddonamt") ? decimal.Zero : row.Field<decimal>("shpaddonamt");
         entity.ordaddonamt = row.IsNull("ordaddonamt") ? decimal.Zero : row.Field<decimal>("ordaddonamt");
         entity.shptaxamt = row.IsNull("shptaxamt") ? decimal.Zero : row.Field<decimal>("shptaxamt");
         entity.ordtaxamt = row.IsNull("ordtaxamt") ? decimal.Zero : row.Field<decimal>("ordtaxamt");
         entity.shptotalamt = row.IsNull("shptotalamt") ? decimal.Zero : row.Field<decimal>("shptotalamt");
         entity.ordtotalamt = row.IsNull("ordtotalamt") ? decimal.Zero : row.Field<decimal>("ordtotalamt");
         entity.ordpsttaxamt = row.IsNull("ordpsttaxamt") ? decimal.Zero : row.Field<decimal>("ordpsttaxamt");
         entity.shppsttaxamt = row.IsNull("shppsttaxamt") ? decimal.Zero : row.Field<decimal>("shppsttaxamt");
         entity.ordgsttaxamt = row.IsNull("ordgsttaxamt") ? decimal.Zero : row.Field<decimal>("ordgsttaxamt");
         entity.shpgsttaxamt = row.IsNull("shpgsttaxamt") ? decimal.Zero : row.Field<decimal>("shpgsttaxamt");
         entity.ordbotendamt = row.IsNull("ordbotendamt") ? decimal.Zero : row.Field<decimal>("ordbotendamt");
         entity.ordboexist = row.Field<bool>("ordboexist");
         entity.nextlineno = row.IsNull("nextlineno") ? 0 : row.Field<int>("nextlineno");
         entity.ordtottendamt = row.IsNull("ordtottendamt") ? decimal.Zero : row.Field<decimal>("ordtottendamt");
         entity.shptottendamt = row.IsNull("shptottendamt") ? decimal.Zero : row.Field<decimal>("shptottendamt");
         entity.orddue = row.IsNull("orddue") ? decimal.Zero : row.Field<decimal>("orddue");
         entity.shpdue = row.IsNull("shpdue") ? decimal.Zero : row.Field<decimal>("shpdue");
         entity.taxordhidden = row.Field<bool>("taxordhidden");
         entity.gstordhidden = row.Field<bool>("gstordhidden");
         entity.gstordlabel = row.IsNull("gstordlabel") ? string.Empty : row.Field<string>("gstordlabel");
         entity.pstordhidden = row.Field<bool>("pstordhidden");
         entity.ordgstdspl = row.IsNull("ordgstdspl") ? decimal.Zero : row.Field<decimal>("ordgstdspl");
         entity.totdatccostlabel = row.IsNull("totdatccostlabel") ? string.Empty : row.Field<string>("totdatccostlabel");
         entity.wodiscamtdspl = row.IsNull("wodiscamtdspl") ? decimal.Zero : row.Field<decimal>("wodiscamtdspl");
         entity.wodiscamtenabled = row.Field<bool>("wodiscamtenabled");
         entity.marginlabel = row.IsNull("marginlabel") ? string.Empty : row.Field<string>("marginlabel");
         entity.totdomsale = row.IsNull("totdomsale") ? decimal.Zero : row.Field<decimal>("totdomsale");
         entity.totdomsalelabel = row.IsNull("totdomsalelabel") ? string.Empty : row.Field<string>("totdomsalelabel");
         entity.totdomsalehidden = row.Field<bool>("totdomsalehidden");
         entity.custcurrsymbol = row.IsNull("custcurrsymbol") ? string.Empty : row.Field<string>("custcurrsymbol");
         entity.exchrate = row.IsNull("exchrate") ? decimal.Zero : row.Field<decimal>("exchrate");
         entity.lotpricefl = row.Field<bool>("lotpricefl");
         entity.nplinecount = row.IsNull("nplinecount") ? 0 : row.Field<int>("nplinecount");
         entity.nptotshipamt = row.IsNull("nptotshipamt") ? decimal.Zero : row.Field<decimal>("nptotshipamt");
         entity.statecd = row.IsNull("statecd") ? string.Empty : row.Field<string>("statecd");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOecalcordshptotresults(ref DataRow row, Oecalcordshptotresults entity)
      {
         row.SetField("shplineamt", entity.shplineamt);
         row.SetField("ordlineamt", entity.ordlineamt);
         row.SetField("shpdiscamt", entity.shpdiscamt);
         row.SetField("orddiscamt", entity.orddiscamt);
         row.SetField("shpaddonamt", entity.shpaddonamt);
         row.SetField("ordaddonamt", entity.ordaddonamt);
         row.SetField("shptaxamt", entity.shptaxamt);
         row.SetField("ordtaxamt", entity.ordtaxamt);
         row.SetField("shptotalamt", entity.shptotalamt);
         row.SetField("ordtotalamt", entity.ordtotalamt);
         row.SetField("ordpsttaxamt", entity.ordpsttaxamt);
         row.SetField("shppsttaxamt", entity.shppsttaxamt);
         row.SetField("ordgsttaxamt", entity.ordgsttaxamt);
         row.SetField("shpgsttaxamt", entity.shpgsttaxamt);
         row.SetField("ordbotendamt", entity.ordbotendamt);
         row.SetField("ordboexist", entity.ordboexist);
         row.SetField("nextlineno", entity.nextlineno);
         row.SetField("ordtottendamt", entity.ordtottendamt);
         row.SetField("shptottendamt", entity.shptottendamt);
         row.SetField("orddue", entity.orddue);
         row.SetField("shpdue", entity.shpdue);
         row.SetField("taxordhidden", entity.taxordhidden);
         row.SetField("gstordhidden", entity.gstordhidden);
         row.SetField("gstordlabel", entity.gstordlabel);
         row.SetField("pstordhidden", entity.pstordhidden);
         row.SetField("ordgstdspl", entity.ordgstdspl);
         row.SetField("totdatccostlabel", entity.totdatccostlabel);
         row.SetField("wodiscamtdspl", entity.wodiscamtdspl);
         row.SetField("wodiscamtenabled", entity.wodiscamtenabled);
         row.SetField("marginlabel", entity.marginlabel);
         row.SetField("totdomsale", entity.totdomsale);
         row.SetField("totdomsalelabel", entity.totdomsalelabel);
         row.SetField("totdomsalehidden", entity.totdomsalehidden);
         row.SetField("custcurrsymbol", entity.custcurrsymbol);
         row.SetField("exchrate", entity.exchrate);
         row.SetField("lotpricefl", entity.lotpricefl);
         row.SetField("nplinecount", entity.nplinecount);
         row.SetField("nptotshipamt", entity.nptotshipamt);
         row.SetField("statecd", entity.statecd);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
