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

namespace Infor.Sxe.IC.Data.Models.Pdsicscupdpd
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicscupdpd.Icscupdpd")]
   public partial class Icscupdpd : ModelBase
   {
      [StringValidationAttribute]
      public string catalog { get; set; }
      [StringValidationAttribute]
      public string oSpeccostty { get; set; }
      public decimal oCsunperstk { get; set; }
      [StringValidationAttribute]
      public string oPrccostper { get; set; }
      [StringValidationAttribute]
      public string nSpeccostty { get; set; }
      public decimal nCsunperstk { get; set; }
      [StringValidationAttribute]
      public string nPrccostper { get; set; }
      public bool lUpdate { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icscupdpd BuildIcscupdpdFromRow(DataRow row)
      {
         Icscupdpd entity = new Icscupdpd();
         entity.catalog = row.IsNull("catalog") ? string.Empty : row.Field<string>("catalog");
         entity.oSpeccostty = row.IsNull("oSpeccostty") ? string.Empty : row.Field<string>("oSpeccostty");
         entity.oCsunperstk = row.IsNull("oCsunperstk") ? decimal.Zero : row.Field<decimal>("oCsunperstk");
         entity.oPrccostper = row.IsNull("oPrccostper") ? string.Empty : row.Field<string>("oPrccostper");
         entity.nSpeccostty = row.IsNull("nSpeccostty") ? string.Empty : row.Field<string>("nSpeccostty");
         entity.nCsunperstk = row.IsNull("nCsunperstk") ? decimal.Zero : row.Field<decimal>("nCsunperstk");
         entity.nPrccostper = row.IsNull("nPrccostper") ? string.Empty : row.Field<string>("nPrccostper");
         entity.lUpdate = row.Field<bool>("lUpdate");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcscupdpd(ref DataRow row, Icscupdpd entity)
      {
         row.SetField("catalog", entity.catalog);
         row.SetField("oSpeccostty", entity.oSpeccostty);
         row.SetField("oCsunperstk", entity.oCsunperstk);
         row.SetField("oPrccostper", entity.oPrccostper);
         row.SetField("nSpeccostty", entity.nSpeccostty);
         row.SetField("nCsunperstk", entity.nCsunperstk);
         row.SetField("nPrccostper", entity.nPrccostper);
         row.SetField("lUpdate", entity.lUpdate);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
