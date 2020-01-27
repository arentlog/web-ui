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
       
namespace Infor.Sxe.Common.Data.Models.IC
{
   /// <summary>
   /// Group Attributes per Product
   /// </summary>
   
   public partial class IcscgBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Catalog #
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string catalog { get; set; }

      /// <summary>
      /// Attr No
      /// </summary>
      [Key,Order]
      public int attrno { get; set; }

      /// <summary>
      /// Group No
      /// </summary>
      [Key,Order]
      public int groupno { get; set; }

      /// <summary>
      /// Value No
      /// </summary>
      public int valueno { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

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
      /// Batch
      /// </summary>
      [StringValidationAttribute]
      public string ecbatchnm { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildIcscgBaseFromRow<T>(DataRow row) where T:IcscgBase, new()
      {
         T entity = new T();
         entity.catalog = row.IsNull("catalog") ? string.Empty : row.Field<string>("catalog");
         entity.attrno = row.IsNull("attrno") ? 0 : row.Field<int>("attrno");
         entity.groupno = row.IsNull("groupno") ? 0 : row.Field<int>("groupno");
         entity.valueno = row.IsNull("valueno") ? 0 : row.Field<int>("valueno");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.ecbatchnm = row.IsNull("ecbatchnm") ? string.Empty : row.Field<string>("ecbatchnm");
         entity.rowID = row.Field<byte[]>("icscgRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcscgBase(ref DataRow row, IcscgBase entity)
      {
         row.SetField("catalog", entity.catalog);
         row.SetField("attrno", entity.attrno);
         row.SetField("groupno", entity.groupno);
         row.SetField("valueno", entity.valueno);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("transproc", entity.transproc);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("ecbatchnm", entity.ecbatchnm);
         row.SetField("icscgRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, IcscgBase entity)
      {
         row.SetField("catalog", entity.catalog);
         row.SetField("attrno", entity.attrno);
         row.SetField("groupno", entity.groupno);
         row.SetField("icscgRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	