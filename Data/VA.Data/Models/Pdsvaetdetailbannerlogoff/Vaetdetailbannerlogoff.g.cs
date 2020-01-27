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

namespace Infor.Sxe.VA.Data.Models.Pdsvaetdetailbannerlogoff
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaetdetailbannerlogoff.Vaetdetailbannerlogoff")]
   public partial class Vaetdetailbannerlogoff : ModelBase
   {
      public bool forcevarollfl { get; set; }
      public bool forceheaderfl { get; set; }
      [StringValidationAttribute]
      public string ourproc { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaetdetailbannerlogoff BuildVaetdetailbannerlogoffFromRow(DataRow row)
      {
         Vaetdetailbannerlogoff entity = new Vaetdetailbannerlogoff();
         entity.forcevarollfl = row.Field<bool>("forcevarollfl");
         entity.forceheaderfl = row.Field<bool>("forceheaderfl");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaetdetailbannerlogoff(ref DataRow row, Vaetdetailbannerlogoff entity)
      {
         row.SetField("forcevarollfl", entity.forcevarollfl);
         row.SetField("forceheaderfl", entity.forceheaderfl);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
