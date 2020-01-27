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

namespace Infor.Sxe.OE.Data.Models.Pdsoeirheaderretrieve
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeirheaderretrieve.Oeirheaderretrieveaddons")]
   public partial class Oeirheaderretrieveaddons : ModelBase, IUserFields
   {
      public decimal addonamt { get; set; }
      public bool addoncapfl { get; set; }
      public decimal addondist { get; set; }
      [StringValidationAttribute]
      public string addondistr { get; set; }
      public decimal addonnet { get; set; }
      public int addonno { get; set; }
      public bool addontype { get; set; }
      public bool addoverfl { get; set; }
      public int addtaxgroup { get; set; }
      public int cono { get; set; }
      [StringValidationAttribute]
      public string keyindex { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public decimal prevaddamt { get; set; }
      public bool prevaddtype { get; set; }
      public int seqno { get; set; }
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
      public string xxc1 { get; set; }
      [StringValidationAttribute]
      public string xxc2 { get; set; }
      [StringValidationAttribute]
      public string xxc3 { get; set; }
      [StringValidationAttribute]
      public string xxc4 { get; set; }
      [StringValidationAttribute]
      public string xxc5 { get; set; }
      public DateTime? xxda1 { get; set; }
      public DateTime? xxda2 { get; set; }
      public DateTime? xxda3 { get; set; }
      public DateTime? xxda4 { get; set; }
      public DateTime? xxda5 { get; set; }
      public decimal xxde1 { get; set; }
      public decimal xxde2 { get; set; }
      public decimal xxde3 { get; set; }
      public decimal xxde4 { get; set; }
      public decimal xxde5 { get; set; }
      public int xxi1 { get; set; }
      public int xxi2 { get; set; }
      public int xxi3 { get; set; }
      public int xxi4 { get; set; }
      public int xxi5 { get; set; }
      public bool xxl1 { get; set; }
      public bool xxl2 { get; set; }
      public bool xxl3 { get; set; }
      public bool xxl4 { get; set; }
      public bool xxl5 { get; set; }


      public static Oeirheaderretrieveaddons BuildOeirheaderretrieveaddonsFromRow(DataRow row)
      {
         Oeirheaderretrieveaddons entity = new Oeirheaderretrieveaddons();
         entity.addonamt = row.IsNull("addonamt") ? decimal.Zero : row.Field<decimal>("addonamt");
         entity.addoncapfl = row.Field<bool>("addoncapfl");
         entity.addondist = row.IsNull("addondist") ? decimal.Zero : row.Field<decimal>("addondist");
         entity.addondistr = row.IsNull("addondistr") ? string.Empty : row.Field<string>("addondistr");
         entity.addonnet = row.IsNull("addonnet") ? decimal.Zero : row.Field<decimal>("addonnet");
         entity.addonno = row.IsNull("addonno") ? 0 : row.Field<int>("addonno");
         entity.addontype = row.Field<bool>("addontype");
         entity.addoverfl = row.Field<bool>("addoverfl");
         entity.addtaxgroup = row.IsNull("addtaxgroup") ? 0 : row.Field<int>("addtaxgroup");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.keyindex = row.IsNull("keyindex") ? string.Empty : row.Field<string>("keyindex");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.prevaddamt = row.IsNull("prevaddamt") ? decimal.Zero : row.Field<decimal>("prevaddamt");
         entity.prevaddtype = row.Field<bool>("prevaddtype");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
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
         entity.xxc1 = row.IsNull("xxc1") ? string.Empty : row.Field<string>("xxc1");
         entity.xxc2 = row.IsNull("xxc2") ? string.Empty : row.Field<string>("xxc2");
         entity.xxc3 = row.IsNull("xxc3") ? string.Empty : row.Field<string>("xxc3");
         entity.xxc4 = row.IsNull("xxc4") ? string.Empty : row.Field<string>("xxc4");
         entity.xxc5 = row.IsNull("xxc5") ? string.Empty : row.Field<string>("xxc5");
         entity.xxda1 = row.Field<DateTime?>("xxda1");
         entity.xxda2 = row.Field<DateTime?>("xxda2");
         entity.xxda3 = row.Field<DateTime?>("xxda3");
         entity.xxda4 = row.Field<DateTime?>("xxda4");
         entity.xxda5 = row.Field<DateTime?>("xxda5");
         entity.xxde1 = row.IsNull("xxde1") ? decimal.Zero : row.Field<decimal>("xxde1");
         entity.xxde2 = row.IsNull("xxde2") ? decimal.Zero : row.Field<decimal>("xxde2");
         entity.xxde3 = row.IsNull("xxde3") ? decimal.Zero : row.Field<decimal>("xxde3");
         entity.xxde4 = row.IsNull("xxde4") ? decimal.Zero : row.Field<decimal>("xxde4");
         entity.xxde5 = row.IsNull("xxde5") ? decimal.Zero : row.Field<decimal>("xxde5");
         entity.xxi1 = row.IsNull("xxi1") ? 0 : row.Field<int>("xxi1");
         entity.xxi2 = row.IsNull("xxi2") ? 0 : row.Field<int>("xxi2");
         entity.xxi3 = row.IsNull("xxi3") ? 0 : row.Field<int>("xxi3");
         entity.xxi4 = row.IsNull("xxi4") ? 0 : row.Field<int>("xxi4");
         entity.xxi5 = row.IsNull("xxi5") ? 0 : row.Field<int>("xxi5");
         entity.xxl1 = row.Field<bool>("xxl1");
         entity.xxl2 = row.Field<bool>("xxl2");
         entity.xxl3 = row.Field<bool>("xxl3");
         entity.xxl4 = row.Field<bool>("xxl4");
         entity.xxl5 = row.Field<bool>("xxl5");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeirheaderretrieveaddons(ref DataRow row, Oeirheaderretrieveaddons entity)
      {
         row.SetField("addonamt", entity.addonamt);
         row.SetField("addoncapfl", entity.addoncapfl);
         row.SetField("addondist", entity.addondist);
         row.SetField("addondistr", entity.addondistr);
         row.SetField("addonnet", entity.addonnet);
         row.SetField("addonno", entity.addonno);
         row.SetField("addontype", entity.addontype);
         row.SetField("addoverfl", entity.addoverfl);
         row.SetField("addtaxgroup", entity.addtaxgroup);
         row.SetField("cono", entity.cono);
         row.SetField("keyindex", entity.keyindex);
         row.SetField("operinit", entity.operinit);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("prevaddamt", entity.prevaddamt);
         row.SetField("prevaddtype", entity.prevaddtype);
         row.SetField("seqno", entity.seqno);
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
         row.SetField("xxc1", entity.xxc1);
         row.SetField("xxc2", entity.xxc2);
         row.SetField("xxc3", entity.xxc3);
         row.SetField("xxc4", entity.xxc4);
         row.SetField("xxc5", entity.xxc5);
         row.SetField("xxda1", entity.xxda1);
         row.SetField("xxda2", entity.xxda2);
         row.SetField("xxda3", entity.xxda3);
         row.SetField("xxda4", entity.xxda4);
         row.SetField("xxda5", entity.xxda5);
         row.SetField("xxde1", entity.xxde1);
         row.SetField("xxde2", entity.xxde2);
         row.SetField("xxde3", entity.xxde3);
         row.SetField("xxde4", entity.xxde4);
         row.SetField("xxde5", entity.xxde5);
         row.SetField("xxi1", entity.xxi1);
         row.SetField("xxi2", entity.xxi2);
         row.SetField("xxi3", entity.xxi3);
         row.SetField("xxi4", entity.xxi4);
         row.SetField("xxi5", entity.xxi5);
         row.SetField("xxl1", entity.xxl1);
         row.SetField("xxl2", entity.xxl2);
         row.SetField("xxl3", entity.xxl3);
         row.SetField("xxl4", entity.xxl4);
         row.SetField("xxl5", entity.xxl5);

      }
   
   }
}
#pragma warning restore 1591