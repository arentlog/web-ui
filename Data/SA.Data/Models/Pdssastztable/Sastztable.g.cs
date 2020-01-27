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

namespace Infor.Sxe.SA.Data.Models.Pdssastztable
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssastztable.Sastztable")]
   public partial class Sastztable : ModelBase
   {
      [StringValidationAttribute]
      public string tablename { get; set; }
      [StringValidationAttribute]
      public string key1 { get; set; }
      [StringValidationAttribute]
      public string key2 { get; set; }
      [StringValidationAttribute]
      public string field1 { get; set; }
      [StringValidationAttribute]
      public string field2 { get; set; }
      [StringValidationAttribute]
      public string field3 { get; set; }
      [StringValidationAttribute]
      public string field4 { get; set; }
      [StringValidationAttribute]
      public string field5 { get; set; }
      [StringValidationAttribute]
      public string field6 { get; set; }
      [StringValidationAttribute]
      public string field7 { get; set; }
      [StringValidationAttribute]
      public string field8 { get; set; }
      [StringValidationAttribute]
      public string field9 { get; set; }
      [StringValidationAttribute]
      public string field10 { get; set; }
      [StringValidationAttribute]
      public string field11 { get; set; }
      [StringValidationAttribute]
      public string field12 { get; set; }
      [StringValidationAttribute]
      public string field13 { get; set; }
      [StringValidationAttribute]
      public string field14 { get; set; }
      [StringValidationAttribute]
      public string field15 { get; set; }
      [StringValidationAttribute]
      public string field16 { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      public int secure { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sastztable BuildSastztableFromRow(DataRow row)
      {
         Sastztable entity = new Sastztable();
         entity.tablename = row.IsNull("tablename") ? string.Empty : row.Field<string>("tablename");
         entity.key1 = row.IsNull("key1") ? string.Empty : row.Field<string>("key1");
         entity.key2 = row.IsNull("key2") ? string.Empty : row.Field<string>("key2");
         entity.field1 = row.IsNull("field1") ? string.Empty : row.Field<string>("field1");
         entity.field2 = row.IsNull("field2") ? string.Empty : row.Field<string>("field2");
         entity.field3 = row.IsNull("field3") ? string.Empty : row.Field<string>("field3");
         entity.field4 = row.IsNull("field4") ? string.Empty : row.Field<string>("field4");
         entity.field5 = row.IsNull("field5") ? string.Empty : row.Field<string>("field5");
         entity.field6 = row.IsNull("field6") ? string.Empty : row.Field<string>("field6");
         entity.field7 = row.IsNull("field7") ? string.Empty : row.Field<string>("field7");
         entity.field8 = row.IsNull("field8") ? string.Empty : row.Field<string>("field8");
         entity.field9 = row.IsNull("field9") ? string.Empty : row.Field<string>("field9");
         entity.field10 = row.IsNull("field10") ? string.Empty : row.Field<string>("field10");
         entity.field11 = row.IsNull("field11") ? string.Empty : row.Field<string>("field11");
         entity.field12 = row.IsNull("field12") ? string.Empty : row.Field<string>("field12");
         entity.field13 = row.IsNull("field13") ? string.Empty : row.Field<string>("field13");
         entity.field14 = row.IsNull("field14") ? string.Empty : row.Field<string>("field14");
         entity.field15 = row.IsNull("field15") ? string.Empty : row.Field<string>("field15");
         entity.field16 = row.IsNull("field16") ? string.Empty : row.Field<string>("field16");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSastztable(ref DataRow row, Sastztable entity)
      {
         row.SetField("tablename", entity.tablename);
         row.SetField("key1", entity.key1);
         row.SetField("key2", entity.key2);
         row.SetField("field1", entity.field1);
         row.SetField("field2", entity.field2);
         row.SetField("field3", entity.field3);
         row.SetField("field4", entity.field4);
         row.SetField("field5", entity.field5);
         row.SetField("field6", entity.field6);
         row.SetField("field7", entity.field7);
         row.SetField("field8", entity.field8);
         row.SetField("field9", entity.field9);
         row.SetField("field10", entity.field10);
         row.SetField("field11", entity.field11);
         row.SetField("field12", entity.field12);
         row.SetField("field13", entity.field13);
         row.SetField("field14", entity.field14);
         row.SetField("field15", entity.field15);
         row.SetField("field16", entity.field16);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("secure", entity.secure);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
