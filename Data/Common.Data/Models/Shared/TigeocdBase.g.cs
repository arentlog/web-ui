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
       
namespace Infor.Sxe.Common.Data.Models.SHARED
{
   /// <summary>
   /// Tax Interface Geocodes
   /// </summary>
   
   public partial class TigeocdBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Street Address
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string addr { get; set; }

      /// <summary>
      /// City
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string city { get; set; }

      /// <summary>
      /// Geo Code
      /// </summary>
      [Key,Order]
      public int geocd { get; set; }

      /// <summary>
      /// Zip Code
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string zipcd { get; set; }

      /// <summary>
      /// Row Pointer
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string srcrowpointer { get; set; }

      /// <summary>
      /// Company #
      /// </summary>
      public int cono { get; set; }

      /// <summary>
      /// Country
      /// </summary>
      [StringValidationAttribute]
      public string countrycd { get; set; }

      /// <summary>
      /// County
      /// </summary>
      [StringValidationAttribute]
      public string county { get; set; }

      /// <summary>
      /// District
      /// </summary>
      [StringValidationAttribute]
      public string district { get; set; }

      /// <summary>
      /// Outside City Limit
      /// </summary>
      public bool outofcityfl { get; set; }

      /// <summary>
      /// State
      /// </summary>
      [StringValidationAttribute]
      public string state { get; set; }

      /// <summary>
      /// Error Code
      /// </summary>
      public int errorcd { get; set; }

      /// <summary>
      /// Error Text
      /// </summary>
      [StringValidationAttribute]
      public string errortxt { get; set; }

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
      /// District 2
      /// </summary>
      [StringValidationAttribute]
      public string district2 { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildTigeocdBaseFromRow<T>(DataRow row) where T:TigeocdBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.addr = row.IsNull("addr") ? string.Empty : row.Field<string>("addr");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.countrycd = row.IsNull("countrycd") ? string.Empty : row.Field<string>("countrycd");
         entity.county = row.IsNull("county") ? string.Empty : row.Field<string>("county");
         entity.district = row.IsNull("district") ? string.Empty : row.Field<string>("district");
         entity.geocd = row.IsNull("geocd") ? 0 : row.Field<int>("geocd");
         entity.outofcityfl = row.Field<bool>("outofcityfl");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.srcrowpointer = row.IsNull("srcrowpointer") ? string.Empty : row.Field<string>("srcrowpointer");
         entity.errorcd = row.IsNull("errorcd") ? 0 : row.Field<int>("errorcd");
         entity.errortxt = row.IsNull("errortxt") ? string.Empty : row.Field<string>("errortxt");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
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
         entity.district2 = row.IsNull("district2") ? string.Empty : row.Field<string>("district2");
         entity.rowID = row.Field<byte[]>("tigeocdRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromTigeocdBase(ref DataRow row, TigeocdBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("addr", entity.addr);
         row.SetField("city", entity.city);
         row.SetField("countrycd", entity.countrycd);
         row.SetField("county", entity.county);
         row.SetField("district", entity.district);
         row.SetField("geocd", entity.geocd);
         row.SetField("outofcityfl", entity.outofcityfl);
         row.SetField("state", entity.state);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("errorcd", entity.errorcd);
         row.SetField("errortxt", entity.errortxt);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
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
         row.SetField("district2", entity.district2);
         row.SetField("tigeocdRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, TigeocdBase entity)
      {
         row.SetField("addr", entity.addr);
         row.SetField("city", entity.city);
         row.SetField("geocd", entity.geocd);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("tigeocdRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	