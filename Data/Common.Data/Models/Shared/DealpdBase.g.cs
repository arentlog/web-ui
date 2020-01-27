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
   /// Price Discounting Deal Product Setup Detail
   /// </summary>
   
   public partial class DealpdBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Deal #
      /// </summary>
      [Key,Order]
      public int dealrecno { get; set; }

      /// <summary>
      /// Deal Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string pdtype { get; set; }

      /// <summary>
      /// Deal Entity
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string pdentity { get; set; }

      /// <summary>
      /// Variable
      /// </summary>
      [Key,Order]
      public bool varfl { get; set; }

      /// <summary>
      /// Price Method
      /// </summary>
      [StringValidationAttribute]
      public string pricemeth { get; set; }

      /// <summary>
      /// Price/Disc %
      /// </summary>
      public decimal pricedisc { get; set; }

      /// <summary>
      /// Quantity
      /// </summary>
      public decimal quantity { get; set; }

      /// <summary>
      /// Operator Initials
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
      public static T BuildDealpdBaseFromRow<T>(DataRow row) where T:DealpdBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.dealrecno = row.IsNull("dealrecno") ? 0 : row.Field<int>("dealrecno");
         entity.pdtype = row.IsNull("pdtype") ? string.Empty : row.Field<string>("pdtype");
         entity.pdentity = row.IsNull("pdentity") ? string.Empty : row.Field<string>("pdentity");
         entity.pricemeth = row.IsNull("pricemeth") ? string.Empty : row.Field<string>("pricemeth");
         entity.pricedisc = row.IsNull("pricedisc") ? decimal.Zero : row.Field<decimal>("pricedisc");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.varfl = row.Field<bool>("varfl");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
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
         entity.rowID = row.Field<byte[]>("dealpdRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromDealpdBase(ref DataRow row, DealpdBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("dealrecno", entity.dealrecno);
         row.SetField("pdtype", entity.pdtype);
         row.SetField("pdentity", entity.pdentity);
         row.SetField("pricemeth", entity.pricemeth);
         row.SetField("pricedisc", entity.pricedisc);
         row.SetField("quantity", entity.quantity);
         row.SetField("varfl", entity.varfl);
         row.SetField("operinit", entity.operinit);
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
         row.SetField("dealpdRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, DealpdBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("dealrecno", entity.dealrecno);
         row.SetField("pdtype", entity.pdtype);
         row.SetField("pdentity", entity.pdentity);
         row.SetField("varfl", entity.varfl);
         row.SetField("dealpdRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	