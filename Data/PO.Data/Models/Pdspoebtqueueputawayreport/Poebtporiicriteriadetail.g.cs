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

namespace Infor.Sxe.PO.Data.Models.Pdspoebtqueueputawayreport
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoebtqueueputawayreport.Poebtporiicriteriadetail")]
   public partial class Poebtporiicriteriadetail : ModelBase
   {
      [StringValidationAttribute]
      public string shipmentid { get; set; }
      public int pono { get; set; }
      public int posuf { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Poebtporiicriteriadetail BuildPoebtporiicriteriadetailFromRow(DataRow row)
      {
         Poebtporiicriteriadetail entity = new Poebtporiicriteriadetail();
         entity.shipmentid = row.IsNull("shipmentid") ? string.Empty : row.Field<string>("shipmentid");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoebtporiicriteriadetail(ref DataRow row, Poebtporiicriteriadetail entity)
      {
         row.SetField("shipmentid", entity.shipmentid);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
