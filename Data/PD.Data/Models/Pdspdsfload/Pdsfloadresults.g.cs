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

namespace Infor.Sxe.PD.Data.Models.Pdspdsfload
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdsfload.Pdsfloadresults")]
   public partial class Pdsfloadresults : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodnotesfl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public DateTime? effectdt { get; set; }
      [StringValidationAttribute]
      public string basetype { get; set; }
      [StringValidationAttribute]
      public string basetypedesc { get; set; }
      public decimal baseprice { get; set; }
      [StringValidationAttribute]
      public string listtype { get; set; }
      [StringValidationAttribute]
      public string listtypedesc { get; set; }
      public decimal listprice { get; set; }
      [StringValidationAttribute]
      public string repltype { get; set; }
      [StringValidationAttribute]
      public string repltypedesc { get; set; }
      public bool replenable { get; set; }
      public decimal replcost { get; set; }
      [StringValidationAttribute]
      public string stndtype { get; set; }
      [StringValidationAttribute]
      public string stndtypedesc { get; set; }
      public bool stndenable { get; set; }
      public decimal stndcost { get; set; }
      [StringValidationAttribute]
      public string pround { get; set; }
      [StringValidationAttribute]
      public string prounddesc { get; set; }
      public int ptarget { get; set; }
      [StringValidationAttribute]
      public string ptargetdesc { get; set; }
      public decimal pexactrnd { get; set; }
      [StringValidationAttribute]
      public string pricetype { get; set; }
      [StringValidationAttribute]
      public string pdsfrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsfloadresults BuildPdsfloadresultsFromRow(DataRow row)
      {
         Pdsfloadresults entity = new Pdsfloadresults();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodnotesfl = row.IsNull("prodnotesfl") ? string.Empty : row.Field<string>("prodnotesfl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.effectdt = row.Field<DateTime?>("effectdt");
         entity.basetype = row.IsNull("basetype") ? string.Empty : row.Field<string>("basetype");
         entity.basetypedesc = row.IsNull("basetypedesc") ? string.Empty : row.Field<string>("basetypedesc");
         entity.baseprice = row.IsNull("baseprice") ? decimal.Zero : row.Field<decimal>("baseprice");
         entity.listtype = row.IsNull("listtype") ? string.Empty : row.Field<string>("listtype");
         entity.listtypedesc = row.IsNull("listtypedesc") ? string.Empty : row.Field<string>("listtypedesc");
         entity.listprice = row.IsNull("listprice") ? decimal.Zero : row.Field<decimal>("listprice");
         entity.repltype = row.IsNull("repltype") ? string.Empty : row.Field<string>("repltype");
         entity.repltypedesc = row.IsNull("repltypedesc") ? string.Empty : row.Field<string>("repltypedesc");
         entity.replenable = row.Field<bool>("replenable");
         entity.replcost = row.IsNull("replcost") ? decimal.Zero : row.Field<decimal>("replcost");
         entity.stndtype = row.IsNull("stndtype") ? string.Empty : row.Field<string>("stndtype");
         entity.stndtypedesc = row.IsNull("stndtypedesc") ? string.Empty : row.Field<string>("stndtypedesc");
         entity.stndenable = row.Field<bool>("stndenable");
         entity.stndcost = row.IsNull("stndcost") ? decimal.Zero : row.Field<decimal>("stndcost");
         entity.pround = row.IsNull("pround") ? string.Empty : row.Field<string>("pround");
         entity.prounddesc = row.IsNull("prounddesc") ? string.Empty : row.Field<string>("prounddesc");
         entity.ptarget = row.IsNull("ptarget") ? 0 : row.Field<int>("ptarget");
         entity.ptargetdesc = row.IsNull("ptargetdesc") ? string.Empty : row.Field<string>("ptargetdesc");
         entity.pexactrnd = row.IsNull("pexactrnd") ? decimal.Zero : row.Field<decimal>("pexactrnd");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.pdsfrowid = row.Field<byte[]>("pdsfrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsfloadresults(ref DataRow row, Pdsfloadresults entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("prodnotesfl", entity.prodnotesfl);
         row.SetField("whse", entity.whse);
         row.SetField("effectdt", entity.effectdt);
         row.SetField("basetype", entity.basetype);
         row.SetField("basetypedesc", entity.basetypedesc);
         row.SetField("baseprice", entity.baseprice);
         row.SetField("listtype", entity.listtype);
         row.SetField("listtypedesc", entity.listtypedesc);
         row.SetField("listprice", entity.listprice);
         row.SetField("repltype", entity.repltype);
         row.SetField("repltypedesc", entity.repltypedesc);
         row.SetField("replenable", entity.replenable);
         row.SetField("replcost", entity.replcost);
         row.SetField("stndtype", entity.stndtype);
         row.SetField("stndtypedesc", entity.stndtypedesc);
         row.SetField("stndenable", entity.stndenable);
         row.SetField("stndcost", entity.stndcost);
         row.SetField("pround", entity.pround);
         row.SetField("prounddesc", entity.prounddesc);
         row.SetField("ptarget", entity.ptarget);
         row.SetField("ptargetdesc", entity.ptargetdesc);
         row.SetField("pexactrnd", entity.pexactrnd);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("pdsfrowid", entity.pdsfrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
