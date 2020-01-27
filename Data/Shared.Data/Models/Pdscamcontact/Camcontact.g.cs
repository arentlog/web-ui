//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 13370 $
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
using System.Collections.Generic;
using System.Linq;
using HelpPageErrorSimulator.HelpArea.Areas.HelpPage.ModelDescriptions;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.Shared.Data.Models.Pdscamcontact
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdscamcontact.Camcontact")]
   public partial class Camcontact : ModelBase
   {
      public int cono { get; set; }
      public decimal contactid { get; set; }
      [StringValidationAttribute]
      public string contactRowid { get; set; }
      [StringValidationAttribute]
      public string firstnm { get; set; }
      [StringValidationAttribute]
      public string middlenm { get; set; }
      [StringValidationAttribute]
      public string lastnm { get; set; }
      public int priority { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
      [StringValidationAttribute]
      public string cotitle { get; set; }
      [StringValidationAttribute]
      public string groupcd { get; set; }
      [StringValidationAttribute]
      public string salutation { get; set; }
      [StringValidationAttribute]
      public string contacttype { get; set; }
      [StringValidationAttribute]
      public string langcd { get; set; }
      public bool synccrmfl { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transproc { get; set; }
      [StringValidationAttribute]
      public string transtm { get; set; }
      [StringValidationAttribute]
      public string charuser1 { get; set; }
      [StringValidationAttribute]
      public string charuser2 { get; set; }
      [StringValidationAttribute]
      public string charuser3 { get; set; }
      [StringValidationAttribute]
      public string charuser4 { get; set; }
      [StringValidationAttribute]
      public string charuser5 { get; set; }
      [StringValidationAttribute]
      public string charuser6 { get; set; }
      [StringValidationAttribute]
      public string charuser7 { get; set; }
      [StringValidationAttribute]
      public string charuser8 { get; set; }
      [StringValidationAttribute]
      public string charuser9 { get; set; }
      [StringValidationAttribute]
      public string charuser10 { get; set; }
      public DateTime? dateuser1 { get; set; }
      public DateTime? dateuser2 { get; set; }
      public DateTime? dateuser3 { get; set; }
      public DateTime? dateuser4 { get; set; }
      public DateTime? dateuser5 { get; set; }
      public decimal decuser1 { get; set; }
      public decimal decuser2 { get; set; }
      public decimal decuser3 { get; set; }
      public decimal decuser4 { get; set; }
      public decimal decuser5 { get; set; }
      public int intuser1 { get; set; }
      public int intuser2 { get; set; }
      public int intuser3 { get; set; }
      public int intuser4 { get; set; }
      public int intuser5 { get; set; }
      public bool loguser1 { get; set; }
      public bool loguser2 { get; set; }
      public bool loguser3 { get; set; }
      public bool loguser4 { get; set; }
      public bool loguser5 { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Camcontact BuildCamcontactFromRow(DataRow row)
      {
         Camcontact entity = new Camcontact();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.contactid = row.IsNull("contactid") ? decimal.Zero : row.Field<decimal>("contactid");
         entity.contactRowid = row.Field<byte[]>("contactRowid").ToStringEncoded();
         entity.firstnm = row.IsNull("firstnm") ? string.Empty : row.Field<string>("firstnm");
         entity.middlenm = row.IsNull("middlenm") ? string.Empty : row.Field<string>("middlenm");
         entity.lastnm = row.IsNull("lastnm") ? string.Empty : row.Field<string>("lastnm");
         entity.priority = row.IsNull("priority") ? 0 : row.Field<int>("priority");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.cotitle = row.IsNull("cotitle") ? string.Empty : row.Field<string>("cotitle");
         entity.groupcd = row.IsNull("groupcd") ? string.Empty : row.Field<string>("groupcd");
         entity.salutation = row.IsNull("salutation") ? string.Empty : row.Field<string>("salutation");
         entity.contacttype = row.IsNull("contacttype") ? string.Empty : row.Field<string>("contacttype");
         entity.langcd = row.IsNull("langcd") ? string.Empty : row.Field<string>("langcd");
         entity.synccrmfl = row.Field<bool>("synccrmfl");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.charuser1 = row.IsNull("charuser1") ? string.Empty : row.Field<string>("charuser1");
         entity.charuser2 = row.IsNull("charuser2") ? string.Empty : row.Field<string>("charuser2");
         entity.charuser3 = row.IsNull("charuser3") ? string.Empty : row.Field<string>("charuser3");
         entity.charuser4 = row.IsNull("charuser4") ? string.Empty : row.Field<string>("charuser4");
         entity.charuser5 = row.IsNull("charuser5") ? string.Empty : row.Field<string>("charuser5");
         entity.charuser6 = row.IsNull("charuser6") ? string.Empty : row.Field<string>("charuser6");
         entity.charuser7 = row.IsNull("charuser7") ? string.Empty : row.Field<string>("charuser7");
         entity.charuser8 = row.IsNull("charuser8") ? string.Empty : row.Field<string>("charuser8");
         entity.charuser9 = row.IsNull("charuser9") ? string.Empty : row.Field<string>("charuser9");
         entity.charuser10 = row.IsNull("charuser10") ? string.Empty : row.Field<string>("charuser10");
         entity.dateuser1 = row.Field<DateTime?>("dateuser1");
         entity.dateuser2 = row.Field<DateTime?>("dateuser2");
         entity.dateuser3 = row.Field<DateTime?>("dateuser3");
         entity.dateuser4 = row.Field<DateTime?>("dateuser4");
         entity.dateuser5 = row.Field<DateTime?>("dateuser5");
         entity.decuser1 = row.IsNull("decuser1") ? decimal.Zero : row.Field<decimal>("decuser1");
         entity.decuser2 = row.IsNull("decuser2") ? decimal.Zero : row.Field<decimal>("decuser2");
         entity.decuser3 = row.IsNull("decuser3") ? decimal.Zero : row.Field<decimal>("decuser3");
         entity.decuser4 = row.IsNull("decuser4") ? decimal.Zero : row.Field<decimal>("decuser4");
         entity.decuser5 = row.IsNull("decuser5") ? decimal.Zero : row.Field<decimal>("decuser5");
         entity.intuser1 = row.IsNull("intuser1") ? 0 : row.Field<int>("intuser1");
         entity.intuser2 = row.IsNull("intuser2") ? 0 : row.Field<int>("intuser2");
         entity.intuser3 = row.IsNull("intuser3") ? 0 : row.Field<int>("intuser3");
         entity.intuser4 = row.IsNull("intuser4") ? 0 : row.Field<int>("intuser4");
         entity.intuser5 = row.IsNull("intuser5") ? 0 : row.Field<int>("intuser5");
         entity.loguser1 = row.Field<bool>("loguser1");
         entity.loguser2 = row.Field<bool>("loguser2");
         entity.loguser3 = row.Field<bool>("loguser3");
         entity.loguser4 = row.Field<bool>("loguser4");
         entity.loguser5 = row.Field<bool>("loguser5");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCamcontact(ref DataRow row, Camcontact entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("contactid", entity.contactid);
         row.SetField("contactRowid", entity.contactRowid.ToByteArray());
         row.SetField("firstnm", entity.firstnm);
         row.SetField("middlenm", entity.middlenm);
         row.SetField("lastnm", entity.lastnm);
         row.SetField("priority", entity.priority);
         row.SetField("comment", entity.comment);
         row.SetField("cotitle", entity.cotitle);
         row.SetField("groupcd", entity.groupcd);
         row.SetField("salutation", entity.salutation);
         row.SetField("contacttype", entity.contacttype);
         row.SetField("langcd", entity.langcd);
         row.SetField("synccrmfl", entity.synccrmfl);
         row.SetField("transdt", entity.transdt);
         row.SetField("transproc", entity.transproc);
         row.SetField("transtm", entity.transtm);
         row.SetField("charuser1", entity.charuser1);
         row.SetField("charuser2", entity.charuser2);
         row.SetField("charuser3", entity.charuser3);
         row.SetField("charuser4", entity.charuser4);
         row.SetField("charuser5", entity.charuser5);
         row.SetField("charuser6", entity.charuser6);
         row.SetField("charuser7", entity.charuser7);
         row.SetField("charuser8", entity.charuser8);
         row.SetField("charuser9", entity.charuser9);
         row.SetField("charuser10", entity.charuser10);
         row.SetField("dateuser1", entity.dateuser1);
         row.SetField("dateuser2", entity.dateuser2);
         row.SetField("dateuser3", entity.dateuser3);
         row.SetField("dateuser4", entity.dateuser4);
         row.SetField("dateuser5", entity.dateuser5);
         row.SetField("decuser1", entity.decuser1);
         row.SetField("decuser2", entity.decuser2);
         row.SetField("decuser3", entity.decuser3);
         row.SetField("decuser4", entity.decuser4);
         row.SetField("decuser5", entity.decuser5);
         row.SetField("intuser1", entity.intuser1);
         row.SetField("intuser2", entity.intuser2);
         row.SetField("intuser3", entity.intuser3);
         row.SetField("intuser4", entity.intuser4);
         row.SetField("intuser5", entity.intuser5);
         row.SetField("loguser1", entity.loguser1);
         row.SetField("loguser2", entity.loguser2);
         row.SetField("loguser3", entity.loguser3);
         row.SetField("loguser4", entity.loguser4);
         row.SetField("loguser5", entity.loguser5);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
