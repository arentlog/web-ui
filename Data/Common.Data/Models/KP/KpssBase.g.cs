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
       
namespace Infor.Sxe.Common.Data.Models.KP
{
   /// <summary>
   /// Kit Production - Setup Substitutes
   /// </summary>
   
   public partial class KpssBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Seq #
      /// </summary>
      [Key,Order]
      public int seqno { get; set; }

      /// <summary>
      /// Component
      /// </summary>
      [StringValidationAttribute]
      public string comprod { get; set; }

      /// <summary>
      /// Qty Needed
      /// </summary>
      public decimal qtyneeded { get; set; }

      /// <summary>
      /// Variable Quantity
      /// </summary>
      public bool variablefl { get; set; }

      /// <summary>
      /// Substitute Product
      /// </summary>
      public bool subfl { get; set; }

      /// <summary>
      /// Reference
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

      /// <summary>
      /// transdt
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// transtm
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// operinit
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Stocking Units
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// Roll-Up Type
      /// </summary>
      [StringValidationAttribute]
      public string kitrollty { get; set; }

      /// <summary>
      /// B/O
      /// </summary>
      [StringValidationAttribute]
      public string compboty { get; set; }

      /// <summary>
      /// From List
      /// </summary>
      public bool sublistfl { get; set; }

      /// <summary>
      /// One Only
      /// </summary>
      public bool oneonlyfl { get; set; }

      /// <summary>
      /// Print
      /// </summary>
      public bool printfl { get; set; }

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
      public static T BuildKpssBaseFromRow<T>(DataRow row) where T:KpssBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.comprod = row.IsNull("comprod") ? string.Empty : row.Field<string>("comprod");
         entity.qtyneeded = row.IsNull("qtyneeded") ? decimal.Zero : row.Field<decimal>("qtyneeded");
         entity.variablefl = row.Field<bool>("variablefl");
         entity.subfl = row.Field<bool>("subfl");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.kitrollty = row.IsNull("kitrollty") ? string.Empty : row.Field<string>("kitrollty");
         entity.compboty = row.IsNull("compboty") ? string.Empty : row.Field<string>("compboty");
         entity.sublistfl = row.Field<bool>("sublistfl");
         entity.oneonlyfl = row.Field<bool>("oneonlyfl");
         entity.printfl = row.Field<bool>("printfl");
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
         entity.rowID = row.Field<byte[]>("kpssRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKpssBase(ref DataRow row, KpssBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("prod", entity.prod);
         row.SetField("seqno", entity.seqno);
         row.SetField("comprod", entity.comprod);
         row.SetField("qtyneeded", entity.qtyneeded);
         row.SetField("variablefl", entity.variablefl);
         row.SetField("subfl", entity.subfl);
         row.SetField("refer", entity.refer);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("unit", entity.unit);
         row.SetField("kitrollty", entity.kitrollty);
         row.SetField("compboty", entity.compboty);
         row.SetField("sublistfl", entity.sublistfl);
         row.SetField("oneonlyfl", entity.oneonlyfl);
         row.SetField("printfl", entity.printfl);
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
         row.SetField("kpssRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, KpssBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("prod", entity.prod);
         row.SetField("seqno", entity.seqno);
         row.SetField("kpssRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	