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

namespace Infor.Sxe.IC.Data.Models.Pdsiclotcutlist
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiclotcutlist.Lotcutlist")]
   public partial class Lotcutlist : ModelBase
   {
      [StringValidationAttribute]
      public string lotno { get; set; }
      public int seqno { get; set; }
      public bool unavailfl { get; set; }
      [StringValidationAttribute]
      public string conditioncd { get; set; }
      public decimal quantity { get; set; }
      public decimal length1 { get; set; }
      public decimal length2 { get; set; }
      public decimal length3 { get; set; }
      [StringValidationAttribute]
      public string lengthunit { get; set; }
      public decimal width1 { get; set; }
      public decimal width2 { get; set; }
      public decimal width3 { get; set; }
      [StringValidationAttribute]
      public string widthunit { get; set; }
      public bool selectedfl { get; set; }
      [StringValidationAttribute]
      public string icselcrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Lotcutlist BuildLotcutlistFromRow(DataRow row)
      {
         Lotcutlist entity = new Lotcutlist();
         entity.lotno = row.IsNull("lotno") ? string.Empty : row.Field<string>("lotno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.unavailfl = row.Field<bool>("unavailfl");
         entity.conditioncd = row.IsNull("conditioncd") ? string.Empty : row.Field<string>("conditioncd");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.length1 = row.IsNull("length1") ? decimal.Zero : row.Field<decimal>("length1");
         entity.length2 = row.IsNull("length2") ? decimal.Zero : row.Field<decimal>("length2");
         entity.length3 = row.IsNull("length3") ? decimal.Zero : row.Field<decimal>("length3");
         entity.lengthunit = row.IsNull("lengthunit") ? string.Empty : row.Field<string>("lengthunit");
         entity.width1 = row.IsNull("width1") ? decimal.Zero : row.Field<decimal>("width1");
         entity.width2 = row.IsNull("width2") ? decimal.Zero : row.Field<decimal>("width2");
         entity.width3 = row.IsNull("width3") ? decimal.Zero : row.Field<decimal>("width3");
         entity.widthunit = row.IsNull("widthunit") ? string.Empty : row.Field<string>("widthunit");
         entity.selectedfl = row.Field<bool>("selectedfl");
         entity.icselcrowid = row.Field<byte[]>("icselcrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLotcutlist(ref DataRow row, Lotcutlist entity)
      {
         row.SetField("lotno", entity.lotno);
         row.SetField("seqno", entity.seqno);
         row.SetField("unavailfl", entity.unavailfl);
         row.SetField("conditioncd", entity.conditioncd);
         row.SetField("quantity", entity.quantity);
         row.SetField("length1", entity.length1);
         row.SetField("length2", entity.length2);
         row.SetField("length3", entity.length3);
         row.SetField("lengthunit", entity.lengthunit);
         row.SetField("width1", entity.width1);
         row.SetField("width2", entity.width2);
         row.SetField("width3", entity.width3);
         row.SetField("widthunit", entity.widthunit);
         row.SetField("selectedfl", entity.selectedfl);
         row.SetField("icselcrowid", entity.icselcrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591