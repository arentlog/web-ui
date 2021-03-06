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

namespace Infor.Sxe.IC.Data.Models.Pdsicamumain
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamumain.Icamuresults")]
   public partial class Icamuresults : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string extdescrip { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string recordtype { get; set; }
      public bool activefl { get; set; }
      public int @class { get; set; }
      public decimal orderpt { get; set; }
      public decimal linept { get; set; }
      public decimal orderqty { get; set; }
      [StringValidationAttribute]
      public string seasontype { get; set; }
      [StringValidationAttribute]
      public string frozenmmyy { get; set; }
      public int frozenmos { get; set; }
      [StringValidationAttribute]
      public string frozentype { get; set; }
      [StringValidationAttribute]
      public string frozentypedesc { get; set; }
      [StringValidationAttribute]
      public string icswfrozenmmyy { get; set; }
      [StringValidationAttribute]
      public string icswfrozentype { get; set; }
      [StringValidationAttribute]
      public string icswfrzntypedesc { get; set; }
      public int icswclass { get; set; }
      [StringValidationAttribute]
      public string frozentypes { get; set; }
      [StringValidationAttribute]
      public string frozendesc { get; set; }
      [StringValidationAttribute]
      public string statusmess { get; set; }
      [StringValidationAttribute]
      public string updatemess { get; set; }
      [StringValidationAttribute]
      public string icsprowid { get; set; }
      public int linehits { get; set; }
      public decimal oorderpt { get; set; }
      public decimal olinept { get; set; }
      [StringValidationAttribute]
      public string whserank { get; set; }
      public decimal safetyqty { get; set; }
      public decimal usage { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string statusdesc { get; set; }
      [StringValidationAttribute]
      public string abcrankty { get; set; }
      [StringValidationAttribute]
      public string ncnr { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      [StringValidationAttribute]
      public string countryname { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamuresults BuildIcamuresultsFromRow(DataRow row)
      {
         Icamuresults entity = new Icamuresults();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.extdescrip = row.IsNull("extdescrip") ? string.Empty : row.Field<string>("extdescrip");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.activefl = row.Field<bool>("activefl");
         entity.@class = row.IsNull("class") ? 0 : row.Field<int>("class");
         entity.orderpt = row.IsNull("orderpt") ? decimal.Zero : row.Field<decimal>("orderpt");
         entity.linept = row.IsNull("linept") ? decimal.Zero : row.Field<decimal>("linept");
         entity.orderqty = row.IsNull("orderqty") ? decimal.Zero : row.Field<decimal>("orderqty");
         entity.seasontype = row.IsNull("seasontype") ? string.Empty : row.Field<string>("seasontype");
         entity.frozenmmyy = row.IsNull("frozenmmyy") ? string.Empty : row.Field<string>("frozenmmyy");
         entity.frozenmos = row.IsNull("frozenmos") ? 0 : row.Field<int>("frozenmos");
         entity.frozentype = row.IsNull("frozentype") ? string.Empty : row.Field<string>("frozentype");
         entity.frozentypedesc = row.IsNull("frozentypedesc") ? string.Empty : row.Field<string>("frozentypedesc");
         entity.icswfrozenmmyy = row.IsNull("icswfrozenmmyy") ? string.Empty : row.Field<string>("icswfrozenmmyy");
         entity.icswfrozentype = row.IsNull("icswfrozentype") ? string.Empty : row.Field<string>("icswfrozentype");
         entity.icswfrzntypedesc = row.IsNull("icswfrzntypedesc") ? string.Empty : row.Field<string>("icswfrzntypedesc");
         entity.icswclass = row.IsNull("icswclass") ? 0 : row.Field<int>("icswclass");
         entity.frozentypes = row.IsNull("frozentypes") ? string.Empty : row.Field<string>("frozentypes");
         entity.frozendesc = row.IsNull("frozendesc") ? string.Empty : row.Field<string>("frozendesc");
         entity.statusmess = row.IsNull("statusmess") ? string.Empty : row.Field<string>("statusmess");
         entity.updatemess = row.IsNull("updatemess") ? string.Empty : row.Field<string>("updatemess");
         entity.icsprowid = row.Field<byte[]>("icsprowid").ToStringEncoded();
         entity.linehits = row.IsNull("linehits") ? 0 : row.Field<int>("linehits");
         entity.oorderpt = row.IsNull("oorderpt") ? decimal.Zero : row.Field<decimal>("oorderpt");
         entity.olinept = row.IsNull("olinept") ? decimal.Zero : row.Field<decimal>("olinept");
         entity.whserank = row.IsNull("whserank") ? string.Empty : row.Field<string>("whserank");
         entity.safetyqty = row.IsNull("safetyqty") ? decimal.Zero : row.Field<decimal>("safetyqty");
         entity.usage = row.IsNull("usage") ? decimal.Zero : row.Field<decimal>("usage");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.statusdesc = row.IsNull("statusdesc") ? string.Empty : row.Field<string>("statusdesc");
         entity.abcrankty = row.IsNull("abcrankty") ? string.Empty : row.Field<string>("abcrankty");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.countryname = row.IsNull("countryname") ? string.Empty : row.Field<string>("countryname");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamuresults(ref DataRow row, Icamuresults entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("descrip", entity.descrip);
         row.SetField("extdescrip", entity.extdescrip);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("recordtype", entity.recordtype);
         row.SetField("activefl", entity.activefl);
         row.SetField("class", entity.@class);
         row.SetField("orderpt", entity.orderpt);
         row.SetField("linept", entity.linept);
         row.SetField("orderqty", entity.orderqty);
         row.SetField("seasontype", entity.seasontype);
         row.SetField("frozenmmyy", entity.frozenmmyy);
         row.SetField("frozenmos", entity.frozenmos);
         row.SetField("frozentype", entity.frozentype);
         row.SetField("frozentypedesc", entity.frozentypedesc);
         row.SetField("icswfrozenmmyy", entity.icswfrozenmmyy);
         row.SetField("icswfrozentype", entity.icswfrozentype);
         row.SetField("icswfrzntypedesc", entity.icswfrzntypedesc);
         row.SetField("icswclass", entity.icswclass);
         row.SetField("frozentypes", entity.frozentypes);
         row.SetField("frozendesc", entity.frozendesc);
         row.SetField("statusmess", entity.statusmess);
         row.SetField("updatemess", entity.updatemess);
         row.SetField("icsprowid", entity.icsprowid.ToByteArray());
         row.SetField("linehits", entity.linehits);
         row.SetField("oorderpt", entity.oorderpt);
         row.SetField("olinept", entity.olinept);
         row.SetField("whserank", entity.whserank);
         row.SetField("safetyqty", entity.safetyqty);
         row.SetField("usage", entity.usage);
         row.SetField("statustype", entity.statustype);
         row.SetField("statusdesc", entity.statusdesc);
         row.SetField("abcrankty", entity.abcrankty);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("countryname", entity.countryname);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
