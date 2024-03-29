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

namespace Infor.Sxe.TWL.Data.Models.Pdsinvrepl
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsinvrepl.Invrepl")]
   public partial class Invrepl : ModelBase
   {
      public bool urgent { get; set; }
      [StringValidationAttribute]
      public string binFrom { get; set; }
      [StringValidationAttribute]
      public string zoneTo { get; set; }
      public decimal quantity { get; set; }
      public int deptNum { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      [StringValidationAttribute]
      public string movemstRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Invrepl BuildInvreplFromRow(DataRow row)
      {
         Invrepl entity = new Invrepl();
         entity.urgent = row.Field<bool>("urgent");
         entity.binFrom = row.IsNull("bin_from") ? string.Empty : row.Field<string>("bin_from");
         entity.zoneTo = row.IsNull("zone_to") ? string.Empty : row.Field<string>("zone_to");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.deptNum = row.IsNull("dept_num") ? 0 : row.Field<int>("dept_num");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.movemstRowID = row.Field<byte[]>("movemstRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromInvrepl(ref DataRow row, Invrepl entity)
      {
         row.SetField("urgent", entity.urgent);
         row.SetField("bin_from", entity.binFrom);
         row.SetField("zone_to", entity.zoneTo);
         row.SetField("quantity", entity.quantity);
         row.SetField("dept_num", entity.deptNum);
         row.SetField("lot", entity.lot);
         row.SetField("movemstRowID", entity.movemstRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
