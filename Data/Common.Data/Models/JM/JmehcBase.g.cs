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
       
namespace Infor.Sxe.Common.Data.Models.JM
{
   /// <summary>
   /// Job Management Entry Header Customers
   /// </summary>
   
   public partial class JmehcBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Job Identifier
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string jobid { get; set; }

      /// <summary>
      /// Revision #
      /// </summary>
      [Key,Order]
      public int jobrevno { get; set; }

      /// <summary>
      /// Customer #
      /// </summary>
      [Key,Order]
      public decimal custno { get; set; }

      /// <summary>
      /// Name
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string name { get; set; }

      /// <summary>
      /// Date Sent
      /// </summary>
      public DateTime? sentdt { get; set; }

      /// <summary>
      /// Sent By
      /// </summary>
      [StringValidationAttribute]
      public string sentby { get; set; }

      /// <summary>
      /// Contact Name
      /// </summary>
      [StringValidationAttribute]
      public string contact { get; set; }

      /// <summary>
      /// Contact Phone #
      /// </summary>
      [StringValidationAttribute]
      public string contactphno { get; set; }

      /// <summary>
      /// Inside Salesrep
      /// </summary>
      [StringValidationAttribute]
      public string slsrepin { get; set; }

      /// <summary>
      /// Outside Salesrep
      /// </summary>
      [StringValidationAttribute]
      public string slsrepout { get; set; }

      /// <summary>
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

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
      /// Last Changed By
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
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// user6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// user7
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
      /// Fax Phone
      /// </summary>
      [StringValidationAttribute]
      public string faxphoneno { get; set; }

      /// <summary>
      /// Address
      /// </summary>
      [StringValidationAttribute]
      public string addr3 { get; set; }

      /// <summary>
      /// Prospect #
      /// </summary>
      public decimal prosno { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }


      /// <summary>
      /// string
      /// </summary>
      public string CompleteAddress { get { return this.addr1 + "," + this.city + "," + this.state + "," + this.zipcd; } }


      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildJmehcBaseFromRow<T>(DataRow row) where T:JmehcBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.jobid = row.IsNull("jobid") ? string.Empty : row.Field<string>("jobid");
         entity.jobrevno = row.IsNull("jobrevno") ? 0 : row.Field<int>("jobrevno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.sentdt = row.Field<DateTime?>("sentdt");
         entity.sentby = row.IsNull("sentby") ? string.Empty : row.Field<string>("sentby");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.contact = row.IsNull("contact") ? string.Empty : row.Field<string>("contact");
         entity.contactphno = row.IsNull("contactphno") ? string.Empty : row.Field<string>("contactphno");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
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
         entity.addr1 = row.IsNull("addr1") ? string.Empty : row.Field<string>("addr1");
         entity.addr2 = row.IsNull("addr2") ? string.Empty : row.Field<string>("addr2");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.faxphoneno = row.IsNull("faxphoneno") ? string.Empty : row.Field<string>("faxphoneno");
         entity.addr3 = row.IsNull("addr3") ? string.Empty : row.Field<string>("addr3");
         entity.prosno = row.IsNull("prosno") ? decimal.Zero : row.Field<decimal>("prosno");
         entity.rowID = row.Field<byte[]>("jmehcRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromJmehcBase(ref DataRow row, JmehcBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("jobid", entity.jobid);
         row.SetField("jobrevno", entity.jobrevno);
         row.SetField("custno", entity.custno);
         row.SetField("sentdt", entity.sentdt);
         row.SetField("sentby", entity.sentby);
         row.SetField("name", entity.name);
         row.SetField("contact", entity.contact);
         row.SetField("contactphno", entity.contactphno);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
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
         row.SetField("addr1", entity.addr1);
         row.SetField("addr2", entity.addr2);
         row.SetField("city", entity.city);
         row.SetField("state", entity.state);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("faxphoneno", entity.faxphoneno);
         row.SetField("addr3", entity.addr3);
         row.SetField("prosno", entity.prosno);
         row.SetField("jmehcRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, JmehcBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("jobid", entity.jobid);
         row.SetField("jobrevno", entity.jobrevno);
         row.SetField("custno", entity.custno);
         row.SetField("name", entity.name);
         row.SetField("jmehcRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	