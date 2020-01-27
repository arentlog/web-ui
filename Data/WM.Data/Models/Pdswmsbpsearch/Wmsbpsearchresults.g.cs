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

namespace Infor.Sxe.WM.Data.Models.Pdswmsbpsearch
{
   [ModelName("Infor.Sxe.WM.Data.Models.Pdswmsbpsearch.Wmsbpsearchresults")]
   public partial class Wmsbpsearchresults : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string binloc { get; set; }
      public DateTime? fstoredt { get; set; }
      public DateTime? lpickdt { get; set; }
      public DateTime? lstoredt { get; set; }
      public decimal maxqty { get; set; }
      public decimal minqty { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal qtycommitted { get; set; }
      public decimal qtyonhand { get; set; }
      public decimal qtyreceived { get; set; }
      public int tmpicked { get; set; }
      public int tmstored { get; set; }
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
      public string rowidWmsbp { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      [StringValidationAttribute]
      public string productnotes { get; set; }
      [StringValidationAttribute]
      public string proddesc1 { get; set; }
      [StringValidationAttribute]
      public string proddesc2 { get; set; }
      [StringValidationAttribute]
      public string unitstock { get; set; }
      public bool msdsfl { get; set; }
      public bool prodenablefl { get; set; }
      public bool maxqtyenablefl { get; set; }
      public bool minqtyenablefl { get; set; }
      public bool qtyonhandenablefl { get; set; }
      public bool qtycommittedenablefl { get; set; }
      public bool qtyreceivedenablefl { get; set; }


      public static Wmsbpsearchresults BuildWmsbpsearchresultsFromRow(DataRow row)
      {
         Wmsbpsearchresults entity = new Wmsbpsearchresults();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.fstoredt = row.Field<DateTime?>("fstoredt");
         entity.lpickdt = row.Field<DateTime?>("lpickdt");
         entity.lstoredt = row.Field<DateTime?>("lstoredt");
         entity.maxqty = row.IsNull("maxqty") ? decimal.Zero : row.Field<decimal>("maxqty");
         entity.minqty = row.IsNull("minqty") ? decimal.Zero : row.Field<decimal>("minqty");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.qtycommitted = row.IsNull("qtycommitted") ? decimal.Zero : row.Field<decimal>("qtycommitted");
         entity.qtyonhand = row.IsNull("qtyonhand") ? decimal.Zero : row.Field<decimal>("qtyonhand");
         entity.qtyreceived = row.IsNull("qtyreceived") ? decimal.Zero : row.Field<decimal>("qtyreceived");
         entity.tmpicked = row.IsNull("tmpicked") ? 0 : row.Field<int>("tmpicked");
         entity.tmstored = row.IsNull("tmstored") ? 0 : row.Field<int>("tmstored");
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
         entity.rowidWmsbp = row.Field<byte[]>("rowid-wmsbp").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.productnotes = row.IsNull("productnotes") ? string.Empty : row.Field<string>("productnotes");
         entity.proddesc1 = row.IsNull("proddesc1") ? string.Empty : row.Field<string>("proddesc1");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.unitstock = row.IsNull("unitstock") ? string.Empty : row.Field<string>("unitstock");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.prodenablefl = row.Field<bool>("prodenablefl");
         entity.maxqtyenablefl = row.Field<bool>("maxqtyenablefl");
         entity.minqtyenablefl = row.Field<bool>("minqtyenablefl");
         entity.qtyonhandenablefl = row.Field<bool>("qtyonhandenablefl");
         entity.qtycommittedenablefl = row.Field<bool>("qtycommittedenablefl");
         entity.qtyreceivedenablefl = row.Field<bool>("qtyreceivedenablefl");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWmsbpsearchresults(ref DataRow row, Wmsbpsearchresults entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("binloc", entity.binloc);
         row.SetField("fstoredt", entity.fstoredt);
         row.SetField("lpickdt", entity.lpickdt);
         row.SetField("lstoredt", entity.lstoredt);
         row.SetField("maxqty", entity.maxqty);
         row.SetField("minqty", entity.minqty);
         row.SetField("operinit", entity.operinit);
         row.SetField("prod", entity.prod);
         row.SetField("qtycommitted", entity.qtycommitted);
         row.SetField("qtyonhand", entity.qtyonhand);
         row.SetField("qtyreceived", entity.qtyreceived);
         row.SetField("tmpicked", entity.tmpicked);
         row.SetField("tmstored", entity.tmstored);
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
         row.SetField("rowid-wmsbp", entity.rowidWmsbp.ToByteArray());
         row.SetField("userfield", entity.userfield);
         row.SetField("productnotes", entity.productnotes);
         row.SetField("proddesc1", entity.proddesc1);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("unitstock", entity.unitstock);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("prodenablefl", entity.prodenablefl);
         row.SetField("maxqtyenablefl", entity.maxqtyenablefl);
         row.SetField("minqtyenablefl", entity.minqtyenablefl);
         row.SetField("qtyonhandenablefl", entity.qtyonhandenablefl);
         row.SetField("qtycommittedenablefl", entity.qtycommittedenablefl);
         row.SetField("qtyreceivedenablefl", entity.qtyreceivedenablefl);

      }
   
   }
}
#pragma warning restore 1591