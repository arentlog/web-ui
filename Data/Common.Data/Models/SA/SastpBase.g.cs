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
   /// Credit Card Processor Master File 
   /// </summary>
   
   public partial class SastpBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Processor
      /// </summary>
      [Key,Order]
      public int processno { get; set; }

      /// <summary>
      /// Name
      /// </summary>
      [StringValidationAttribute]
      public string name { get; set; }

      /// <summary>
      /// File Prefix
      /// </summary>
      [StringValidationAttribute]
      public string prefix { get; set; }

      /// <summary>
      /// Temporary Suffix
      /// </summary>
      [StringValidationAttribute]
      public string tempsfx { get; set; }

      /// <summary>
      /// Request Suffix
      /// </summary>
      [StringValidationAttribute]
      public string reqsfx { get; set; }

      /// <summary>
      /// Answer Suffix
      /// </summary>
      [StringValidationAttribute]
      public string anssfx { get; set; }

      /// <summary>
      /// Backup Suffix
      /// </summary>
      [StringValidationAttribute]
      public string bkusfx { get; set; }

      /// <summary>
      /// Data Directory
      /// </summary>
      [StringValidationAttribute]
      public string directory { get; set; }

      /// <summary>
      /// Unix Script
      /// </summary>
      [StringValidationAttribute]
      public string unixrun { get; set; }

      /// <summary>
      /// Batch Delay Minutes
      /// </summary>
      public int delay { get; set; }

      /// <summary>
      /// Timeout Seconds
      /// </summary>
      public int timeout { get; set; }

      /// <summary>
      /// Preauthorization Code
      /// </summary>
      [StringValidationAttribute]
      public string prauthcd { get; set; }

      /// <summary>
      /// Sale Code
      /// </summary>
      [StringValidationAttribute]
      public string salecd { get; set; }

      /// <summary>
      /// Force Sale Code
      /// </summary>
      [StringValidationAttribute]
      public string forcecd { get; set; }

      /// <summary>
      /// Return Code
      /// </summary>
      [StringValidationAttribute]
      public string retncd { get; set; }

      /// <summary>
      /// Settlement Code
      /// </summary>
      [StringValidationAttribute]
      public string setlcd { get; set; }

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
      /// Web Authorization
      /// </summary>
      public bool webauthfl { get; set; }

      /// <summary>
      /// Number of User Lic
      /// </summary>
      public int numusers { get; set; }

      /// <summary>
      /// Last User
      /// </summary>
      public int lastuser { get; set; }

      /// <summary>
      /// Check Code - DL
      /// </summary>
      [StringValidationAttribute]
      public string chkdlcd { get; set; }

      /// <summary>
      /// Check Code - Acct
      /// </summary>
      [StringValidationAttribute]
      public string chkactcd { get; set; }

      /// <summary>
      /// Check Code - Other
      /// </summary>
      [StringValidationAttribute]
      public string chkothcd { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Purchase Level
      /// </summary>
      public int purlevelno { get; set; }

      /// <summary>
      /// WebAuth Socket IP
      /// </summary>
      [StringValidationAttribute]
      public string ipaddress { get; set; }

      /// <summary>
      /// WebAuth Port
      /// </summary>
      [StringValidationAttribute]
      public string portnum { get; set; }

      /// <summary>
      /// Processor Type
      /// </summary>
      [StringValidationAttribute]
      public string processortype { get; set; }

      /// <summary>
      /// Processor Host Site
      /// </summary>
      [StringValidationAttribute]
      public string processorhostsite { get; set; }

      /// <summary>
      /// Processor Host Port
      /// </summary>
      [StringValidationAttribute]
      public string processorhostport { get; set; }

      /// <summary>
      /// Processor Partner ID
      /// </summary>
      [StringValidationAttribute]
      public string processorpartnerid { get; set; }

      /// <summary>
      /// Processor Vendor ID
      /// </summary>
      [StringValidationAttribute]
      public string processorvendorid { get; set; }

      /// <summary>
      /// Processor User ID
      /// </summary>
      [StringValidationAttribute]
      public string processoruserid { get; set; }

      /// <summary>
      /// Processor User Password
      /// </summary>
      [StringValidationAttribute]
      public string processoruserpw { get; set; }

      /// <summary>
      /// Flat File Encrypt
      /// </summary>
      public bool flatfileencrypt { get; set; }

      /// <summary>
      /// Calling URL
      /// </summary>
      [StringValidationAttribute]
      public string callingURL { get; set; }

      /// <summary>
      /// ResponseURL
      /// </summary>
      [StringValidationAttribute]
      public string responseURL { get; set; }

      /// <summary>
      /// Calling URL H5
      /// </summary>
      [StringValidationAttribute]
      public string callingURLH5 { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSastpBaseFromRow<T>(DataRow row) where T:SastpBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.processno = row.IsNull("processno") ? 0 : row.Field<int>("processno");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.prefix = row.IsNull("prefix") ? string.Empty : row.Field<string>("prefix");
         entity.tempsfx = row.IsNull("tempsfx") ? string.Empty : row.Field<string>("tempsfx");
         entity.reqsfx = row.IsNull("reqsfx") ? string.Empty : row.Field<string>("reqsfx");
         entity.anssfx = row.IsNull("anssfx") ? string.Empty : row.Field<string>("anssfx");
         entity.bkusfx = row.IsNull("bkusfx") ? string.Empty : row.Field<string>("bkusfx");
         entity.directory = row.IsNull("directory") ? string.Empty : row.Field<string>("directory");
         entity.unixrun = row.IsNull("unixrun") ? string.Empty : row.Field<string>("unixrun");
         entity.delay = row.IsNull("delay") ? 0 : row.Field<int>("delay");
         entity.timeout = row.IsNull("timeout") ? 0 : row.Field<int>("timeout");
         entity.prauthcd = row.IsNull("prauthcd") ? string.Empty : row.Field<string>("prauthcd");
         entity.salecd = row.IsNull("salecd") ? string.Empty : row.Field<string>("salecd");
         entity.forcecd = row.IsNull("forcecd") ? string.Empty : row.Field<string>("forcecd");
         entity.retncd = row.IsNull("retncd") ? string.Empty : row.Field<string>("retncd");
         entity.setlcd = row.IsNull("setlcd") ? string.Empty : row.Field<string>("setlcd");
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
         entity.webauthfl = row.Field<bool>("webauthfl");
         entity.numusers = row.IsNull("numusers") ? 0 : row.Field<int>("numusers");
         entity.lastuser = row.IsNull("lastuser") ? 0 : row.Field<int>("lastuser");
         entity.chkdlcd = row.IsNull("chkdlcd") ? string.Empty : row.Field<string>("chkdlcd");
         entity.chkactcd = row.IsNull("chkactcd") ? string.Empty : row.Field<string>("chkactcd");
         entity.chkothcd = row.IsNull("chkothcd") ? string.Empty : row.Field<string>("chkothcd");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.purlevelno = row.IsNull("purlevelno") ? 0 : row.Field<int>("purlevelno");
         entity.ipaddress = row.IsNull("ipaddress") ? string.Empty : row.Field<string>("ipaddress");
         entity.portnum = row.IsNull("portnum") ? string.Empty : row.Field<string>("portnum");
         entity.processortype = row.IsNull("processortype") ? string.Empty : row.Field<string>("processortype");
         entity.processorhostsite = row.IsNull("processorhostsite") ? string.Empty : row.Field<string>("processorhostsite");
         entity.processorhostport = row.IsNull("processorhostport") ? string.Empty : row.Field<string>("processorhostport");
         entity.processorpartnerid = row.IsNull("processorpartnerid") ? string.Empty : row.Field<string>("processorpartnerid");
         entity.processorvendorid = row.IsNull("processorvendorid") ? string.Empty : row.Field<string>("processorvendorid");
         entity.processoruserid = row.IsNull("processoruserid") ? string.Empty : row.Field<string>("processoruserid");
         entity.processoruserpw = row.IsNull("processoruserpw") ? string.Empty : row.Field<string>("processoruserpw");
         entity.flatfileencrypt = row.Field<bool>("flatfileencrypt");
         entity.callingURL = row.IsNull("callingURL") ? string.Empty : row.Field<string>("callingURL");
         entity.responseURL = row.IsNull("responseURL") ? string.Empty : row.Field<string>("responseURL");
         entity.callingURLH5 = row.IsNull("callingURLH5") ? string.Empty : row.Field<string>("callingURLH5");
         entity.rowID = row.Field<byte[]>("sastpRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSastpBase(ref DataRow row, SastpBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("processno", entity.processno);
         row.SetField("name", entity.name);
         row.SetField("prefix", entity.prefix);
         row.SetField("tempsfx", entity.tempsfx);
         row.SetField("reqsfx", entity.reqsfx);
         row.SetField("anssfx", entity.anssfx);
         row.SetField("bkusfx", entity.bkusfx);
         row.SetField("directory", entity.directory);
         row.SetField("unixrun", entity.unixrun);
         row.SetField("delay", entity.delay);
         row.SetField("timeout", entity.timeout);
         row.SetField("prauthcd", entity.prauthcd);
         row.SetField("salecd", entity.salecd);
         row.SetField("forcecd", entity.forcecd);
         row.SetField("retncd", entity.retncd);
         row.SetField("setlcd", entity.setlcd);
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
         row.SetField("webauthfl", entity.webauthfl);
         row.SetField("numusers", entity.numusers);
         row.SetField("lastuser", entity.lastuser);
         row.SetField("chkdlcd", entity.chkdlcd);
         row.SetField("chkactcd", entity.chkactcd);
         row.SetField("chkothcd", entity.chkothcd);
         row.SetField("transproc", entity.transproc);
         row.SetField("purlevelno", entity.purlevelno);
         row.SetField("ipaddress", entity.ipaddress);
         row.SetField("portnum", entity.portnum);
         row.SetField("processortype", entity.processortype);
         row.SetField("processorhostsite", entity.processorhostsite);
         row.SetField("processorhostport", entity.processorhostport);
         row.SetField("processorpartnerid", entity.processorpartnerid);
         row.SetField("processorvendorid", entity.processorvendorid);
         row.SetField("processoruserid", entity.processoruserid);
         row.SetField("processoruserpw", entity.processoruserpw);
         row.SetField("flatfileencrypt", entity.flatfileencrypt);
         row.SetField("callingURL", entity.callingURL);
         row.SetField("responseURL", entity.responseURL);
         row.SetField("callingURLH5", entity.callingURLH5);
         row.SetField("sastpRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SastpBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("processno", entity.processno);
         row.SetField("sastpRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	