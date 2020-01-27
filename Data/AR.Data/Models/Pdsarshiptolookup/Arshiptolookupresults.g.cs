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

namespace Infor.Sxe.AR.Data.Models.Pdsarshiptolookup
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarshiptolookup.Arshiptolookupresults")]
   public partial class Arshiptolookupresults : ModelBase, IUserFields
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string shiptonotesfl { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string phoneno { get; set; }
      [StringValidationAttribute]
      public string zipcd { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      [StringValidationAttribute]
      public string addr1 { get; set; }
      [StringValidationAttribute]
      public string addr2 { get; set; }
      [StringValidationAttribute]
      public string addr3 { get; set; }
      [StringValidationAttribute]
      public string createdby { get; set; }
      public DateTime? createddt { get; set; }
      [StringValidationAttribute]
      public string createdproc { get; set; }
      [StringValidationAttribute]
      public string createdtm { get; set; }
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
      public string rowidArss { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      public string CompleteAddress { get { return this.addr1 + "," + this.city + "," + this.state + "," + this.zipcd; } }


      public static Arshiptolookupresults BuildArshiptolookupresultsFromRow(DataRow row)
      {
         Arshiptolookupresults entity = new Arshiptolookupresults();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shiptonotesfl = row.IsNull("shiptonotesfl") ? string.Empty : row.Field<string>("shiptonotesfl");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.phoneno = row.IsNull("phoneno") ? string.Empty : row.Field<string>("phoneno");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.addr1 = row.IsNull("addr1") ? string.Empty : row.Field<string>("addr1");
         entity.addr2 = row.IsNull("addr2") ? string.Empty : row.Field<string>("addr2");
         entity.addr3 = row.IsNull("addr3") ? string.Empty : row.Field<string>("addr3");
         entity.createdby = row.IsNull("createdby") ? string.Empty : row.Field<string>("createdby");
         entity.createddt = row.Field<DateTime?>("createddt");
         entity.createdproc = row.IsNull("createdproc") ? string.Empty : row.Field<string>("createdproc");
         entity.createdtm = row.IsNull("createdtm") ? string.Empty : row.Field<string>("createdtm");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowidArss = row.Field<byte[]>("rowid-arss").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArshiptolookupresults(ref DataRow row, Arshiptolookupresults entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("shipto", entity.shipto);
         row.SetField("shiptonotesfl", entity.shiptonotesfl);
         row.SetField("statustype", entity.statustype);
         row.SetField("name", entity.name);
         row.SetField("phoneno", entity.phoneno);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("state", entity.state);
         row.SetField("city", entity.city);
         row.SetField("addr1", entity.addr1);
         row.SetField("addr2", entity.addr2);
         row.SetField("addr3", entity.addr3);
         row.SetField("createdby", entity.createdby);
         row.SetField("createddt", entity.createddt);
         row.SetField("createdproc", entity.createdproc);
         row.SetField("createdtm", entity.createdtm);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("rowid-arss", entity.rowidArss.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591