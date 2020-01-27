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

namespace Infor.Sxe.PD.Data.Models.Pdspdevupdatecosts
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdevupdatecosts.Pdevupdatecostsresults")]
   public partial class Pdevupdatecostsresults : ModelBase
   {
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public int jrnlno { get; set; }
      public decimal lastcost { get; set; }
      [StringValidationAttribute]
      public string lastcosttyp { get; set; }
      public decimal lastcostamt { get; set; }
      public decimal lastcostnew { get; set; }
      [StringValidationAttribute]
      public string lastcsttydesc { get; set; }
      [StringValidationAttribute]
      public string replcosttyp { get; set; }
      public decimal replcost { get; set; }
      public decimal replcostamt { get; set; }
      public decimal replcostnew { get; set; }
      [StringValidationAttribute]
      public string replcsttydesc { get; set; }
      public decimal avgcost { get; set; }
      [StringValidationAttribute]
      public string avgcosttyp { get; set; }
      public decimal avgcostamt { get; set; }
      public decimal avgcostnew { get; set; }
      [StringValidationAttribute]
      public string avgcsttydesc { get; set; }
      public decimal stndcost { get; set; }
      [StringValidationAttribute]
      public string stndcosttyp { get; set; }
      public decimal stndcostamt { get; set; }
      public decimal stndcostnew { get; set; }
      [StringValidationAttribute]
      public string stndcsttydesc { get; set; }
      public decimal rebatecost { get; set; }
      [StringValidationAttribute]
      public string rebatecosttyp { get; set; }
      public decimal rebatecostamt { get; set; }
      public decimal rebatecostnew { get; set; }
      [StringValidationAttribute]
      public string rebcsttydesc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdevupdatecostsresults BuildPdevupdatecostsresultsFromRow(DataRow row)
      {
         Pdevupdatecostsresults entity = new Pdevupdatecostsresults();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.lastcost = row.IsNull("lastcost") ? decimal.Zero : row.Field<decimal>("lastcost");
         entity.lastcosttyp = row.IsNull("lastcosttyp") ? string.Empty : row.Field<string>("lastcosttyp");
         entity.lastcostamt = row.IsNull("lastcostamt") ? decimal.Zero : row.Field<decimal>("lastcostamt");
         entity.lastcostnew = row.IsNull("lastcostnew") ? decimal.Zero : row.Field<decimal>("lastcostnew");
         entity.lastcsttydesc = row.IsNull("lastcsttydesc") ? string.Empty : row.Field<string>("lastcsttydesc");
         entity.replcosttyp = row.IsNull("replcosttyp") ? string.Empty : row.Field<string>("replcosttyp");
         entity.replcost = row.IsNull("replcost") ? decimal.Zero : row.Field<decimal>("replcost");
         entity.replcostamt = row.IsNull("replcostamt") ? decimal.Zero : row.Field<decimal>("replcostamt");
         entity.replcostnew = row.IsNull("replcostnew") ? decimal.Zero : row.Field<decimal>("replcostnew");
         entity.replcsttydesc = row.IsNull("replcsttydesc") ? string.Empty : row.Field<string>("replcsttydesc");
         entity.avgcost = row.IsNull("avgcost") ? decimal.Zero : row.Field<decimal>("avgcost");
         entity.avgcosttyp = row.IsNull("avgcosttyp") ? string.Empty : row.Field<string>("avgcosttyp");
         entity.avgcostamt = row.IsNull("avgcostamt") ? decimal.Zero : row.Field<decimal>("avgcostamt");
         entity.avgcostnew = row.IsNull("avgcostnew") ? decimal.Zero : row.Field<decimal>("avgcostnew");
         entity.avgcsttydesc = row.IsNull("avgcsttydesc") ? string.Empty : row.Field<string>("avgcsttydesc");
         entity.stndcost = row.IsNull("stndcost") ? decimal.Zero : row.Field<decimal>("stndcost");
         entity.stndcosttyp = row.IsNull("stndcosttyp") ? string.Empty : row.Field<string>("stndcosttyp");
         entity.stndcostamt = row.IsNull("stndcostamt") ? decimal.Zero : row.Field<decimal>("stndcostamt");
         entity.stndcostnew = row.IsNull("stndcostnew") ? decimal.Zero : row.Field<decimal>("stndcostnew");
         entity.stndcsttydesc = row.IsNull("stndcsttydesc") ? string.Empty : row.Field<string>("stndcsttydesc");
         entity.rebatecost = row.IsNull("rebatecost") ? decimal.Zero : row.Field<decimal>("rebatecost");
         entity.rebatecosttyp = row.IsNull("rebatecosttyp") ? string.Empty : row.Field<string>("rebatecosttyp");
         entity.rebatecostamt = row.IsNull("rebatecostamt") ? decimal.Zero : row.Field<decimal>("rebatecostamt");
         entity.rebatecostnew = row.IsNull("rebatecostnew") ? decimal.Zero : row.Field<decimal>("rebatecostnew");
         entity.rebcsttydesc = row.IsNull("rebcsttydesc") ? string.Empty : row.Field<string>("rebcsttydesc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdevupdatecostsresults(ref DataRow row, Pdevupdatecostsresults entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("prod", entity.prod);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("whse", entity.whse);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("lastcost", entity.lastcost);
         row.SetField("lastcosttyp", entity.lastcosttyp);
         row.SetField("lastcostamt", entity.lastcostamt);
         row.SetField("lastcostnew", entity.lastcostnew);
         row.SetField("lastcsttydesc", entity.lastcsttydesc);
         row.SetField("replcosttyp", entity.replcosttyp);
         row.SetField("replcost", entity.replcost);
         row.SetField("replcostamt", entity.replcostamt);
         row.SetField("replcostnew", entity.replcostnew);
         row.SetField("replcsttydesc", entity.replcsttydesc);
         row.SetField("avgcost", entity.avgcost);
         row.SetField("avgcosttyp", entity.avgcosttyp);
         row.SetField("avgcostamt", entity.avgcostamt);
         row.SetField("avgcostnew", entity.avgcostnew);
         row.SetField("avgcsttydesc", entity.avgcsttydesc);
         row.SetField("stndcost", entity.stndcost);
         row.SetField("stndcosttyp", entity.stndcosttyp);
         row.SetField("stndcostamt", entity.stndcostamt);
         row.SetField("stndcostnew", entity.stndcostnew);
         row.SetField("stndcsttydesc", entity.stndcsttydesc);
         row.SetField("rebatecost", entity.rebatecost);
         row.SetField("rebatecosttyp", entity.rebatecosttyp);
         row.SetField("rebatecostamt", entity.rebatecostamt);
         row.SetField("rebatecostnew", entity.rebatecostnew);
         row.SetField("rebcsttydesc", entity.rebcsttydesc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
