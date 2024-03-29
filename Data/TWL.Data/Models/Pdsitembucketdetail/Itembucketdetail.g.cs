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

namespace Infor.Sxe.TWL.Data.Models.Pdsitembucketdetail
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsitembucketdetail.Itembucketdetail")]
   public partial class Itembucketdetail : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      public decimal qtyAvail { get; set; }
      public decimal qtyUnavail { get; set; }
      public decimal qtyReserved { get; set; }
      public decimal qtyInTransit { get; set; }
      public decimal qtyOnHand { get; set; }
      public decimal qtyDemand { get; set; }
      [StringValidationAttribute]
      public string itemRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Itembucketdetail BuildItembucketdetailFromRow(DataRow row)
      {
         Itembucketdetail entity = new Itembucketdetail();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.qtyAvail = row.IsNull("qtyAvail") ? decimal.Zero : row.Field<decimal>("qtyAvail");
         entity.qtyUnavail = row.IsNull("qtyUnavail") ? decimal.Zero : row.Field<decimal>("qtyUnavail");
         entity.qtyReserved = row.IsNull("qtyReserved") ? decimal.Zero : row.Field<decimal>("qtyReserved");
         entity.qtyInTransit = row.IsNull("qtyInTransit") ? decimal.Zero : row.Field<decimal>("qtyInTransit");
         entity.qtyOnHand = row.IsNull("qtyOnHand") ? decimal.Zero : row.Field<decimal>("qtyOnHand");
         entity.qtyDemand = row.IsNull("qtyDemand") ? decimal.Zero : row.Field<decimal>("qtyDemand");
         entity.itemRowID = row.Field<byte[]>("itemRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromItembucketdetail(ref DataRow row, Itembucketdetail entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("qtyAvail", entity.qtyAvail);
         row.SetField("qtyUnavail", entity.qtyUnavail);
         row.SetField("qtyReserved", entity.qtyReserved);
         row.SetField("qtyInTransit", entity.qtyInTransit);
         row.SetField("qtyOnHand", entity.qtyOnHand);
         row.SetField("qtyDemand", entity.qtyDemand);
         row.SetField("itemRowID", entity.itemRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
