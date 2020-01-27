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

namespace Infor.Sxe.OE.Data.Models.Pdsoeheaderfinish
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeheaderfinish.Oeheaderfinishcriteria")]
   public partial class Oeheaderfinishcriteria : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public bool wlwhsechgfl { get; set; }
      public bool maintmode { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeheaderfinishcriteria BuildOeheaderfinishcriteriaFromRow(DataRow row)
      {
         Oeheaderfinishcriteria entity = new Oeheaderfinishcriteria();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.wlwhsechgfl = row.Field<bool>("wlwhsechgfl");
         entity.maintmode = row.Field<bool>("maintmode");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeheaderfinishcriteria(ref DataRow row, Oeheaderfinishcriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("wlwhsechgfl", entity.wlwhsechgfl);
         row.SetField("maintmode", entity.maintmode);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
