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

namespace Infor.Sxe.TWL.Data.Models.Pdsvendorshipfromcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsvendorshipfromcriteria.Vendorshipfromcriteria")]
   public partial class Vendorshipfromcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string vendorId { get; set; }
      [StringValidationAttribute]
      public string ediCode { get; set; }
      [StringValidationAttribute]
      public string contactName { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string zip { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string vendorshipfromcriteriauserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vendorshipfromcriteria BuildVendorshipfromcriteriaFromRow(DataRow row)
      {
         Vendorshipfromcriteria entity = new Vendorshipfromcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.ediCode = row.IsNull("edi_code") ? string.Empty : row.Field<string>("edi_code");
         entity.contactName = row.IsNull("contact_name") ? string.Empty : row.Field<string>("contact_name");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.zip = row.IsNull("zip") ? string.Empty : row.Field<string>("zip");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.vendorshipfromcriteriauserfield = row.IsNull("vendorshipfromcriteriauserfield") ? string.Empty : row.Field<string>("vendorshipfromcriteriauserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVendorshipfromcriteria(ref DataRow row, Vendorshipfromcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("edi_code", entity.ediCode);
         row.SetField("contact_name", entity.contactName);
         row.SetField("city", entity.city);
         row.SetField("state", entity.state);
         row.SetField("zip", entity.zip);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("vendorshipfromcriteriauserfield", entity.vendorshipfromcriteriauserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591