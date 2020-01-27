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
       
namespace Infor.Sxe.Common.Data.Models.SW
{
   /// <summary>
   /// Service Warranty Setup Codes - Problem Fail Codes
   /// </summary>
   
   public partial class SwscpBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Problem Fail Code
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string probfailcd { get; set; }

      /// <summary>
      /// Vendor Number
      /// </summary>
      [Key,Order]
      public decimal vendno { get; set; }

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
      /// Classification
      /// </summary>
      [StringValidationAttribute]
      public string @class { get; set; }

      /// <summary>
      /// Problem Fail Text
      /// </summary>
      [StringValidationAttribute]
      public string probfailtxt { get; set; }

      /// <summary>
      /// Failure Text Required Flag
      /// </summary>
      public bool failtxtreqfl { get; set; }

      /// <summary>
      /// Failure Type
      /// </summary>
      [StringValidationAttribute]
      public string failtype { get; set; }

      /// <summary>
      /// Severity Code
      /// </summary>
      public decimal severitycd { get; set; }

      /// <summary>
      /// Manufacturer Repair Hours
      /// </summary>
      public int mfgrepairhrs { get; set; }

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
      public static T BuildSwscpBaseFromRow<T>(DataRow row) where T:SwscpBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
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
         entity.probfailcd = row.IsNull("probfailcd") ? string.Empty : row.Field<string>("probfailcd");
         entity.@class = row.IsNull("class") ? string.Empty : row.Field<string>("class");
         entity.probfailtxt = row.IsNull("probfailtxt") ? string.Empty : row.Field<string>("probfailtxt");
         entity.failtxtreqfl = row.Field<bool>("failtxtreqfl");
         entity.failtype = row.IsNull("failtype") ? string.Empty : row.Field<string>("failtype");
         entity.severitycd = row.IsNull("severitycd") ? decimal.Zero : row.Field<decimal>("severitycd");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.mfgrepairhrs = row.IsNull("mfgrepairhrs") ? 0 : row.Field<int>("mfgrepairhrs");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("swscpRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSwscpBase(ref DataRow row, SwscpBase entity)
      {
         row.SetField("cono", entity.cono);
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
         row.SetField("probfailcd", entity.probfailcd);
         row.SetField("class", entity.@class);
         row.SetField("probfailtxt", entity.probfailtxt);
         row.SetField("failtxtreqfl", entity.failtxtreqfl);
         row.SetField("failtype", entity.failtype);
         row.SetField("severitycd", entity.severitycd);
         row.SetField("vendno", entity.vendno);
         row.SetField("mfgrepairhrs", entity.mfgrepairhrs);
         row.SetField("transproc", entity.transproc);
         row.SetField("swscpRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SwscpBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("probfailcd", entity.probfailcd);
         row.SetField("vendno", entity.vendno);
         row.SetField("swscpRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	