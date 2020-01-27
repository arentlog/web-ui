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

namespace Infor.Sxe.AP.Data.Models.Pdsapemainvoices
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapemainvoices.Apemainvoices")]
   public partial class Apemainvoices : ModelBase
   {
      [StringValidationAttribute]
      public string capinvno { get; set; }
      public int iseqno { get; set; }
      public DateTime? dduedt { get; set; }
      [StringValidationAttribute]
      public string cinvtype { get; set; }
      public bool ldisputefl { get; set; }
      public int idivno { get; set; }
      public decimal damount { get; set; }
      public decimal dapplyamt { get; set; }
      public long rRecid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apemainvoices BuildApemainvoicesFromRow(DataRow row)
      {
         Apemainvoices entity = new Apemainvoices();
         entity.capinvno = row.IsNull("capinvno") ? string.Empty : row.Field<string>("capinvno");
         entity.iseqno = row.IsNull("iseqno") ? 0 : row.Field<int>("iseqno");
         entity.dduedt = row.Field<DateTime?>("dduedt");
         entity.cinvtype = row.IsNull("cinvtype") ? string.Empty : row.Field<string>("cinvtype");
         entity.ldisputefl = row.Field<bool>("ldisputefl");
         entity.idivno = row.IsNull("idivno") ? 0 : row.Field<int>("idivno");
         entity.damount = row.IsNull("damount") ? decimal.Zero : row.Field<decimal>("damount");
         entity.dapplyamt = row.IsNull("dapplyamt") ? decimal.Zero : row.Field<decimal>("dapplyamt");
         entity.rRecid = row.IsNull("rRecid") ? 0 : row.Field<long>("rRecid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApemainvoices(ref DataRow row, Apemainvoices entity)
      {
         row.SetField("capinvno", entity.capinvno);
         row.SetField("iseqno", entity.iseqno);
         row.SetField("dduedt", entity.dduedt);
         row.SetField("cinvtype", entity.cinvtype);
         row.SetField("ldisputefl", entity.ldisputefl);
         row.SetField("idivno", entity.idivno);
         row.SetField("damount", entity.damount);
         row.SetField("dapplyamt", entity.dapplyamt);
         row.SetField("rRecid", entity.rRecid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
