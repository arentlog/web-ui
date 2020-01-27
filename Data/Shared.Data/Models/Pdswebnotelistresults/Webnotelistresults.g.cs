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

namespace Infor.Sxe.Shared.Data.Models.Pdswebnotelistresults
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdswebnotelistresults.Webnotelistresults")]
   public partial class Webnotelistresults : ModelBase, IUserFields
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string noteln { get; set; }
      [StringValidationAttribute]
      public string notestype { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public int origpageno { get; set; }
      public int pageno { get; set; }
      [StringValidationAttribute]
      public string primarykey { get; set; }
      public bool printfl { get; set; }
      public bool printfl2 { get; set; }
      public bool printfl3 { get; set; }
      public bool printfl4 { get; set; }
      public bool printfl5 { get; set; }
      public bool requirefl { get; set; }
      [StringValidationAttribute]
      public string rowpointer { get; set; }
      [StringValidationAttribute]
      public string secondarykey { get; set; }
      public bool securefl { get; set; }
      [StringValidationAttribute]
      public string tablename { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transproc { get; set; }
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
      public string webnoteRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      [StringValidationAttribute]
      public string notecategory { get; set; }
      public bool headerfl { get; set; }


      public static Webnotelistresults BuildWebnotelistresultsFromRow(DataRow row)
      {
         Webnotelistresults entity = new Webnotelistresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.noteln = row.IsNull("noteln") ? string.Empty : row.Field<string>("noteln");
         entity.notestype = row.IsNull("notestype") ? string.Empty : row.Field<string>("notestype");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.origpageno = row.IsNull("origpageno") ? 0 : row.Field<int>("origpageno");
         entity.pageno = row.IsNull("pageno") ? 0 : row.Field<int>("pageno");
         entity.primarykey = row.IsNull("primarykey") ? string.Empty : row.Field<string>("primarykey");
         entity.printfl = row.Field<bool>("printfl");
         entity.printfl2 = row.Field<bool>("printfl2");
         entity.printfl3 = row.Field<bool>("printfl3");
         entity.printfl4 = row.Field<bool>("printfl4");
         entity.printfl5 = row.Field<bool>("printfl5");
         entity.requirefl = row.Field<bool>("requirefl");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.secondarykey = row.IsNull("secondarykey") ? string.Empty : row.Field<string>("secondarykey");
         entity.securefl = row.Field<bool>("securefl");
         entity.tablename = row.IsNull("tablename") ? string.Empty : row.Field<string>("tablename");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
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
         entity.webnoteRowID = row.Field<byte[]>("webnoteRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.notecategory = row.IsNull("notecategory") ? string.Empty : row.Field<string>("notecategory");
         entity.headerfl = row.Field<bool>("headerfl");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWebnotelistresults(ref DataRow row, Webnotelistresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("noteln", entity.noteln);
         row.SetField("notestype", entity.notestype);
         row.SetField("operinit", entity.operinit);
         row.SetField("origpageno", entity.origpageno);
         row.SetField("pageno", entity.pageno);
         row.SetField("primarykey", entity.primarykey);
         row.SetField("printfl", entity.printfl);
         row.SetField("printfl2", entity.printfl2);
         row.SetField("printfl3", entity.printfl3);
         row.SetField("printfl4", entity.printfl4);
         row.SetField("printfl5", entity.printfl5);
         row.SetField("requirefl", entity.requirefl);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("secondarykey", entity.secondarykey);
         row.SetField("securefl", entity.securefl);
         row.SetField("tablename", entity.tablename);
         row.SetField("transdt", entity.transdt);
         row.SetField("transproc", entity.transproc);
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
         row.SetField("webnoteRowID", entity.webnoteRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);
         row.SetField("notecategory", entity.notecategory);
         row.SetField("headerfl", entity.headerfl);

      }
   
   }
}
#pragma warning restore 1591
