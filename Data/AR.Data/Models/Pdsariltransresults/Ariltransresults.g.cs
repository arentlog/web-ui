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

namespace Infor.Sxe.AR.Data.Models.Pdsariltransresults
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsariltransresults.Ariltransresults")]
   public partial class Ariltransresults : ModelBase
   {
      [StringValidationAttribute]
      public string fibatch { get; set; }
      public decimal custno { get; set; }
      public int checkno { get; set; }
      [StringValidationAttribute]
      public string lbxinvno { get; set; }
      public decimal lbxamt { get; set; }
      public long aretid { get; set; }
      public int invno { get; set; }
      public int invsuf { get; set; }
      public int seqno { get; set; }
      public decimal invamt { get; set; }
      public DateTime? duedt { get; set; }
      [StringValidationAttribute]
      public string trancd { get; set; }
      public bool piffl { get; set; }
      public decimal applyamt { get; set; }
      public decimal discamt { get; set; }
      public decimal invcustno { get; set; }
      public bool aretnffl { get; set; }
      public bool statfl { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public int prefix { get; set; }
      public int cbinvno { get; set; }
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
      public string adddata6 { get; set; }
      [StringValidationAttribute]
      public string adddata7 { get; set; }
      [StringValidationAttribute]
      public string adddata8 { get; set; }
      [StringValidationAttribute]
      public string adddata9 { get; set; }
      [StringValidationAttribute]
      public string adddata10 { get; set; }
      public bool autopostfl { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transtm { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public bool chgfl { get; set; }
      public decimal dWOAmt { get; set; }
      public bool lRanWOFl { get; set; }
      public long arbclid { get; set; }
      [StringValidationAttribute]
      public string arbchid { get; set; }
      public bool writeoffsenabled { get; set; }
      [StringValidationAttribute]
      public string custnotes { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ariltransresults BuildAriltransresultsFromRow(DataRow row)
      {
         Ariltransresults entity = new Ariltransresults();
         entity.fibatch = row.IsNull("fibatch") ? string.Empty : row.Field<string>("fibatch");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.checkno = row.IsNull("checkno") ? 0 : row.Field<int>("checkno");
         entity.lbxinvno = row.IsNull("lbxinvno") ? string.Empty : row.Field<string>("lbxinvno");
         entity.lbxamt = row.IsNull("lbxamt") ? decimal.Zero : row.Field<decimal>("lbxamt");
         entity.aretid = row.IsNull("aretid") ? 0 : row.Field<long>("aretid");
         entity.invno = row.IsNull("invno") ? 0 : row.Field<int>("invno");
         entity.invsuf = row.IsNull("invsuf") ? 0 : row.Field<int>("invsuf");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.invamt = row.IsNull("invamt") ? decimal.Zero : row.Field<decimal>("invamt");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.trancd = row.IsNull("trancd") ? string.Empty : row.Field<string>("trancd");
         entity.piffl = row.Field<bool>("piffl");
         entity.applyamt = row.IsNull("applyamt") ? decimal.Zero : row.Field<decimal>("applyamt");
         entity.discamt = row.IsNull("discamt") ? decimal.Zero : row.Field<decimal>("discamt");
         entity.invcustno = row.IsNull("invcustno") ? decimal.Zero : row.Field<decimal>("invcustno");
         entity.aretnffl = row.Field<bool>("aretnffl");
         entity.statfl = row.Field<bool>("statfl");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.prefix = row.IsNull("prefix") ? 0 : row.Field<int>("prefix");
         entity.cbinvno = row.IsNull("cbinvno") ? 0 : row.Field<int>("cbinvno");
         entity.adddata1 = row.IsNull("adddata1") ? string.Empty : row.Field<string>("adddata1");
         entity.adddata2 = row.IsNull("adddata2") ? string.Empty : row.Field<string>("adddata2");
         entity.adddata3 = row.IsNull("adddata3") ? string.Empty : row.Field<string>("adddata3");
         entity.adddata4 = row.IsNull("adddata4") ? string.Empty : row.Field<string>("adddata4");
         entity.adddata5 = row.IsNull("adddata5") ? string.Empty : row.Field<string>("adddata5");
         entity.adddata6 = row.IsNull("adddata6") ? string.Empty : row.Field<string>("adddata6");
         entity.adddata7 = row.IsNull("adddata7") ? string.Empty : row.Field<string>("adddata7");
         entity.adddata8 = row.IsNull("adddata8") ? string.Empty : row.Field<string>("adddata8");
         entity.adddata9 = row.IsNull("adddata9") ? string.Empty : row.Field<string>("adddata9");
         entity.adddata10 = row.IsNull("adddata10") ? string.Empty : row.Field<string>("adddata10");
         entity.autopostfl = row.Field<bool>("autopostfl");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.chgfl = row.Field<bool>("Chgfl");
         entity.dWOAmt = row.IsNull("dWOAmt") ? decimal.Zero : row.Field<decimal>("dWOAmt");
         entity.lRanWOFl = row.Field<bool>("lRanWOFl");
         entity.arbclid = row.IsNull("arbclid") ? 0 : row.Field<long>("arbclid");
         entity.arbchid = row.Field<byte[]>("arbchid").ToStringEncoded();
         entity.writeoffsenabled = row.Field<bool>("writeoffsenabled");
         entity.custnotes = row.IsNull("custnotes") ? string.Empty : row.Field<string>("custnotes");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAriltransresults(ref DataRow row, Ariltransresults entity)
      {
         row.SetField("fibatch", entity.fibatch);
         row.SetField("custno", entity.custno);
         row.SetField("checkno", entity.checkno);
         row.SetField("lbxinvno", entity.lbxinvno);
         row.SetField("lbxamt", entity.lbxamt);
         row.SetField("aretid", entity.aretid);
         row.SetField("invno", entity.invno);
         row.SetField("invsuf", entity.invsuf);
         row.SetField("seqno", entity.seqno);
         row.SetField("invamt", entity.invamt);
         row.SetField("duedt", entity.duedt);
         row.SetField("trancd", entity.trancd);
         row.SetField("piffl", entity.piffl);
         row.SetField("applyamt", entity.applyamt);
         row.SetField("discamt", entity.discamt);
         row.SetField("invcustno", entity.invcustno);
         row.SetField("aretnffl", entity.aretnffl);
         row.SetField("statfl", entity.statfl);
         row.SetField("refer", entity.refer);
         row.SetField("prefix", entity.prefix);
         row.SetField("cbinvno", entity.cbinvno);
         row.SetField("adddata1", entity.adddata1);
         row.SetField("adddata2", entity.adddata2);
         row.SetField("adddata3", entity.adddata3);
         row.SetField("adddata4", entity.adddata4);
         row.SetField("adddata5", entity.adddata5);
         row.SetField("adddata6", entity.adddata6);
         row.SetField("adddata7", entity.adddata7);
         row.SetField("adddata8", entity.adddata8);
         row.SetField("adddata9", entity.adddata9);
         row.SetField("adddata10", entity.adddata10);
         row.SetField("autopostfl", entity.autopostfl);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("Chgfl", entity.chgfl);
         row.SetField("dWOAmt", entity.dWOAmt);
         row.SetField("lRanWOFl", entity.lRanWOFl);
         row.SetField("arbclid", entity.arbclid);
         row.SetField("arbchid", entity.arbchid.ToByteArray());
         row.SetField("writeoffsenabled", entity.writeoffsenabled);
         row.SetField("custnotes", entity.custnotes);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591