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
       
namespace Infor.Sxe.Common.Data.Models.IC
{
   /// <summary>
   /// Low Usage Parameter Detail
   /// </summary>
   
   public partial class IcamldBase: ModelBase, IUserFields
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
      /// Vendor #
      /// </summary>
      [Key,Order]
      public decimal arpvendno { get; set; }

      /// <summary>
      /// Product Line
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string prodline { get; set; }

      /// <summary>
      /// Record Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string recordtype { get; set; }

      /// <summary>
      /// Value
      /// </summary>
      [Key,Order]
      public decimal urcvalue { get; set; }

      /// <summary>
      /// Order Method
      /// </summary>
      [StringValidationAttribute]
      public string ordcalcty { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      [StringValidationAttribute]
      public string statustype { get; set; }

      /// <summary>
      /// Minimum
      /// </summary>
      public int minval { get; set; }

      /// <summary>
      /// Maximum
      /// </summary>
      public int maxval { get; set; }

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
      public static T BuildIcamldBaseFromRow<T>(DataRow row) where T:IcamldBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.arpvendno = row.IsNull("arpvendno") ? decimal.Zero : row.Field<decimal>("arpvendno");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.urcvalue = row.IsNull("urcvalue") ? decimal.Zero : row.Field<decimal>("urcvalue");
         entity.ordcalcty = row.IsNull("ordcalcty") ? string.Empty : row.Field<string>("ordcalcty");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.minval = row.IsNull("minval") ? 0 : row.Field<int>("minval");
         entity.maxval = row.IsNull("maxval") ? 0 : row.Field<int>("maxval");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
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
         entity.rowID = row.Field<byte[]>("icamldRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamldBase(ref DataRow row, IcamldBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("whse", entity.whse);
         row.SetField("arpvendno", entity.arpvendno);
         row.SetField("prodline", entity.prodline);
         row.SetField("recordtype", entity.recordtype);
         row.SetField("urcvalue", entity.urcvalue);
         row.SetField("ordcalcty", entity.ordcalcty);
         row.SetField("statustype", entity.statustype);
         row.SetField("minval", entity.minval);
         row.SetField("maxval", entity.maxval);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
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
         row.SetField("icamldRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, IcamldBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("whse", entity.whse);
         row.SetField("arpvendno", entity.arpvendno);
         row.SetField("prodline", entity.prodline);
         row.SetField("recordtype", entity.recordtype);
         row.SetField("urcvalue", entity.urcvalue);
         row.SetField("icamldRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	