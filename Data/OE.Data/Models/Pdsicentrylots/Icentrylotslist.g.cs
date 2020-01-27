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

namespace Infor.Sxe.OE.Data.Models.Pdsicentrylots
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsicentrylots.Icentrylotslist")]
   public partial class Icentrylotslist : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string cLotNo { get; set; }
      public decimal dQuantity { get; set; }
      public decimal origqty { get; set; }
      public DateTime? dtOpen { get; set; }
      public decimal dQtyAvail { get; set; }
      public decimal dQtyUnavail { get; set; }
      public DateTime? dtExpire { get; set; }
      public bool lSelected { get; set; }
      public bool lModified { get; set; }
      public long rICETLRecID { get; set; }
      public decimal dCost { get; set; }
      [StringValidationAttribute]
      public string cComment { get; set; }
      [StringValidationAttribute]
      public string cReasUnavTy { get; set; }
      [StringValidationAttribute]
      public string origreasunav { get; set; }
      public long rICSELRecID { get; set; }
      public int iPosition { get; set; }
      [StringValidationAttribute]
      public string cBinLoc1 { get; set; }
      [StringValidationAttribute]
      public string cBinLoc2 { get; set; }
      [StringValidationAttribute]
      public string placedby { get; set; }
      [StringValidationAttribute]
      public string rectype { get; set; }
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


      public static Icentrylotslist BuildIcentrylotslistFromRow(DataRow row)
      {
         Icentrylotslist entity = new Icentrylotslist();
         entity.cLotNo = row.IsNull("cLotNo") ? string.Empty : row.Field<string>("cLotNo");
         entity.dQuantity = row.IsNull("dQuantity") ? decimal.Zero : row.Field<decimal>("dQuantity");
         entity.origqty = row.IsNull("origqty") ? decimal.Zero : row.Field<decimal>("origqty");
         entity.dtOpen = row.Field<DateTime?>("dtOpen");
         entity.dQtyAvail = row.IsNull("dQtyAvail") ? decimal.Zero : row.Field<decimal>("dQtyAvail");
         entity.dQtyUnavail = row.IsNull("dQtyUnavail") ? decimal.Zero : row.Field<decimal>("dQtyUnavail");
         entity.dtExpire = row.Field<DateTime?>("dtExpire");
         entity.lSelected = row.Field<bool>("lSelected");
         entity.lModified = row.Field<bool>("lModified");
         entity.rICETLRecID = row.IsNull("rICETLRecID") ? 0 : row.Field<long>("rICETLRecID");
         entity.dCost = row.IsNull("dCost") ? decimal.Zero : row.Field<decimal>("dCost");
         entity.cComment = row.IsNull("cComment") ? string.Empty : row.Field<string>("cComment");
         entity.cReasUnavTy = row.IsNull("cReasUnavTy") ? string.Empty : row.Field<string>("cReasUnavTy");
         entity.origreasunav = row.IsNull("origreasunav") ? string.Empty : row.Field<string>("origreasunav");
         entity.rICSELRecID = row.IsNull("rICSELRecID") ? 0 : row.Field<long>("rICSELRecID");
         entity.iPosition = row.IsNull("iPosition") ? 0 : row.Field<int>("iPosition");
         entity.cBinLoc1 = row.IsNull("cBinLoc1") ? string.Empty : row.Field<string>("cBinLoc1");
         entity.cBinLoc2 = row.IsNull("cBinLoc2") ? string.Empty : row.Field<string>("cBinLoc2");
         entity.placedby = row.IsNull("placedby") ? string.Empty : row.Field<string>("placedby");
         entity.rectype = row.IsNull("rectype") ? string.Empty : row.Field<string>("rectype");
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
      public static void UpdateRowFromIcentrylotslist(ref DataRow row, Icentrylotslist entity)
      {
         row.SetField("cLotNo", entity.cLotNo);
         row.SetField("dQuantity", entity.dQuantity);
         row.SetField("origqty", entity.origqty);
         row.SetField("dtOpen", entity.dtOpen);
         row.SetField("dQtyAvail", entity.dQtyAvail);
         row.SetField("dQtyUnavail", entity.dQtyUnavail);
         row.SetField("dtExpire", entity.dtExpire);
         row.SetField("lSelected", entity.lSelected);
         row.SetField("lModified", entity.lModified);
         row.SetField("rICETLRecID", entity.rICETLRecID);
         row.SetField("dCost", entity.dCost);
         row.SetField("cComment", entity.cComment);
         row.SetField("cReasUnavTy", entity.cReasUnavTy);
         row.SetField("origreasunav", entity.origreasunav);
         row.SetField("rICSELRecID", entity.rICSELRecID);
         row.SetField("iPosition", entity.iPosition);
         row.SetField("cBinLoc1", entity.cBinLoc1);
         row.SetField("cBinLoc2", entity.cBinLoc2);
         row.SetField("placedby", entity.placedby);
         row.SetField("rectype", entity.rectype);
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
