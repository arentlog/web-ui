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

namespace Infor.Sxe.VA.Data.Models.Pdsvaealist
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaealist.Vaealistcriteria")]
   public partial class Vaealistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string compprod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string lotno { get; set; }
      public int vano { get; set; }
      public int vasuf { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string stage { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public DateTime? fromentereddate { get; set; }
      public DateTime? toentereddate { get; set; }
      public DateTime? frompromiseddate { get; set; }
      public DateTime? topromiseddate { get; set; }
      public DateTime? fromreqshipdate { get; set; }
      public DateTime? toreqshipdate { get; set; }
      public DateTime? fromestcompdt { get; set; }
      public DateTime? toestcompdt { get; set; }
      public int recordcount { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaealistcriteria BuildVaealistcriteriaFromRow(DataRow row)
      {
         Vaealistcriteria entity = new Vaealistcriteria();
         entity.compprod = row.IsNull("compprod") ? string.Empty : row.Field<string>("compprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.lotno = row.IsNull("lotno") ? string.Empty : row.Field<string>("lotno");
         entity.vano = row.IsNull("vano") ? 0 : row.Field<int>("vano");
         entity.vasuf = row.IsNull("vasuf") ? 0 : row.Field<int>("vasuf");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.stage = row.IsNull("stage") ? string.Empty : row.Field<string>("stage");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.fromentereddate = row.Field<DateTime?>("fromentereddate");
         entity.toentereddate = row.Field<DateTime?>("toentereddate");
         entity.frompromiseddate = row.Field<DateTime?>("frompromiseddate");
         entity.topromiseddate = row.Field<DateTime?>("topromiseddate");
         entity.fromreqshipdate = row.Field<DateTime?>("fromreqshipdate");
         entity.toreqshipdate = row.Field<DateTime?>("toreqshipdate");
         entity.fromestcompdt = row.Field<DateTime?>("fromestcompdt");
         entity.toestcompdt = row.Field<DateTime?>("toestcompdt");
         entity.recordcount = row.IsNull("recordcount") ? 0 : row.Field<int>("recordcount");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaealistcriteria(ref DataRow row, Vaealistcriteria entity)
      {
         row.SetField("compprod", entity.compprod);
         row.SetField("whse", entity.whse);
         row.SetField("lotno", entity.lotno);
         row.SetField("vano", entity.vano);
         row.SetField("vasuf", entity.vasuf);
         row.SetField("prod", entity.prod);
         row.SetField("stage", entity.stage);
         row.SetField("transtype", entity.transtype);
         row.SetField("fromentereddate", entity.fromentereddate);
         row.SetField("toentereddate", entity.toentereddate);
         row.SetField("frompromiseddate", entity.frompromiseddate);
         row.SetField("topromiseddate", entity.topromiseddate);
         row.SetField("fromreqshipdate", entity.fromreqshipdate);
         row.SetField("toreqshipdate", entity.toreqshipdate);
         row.SetField("fromestcompdt", entity.fromestcompdt);
         row.SetField("toestcompdt", entity.toestcompdt);
         row.SetField("recordcount", entity.recordcount);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
