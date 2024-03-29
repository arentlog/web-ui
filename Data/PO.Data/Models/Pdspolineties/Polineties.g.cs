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

namespace Infor.Sxe.PO.Data.Models.Pdspolineties
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspolineties.Polineties")]
   public partial class Polineties : ModelBase
   {
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public int orderaltno { get; set; }
      public int orderaltsuf { get; set; }
      public int linealtno { get; set; }
      public int seqaltno { get; set; }
      public int wtcono { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      public bool cleartiefl { get; set; }
      [StringValidationAttribute]
      public string oordertype { get; set; }
      public int oorderaltno { get; set; }
      public int oorderaltsuf { get; set; }
      public int olinealtno { get; set; }
      public decimal oseqaltno { get; set; }
      public int owtcono { get; set; }
      public int repairordno { get; set; }
      public int repairordsuf { get; set; }
      [StringValidationAttribute]
      public string tietype { get; set; }
      public bool modified { get; set; }
      public long tierecid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Polineties BuildPolinetiesFromRow(DataRow row)
      {
         Polineties entity = new Polineties();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderaltsuf = row.IsNull("orderaltsuf") ? 0 : row.Field<int>("orderaltsuf");
         entity.linealtno = row.IsNull("linealtno") ? 0 : row.Field<int>("linealtno");
         entity.seqaltno = row.IsNull("seqaltno") ? 0 : row.Field<int>("seqaltno");
         entity.wtcono = row.IsNull("wtcono") ? 0 : row.Field<int>("wtcono");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.cleartiefl = row.Field<bool>("cleartiefl");
         entity.oordertype = row.IsNull("oordertype") ? string.Empty : row.Field<string>("oordertype");
         entity.oorderaltno = row.IsNull("oorderaltno") ? 0 : row.Field<int>("oorderaltno");
         entity.oorderaltsuf = row.IsNull("oorderaltsuf") ? 0 : row.Field<int>("oorderaltsuf");
         entity.olinealtno = row.IsNull("olinealtno") ? 0 : row.Field<int>("olinealtno");
         entity.oseqaltno = row.IsNull("oseqaltno") ? decimal.Zero : row.Field<decimal>("oseqaltno");
         entity.owtcono = row.IsNull("owtcono") ? 0 : row.Field<int>("owtcono");
         entity.repairordno = row.IsNull("repairordno") ? 0 : row.Field<int>("repairordno");
         entity.repairordsuf = row.IsNull("repairordsuf") ? 0 : row.Field<int>("repairordsuf");
         entity.tietype = row.IsNull("tietype") ? string.Empty : row.Field<string>("tietype");
         entity.modified = row.Field<bool>("modified");
         entity.tierecid = row.IsNull("tierecid") ? 0 : row.Field<long>("tierecid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPolineties(ref DataRow row, Polineties entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderaltsuf", entity.orderaltsuf);
         row.SetField("linealtno", entity.linealtno);
         row.SetField("seqaltno", entity.seqaltno);
         row.SetField("wtcono", entity.wtcono);
         row.SetField("transtype", entity.transtype);
         row.SetField("name", entity.name);
         row.SetField("cleartiefl", entity.cleartiefl);
         row.SetField("oordertype", entity.oordertype);
         row.SetField("oorderaltno", entity.oorderaltno);
         row.SetField("oorderaltsuf", entity.oorderaltsuf);
         row.SetField("olinealtno", entity.olinealtno);
         row.SetField("oseqaltno", entity.oseqaltno);
         row.SetField("owtcono", entity.owtcono);
         row.SetField("repairordno", entity.repairordno);
         row.SetField("repairordsuf", entity.repairordsuf);
         row.SetField("tietype", entity.tietype);
         row.SetField("modified", entity.modified);
         row.SetField("tierecid", entity.tierecid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
