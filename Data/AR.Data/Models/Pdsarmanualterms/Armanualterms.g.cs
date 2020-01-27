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

namespace Infor.Sxe.AR.Data.Models.Pdsarmanualterms
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarmanualterms.Armanualterms")]
   public partial class Armanualterms : ModelBase, IUserFields
   {
      public int transcd { get; set; }
      public decimal amount { get; set; }
      public decimal gstamt { get; set; }
      public decimal pstamt { get; set; }
      [StringValidationAttribute]
      public string tAddon1label { get; set; }
      [StringValidationAttribute]
      public string tAddon2label { get; set; }
      [StringValidationAttribute]
      public string aTermstype { get; set; }
      public decimal tAddon1 { get; set; }
      public decimal tAddon2 { get; set; }
      public decimal tDiscamt { get; set; }
      public int tDiscdays { get; set; }
      public DateTime? tDiscdt { get; set; }
      public decimal tDiscpct { get; set; }
      public int tDuedays { get; set; }
      public DateTime? tDuedt { get; set; }
      public int tFreqdays { get; set; }
      public int tNopays { get; set; }
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
      public decimal vAddondist { get; set; }
      public bool vExpaddfl { get; set; }
      public bool vGrossnetfl { get; set; }
      public bool vImmedpyfl { get; set; }
      public bool vManamtfl { get; set; }
      public bool vMandiscfl { get; set; }
      public bool vManduefl { get; set; }
      public bool vTermsfl { get; set; }
      public bool lInclAddonsFl { get; set; }
      public int vAddon1 { get; set; }
      public int vAddon2 { get; set; }
      public int vAddon3 { get; set; }
      public int vAddon4 { get; set; }
      public int vAddon5 { get; set; }
      public int vAddon6 { get; set; }
      public int vAddon7 { get; set; }
      public int vAddon8 { get; set; }
      public decimal oAddon1 { get; set; }
      public decimal oAddon2 { get; set; }
      public DateTime? oDiscdt { get; set; }
      public decimal oDiscamt { get; set; }
      public decimal oDiscpct { get; set; }
      public DateTime? oDuedt { get; set; }
      public int oNopays { get; set; }
      public int oFreqdays { get; set; }
      public bool tAddonenabled { get; set; }
      public bool tDiscdtenabled { get; set; }
      public bool tDuedtenabled { get; set; }
      public bool tFreqdaysenabled { get; set; }
      public bool tNopaysenabled { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Armanualterms BuildArmanualtermsFromRow(DataRow row)
      {
         Armanualterms entity = new Armanualterms();
         entity.transcd = row.IsNull("transcd") ? 0 : row.Field<int>("transcd");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.gstamt = row.IsNull("gstamt") ? decimal.Zero : row.Field<decimal>("gstamt");
         entity.pstamt = row.IsNull("pstamt") ? decimal.Zero : row.Field<decimal>("pstamt");
         entity.tAddon1label = row.IsNull("t-addon1label") ? string.Empty : row.Field<string>("t-addon1label");
         entity.tAddon2label = row.IsNull("t-addon2label") ? string.Empty : row.Field<string>("t-addon2label");
         entity.aTermstype = row.IsNull("a-termstype") ? string.Empty : row.Field<string>("a-termstype");
         entity.tAddon1 = row.IsNull("t-addon1") ? decimal.Zero : row.Field<decimal>("t-addon1");
         entity.tAddon2 = row.IsNull("t-addon2") ? decimal.Zero : row.Field<decimal>("t-addon2");
         entity.tDiscamt = row.IsNull("t-discamt") ? decimal.Zero : row.Field<decimal>("t-discamt");
         entity.tDiscdays = row.IsNull("t-discdays") ? 0 : row.Field<int>("t-discdays");
         entity.tDiscdt = row.Field<DateTime?>("t-discdt");
         entity.tDiscpct = row.IsNull("t-discpct") ? decimal.Zero : row.Field<decimal>("t-discpct");
         entity.tDuedays = row.IsNull("t-duedays") ? 0 : row.Field<int>("t-duedays");
         entity.tDuedt = row.Field<DateTime?>("t-duedt");
         entity.tFreqdays = row.IsNull("t-freqdays") ? 0 : row.Field<int>("t-freqdays");
         entity.tNopays = row.IsNull("t-nopays") ? 0 : row.Field<int>("t-nopays");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.vAddondist = row.IsNull("v-addondist") ? decimal.Zero : row.Field<decimal>("v-addondist");
         entity.vExpaddfl = row.Field<bool>("v-expaddfl");
         entity.vGrossnetfl = row.Field<bool>("v-grossnetfl");
         entity.vImmedpyfl = row.Field<bool>("v-immedpyfl");
         entity.vManamtfl = row.Field<bool>("v-manamtfl");
         entity.vMandiscfl = row.Field<bool>("v-mandiscfl");
         entity.vManduefl = row.Field<bool>("v-manduefl");
         entity.vTermsfl = row.Field<bool>("v-termsfl");
         entity.lInclAddonsFl = row.Field<bool>("lInclAddonsFl");
         entity.vAddon1 = row.IsNull("v-addon1") ? 0 : row.Field<int>("v-addon1");
         entity.vAddon2 = row.IsNull("v-addon2") ? 0 : row.Field<int>("v-addon2");
         entity.vAddon3 = row.IsNull("v-addon3") ? 0 : row.Field<int>("v-addon3");
         entity.vAddon4 = row.IsNull("v-addon4") ? 0 : row.Field<int>("v-addon4");
         entity.vAddon5 = row.IsNull("v-addon5") ? 0 : row.Field<int>("v-addon5");
         entity.vAddon6 = row.IsNull("v-addon6") ? 0 : row.Field<int>("v-addon6");
         entity.vAddon7 = row.IsNull("v-addon7") ? 0 : row.Field<int>("v-addon7");
         entity.vAddon8 = row.IsNull("v-addon8") ? 0 : row.Field<int>("v-addon8");
         entity.oAddon1 = row.IsNull("o-addon1") ? decimal.Zero : row.Field<decimal>("o-addon1");
         entity.oAddon2 = row.IsNull("o-addon2") ? decimal.Zero : row.Field<decimal>("o-addon2");
         entity.oDiscdt = row.Field<DateTime?>("o-discdt");
         entity.oDiscamt = row.IsNull("o-discamt") ? decimal.Zero : row.Field<decimal>("o-discamt");
         entity.oDiscpct = row.IsNull("o-discpct") ? decimal.Zero : row.Field<decimal>("o-discpct");
         entity.oDuedt = row.Field<DateTime?>("o-duedt");
         entity.oNopays = row.IsNull("o-nopays") ? 0 : row.Field<int>("o-nopays");
         entity.oFreqdays = row.IsNull("o-freqdays") ? 0 : row.Field<int>("o-freqdays");
         entity.tAddonenabled = row.Field<bool>("t-addonenabled");
         entity.tDiscdtenabled = row.Field<bool>("t-discdtenabled");
         entity.tDuedtenabled = row.Field<bool>("t-duedtenabled");
         entity.tFreqdaysenabled = row.Field<bool>("t-freqdaysenabled");
         entity.tNopaysenabled = row.Field<bool>("t-nopaysenabled");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArmanualterms(ref DataRow row, Armanualterms entity)
      {
         row.SetField("transcd", entity.transcd);
         row.SetField("amount", entity.amount);
         row.SetField("gstamt", entity.gstamt);
         row.SetField("pstamt", entity.pstamt);
         row.SetField("t-addon1label", entity.tAddon1label);
         row.SetField("t-addon2label", entity.tAddon2label);
         row.SetField("a-termstype", entity.aTermstype);
         row.SetField("t-addon1", entity.tAddon1);
         row.SetField("t-addon2", entity.tAddon2);
         row.SetField("t-discamt", entity.tDiscamt);
         row.SetField("t-discdays", entity.tDiscdays);
         row.SetField("t-discdt", entity.tDiscdt);
         row.SetField("t-discpct", entity.tDiscpct);
         row.SetField("t-duedays", entity.tDuedays);
         row.SetField("t-duedt", entity.tDuedt);
         row.SetField("t-freqdays", entity.tFreqdays);
         row.SetField("t-nopays", entity.tNopays);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("v-addondist", entity.vAddondist);
         row.SetField("v-expaddfl", entity.vExpaddfl);
         row.SetField("v-grossnetfl", entity.vGrossnetfl);
         row.SetField("v-immedpyfl", entity.vImmedpyfl);
         row.SetField("v-manamtfl", entity.vManamtfl);
         row.SetField("v-mandiscfl", entity.vMandiscfl);
         row.SetField("v-manduefl", entity.vManduefl);
         row.SetField("v-termsfl", entity.vTermsfl);
         row.SetField("lInclAddonsFl", entity.lInclAddonsFl);
         row.SetField("v-addon1", entity.vAddon1);
         row.SetField("v-addon2", entity.vAddon2);
         row.SetField("v-addon3", entity.vAddon3);
         row.SetField("v-addon4", entity.vAddon4);
         row.SetField("v-addon5", entity.vAddon5);
         row.SetField("v-addon6", entity.vAddon6);
         row.SetField("v-addon7", entity.vAddon7);
         row.SetField("v-addon8", entity.vAddon8);
         row.SetField("o-addon1", entity.oAddon1);
         row.SetField("o-addon2", entity.oAddon2);
         row.SetField("o-discdt", entity.oDiscdt);
         row.SetField("o-discamt", entity.oDiscamt);
         row.SetField("o-discpct", entity.oDiscpct);
         row.SetField("o-duedt", entity.oDuedt);
         row.SetField("o-nopays", entity.oNopays);
         row.SetField("o-freqdays", entity.oFreqdays);
         row.SetField("t-addonenabled", entity.tAddonenabled);
         row.SetField("t-discdtenabled", entity.tDiscdtenabled);
         row.SetField("t-duedtenabled", entity.tDuedtenabled);
         row.SetField("t-freqdaysenabled", entity.tFreqdaysenabled);
         row.SetField("t-nopaysenabled", entity.tNopaysenabled);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
