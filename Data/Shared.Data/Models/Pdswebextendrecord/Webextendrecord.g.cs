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

namespace Infor.Sxe.Shared.Data.Models.Pdswebextendrecord
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdswebextendrecord.Webextendrecord")]
   public partial class Webextendrecord : ModelBase, IUserFields
   {
      public bool activefl { get; set; }
      public int cono { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string extensiontype { get; set; }
      [StringValidationAttribute]
      public string functionname { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public int revision { get; set; }
      [StringValidationAttribute]
      public string rowpointer { get; set; }
      [StringValidationAttribute]
      public string screenname { get; set; }
      [StringValidationAttribute]
      public string settingvalue { get; set; }
      [StringValidationAttribute]
      public string tag { get; set; }
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
      public string webextendRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Webextendrecord BuildWebextendrecordFromRow(DataRow row)
      {
         Webextendrecord entity = new Webextendrecord();
         entity.activefl = row.Field<bool>("activefl");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.extensiontype = row.IsNull("extensiontype") ? string.Empty : row.Field<string>("extensiontype");
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.revision = row.IsNull("revision") ? 0 : row.Field<int>("revision");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.screenname = row.IsNull("screenname") ? string.Empty : row.Field<string>("screenname");
         entity.settingvalue = row.IsNull("settingvalue") ? string.Empty : row.Field<string>("settingvalue");
         entity.tag = row.IsNull("tag") ? string.Empty : row.Field<string>("tag");
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
         entity.webextendRowID = row.Field<byte[]>("webextendRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWebextendrecord(ref DataRow row, Webextendrecord entity)
      {
         row.SetField("activefl", entity.activefl);
         row.SetField("cono", entity.cono);
         row.SetField("descrip", entity.descrip);
         row.SetField("extensiontype", entity.extensiontype);
         row.SetField("functionname", entity.functionname);
         row.SetField("operinit", entity.operinit);
         row.SetField("revision", entity.revision);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("screenname", entity.screenname);
         row.SetField("settingvalue", entity.settingvalue);
         row.SetField("tag", entity.tag);
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
         row.SetField("webextendRowID", entity.webextendRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
