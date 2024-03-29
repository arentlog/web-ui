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
   /// Automatic Pricing
   /// </summary>
   
   public partial class PdsaBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Auto Pricing Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string autotype { get; set; }

      /// <summary>
      /// Begins At
      /// </summary>
      public int databegin1 { get; set; }
      public int databegin2 { get; set; }
      public int databegin3 { get; set; }
      public int databegin4 { get; set; }
      public int databegin5 { get; set; }
      public int databegin6 { get; set; }
      public int databegin7 { get; set; }
      public int databegin8 { get; set; }
      public int databegin9 { get; set; }
      public int databegin10 { get; set; }
      public int databegin11 { get; set; }
      public int databegin12 { get; set; }
      public int databegin13 { get; set; }
      public int databegin14 { get; set; }
      public int databegin15 { get; set; }
      public int databegin16 { get; set; }
      public int databegin17 { get; set; }
      public int databegin18 { get; set; }
      public int databegin19 { get; set; }
      public int databegin20 { get; set; }
      public int databegin21 { get; set; }
      public int databegin22 { get; set; }
      public int databegin23 { get; set; }
      public int databegin24 { get; set; }
      public int databegin25 { get; set; }
      public int databegin26 { get; set; }
      public int databegin27 { get; set; }
      public int databegin28 { get; set; }
      public int databegin29 { get; set; }
      public int databegin30 { get; set; }

      /// <summary>
      /// Length
      /// </summary>
      public int datalength1 { get; set; }
      public int datalength2 { get; set; }
      public int datalength3 { get; set; }
      public int datalength4 { get; set; }
      public int datalength5 { get; set; }
      public int datalength6 { get; set; }
      public int datalength7 { get; set; }
      public int datalength8 { get; set; }
      public int datalength9 { get; set; }
      public int datalength10 { get; set; }
      public int datalength11 { get; set; }
      public int datalength12 { get; set; }
      public int datalength13 { get; set; }
      public int datalength14 { get; set; }
      public int datalength15 { get; set; }
      public int datalength16 { get; set; }
      public int datalength17 { get; set; }
      public int datalength18 { get; set; }
      public int datalength19 { get; set; }
      public int datalength20 { get; set; }
      public int datalength21 { get; set; }
      public int datalength22 { get; set; }
      public int datalength23 { get; set; }
      public int datalength24 { get; set; }
      public int datalength25 { get; set; }
      public int datalength26 { get; set; }
      public int datalength27 { get; set; }
      public int datalength28 { get; set; }
      public int datalength29 { get; set; }
      public int datalength30 { get; set; }

      /// <summary>
      /// Use Product Xref
      /// </summary>
      public bool xrefprodfl { get; set; }

      /// <summary>
      /// Load Into Base
      /// </summary>
      [StringValidationAttribute]
      public string pricety { get; set; }

      /// <summary>
      /// Create PD Records
      /// </summary>
      public bool pdcreatefl { get; set; }

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
      /// Load Into Repl
      /// </summary>
      [StringValidationAttribute]
      public string costty { get; set; }

      /// <summary>
      /// Decimal Pt in File
      /// </summary>
      public bool decimalfl { get; set; }

      /// <summary>
      /// Load Into List
      /// </summary>
      [StringValidationAttribute]
      public string listty { get; set; }

      /// <summary>
      /// Load Into Stnd
      /// </summary>
      [StringValidationAttribute]
      public string stndty { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Product Line
      /// </summary>
      [StringValidationAttribute]
      public string prodline { get; set; }

      /// <summary>
      /// Category
      /// </summary>
      [StringValidationAttribute]
      public string prodcat { get; set; }

      /// <summary>
      /// Create New
      /// </summary>
      [StringValidationAttribute]
      public string addtype { get; set; }

      /// <summary>
      /// Price Type
      /// </summary>
      [StringValidationAttribute]
      public string pricetype { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// Multiplier
      /// </summary>
      [StringValidationAttribute]
      public string priceonty { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// Factor
      /// </summary>
      public decimal basefactor { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// Factor
      /// </summary>
      public decimal listfactor { get; set; }

      /// <summary>
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// Product Prefix
      /// </summary>
      [StringValidationAttribute]
      public string prodprefix { get; set; }

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
      public static T BuildPdsaBaseFromRow<T>(DataRow row) where T:PdsaBase, new()
      {
         T entity = new T();
         entity.autotype = row.IsNull("autotype") ? string.Empty : row.Field<string>("autotype");
         entity.databegin1 = row.IsNull("databegin1") ? 0 : row.Field<int>("databegin1");
         entity.databegin2 = row.IsNull("databegin2") ? 0 : row.Field<int>("databegin2");
         entity.databegin3 = row.IsNull("databegin3") ? 0 : row.Field<int>("databegin3");
         entity.databegin4 = row.IsNull("databegin4") ? 0 : row.Field<int>("databegin4");
         entity.databegin5 = row.IsNull("databegin5") ? 0 : row.Field<int>("databegin5");
         entity.databegin6 = row.IsNull("databegin6") ? 0 : row.Field<int>("databegin6");
         entity.databegin7 = row.IsNull("databegin7") ? 0 : row.Field<int>("databegin7");
         entity.databegin8 = row.IsNull("databegin8") ? 0 : row.Field<int>("databegin8");
         entity.databegin9 = row.IsNull("databegin9") ? 0 : row.Field<int>("databegin9");
         entity.databegin10 = row.IsNull("databegin10") ? 0 : row.Field<int>("databegin10");
         entity.databegin11 = row.IsNull("databegin11") ? 0 : row.Field<int>("databegin11");
         entity.databegin12 = row.IsNull("databegin12") ? 0 : row.Field<int>("databegin12");
         entity.databegin13 = row.IsNull("databegin13") ? 0 : row.Field<int>("databegin13");
         entity.databegin14 = row.IsNull("databegin14") ? 0 : row.Field<int>("databegin14");
         entity.databegin15 = row.IsNull("databegin15") ? 0 : row.Field<int>("databegin15");
         entity.databegin16 = row.IsNull("databegin16") ? 0 : row.Field<int>("databegin16");
         entity.databegin17 = row.IsNull("databegin17") ? 0 : row.Field<int>("databegin17");
         entity.databegin18 = row.IsNull("databegin18") ? 0 : row.Field<int>("databegin18");
         entity.databegin19 = row.IsNull("databegin19") ? 0 : row.Field<int>("databegin19");
         entity.databegin20 = row.IsNull("databegin20") ? 0 : row.Field<int>("databegin20");
         entity.databegin21 = row.IsNull("databegin21") ? 0 : row.Field<int>("databegin21");
         entity.databegin22 = row.IsNull("databegin22") ? 0 : row.Field<int>("databegin22");
         entity.databegin23 = row.IsNull("databegin23") ? 0 : row.Field<int>("databegin23");
         entity.databegin24 = row.IsNull("databegin24") ? 0 : row.Field<int>("databegin24");
         entity.databegin25 = row.IsNull("databegin25") ? 0 : row.Field<int>("databegin25");
         entity.databegin26 = row.IsNull("databegin26") ? 0 : row.Field<int>("databegin26");
         entity.databegin27 = row.IsNull("databegin27") ? 0 : row.Field<int>("databegin27");
         entity.databegin28 = row.IsNull("databegin28") ? 0 : row.Field<int>("databegin28");
         entity.databegin29 = row.IsNull("databegin29") ? 0 : row.Field<int>("databegin29");
         entity.databegin30 = row.IsNull("databegin30") ? 0 : row.Field<int>("databegin30");
         entity.datalength1 = row.IsNull("datalength1") ? 0 : row.Field<int>("datalength1");
         entity.datalength2 = row.IsNull("datalength2") ? 0 : row.Field<int>("datalength2");
         entity.datalength3 = row.IsNull("datalength3") ? 0 : row.Field<int>("datalength3");
         entity.datalength4 = row.IsNull("datalength4") ? 0 : row.Field<int>("datalength4");
         entity.datalength5 = row.IsNull("datalength5") ? 0 : row.Field<int>("datalength5");
         entity.datalength6 = row.IsNull("datalength6") ? 0 : row.Field<int>("datalength6");
         entity.datalength7 = row.IsNull("datalength7") ? 0 : row.Field<int>("datalength7");
         entity.datalength8 = row.IsNull("datalength8") ? 0 : row.Field<int>("datalength8");
         entity.datalength9 = row.IsNull("datalength9") ? 0 : row.Field<int>("datalength9");
         entity.datalength10 = row.IsNull("datalength10") ? 0 : row.Field<int>("datalength10");
         entity.datalength11 = row.IsNull("datalength11") ? 0 : row.Field<int>("datalength11");
         entity.datalength12 = row.IsNull("datalength12") ? 0 : row.Field<int>("datalength12");
         entity.datalength13 = row.IsNull("datalength13") ? 0 : row.Field<int>("datalength13");
         entity.datalength14 = row.IsNull("datalength14") ? 0 : row.Field<int>("datalength14");
         entity.datalength15 = row.IsNull("datalength15") ? 0 : row.Field<int>("datalength15");
         entity.datalength16 = row.IsNull("datalength16") ? 0 : row.Field<int>("datalength16");
         entity.datalength17 = row.IsNull("datalength17") ? 0 : row.Field<int>("datalength17");
         entity.datalength18 = row.IsNull("datalength18") ? 0 : row.Field<int>("datalength18");
         entity.datalength19 = row.IsNull("datalength19") ? 0 : row.Field<int>("datalength19");
         entity.datalength20 = row.IsNull("datalength20") ? 0 : row.Field<int>("datalength20");
         entity.datalength21 = row.IsNull("datalength21") ? 0 : row.Field<int>("datalength21");
         entity.datalength22 = row.IsNull("datalength22") ? 0 : row.Field<int>("datalength22");
         entity.datalength23 = row.IsNull("datalength23") ? 0 : row.Field<int>("datalength23");
         entity.datalength24 = row.IsNull("datalength24") ? 0 : row.Field<int>("datalength24");
         entity.datalength25 = row.IsNull("datalength25") ? 0 : row.Field<int>("datalength25");
         entity.datalength26 = row.IsNull("datalength26") ? 0 : row.Field<int>("datalength26");
         entity.datalength27 = row.IsNull("datalength27") ? 0 : row.Field<int>("datalength27");
         entity.datalength28 = row.IsNull("datalength28") ? 0 : row.Field<int>("datalength28");
         entity.datalength29 = row.IsNull("datalength29") ? 0 : row.Field<int>("datalength29");
         entity.datalength30 = row.IsNull("datalength30") ? 0 : row.Field<int>("datalength30");
         entity.xrefprodfl = row.Field<bool>("xrefprodfl");
         entity.pricety = row.IsNull("pricety") ? string.Empty : row.Field<string>("pricety");
         entity.pdcreatefl = row.Field<bool>("pdcreatefl");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.costty = row.IsNull("costty") ? string.Empty : row.Field<string>("costty");
         entity.decimalfl = row.Field<bool>("decimalfl");
         entity.listty = row.IsNull("listty") ? string.Empty : row.Field<string>("listty");
         entity.stndty = row.IsNull("stndty") ? string.Empty : row.Field<string>("stndty");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.addtype = row.IsNull("addtype") ? string.Empty : row.Field<string>("addtype");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.priceonty = row.IsNull("priceonty") ? string.Empty : row.Field<string>("priceonty");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.basefactor = row.IsNull("basefactor") ? decimal.Zero : row.Field<decimal>("basefactor");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.listfactor = row.IsNull("listfactor") ? decimal.Zero : row.Field<decimal>("listfactor");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.prodprefix = row.IsNull("prodprefix") ? string.Empty : row.Field<string>("prodprefix");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("pdsaRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsaBase(ref DataRow row, PdsaBase entity)
      {
         row.SetField("autotype", entity.autotype);
         row.SetField("databegin1", entity.databegin1);
         row.SetField("databegin2", entity.databegin2);
         row.SetField("databegin3", entity.databegin3);
         row.SetField("databegin4", entity.databegin4);
         row.SetField("databegin5", entity.databegin5);
         row.SetField("databegin6", entity.databegin6);
         row.SetField("databegin7", entity.databegin7);
         row.SetField("databegin8", entity.databegin8);
         row.SetField("databegin9", entity.databegin9);
         row.SetField("databegin10", entity.databegin10);
         row.SetField("databegin11", entity.databegin11);
         row.SetField("databegin12", entity.databegin12);
         row.SetField("databegin13", entity.databegin13);
         row.SetField("databegin14", entity.databegin14);
         row.SetField("databegin15", entity.databegin15);
         row.SetField("databegin16", entity.databegin16);
         row.SetField("databegin17", entity.databegin17);
         row.SetField("databegin18", entity.databegin18);
         row.SetField("databegin19", entity.databegin19);
         row.SetField("databegin20", entity.databegin20);
         row.SetField("databegin21", entity.databegin21);
         row.SetField("databegin22", entity.databegin22);
         row.SetField("databegin23", entity.databegin23);
         row.SetField("databegin24", entity.databegin24);
         row.SetField("databegin25", entity.databegin25);
         row.SetField("databegin26", entity.databegin26);
         row.SetField("databegin27", entity.databegin27);
         row.SetField("databegin28", entity.databegin28);
         row.SetField("databegin29", entity.databegin29);
         row.SetField("databegin30", entity.databegin30);
         row.SetField("datalength1", entity.datalength1);
         row.SetField("datalength2", entity.datalength2);
         row.SetField("datalength3", entity.datalength3);
         row.SetField("datalength4", entity.datalength4);
         row.SetField("datalength5", entity.datalength5);
         row.SetField("datalength6", entity.datalength6);
         row.SetField("datalength7", entity.datalength7);
         row.SetField("datalength8", entity.datalength8);
         row.SetField("datalength9", entity.datalength9);
         row.SetField("datalength10", entity.datalength10);
         row.SetField("datalength11", entity.datalength11);
         row.SetField("datalength12", entity.datalength12);
         row.SetField("datalength13", entity.datalength13);
         row.SetField("datalength14", entity.datalength14);
         row.SetField("datalength15", entity.datalength15);
         row.SetField("datalength16", entity.datalength16);
         row.SetField("datalength17", entity.datalength17);
         row.SetField("datalength18", entity.datalength18);
         row.SetField("datalength19", entity.datalength19);
         row.SetField("datalength20", entity.datalength20);
         row.SetField("datalength21", entity.datalength21);
         row.SetField("datalength22", entity.datalength22);
         row.SetField("datalength23", entity.datalength23);
         row.SetField("datalength24", entity.datalength24);
         row.SetField("datalength25", entity.datalength25);
         row.SetField("datalength26", entity.datalength26);
         row.SetField("datalength27", entity.datalength27);
         row.SetField("datalength28", entity.datalength28);
         row.SetField("datalength29", entity.datalength29);
         row.SetField("datalength30", entity.datalength30);
         row.SetField("xrefprodfl", entity.xrefprodfl);
         row.SetField("pricety", entity.pricety);
         row.SetField("pdcreatefl", entity.pdcreatefl);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("costty", entity.costty);
         row.SetField("decimalfl", entity.decimalfl);
         row.SetField("listty", entity.listty);
         row.SetField("stndty", entity.stndty);
         row.SetField("vendno", entity.vendno);
         row.SetField("prodline", entity.prodline);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("addtype", entity.addtype);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("user1", entity.user1);
         row.SetField("priceonty", entity.priceonty);
         row.SetField("user2", entity.user2);
         row.SetField("basefactor", entity.basefactor);
         row.SetField("user3", entity.user3);
         row.SetField("listfactor", entity.listfactor);
         row.SetField("user4", entity.user4);
         row.SetField("prodprefix", entity.prodprefix);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("transproc", entity.transproc);
         row.SetField("pdsaRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PdsaBase entity)
      {
         row.SetField("autotype", entity.autotype);
         row.SetField("pdsaRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	