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
       
namespace Infor.Sxe.Common.Data.Models.AP
{
   /// <summary>
   /// Accounts Payable Setup Federal Tax 1099
   /// </summary>
   
   public partial class ApsfBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Tax Year
      /// </summary>
      [Key,Order]
      public int taxyear { get; set; }

      /// <summary>
      /// Transmitter Name
      /// </summary>
      [StringValidationAttribute]
      public string transmittername { get; set; }

      /// <summary>
      /// Name
      /// </summary>
      [StringValidationAttribute]
      public string companyname { get; set; }

      /// <summary>
      /// Company Name 2
      /// </summary>
      [StringValidationAttribute]
      public string companyname2 { get; set; }

      /// <summary>
      /// Address
      /// </summary>
      [StringValidationAttribute]
      public string companyaddress { get; set; }

      /// <summary>
      /// City
      /// </summary>
      [StringValidationAttribute]
      public string companycity { get; set; }

      /// <summary>
      /// State
      /// </summary>
      [StringValidationAttribute]
      public string companystate { get; set; }

      /// <summary>
      /// Zip Code
      /// </summary>
      [StringValidationAttribute]
      public string companyzip { get; set; }

      /// <summary>
      /// Contact
      /// </summary>
      [StringValidationAttribute]
      public string contact { get; set; }

      /// <summary>
      /// Contact Phone
      /// </summary>
      [StringValidationAttribute]
      public string contactphone { get; set; }

      /// <summary>
      /// Email
      /// </summary>
      [StringValidationAttribute]
      public string contactemail { get; set; }

      /// <summary>
      /// Transmitter Control Code
      /// </summary>
      [StringValidationAttribute]
      public string controlcode { get; set; }

      /// <summary>
      /// Federal Tax ID #
      /// </summary>
      [StringValidationAttribute]
      public string fedtaxid { get; set; }

      /// <summary>
      /// Transmitter Media #
      /// </summary>
      [StringValidationAttribute]
      public string mediano { get; set; }

      /// <summary>
      /// Test File
      /// </summary>
      public bool testfilefl { get; set; }

      /// <summary>
      /// Foreign Entity
      /// </summary>
      public bool foreignentityfl { get; set; }

      /// <summary>
      /// Magnetic Tape
      /// </summary>
      public bool magtapefl { get; set; }

      /// <summary>
      /// Replacement File Character
      /// </summary>
      [StringValidationAttribute]
      public string replacementfilechar { get; set; }

      /// <summary>
      /// Replacement File Name
      /// </summary>
      [StringValidationAttribute]
      public string replacementfilename { get; set; }

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
      public string CompleteAddress { get { return this.companyaddress + "," + this.companycity + "," + this.companystate + "," + this.companyzip; } }


      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildApsfBaseFromRow<T>(DataRow row) where T:ApsfBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.taxyear = row.IsNull("taxyear") ? 0 : row.Field<int>("taxyear");
         entity.transmittername = row.IsNull("transmittername") ? string.Empty : row.Field<string>("transmittername");
         entity.companyname = row.IsNull("companyname") ? string.Empty : row.Field<string>("companyname");
         entity.companyname2 = row.IsNull("companyname2") ? string.Empty : row.Field<string>("companyname2");
         entity.companyaddress = row.IsNull("companyaddress") ? string.Empty : row.Field<string>("companyaddress");
         entity.companycity = row.IsNull("companycity") ? string.Empty : row.Field<string>("companycity");
         entity.companystate = row.IsNull("companystate") ? string.Empty : row.Field<string>("companystate");
         entity.companyzip = row.IsNull("companyzip") ? string.Empty : row.Field<string>("companyzip");
         entity.contact = row.IsNull("contact") ? string.Empty : row.Field<string>("contact");
         entity.contactphone = row.IsNull("contactphone") ? string.Empty : row.Field<string>("contactphone");
         entity.contactemail = row.IsNull("contactemail") ? string.Empty : row.Field<string>("contactemail");
         entity.controlcode = row.IsNull("controlcode") ? string.Empty : row.Field<string>("controlcode");
         entity.fedtaxid = row.IsNull("fedtaxid") ? string.Empty : row.Field<string>("fedtaxid");
         entity.mediano = row.IsNull("mediano") ? string.Empty : row.Field<string>("mediano");
         entity.testfilefl = row.Field<bool>("testfilefl");
         entity.foreignentityfl = row.Field<bool>("foreignentityfl");
         entity.magtapefl = row.Field<bool>("magtapefl");
         entity.replacementfilechar = row.IsNull("replacementfilechar") ? string.Empty : row.Field<string>("replacementfilechar");
         entity.replacementfilename = row.IsNull("replacementfilename") ? string.Empty : row.Field<string>("replacementfilename");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.transdttmz = row.Field<DateTime?>("transdttmz");
         entity.rowID = row.Field<byte[]>("apsfRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApsfBase(ref DataRow row, ApsfBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("taxyear", entity.taxyear);
         row.SetField("transmittername", entity.transmittername);
         row.SetField("companyname", entity.companyname);
         row.SetField("companyname2", entity.companyname2);
         row.SetField("companyaddress", entity.companyaddress);
         row.SetField("companycity", entity.companycity);
         row.SetField("companystate", entity.companystate);
         row.SetField("companyzip", entity.companyzip);
         row.SetField("contact", entity.contact);
         row.SetField("contactphone", entity.contactphone);
         row.SetField("contactemail", entity.contactemail);
         row.SetField("controlcode", entity.controlcode);
         row.SetField("fedtaxid", entity.fedtaxid);
         row.SetField("mediano", entity.mediano);
         row.SetField("testfilefl", entity.testfilefl);
         row.SetField("foreignentityfl", entity.foreignentityfl);
         row.SetField("magtapefl", entity.magtapefl);
         row.SetField("replacementfilechar", entity.replacementfilechar);
         row.SetField("replacementfilename", entity.replacementfilename);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("transdttmz", entity.transdttmz);
         row.SetField("apsfRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, ApsfBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("taxyear", entity.taxyear);
         row.SetField("apsfRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	