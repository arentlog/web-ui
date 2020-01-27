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

namespace Infor.Sxe.TWL.Data.Models.Pdsitemintrans
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsitemintrans.Itemintrans")]
   public partial class Itemintrans : ModelBase
   {
      [StringValidationAttribute]
      public string rtNum { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      public decimal quantity { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      public DateTime? delivery { get; set; }
      [StringValidationAttribute]
      public string itemintransuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Itemintrans BuildItemintransFromRow(DataRow row)
      {
         Itemintrans entity = new Itemintrans();
         entity.rtNum = row.IsNull("rt_num") ? string.Empty : row.Field<string>("rt_num");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.delivery = row.Field<DateTime?>("delivery");
         entity.itemintransuserfield = row.IsNull("itemintransuserfield") ? string.Empty : row.Field<string>("itemintransuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromItemintrans(ref DataRow row, Itemintrans entity)
      {
         row.SetField("rt_num", entity.rtNum);
         row.SetField("lot", entity.lot);
         row.SetField("quantity", entity.quantity);
         row.SetField("name", entity.name);
         row.SetField("delivery", entity.delivery);
         row.SetField("itemintransuserfield", entity.itemintransuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
