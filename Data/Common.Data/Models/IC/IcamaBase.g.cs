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
   /// ICAM - Analyze Usage Rate - Run Number Table
   /// </summary>
   
   public partial class IcamaBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Report #
      /// </summary>
      [Key,Order]
      public int reportno { get; set; }

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
      /// Warehouses
      /// </summary>
      [StringValidationAttribute]
      public string whses1 { get; set; }
      [StringValidationAttribute]
      public string whses2 { get; set; }
      [StringValidationAttribute]
      public string whses3 { get; set; }
      [StringValidationAttribute]
      public string whses4 { get; set; }
      [StringValidationAttribute]
      public string whses5 { get; set; }
      [StringValidationAttribute]
      public string whses6 { get; set; }
      [StringValidationAttribute]
      public string whses7 { get; set; }
      [StringValidationAttribute]
      public string whses8 { get; set; }
      [StringValidationAttribute]
      public string whses9 { get; set; }
      [StringValidationAttribute]
      public string whses10 { get; set; }

      /// <summary>
      /// # Of Products
      /// </summary>
      public int noprods { get; set; }

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
      public static T BuildIcamaBaseFromRow<T>(DataRow row) where T:IcamaBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.whses1 = row.IsNull("whses1") ? string.Empty : row.Field<string>("whses1");
         entity.whses2 = row.IsNull("whses2") ? string.Empty : row.Field<string>("whses2");
         entity.whses3 = row.IsNull("whses3") ? string.Empty : row.Field<string>("whses3");
         entity.whses4 = row.IsNull("whses4") ? string.Empty : row.Field<string>("whses4");
         entity.whses5 = row.IsNull("whses5") ? string.Empty : row.Field<string>("whses5");
         entity.whses6 = row.IsNull("whses6") ? string.Empty : row.Field<string>("whses6");
         entity.whses7 = row.IsNull("whses7") ? string.Empty : row.Field<string>("whses7");
         entity.whses8 = row.IsNull("whses8") ? string.Empty : row.Field<string>("whses8");
         entity.whses9 = row.IsNull("whses9") ? string.Empty : row.Field<string>("whses9");
         entity.whses10 = row.IsNull("whses10") ? string.Empty : row.Field<string>("whses10");
         entity.noprods = row.IsNull("noprods") ? 0 : row.Field<int>("noprods");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("icamaRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamaBase(ref DataRow row, IcamaBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("reportno", entity.reportno);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("whses1", entity.whses1);
         row.SetField("whses2", entity.whses2);
         row.SetField("whses3", entity.whses3);
         row.SetField("whses4", entity.whses4);
         row.SetField("whses5", entity.whses5);
         row.SetField("whses6", entity.whses6);
         row.SetField("whses7", entity.whses7);
         row.SetField("whses8", entity.whses8);
         row.SetField("whses9", entity.whses9);
         row.SetField("whses10", entity.whses10);
         row.SetField("noprods", entity.noprods);
         row.SetField("transproc", entity.transproc);
         row.SetField("icamaRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, IcamaBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("reportno", entity.reportno);
         row.SetField("icamaRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	