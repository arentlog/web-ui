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
       
namespace Infor.Sxe.Common.Data.Models.BI
{
   /// <summary>
   /// Business Intelligence Gauge Setup
   /// </summary>
   
   public partial class BisgBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Group
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string kpigroup { get; set; }

      /// <summary>
      /// Gauge #
      /// </summary>
      [Key,Order]
      public int gaugeno { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Gauge Name
      /// </summary>
      [StringValidationAttribute]
      public string name { get; set; }

      /// <summary>
      /// Gauge Type
      /// </summary>
      [StringValidationAttribute]
      public string type { get; set; }

      /// <summary>
      /// Minimum Value
      /// </summary>
      public decimal minval { get; set; }

      /// <summary>
      /// Maximum Value
      /// </summary>
      public decimal maxval { get; set; }

      /// <summary>
      /// Low Value
      /// </summary>
      public decimal lowval { get; set; }

      /// <summary>
      /// High Value
      /// </summary>
      public decimal highval { get; set; }

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
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

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
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildBisgBaseFromRow<T>(DataRow row) where T:BisgBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.kpigroup = row.IsNull("kpigroup") ? string.Empty : row.Field<string>("kpigroup");
         entity.gaugeno = row.IsNull("gaugeno") ? 0 : row.Field<int>("gaugeno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.minval = row.IsNull("minval") ? decimal.Zero : row.Field<decimal>("minval");
         entity.maxval = row.IsNull("maxval") ? decimal.Zero : row.Field<decimal>("maxval");
         entity.lowval = row.IsNull("lowval") ? decimal.Zero : row.Field<decimal>("lowval");
         entity.highval = row.IsNull("highval") ? decimal.Zero : row.Field<decimal>("highval");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("bisgRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromBisgBase(ref DataRow row, BisgBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("kpigroup", entity.kpigroup);
         row.SetField("gaugeno", entity.gaugeno);
         row.SetField("whse", entity.whse);
         row.SetField("name", entity.name);
         row.SetField("type", entity.type);
         row.SetField("minval", entity.minval);
         row.SetField("maxval", entity.maxval);
         row.SetField("lowval", entity.lowval);
         row.SetField("highval", entity.highval);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("transproc", entity.transproc);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("bisgRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, BisgBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("kpigroup", entity.kpigroup);
         row.SetField("gaugeno", entity.gaugeno);
         row.SetField("whse", entity.whse);
         row.SetField("bisgRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	