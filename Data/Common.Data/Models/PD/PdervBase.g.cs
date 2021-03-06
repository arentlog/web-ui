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
       
namespace Infor.Sxe.Common.Data.Models.PD
{
   /// <summary>
   /// Rebate Header Claim Sequence Receipt File
   /// </summary>
   
   public partial class PdervBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Seq#
      /// </summary>
      [Key,Order]
      public int claimseqno { get; set; }

      /// <summary>
      /// Claim #
      /// </summary>
      [Key,Order]
      public int intclaimno { get; set; }

      /// <summary>
      /// Vendor Invoice #
      /// </summary>
      [StringValidationAttribute]
      public string apinvno { get; set; }

      /// <summary>
      /// Journal #
      /// </summary>
      public int jrnlno { get; set; }

      /// <summary>
      /// Set #
      /// </summary>
      public int setno { get; set; }

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
      /// Division #
      /// </summary>
      public int divno { get; set; }

      /// <summary>
      /// Receipt Dt
      /// </summary>
      public DateTime? receiptdt { get; set; }

      /// <summary>
      /// Post Date
      /// </summary>
      public DateTime? postdt { get; set; }

      /// <summary>
      /// Rcv Amount
      /// </summary>
      public decimal receiptamt { get; set; }

      /// <summary>
      /// sourcepros
      /// </summary>
      [StringValidationAttribute]
      public string sourcepros { get; set; }

      /// <summary>
      /// Update Type
      /// </summary>
      [StringValidationAttribute]
      public string srcupdtty { get; set; }

      /// <summary>
      /// Ref
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

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
      /// Status
      /// </summary>
      [StringValidationAttribute]
      public string statustype { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildPdervBaseFromRow<T>(DataRow row) where T:PdervBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.apinvno = row.IsNull("apinvno") ? string.Empty : row.Field<string>("apinvno");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.divno = row.IsNull("divno") ? 0 : row.Field<int>("divno");
         entity.receiptdt = row.Field<DateTime?>("receiptdt");
         entity.postdt = row.Field<DateTime?>("postdt");
         entity.claimseqno = row.IsNull("claimseqno") ? 0 : row.Field<int>("claimseqno");
         entity.receiptamt = row.IsNull("receiptamt") ? decimal.Zero : row.Field<decimal>("receiptamt");
         entity.intclaimno = row.IsNull("intclaimno") ? 0 : row.Field<int>("intclaimno");
         entity.sourcepros = row.IsNull("sourcepros") ? string.Empty : row.Field<string>("sourcepros");
         entity.srcupdtty = row.IsNull("srcupdtty") ? string.Empty : row.Field<string>("srcupdtty");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.rowID = row.Field<byte[]>("pdervRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdervBase(ref DataRow row, PdervBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("apinvno", entity.apinvno);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("divno", entity.divno);
         row.SetField("receiptdt", entity.receiptdt);
         row.SetField("postdt", entity.postdt);
         row.SetField("claimseqno", entity.claimseqno);
         row.SetField("receiptamt", entity.receiptamt);
         row.SetField("intclaimno", entity.intclaimno);
         row.SetField("sourcepros", entity.sourcepros);
         row.SetField("srcupdtty", entity.srcupdtty);
         row.SetField("refer", entity.refer);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("statustype", entity.statustype);
         row.SetField("vendno", entity.vendno);
         row.SetField("transproc", entity.transproc);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("pdervRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PdervBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("claimseqno", entity.claimseqno);
         row.SetField("intclaimno", entity.intclaimno);
         row.SetField("pdervRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	