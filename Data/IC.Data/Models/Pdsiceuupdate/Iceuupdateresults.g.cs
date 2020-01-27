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

namespace Infor.Sxe.IC.Data.Models.Pdsiceuupdate
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceuupdate.Iceuupdateresults")]
   public partial class Iceuupdateresults : ModelBase, IUserFields
   {
      public DateTime? enterdt { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal qtyunavail { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string stkunit { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transtm { get; set; }
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
      public string whse { get; set; }
      [StringValidationAttribute]
      public string cDesc { get; set; }
      [StringValidationAttribute]
      public string iCETNotesFl { get; set; }
      public int iCETNotesID { get; set; }
      [StringValidationAttribute]
      public string iCETRowID { get; set; }
      [StringValidationAttribute]
      public string reasunavtydesc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceuupdateresults BuildIceuupdateresultsFromRow(DataRow row)
      {
         Iceuupdateresults entity = new Iceuupdateresults();
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.stkunit = row.IsNull("stkunit") ? string.Empty : row.Field<string>("stkunit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.cDesc = row.IsNull("cDesc") ? string.Empty : row.Field<string>("cDesc");
         entity.iCETNotesFl = row.IsNull("ICETNotesFl") ? string.Empty : row.Field<string>("ICETNotesFl");
         entity.iCETNotesID = row.IsNull("ICETNotesID") ? 0 : row.Field<int>("ICETNotesID");
         entity.iCETRowID = row.Field<byte[]>("ICETRowID").ToStringEncoded();
         entity.reasunavtydesc = row.IsNull("reasunavtydesc") ? string.Empty : row.Field<string>("reasunavtydesc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceuupdateresults(ref DataRow row, Iceuupdateresults entity)
      {
         row.SetField("enterdt", entity.enterdt);
         row.SetField("operinit", entity.operinit);
         row.SetField("prod", entity.prod);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("refer", entity.refer);
         row.SetField("stkunit", entity.stkunit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("whse", entity.whse);
         row.SetField("cDesc", entity.cDesc);
         row.SetField("ICETNotesFl", entity.iCETNotesFl);
         row.SetField("ICETNotesID", entity.iCETNotesID);
         row.SetField("ICETRowID", entity.iCETRowID.ToByteArray());
         row.SetField("reasunavtydesc", entity.reasunavtydesc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
