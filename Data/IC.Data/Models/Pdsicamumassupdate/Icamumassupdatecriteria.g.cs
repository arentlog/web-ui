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

namespace Infor.Sxe.IC.Data.Models.Pdsicamumassupdate
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamumassupdate.Icamumassupdatecriteria")]
   public partial class Icamumassupdatecriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public bool activefl { get; set; }
      [StringValidationAttribute]
      public string seasontype { get; set; }
      [StringValidationAttribute]
      public string statusmess { get; set; }
      [StringValidationAttribute]
      public string updatemess { get; set; }
      public decimal orderpt { get; set; }
      public decimal linept { get; set; }
      public decimal orderqty { get; set; }
      public int frozenmos { get; set; }
      [StringValidationAttribute]
      public string icswfrozenmmyy { get; set; }
      [StringValidationAttribute]
      public string icswfrozentype { get; set; }
      [StringValidationAttribute]
      public string icswfrzntypedesc { get; set; }
      public int icswclass { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string statusdesc { get; set; }
      public decimal oorderpt { get; set; }
      public decimal olinept { get; set; }
      [StringValidationAttribute]
      public string whserank { get; set; }
      public decimal safetyqty { get; set; }
      public decimal usage { get; set; }
      [StringValidationAttribute]
      public string abcrankty { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamumassupdatecriteria BuildIcamumassupdatecriteriaFromRow(DataRow row)
      {
         Icamumassupdatecriteria entity = new Icamumassupdatecriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.activefl = row.Field<bool>("activefl");
         entity.seasontype = row.IsNull("seasontype") ? string.Empty : row.Field<string>("seasontype");
         entity.statusmess = row.IsNull("statusmess") ? string.Empty : row.Field<string>("statusmess");
         entity.updatemess = row.IsNull("updatemess") ? string.Empty : row.Field<string>("updatemess");
         entity.orderpt = row.IsNull("orderpt") ? decimal.Zero : row.Field<decimal>("orderpt");
         entity.linept = row.IsNull("linept") ? decimal.Zero : row.Field<decimal>("linept");
         entity.orderqty = row.IsNull("orderqty") ? decimal.Zero : row.Field<decimal>("orderqty");
         entity.frozenmos = row.IsNull("frozenmos") ? 0 : row.Field<int>("frozenmos");
         entity.icswfrozenmmyy = row.IsNull("icswfrozenmmyy") ? string.Empty : row.Field<string>("icswfrozenmmyy");
         entity.icswfrozentype = row.IsNull("icswfrozentype") ? string.Empty : row.Field<string>("icswfrozentype");
         entity.icswfrzntypedesc = row.IsNull("icswfrzntypedesc") ? string.Empty : row.Field<string>("icswfrzntypedesc");
         entity.icswclass = row.IsNull("icswclass") ? 0 : row.Field<int>("icswclass");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.statusdesc = row.IsNull("statusdesc") ? string.Empty : row.Field<string>("statusdesc");
         entity.oorderpt = row.IsNull("oorderpt") ? decimal.Zero : row.Field<decimal>("oorderpt");
         entity.olinept = row.IsNull("olinept") ? decimal.Zero : row.Field<decimal>("olinept");
         entity.whserank = row.IsNull("whserank") ? string.Empty : row.Field<string>("whserank");
         entity.safetyqty = row.IsNull("safetyqty") ? decimal.Zero : row.Field<decimal>("safetyqty");
         entity.usage = row.IsNull("usage") ? decimal.Zero : row.Field<decimal>("usage");
         entity.abcrankty = row.IsNull("abcrankty") ? string.Empty : row.Field<string>("abcrankty");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamumassupdatecriteria(ref DataRow row, Icamumassupdatecriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("activefl", entity.activefl);
         row.SetField("seasontype", entity.seasontype);
         row.SetField("statusmess", entity.statusmess);
         row.SetField("updatemess", entity.updatemess);
         row.SetField("orderpt", entity.orderpt);
         row.SetField("linept", entity.linept);
         row.SetField("orderqty", entity.orderqty);
         row.SetField("frozenmos", entity.frozenmos);
         row.SetField("icswfrozenmmyy", entity.icswfrozenmmyy);
         row.SetField("icswfrozentype", entity.icswfrozentype);
         row.SetField("icswfrzntypedesc", entity.icswfrzntypedesc);
         row.SetField("icswclass", entity.icswclass);
         row.SetField("statustype", entity.statustype);
         row.SetField("statusdesc", entity.statusdesc);
         row.SetField("oorderpt", entity.oorderpt);
         row.SetField("olinept", entity.olinept);
         row.SetField("whserank", entity.whserank);
         row.SetField("safetyqty", entity.safetyqty);
         row.SetField("usage", entity.usage);
         row.SetField("abcrankty", entity.abcrankty);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
