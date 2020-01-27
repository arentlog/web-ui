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
   /// PD Rebates
   /// </summary>
   
   public partial class PdsrBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Rebate Level Key
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string levelkey { get; set; }

      /// <summary>
      /// Customer #
      /// </summary>
      [Key,Order]
      public decimal custno { get; set; }

      /// <summary>
      /// Begin Date
      /// </summary>
      [Key,Order]
      public DateTime? startdt { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      [Key,Order]
      public decimal vendno { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Rebate Code Id
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string codeid { get; set; }

      /// <summary>
      /// Reb SubType
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string rebsubty { get; set; }

      /// <summary>
      /// Ship To
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string shipto { get; set; }

      /// <summary>
      /// Customer Rebate Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string custrebty { get; set; }

      /// <summary>
      /// Rebate From/On
      /// </summary>
      [StringValidationAttribute]
      public string rebatecostty { get; set; }

      /// <summary>
      /// Rebate Amount
      /// </summary>
      public decimal rebateamt { get; set; }

      /// <summary>
      /// Share Flag
      /// </summary>
      public bool sharefl { get; set; }

      /// <summary>
      /// Share Percent
      /// </summary>
      public decimal sharepct { get; set; }

      /// <summary>
      /// Cap Sell Amount
      /// </summary>
      public decimal capsellamount { get; set; }

      /// <summary>
      /// Cap Sell Type
      /// </summary>
      public bool capselltypefl { get; set; }

      /// <summary>
      /// Manual Rebate
      /// </summary>
      public bool manualfl { get; set; }

      /// <summary>
      /// Contract Line Number
      /// </summary>
      public int contractlineno { get; set; }

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
      /// End Date
      /// </summary>
      public DateTime? enddt { get; set; }

      /// <summary>
      /// Record #
      /// </summary>
      public decimal rebrecno { get; set; }

      /// <summary>
      /// Reference
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

      /// <summary>
      /// Price Sheet
      /// </summary>
      [StringValidationAttribute]
      public string pricesheet { get; set; }

      /// <summary>
      /// Level
      /// </summary>
      public int levelcd { get; set; }

      /// <summary>
      /// Price Effective
      /// </summary>
      public DateTime? priceeffectivedate { get; set; }

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
      /// Ship Type
      /// </summary>
      [StringValidationAttribute]
      public string dropshipty { get; set; }

      /// <summary>
      /// Contract #
      /// </summary>
      [StringValidationAttribute]
      public string contractno { get; set; }

      /// <summary>
      /// Rebate Calc Type
      /// </summary>
      [StringValidationAttribute]
      public string rebcalcty { get; set; }

      /// <summary>
      /// Rebate Percent
      /// </summary>
      public decimal rebatepct { get; set; }

      /// <summary>
      /// Rebate For
      /// </summary>
      [StringValidationAttribute]
      public string rebatecd { get; set; }

      /// <summary>
      /// Rebate Down To
      /// </summary>
      [StringValidationAttribute]
      public string rebdowntoty { get; set; }

      /// <summary>
      /// Cap Rebate
      /// </summary>
      public bool caprebfl { get; set; }

      /// <summary>
      /// Margin Cost Type
      /// </summary>
      [StringValidationAttribute]
      public string margincostty { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Price Effective Date
      /// </summary>
      public DateTime? priceeffectivedateto { get; set; }

      /// <summary>
      /// Price Sheet
      /// </summary>
      [StringValidationAttribute]
      public string pricesheetto { get; set; }

      /// <summary>
      /// Contract Cost
      /// </summary>
      public bool contractcostfl { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildPdsrBaseFromRow<T>(DataRow row) where T:PdsrBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.levelkey = row.IsNull("levelkey") ? string.Empty : row.Field<string>("levelkey");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.rebatecostty = row.IsNull("rebatecostty") ? string.Empty : row.Field<string>("rebatecostty");
         entity.rebateamt = row.IsNull("rebateamt") ? decimal.Zero : row.Field<decimal>("rebateamt");
         entity.sharefl = row.Field<bool>("sharefl");
         entity.sharepct = row.IsNull("sharepct") ? decimal.Zero : row.Field<decimal>("sharepct");
         entity.capsellamount = row.IsNull("capsellamount") ? decimal.Zero : row.Field<decimal>("capsellamount");
         entity.capselltypefl = row.Field<bool>("capselltypefl");
         entity.manualfl = row.Field<bool>("manualfl");
         entity.contractlineno = row.IsNull("contractlineno") ? 0 : row.Field<int>("contractlineno");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.enddt = row.Field<DateTime?>("enddt");
         entity.rebrecno = row.IsNull("rebrecno") ? decimal.Zero : row.Field<decimal>("rebrecno");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.pricesheet = row.IsNull("pricesheet") ? string.Empty : row.Field<string>("pricesheet");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.codeid = row.IsNull("codeid") ? string.Empty : row.Field<string>("codeid");
         entity.levelcd = row.IsNull("levelcd") ? 0 : row.Field<int>("levelcd");
         entity.priceeffectivedate = row.Field<DateTime?>("priceeffectivedate");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.dropshipty = row.IsNull("dropshipty") ? string.Empty : row.Field<string>("dropshipty");
         entity.rebsubty = row.IsNull("rebsubty") ? string.Empty : row.Field<string>("rebsubty");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.rebcalcty = row.IsNull("rebcalcty") ? string.Empty : row.Field<string>("rebcalcty");
         entity.custrebty = row.IsNull("custrebty") ? string.Empty : row.Field<string>("custrebty");
         entity.rebatepct = row.IsNull("rebatepct") ? decimal.Zero : row.Field<decimal>("rebatepct");
         entity.rebatecd = row.IsNull("rebatecd") ? string.Empty : row.Field<string>("rebatecd");
         entity.rebdowntoty = row.IsNull("rebdowntoty") ? string.Empty : row.Field<string>("rebdowntoty");
         entity.caprebfl = row.Field<bool>("caprebfl");
         entity.margincostty = row.IsNull("margincostty") ? string.Empty : row.Field<string>("margincostty");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.priceeffectivedateto = row.Field<DateTime?>("priceeffectivedateto");
         entity.pricesheetto = row.IsNull("pricesheetto") ? string.Empty : row.Field<string>("pricesheetto");
         entity.contractcostfl = row.Field<bool>("contractcostfl");
         entity.rowID = row.Field<byte[]>("pdsrRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsrBase(ref DataRow row, PdsrBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("levelkey", entity.levelkey);
         row.SetField("custno", entity.custno);
         row.SetField("rebatecostty", entity.rebatecostty);
         row.SetField("rebateamt", entity.rebateamt);
         row.SetField("sharefl", entity.sharefl);
         row.SetField("sharepct", entity.sharepct);
         row.SetField("capsellamount", entity.capsellamount);
         row.SetField("capselltypefl", entity.capselltypefl);
         row.SetField("manualfl", entity.manualfl);
         row.SetField("contractlineno", entity.contractlineno);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("startdt", entity.startdt);
         row.SetField("enddt", entity.enddt);
         row.SetField("rebrecno", entity.rebrecno);
         row.SetField("refer", entity.refer);
         row.SetField("vendno", entity.vendno);
         row.SetField("pricesheet", entity.pricesheet);
         row.SetField("whse", entity.whse);
         row.SetField("codeid", entity.codeid);
         row.SetField("levelcd", entity.levelcd);
         row.SetField("priceeffectivedate", entity.priceeffectivedate);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("dropshipty", entity.dropshipty);
         row.SetField("rebsubty", entity.rebsubty);
         row.SetField("contractno", entity.contractno);
         row.SetField("shipto", entity.shipto);
         row.SetField("rebcalcty", entity.rebcalcty);
         row.SetField("custrebty", entity.custrebty);
         row.SetField("rebatepct", entity.rebatepct);
         row.SetField("rebatecd", entity.rebatecd);
         row.SetField("rebdowntoty", entity.rebdowntoty);
         row.SetField("caprebfl", entity.caprebfl);
         row.SetField("margincostty", entity.margincostty);
         row.SetField("transproc", entity.transproc);
         row.SetField("priceeffectivedateto", entity.priceeffectivedateto);
         row.SetField("pricesheetto", entity.pricesheetto);
         row.SetField("contractcostfl", entity.contractcostfl);
         row.SetField("pdsrRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PdsrBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("levelkey", entity.levelkey);
         row.SetField("custno", entity.custno);
         row.SetField("startdt", entity.startdt);
         row.SetField("vendno", entity.vendno);
         row.SetField("whse", entity.whse);
         row.SetField("codeid", entity.codeid);
         row.SetField("rebsubty", entity.rebsubty);
         row.SetField("shipto", entity.shipto);
         row.SetField("custrebty", entity.custrebty);
         row.SetField("pdsrRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	