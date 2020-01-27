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
       
namespace Infor.Sxe.Common.Data.Models.AR
{
   /// <summary>
   /// Lockbox Batch Header
   /// </summary>
   
   public partial class ArbcbBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Batch
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string batch { get; set; }

      /// <summary>
      /// Receive Date
      /// </summary>
      public DateTime? recvdt { get; set; }

      /// <summary>
      /// # Checks
      /// </summary>
      public int chkcnt { get; set; }

      /// <summary>
      /// Amount
      /// </summary>
      public decimal amount { get; set; }

      /// <summary>
      /// Ready?
      /// </summary>
      public bool rtpfl { get; set; }

      /// <summary>
      /// Transmission
      /// </summary>
      [StringValidationAttribute]
      public string transmission { get; set; }

      /// <summary>
      /// Operator
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Additional Data 1
      /// </summary>
      [StringValidationAttribute]
      public string adddata1 { get; set; }

      /// <summary>
      /// Additional Data 2
      /// </summary>
      [StringValidationAttribute]
      public string adddata2 { get; set; }

      /// <summary>
      /// Additional Data 3
      /// </summary>
      [StringValidationAttribute]
      public string adddata3 { get; set; }

      /// <summary>
      /// Additional Data 4
      /// </summary>
      [StringValidationAttribute]
      public string adddata4 { get; set; }

      /// <summary>
      /// Additional Data 5
      /// </summary>
      [StringValidationAttribute]
      public string adddata5 { get; set; }

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
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildArbcbBaseFromRow<T>(DataRow row) where T:ArbcbBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.batch = row.IsNull("batch") ? string.Empty : row.Field<string>("batch");
         entity.recvdt = row.Field<DateTime?>("recvdt");
         entity.chkcnt = row.IsNull("chkcnt") ? 0 : row.Field<int>("chkcnt");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.rtpfl = row.Field<bool>("rtpfl");
         entity.transmission = row.IsNull("transmission") ? string.Empty : row.Field<string>("transmission");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.adddata1 = row.IsNull("adddata1") ? string.Empty : row.Field<string>("adddata1");
         entity.adddata2 = row.IsNull("adddata2") ? string.Empty : row.Field<string>("adddata2");
         entity.adddata3 = row.IsNull("adddata3") ? string.Empty : row.Field<string>("adddata3");
         entity.adddata4 = row.IsNull("adddata4") ? string.Empty : row.Field<string>("adddata4");
         entity.adddata5 = row.IsNull("adddata5") ? string.Empty : row.Field<string>("adddata5");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
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
         entity.rowID = row.Field<byte[]>("arbcbRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArbcbBase(ref DataRow row, ArbcbBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("batch", entity.batch);
         row.SetField("recvdt", entity.recvdt);
         row.SetField("chkcnt", entity.chkcnt);
         row.SetField("amount", entity.amount);
         row.SetField("rtpfl", entity.rtpfl);
         row.SetField("transmission", entity.transmission);
         row.SetField("operinit", entity.operinit);
         row.SetField("adddata1", entity.adddata1);
         row.SetField("adddata2", entity.adddata2);
         row.SetField("adddata3", entity.adddata3);
         row.SetField("adddata4", entity.adddata4);
         row.SetField("adddata5", entity.adddata5);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
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
         row.SetField("arbcbRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, ArbcbBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("batch", entity.batch);
         row.SetField("arbcbRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	