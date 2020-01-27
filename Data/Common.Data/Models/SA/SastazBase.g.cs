//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 12700 $
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
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;
       
namespace Infor.Sxe.Common.Data.Models.SA
{
   /// <summary>
   /// Custom Table Values
   /// </summary>
   [EntityType("Custom Table Values","sastz.detail","")]
   public partial class SastazBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Table
      /// </summary>
      [DrillbackParam("pk",1),Key,Order,StringValidationAttribute]
      public string codeiden { get; set; }

      /// <summary>
      /// Primary
      /// </summary>
      [DrillbackParam("pk2",2),Key,Order,StringValidationAttribute]
      public string primarykey { get; set; }

      /// <summary>
      /// Secondary
      /// </summary>
      [DrillbackParam("pk3",3),Key,Order,StringValidationAttribute]
      public string secondarykey { get; set; }

      /// <summary>
      /// Table Value
      /// </summary>
      [ID(5),StringValidationAttribute]
      public string codeval1 { get; set; }
      [StringValidationAttribute]
      public string codeval2 { get; set; }
      [StringValidationAttribute]
      public string codeval3 { get; set; }
      [StringValidationAttribute]
      public string codeval4 { get; set; }
      [StringValidationAttribute]
      public string codeval5 { get; set; }
      [StringValidationAttribute]
      public string codeval6 { get; set; }
      [StringValidationAttribute]
      public string codeval7 { get; set; }
      [StringValidationAttribute]
      public string codeval8 { get; set; }
      [StringValidationAttribute]
      public string codeval9 { get; set; }
      [StringValidationAttribute]
      public string codeval10 { get; set; }
      [StringValidationAttribute]
      public string codeval11 { get; set; }
      [StringValidationAttribute]
      public string codeval12 { get; set; }
      [StringValidationAttribute]
      public string codeval13 { get; set; }
      [StringValidationAttribute]
      public string codeval14 { get; set; }
      [StringValidationAttribute]
      public string codeval15 { get; set; }
      [StringValidationAttribute]
      public string codeval16 { get; set; }

      /// <summary>
      /// Labels
      /// </summary>
      public bool labelfl { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Operator
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Transaction Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Transaction Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// User 7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSastazBaseFromRow<T>(DataRow row) where T:SastazBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.codeiden = row.IsNull("codeiden") ? string.Empty : row.Field<string>("codeiden");
         entity.primarykey = row.IsNull("primarykey") ? string.Empty : row.Field<string>("primarykey");
         entity.secondarykey = row.IsNull("secondarykey") ? string.Empty : row.Field<string>("secondarykey");
         entity.codeval1 = row.IsNull("codeval1") ? string.Empty : row.Field<string>("codeval1");
         entity.codeval2 = row.IsNull("codeval2") ? string.Empty : row.Field<string>("codeval2");
         entity.codeval3 = row.IsNull("codeval3") ? string.Empty : row.Field<string>("codeval3");
         entity.codeval4 = row.IsNull("codeval4") ? string.Empty : row.Field<string>("codeval4");
         entity.codeval5 = row.IsNull("codeval5") ? string.Empty : row.Field<string>("codeval5");
         entity.codeval6 = row.IsNull("codeval6") ? string.Empty : row.Field<string>("codeval6");
         entity.codeval7 = row.IsNull("codeval7") ? string.Empty : row.Field<string>("codeval7");
         entity.codeval8 = row.IsNull("codeval8") ? string.Empty : row.Field<string>("codeval8");
         entity.codeval9 = row.IsNull("codeval9") ? string.Empty : row.Field<string>("codeval9");
         entity.codeval10 = row.IsNull("codeval10") ? string.Empty : row.Field<string>("codeval10");
         entity.codeval11 = row.IsNull("codeval11") ? string.Empty : row.Field<string>("codeval11");
         entity.codeval12 = row.IsNull("codeval12") ? string.Empty : row.Field<string>("codeval12");
         entity.codeval13 = row.IsNull("codeval13") ? string.Empty : row.Field<string>("codeval13");
         entity.codeval14 = row.IsNull("codeval14") ? string.Empty : row.Field<string>("codeval14");
         entity.codeval15 = row.IsNull("codeval15") ? string.Empty : row.Field<string>("codeval15");
         entity.codeval16 = row.IsNull("codeval16") ? string.Empty : row.Field<string>("codeval16");
         entity.labelfl = row.Field<bool>("labelfl");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("sastazRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSastazBase(ref DataRow row, SastazBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("codeiden", entity.codeiden);
         row.SetField("primarykey", entity.primarykey);
         row.SetField("secondarykey", entity.secondarykey);
         row.SetField("codeval1", entity.codeval1);
         row.SetField("codeval2", entity.codeval2);
         row.SetField("codeval3", entity.codeval3);
         row.SetField("codeval4", entity.codeval4);
         row.SetField("codeval5", entity.codeval5);
         row.SetField("codeval6", entity.codeval6);
         row.SetField("codeval7", entity.codeval7);
         row.SetField("codeval8", entity.codeval8);
         row.SetField("codeval9", entity.codeval9);
         row.SetField("codeval10", entity.codeval10);
         row.SetField("codeval11", entity.codeval11);
         row.SetField("codeval12", entity.codeval12);
         row.SetField("codeval13", entity.codeval13);
         row.SetField("codeval14", entity.codeval14);
         row.SetField("codeval15", entity.codeval15);
         row.SetField("codeval16", entity.codeval16);
         row.SetField("labelfl", entity.labelfl);
         row.SetField("transproc", entity.transproc);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("sastazRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SastazBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("codeiden", entity.codeiden);
         row.SetField("primarykey", entity.primarykey);
         row.SetField("secondarykey", entity.secondarykey);
         row.SetField("sastazRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	