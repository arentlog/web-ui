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

namespace Infor.Sxe.OE.Data.Models.Pdstenderingload
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdstenderingload.Tenderingcchist")]
   public partial class Tenderingcchist : ModelBase
   {
      public decimal amount { get; set; }
      public decimal authamt { get; set; }
      public int bankno { get; set; }
      public int bosuf { get; set; }
      public int cardid { get; set; }
      [StringValidationAttribute]
      public string cardno { get; set; }
      [StringValidationAttribute]
      public string category { get; set; }
      public bool ccholdbofl { get; set; }
      [StringValidationAttribute]
      public string charmediaauth { get; set; }
      [StringValidationAttribute]
      public string charpreauth { get; set; }
      [StringValidationAttribute]
      public string cmc { get; set; }
      [StringValidationAttribute]
      public string cmm { get; set; }
      public int commcd { get; set; }
      public int cono { get; set; }
      public DateTime? createdt { get; set; }
      [StringValidationAttribute]
      public string createtm { get; set; }
      [StringValidationAttribute]
      public string currproc { get; set; }
      public int mediacd { get; set; }
      [StringValidationAttribute]
      public string merchantid { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public decimal origamt { get; set; }
      public int origproccd { get; set; }
      public int preauthno { get; set; }
      public int processcd { get; set; }
      public int processno { get; set; }
      public DateTime? respdt { get; set; }
      [StringValidationAttribute]
      public string response { get; set; }
      [StringValidationAttribute]
      public string resptm { get; set; }
      public decimal saleamt { get; set; }
      public int seqno { get; set; }
      public bool statustype { get; set; }
      public DateTime? submitdt { get; set; }
      [StringValidationAttribute]
      public string submittm { get; set; }
      public decimal taxamt { get; set; }
      [StringValidationAttribute]
      public string transcd { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Tenderingcchist BuildTenderingcchistFromRow(DataRow row)
      {
         Tenderingcchist entity = new Tenderingcchist();
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.authamt = row.IsNull("authamt") ? decimal.Zero : row.Field<decimal>("authamt");
         entity.bankno = row.IsNull("bankno") ? 0 : row.Field<int>("bankno");
         entity.bosuf = row.IsNull("bosuf") ? 0 : row.Field<int>("bosuf");
         entity.cardid = row.IsNull("cardid") ? 0 : row.Field<int>("cardid");
         entity.cardno = row.IsNull("cardno") ? string.Empty : row.Field<string>("cardno");
         entity.category = row.IsNull("category") ? string.Empty : row.Field<string>("category");
         entity.ccholdbofl = row.Field<bool>("ccholdbofl");
         entity.charmediaauth = row.IsNull("charmediaauth") ? string.Empty : row.Field<string>("charmediaauth");
         entity.charpreauth = row.IsNull("charpreauth") ? string.Empty : row.Field<string>("charpreauth");
         entity.cmc = row.IsNull("cmc") ? string.Empty : row.Field<string>("cmc");
         entity.cmm = row.IsNull("cmm") ? string.Empty : row.Field<string>("cmm");
         entity.commcd = row.IsNull("commcd") ? 0 : row.Field<int>("commcd");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.createtm = row.IsNull("createtm") ? string.Empty : row.Field<string>("createtm");
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.mediacd = row.IsNull("mediacd") ? 0 : row.Field<int>("mediacd");
         entity.merchantid = row.IsNull("merchantid") ? string.Empty : row.Field<string>("merchantid");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.origamt = row.IsNull("origamt") ? decimal.Zero : row.Field<decimal>("origamt");
         entity.origproccd = row.IsNull("origproccd") ? 0 : row.Field<int>("origproccd");
         entity.preauthno = row.IsNull("preauthno") ? 0 : row.Field<int>("preauthno");
         entity.processcd = row.IsNull("processcd") ? 0 : row.Field<int>("processcd");
         entity.processno = row.IsNull("processno") ? 0 : row.Field<int>("processno");
         entity.respdt = row.Field<DateTime?>("respdt");
         entity.response = row.IsNull("response") ? string.Empty : row.Field<string>("response");
         entity.resptm = row.IsNull("resptm") ? string.Empty : row.Field<string>("resptm");
         entity.saleamt = row.IsNull("saleamt") ? decimal.Zero : row.Field<decimal>("saleamt");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.statustype = row.Field<bool>("statustype");
         entity.submitdt = row.Field<DateTime?>("submitdt");
         entity.submittm = row.IsNull("submittm") ? string.Empty : row.Field<string>("submittm");
         entity.taxamt = row.IsNull("taxamt") ? decimal.Zero : row.Field<decimal>("taxamt");
         entity.transcd = row.IsNull("transcd") ? string.Empty : row.Field<string>("transcd");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromTenderingcchist(ref DataRow row, Tenderingcchist entity)
      {
         row.SetField("amount", entity.amount);
         row.SetField("authamt", entity.authamt);
         row.SetField("bankno", entity.bankno);
         row.SetField("bosuf", entity.bosuf);
         row.SetField("cardid", entity.cardid);
         row.SetField("cardno", entity.cardno);
         row.SetField("category", entity.category);
         row.SetField("ccholdbofl", entity.ccholdbofl);
         row.SetField("charmediaauth", entity.charmediaauth);
         row.SetField("charpreauth", entity.charpreauth);
         row.SetField("cmc", entity.cmc);
         row.SetField("cmm", entity.cmm);
         row.SetField("commcd", entity.commcd);
         row.SetField("cono", entity.cono);
         row.SetField("createdt", entity.createdt);
         row.SetField("createtm", entity.createtm);
         row.SetField("currproc", entity.currproc);
         row.SetField("mediacd", entity.mediacd);
         row.SetField("merchantid", entity.merchantid);
         row.SetField("operinit", entity.operinit);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("origamt", entity.origamt);
         row.SetField("origproccd", entity.origproccd);
         row.SetField("preauthno", entity.preauthno);
         row.SetField("processcd", entity.processcd);
         row.SetField("processno", entity.processno);
         row.SetField("respdt", entity.respdt);
         row.SetField("response", entity.response);
         row.SetField("resptm", entity.resptm);
         row.SetField("saleamt", entity.saleamt);
         row.SetField("seqno", entity.seqno);
         row.SetField("statustype", entity.statustype);
         row.SetField("submitdt", entity.submitdt);
         row.SetField("submittm", entity.submittm);
         row.SetField("taxamt", entity.taxamt);
         row.SetField("transcd", entity.transcd);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591