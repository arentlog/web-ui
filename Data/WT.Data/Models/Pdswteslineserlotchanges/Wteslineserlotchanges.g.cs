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

namespace Infor.Sxe.WT.Data.Models.Pdswteslineserlotchanges
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswteslineserlotchanges.Wteslineserlotchanges")]
   public partial class Wteslineserlotchanges : ModelBase
   {
      public int lineno { get; set; }
      public bool bofl { get; set; }
      public decimal qtyship { get; set; }
      public decimal stkqtyship { get; set; }
      public decimal qtyunavail { get; set; }
      public decimal nosnlotso { get; set; }
      [StringValidationAttribute]
      public string binloc { get; set; }


      public static Wteslineserlotchanges BuildWteslineserlotchangesFromRow(DataRow row)
      {
         Wteslineserlotchanges entity = new Wteslineserlotchanges();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.bofl = row.Field<bool>("bofl");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.nosnlotso = row.IsNull("nosnlotso") ? decimal.Zero : row.Field<decimal>("nosnlotso");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWteslineserlotchanges(ref DataRow row, Wteslineserlotchanges entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("bofl", entity.bofl);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("nosnlotso", entity.nosnlotso);
         row.SetField("binloc", entity.binloc);

      }
   
   }
}
#pragma warning restore 1591
