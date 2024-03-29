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

namespace Infor.Sxe.PO.Data.Models.Pdspocoreallocation
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspocoreallocation.Pocoreallocationsingle")]
   public partial class Pocoreallocationsingle : ModelBase
   {
      [StringValidationAttribute]
      public string cProd { get; set; }
      [StringValidationAttribute]
      public string cWhse { get; set; }
      public decimal dProofAmt { get; set; }
      [StringValidationAttribute]
      public string viewtitle { get; set; }
      public decimal dConv { get; set; }
      [StringValidationAttribute]
      public string cMode { get; set; }
      [StringValidationAttribute]
      public string cOrigProd { get; set; }
      public decimal dCoreQty { get; set; }
      public decimal dAdjPrice { get; set; }
      [StringValidationAttribute]
      public string cOrigWhse { get; set; }
      public bool warrantyflenabled { get; set; }
      public bool prodenabled { get; set; }
      public bool whseenabled { get; set; }
      [StringValidationAttribute]
      public string cScrnProd { get; set; }
      [StringValidationAttribute]
      public string cScrnWhse { get; set; }
      public decimal dAdjQty { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pocoreallocationsingle BuildPocoreallocationsingleFromRow(DataRow row)
      {
         Pocoreallocationsingle entity = new Pocoreallocationsingle();
         entity.cProd = row.IsNull("cProd") ? string.Empty : row.Field<string>("cProd");
         entity.cWhse = row.IsNull("cWhse") ? string.Empty : row.Field<string>("cWhse");
         entity.dProofAmt = row.IsNull("dProofAmt") ? decimal.Zero : row.Field<decimal>("dProofAmt");
         entity.viewtitle = row.IsNull("viewtitle") ? string.Empty : row.Field<string>("viewtitle");
         entity.dConv = row.IsNull("dConv") ? decimal.Zero : row.Field<decimal>("dConv");
         entity.cMode = row.IsNull("cMode") ? string.Empty : row.Field<string>("cMode");
         entity.cOrigProd = row.IsNull("cOrigProd") ? string.Empty : row.Field<string>("cOrigProd");
         entity.dCoreQty = row.IsNull("dCoreQty") ? decimal.Zero : row.Field<decimal>("dCoreQty");
         entity.dAdjPrice = row.IsNull("dAdjPrice") ? decimal.Zero : row.Field<decimal>("dAdjPrice");
         entity.cOrigWhse = row.IsNull("cOrigWhse") ? string.Empty : row.Field<string>("cOrigWhse");
         entity.warrantyflenabled = row.Field<bool>("warrantyflenabled");
         entity.prodenabled = row.Field<bool>("prodenabled");
         entity.whseenabled = row.Field<bool>("whseenabled");
         entity.cScrnProd = row.IsNull("cScrnProd") ? string.Empty : row.Field<string>("cScrnProd");
         entity.cScrnWhse = row.IsNull("cScrnWhse") ? string.Empty : row.Field<string>("cScrnWhse");
         entity.dAdjQty = row.IsNull("dAdjQty") ? decimal.Zero : row.Field<decimal>("dAdjQty");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPocoreallocationsingle(ref DataRow row, Pocoreallocationsingle entity)
      {
         row.SetField("cProd", entity.cProd);
         row.SetField("cWhse", entity.cWhse);
         row.SetField("dProofAmt", entity.dProofAmt);
         row.SetField("viewtitle", entity.viewtitle);
         row.SetField("dConv", entity.dConv);
         row.SetField("cMode", entity.cMode);
         row.SetField("cOrigProd", entity.cOrigProd);
         row.SetField("dCoreQty", entity.dCoreQty);
         row.SetField("dAdjPrice", entity.dAdjPrice);
         row.SetField("cOrigWhse", entity.cOrigWhse);
         row.SetField("warrantyflenabled", entity.warrantyflenabled);
         row.SetField("prodenabled", entity.prodenabled);
         row.SetField("whseenabled", entity.whseenabled);
         row.SetField("cScrnProd", entity.cScrnProd);
         row.SetField("cScrnWhse", entity.cScrnWhse);
         row.SetField("dAdjQty", entity.dAdjQty);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
