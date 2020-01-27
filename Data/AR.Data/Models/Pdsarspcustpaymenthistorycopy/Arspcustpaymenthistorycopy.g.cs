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

namespace Infor.Sxe.AR.Data.Models.Pdsarspcustpaymenthistorycopy
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarspcustpaymenthistorycopy.Arspcustpaymenthistorycopy")]
   public partial class Arspcustpaymenthistorycopy : ModelBase
   {
      public decimal fromcustno { get; set; }
      public decimal tocustno { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arspcustpaymenthistorycopy BuildArspcustpaymenthistorycopyFromRow(DataRow row)
      {
         Arspcustpaymenthistorycopy entity = new Arspcustpaymenthistorycopy();
         entity.fromcustno = row.IsNull("fromcustno") ? decimal.Zero : row.Field<decimal>("fromcustno");
         entity.tocustno = row.IsNull("tocustno") ? decimal.Zero : row.Field<decimal>("tocustno");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArspcustpaymenthistorycopy(ref DataRow row, Arspcustpaymenthistorycopy entity)
      {
         row.SetField("fromcustno", entity.fromcustno);
         row.SetField("tocustno", entity.tocustno);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
