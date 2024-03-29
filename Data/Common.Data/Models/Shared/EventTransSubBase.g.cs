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
   /// Event Manager - Event Transactions Additional Fields
   /// </summary>
   
   public partial class EventTransSubBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Event Name
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string eventname { get; set; }

      /// <summary>
      /// Event Date
      /// </summary>
      [Key,Order]
      public DateTime? eventdt { get; set; }

      /// <summary>
      /// Event Time
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string eventtm { get; set; }

      /// <summary>
      /// Record No
      /// </summary>
      [Key,Order]
      public decimal recordno { get; set; }

      /// <summary>
      /// Sequence #
      /// </summary>
      [Key,Order]
      public int subseqno { get; set; }

      /// <summary>
      /// Field Name
      /// </summary>
      [StringValidationAttribute]
      public string fieldname { get; set; }

      /// <summary>
      /// Field Label
      /// </summary>
      [StringValidationAttribute]
      public string fieldlabel { get; set; }

      /// <summary>
      /// Field Value
      /// </summary>
      [StringValidationAttribute]
      public string fieldvalue { get; set; }

      /// <summary>
      /// (P)rice Field,(C)ost Field, or Blank
      /// </summary>
      [StringValidationAttribute]
      public string pricecostty { get; set; }

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
      /// Last Changed By
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
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// user6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// user7
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
      public static T BuildEventTransSubBaseFromRow<T>(DataRow row) where T:EventTransSubBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.eventname = row.IsNull("eventname") ? string.Empty : row.Field<string>("eventname");
         entity.eventdt = row.Field<DateTime?>("eventdt");
         entity.eventtm = row.IsNull("eventtm") ? string.Empty : row.Field<string>("eventtm");
         entity.recordno = row.IsNull("recordno") ? decimal.Zero : row.Field<decimal>("recordno");
         entity.subseqno = row.IsNull("subseqno") ? 0 : row.Field<int>("subseqno");
         entity.fieldname = row.IsNull("fieldname") ? string.Empty : row.Field<string>("fieldname");
         entity.fieldlabel = row.IsNull("fieldlabel") ? string.Empty : row.Field<string>("fieldlabel");
         entity.fieldvalue = row.IsNull("fieldvalue") ? string.Empty : row.Field<string>("fieldvalue");
         entity.pricecostty = row.IsNull("pricecostty") ? string.Empty : row.Field<string>("pricecostty");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
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
         entity.rowID = row.Field<byte[]>("event_trans_subRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEventTransSubBase(ref DataRow row, EventTransSubBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("eventname", entity.eventname);
         row.SetField("eventdt", entity.eventdt);
         row.SetField("eventtm", entity.eventtm);
         row.SetField("recordno", entity.recordno);
         row.SetField("subseqno", entity.subseqno);
         row.SetField("fieldname", entity.fieldname);
         row.SetField("fieldlabel", entity.fieldlabel);
         row.SetField("fieldvalue", entity.fieldvalue);
         row.SetField("pricecostty", entity.pricecostty);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
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
         row.SetField("event_trans_subRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, EventTransSubBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("eventname", entity.eventname);
         row.SetField("eventdt", entity.eventdt);
         row.SetField("eventtm", entity.eventtm);
         row.SetField("recordno", entity.recordno);
         row.SetField("subseqno", entity.subseqno);
         row.SetField("event_trans_subRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	