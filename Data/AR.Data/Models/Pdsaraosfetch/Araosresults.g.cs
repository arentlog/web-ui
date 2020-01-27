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

namespace Infor.Sxe.AR.Data.Models.Pdsaraosfetch
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsaraosfetch.Araosresults")]
   public partial class Araosresults : ModelBase, IUserFields
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string recty { get; set; }
      [StringValidationAttribute]
      public string arscnotesfl { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custname { get; set; }
      [StringValidationAttribute]
      public string arssnotesfl { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string groupid { get; set; }
      public decimal arscpct1 { get; set; }
      public decimal arscpct2 { get; set; }
      public decimal arscpct3 { get; set; }
      public decimal arscpct4 { get; set; }
      public decimal arscpc21 { get; set; }
      public decimal arscpc22 { get; set; }
      public decimal arscpc23 { get; set; }
      public decimal arscpc24 { get; set; }
      public decimal arscbal1 { get; set; }
      public decimal arscbal2 { get; set; }
      public decimal arscbal3 { get; set; }
      public decimal arscbal4 { get; set; }
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
      public string rowidAraos { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Araosresults BuildAraosresultsFromRow(DataRow row)
      {
         Araosresults entity = new Araosresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.recty = row.IsNull("recty") ? string.Empty : row.Field<string>("recty");
         entity.arscnotesfl = row.IsNull("arscnotesfl") ? string.Empty : row.Field<string>("arscnotesfl");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custname = row.IsNull("custname") ? string.Empty : row.Field<string>("custname");
         entity.arssnotesfl = row.IsNull("arssnotesfl") ? string.Empty : row.Field<string>("arssnotesfl");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.groupid = row.IsNull("groupid") ? string.Empty : row.Field<string>("groupid");
         entity.arscpct1 = row.IsNull("arscpct1") ? decimal.Zero : row.Field<decimal>("arscpct1");
         entity.arscpct2 = row.IsNull("arscpct2") ? decimal.Zero : row.Field<decimal>("arscpct2");
         entity.arscpct3 = row.IsNull("arscpct3") ? decimal.Zero : row.Field<decimal>("arscpct3");
         entity.arscpct4 = row.IsNull("arscpct4") ? decimal.Zero : row.Field<decimal>("arscpct4");
         entity.arscpc21 = row.IsNull("arscpc21") ? decimal.Zero : row.Field<decimal>("arscpc21");
         entity.arscpc22 = row.IsNull("arscpc22") ? decimal.Zero : row.Field<decimal>("arscpc22");
         entity.arscpc23 = row.IsNull("arscpc23") ? decimal.Zero : row.Field<decimal>("arscpc23");
         entity.arscpc24 = row.IsNull("arscpc24") ? decimal.Zero : row.Field<decimal>("arscpc24");
         entity.arscbal1 = row.IsNull("arscbal1") ? decimal.Zero : row.Field<decimal>("arscbal1");
         entity.arscbal2 = row.IsNull("arscbal2") ? decimal.Zero : row.Field<decimal>("arscbal2");
         entity.arscbal3 = row.IsNull("arscbal3") ? decimal.Zero : row.Field<decimal>("arscbal3");
         entity.arscbal4 = row.IsNull("arscbal4") ? decimal.Zero : row.Field<decimal>("arscbal4");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowidAraos = row.Field<byte[]>("rowid-araos").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAraosresults(ref DataRow row, Araosresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("recty", entity.recty);
         row.SetField("arscnotesfl", entity.arscnotesfl);
         row.SetField("custno", entity.custno);
         row.SetField("custname", entity.custname);
         row.SetField("arssnotesfl", entity.arssnotesfl);
         row.SetField("shipto", entity.shipto);
         row.SetField("state", entity.state);
         row.SetField("groupid", entity.groupid);
         row.SetField("arscpct1", entity.arscpct1);
         row.SetField("arscpct2", entity.arscpct2);
         row.SetField("arscpct3", entity.arscpct3);
         row.SetField("arscpct4", entity.arscpct4);
         row.SetField("arscpc21", entity.arscpc21);
         row.SetField("arscpc22", entity.arscpc22);
         row.SetField("arscpc23", entity.arscpc23);
         row.SetField("arscpc24", entity.arscpc24);
         row.SetField("arscbal1", entity.arscbal1);
         row.SetField("arscbal2", entity.arscbal2);
         row.SetField("arscbal3", entity.arscbal3);
         row.SetField("arscbal4", entity.arscbal4);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("rowid-araos", entity.rowidAraos.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
