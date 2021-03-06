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
       
namespace Infor.Sxe.Common.Data.Models.WT
{
   /// <summary>
   /// WT RRAR Header
   /// </summary>
   
   public partial class WterahBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Report #
      /// </summary>
      [Key,Order]
      public int reportno { get; set; }

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
      /// Ship
      /// </summary>
      [StringValidationAttribute]
      public string shiptonm { get; set; }

      /// <summary>
      /// Ship Addr
      /// </summary>
      [StringValidationAttribute]
      public string shiptoaddr1 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr2 { get; set; }

      /// <summary>
      /// City
      /// </summary>
      [StringValidationAttribute]
      public string shiptocity { get; set; }

      /// <summary>
      /// shiptost
      /// </summary>
      [StringValidationAttribute]
      public string shiptost { get; set; }

      /// <summary>
      /// shiptozip
      /// </summary>
      [StringValidationAttribute]
      public string shiptozip { get; set; }

      /// <summary>
      /// Instructions
      /// </summary>
      [StringValidationAttribute]
      public string shipinstr { get; set; }

      /// <summary>
      /// Ref
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

      /// <summary>
      /// Due Dt
      /// </summary>
      public DateTime? duedt { get; set; }

      /// <summary>
      /// Ship Via
      /// </summary>
      [StringValidationAttribute]
      public string shipviaty { get; set; }

      /// <summary>
      /// Ignore Lead Time
      /// </summary>
      public bool ignoreltfl { get; set; }

      /// <summary>
      /// Line Items
      /// </summary>
      public decimal totlineamt { get; set; }

      /// <summary>
      /// Weight
      /// </summary>
      public decimal totweight { get; set; }

      /// <summary>
      /// Cube
      /// </summary>
      public decimal totcubes { get; set; }

      /// <summary>
      /// Qty Ordered
      /// </summary>
      public decimal totqtyord { get; set; }

      /// <summary>
      /// Type
      /// </summary>
      [StringValidationAttribute]
      public string transtype { get; set; }

      /// <summary>
      /// Operator
      /// </summary>
      [StringValidationAttribute]
      public string oper2 { get; set; }

      /// <summary>
      /// Store As
      /// </summary>
      [StringValidationAttribute]
      public string reportnm { get; set; }

      /// <summary>
      /// Next Line #
      /// </summary>
      public int nextlineno { get; set; }

      /// <summary>
      /// Co # To
      /// </summary>
      public int cono2 { get; set; }

      /// <summary>
      /// Req Ship
      /// </summary>
      public DateTime? reqshipdt { get; set; }

      /// <summary>
      /// From Whse
      /// </summary>
      [StringValidationAttribute]
      public string shipfmwhse { get; set; }

      /// <summary>
      /// Ship To Whse
      /// </summary>
      [StringValidationAttribute]
      public string shiptowhse { get; set; }

      /// <summary>
      /// Authorization
      /// </summary>
      public int wtauth { get; set; }

      /// <summary>
      /// Addon Amt
      /// </summary>
      public decimal addonamt1 { get; set; }
      public decimal addonamt2 { get; set; }

      /// <summary>
      /// Addon Type
      /// </summary>
      [StringValidationAttribute]
      public string addontype1 { get; set; }
      [StringValidationAttribute]
      public string addontype2 { get; set; }

      /// <summary>
      /// Push?
      /// </summary>
      public bool pushfl { get; set; }

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
      /// Ready to Merge
      /// </summary>
      public bool mergefl { get; set; }

      /// <summary>
      /// Rush
      /// </summary>
      public bool rushfl { get; set; }

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
      /// Ship Addr
      /// </summary>
      [StringValidationAttribute]
      public string shiptoaddr3 { get; set; }

      /// <summary>
      /// Total Superseded Products
      /// </summary>
      public int totsuper { get; set; }

      /// <summary>
      /// Auto Merge Flag
      /// </summary>
      public bool automrgfl { get; set; }

      /// <summary>
      /// Reason Code
      /// </summary>
      [StringValidationAttribute]
      public string reasoncode { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }


      /// <summary>
      /// string
      /// </summary>
      public string CompleteAddress { get { return this.shiptoaddr1 + "," + this.shiptocity + "," + this.shiptost + "," + this.shiptozip; } }


      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildWterahBaseFromRow<T>(DataRow row) where T:WterahBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.shiptonm = row.IsNull("shiptonm") ? string.Empty : row.Field<string>("shiptonm");
         entity.shiptoaddr1 = row.IsNull("shiptoaddr1") ? string.Empty : row.Field<string>("shiptoaddr1");
         entity.shiptoaddr2 = row.IsNull("shiptoaddr2") ? string.Empty : row.Field<string>("shiptoaddr2");
         entity.shiptocity = row.IsNull("shiptocity") ? string.Empty : row.Field<string>("shiptocity");
         entity.shiptost = row.IsNull("shiptost") ? string.Empty : row.Field<string>("shiptost");
         entity.shiptozip = row.IsNull("shiptozip") ? string.Empty : row.Field<string>("shiptozip");
         entity.shipinstr = row.IsNull("shipinstr") ? string.Empty : row.Field<string>("shipinstr");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.ignoreltfl = row.Field<bool>("ignoreltfl");
         entity.totlineamt = row.IsNull("totlineamt") ? decimal.Zero : row.Field<decimal>("totlineamt");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.totcubes = row.IsNull("totcubes") ? decimal.Zero : row.Field<decimal>("totcubes");
         entity.totqtyord = row.IsNull("totqtyord") ? decimal.Zero : row.Field<decimal>("totqtyord");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.oper2 = row.IsNull("oper2") ? string.Empty : row.Field<string>("oper2");
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.nextlineno = row.IsNull("nextlineno") ? 0 : row.Field<int>("nextlineno");
         entity.cono2 = row.IsNull("cono2") ? 0 : row.Field<int>("cono2");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.shipfmwhse = row.IsNull("shipfmwhse") ? string.Empty : row.Field<string>("shipfmwhse");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.wtauth = row.IsNull("wtauth") ? 0 : row.Field<int>("wtauth");
         entity.addonamt1 = row.IsNull("addonamt1") ? decimal.Zero : row.Field<decimal>("addonamt1");
         entity.addonamt2 = row.IsNull("addonamt2") ? decimal.Zero : row.Field<decimal>("addonamt2");
         entity.addontype1 = row.IsNull("addontype1") ? string.Empty : row.Field<string>("addontype1");
         entity.addontype2 = row.IsNull("addontype2") ? string.Empty : row.Field<string>("addontype2");
         entity.pushfl = row.Field<bool>("pushfl");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.mergefl = row.Field<bool>("mergefl");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.shiptoaddr3 = row.IsNull("shiptoaddr3") ? string.Empty : row.Field<string>("shiptoaddr3");
         entity.totsuper = row.IsNull("totsuper") ? 0 : row.Field<int>("totsuper");
         entity.automrgfl = row.Field<bool>("automrgfl");
         entity.reasoncode = row.IsNull("reasoncode") ? string.Empty : row.Field<string>("reasoncode");
         entity.rowID = row.Field<byte[]>("wterahRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWterahBase(ref DataRow row, WterahBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("reportno", entity.reportno);
         row.SetField("shiptonm", entity.shiptonm);
         row.SetField("shiptoaddr1", entity.shiptoaddr1);
         row.SetField("shiptoaddr2", entity.shiptoaddr2);
         row.SetField("shiptocity", entity.shiptocity);
         row.SetField("shiptost", entity.shiptost);
         row.SetField("shiptozip", entity.shiptozip);
         row.SetField("shipinstr", entity.shipinstr);
         row.SetField("refer", entity.refer);
         row.SetField("duedt", entity.duedt);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("ignoreltfl", entity.ignoreltfl);
         row.SetField("totlineamt", entity.totlineamt);
         row.SetField("totweight", entity.totweight);
         row.SetField("totcubes", entity.totcubes);
         row.SetField("totqtyord", entity.totqtyord);
         row.SetField("transtype", entity.transtype);
         row.SetField("oper2", entity.oper2);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("nextlineno", entity.nextlineno);
         row.SetField("cono2", entity.cono2);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("shipfmwhse", entity.shipfmwhse);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("wtauth", entity.wtauth);
         row.SetField("addonamt1", entity.addonamt1);
         row.SetField("addonamt2", entity.addonamt2);
         row.SetField("addontype1", entity.addontype1);
         row.SetField("addontype2", entity.addontype2);
         row.SetField("pushfl", entity.pushfl);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("mergefl", entity.mergefl);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("transproc", entity.transproc);
         row.SetField("shiptoaddr3", entity.shiptoaddr3);
         row.SetField("totsuper", entity.totsuper);
         row.SetField("automrgfl", entity.automrgfl);
         row.SetField("reasoncode", entity.reasoncode);
         row.SetField("wterahRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, WterahBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("reportno", entity.reportno);
         row.SetField("wterahRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	