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

namespace Infor.Sxe.KP.Data.Models.Pdsoelinelinetiehdr
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdsoelinelinetiehdr.Oelinelinetiehdr")]
   public partial class Oelinelinetiehdr : ModelBase
   {
      [StringValidationAttribute]
      public string runmode { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string ourproc { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string maintmode { get; set; }
      [StringValidationAttribute]
      public string orderdisp { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oelinelinetiehdr BuildOelinelinetiehdrFromRow(DataRow row)
      {
         Oelinelinetiehdr entity = new Oelinelinetiehdr();
         entity.runmode = row.IsNull("runmode") ? string.Empty : row.Field<string>("runmode");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.maintmode = row.IsNull("maintmode") ? string.Empty : row.Field<string>("maintmode");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinelinetiehdr(ref DataRow row, Oelinelinetiehdr entity)
      {
         row.SetField("runmode", entity.runmode);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("whse", entity.whse);
         row.SetField("transtype", entity.transtype);
         row.SetField("maintmode", entity.maintmode);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
