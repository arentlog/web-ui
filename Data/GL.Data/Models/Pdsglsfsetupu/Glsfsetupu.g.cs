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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfsetupu
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfsetupu.Glsfsetupu")]
   public partial class Glsfsetupu : ModelBase
   {
      [StringValidationAttribute]
      public string operand1 { get; set; }
      public int storageNo1 { get; set; }
      public int totalLevel1 { get; set; }
      public int columnNo1 { get; set; }
      public int value1 { get; set; }
      [StringValidationAttribute]
      public string @operator { get; set; }
      [StringValidationAttribute]
      public string operand2 { get; set; }
      public int storageNo2 { get; set; }
      public int totalLevel2 { get; set; }
      public int columnNo2 { get; set; }
      public int value2 { get; set; }
      [StringValidationAttribute]
      public string result { get; set; }
      public int storageNo3 { get; set; }
      public int totalLevel3 { get; set; }
      public int value3 { get; set; }
      public bool accumTotalsFl { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfsetupu BuildGlsfsetupuFromRow(DataRow row)
      {
         Glsfsetupu entity = new Glsfsetupu();
         entity.operand1 = row.IsNull("operand1") ? string.Empty : row.Field<string>("operand1");
         entity.storageNo1 = row.IsNull("storageNo1") ? 0 : row.Field<int>("storageNo1");
         entity.totalLevel1 = row.IsNull("totalLevel1") ? 0 : row.Field<int>("totalLevel1");
         entity.columnNo1 = row.IsNull("columnNo1") ? 0 : row.Field<int>("columnNo1");
         entity.value1 = row.IsNull("value1") ? 0 : row.Field<int>("value1");
         entity.@operator = row.IsNull("operator") ? string.Empty : row.Field<string>("operator");
         entity.operand2 = row.IsNull("operand2") ? string.Empty : row.Field<string>("operand2");
         entity.storageNo2 = row.IsNull("storageNo2") ? 0 : row.Field<int>("storageNo2");
         entity.totalLevel2 = row.IsNull("totalLevel2") ? 0 : row.Field<int>("totalLevel2");
         entity.columnNo2 = row.IsNull("columnNo2") ? 0 : row.Field<int>("columnNo2");
         entity.value2 = row.IsNull("value2") ? 0 : row.Field<int>("value2");
         entity.result = row.IsNull("result") ? string.Empty : row.Field<string>("result");
         entity.storageNo3 = row.IsNull("storageNo3") ? 0 : row.Field<int>("storageNo3");
         entity.totalLevel3 = row.IsNull("totalLevel3") ? 0 : row.Field<int>("totalLevel3");
         entity.value3 = row.IsNull("value3") ? 0 : row.Field<int>("value3");
         entity.accumTotalsFl = row.Field<bool>("accumTotalsFl");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfsetupu(ref DataRow row, Glsfsetupu entity)
      {
         row.SetField("operand1", entity.operand1);
         row.SetField("storageNo1", entity.storageNo1);
         row.SetField("totalLevel1", entity.totalLevel1);
         row.SetField("columnNo1", entity.columnNo1);
         row.SetField("value1", entity.value1);
         row.SetField("operator", entity.@operator);
         row.SetField("operand2", entity.operand2);
         row.SetField("storageNo2", entity.storageNo2);
         row.SetField("totalLevel2", entity.totalLevel2);
         row.SetField("columnNo2", entity.columnNo2);
         row.SetField("value2", entity.value2);
         row.SetField("result", entity.result);
         row.SetField("storageNo3", entity.storageNo3);
         row.SetField("totalLevel3", entity.totalLevel3);
         row.SetField("value3", entity.value3);
         row.SetField("accumTotalsFl", entity.accumTotalsFl);
         row.SetField("comment", entity.comment);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591