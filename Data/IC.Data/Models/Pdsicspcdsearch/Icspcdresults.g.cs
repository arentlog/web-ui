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

namespace Infor.Sxe.IC.Data.Models.Pdsicspcdsearch
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicspcdsearch.Icspcdresults")]
   public partial class Icspcdresults : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string product { get; set; }
      public bool allowpullqtyfl { get; set; }
      public bool replenishfl { get; set; }
      public decimal qtyrequired { get; set; }
      public decimal qtyreserved { get; set; }
      public decimal qtyexpected { get; set; }
      public decimal qtysold { get; set; }
      public DateTime? lastinvdt { get; set; }
      public DateTime? createdt { get; set; }
      public decimal qtyavail { get; set; }
      public decimal qtybo { get; set; }
      public int expectedratepct { get; set; }
      public decimal qtyforecast1 { get; set; }
      public decimal qtyforecast2 { get; set; }
      public decimal qtyforecast3 { get; set; }
      public decimal qtyforecast4 { get; set; }
      public decimal qtyforecast5 { get; set; }
      public decimal qtyforecast6 { get; set; }
      public decimal qtyforecast7 { get; set; }
      public decimal qtyforecast8 { get; set; }
      public decimal qtyforecast9 { get; set; }
      public decimal qtyforecast10 { get; set; }
      public decimal qtyforecast11 { get; set; }
      public decimal qtyforecast12 { get; set; }
      public decimal qtyactual1 { get; set; }
      public decimal qtyactual2 { get; set; }
      public decimal qtyactual3 { get; set; }
      public decimal qtyactual4 { get; set; }
      public decimal qtyactual5 { get; set; }
      public decimal qtyactual6 { get; set; }
      public decimal qtyactual7 { get; set; }
      public decimal qtyactual8 { get; set; }
      public decimal qtyactual9 { get; set; }
      public decimal qtyactual10 { get; set; }
      public decimal qtyactual11 { get; set; }
      public decimal qtyactual12 { get; set; }
      [StringValidationAttribute]
      public string monthlabel1 { get; set; }
      [StringValidationAttribute]
      public string monthlabel2 { get; set; }
      [StringValidationAttribute]
      public string monthlabel3 { get; set; }
      [StringValidationAttribute]
      public string monthlabel4 { get; set; }
      [StringValidationAttribute]
      public string monthlabel5 { get; set; }
      [StringValidationAttribute]
      public string monthlabel6 { get; set; }
      [StringValidationAttribute]
      public string monthlabel7 { get; set; }
      [StringValidationAttribute]
      public string monthlabel8 { get; set; }
      [StringValidationAttribute]
      public string monthlabel9 { get; set; }
      [StringValidationAttribute]
      public string monthlabel10 { get; set; }
      [StringValidationAttribute]
      public string monthlabel11 { get; set; }
      [StringValidationAttribute]
      public string monthlabel12 { get; set; }
      public int cono { get; set; }
      [StringValidationAttribute]
      public string srcrowpointer { get; set; }
      [StringValidationAttribute]
      public string icsprowpointer { get; set; }
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
      public string userfield { get; set; }


      public static Icspcdresults BuildIcspcdresultsFromRow(DataRow row)
      {
         Icspcdresults entity = new Icspcdresults();
         entity.product = row.IsNull("product") ? string.Empty : row.Field<string>("product");
         entity.allowpullqtyfl = row.Field<bool>("allowpullqtyfl");
         entity.replenishfl = row.Field<bool>("replenishfl");
         entity.qtyrequired = row.IsNull("qtyrequired") ? decimal.Zero : row.Field<decimal>("qtyrequired");
         entity.qtyreserved = row.IsNull("qtyreserved") ? decimal.Zero : row.Field<decimal>("qtyreserved");
         entity.qtyexpected = row.IsNull("qtyexpected") ? decimal.Zero : row.Field<decimal>("qtyexpected");
         entity.qtysold = row.IsNull("qtysold") ? decimal.Zero : row.Field<decimal>("qtysold");
         entity.lastinvdt = row.Field<DateTime?>("lastinvdt");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.qtyavail = row.IsNull("qtyavail") ? decimal.Zero : row.Field<decimal>("qtyavail");
         entity.qtybo = row.IsNull("qtybo") ? decimal.Zero : row.Field<decimal>("qtybo");
         entity.expectedratepct = row.IsNull("expectedratepct") ? 0 : row.Field<int>("expectedratepct");
         entity.qtyforecast1 = row.IsNull("qtyforecast1") ? decimal.Zero : row.Field<decimal>("qtyforecast1");
         entity.qtyforecast2 = row.IsNull("qtyforecast2") ? decimal.Zero : row.Field<decimal>("qtyforecast2");
         entity.qtyforecast3 = row.IsNull("qtyforecast3") ? decimal.Zero : row.Field<decimal>("qtyforecast3");
         entity.qtyforecast4 = row.IsNull("qtyforecast4") ? decimal.Zero : row.Field<decimal>("qtyforecast4");
         entity.qtyforecast5 = row.IsNull("qtyforecast5") ? decimal.Zero : row.Field<decimal>("qtyforecast5");
         entity.qtyforecast6 = row.IsNull("qtyforecast6") ? decimal.Zero : row.Field<decimal>("qtyforecast6");
         entity.qtyforecast7 = row.IsNull("qtyforecast7") ? decimal.Zero : row.Field<decimal>("qtyforecast7");
         entity.qtyforecast8 = row.IsNull("qtyforecast8") ? decimal.Zero : row.Field<decimal>("qtyforecast8");
         entity.qtyforecast9 = row.IsNull("qtyforecast9") ? decimal.Zero : row.Field<decimal>("qtyforecast9");
         entity.qtyforecast10 = row.IsNull("qtyforecast10") ? decimal.Zero : row.Field<decimal>("qtyforecast10");
         entity.qtyforecast11 = row.IsNull("qtyforecast11") ? decimal.Zero : row.Field<decimal>("qtyforecast11");
         entity.qtyforecast12 = row.IsNull("qtyforecast12") ? decimal.Zero : row.Field<decimal>("qtyforecast12");
         entity.qtyactual1 = row.IsNull("qtyactual1") ? decimal.Zero : row.Field<decimal>("qtyactual1");
         entity.qtyactual2 = row.IsNull("qtyactual2") ? decimal.Zero : row.Field<decimal>("qtyactual2");
         entity.qtyactual3 = row.IsNull("qtyactual3") ? decimal.Zero : row.Field<decimal>("qtyactual3");
         entity.qtyactual4 = row.IsNull("qtyactual4") ? decimal.Zero : row.Field<decimal>("qtyactual4");
         entity.qtyactual5 = row.IsNull("qtyactual5") ? decimal.Zero : row.Field<decimal>("qtyactual5");
         entity.qtyactual6 = row.IsNull("qtyactual6") ? decimal.Zero : row.Field<decimal>("qtyactual6");
         entity.qtyactual7 = row.IsNull("qtyactual7") ? decimal.Zero : row.Field<decimal>("qtyactual7");
         entity.qtyactual8 = row.IsNull("qtyactual8") ? decimal.Zero : row.Field<decimal>("qtyactual8");
         entity.qtyactual9 = row.IsNull("qtyactual9") ? decimal.Zero : row.Field<decimal>("qtyactual9");
         entity.qtyactual10 = row.IsNull("qtyactual10") ? decimal.Zero : row.Field<decimal>("qtyactual10");
         entity.qtyactual11 = row.IsNull("qtyactual11") ? decimal.Zero : row.Field<decimal>("qtyactual11");
         entity.qtyactual12 = row.IsNull("qtyactual12") ? decimal.Zero : row.Field<decimal>("qtyactual12");
         entity.monthlabel1 = row.IsNull("monthlabel1") ? string.Empty : row.Field<string>("monthlabel1");
         entity.monthlabel2 = row.IsNull("monthlabel2") ? string.Empty : row.Field<string>("monthlabel2");
         entity.monthlabel3 = row.IsNull("monthlabel3") ? string.Empty : row.Field<string>("monthlabel3");
         entity.monthlabel4 = row.IsNull("monthlabel4") ? string.Empty : row.Field<string>("monthlabel4");
         entity.monthlabel5 = row.IsNull("monthlabel5") ? string.Empty : row.Field<string>("monthlabel5");
         entity.monthlabel6 = row.IsNull("monthlabel6") ? string.Empty : row.Field<string>("monthlabel6");
         entity.monthlabel7 = row.IsNull("monthlabel7") ? string.Empty : row.Field<string>("monthlabel7");
         entity.monthlabel8 = row.IsNull("monthlabel8") ? string.Empty : row.Field<string>("monthlabel8");
         entity.monthlabel9 = row.IsNull("monthlabel9") ? string.Empty : row.Field<string>("monthlabel9");
         entity.monthlabel10 = row.IsNull("monthlabel10") ? string.Empty : row.Field<string>("monthlabel10");
         entity.monthlabel11 = row.IsNull("monthlabel11") ? string.Empty : row.Field<string>("monthlabel11");
         entity.monthlabel12 = row.IsNull("monthlabel12") ? string.Empty : row.Field<string>("monthlabel12");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.srcrowpointer = row.IsNull("srcrowpointer") ? string.Empty : row.Field<string>("srcrowpointer");
         entity.icsprowpointer = row.IsNull("icsprowpointer") ? string.Empty : row.Field<string>("icsprowpointer");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcspcdresults(ref DataRow row, Icspcdresults entity)
      {
         row.SetField("product", entity.product);
         row.SetField("allowpullqtyfl", entity.allowpullqtyfl);
         row.SetField("replenishfl", entity.replenishfl);
         row.SetField("qtyrequired", entity.qtyrequired);
         row.SetField("qtyreserved", entity.qtyreserved);
         row.SetField("qtyexpected", entity.qtyexpected);
         row.SetField("qtysold", entity.qtysold);
         row.SetField("lastinvdt", entity.lastinvdt);
         row.SetField("createdt", entity.createdt);
         row.SetField("qtyavail", entity.qtyavail);
         row.SetField("qtybo", entity.qtybo);
         row.SetField("expectedratepct", entity.expectedratepct);
         row.SetField("qtyforecast1", entity.qtyforecast1);
         row.SetField("qtyforecast2", entity.qtyforecast2);
         row.SetField("qtyforecast3", entity.qtyforecast3);
         row.SetField("qtyforecast4", entity.qtyforecast4);
         row.SetField("qtyforecast5", entity.qtyforecast5);
         row.SetField("qtyforecast6", entity.qtyforecast6);
         row.SetField("qtyforecast7", entity.qtyforecast7);
         row.SetField("qtyforecast8", entity.qtyforecast8);
         row.SetField("qtyforecast9", entity.qtyforecast9);
         row.SetField("qtyforecast10", entity.qtyforecast10);
         row.SetField("qtyforecast11", entity.qtyforecast11);
         row.SetField("qtyforecast12", entity.qtyforecast12);
         row.SetField("qtyactual1", entity.qtyactual1);
         row.SetField("qtyactual2", entity.qtyactual2);
         row.SetField("qtyactual3", entity.qtyactual3);
         row.SetField("qtyactual4", entity.qtyactual4);
         row.SetField("qtyactual5", entity.qtyactual5);
         row.SetField("qtyactual6", entity.qtyactual6);
         row.SetField("qtyactual7", entity.qtyactual7);
         row.SetField("qtyactual8", entity.qtyactual8);
         row.SetField("qtyactual9", entity.qtyactual9);
         row.SetField("qtyactual10", entity.qtyactual10);
         row.SetField("qtyactual11", entity.qtyactual11);
         row.SetField("qtyactual12", entity.qtyactual12);
         row.SetField("monthlabel1", entity.monthlabel1);
         row.SetField("monthlabel2", entity.monthlabel2);
         row.SetField("monthlabel3", entity.monthlabel3);
         row.SetField("monthlabel4", entity.monthlabel4);
         row.SetField("monthlabel5", entity.monthlabel5);
         row.SetField("monthlabel6", entity.monthlabel6);
         row.SetField("monthlabel7", entity.monthlabel7);
         row.SetField("monthlabel8", entity.monthlabel8);
         row.SetField("monthlabel9", entity.monthlabel9);
         row.SetField("monthlabel10", entity.monthlabel10);
         row.SetField("monthlabel11", entity.monthlabel11);
         row.SetField("monthlabel12", entity.monthlabel12);
         row.SetField("cono", entity.cono);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("icsprowpointer", entity.icsprowpointer);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
