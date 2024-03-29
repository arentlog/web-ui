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
       
namespace Infor.Sxe.Common.Data.Models.BP
{
   /// <summary>
   /// Bid Prep Vendor Quote Detail Line
   /// </summary>
   
   public partial class BpelvBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Bid Identifier
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string bpid { get; set; }

      /// <summary>
      /// Line #
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      [Key,Order]
      public decimal vendno { get; set; }

      /// <summary>
      /// Revision #
      /// </summary>
      [Key,Order]
      public int revno { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user9 { get; set; }

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
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Last Changed By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Lead Time
      /// </summary>
      public int leadtime { get; set; }

      /// <summary>
      /// Cost Formula
      /// </summary>
      public decimal cstform1 { get; set; }
      public decimal cstform2 { get; set; }
      public decimal cstform3 { get; set; }
      public decimal cstform4 { get; set; }
      public decimal cstform5 { get; set; }
      public decimal cstform6 { get; set; }
      public decimal cstform7 { get; set; }
      public decimal cstform8 { get; set; }
      public decimal cstform9 { get; set; }
      public decimal cstform10 { get; set; }
      public decimal cstform11 { get; set; }
      public decimal cstform12 { get; set; }
      public decimal cstform13 { get; set; }
      public decimal cstform14 { get; set; }
      public decimal cstform15 { get; set; }

      /// <summary>
      /// Vendor Quote
      /// </summary>
      [StringValidationAttribute]
      public string vendquote { get; set; }

      /// <summary>
      /// Quote Date
      /// </summary>
      public DateTime? quotedt { get; set; }

      /// <summary>
      /// Expire Date
      /// </summary>
      public DateTime? expiredt { get; set; }

      /// <summary>
      /// Vendor Disposition
      /// </summary>
      [StringValidationAttribute]
      public string linedisp { get; set; }

      /// <summary>
      /// Cost Formula Type
      /// </summary>
      [StringValidationAttribute]
      public string cstformty { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal cost { get; set; }

      /// <summary>
      /// Product Description
      /// </summary>
      [StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// G/L Cost
      /// </summary>
      public decimal prodcost { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

      /// <summary>
      /// Pricing Cost
      /// </summary>
      public decimal pdcost { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

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
      /// Vendor Product
      /// </summary>
      [StringValidationAttribute]
      public string vendorprod { get; set; }

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
      public static T BuildBpelvBaseFromRow<T>(DataRow row) where T:BpelvBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.bpid = row.IsNull("bpid") ? string.Empty : row.Field<string>("bpid");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.leadtime = row.IsNull("leadtime") ? 0 : row.Field<int>("leadtime");
         entity.cstform1 = row.IsNull("cstform1") ? decimal.Zero : row.Field<decimal>("cstform1");
         entity.cstform2 = row.IsNull("cstform2") ? decimal.Zero : row.Field<decimal>("cstform2");
         entity.cstform3 = row.IsNull("cstform3") ? decimal.Zero : row.Field<decimal>("cstform3");
         entity.cstform4 = row.IsNull("cstform4") ? decimal.Zero : row.Field<decimal>("cstform4");
         entity.cstform5 = row.IsNull("cstform5") ? decimal.Zero : row.Field<decimal>("cstform5");
         entity.cstform6 = row.IsNull("cstform6") ? decimal.Zero : row.Field<decimal>("cstform6");
         entity.cstform7 = row.IsNull("cstform7") ? decimal.Zero : row.Field<decimal>("cstform7");
         entity.cstform8 = row.IsNull("cstform8") ? decimal.Zero : row.Field<decimal>("cstform8");
         entity.cstform9 = row.IsNull("cstform9") ? decimal.Zero : row.Field<decimal>("cstform9");
         entity.cstform10 = row.IsNull("cstform10") ? decimal.Zero : row.Field<decimal>("cstform10");
         entity.cstform11 = row.IsNull("cstform11") ? decimal.Zero : row.Field<decimal>("cstform11");
         entity.cstform12 = row.IsNull("cstform12") ? decimal.Zero : row.Field<decimal>("cstform12");
         entity.cstform13 = row.IsNull("cstform13") ? decimal.Zero : row.Field<decimal>("cstform13");
         entity.cstform14 = row.IsNull("cstform14") ? decimal.Zero : row.Field<decimal>("cstform14");
         entity.cstform15 = row.IsNull("cstform15") ? decimal.Zero : row.Field<decimal>("cstform15");
         entity.vendquote = row.IsNull("vendquote") ? string.Empty : row.Field<string>("vendquote");
         entity.quotedt = row.Field<DateTime?>("quotedt");
         entity.expiredt = row.Field<DateTime?>("expiredt");
         entity.linedisp = row.IsNull("linedisp") ? string.Empty : row.Field<string>("linedisp");
         entity.cstformty = row.IsNull("cstformty") ? string.Empty : row.Field<string>("cstformty");
         entity.cost = row.IsNull("cost") ? decimal.Zero : row.Field<decimal>("cost");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.revno = row.IsNull("revno") ? 0 : row.Field<int>("revno");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.pdcost = row.IsNull("pdcost") ? decimal.Zero : row.Field<decimal>("pdcost");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.vendorprod = row.IsNull("vendorprod") ? string.Empty : row.Field<string>("vendorprod");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("bpelvRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromBpelvBase(ref DataRow row, BpelvBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("bpid", entity.bpid);
         row.SetField("user9", entity.user9);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("lineno", entity.lineno);
         row.SetField("vendno", entity.vendno);
         row.SetField("leadtime", entity.leadtime);
         row.SetField("cstform1", entity.cstform1);
         row.SetField("cstform2", entity.cstform2);
         row.SetField("cstform3", entity.cstform3);
         row.SetField("cstform4", entity.cstform4);
         row.SetField("cstform5", entity.cstform5);
         row.SetField("cstform6", entity.cstform6);
         row.SetField("cstform7", entity.cstform7);
         row.SetField("cstform8", entity.cstform8);
         row.SetField("cstform9", entity.cstform9);
         row.SetField("cstform10", entity.cstform10);
         row.SetField("cstform11", entity.cstform11);
         row.SetField("cstform12", entity.cstform12);
         row.SetField("cstform13", entity.cstform13);
         row.SetField("cstform14", entity.cstform14);
         row.SetField("cstform15", entity.cstform15);
         row.SetField("vendquote", entity.vendquote);
         row.SetField("quotedt", entity.quotedt);
         row.SetField("expiredt", entity.expiredt);
         row.SetField("linedisp", entity.linedisp);
         row.SetField("cstformty", entity.cstformty);
         row.SetField("cost", entity.cost);
         row.SetField("prod", entity.prod);
         row.SetField("user3", entity.user3);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("user5", entity.user5);
         row.SetField("revno", entity.revno);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("pdcost", entity.pdcost);
         row.SetField("user4", entity.user4);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("vendorprod", entity.vendorprod);
         row.SetField("transproc", entity.transproc);
         row.SetField("bpelvRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, BpelvBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("bpid", entity.bpid);
         row.SetField("lineno", entity.lineno);
         row.SetField("vendno", entity.vendno);
         row.SetField("revno", entity.revno);
         row.SetField("bpelvRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	