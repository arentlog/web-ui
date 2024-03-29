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

namespace Infor.Sxe.PO.Data.Models.Pdspoeilineextend
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoeilineextend.Poeilineextend")]
   public partial class Poeilineextend : ModelBase
   {
      [StringValidationAttribute]
      public string poeirowid { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      [StringValidationAttribute]
      public string upcid { get; set; }
      public decimal qtyord { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal stkqtyord { get; set; }
      public decimal stkqtyrcv { get; set; }
      [StringValidationAttribute]
      public string rcvunit { get; set; }
      public decimal qtyunavail { get; set; }
      [StringValidationAttribute]
      public string unavailunit { get; set; }
      public decimal qtyassign { get; set; }
      [StringValidationAttribute]
      public string binloc1 { get; set; }
      [StringValidationAttribute]
      public string binloc2 { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      public bool sruninreasfl { get; set; }
      public bool ignoreltfl { get; set; }
      public bool copybinlocsfl { get; set; }
      [StringValidationAttribute]
      public string netbillty { get; set; }
      public decimal rebamtnetbill { get; set; }
      public bool cbReasUnAvTySensitive { get; set; }
      public bool fiQtyUnavailSensitive { get; set; }
      public bool fiBinLocation1Sensitive { get; set; }
      public bool fiBinLocation2Sensitive { get; set; }
      public bool btnOKSensitive { get; set; }
      public bool tgCopyBinLocsSensitive { get; set; }
      public bool tgIgnoreLTFlSensitive { get; set; }
      public bool netbilltySensitive { get; set; }
      public bool rebamtnetbillSensitive { get; set; }
      public bool tgCopyBinLocsHidden { get; set; }
      public bool netbilltyHidden { get; set; }
      public bool rebamtnetbillHidden { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Poeilineextend BuildPoeilineextendFromRow(DataRow row)
      {
         Poeilineextend entity = new Poeilineextend();
         entity.poeirowid = row.Field<byte[]>("poeirowid").ToStringEncoded();
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.upcid = row.IsNull("upcid") ? string.Empty : row.Field<string>("upcid");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.stkqtyrcv = row.IsNull("stkqtyrcv") ? decimal.Zero : row.Field<decimal>("stkqtyrcv");
         entity.rcvunit = row.IsNull("rcvunit") ? string.Empty : row.Field<string>("rcvunit");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.unavailunit = row.IsNull("unavailunit") ? string.Empty : row.Field<string>("unavailunit");
         entity.qtyassign = row.IsNull("qtyassign") ? decimal.Zero : row.Field<decimal>("qtyassign");
         entity.binloc1 = row.IsNull("binloc1") ? string.Empty : row.Field<string>("binloc1");
         entity.binloc2 = row.IsNull("binloc2") ? string.Empty : row.Field<string>("binloc2");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.sruninreasfl = row.Field<bool>("sruninreasfl");
         entity.ignoreltfl = row.Field<bool>("ignoreltfl");
         entity.copybinlocsfl = row.Field<bool>("copybinlocsfl");
         entity.netbillty = row.IsNull("netbillty") ? string.Empty : row.Field<string>("netbillty");
         entity.rebamtnetbill = row.IsNull("rebamtnetbill") ? decimal.Zero : row.Field<decimal>("rebamtnetbill");
         entity.cbReasUnAvTySensitive = row.Field<bool>("cbReasUnAvTy-sensitive");
         entity.fiQtyUnavailSensitive = row.Field<bool>("fiQtyUnavail-sensitive");
         entity.fiBinLocation1Sensitive = row.Field<bool>("fiBinLocation1-sensitive");
         entity.fiBinLocation2Sensitive = row.Field<bool>("fiBinLocation2-sensitive");
         entity.btnOKSensitive = row.Field<bool>("Btn_OK-sensitive");
         entity.tgCopyBinLocsSensitive = row.Field<bool>("tgCopyBinLocs-sensitive");
         entity.tgIgnoreLTFlSensitive = row.Field<bool>("tgIgnoreLTFl-sensitive");
         entity.netbilltySensitive = row.Field<bool>("netbillty-sensitive");
         entity.rebamtnetbillSensitive = row.Field<bool>("rebamtnetbill-sensitive");
         entity.tgCopyBinLocsHidden = row.Field<bool>("tgCopyBinLocs-hidden");
         entity.netbilltyHidden = row.Field<bool>("netbillty-hidden");
         entity.rebamtnetbillHidden = row.Field<bool>("rebamtnetbill-hidden");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoeilineextend(ref DataRow row, Poeilineextend entity)
      {
         row.SetField("poeirowid", entity.poeirowid.ToByteArray());
         row.SetField("shipprod", entity.shipprod);
         row.SetField("descrip", entity.descrip);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("upcid", entity.upcid);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("unit", entity.unit);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("stkqtyrcv", entity.stkqtyrcv);
         row.SetField("rcvunit", entity.rcvunit);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("unavailunit", entity.unavailunit);
         row.SetField("qtyassign", entity.qtyassign);
         row.SetField("binloc1", entity.binloc1);
         row.SetField("binloc2", entity.binloc2);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("sruninreasfl", entity.sruninreasfl);
         row.SetField("ignoreltfl", entity.ignoreltfl);
         row.SetField("copybinlocsfl", entity.copybinlocsfl);
         row.SetField("netbillty", entity.netbillty);
         row.SetField("rebamtnetbill", entity.rebamtnetbill);
         row.SetField("cbReasUnAvTy-sensitive", entity.cbReasUnAvTySensitive);
         row.SetField("fiQtyUnavail-sensitive", entity.fiQtyUnavailSensitive);
         row.SetField("fiBinLocation1-sensitive", entity.fiBinLocation1Sensitive);
         row.SetField("fiBinLocation2-sensitive", entity.fiBinLocation2Sensitive);
         row.SetField("Btn_OK-sensitive", entity.btnOKSensitive);
         row.SetField("tgCopyBinLocs-sensitive", entity.tgCopyBinLocsSensitive);
         row.SetField("tgIgnoreLTFl-sensitive", entity.tgIgnoreLTFlSensitive);
         row.SetField("netbillty-sensitive", entity.netbilltySensitive);
         row.SetField("rebamtnetbill-sensitive", entity.rebamtnetbillSensitive);
         row.SetField("tgCopyBinLocs-hidden", entity.tgCopyBinLocsHidden);
         row.SetField("netbillty-hidden", entity.netbilltyHidden);
         row.SetField("rebamtnetbill-hidden", entity.rebamtnetbillHidden);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
