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

namespace Infor.Sxe.AR.Data.Models.Pdsarececheckdata
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarececheckdata.Arececheckdata")]
   public partial class Arececheckdata : ModelBase
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string oper { get; set; }
      public bool applyamtzeroanswer { get; set; }
      public bool applyamtzeroasked { get; set; }
      public bool bankfromcust { get; set; }
      public int bankno { get; set; }
      public bool banknoenabled { get; set; }
      public bool btncustnoenabled { get; set; }
      public bool btngroupnoenabled { get; set; }
      public bool btnshiptoenabled { get; set; }
      public decimal checkamt { get; set; }
      public bool checkamtenabled { get; set; }
      public bool checkamtvisible { get; set; }
      public DateTime? checkdt { get; set; }
      public bool checkdtenabled { get; set; }
      public bool checkdtvisible { get; set; }
      public int checkno { get; set; }
      public bool checknoenabled { get; set; }
      public bool checknovisible { get; set; }
      public bool checkzeroanswer { get; set; }
      public bool checkzeroasked { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnobgcolor { get; set; }
      public bool custnoenabled { get; set; }
      [StringValidationAttribute]
      public string custnofgcolor { get; set; }
      public bool custnook { get; set; }
      [StringValidationAttribute]
      public string custstartfield { get; set; }
      [StringValidationAttribute]
      public string findtype { get; set; }
      public bool findtypeenabled { get; set; }
      [StringValidationAttribute]
      public string groupno { get; set; }
      public bool groupnoenabled { get; set; }
      public bool groupnook { get; set; }
      public int invno { get; set; }
      public bool invnoenabled { get; set; }
      public int invsuf { get; set; }
      public bool invsufenabled { get; set; }
      public bool lbankwarn { get; set; }
      [StringValidationAttribute]
      public string lblshipto { get; set; }
      public bool ldupcheckwarn { get; set; }
      public bool lfirstcust { get; set; }
      public bool lgroup { get; set; }
      [StringValidationAttribute]
      public string lockbox { get; set; }
      public bool lockboxenabled { get; set; }
      public int oInvno { get; set; }
      public int oInvsuf { get; set; }
      [StringValidationAttribute]
      public string oldfindtype { get; set; }
      public bool oversixtyanswer { get; set; }
      public bool oversixtyasked { get; set; }
      [StringValidationAttribute]
      public string posttype { get; set; }
      public bool posttypeenabled { get; set; }
      public int savebankno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public bool shiptoenabled { get; set; }
      public bool shiptook { get; set; }
      [StringValidationAttribute]
      public string txtgroupname { get; set; }
      [StringValidationAttribute]
      public string txtshipto { get; set; }
      [StringValidationAttribute]
      public string txtname { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arececheckdata BuildArececheckdataFromRow(DataRow row)
      {
         Arececheckdata entity = new Arececheckdata();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.oper = row.IsNull("oper") ? string.Empty : row.Field<string>("oper");
         entity.applyamtzeroanswer = row.Field<bool>("applyamtzeroanswer");
         entity.applyamtzeroasked = row.Field<bool>("applyamtzeroasked");
         entity.bankfromcust = row.Field<bool>("bankfromcust");
         entity.bankno = row.IsNull("bankno") ? 0 : row.Field<int>("bankno");
         entity.banknoenabled = row.Field<bool>("banknoenabled");
         entity.btncustnoenabled = row.Field<bool>("btncustnoenabled");
         entity.btngroupnoenabled = row.Field<bool>("btngroupnoenabled");
         entity.btnshiptoenabled = row.Field<bool>("btnshiptoenabled");
         entity.checkamt = row.IsNull("checkamt") ? decimal.Zero : row.Field<decimal>("checkamt");
         entity.checkamtenabled = row.Field<bool>("checkamtenabled");
         entity.checkamtvisible = row.Field<bool>("checkamtvisible");
         entity.checkdt = row.Field<DateTime?>("checkdt");
         entity.checkdtenabled = row.Field<bool>("checkdtenabled");
         entity.checkdtvisible = row.Field<bool>("checkdtvisible");
         entity.checkno = row.IsNull("checkno") ? 0 : row.Field<int>("checkno");
         entity.checknoenabled = row.Field<bool>("checknoenabled");
         entity.checknovisible = row.Field<bool>("checknovisible");
         entity.checkzeroanswer = row.Field<bool>("checkzeroanswer");
         entity.checkzeroasked = row.Field<bool>("checkzeroasked");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnobgcolor = row.IsNull("custnobgcolor") ? string.Empty : row.Field<string>("custnobgcolor");
         entity.custnoenabled = row.Field<bool>("custnoenabled");
         entity.custnofgcolor = row.IsNull("custnofgcolor") ? string.Empty : row.Field<string>("custnofgcolor");
         entity.custnook = row.Field<bool>("custnook");
         entity.custstartfield = row.IsNull("custstartfield") ? string.Empty : row.Field<string>("custstartfield");
         entity.findtype = row.IsNull("findtype") ? string.Empty : row.Field<string>("findtype");
         entity.findtypeenabled = row.Field<bool>("findtypeenabled");
         entity.groupno = row.IsNull("groupno") ? string.Empty : row.Field<string>("groupno");
         entity.groupnoenabled = row.Field<bool>("groupnoenabled");
         entity.groupnook = row.Field<bool>("groupnook");
         entity.invno = row.IsNull("invno") ? 0 : row.Field<int>("invno");
         entity.invnoenabled = row.Field<bool>("invnoenabled");
         entity.invsuf = row.IsNull("invsuf") ? 0 : row.Field<int>("invsuf");
         entity.invsufenabled = row.Field<bool>("invsufenabled");
         entity.lbankwarn = row.Field<bool>("lbankwarn");
         entity.lblshipto = row.IsNull("lblshipto") ? string.Empty : row.Field<string>("lblshipto");
         entity.ldupcheckwarn = row.Field<bool>("ldupcheckwarn");
         entity.lfirstcust = row.Field<bool>("lfirstcust");
         entity.lgroup = row.Field<bool>("lgroup");
         entity.lockbox = row.IsNull("lockbox") ? string.Empty : row.Field<string>("lockbox");
         entity.lockboxenabled = row.Field<bool>("lockboxenabled");
         entity.oInvno = row.IsNull("o-invno") ? 0 : row.Field<int>("o-invno");
         entity.oInvsuf = row.IsNull("o-invsuf") ? 0 : row.Field<int>("o-invsuf");
         entity.oldfindtype = row.IsNull("oldfindtype") ? string.Empty : row.Field<string>("oldfindtype");
         entity.oversixtyanswer = row.Field<bool>("oversixtyanswer");
         entity.oversixtyasked = row.Field<bool>("oversixtyasked");
         entity.posttype = row.IsNull("posttype") ? string.Empty : row.Field<string>("posttype");
         entity.posttypeenabled = row.Field<bool>("posttypeenabled");
         entity.savebankno = row.IsNull("savebankno") ? 0 : row.Field<int>("savebankno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shiptoenabled = row.Field<bool>("shiptoenabled");
         entity.shiptook = row.Field<bool>("shiptook");
         entity.txtgroupname = row.IsNull("txtgroupname") ? string.Empty : row.Field<string>("txtgroupname");
         entity.txtshipto = row.IsNull("txtshipto") ? string.Empty : row.Field<string>("txtshipto");
         entity.txtname = row.IsNull("txtname") ? string.Empty : row.Field<string>("txtname");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArececheckdata(ref DataRow row, Arececheckdata entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("oper", entity.oper);
         row.SetField("applyamtzeroanswer", entity.applyamtzeroanswer);
         row.SetField("applyamtzeroasked", entity.applyamtzeroasked);
         row.SetField("bankfromcust", entity.bankfromcust);
         row.SetField("bankno", entity.bankno);
         row.SetField("banknoenabled", entity.banknoenabled);
         row.SetField("btncustnoenabled", entity.btncustnoenabled);
         row.SetField("btngroupnoenabled", entity.btngroupnoenabled);
         row.SetField("btnshiptoenabled", entity.btnshiptoenabled);
         row.SetField("checkamt", entity.checkamt);
         row.SetField("checkamtenabled", entity.checkamtenabled);
         row.SetField("checkamtvisible", entity.checkamtvisible);
         row.SetField("checkdt", entity.checkdt);
         row.SetField("checkdtenabled", entity.checkdtenabled);
         row.SetField("checkdtvisible", entity.checkdtvisible);
         row.SetField("checkno", entity.checkno);
         row.SetField("checknoenabled", entity.checknoenabled);
         row.SetField("checknovisible", entity.checknovisible);
         row.SetField("checkzeroanswer", entity.checkzeroanswer);
         row.SetField("checkzeroasked", entity.checkzeroasked);
         row.SetField("custno", entity.custno);
         row.SetField("custnobgcolor", entity.custnobgcolor);
         row.SetField("custnoenabled", entity.custnoenabled);
         row.SetField("custnofgcolor", entity.custnofgcolor);
         row.SetField("custnook", entity.custnook);
         row.SetField("custstartfield", entity.custstartfield);
         row.SetField("findtype", entity.findtype);
         row.SetField("findtypeenabled", entity.findtypeenabled);
         row.SetField("groupno", entity.groupno);
         row.SetField("groupnoenabled", entity.groupnoenabled);
         row.SetField("groupnook", entity.groupnook);
         row.SetField("invno", entity.invno);
         row.SetField("invnoenabled", entity.invnoenabled);
         row.SetField("invsuf", entity.invsuf);
         row.SetField("invsufenabled", entity.invsufenabled);
         row.SetField("lbankwarn", entity.lbankwarn);
         row.SetField("lblshipto", entity.lblshipto);
         row.SetField("ldupcheckwarn", entity.ldupcheckwarn);
         row.SetField("lfirstcust", entity.lfirstcust);
         row.SetField("lgroup", entity.lgroup);
         row.SetField("lockbox", entity.lockbox);
         row.SetField("lockboxenabled", entity.lockboxenabled);
         row.SetField("o-invno", entity.oInvno);
         row.SetField("o-invsuf", entity.oInvsuf);
         row.SetField("oldfindtype", entity.oldfindtype);
         row.SetField("oversixtyanswer", entity.oversixtyanswer);
         row.SetField("oversixtyasked", entity.oversixtyasked);
         row.SetField("posttype", entity.posttype);
         row.SetField("posttypeenabled", entity.posttypeenabled);
         row.SetField("savebankno", entity.savebankno);
         row.SetField("shipto", entity.shipto);
         row.SetField("shiptoenabled", entity.shiptoenabled);
         row.SetField("shiptook", entity.shiptook);
         row.SetField("txtgroupname", entity.txtgroupname);
         row.SetField("txtshipto", entity.txtshipto);
         row.SetField("txtname", entity.txtname);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
