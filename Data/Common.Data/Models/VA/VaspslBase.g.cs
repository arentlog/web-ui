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
       
namespace Infor.Sxe.Common.Data.Models.VA
{
   /// <summary>
   /// Value Add Setup Product Defaults - Line Items
   /// </summary>
   
   public partial class VaspslBase: ModelBase, IUserFields
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
      public string shipprod { get; set; }

      /// <summary>
      /// Default Whse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Seq#
      /// </summary>
      [Key,Order]
      public int seqno { get; set; }

      /// <summary>
      /// Line#
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Non Stock
      /// </summary>
      [StringValidationAttribute]
      public string nonstockty { get; set; }

      /// <summary>
      /// Component Product
      /// </summary>
      [StringValidationAttribute]
      public string compprod { get; set; }

      /// <summary>
      /// Units
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// # Stk Units
      /// </summary>
      public decimal unitconv { get; set; }

      /// <summary>
      /// Qty Needed
      /// </summary>
      public decimal qtyneeded { get; set; }

      /// <summary>
      /// ARP Vendor #
      /// </summary>
      public decimal arpvendno { get; set; }

      /// <summary>
      /// ARP Line
      /// </summary>
      [StringValidationAttribute]
      public string arpprodline { get; set; }

      /// <summary>
      /// ARP Whse
      /// </summary>
      [StringValidationAttribute]
      public string arpwhse { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string proddesc { get; set; }

      /// <summary>
      /// Category
      /// </summary>
      [StringValidationAttribute]
      public string prodcat { get; set; }

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
      /// Description 2
      /// </summary>
      [StringValidationAttribute]
      public string proddesc2 { get; set; }

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
      /// Cost
      /// </summary>
      public decimal prodcost { get; set; }

      /// <summary>
      /// Labor Flat Rate Flag
      /// </summary>
      public bool laborflatrtfl { get; set; }

      /// <summary>
      /// Labor Type
      /// </summary>
      [StringValidationAttribute]
      public string labortype { get; set; }

      /// <summary>
      /// Labor Units
      /// </summary>
      public decimal laborunits { get; set; }

      /// <summary>
      /// Elapsed Time
      /// </summary>
      public int timeelapsed { get; set; }

      /// <summary>
      /// Actual Type
      /// </summary>
      [StringValidationAttribute]
      public string timeactty { get; set; }

      /// <summary>
      /// Qty Based On Total
      /// </summary>
      public bool qtybasetotfl { get; set; }

      /// <summary>
      /// Intermediate Product Flag
      /// </summary>
      public bool intermprodfl { get; set; }

      /// <summary>
      /// commentfl
      /// </summary>
      public bool commentfl { get; set; }

      /// <summary>
      /// Direct Order Flag
      /// </summary>
      public bool directfl { get; set; }

      /// <summary>
      /// Usage
      /// </summary>
      public bool usagefl { get; set; }

      /// <summary>
      /// Comment
      /// </summary>
      [StringValidationAttribute]
      public string timecomment { get; set; }

      /// <summary>
      /// Cost Over
      /// </summary>
      public bool costoverfl { get; set; }

      /// <summary>
      /// Cube
      /// </summary>
      public decimal cubes { get; set; }

      /// <summary>
      /// weight
      /// </summary>
      public decimal weight { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Variable Length Component
      /// </summary>
      public bool lgthcompfl { get; set; }

      /// <summary>
      /// Scrap Factor
      /// </summary>
      public decimal scrapfctr { get; set; }

      /// <summary>
      /// Maximum Labor Calc Qty
      /// </summary>
      public int maxlaborcalcqty { get; set; }

      /// <summary>
      /// Cutoff Type
      /// </summary>
      [StringValidationAttribute]
      public string cutoffty { get; set; }

      /// <summary>
      /// Lead Time
      /// </summary>
      public int leadtm { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildVaspslBaseFromRow<T>(DataRow row) where T:VaspslBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.compprod = row.IsNull("compprod") ? string.Empty : row.Field<string>("compprod");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.qtyneeded = row.IsNull("qtyneeded") ? decimal.Zero : row.Field<decimal>("qtyneeded");
         entity.arpvendno = row.IsNull("arpvendno") ? decimal.Zero : row.Field<decimal>("arpvendno");
         entity.arpprodline = row.IsNull("arpprodline") ? string.Empty : row.Field<string>("arpprodline");
         entity.arpwhse = row.IsNull("arpwhse") ? string.Empty : row.Field<string>("arpwhse");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.laborflatrtfl = row.Field<bool>("laborflatrtfl");
         entity.labortype = row.IsNull("labortype") ? string.Empty : row.Field<string>("labortype");
         entity.laborunits = row.IsNull("laborunits") ? decimal.Zero : row.Field<decimal>("laborunits");
         entity.timeelapsed = row.IsNull("timeelapsed") ? 0 : row.Field<int>("timeelapsed");
         entity.timeactty = row.IsNull("timeactty") ? string.Empty : row.Field<string>("timeactty");
         entity.qtybasetotfl = row.Field<bool>("qtybasetotfl");
         entity.intermprodfl = row.Field<bool>("intermprodfl");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.directfl = row.Field<bool>("directfl");
         entity.usagefl = row.Field<bool>("usagefl");
         entity.timecomment = row.IsNull("timecomment") ? string.Empty : row.Field<string>("timecomment");
         entity.costoverfl = row.Field<bool>("costoverfl");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.lgthcompfl = row.Field<bool>("lgthcompfl");
         entity.scrapfctr = row.IsNull("scrapfctr") ? decimal.Zero : row.Field<decimal>("scrapfctr");
         entity.maxlaborcalcqty = row.IsNull("maxlaborcalcqty") ? 0 : row.Field<int>("maxlaborcalcqty");
         entity.cutoffty = row.IsNull("cutoffty") ? string.Empty : row.Field<string>("cutoffty");
         entity.leadtm = row.IsNull("leadtm") ? 0 : row.Field<int>("leadtm");
         entity.rowID = row.Field<byte[]>("vaspslRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaspslBase(ref DataRow row, VaspslBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("whse", entity.whse);
         row.SetField("seqno", entity.seqno);
         row.SetField("lineno", entity.lineno);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("compprod", entity.compprod);
         row.SetField("unit", entity.unit);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("qtyneeded", entity.qtyneeded);
         row.SetField("arpvendno", entity.arpvendno);
         row.SetField("arpprodline", entity.arpprodline);
         row.SetField("arpwhse", entity.arpwhse);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("laborflatrtfl", entity.laborflatrtfl);
         row.SetField("labortype", entity.labortype);
         row.SetField("laborunits", entity.laborunits);
         row.SetField("timeelapsed", entity.timeelapsed);
         row.SetField("timeactty", entity.timeactty);
         row.SetField("qtybasetotfl", entity.qtybasetotfl);
         row.SetField("intermprodfl", entity.intermprodfl);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("directfl", entity.directfl);
         row.SetField("usagefl", entity.usagefl);
         row.SetField("timecomment", entity.timecomment);
         row.SetField("costoverfl", entity.costoverfl);
         row.SetField("cubes", entity.cubes);
         row.SetField("weight", entity.weight);
         row.SetField("transproc", entity.transproc);
         row.SetField("lgthcompfl", entity.lgthcompfl);
         row.SetField("scrapfctr", entity.scrapfctr);
         row.SetField("maxlaborcalcqty", entity.maxlaborcalcqty);
         row.SetField("cutoffty", entity.cutoffty);
         row.SetField("leadtm", entity.leadtm);
         row.SetField("vaspslRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, VaspslBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("whse", entity.whse);
         row.SetField("seqno", entity.seqno);
         row.SetField("lineno", entity.lineno);
         row.SetField("vaspslRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	