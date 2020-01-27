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
       
namespace Infor.Sxe.Common.Data.Models.SM
{
   /// <summary>
   /// Sales Rep Setup
   /// </summary>
   [EntityType("Sales Rep Setup","oess.detail","Person")]
   public partial class SmsnBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [BodContext(BodPart.AcctEntity,""),BusContext(BusPart.AcctEntity),Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Salesrep
      /// </summary>
      [DrillbackParam("pk",1),BusContext(BusPart.Name),BodID(1,RequiredId.True),Key,Order,StringValidationAttribute]
      public string slsrep { get; set; }

      /// <summary>
      /// Name
      /// </summary>
      [ID(3),StringValidationAttribute]
      public string name { get; set; }

      /// <summary>
      /// Address
      /// </summary>
      [StringValidationAttribute]
      public string addr1 { get; set; }
      [StringValidationAttribute]
      public string addr2 { get; set; }

      /// <summary>
      /// City
      /// </summary>
      [StringValidationAttribute]
      public string city { get; set; }

      /// <summary>
      /// State
      /// </summary>
      [StringValidationAttribute]
      public string state { get; set; }

      /// <summary>
      /// Zip Code
      /// </summary>
      [StringValidationAttribute]
      public string zipcd { get; set; }

      /// <summary>
      /// Phone
      /// </summary>
      [StringValidationAttribute]
      public string phoneno { get; set; }

      /// <summary>
      /// Salesrep Group
      /// </summary>
      [StringValidationAttribute]
      public string slstype { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Operator
      /// </summary>
      [StringValidationAttribute]
      public string oper2 { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// email
      /// </summary>
      [StringValidationAttribute]
      public string email { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Auto CM Followup
      /// </summary>
      public bool autocmfl { get; set; }

      /// <summary>
      /// Sync To CRM
      /// </summary>
      public bool synccrmfl { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// Manager
      /// </summary>
      [StringValidationAttribute]
      public string mgr { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// Title
      /// </summary>
      [StringValidationAttribute]
      public string slstitle { get; set; }

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
      /// Letter Directory
      /// </summary>
      [StringValidationAttribute]
      public string letterdir { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// Correspondence
      /// </summary>
      [StringValidationAttribute]
      public string lettercd1 { get; set; }
      [StringValidationAttribute]
      public string lettercd2 { get; set; }
      [StringValidationAttribute]
      public string lettercd3 { get; set; }
      [StringValidationAttribute]
      public string lettercd4 { get; set; }
      [StringValidationAttribute]
      public string lettercd5 { get; set; }
      [StringValidationAttribute]
      public string lettercd6 { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// Commission
      /// </summary>
      [StringValidationAttribute]
      public string commtype { get; set; }

      /// <summary>
      /// User 7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// Site
      /// </summary>
      [StringValidationAttribute]
      public string site { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// Open Security
      /// </summary>
      public bool securefl { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// System Name
      /// </summary>
      [StringValidationAttribute]
      public string sysname { get; set; }

      /// <summary>
      /// beglastdt
      /// </summary>
      public DateTime? beglastdt { get; set; }

      /// <summary>
      /// endlastdt
      /// </summary>
      public DateTime? endlastdt { get; set; }

      /// <summary>
      /// Modem Phone
      /// </summary>
      [StringValidationAttribute]
      public string modphoneno { get; set; }

      /// <summary>
      /// Pay Commission
      /// </summary>
      public bool commfl { get; set; }

      /// <summary>
      /// Phone Suffix
      /// </summary>
      [StringValidationAttribute]
      public string phonesuf { get; set; }

      /// <summary>
      /// Begin Prospect #
      /// </summary>
      public decimal begprosno { get; set; }

      /// <summary>
      /// Ending Prospect #
      /// </summary>
      public decimal endprosno { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Labor Product
      /// </summary>
      [StringValidationAttribute]
      public string laborprod { get; set; }

      /// <summary>
      /// List Price
      /// </summary>
      public decimal listprice { get; set; }

      /// <summary>
      /// Address
      /// </summary>
      [StringValidationAttribute]
      public string addr3 { get; set; }

      /// <summary>
      /// Geo Code
      /// </summary>
      public int geocd { get; set; }

      /// <summary>
      /// Country
      /// </summary>
      [StringValidationAttribute]
      public string countrycd { get; set; }

      /// <summary>
      /// Outside City Limit
      /// </summary>
      public bool outofcityfl { get; set; }

      /// <summary>
      /// Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }

      /// <summary>
      /// transdttmz
      /// </summary>
      public DateTime? transdttmz { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }


      /// <summary>
      /// string
      /// </summary>
      public string CompleteAddress { get { return this.addr1 + "," + this.city + "," + this.state + "," + this.zipcd + "," + this.countrycd; } }


      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSmsnBaseFromRow<T>(DataRow row) where T:SmsnBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.slsrep = row.IsNull("slsrep") ? string.Empty : row.Field<string>("slsrep");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.addr1 = row.IsNull("addr1") ? string.Empty : row.Field<string>("addr1");
         entity.addr2 = row.IsNull("addr2") ? string.Empty : row.Field<string>("addr2");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.phoneno = row.IsNull("phoneno") ? string.Empty : row.Field<string>("phoneno");
         entity.slstype = row.IsNull("slstype") ? string.Empty : row.Field<string>("slstype");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.oper2 = row.IsNull("oper2") ? string.Empty : row.Field<string>("oper2");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.email = row.IsNull("email") ? string.Empty : row.Field<string>("email");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.autocmfl = row.Field<bool>("autocmfl");
         entity.synccrmfl = row.Field<bool>("synccrmfl");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.mgr = row.IsNull("mgr") ? string.Empty : row.Field<string>("mgr");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.slstitle = row.IsNull("slstitle") ? string.Empty : row.Field<string>("slstitle");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.letterdir = row.IsNull("letterdir") ? string.Empty : row.Field<string>("letterdir");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.lettercd1 = row.IsNull("lettercd1") ? string.Empty : row.Field<string>("lettercd1");
         entity.lettercd2 = row.IsNull("lettercd2") ? string.Empty : row.Field<string>("lettercd2");
         entity.lettercd3 = row.IsNull("lettercd3") ? string.Empty : row.Field<string>("lettercd3");
         entity.lettercd4 = row.IsNull("lettercd4") ? string.Empty : row.Field<string>("lettercd4");
         entity.lettercd5 = row.IsNull("lettercd5") ? string.Empty : row.Field<string>("lettercd5");
         entity.lettercd6 = row.IsNull("lettercd6") ? string.Empty : row.Field<string>("lettercd6");
         entity.user6 = row.Field<decimal?>("user6");
         entity.commtype = row.IsNull("commtype") ? string.Empty : row.Field<string>("commtype");
         entity.user7 = row.Field<decimal?>("user7");
         entity.site = row.IsNull("site") ? string.Empty : row.Field<string>("site");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.securefl = row.Field<bool>("securefl");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.sysname = row.IsNull("sysname") ? string.Empty : row.Field<string>("sysname");
         entity.beglastdt = row.Field<DateTime?>("beglastdt");
         entity.endlastdt = row.Field<DateTime?>("endlastdt");
         entity.modphoneno = row.IsNull("modphoneno") ? string.Empty : row.Field<string>("modphoneno");
         entity.commfl = row.Field<bool>("commfl");
         entity.phonesuf = row.IsNull("phonesuf") ? string.Empty : row.Field<string>("phonesuf");
         entity.begprosno = row.IsNull("begprosno") ? decimal.Zero : row.Field<decimal>("begprosno");
         entity.endprosno = row.IsNull("endprosno") ? decimal.Zero : row.Field<decimal>("endprosno");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.laborprod = row.IsNull("laborprod") ? string.Empty : row.Field<string>("laborprod");
         entity.listprice = row.IsNull("listprice") ? decimal.Zero : row.Field<decimal>("listprice");
         entity.addr3 = row.IsNull("addr3") ? string.Empty : row.Field<string>("addr3");
         entity.geocd = row.IsNull("geocd") ? 0 : row.Field<int>("geocd");
         entity.countrycd = row.IsNull("countrycd") ? string.Empty : row.Field<string>("countrycd");
         entity.outofcityfl = row.Field<bool>("outofcityfl");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.transdttmz = row.Field<DateTime?>("transdttmz");
         entity.rowID = row.Field<byte[]>("smsnRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSmsnBase(ref DataRow row, SmsnBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("slsrep", entity.slsrep);
         row.SetField("name", entity.name);
         row.SetField("addr1", entity.addr1);
         row.SetField("addr2", entity.addr2);
         row.SetField("city", entity.city);
         row.SetField("state", entity.state);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("phoneno", entity.phoneno);
         row.SetField("slstype", entity.slstype);
         row.SetField("operinit", entity.operinit);
         row.SetField("oper2", entity.oper2);
         row.SetField("transdt", entity.transdt);
         row.SetField("email", entity.email);
         row.SetField("transtm", entity.transtm);
         row.SetField("autocmfl", entity.autocmfl);
         row.SetField("synccrmfl", entity.synccrmfl);
         row.SetField("user1", entity.user1);
         row.SetField("mgr", entity.mgr);
         row.SetField("user2", entity.user2);
         row.SetField("slstitle", entity.slstitle);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("letterdir", entity.letterdir);
         row.SetField("user5", entity.user5);
         row.SetField("lettercd1", entity.lettercd1);
         row.SetField("lettercd2", entity.lettercd2);
         row.SetField("lettercd3", entity.lettercd3);
         row.SetField("lettercd4", entity.lettercd4);
         row.SetField("lettercd5", entity.lettercd5);
         row.SetField("lettercd6", entity.lettercd6);
         row.SetField("user6", entity.user6);
         row.SetField("commtype", entity.commtype);
         row.SetField("user7", entity.user7);
         row.SetField("site", entity.site);
         row.SetField("user8", entity.user8);
         row.SetField("securefl", entity.securefl);
         row.SetField("user9", entity.user9);
         row.SetField("sysname", entity.sysname);
         row.SetField("beglastdt", entity.beglastdt);
         row.SetField("endlastdt", entity.endlastdt);
         row.SetField("modphoneno", entity.modphoneno);
         row.SetField("commfl", entity.commfl);
         row.SetField("phonesuf", entity.phonesuf);
         row.SetField("begprosno", entity.begprosno);
         row.SetField("endprosno", entity.endprosno);
         row.SetField("transproc", entity.transproc);
         row.SetField("laborprod", entity.laborprod);
         row.SetField("listprice", entity.listprice);
         row.SetField("addr3", entity.addr3);
         row.SetField("geocd", entity.geocd);
         row.SetField("countrycd", entity.countrycd);
         row.SetField("outofcityfl", entity.outofcityfl);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("transdttmz", entity.transdttmz);
         row.SetField("smsnRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SmsnBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("slsrep", entity.slsrep);
         row.SetField("smsnRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	