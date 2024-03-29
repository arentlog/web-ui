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
       
namespace Infor.Sxe.Common.Data.Models.SL
{
   /// <summary>
   /// Supplier Link Part Number Change File
   /// </summary>
   
   public partial class SlednBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Import Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string imptype { get; set; }

      /// <summary>
      /// Update #
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string slupdtno { get; set; }

      /// <summary>
      /// New Part
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string newpartno { get; set; }

      /// <summary>
      /// Old Part
      /// </summary>
      [StringValidationAttribute]
      public string oldpartno { get; set; }

      /// <summary>
      /// Product #
      /// </summary>
      [StringValidationAttribute]
      public string prod { get; set; }

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
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

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
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSlednBaseFromRow<T>(DataRow row) where T:SlednBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.imptype = row.IsNull("imptype") ? string.Empty : row.Field<string>("imptype");
         entity.slupdtno = row.IsNull("slupdtno") ? string.Empty : row.Field<string>("slupdtno");
         entity.newpartno = row.IsNull("newpartno") ? string.Empty : row.Field<string>("newpartno");
         entity.oldpartno = row.IsNull("oldpartno") ? string.Empty : row.Field<string>("oldpartno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("slednRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSlednBase(ref DataRow row, SlednBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("imptype", entity.imptype);
         row.SetField("slupdtno", entity.slupdtno);
         row.SetField("newpartno", entity.newpartno);
         row.SetField("oldpartno", entity.oldpartno);
         row.SetField("prod", entity.prod);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
         row.SetField("slednRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SlednBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("imptype", entity.imptype);
         row.SetField("slupdtno", entity.slupdtno);
         row.SetField("newpartno", entity.newpartno);
         row.SetField("slednRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	