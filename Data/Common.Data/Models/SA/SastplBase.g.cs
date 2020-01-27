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
       
namespace Infor.Sxe.Common.Data.Models.SA
{
   /// <summary>
   /// System Administration Setup Third Party Licenses
   /// </summary>
   
   public partial class SastplBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Application
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string appname { get; set; }

      /// <summary>
      /// Type
      /// </summary>
      [StringValidationAttribute]
      public string apptype { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      public bool statusfl { get; set; }

      /// <summary>
      /// Security #
      /// </summary>
      [StringValidationAttribute]
      public string secure { get; set; }

      /// <summary>
      /// Number of Users.
      /// </summary>
      public int numusers { get; set; }

      /// <summary>
      /// Number of Users Type
      /// </summary>
      [StringValidationAttribute]
      public string numusertype { get; set; }

      /// <summary>
      /// Licensed
      /// </summary>
      public DateTime? licensedt { get; set; }

      /// <summary>
      /// Expires
      /// </summary>
      public DateTime? licexpdt { get; set; }

      /// <summary>
      /// Last Used Date
      /// </summary>
      public DateTime? lastuseddt { get; set; }

      /// <summary>
      /// Last Used Time
      /// </summary>
      [StringValidationAttribute]
      public string lastusedtm { get; set; }

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
      /// Message Dt
      /// </summary>
      public DateTime? msgdt { get; set; }

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
      public static T BuildSastplBaseFromRow<T>(DataRow row) where T:SastplBase, new()
      {
         T entity = new T();
         entity.appname = row.IsNull("appname") ? string.Empty : row.Field<string>("appname");
         entity.apptype = row.IsNull("apptype") ? string.Empty : row.Field<string>("apptype");
         entity.statusfl = row.Field<bool>("statusfl");
         entity.secure = row.IsNull("secure") ? string.Empty : row.Field<string>("secure");
         entity.numusers = row.IsNull("numusers") ? 0 : row.Field<int>("numusers");
         entity.numusertype = row.IsNull("numusertype") ? string.Empty : row.Field<string>("numusertype");
         entity.licensedt = row.Field<DateTime?>("licensedt");
         entity.licexpdt = row.Field<DateTime?>("licexpdt");
         entity.lastuseddt = row.Field<DateTime?>("lastuseddt");
         entity.lastusedtm = row.IsNull("lastusedtm") ? string.Empty : row.Field<string>("lastusedtm");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.msgdt = row.Field<DateTime?>("msgdt");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("sastplRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSastplBase(ref DataRow row, SastplBase entity)
      {
         row.SetField("appname", entity.appname);
         row.SetField("apptype", entity.apptype);
         row.SetField("statusfl", entity.statusfl);
         row.SetField("secure", entity.secure);
         row.SetField("numusers", entity.numusers);
         row.SetField("numusertype", entity.numusertype);
         row.SetField("licensedt", entity.licensedt);
         row.SetField("licexpdt", entity.licexpdt);
         row.SetField("lastuseddt", entity.lastuseddt);
         row.SetField("lastusedtm", entity.lastusedtm);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("msgdt", entity.msgdt);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
         row.SetField("sastplRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SastplBase entity)
      {
         row.SetField("appname", entity.appname);
         row.SetField("sastplRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	