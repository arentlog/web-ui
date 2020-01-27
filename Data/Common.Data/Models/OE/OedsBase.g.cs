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
       
namespace Infor.Sxe.Common.Data.Models.OE
{
   /// <summary>
   /// Order Entry Direct Route Setup
   /// </summary>
   
   public partial class OedsBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Equipment Code
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string equipcd { get; set; }

      /// <summary>
      /// Default Whse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Delivery Start Time
      /// </summary>
      [StringValidationAttribute]
      public string dstarttm { get; set; }

      /// <summary>
      /// Delivery End Time
      /// </summary>
      [StringValidationAttribute]
      public string dendtm { get; set; }

      /// <summary>
      /// Fixed Time Minutes
      /// </summary>
      public int fixedtm { get; set; }

      /// <summary>
      /// Symbol
      /// </summary>
      public int symbol { get; set; }

      /// <summary>
      /// Size
      /// </summary>
      public int size { get; set; }

      /// <summary>
      /// Color
      /// </summary>
      public int dcolor { get; set; }

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
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// Unload Rate
      /// </summary>
      public decimal unloadrate { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildOedsBaseFromRow<T>(DataRow row) where T:OedsBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.equipcd = row.IsNull("equipcd") ? string.Empty : row.Field<string>("equipcd");
         entity.dstarttm = row.IsNull("dstarttm") ? string.Empty : row.Field<string>("dstarttm");
         entity.dendtm = row.IsNull("dendtm") ? string.Empty : row.Field<string>("dendtm");
         entity.fixedtm = row.IsNull("fixedtm") ? 0 : row.Field<int>("fixedtm");
         entity.symbol = row.IsNull("symbol") ? 0 : row.Field<int>("symbol");
         entity.size = row.IsNull("size") ? 0 : row.Field<int>("size");
         entity.dcolor = row.IsNull("dcolor") ? 0 : row.Field<int>("dcolor");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.unloadrate = row.IsNull("unloadrate") ? decimal.Zero : row.Field<decimal>("unloadrate");
         entity.rowID = row.Field<byte[]>("oedsRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOedsBase(ref DataRow row, OedsBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("equipcd", entity.equipcd);
         row.SetField("dstarttm", entity.dstarttm);
         row.SetField("dendtm", entity.dendtm);
         row.SetField("fixedtm", entity.fixedtm);
         row.SetField("symbol", entity.symbol);
         row.SetField("size", entity.size);
         row.SetField("dcolor", entity.dcolor);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
         row.SetField("user9", entity.user9);
         row.SetField("whse", entity.whse);
         row.SetField("unloadrate", entity.unloadrate);
         row.SetField("oedsRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, OedsBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("equipcd", entity.equipcd);
         row.SetField("whse", entity.whse);
         row.SetField("oedsRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	