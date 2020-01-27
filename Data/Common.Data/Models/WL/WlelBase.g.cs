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
       
namespace Infor.Sxe.Common.Data.Models.WL
{
   /// <summary>
   /// Warehouse Logistics Line Information
   /// </summary>
   
   public partial class WlelBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Order Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string ordertype { get; set; }

      /// <summary>
      /// Order #
      /// </summary>
      [Key,Order]
      public int orderno { get; set; }

      /// <summary>
      /// 
      /// </summary>
      [Key,Order]
      public int ordersuf { get; set; }

      /// <summary>
      /// Line #
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Set #
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string setno { get; set; }

      /// <summary>
      /// Ship Prod
      /// </summary>
      [StringValidationAttribute]
      public string shipprod { get; set; }

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
      /// Status Type
      /// </summary>
      [StringValidationAttribute]
      public string statustype { get; set; }

      /// <summary>
      /// Spec/NS
      /// </summary>
      [StringValidationAttribute]
      public string specnstype { get; set; }

      /// <summary>
      /// Vendor Product
      /// </summary>
      [StringValidationAttribute]
      public string vendprod { get; set; }

      /// <summary>
      /// Stocking Qty
      /// </summary>
      public decimal stkqty { get; set; }

      /// <summary>
      /// Due Date
      /// </summary>
      public DateTime? duedt { get; set; }

      /// <summary>
      /// Return Order #
      /// </summary>
      public int retorderno { get; set; }

      /// <summary>
      /// retordersuf
      /// </summary>
      public int retordersuf { get; set; }

      /// <summary>
      /// Return Line #
      /// </summary>
      public int retlineno { get; set; }

      /// <summary>
      /// Return
      /// </summary>
      public bool returnfl { get; set; }

      /// <summary>
      /// Return Type
      /// </summary>
      [StringValidationAttribute]
      public string returnty { get; set; }

      /// <summary>
      /// MSDS Sheet #
      /// </summary>
      [StringValidationAttribute]
      public string msdssheetno { get; set; }

      /// <summary>
      /// RMA Order #
      /// </summary>
      public int orderaltno { get; set; }

      /// <summary>
      /// orderaltsuf
      /// </summary>
      public int orderaltsuf { get; set; }

      /// <summary>
      /// RMA Line #
      /// </summary>
      public int linealtno { get; set; }

      /// <summary>
      /// Qty Unavailable
      /// </summary>
      public decimal qtyunavail { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string proddesc { get; set; }

      /// <summary>
      /// UPC Number
      /// </summary>
      [StringValidationAttribute]
      public string upcno { get; set; }

      /// <summary>
      /// Receiver #
      /// </summary>
      [StringValidationAttribute]
      public string receiverno { get; set; }

      /// <summary>
      /// Stock Status
      /// </summary>
      [StringValidationAttribute]
      public string stkstatusty { get; set; }

      /// <summary>
      /// Line Type
      /// </summary>
      [StringValidationAttribute]
      public string linety { get; set; }

      /// <summary>
      /// Update Type
      /// </summary>
      [StringValidationAttribute]
      public string updtype { get; set; }

      /// <summary>
      /// WL Pick Type
      /// </summary>
      [StringValidationAttribute]
      public string wlpicktype { get; set; }

      /// <summary>
      /// Trans ID
      /// </summary>
      public decimal transid { get; set; }

      /// <summary>
      /// Error Msg
      /// </summary>
      [StringValidationAttribute]
      public string errormsg { get; set; }

      /// <summary>
      /// Reply
      /// </summary>
      [StringValidationAttribute]
      public string reply { get; set; }

      /// <summary>
      /// Credit Memo Reason
      /// </summary>
      [StringValidationAttribute]
      public string crreasonty { get; set; }

      /// <summary>
      /// Staging Type
      /// </summary>
      [StringValidationAttribute]
      public string stagingty { get; set; }

      /// <summary>
      /// Error #
      /// </summary>
      public int errorno { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Description 2
      /// </summary>
      [StringValidationAttribute]
      public string proddesc2 { get; set; }

      /// <summary>
      /// Lost Business
      /// </summary>
      [StringValidationAttribute]
      public string lostbusty { get; set; }

      /// <summary>
      /// Alt Whse
      /// </summary>
      [StringValidationAttribute]
      public string altwhse { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildWlelBaseFromRow<T>(DataRow row) where T:WlelBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.specnstype = row.IsNull("specnstype") ? string.Empty : row.Field<string>("specnstype");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.stkqty = row.IsNull("stkqty") ? decimal.Zero : row.Field<decimal>("stkqty");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.retorderno = row.IsNull("retorderno") ? 0 : row.Field<int>("retorderno");
         entity.retordersuf = row.IsNull("retordersuf") ? 0 : row.Field<int>("retordersuf");
         entity.retlineno = row.IsNull("retlineno") ? 0 : row.Field<int>("retlineno");
         entity.returnfl = row.Field<bool>("returnfl");
         entity.returnty = row.IsNull("returnty") ? string.Empty : row.Field<string>("returnty");
         entity.msdssheetno = row.IsNull("msdssheetno") ? string.Empty : row.Field<string>("msdssheetno");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderaltsuf = row.IsNull("orderaltsuf") ? 0 : row.Field<int>("orderaltsuf");
         entity.linealtno = row.IsNull("linealtno") ? 0 : row.Field<int>("linealtno");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.upcno = row.IsNull("upcno") ? string.Empty : row.Field<string>("upcno");
         entity.receiverno = row.IsNull("receiverno") ? string.Empty : row.Field<string>("receiverno");
         entity.stkstatusty = row.IsNull("stkstatusty") ? string.Empty : row.Field<string>("stkstatusty");
         entity.linety = row.IsNull("linety") ? string.Empty : row.Field<string>("linety");
         entity.updtype = row.IsNull("updtype") ? string.Empty : row.Field<string>("updtype");
         entity.setno = row.IsNull("setno") ? string.Empty : row.Field<string>("setno");
         entity.wlpicktype = row.IsNull("wlpicktype") ? string.Empty : row.Field<string>("wlpicktype");
         entity.transid = row.IsNull("transid") ? decimal.Zero : row.Field<decimal>("transid");
         entity.errormsg = row.IsNull("errormsg") ? string.Empty : row.Field<string>("errormsg");
         entity.reply = row.IsNull("reply") ? string.Empty : row.Field<string>("reply");
         entity.crreasonty = row.IsNull("crreasonty") ? string.Empty : row.Field<string>("crreasonty");
         entity.stagingty = row.IsNull("stagingty") ? string.Empty : row.Field<string>("stagingty");
         entity.errorno = row.IsNull("errorno") ? 0 : row.Field<int>("errorno");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.lostbusty = row.IsNull("lostbusty") ? string.Empty : row.Field<string>("lostbusty");
         entity.altwhse = row.IsNull("altwhse") ? string.Empty : row.Field<string>("altwhse");
         entity.rowID = row.Field<byte[]>("wlelRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWlelBase(ref DataRow row, WlelBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("whse", entity.whse);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("statustype", entity.statustype);
         row.SetField("specnstype", entity.specnstype);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("stkqty", entity.stkqty);
         row.SetField("duedt", entity.duedt);
         row.SetField("retorderno", entity.retorderno);
         row.SetField("retordersuf", entity.retordersuf);
         row.SetField("retlineno", entity.retlineno);
         row.SetField("returnfl", entity.returnfl);
         row.SetField("returnty", entity.returnty);
         row.SetField("msdssheetno", entity.msdssheetno);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderaltsuf", entity.orderaltsuf);
         row.SetField("linealtno", entity.linealtno);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("upcno", entity.upcno);
         row.SetField("receiverno", entity.receiverno);
         row.SetField("stkstatusty", entity.stkstatusty);
         row.SetField("linety", entity.linety);
         row.SetField("updtype", entity.updtype);
         row.SetField("setno", entity.setno);
         row.SetField("wlpicktype", entity.wlpicktype);
         row.SetField("transid", entity.transid);
         row.SetField("errormsg", entity.errormsg);
         row.SetField("reply", entity.reply);
         row.SetField("crreasonty", entity.crreasonty);
         row.SetField("stagingty", entity.stagingty);
         row.SetField("errorno", entity.errorno);
         row.SetField("transproc", entity.transproc);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("lostbusty", entity.lostbusty);
         row.SetField("altwhse", entity.altwhse);
         row.SetField("wlelRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, WlelBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("whse", entity.whse);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("setno", entity.setno);
         row.SetField("wlelRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	