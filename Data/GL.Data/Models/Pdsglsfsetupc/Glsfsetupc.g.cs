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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfsetupc
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfsetupc.Glsfsetupc")]
   public partial class Glsfsetupc : ModelBase
   {
      public int columnNo { get; set; }
      [StringValidationAttribute]
      public string type1 { get; set; }
      [StringValidationAttribute]
      public string value1 { get; set; }
      public int lookBack1 { get; set; }
      [StringValidationAttribute]
      public string type2 { get; set; }
      [StringValidationAttribute]
      public string value2 { get; set; }
      public int lookBack2 { get; set; }
      [StringValidationAttribute]
      public string @operator { get; set; }
      public int length { get; set; }
      public int position { get; set; }
      public bool printFl { get; set; }
      public bool roundFl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfsetupc BuildGlsfsetupcFromRow(DataRow row)
      {
         Glsfsetupc entity = new Glsfsetupc();
         entity.columnNo = row.IsNull("columnNo") ? 0 : row.Field<int>("columnNo");
         entity.type1 = row.IsNull("type1") ? string.Empty : row.Field<string>("type1");
         entity.value1 = row.IsNull("value1") ? string.Empty : row.Field<string>("value1");
         entity.lookBack1 = row.IsNull("lookBack1") ? 0 : row.Field<int>("lookBack1");
         entity.type2 = row.IsNull("type2") ? string.Empty : row.Field<string>("type2");
         entity.value2 = row.IsNull("value2") ? string.Empty : row.Field<string>("value2");
         entity.lookBack2 = row.IsNull("lookBack2") ? 0 : row.Field<int>("lookBack2");
         entity.@operator = row.IsNull("operator") ? string.Empty : row.Field<string>("operator");
         entity.length = row.IsNull("length") ? 0 : row.Field<int>("length");
         entity.position = row.IsNull("position") ? 0 : row.Field<int>("position");
         entity.printFl = row.Field<bool>("PrintFl");
         entity.roundFl = row.Field<bool>("RoundFl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfsetupc(ref DataRow row, Glsfsetupc entity)
      {
         row.SetField("columnNo", entity.columnNo);
         row.SetField("type1", entity.type1);
         row.SetField("value1", entity.value1);
         row.SetField("lookBack1", entity.lookBack1);
         row.SetField("type2", entity.type2);
         row.SetField("value2", entity.value2);
         row.SetField("lookBack2", entity.lookBack2);
         row.SetField("operator", entity.@operator);
         row.SetField("length", entity.length);
         row.SetField("position", entity.position);
         row.SetField("PrintFl", entity.printFl);
         row.SetField("RoundFl", entity.roundFl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
