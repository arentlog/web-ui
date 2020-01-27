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

namespace Infor.Sxe.TWL.Data.Models.Pdsvalmultiloccreatecriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsvalmultiloccreatecriteria.Valmultiloccreatecriteria")]
   public partial class Valmultiloccreatecriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string whZone { get; set; }
      public int aisle { get; set; }
      [StringValidationAttribute]
      public string prefix { get; set; }
      public int positionType { get; set; }
      [StringValidationAttribute]
      public string positionFrom { get; set; }
      [StringValidationAttribute]
      public string positionTo { get; set; }
      public int positionLength { get; set; }
      [StringValidationAttribute]
      public string positionRangeType { get; set; }
      public int levelType { get; set; }
      [StringValidationAttribute]
      public string levelFrom { get; set; }
      [StringValidationAttribute]
      public string levelTo { get; set; }
      public int levelLength { get; set; }
      [StringValidationAttribute]
      public string locType { get; set; }
      [StringValidationAttribute]
      public string abc { get; set; }
      public int height { get; set; }
      public int width { get; set; }
      public int depth { get; set; }
      public decimal cube { get; set; }
      public int maxWeight { get; set; }
      public int palletFootprint { get; set; }
      public int stackHeight { get; set; }
      public int pickSequence { get; set; }
      [StringValidationAttribute]
      public string putawayGroup { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Valmultiloccreatecriteria BuildValmultiloccreatecriteriaFromRow(DataRow row)
      {
         Valmultiloccreatecriteria entity = new Valmultiloccreatecriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.whZone = row.IsNull("whZone") ? string.Empty : row.Field<string>("whZone");
         entity.aisle = row.IsNull("aisle") ? 0 : row.Field<int>("aisle");
         entity.prefix = row.IsNull("prefix") ? string.Empty : row.Field<string>("prefix");
         entity.positionType = row.IsNull("positionType") ? 0 : row.Field<int>("positionType");
         entity.positionFrom = row.IsNull("positionFrom") ? string.Empty : row.Field<string>("positionFrom");
         entity.positionTo = row.IsNull("positionTo") ? string.Empty : row.Field<string>("positionTo");
         entity.positionLength = row.IsNull("positionLength") ? 0 : row.Field<int>("positionLength");
         entity.positionRangeType = row.IsNull("positionRangeType") ? string.Empty : row.Field<string>("positionRangeType");
         entity.levelType = row.IsNull("levelType") ? 0 : row.Field<int>("levelType");
         entity.levelFrom = row.IsNull("levelFrom") ? string.Empty : row.Field<string>("levelFrom");
         entity.levelTo = row.IsNull("levelTo") ? string.Empty : row.Field<string>("levelTo");
         entity.levelLength = row.IsNull("levelLength") ? 0 : row.Field<int>("levelLength");
         entity.locType = row.IsNull("locType") ? string.Empty : row.Field<string>("locType");
         entity.abc = row.IsNull("abc") ? string.Empty : row.Field<string>("abc");
         entity.height = row.IsNull("height") ? 0 : row.Field<int>("height");
         entity.width = row.IsNull("width") ? 0 : row.Field<int>("width");
         entity.depth = row.IsNull("depth") ? 0 : row.Field<int>("depth");
         entity.cube = row.IsNull("cube") ? decimal.Zero : row.Field<decimal>("cube");
         entity.maxWeight = row.IsNull("maxWeight") ? 0 : row.Field<int>("maxWeight");
         entity.palletFootprint = row.IsNull("palletFootprint") ? 0 : row.Field<int>("palletFootprint");
         entity.stackHeight = row.IsNull("stackHeight") ? 0 : row.Field<int>("stackHeight");
         entity.pickSequence = row.IsNull("pickSequence") ? 0 : row.Field<int>("pickSequence");
         entity.putawayGroup = row.IsNull("putawayGroup") ? string.Empty : row.Field<string>("putawayGroup");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromValmultiloccreatecriteria(ref DataRow row, Valmultiloccreatecriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("whZone", entity.whZone);
         row.SetField("aisle", entity.aisle);
         row.SetField("prefix", entity.prefix);
         row.SetField("positionType", entity.positionType);
         row.SetField("positionFrom", entity.positionFrom);
         row.SetField("positionTo", entity.positionTo);
         row.SetField("positionLength", entity.positionLength);
         row.SetField("positionRangeType", entity.positionRangeType);
         row.SetField("levelType", entity.levelType);
         row.SetField("levelFrom", entity.levelFrom);
         row.SetField("levelTo", entity.levelTo);
         row.SetField("levelLength", entity.levelLength);
         row.SetField("locType", entity.locType);
         row.SetField("abc", entity.abc);
         row.SetField("height", entity.height);
         row.SetField("width", entity.width);
         row.SetField("depth", entity.depth);
         row.SetField("cube", entity.cube);
         row.SetField("maxWeight", entity.maxWeight);
         row.SetField("palletFootprint", entity.palletFootprint);
         row.SetField("stackHeight", entity.stackHeight);
         row.SetField("pickSequence", entity.pickSequence);
         row.SetField("putawayGroup", entity.putawayGroup);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
