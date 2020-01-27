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

namespace Infor.Sxe.IC.Data.Models.Pdsbuildcomptt
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsbuildcomptt.Buildcompttresults")]
   public partial class Buildcompttresults : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string comptype { get; set; }
      [StringValidationAttribute]
      public string comunit { get; set; }
      [StringValidationAttribute]
      public string multiple { get; set; }
      public decimal netavail { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      public decimal qtyneeded { get; set; }
      public decimal qtyshort { get; set; }
      public bool reqfl { get; set; }
      [StringValidationAttribute]
      public string seqcomprod { get; set; }
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
      public bool varprodfl { get; set; }
      public bool varqtfl { get; set; }
      [StringValidationAttribute]
      public string compdesc { get; set; }
      public int complevel { get; set; }
      [StringValidationAttribute]
      public string kitdept { get; set; }
      public int leadtm { get; set; }
      public decimal prodcost { get; set; }
      [StringValidationAttribute]
      public string stage { get; set; }
      public decimal prodcostdspl { get; set; }
      public decimal qtyneededdspl { get; set; }
      public decimal netavaildspl { get; set; }
      public decimal qtyshortdspl { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Buildcompttresults BuildBuildcompttresultsFromRow(DataRow row)
      {
         Buildcompttresults entity = new Buildcompttresults();
         entity.comptype = row.IsNull("comptype") ? string.Empty : row.Field<string>("comptype");
         entity.comunit = row.IsNull("comunit") ? string.Empty : row.Field<string>("comunit");
         entity.multiple = row.IsNull("multiple") ? string.Empty : row.Field<string>("multiple");
         entity.netavail = row.IsNull("netavail") ? decimal.Zero : row.Field<decimal>("netavail");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.qtyneeded = row.IsNull("qtyneeded") ? decimal.Zero : row.Field<decimal>("qtyneeded");
         entity.qtyshort = row.IsNull("qtyshort") ? decimal.Zero : row.Field<decimal>("qtyshort");
         entity.reqfl = row.Field<bool>("reqfl");
         entity.seqcomprod = row.IsNull("seqcomprod") ? string.Empty : row.Field<string>("seqcomprod");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.varprodfl = row.Field<bool>("varprodfl");
         entity.varqtfl = row.Field<bool>("varqtfl");
         entity.compdesc = row.IsNull("compdesc") ? string.Empty : row.Field<string>("compdesc");
         entity.complevel = row.IsNull("complevel") ? 0 : row.Field<int>("complevel");
         entity.kitdept = row.IsNull("kitdept") ? string.Empty : row.Field<string>("kitdept");
         entity.leadtm = row.IsNull("leadtm") ? 0 : row.Field<int>("leadtm");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.stage = row.IsNull("stage") ? string.Empty : row.Field<string>("stage");
         entity.prodcostdspl = row.IsNull("prodcostdspl") ? decimal.Zero : row.Field<decimal>("prodcostdspl");
         entity.qtyneededdspl = row.IsNull("qtyneededdspl") ? decimal.Zero : row.Field<decimal>("qtyneededdspl");
         entity.netavaildspl = row.IsNull("netavaildspl") ? decimal.Zero : row.Field<decimal>("netavaildspl");
         entity.qtyshortdspl = row.IsNull("qtyshortdspl") ? decimal.Zero : row.Field<decimal>("qtyshortdspl");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromBuildcompttresults(ref DataRow row, Buildcompttresults entity)
      {
         row.SetField("comptype", entity.comptype);
         row.SetField("comunit", entity.comunit);
         row.SetField("multiple", entity.multiple);
         row.SetField("netavail", entity.netavail);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("qtyneeded", entity.qtyneeded);
         row.SetField("qtyshort", entity.qtyshort);
         row.SetField("reqfl", entity.reqfl);
         row.SetField("seqcomprod", entity.seqcomprod);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("varprodfl", entity.varprodfl);
         row.SetField("varqtfl", entity.varqtfl);
         row.SetField("compdesc", entity.compdesc);
         row.SetField("complevel", entity.complevel);
         row.SetField("kitdept", entity.kitdept);
         row.SetField("leadtm", entity.leadtm);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("stage", entity.stage);
         row.SetField("prodcostdspl", entity.prodcostdspl);
         row.SetField("qtyneededdspl", entity.qtyneededdspl);
         row.SetField("netavaildspl", entity.netavaildspl);
         row.SetField("qtyshortdspl", entity.qtyshortdspl);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
