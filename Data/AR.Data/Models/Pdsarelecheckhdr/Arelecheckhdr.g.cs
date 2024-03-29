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

namespace Infor.Sxe.AR.Data.Models.Pdsarelecheckhdr
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarelecheckhdr.Arelecheckhdr")]
   public partial class Arelecheckhdr : ModelBase
   {
      [StringValidationAttribute]
      public string batch { get; set; }
      public int checkseq { get; set; }
      [StringValidationAttribute]
      public string transmission { get; set; }
      public bool chgfl { get; set; }
      public bool badcustfl { get; set; }
      public decimal checkamt { get; set; }
      public int checkno { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public DateTime? recvdt { get; set; }
      public bool statfl { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transtm { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      public bool manualSuspFl { get; set; }
      [StringValidationAttribute]
      public string adddata1 { get; set; }
      [StringValidationAttribute]
      public string adddata2 { get; set; }
      [StringValidationAttribute]
      public string adddata3 { get; set; }
      [StringValidationAttribute]
      public string adddata4 { get; set; }
      [StringValidationAttribute]
      public string adddata5 { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string transno { get; set; }
      public decimal origcustno { get; set; }
      [StringValidationAttribute]
      public string arbchid { get; set; }
      public decimal dWoLimit { get; set; }
      public int fakejrnlno { get; set; }
      public int iSecure { get; set; }
      public bool lNSFFl { get; set; }
      public bool lCheckChgFl { get; set; }
      public decimal proof { get; set; }
      public decimal newdiscamt { get; set; }
      public decimal newproofamt { get; set; }
      public long rarbchid { get; set; }
      public decimal wototal { get; set; }
      public bool changecustenable { get; set; }
      public bool recalldiscenable { get; set; }
      public bool addtransenable { get; set; }
      public bool suspendlineenable { get; set; }
      public bool replacedetailenable { get; set; }
      public bool recalllinediscenable { get; set; }
      public bool writeoffenable { get; set; }
      public bool chargebackenable { get; set; }
      public bool undochangesenable { get; set; }
      public bool deletelineenable { get; set; }
      public bool deleteallenable { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arelecheckhdr BuildArelecheckhdrFromRow(DataRow row)
      {
         Arelecheckhdr entity = new Arelecheckhdr();
         entity.batch = row.IsNull("batch") ? string.Empty : row.Field<string>("batch");
         entity.checkseq = row.IsNull("checkseq") ? 0 : row.Field<int>("checkseq");
         entity.transmission = row.IsNull("transmission") ? string.Empty : row.Field<string>("transmission");
         entity.chgfl = row.Field<bool>("Chgfl");
         entity.badcustfl = row.Field<bool>("Badcustfl");
         entity.checkamt = row.IsNull("Checkamt") ? decimal.Zero : row.Field<decimal>("Checkamt");
         entity.checkno = row.IsNull("Checkno") ? 0 : row.Field<int>("Checkno");
         entity.custno = row.IsNull("Custno") ? decimal.Zero : row.Field<decimal>("Custno");
         entity.operinit = row.IsNull("Operinit") ? string.Empty : row.Field<string>("Operinit");
         entity.recvdt = row.Field<DateTime?>("Recvdt");
         entity.statfl = row.Field<bool>("statfl");
         entity.transdt = row.Field<DateTime?>("Transdt");
         entity.transtm = row.IsNull("Transtm") ? string.Empty : row.Field<string>("Transtm");
         entity.name = row.IsNull("Name") ? string.Empty : row.Field<string>("Name");
         entity.manualSuspFl = row.Field<bool>("ManualSuspFl");
         entity.adddata1 = row.IsNull("adddata1") ? string.Empty : row.Field<string>("adddata1");
         entity.adddata2 = row.IsNull("adddata2") ? string.Empty : row.Field<string>("adddata2");
         entity.adddata3 = row.IsNull("adddata3") ? string.Empty : row.Field<string>("adddata3");
         entity.adddata4 = row.IsNull("adddata4") ? string.Empty : row.Field<string>("adddata4");
         entity.adddata5 = row.IsNull("adddata5") ? string.Empty : row.Field<string>("adddata5");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.transno = row.IsNull("transno") ? string.Empty : row.Field<string>("transno");
         entity.origcustno = row.IsNull("origcustno") ? decimal.Zero : row.Field<decimal>("origcustno");
         entity.arbchid = row.Field<byte[]>("arbchid").ToStringEncoded();
         entity.dWoLimit = row.IsNull("dWoLimit") ? decimal.Zero : row.Field<decimal>("dWoLimit");
         entity.fakejrnlno = row.IsNull("fakejrnlno") ? 0 : row.Field<int>("fakejrnlno");
         entity.iSecure = row.IsNull("iSecure") ? 0 : row.Field<int>("iSecure");
         entity.lNSFFl = row.Field<bool>("lNSFFl");
         entity.lCheckChgFl = row.Field<bool>("lCheckChgFl");
         entity.proof = row.IsNull("proof") ? decimal.Zero : row.Field<decimal>("proof");
         entity.newdiscamt = row.IsNull("newdiscamt") ? decimal.Zero : row.Field<decimal>("newdiscamt");
         entity.newproofamt = row.IsNull("newproofamt") ? decimal.Zero : row.Field<decimal>("newproofamt");
         entity.rarbchid = row.IsNull("rarbchid") ? 0 : row.Field<long>("rarbchid");
         entity.wototal = row.IsNull("wototal") ? decimal.Zero : row.Field<decimal>("wototal");
         entity.changecustenable = row.Field<bool>("changecustenable");
         entity.recalldiscenable = row.Field<bool>("recalldiscenable");
         entity.addtransenable = row.Field<bool>("addtransenable");
         entity.suspendlineenable = row.Field<bool>("suspendlineenable");
         entity.replacedetailenable = row.Field<bool>("replacedetailenable");
         entity.recalllinediscenable = row.Field<bool>("recalllinediscenable");
         entity.writeoffenable = row.Field<bool>("writeoffenable");
         entity.chargebackenable = row.Field<bool>("chargebackenable");
         entity.undochangesenable = row.Field<bool>("undochangesenable");
         entity.deletelineenable = row.Field<bool>("deletelineenable");
         entity.deleteallenable = row.Field<bool>("deleteallenable");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArelecheckhdr(ref DataRow row, Arelecheckhdr entity)
      {
         row.SetField("batch", entity.batch);
         row.SetField("checkseq", entity.checkseq);
         row.SetField("transmission", entity.transmission);
         row.SetField("Chgfl", entity.chgfl);
         row.SetField("Badcustfl", entity.badcustfl);
         row.SetField("Checkamt", entity.checkamt);
         row.SetField("Checkno", entity.checkno);
         row.SetField("Custno", entity.custno);
         row.SetField("Operinit", entity.operinit);
         row.SetField("Recvdt", entity.recvdt);
         row.SetField("statfl", entity.statfl);
         row.SetField("Transdt", entity.transdt);
         row.SetField("Transtm", entity.transtm);
         row.SetField("Name", entity.name);
         row.SetField("ManualSuspFl", entity.manualSuspFl);
         row.SetField("adddata1", entity.adddata1);
         row.SetField("adddata2", entity.adddata2);
         row.SetField("adddata3", entity.adddata3);
         row.SetField("adddata4", entity.adddata4);
         row.SetField("adddata5", entity.adddata5);
         row.SetField("transtype", entity.transtype);
         row.SetField("transno", entity.transno);
         row.SetField("origcustno", entity.origcustno);
         row.SetField("arbchid", entity.arbchid.ToByteArray());
         row.SetField("dWoLimit", entity.dWoLimit);
         row.SetField("fakejrnlno", entity.fakejrnlno);
         row.SetField("iSecure", entity.iSecure);
         row.SetField("lNSFFl", entity.lNSFFl);
         row.SetField("lCheckChgFl", entity.lCheckChgFl);
         row.SetField("proof", entity.proof);
         row.SetField("newdiscamt", entity.newdiscamt);
         row.SetField("newproofamt", entity.newproofamt);
         row.SetField("rarbchid", entity.rarbchid);
         row.SetField("wototal", entity.wototal);
         row.SetField("changecustenable", entity.changecustenable);
         row.SetField("recalldiscenable", entity.recalldiscenable);
         row.SetField("addtransenable", entity.addtransenable);
         row.SetField("suspendlineenable", entity.suspendlineenable);
         row.SetField("replacedetailenable", entity.replacedetailenable);
         row.SetField("recalllinediscenable", entity.recalllinediscenable);
         row.SetField("writeoffenable", entity.writeoffenable);
         row.SetField("chargebackenable", entity.chargebackenable);
         row.SetField("undochangesenable", entity.undochangesenable);
         row.SetField("deletelineenable", entity.deletelineenable);
         row.SetField("deleteallenable", entity.deleteallenable);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
