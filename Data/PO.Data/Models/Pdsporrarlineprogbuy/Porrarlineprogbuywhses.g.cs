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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarlineprogbuy
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarlineprogbuy.Porrarlineprogbuywhses")]
   public partial class Porrarlineprogbuywhses : ModelBase
   {
      public int cono { get; set; }
      public int reportno { get; set; }
      public int lineno { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal qtyord { get; set; }
      public decimal stkqtyord { get; set; }
      public decimal dnetamt { get; set; }
      public decimal qtybo { get; set; }
      public decimal usagerate { get; set; }
      public int @class { get; set; }
      public int startmth { get; set; }
      public bool justdeleted { get; set; }
      public bool hasbeenmodified { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Porrarlineprogbuywhses BuildPorrarlineprogbuywhsesFromRow(DataRow row)
      {
         Porrarlineprogbuywhses entity = new Porrarlineprogbuywhses();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.dnetamt = row.IsNull("dnetamt") ? decimal.Zero : row.Field<decimal>("dnetamt");
         entity.qtybo = row.IsNull("qtybo") ? decimal.Zero : row.Field<decimal>("qtybo");
         entity.usagerate = row.IsNull("usagerate") ? decimal.Zero : row.Field<decimal>("usagerate");
         entity.@class = row.IsNull("class") ? 0 : row.Field<int>("class");
         entity.startmth = row.IsNull("startmth") ? 0 : row.Field<int>("startmth");
         entity.justdeleted = row.Field<bool>("justdeleted");
         entity.hasbeenmodified = row.Field<bool>("hasbeenmodified");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarlineprogbuywhses(ref DataRow row, Porrarlineprogbuywhses entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("reportno", entity.reportno);
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("whse", entity.whse);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("dnetamt", entity.dnetamt);
         row.SetField("qtybo", entity.qtybo);
         row.SetField("usagerate", entity.usagerate);
         row.SetField("class", entity.@class);
         row.SetField("startmth", entity.startmth);
         row.SetField("justdeleted", entity.justdeleted);
         row.SetField("hasbeenmodified", entity.hasbeenmodified);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
