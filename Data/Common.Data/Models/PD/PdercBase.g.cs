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
   /// Rebate Header Claim File
   /// </summary>
   
   public partial class PdercBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Claim #
      /// </summary>
      [Key,Order]
      public int intclaimno { get; set; }

      /// <summary>
      /// Claim Date
      /// </summary>
      public DateTime? claimdt { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Customer #
      /// </summary>
      public decimal custno { get; set; }

      /// <summary>
      /// Claim Amount
      /// </summary>
      public decimal claimamt { get; set; }

      /// <summary>
      /// Reconciled Amt
      /// </summary>
      public decimal reconamt { get; set; }

      /// <summary>
      /// Claim Status
      /// </summary>
      public bool statusfl { get; set; }

      /// <summary>
      /// Rebate For
      /// </summary>
      [StringValidationAttribute]
      public string rebatecd { get; set; }

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
      /// Open Initials
      /// </summary>
      [StringValidationAttribute]
      public string openinit { get; set; }

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
      public static T BuildPdercBaseFromRow<T>(DataRow row) where T:PdercBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.intclaimno = row.IsNull("intclaimno") ? 0 : row.Field<int>("intclaimno");
         entity.claimdt = row.Field<DateTime?>("claimdt");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.claimamt = row.IsNull("claimamt") ? decimal.Zero : row.Field<decimal>("claimamt");
         entity.reconamt = row.IsNull("reconamt") ? decimal.Zero : row.Field<decimal>("reconamt");
         entity.statusfl = row.Field<bool>("statusfl");
         entity.rebatecd = row.IsNull("rebatecd") ? string.Empty : row.Field<string>("rebatecd");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.openinit = row.IsNull("openinit") ? string.Empty : row.Field<string>("openinit");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("pdercRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdercBase(ref DataRow row, PdercBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("intclaimno", entity.intclaimno);
         row.SetField("claimdt", entity.claimdt);
         row.SetField("vendno", entity.vendno);
         row.SetField("custno", entity.custno);
         row.SetField("claimamt", entity.claimamt);
         row.SetField("reconamt", entity.reconamt);
         row.SetField("statusfl", entity.statusfl);
         row.SetField("rebatecd", entity.rebatecd);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("openinit", entity.openinit);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("transproc", entity.transproc);
         row.SetField("pdercRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PdercBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("intclaimno", entity.intclaimno);
         row.SetField("pdercRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	