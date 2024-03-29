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

namespace Infor.Sxe.OT.Data.Models.Pdsotittracktotals
{
   [ModelName("Infor.Sxe.OT.Data.Models.Pdsotittracktotals.Otittracktotals")]
   public partial class Otittracktotals : ModelBase
   {
      public int trackno { get; set; }
      [StringValidationAttribute]
      public string addondesc1 { get; set; }
      public decimal addonamt1 { get; set; }
      [StringValidationAttribute]
      public string addontype1 { get; set; }
      public decimal addonnet1 { get; set; }
      [StringValidationAttribute]
      public string addondesc2 { get; set; }
      public decimal addonamt2 { get; set; }
      [StringValidationAttribute]
      public string addontype2 { get; set; }
      public decimal addonnet2 { get; set; }
      [StringValidationAttribute]
      public string addondesc3 { get; set; }
      public decimal addonamt3 { get; set; }
      [StringValidationAttribute]
      public string addontype3 { get; set; }
      public decimal addonnet3 { get; set; }
      [StringValidationAttribute]
      public string addondesc4 { get; set; }
      public decimal addonamt4 { get; set; }
      [StringValidationAttribute]
      public string addontype4 { get; set; }
      public decimal addonnet4 { get; set; }
      public DateTime? estprodstdt { get; set; }
      public DateTime? revprodstdt { get; set; }
      public DateTime? actprodstdt { get; set; }
      public DateTime? estcompdt { get; set; }
      public DateTime? revcompdt { get; set; }
      public DateTime? actcompdt { get; set; }
      public DateTime? estdeptdt { get; set; }
      public DateTime? revdeptdt { get; set; }
      public DateTime? actdeptdt { get; set; }
      public DateTime? estdockarrdt { get; set; }
      public DateTime? revdockarrdt { get; set; }
      public DateTime? actdockarrdt { get; set; }
      public DateTime? estdockreddt { get; set; }
      public DateTime? revdockreddt { get; set; }
      public DateTime? actdockreddt { get; set; }
      public DateTime? estdockdemudt { get; set; }
      public DateTime? revdemudt { get; set; }
      public DateTime? actdockdemudt { get; set; }
      public DateTime? estatwhsedt { get; set; }
      public DateTime? revatwhsedt { get; set; }
      public DateTime? actatwhsedt { get; set; }
      public DateTime? estlastfreedt { get; set; }
      public DateTime? revlastfreedt { get; set; }
      public DateTime? actlastfreedt { get; set; }
      public DateTime? estwhseunldt { get; set; }
      public DateTime? revwhseunldt { get; set; }
      public DateTime? actwhseunldt { get; set; }
      public DateTime? estemptydt { get; set; }
      public DateTime? revemptydt { get; set; }
      public DateTime? actemptydt { get; set; }
      public DateTime? estretdt { get; set; }
      public DateTime? revretdt { get; set; }
      public DateTime? actretdt { get; set; }
      public bool seecostfl { get; set; }
      public bool additaddonallowed { get; set; }
      public decimal additaddonamt { get; set; }
      public decimal totqtyord { get; set; }
      public decimal totcubes { get; set; }
      public decimal totlineamt { get; set; }
      public decimal totweight { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Otittracktotals BuildOtittracktotalsFromRow(DataRow row)
      {
         Otittracktotals entity = new Otittracktotals();
         entity.trackno = row.IsNull("trackno") ? 0 : row.Field<int>("trackno");
         entity.addondesc1 = row.IsNull("addondesc-1") ? string.Empty : row.Field<string>("addondesc-1");
         entity.addonamt1 = row.IsNull("addonamt-1") ? decimal.Zero : row.Field<decimal>("addonamt-1");
         entity.addontype1 = row.IsNull("addontype-1") ? string.Empty : row.Field<string>("addontype-1");
         entity.addonnet1 = row.IsNull("addonnet-1") ? decimal.Zero : row.Field<decimal>("addonnet-1");
         entity.addondesc2 = row.IsNull("addondesc-2") ? string.Empty : row.Field<string>("addondesc-2");
         entity.addonamt2 = row.IsNull("addonamt-2") ? decimal.Zero : row.Field<decimal>("addonamt-2");
         entity.addontype2 = row.IsNull("addontype-2") ? string.Empty : row.Field<string>("addontype-2");
         entity.addonnet2 = row.IsNull("addonnet-2") ? decimal.Zero : row.Field<decimal>("addonnet-2");
         entity.addondesc3 = row.IsNull("addondesc-3") ? string.Empty : row.Field<string>("addondesc-3");
         entity.addonamt3 = row.IsNull("addonamt-3") ? decimal.Zero : row.Field<decimal>("addonamt-3");
         entity.addontype3 = row.IsNull("addontype-3") ? string.Empty : row.Field<string>("addontype-3");
         entity.addonnet3 = row.IsNull("addonnet-3") ? decimal.Zero : row.Field<decimal>("addonnet-3");
         entity.addondesc4 = row.IsNull("addondesc-4") ? string.Empty : row.Field<string>("addondesc-4");
         entity.addonamt4 = row.IsNull("addonamt-4") ? decimal.Zero : row.Field<decimal>("addonamt-4");
         entity.addontype4 = row.IsNull("addontype-4") ? string.Empty : row.Field<string>("addontype-4");
         entity.addonnet4 = row.IsNull("addonnet-4") ? decimal.Zero : row.Field<decimal>("addonnet-4");
         entity.estprodstdt = row.Field<DateTime?>("estprodstdt");
         entity.revprodstdt = row.Field<DateTime?>("revprodstdt");
         entity.actprodstdt = row.Field<DateTime?>("actprodstdt");
         entity.estcompdt = row.Field<DateTime?>("estcompdt");
         entity.revcompdt = row.Field<DateTime?>("revcompdt");
         entity.actcompdt = row.Field<DateTime?>("actcompdt");
         entity.estdeptdt = row.Field<DateTime?>("estdeptdt");
         entity.revdeptdt = row.Field<DateTime?>("revdeptdt");
         entity.actdeptdt = row.Field<DateTime?>("actdeptdt");
         entity.estdockarrdt = row.Field<DateTime?>("estdockarrdt");
         entity.revdockarrdt = row.Field<DateTime?>("revdockarrdt");
         entity.actdockarrdt = row.Field<DateTime?>("actdockarrdt");
         entity.estdockreddt = row.Field<DateTime?>("estdockreddt");
         entity.revdockreddt = row.Field<DateTime?>("revdockreddt");
         entity.actdockreddt = row.Field<DateTime?>("actdockreddt");
         entity.estdockdemudt = row.Field<DateTime?>("estdockdemudt");
         entity.revdemudt = row.Field<DateTime?>("revdemudt");
         entity.actdockdemudt = row.Field<DateTime?>("actdockdemudt");
         entity.estatwhsedt = row.Field<DateTime?>("estatwhsedt");
         entity.revatwhsedt = row.Field<DateTime?>("revatwhsedt");
         entity.actatwhsedt = row.Field<DateTime?>("actatwhsedt");
         entity.estlastfreedt = row.Field<DateTime?>("estlastfreedt");
         entity.revlastfreedt = row.Field<DateTime?>("revlastfreedt");
         entity.actlastfreedt = row.Field<DateTime?>("actlastfreedt");
         entity.estwhseunldt = row.Field<DateTime?>("estwhseunldt");
         entity.revwhseunldt = row.Field<DateTime?>("revwhseunldt");
         entity.actwhseunldt = row.Field<DateTime?>("actwhseunldt");
         entity.estemptydt = row.Field<DateTime?>("estemptydt");
         entity.revemptydt = row.Field<DateTime?>("revemptydt");
         entity.actemptydt = row.Field<DateTime?>("actemptydt");
         entity.estretdt = row.Field<DateTime?>("estretdt");
         entity.revretdt = row.Field<DateTime?>("revretdt");
         entity.actretdt = row.Field<DateTime?>("actretdt");
         entity.seecostfl = row.Field<bool>("seecostfl");
         entity.additaddonallowed = row.Field<bool>("additaddonallowed");
         entity.additaddonamt = row.IsNull("additaddonamt") ? decimal.Zero : row.Field<decimal>("additaddonamt");
         entity.totqtyord = row.IsNull("totqtyord") ? decimal.Zero : row.Field<decimal>("totqtyord");
         entity.totcubes = row.IsNull("totcubes") ? decimal.Zero : row.Field<decimal>("totcubes");
         entity.totlineamt = row.IsNull("totlineamt") ? decimal.Zero : row.Field<decimal>("totlineamt");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOtittracktotals(ref DataRow row, Otittracktotals entity)
      {
         row.SetField("trackno", entity.trackno);
         row.SetField("addondesc-1", entity.addondesc1);
         row.SetField("addonamt-1", entity.addonamt1);
         row.SetField("addontype-1", entity.addontype1);
         row.SetField("addonnet-1", entity.addonnet1);
         row.SetField("addondesc-2", entity.addondesc2);
         row.SetField("addonamt-2", entity.addonamt2);
         row.SetField("addontype-2", entity.addontype2);
         row.SetField("addonnet-2", entity.addonnet2);
         row.SetField("addondesc-3", entity.addondesc3);
         row.SetField("addonamt-3", entity.addonamt3);
         row.SetField("addontype-3", entity.addontype3);
         row.SetField("addonnet-3", entity.addonnet3);
         row.SetField("addondesc-4", entity.addondesc4);
         row.SetField("addonamt-4", entity.addonamt4);
         row.SetField("addontype-4", entity.addontype4);
         row.SetField("addonnet-4", entity.addonnet4);
         row.SetField("estprodstdt", entity.estprodstdt);
         row.SetField("revprodstdt", entity.revprodstdt);
         row.SetField("actprodstdt", entity.actprodstdt);
         row.SetField("estcompdt", entity.estcompdt);
         row.SetField("revcompdt", entity.revcompdt);
         row.SetField("actcompdt", entity.actcompdt);
         row.SetField("estdeptdt", entity.estdeptdt);
         row.SetField("revdeptdt", entity.revdeptdt);
         row.SetField("actdeptdt", entity.actdeptdt);
         row.SetField("estdockarrdt", entity.estdockarrdt);
         row.SetField("revdockarrdt", entity.revdockarrdt);
         row.SetField("actdockarrdt", entity.actdockarrdt);
         row.SetField("estdockreddt", entity.estdockreddt);
         row.SetField("revdockreddt", entity.revdockreddt);
         row.SetField("actdockreddt", entity.actdockreddt);
         row.SetField("estdockdemudt", entity.estdockdemudt);
         row.SetField("revdemudt", entity.revdemudt);
         row.SetField("actdockdemudt", entity.actdockdemudt);
         row.SetField("estatwhsedt", entity.estatwhsedt);
         row.SetField("revatwhsedt", entity.revatwhsedt);
         row.SetField("actatwhsedt", entity.actatwhsedt);
         row.SetField("estlastfreedt", entity.estlastfreedt);
         row.SetField("revlastfreedt", entity.revlastfreedt);
         row.SetField("actlastfreedt", entity.actlastfreedt);
         row.SetField("estwhseunldt", entity.estwhseunldt);
         row.SetField("revwhseunldt", entity.revwhseunldt);
         row.SetField("actwhseunldt", entity.actwhseunldt);
         row.SetField("estemptydt", entity.estemptydt);
         row.SetField("revemptydt", entity.revemptydt);
         row.SetField("actemptydt", entity.actemptydt);
         row.SetField("estretdt", entity.estretdt);
         row.SetField("revretdt", entity.revretdt);
         row.SetField("actretdt", entity.actretdt);
         row.SetField("seecostfl", entity.seecostfl);
         row.SetField("additaddonallowed", entity.additaddonallowed);
         row.SetField("additaddonamt", entity.additaddonamt);
         row.SetField("totqtyord", entity.totqtyord);
         row.SetField("totcubes", entity.totcubes);
         row.SetField("totlineamt", entity.totlineamt);
         row.SetField("totweight", entity.totweight);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
