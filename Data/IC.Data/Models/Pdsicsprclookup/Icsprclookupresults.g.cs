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

namespace Infor.Sxe.IC.Data.Models.Pdsicsprclookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsprclookup.Icsprclookupresults")]
   public partial class Icsprclookupresults : ModelBase, IUserFields
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public DateTime? startdt { get; set; }
      public DateTime? expiredt { get; set; }
      [StringValidationAttribute]
      public string restrictcd { get; set; }
      [StringValidationAttribute]
      public string certcode { get; set; }
      public bool activefl { get; set; }
      public DateTime? certaccptdt { get; set; }
      [StringValidationAttribute]
      public string certaccptuser { get; set; }
      [StringValidationAttribute]
      public string certauthuser { get; set; }
      [StringValidationAttribute]
      public string recordtype { get; set; }
      [StringValidationAttribute]
      public string srcrowpointer { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user3 { get; set; }
      [StringValidationAttribute]
      public string user4 { get; set; }
      [StringValidationAttribute]
      public string user5 { get; set; }
      public decimal? user6 { get; set; }
      public decimal? user7 { get; set; }
      public DateTime? user8 { get; set; }
      public DateTime? user9 { get; set; }
      [StringValidationAttribute]
      public string icsprcRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsprclookupresults BuildIcsprclookupresultsFromRow(DataRow row)
      {
         Icsprclookupresults entity = new Icsprclookupresults();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.expiredt = row.Field<DateTime?>("expiredt");
         entity.restrictcd = row.IsNull("restrictcd") ? string.Empty : row.Field<string>("restrictcd");
         entity.certcode = row.IsNull("certcode") ? string.Empty : row.Field<string>("certcode");
         entity.activefl = row.Field<bool>("activefl");
         entity.certaccptdt = row.Field<DateTime?>("certaccptdt");
         entity.certaccptuser = row.IsNull("certaccptuser") ? string.Empty : row.Field<string>("certaccptuser");
         entity.certauthuser = row.IsNull("certauthuser") ? string.Empty : row.Field<string>("certauthuser");
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.srcrowpointer = row.IsNull("srcrowpointer") ? string.Empty : row.Field<string>("srcrowpointer");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.icsprcRowid = row.Field<byte[]>("icsprc-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsprclookupresults(ref DataRow row, Icsprclookupresults entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("startdt", entity.startdt);
         row.SetField("expiredt", entity.expiredt);
         row.SetField("restrictcd", entity.restrictcd);
         row.SetField("certcode", entity.certcode);
         row.SetField("activefl", entity.activefl);
         row.SetField("certaccptdt", entity.certaccptdt);
         row.SetField("certaccptuser", entity.certaccptuser);
         row.SetField("certauthuser", entity.certauthuser);
         row.SetField("recordtype", entity.recordtype);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("icsprc-rowid", entity.icsprcRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
