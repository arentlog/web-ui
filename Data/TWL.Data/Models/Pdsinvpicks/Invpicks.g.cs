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

namespace Infor.Sxe.TWL.Data.Models.Pdsinvpicks
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsinvpicks.Invpicks")]
   public partial class Invpicks : ModelBase
   {
      public int batch { get; set; }
      [StringValidationAttribute]
      public string order { get; set; }
      [StringValidationAttribute]
      public string orderSuffix { get; set; }
      public decimal qty { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      [StringValidationAttribute]
      public string cartonId { get; set; }
      [StringValidationAttribute]
      public string pickRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Invpicks BuildInvpicksFromRow(DataRow row)
      {
         Invpicks entity = new Invpicks();
         entity.batch = row.IsNull("batch") ? 0 : row.Field<int>("batch");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.orderSuffix = row.IsNull("order_suffix") ? string.Empty : row.Field<string>("order_suffix");
         entity.qty = row.IsNull("qty") ? decimal.Zero : row.Field<decimal>("qty");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.cartonId = row.IsNull("carton_id") ? string.Empty : row.Field<string>("carton_id");
         entity.pickRowID = row.Field<byte[]>("pickRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromInvpicks(ref DataRow row, Invpicks entity)
      {
         row.SetField("batch", entity.batch);
         row.SetField("order", entity.order);
         row.SetField("order_suffix", entity.orderSuffix);
         row.SetField("qty", entity.qty);
         row.SetField("lot", entity.lot);
         row.SetField("carton_id", entity.cartonId);
         row.SetField("pickRowID", entity.pickRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591