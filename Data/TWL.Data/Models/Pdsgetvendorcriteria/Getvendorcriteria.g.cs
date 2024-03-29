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

namespace Infor.Sxe.TWL.Data.Models.Pdsgetvendorcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsgetvendorcriteria.Getvendorcriteria")]
   public partial class Getvendorcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string vendorId { get; set; }
      [StringValidationAttribute]
      public string vendName { get; set; }
      [StringValidationAttribute]
      public string contactName { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string getvendorcriteriauserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Getvendorcriteria BuildGetvendorcriteriaFromRow(DataRow row)
      {
         Getvendorcriteria entity = new Getvendorcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.vendName = row.IsNull("vend_name") ? string.Empty : row.Field<string>("vend_name");
         entity.contactName = row.IsNull("contact_name") ? string.Empty : row.Field<string>("contact_name");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.getvendorcriteriauserfield = row.IsNull("getvendorcriteriauserfield") ? string.Empty : row.Field<string>("getvendorcriteriauserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGetvendorcriteria(ref DataRow row, Getvendorcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("vend_name", entity.vendName);
         row.SetField("contact_name", entity.contactName);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("getvendorcriteriauserfield", entity.getvendorcriteriauserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
