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

namespace Infor.Sxe.TWL.Data.Models.Pdsgeneratelabelprintcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsgeneratelabelprintcriteria.Generatelabelprintcriteria")]
   public partial class Generatelabelprintcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      public int labelNumber { get; set; }
      public int numberOfLabels { get; set; }
      [StringValidationAttribute]
      public string printerId { get; set; }
      public int labelPrintQuantity { get; set; }
      public int containerType { get; set; }
      public int cartonSize { get; set; }
      public int locationSize { get; set; }
      public int locationArrow { get; set; }
      [StringValidationAttribute]
      public string locationFormat { get; set; }
      public int inventorySize { get; set; }
      public int inventoryQuantity { get; set; }
      public int itemSize { get; set; }
      public int itemQuantity { get; set; }
      [StringValidationAttribute]
      public string primaryPickFormat { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Generatelabelprintcriteria BuildGeneratelabelprintcriteriaFromRow(DataRow row)
      {
         Generatelabelprintcriteria entity = new Generatelabelprintcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.labelNumber = row.IsNull("labelNumber") ? 0 : row.Field<int>("labelNumber");
         entity.numberOfLabels = row.IsNull("numberOfLabels") ? 0 : row.Field<int>("numberOfLabels");
         entity.printerId = row.IsNull("printer_id") ? string.Empty : row.Field<string>("printer_id");
         entity.labelPrintQuantity = row.IsNull("labelPrintQuantity") ? 0 : row.Field<int>("labelPrintQuantity");
         entity.containerType = row.IsNull("containerType") ? 0 : row.Field<int>("containerType");
         entity.cartonSize = row.IsNull("cartonSize") ? 0 : row.Field<int>("cartonSize");
         entity.locationSize = row.IsNull("locationSize") ? 0 : row.Field<int>("locationSize");
         entity.locationArrow = row.IsNull("locationArrow") ? 0 : row.Field<int>("locationArrow");
         entity.locationFormat = row.IsNull("locationFormat") ? string.Empty : row.Field<string>("locationFormat");
         entity.inventorySize = row.IsNull("inventorySize") ? 0 : row.Field<int>("inventorySize");
         entity.inventoryQuantity = row.IsNull("inventoryQuantity") ? 0 : row.Field<int>("inventoryQuantity");
         entity.itemSize = row.IsNull("itemSize") ? 0 : row.Field<int>("itemSize");
         entity.itemQuantity = row.IsNull("itemQuantity") ? 0 : row.Field<int>("itemQuantity");
         entity.primaryPickFormat = row.IsNull("primaryPickFormat") ? string.Empty : row.Field<string>("primaryPickFormat");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGeneratelabelprintcriteria(ref DataRow row, Generatelabelprintcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("emp_num", entity.empNum);
         row.SetField("labelNumber", entity.labelNumber);
         row.SetField("numberOfLabels", entity.numberOfLabels);
         row.SetField("printer_id", entity.printerId);
         row.SetField("labelPrintQuantity", entity.labelPrintQuantity);
         row.SetField("containerType", entity.containerType);
         row.SetField("cartonSize", entity.cartonSize);
         row.SetField("locationSize", entity.locationSize);
         row.SetField("locationArrow", entity.locationArrow);
         row.SetField("locationFormat", entity.locationFormat);
         row.SetField("inventorySize", entity.inventorySize);
         row.SetField("inventoryQuantity", entity.inventoryQuantity);
         row.SetField("itemSize", entity.itemSize);
         row.SetField("itemQuantity", entity.itemQuantity);
         row.SetField("primaryPickFormat", entity.primaryPickFormat);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
