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
       
namespace Infor.Sxe.Common.Data.Models.SHARED
{
   /// <summary>
   /// CR Transactions
   /// </summary>
   
   public partial class CretBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      public int cono { get; set; }

      /// <summary>
      /// Bank #
      /// </summary>
      public int bankno { get; set; }

      /// <summary>
      /// Check #
      /// </summary>
      public decimal checkno { get; set; }

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
      /// Amount
      /// </summary>
      public decimal amount { get; set; }

      /// <summary>
      /// Ref
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

      /// <summary>
      /// ckrectype
      /// </summary>
      public int ckrectype { get; set; }

      /// <summary>
      /// Entered
      /// </summary>
      public DateTime? enterdt { get; set; }

      /// <summary>
      /// Module
      /// </summary>
      [StringValidationAttribute]
      public string modulenm { get; set; }

      /// <summary>
      /// Cleared
      /// </summary>
      public bool clearfl { get; set; }

      /// <summary>
      /// Void
      /// </summary>
      public bool voidfl { get; set; }

      /// <summary>
      /// Manual Check
      /// </summary>
      public bool mancheckfl { get; set; }

      /// <summary>
      /// Jrnl #
      /// </summary>
      public int jrnlno { get; set; }

      /// <summary>
      /// Void
      /// </summary>
      public DateTime? voiddt { get; set; }

      /// <summary>
      /// Balanced
      /// </summary>
      public bool balancedfl { get; set; }

      /// <summary>
      /// Balanced
      /// </summary>
      public DateTime? balanceddt { get; set; }

      /// <summary>
      /// Cleared
      /// </summary>
      public DateTime? cleardt { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      public bool statustype { get; set; }

      /// <summary>
      /// Set #
      /// </summary>
      public int setno { get; set; }

      /// <summary>
      /// Employee Number
      /// </summary>
      public decimal empno { get; set; }

      /// <summary>
      /// Reversed
      /// </summary>
      public bool revfl { get; set; }

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
      /// Rec#
      /// </summary>
      public decimal urecno { get; set; }

      /// <summary>
      /// Location
      /// </summary>
      [StringValidationAttribute]
      public string location { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// BACS Reference
      /// </summary>
      [StringValidationAttribute]
      public string bacsref { get; set; }

      /// <summary>
      /// Positive Pay Date
      /// </summary>
      public DateTime? pospaydttmz { get; set; }

      /// <summary>
      /// Positive Pay Transaction
      /// </summary>
      [StringValidationAttribute]
      public string pospaytransno { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildCretBaseFromRow<T>(DataRow row) where T:CretBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.bankno = row.IsNull("bankno") ? 0 : row.Field<int>("bankno");
         entity.checkno = row.IsNull("checkno") ? decimal.Zero : row.Field<decimal>("checkno");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.ckrectype = row.IsNull("ckrectype") ? 0 : row.Field<int>("ckrectype");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.modulenm = row.IsNull("modulenm") ? string.Empty : row.Field<string>("modulenm");
         entity.clearfl = row.Field<bool>("clearfl");
         entity.voidfl = row.Field<bool>("voidfl");
         entity.mancheckfl = row.Field<bool>("mancheckfl");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.voiddt = row.Field<DateTime?>("voiddt");
         entity.balancedfl = row.Field<bool>("balancedfl");
         entity.balanceddt = row.Field<DateTime?>("balanceddt");
         entity.cleardt = row.Field<DateTime?>("cleardt");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.statustype = row.Field<bool>("statustype");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.empno = row.IsNull("empno") ? decimal.Zero : row.Field<decimal>("empno");
         entity.revfl = row.Field<bool>("revfl");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.urecno = row.IsNull("urecno") ? decimal.Zero : row.Field<decimal>("urecno");
         entity.location = row.IsNull("location") ? string.Empty : row.Field<string>("location");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.bacsref = row.IsNull("bacsref") ? string.Empty : row.Field<string>("bacsref");
         entity.pospaydttmz = row.Field<DateTime?>("pospaydttmz");
         entity.pospaytransno = row.IsNull("pospaytransno") ? string.Empty : row.Field<string>("pospaytransno");
         entity.rowID = row.Field<byte[]>("cretRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCretBase(ref DataRow row, CretBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("bankno", entity.bankno);
         row.SetField("checkno", entity.checkno);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("amount", entity.amount);
         row.SetField("refer", entity.refer);
         row.SetField("ckrectype", entity.ckrectype);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("modulenm", entity.modulenm);
         row.SetField("clearfl", entity.clearfl);
         row.SetField("voidfl", entity.voidfl);
         row.SetField("mancheckfl", entity.mancheckfl);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("voiddt", entity.voiddt);
         row.SetField("balancedfl", entity.balancedfl);
         row.SetField("balanceddt", entity.balanceddt);
         row.SetField("cleardt", entity.cleardt);
         row.SetField("vendno", entity.vendno);
         row.SetField("statustype", entity.statustype);
         row.SetField("setno", entity.setno);
         row.SetField("empno", entity.empno);
         row.SetField("revfl", entity.revfl);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("urecno", entity.urecno);
         row.SetField("location", entity.location);
         row.SetField("transproc", entity.transproc);
         row.SetField("bacsref", entity.bacsref);
         row.SetField("pospaydttmz", entity.pospaydttmz);
         row.SetField("pospaytransno", entity.pospaytransno);
         row.SetField("cretRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, CretBase entity)
      {
         row.SetField("cretRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	