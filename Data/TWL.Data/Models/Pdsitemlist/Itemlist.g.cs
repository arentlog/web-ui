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

namespace Infor.Sxe.TWL.Data.Models.Pdsitemlist
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsitemlist.Itemlist")]
   public partial class Itemlist : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string itemNum { get; set; }
      [StringValidationAttribute]
      public string prodGrp { get; set; }
      [StringValidationAttribute]
      public string prodLine { get; set; }
      [StringValidationAttribute]
      public string upcNum { get; set; }
      [StringValidationAttribute]
      public string itemDesc { get; set; }
      [StringValidationAttribute]
      public string itemSecDesc { get; set; }
      [StringValidationAttribute]
      public string itemLongDesc { get; set; }
      [StringValidationAttribute]
      public string uom { get; set; }
      [StringValidationAttribute]
      public string whZone { get; set; }
      [StringValidationAttribute]
      public string abc { get; set; }
      [StringValidationAttribute]
      public string itemType { get; set; }
      public bool rowStatus { get; set; }
      public int iRecordCnt { get; set; }
      public bool lMoreRecords { get; set; }
      [StringValidationAttribute]
      public string rowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Itemlist BuildItemlistFromRow(DataRow row)
      {
         Itemlist entity = new Itemlist();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.itemNum = row.IsNull("item_num") ? string.Empty : row.Field<string>("item_num");
         entity.prodGrp = row.IsNull("prod_grp") ? string.Empty : row.Field<string>("prod_grp");
         entity.prodLine = row.IsNull("prod_line") ? string.Empty : row.Field<string>("prod_line");
         entity.upcNum = row.IsNull("upc_num") ? string.Empty : row.Field<string>("upc_num");
         entity.itemDesc = row.IsNull("item_desc") ? string.Empty : row.Field<string>("item_desc");
         entity.itemSecDesc = row.IsNull("item_sec_desc") ? string.Empty : row.Field<string>("item_sec_desc");
         entity.itemLongDesc = row.IsNull("item_long_desc") ? string.Empty : row.Field<string>("item_long_desc");
         entity.uom = row.IsNull("uom") ? string.Empty : row.Field<string>("uom");
         entity.whZone = row.IsNull("wh_zone") ? string.Empty : row.Field<string>("wh_zone");
         entity.abc = row.IsNull("abc") ? string.Empty : row.Field<string>("abc");
         entity.itemType = row.IsNull("item_type") ? string.Empty : row.Field<string>("item_type");
         entity.rowStatus = row.Field<bool>("row_status");
         entity.iRecordCnt = row.IsNull("iRecordCnt") ? 0 : row.Field<int>("iRecordCnt");
         entity.lMoreRecords = row.Field<bool>("lMoreRecords");
         entity.rowID = row.Field<byte[]>("rowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromItemlist(ref DataRow row, Itemlist entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("item_num", entity.itemNum);
         row.SetField("prod_grp", entity.prodGrp);
         row.SetField("prod_line", entity.prodLine);
         row.SetField("upc_num", entity.upcNum);
         row.SetField("item_desc", entity.itemDesc);
         row.SetField("item_sec_desc", entity.itemSecDesc);
         row.SetField("item_long_desc", entity.itemLongDesc);
         row.SetField("uom", entity.uom);
         row.SetField("wh_zone", entity.whZone);
         row.SetField("abc", entity.abc);
         row.SetField("item_type", entity.itemType);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("iRecordCnt", entity.iRecordCnt);
         row.SetField("lMoreRecords", entity.lMoreRecords);
         row.SetField("rowID", entity.rowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591