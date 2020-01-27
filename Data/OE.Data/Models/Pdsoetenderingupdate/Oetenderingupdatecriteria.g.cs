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

namespace Infor.Sxe.OE.Data.Models.Pdsoetenderingupdate
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoetenderingupdate.Oetenderingupdatecriteria")]
   public partial class Oetenderingupdatecriteria : ModelBase
   {
      public int jrnlno { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public decimal dwnpmtamt { get; set; }
      public int crdivno { get; set; }
      public bool codfl { get; set; }
      public decimal chgdue { get; set; }
      public int bankno { get; set; }
      public bool maint { get; set; }
      public bool holdforauth { get; set; }
      public bool nonrefundfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oetenderingupdatecriteria BuildOetenderingupdatecriteriaFromRow(DataRow row)
      {
         Oetenderingupdatecriteria entity = new Oetenderingupdatecriteria();
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.dwnpmtamt = row.IsNull("dwnpmtamt") ? decimal.Zero : row.Field<decimal>("dwnpmtamt");
         entity.crdivno = row.IsNull("crdivno") ? 0 : row.Field<int>("crdivno");
         entity.codfl = row.Field<bool>("codfl");
         entity.chgdue = row.IsNull("chgdue") ? decimal.Zero : row.Field<decimal>("chgdue");
         entity.bankno = row.IsNull("bankno") ? 0 : row.Field<int>("bankno");
         entity.maint = row.Field<bool>("maint");
         entity.holdforauth = row.Field<bool>("holdforauth");
         entity.nonrefundfl = row.Field<bool>("nonrefundfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOetenderingupdatecriteria(ref DataRow row, Oetenderingupdatecriteria entity)
      {
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("dwnpmtamt", entity.dwnpmtamt);
         row.SetField("crdivno", entity.crdivno);
         row.SetField("codfl", entity.codfl);
         row.SetField("chgdue", entity.chgdue);
         row.SetField("bankno", entity.bankno);
         row.SetField("maint", entity.maint);
         row.SetField("holdforauth", entity.holdforauth);
         row.SetField("nonrefundfl", entity.nonrefundfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
