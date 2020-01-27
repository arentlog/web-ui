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
       
namespace Infor.Sxe.Common.Data.Models.PO
{
   /// <summary>
   /// PO Inventory Receipts Work File
   /// </summary>
   
   public partial class PoeiBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Jrnl #
      /// </summary>
      [Key,Order]
      public int jrnlno { get; set; }

      /// <summary>
      /// PO #
      /// </summary>
      [Key,Order]
      public int pono { get; set; }

      /// <summary>
      /// PO Suffix
      /// </summary>
      [Key,Order]
      public int posuf { get; set; }

      /// <summary>
      /// Line#
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Seq#
      /// </summary>
      public int seqno { get; set; }

      /// <summary>
      /// Product #
      /// </summary>
      [StringValidationAttribute]
      public string shipprod { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [StringValidationAttribute]
      public string reqprod { get; set; }

      /// <summary>
      /// Price
      /// </summary>
      public decimal price { get; set; }

      /// <summary>
      /// # SN/Lots
      /// </summary>
      public decimal nosnlots { get; set; }

      /// <summary>
      /// Rcv Qty
      /// </summary>
      public decimal qtyrcv { get; set; }

      /// <summary>
      /// Stk Qty Rcv
      /// </summary>
      public decimal stkqtyrcv { get; set; }

      /// <summary>
      /// Vendor Product
      /// </summary>
      [StringValidationAttribute]
      public string vendprod { get; set; }

      /// <summary>
      /// Each/All
      /// </summary>
      public bool eachfl { get; set; }

      /// <summary>
      /// Units
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// Unavailable
      /// </summary>
      public decimal qtyunavail { get; set; }

      /// <summary>
      /// Reason
      /// </summary>
      [StringValidationAttribute]
      public string reasunavty { get; set; }

      /// <summary>
      /// Wrnty
      /// </summary>
      [StringValidationAttribute]
      public string corewarrty { get; set; }

      /// <summary>
      /// Cancel
      /// </summary>
      public bool cancelfl { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Charge Qty
      /// </summary>
      public decimal chrgqty { get; set; }

      /// <summary>
      /// Non Stock
      /// </summary>
      [StringValidationAttribute]
      public string nonstockty { get; set; }

      /// <summary>
      /// Tally
      /// </summary>
      public bool tallyfl { get; set; }

      /// <summary>
      /// Extended Type
      /// </summary>
      [StringValidationAttribute]
      public string serlottype { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// Special Price/Cost
      /// </summary>
      [StringValidationAttribute]
      public string speccostty { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// Conversion Factor
      /// </summary>
      public decimal conv { get; set; }

      /// <summary>
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// Posted
      /// </summary>
      public bool postfl { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// Stock Adjustments
      /// </summary>
      public decimal stkadj { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// Assigned to Orders
      /// </summary>
      public decimal qtyassign { get; set; }

      /// <summary>
      /// User 7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// Whse Mgr
      /// </summary>
      public bool wmfl { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// WM Quantity Received
      /// </summary>
      public decimal wmqtyrcv { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// trackfl
      /// </summary>
      public bool trackfl { get; set; }

      /// <summary>
      /// Bin Loc
      /// </summary>
      [StringValidationAttribute]
      public string binloc1 { get; set; }
      [StringValidationAttribute]
      public string binloc2 { get; set; }

      /// <summary>
      /// UPC Identifier
      /// </summary>
      [StringValidationAttribute]
      public string upcid { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildPoeiBaseFromRow<T>(DataRow row) where T:PoeiBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.reqprod = row.IsNull("reqprod") ? string.Empty : row.Field<string>("reqprod");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.nosnlots = row.IsNull("nosnlots") ? decimal.Zero : row.Field<decimal>("nosnlots");
         entity.qtyrcv = row.IsNull("qtyrcv") ? decimal.Zero : row.Field<decimal>("qtyrcv");
         entity.stkqtyrcv = row.IsNull("stkqtyrcv") ? decimal.Zero : row.Field<decimal>("stkqtyrcv");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.eachfl = row.Field<bool>("eachfl");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.corewarrty = row.IsNull("corewarrty") ? string.Empty : row.Field<string>("corewarrty");
         entity.cancelfl = row.Field<bool>("cancelfl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.chrgqty = row.IsNull("chrgqty") ? decimal.Zero : row.Field<decimal>("chrgqty");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.tallyfl = row.Field<bool>("tallyfl");
         entity.serlottype = row.IsNull("serlottype") ? string.Empty : row.Field<string>("serlottype");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.speccostty = row.IsNull("speccostty") ? string.Empty : row.Field<string>("speccostty");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.conv = row.IsNull("conv") ? decimal.Zero : row.Field<decimal>("conv");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.postfl = row.Field<bool>("postfl");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.stkadj = row.IsNull("stkadj") ? decimal.Zero : row.Field<decimal>("stkadj");
         entity.user6 = row.Field<decimal?>("user6");
         entity.qtyassign = row.IsNull("qtyassign") ? decimal.Zero : row.Field<decimal>("qtyassign");
         entity.user7 = row.Field<decimal?>("user7");
         entity.wmfl = row.Field<bool>("wmfl");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.wmqtyrcv = row.IsNull("wmqtyrcv") ? decimal.Zero : row.Field<decimal>("wmqtyrcv");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.trackfl = row.Field<bool>("trackfl");
         entity.binloc1 = row.IsNull("binloc1") ? string.Empty : row.Field<string>("binloc1");
         entity.binloc2 = row.IsNull("binloc2") ? string.Empty : row.Field<string>("binloc2");
         entity.upcid = row.IsNull("upcid") ? string.Empty : row.Field<string>("upcid");
         entity.rowID = row.Field<byte[]>("poeiRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoeiBase(ref DataRow row, PoeiBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("seqno", entity.seqno);
         row.SetField("lineno", entity.lineno);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("reqprod", entity.reqprod);
         row.SetField("price", entity.price);
         row.SetField("nosnlots", entity.nosnlots);
         row.SetField("qtyrcv", entity.qtyrcv);
         row.SetField("stkqtyrcv", entity.stkqtyrcv);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("eachfl", entity.eachfl);
         row.SetField("unit", entity.unit);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("corewarrty", entity.corewarrty);
         row.SetField("cancelfl", entity.cancelfl);
         row.SetField("whse", entity.whse);
         row.SetField("chrgqty", entity.chrgqty);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("tallyfl", entity.tallyfl);
         row.SetField("serlottype", entity.serlottype);
         row.SetField("user1", entity.user1);
         row.SetField("speccostty", entity.speccostty);
         row.SetField("user2", entity.user2);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("user3", entity.user3);
         row.SetField("conv", entity.conv);
         row.SetField("user4", entity.user4);
         row.SetField("postfl", entity.postfl);
         row.SetField("user5", entity.user5);
         row.SetField("stkadj", entity.stkadj);
         row.SetField("user6", entity.user6);
         row.SetField("qtyassign", entity.qtyassign);
         row.SetField("user7", entity.user7);
         row.SetField("wmfl", entity.wmfl);
         row.SetField("user8", entity.user8);
         row.SetField("wmqtyrcv", entity.wmqtyrcv);
         row.SetField("user9", entity.user9);
         row.SetField("trackfl", entity.trackfl);
         row.SetField("binloc1", entity.binloc1);
         row.SetField("binloc2", entity.binloc2);
         row.SetField("upcid", entity.upcid);
         row.SetField("poeiRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PoeiBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("poeiRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	