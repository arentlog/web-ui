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

namespace Infor.Sxe.Shared.Data.Models.Pdscontactscrt
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdscontactscrt.Contactscrt")]
   public partial class Contactscrt : ModelBase
   {
      public int cono { get; set; }
      public decimal contactid { get; set; }
      [StringValidationAttribute]
      public string firstnm { get; set; }
      [StringValidationAttribute]
      public string lastnm { get; set; }
      [StringValidationAttribute]
      public string middlenm { get; set; }
      [StringValidationAttribute]
      public string cotitle { get; set; }
      [StringValidationAttribute]
      public string addr1 { get; set; }
      [StringValidationAttribute]
      public string addr2 { get; set; }
      [StringValidationAttribute]
      public string addr3 { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string zipcd { get; set; }
      [StringValidationAttribute]
      public string phoneno { get; set; }
      [StringValidationAttribute]
      public string faxphoneno { get; set; }
      [StringValidationAttribute]
      public string emailaddr { get; set; }
      [StringValidationAttribute]
      public string roletype { get; set; }
      [StringValidationAttribute]
      public string primarykey { get; set; }
      [StringValidationAttribute]
      public string secondarykey { get; set; }
      public string CompleteAddress { get { return this.addr1 + "," + this.city + "," + this.state + "," + this.zipcd; } }


      public static Contactscrt BuildContactscrtFromRow(DataRow row)
      {
         Contactscrt entity = new Contactscrt();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.contactid = row.IsNull("contactid") ? decimal.Zero : row.Field<decimal>("contactid");
         entity.firstnm = row.IsNull("firstnm") ? string.Empty : row.Field<string>("firstnm");
         entity.lastnm = row.IsNull("lastnm") ? string.Empty : row.Field<string>("lastnm");
         entity.middlenm = row.IsNull("middlenm") ? string.Empty : row.Field<string>("middlenm");
         entity.cotitle = row.IsNull("cotitle") ? string.Empty : row.Field<string>("cotitle");
         entity.addr1 = row.IsNull("addr1") ? string.Empty : row.Field<string>("addr1");
         entity.addr2 = row.IsNull("addr2") ? string.Empty : row.Field<string>("addr2");
         entity.addr3 = row.IsNull("addr3") ? string.Empty : row.Field<string>("addr3");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.phoneno = row.IsNull("phoneno") ? string.Empty : row.Field<string>("phoneno");
         entity.faxphoneno = row.IsNull("faxphoneno") ? string.Empty : row.Field<string>("faxphoneno");
         entity.emailaddr = row.IsNull("emailaddr") ? string.Empty : row.Field<string>("emailaddr");
         entity.roletype = row.IsNull("roletype") ? string.Empty : row.Field<string>("roletype");
         entity.primarykey = row.IsNull("primarykey") ? string.Empty : row.Field<string>("primarykey");
         entity.secondarykey = row.IsNull("secondarykey") ? string.Empty : row.Field<string>("secondarykey");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromContactscrt(ref DataRow row, Contactscrt entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("contactid", entity.contactid);
         row.SetField("firstnm", entity.firstnm);
         row.SetField("lastnm", entity.lastnm);
         row.SetField("middlenm", entity.middlenm);
         row.SetField("cotitle", entity.cotitle);
         row.SetField("addr1", entity.addr1);
         row.SetField("addr2", entity.addr2);
         row.SetField("addr3", entity.addr3);
         row.SetField("city", entity.city);
         row.SetField("state", entity.state);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("phoneno", entity.phoneno);
         row.SetField("faxphoneno", entity.faxphoneno);
         row.SetField("emailaddr", entity.emailaddr);
         row.SetField("roletype", entity.roletype);
         row.SetField("primarykey", entity.primarykey);
         row.SetField("secondarykey", entity.secondarykey);

      }
   
   }
}
#pragma warning restore 1591
