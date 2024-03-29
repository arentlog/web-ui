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

namespace Infor.Sxe.TWL.Data.Models.Pdszonereplenishments
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdszonereplenishments.Zonereplenishments")]
   public partial class Zonereplenishments : ModelBase
   {
      [StringValidationAttribute]
      public string zoneFrom { get; set; }
      [StringValidationAttribute]
      public string zoneTo { get; set; }
      [StringValidationAttribute]
      public string binFrom { get; set; }
      [StringValidationAttribute]
      public string binTo { get; set; }
      public int batch { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      public decimal quantity { get; set; }
      [StringValidationAttribute]
      public string binmstRowID { get; set; }
      [StringValidationAttribute]
      public string movemmstRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Zonereplenishments BuildZonereplenishmentsFromRow(DataRow row)
      {
         Zonereplenishments entity = new Zonereplenishments();
         entity.zoneFrom = row.IsNull("zone_from") ? string.Empty : row.Field<string>("zone_from");
         entity.zoneTo = row.IsNull("zone_to") ? string.Empty : row.Field<string>("zone_to");
         entity.binFrom = row.IsNull("bin_from") ? string.Empty : row.Field<string>("bin_from");
         entity.binTo = row.IsNull("bin_to") ? string.Empty : row.Field<string>("bin_to");
         entity.batch = row.IsNull("batch") ? 0 : row.Field<int>("batch");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.binmstRowID = row.Field<byte[]>("binmstRowID").ToStringEncoded();
         entity.movemmstRowID = row.Field<byte[]>("movemmstRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromZonereplenishments(ref DataRow row, Zonereplenishments entity)
      {
         row.SetField("zone_from", entity.zoneFrom);
         row.SetField("zone_to", entity.zoneTo);
         row.SetField("bin_from", entity.binFrom);
         row.SetField("bin_to", entity.binTo);
         row.SetField("batch", entity.batch);
         row.SetField("abs_num", entity.absNum);
         row.SetField("quantity", entity.quantity);
         row.SetField("binmstRowID", entity.binmstRowID.ToByteArray());
         row.SetField("movemmstRowID", entity.movemmstRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
