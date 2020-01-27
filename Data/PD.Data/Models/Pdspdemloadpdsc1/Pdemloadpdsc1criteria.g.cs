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

namespace Infor.Sxe.PD.Data.Models.Pdspdemloadpdsc1
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdemloadpdsc1.Pdemloadpdsc1criteria")]
   public partial class Pdemloadpdsc1criteria : ModelBase
   {
      [StringValidationAttribute]
      public string cSetid { get; set; }
      public decimal deCustNo { get; set; }
      [StringValidationAttribute]
      public string cShipTo { get; set; }
      [StringValidationAttribute]
      public string cContractNo { get; set; }
      public DateTime? dtStartFrom { get; set; }
      public DateTime? dtStartTo { get; set; }
      [StringValidationAttribute]
      public string cProd { get; set; }
      [StringValidationAttribute]
      public string cReference { get; set; }
      public DateTime? dtEndFrom { get; set; }
      public DateTime? dtEndTo { get; set; }
      [StringValidationAttribute]
      public string cWhse { get; set; }
      public bool lRefreshClick { get; set; }
      [StringValidationAttribute]
      public string cRegion { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdemloadpdsc1criteria BuildPdemloadpdsc1criteriaFromRow(DataRow row)
      {
         Pdemloadpdsc1criteria entity = new Pdemloadpdsc1criteria();
         entity.cSetid = row.IsNull("cSetid") ? string.Empty : row.Field<string>("cSetid");
         entity.deCustNo = row.IsNull("deCustNo") ? decimal.Zero : row.Field<decimal>("deCustNo");
         entity.cShipTo = row.IsNull("cShipTo") ? string.Empty : row.Field<string>("cShipTo");
         entity.cContractNo = row.IsNull("cContractNo") ? string.Empty : row.Field<string>("cContractNo");
         entity.dtStartFrom = row.Field<DateTime?>("dtStartFrom");
         entity.dtStartTo = row.Field<DateTime?>("dtStartTo");
         entity.cProd = row.IsNull("cProd") ? string.Empty : row.Field<string>("cProd");
         entity.cReference = row.IsNull("cReference") ? string.Empty : row.Field<string>("cReference");
         entity.dtEndFrom = row.Field<DateTime?>("dtEndFrom");
         entity.dtEndTo = row.Field<DateTime?>("dtEndTo");
         entity.cWhse = row.IsNull("cWhse") ? string.Empty : row.Field<string>("cWhse");
         entity.lRefreshClick = row.Field<bool>("lRefresh-click");
         entity.cRegion = row.IsNull("cRegion") ? string.Empty : row.Field<string>("cRegion");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdemloadpdsc1criteria(ref DataRow row, Pdemloadpdsc1criteria entity)
      {
         row.SetField("cSetid", entity.cSetid);
         row.SetField("deCustNo", entity.deCustNo);
         row.SetField("cShipTo", entity.cShipTo);
         row.SetField("cContractNo", entity.cContractNo);
         row.SetField("dtStartFrom", entity.dtStartFrom);
         row.SetField("dtStartTo", entity.dtStartTo);
         row.SetField("cProd", entity.cProd);
         row.SetField("cReference", entity.cReference);
         row.SetField("dtEndFrom", entity.dtEndFrom);
         row.SetField("dtEndTo", entity.dtEndTo);
         row.SetField("cWhse", entity.cWhse);
         row.SetField("lRefresh-click", entity.lRefreshClick);
         row.SetField("cRegion", entity.cRegion);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
