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

namespace Infor.Sxe.SL.Data.Models.Pdsslimportdeffix
{
   [ModelName("Infor.Sxe.SL.Data.Models.Pdsslimportdeffix.Slimportdeffix")]
   public partial class Slimportdeffix : ModelBase
   {
      [StringValidationAttribute]
      public string imptype { get; set; }
      [StringValidationAttribute]
      public string filetype { get; set; }
      [StringValidationAttribute]
      public string idwdatapos { get; set; }
      [StringValidationAttribute]
      public string sldelim { get; set; }
      [StringValidationAttribute]
      public string importproc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      public int bvendcd { get; set; }
      public int lvendcd { get; set; }
      public int naedlength { get; set; }
      public int bline { get; set; }
      public int lline { get; set; }
      public int bprod { get; set; }
      public int lprod { get; set; }
      public int bdescrip1 { get; set; }
      public int bdescrip3 { get; set; }
      public int bunit { get; set; }
      public int lunit { get; set; }
      public int bweight { get; set; }
      public int lweight { get; set; }
      public int bdiscount { get; set; }
      public int ldiscount { get; set; }
      public int blist { get; set; }
      public int llist { get; set; }
      public int bcost { get; set; }
      public int lcost { get; set; }
      public int bupcno3 { get; set; }
      public int lupcno3 { get; set; }
      public int bupcno4 { get; set; }
      public int lupcno4 { get; set; }
      public int bspcunit { get; set; }
      public int lspcunit { get; set; }
      public int bmsdsno { get; set; }
      public int bmsdsfl { get; set; }
      public int bpricebrk1 { get; set; }
      public int bpricebrk2 { get; set; }
      public int bpricebrk3 { get; set; }
      public int bpricebrk4 { get; set; }
      public int bpricebrk5 { get; set; }
      public int bpricebrk6 { get; set; }
      public int bpricebrk7 { get; set; }
      public int bpricebrk8 { get; set; }
      public int bpricebrk9 { get; set; }
      public int lpricebrk1 { get; set; }
      public int lpricebrk2 { get; set; }
      public int lpricebrk3 { get; set; }
      public int lpricebrk4 { get; set; }
      public int lpricebrk5 { get; set; }
      public int lpricebrk6 { get; set; }
      public int lpricebrk7 { get; set; }
      public int lpricebrk8 { get; set; }
      public int lpricebrk9 { get; set; }
      public int bqtybrk1 { get; set; }
      public int bqtybrk2 { get; set; }
      public int bqtybrk3 { get; set; }
      public int bqtybrk4 { get; set; }
      public int bqtybrk5 { get; set; }
      public int bqtybrk6 { get; set; }
      public int bqtybrk7 { get; set; }
      public int bqtybrk8 { get; set; }
      public int lqtybrk1 { get; set; }
      public int lqtybrk2 { get; set; }
      public int lqtybrk3 { get; set; }
      public int lqtybrk4 { get; set; }
      public int lqtybrk5 { get; set; }
      public int lqtybrk6 { get; set; }
      public int lqtybrk7 { get; set; }
      public int lqtybrk8 { get; set; }
      public bool bvendcdEnabled { get; set; }
      public bool lvendcdEnabled { get; set; }
      public bool blineEnabled { get; set; }
      public bool llineEnabled { get; set; }
      public bool bprodEnabled { get; set; }
      public bool lprodEnabled { get; set; }
      public bool bdescrip1Enabled { get; set; }
      public bool ldescrip1Enabled { get; set; }
      public bool bdescrip2Enabled { get; set; }
      public bool ldescrip2Enabled { get; set; }
      public bool bdescrip3Enabled { get; set; }
      public bool ldescrip3Enabled { get; set; }
      public bool bunitEnabled { get; set; }
      public bool lunitEnabled { get; set; }
      public bool bweightEnabled { get; set; }
      public bool lweightEnabled { get; set; }
      public bool bcubesEnabled { get; set; }
      public bool lcubesEnabled { get; set; }
      public bool bdiscountEnabled { get; set; }
      public bool ldiscountEnabled { get; set; }
      public bool blistEnabled { get; set; }
      public bool llistEnabled { get; set; }
      public bool bcostEnabled { get; set; }
      public bool lcostEnabled { get; set; }
      public bool brebatecostEnabled { get; set; }
      public bool lrebatecostEnabled { get; set; }
      public bool bspcunitEnabled { get; set; }
      public bool lspcunitEnabled { get; set; }
      public bool lnotesEnabled { get; set; }
      public bool bvendateEnabled { get; set; }
      public bool lvendateEnabled { get; set; }
      public bool bsupersedeEnabled { get; set; }
      public bool lsupersedeEnabled { get; set; }
      public bool bmsdsnoEnabled { get; set; }
      public bool lmsdsnoEnabled { get; set; }
      public bool bmsdsflEnabled { get; set; }
      public bool lmsdsflEnabled { get; set; }
      public bool bupcpno1Enabled { get; set; }
      public bool lupcpno1Enabled { get; set; }
      public bool bupcpno2Enabled { get; set; }
      public bool lupcpno2Enabled { get; set; }
      public bool bupcpno3Enabled { get; set; }
      public bool lupcpno3Enabled { get; set; }
      public bool bupcpno4Enabled { get; set; }
      public bool lupcpno4Enabled { get; set; }
      public bool bupcpno5Enabled { get; set; }
      public bool lupcpno5Enabled { get; set; }
      public bool bupcpno6Enabled { get; set; }
      public bool lupcpno6Enabled { get; set; }
      public bool lcrossref1Enabled { get; set; }
      public bool lcrossref2Enabled { get; set; }
      public bool lcrossref3Enabled { get; set; }
      public bool lcrossref4Enabled { get; set; }
      public bool lUser1Enabled { get; set; }
      public bool lUser2Enabled { get; set; }
      public bool lUser3Enabled { get; set; }
      public bool lUser4Enabled { get; set; }
      public bool lUser5Enabled { get; set; }
      public bool brebatetyEnabled { get; set; }
      public bool lrebatetyEnabled { get; set; }
      public bool brebsubtyEnabled { get; set; }
      public bool lrebsubtyEnabled { get; set; }
      public bool bunitstndEnabled { get; set; }
      public bool lunitstndEnabled { get; set; }
      public bool bunitmultEnabled { get; set; }
      public bool lunitmultEnabled { get; set; }
      public bool lpricebrkEnabled1 { get; set; }
      public bool lpricebrkEnabled2 { get; set; }
      public bool lpricebrkEnabled3 { get; set; }
      public bool lpricebrkEnabled4 { get; set; }
      public bool lpricebrkEnabled5 { get; set; }
      public bool lpricebrkEnabled6 { get; set; }
      public bool lpricebrkEnabled7 { get; set; }
      public bool lpricebrkEnabled8 { get; set; }
      public bool lpricebrkEnabled9 { get; set; }
      public bool lcostbrkEnabled1 { get; set; }
      public bool lcostbrkEnabled2 { get; set; }
      public bool lcostbrkEnabled3 { get; set; }
      public bool lcostbrkEnabled4 { get; set; }
      public bool lcostbrkEnabled5 { get; set; }
      public bool lcostbrkEnabled6 { get; set; }
      public bool lcostbrkEnabled7 { get; set; }
      public bool lcostbrkEnabled8 { get; set; }
      public bool lcostbrkEnabled9 { get; set; }
      public bool lqtybrkEnabled1 { get; set; }
      public bool lqtybrkEnabled2 { get; set; }
      public bool lqtybrkEnabled3 { get; set; }
      public bool lqtybrkEnabled4 { get; set; }
      public bool lqtybrkEnabled5 { get; set; }
      public bool lqtybrkEnabled6 { get; set; }
      public bool lqtybrkEnabled7 { get; set; }
      public bool lqtybrkEnabled8 { get; set; }
      public int icupclength1 { get; set; }
      public int icupclength2 { get; set; }
      public int icupclength3 { get; set; }
      public int icupclength4 { get; set; }
      public int icupclength5 { get; set; }
      public int icupclength6 { get; set; }
      [StringValidationAttribute]
      public string icupclabel1 { get; set; }
      [StringValidationAttribute]
      public string icupclabel2 { get; set; }
      [StringValidationAttribute]
      public string icupclabel3 { get; set; }
      [StringValidationAttribute]
      public string icupclabel4 { get; set; }
      [StringValidationAttribute]
      public string icupclabel5 { get; set; }
      [StringValidationAttribute]
      public string icupclabel6 { get; set; }


      public static Slimportdeffix BuildSlimportdeffixFromRow(DataRow row)
      {
         Slimportdeffix entity = new Slimportdeffix();
         entity.imptype = row.IsNull("imptype") ? string.Empty : row.Field<string>("imptype");
         entity.filetype = row.IsNull("filetype") ? string.Empty : row.Field<string>("filetype");
         entity.idwdatapos = row.IsNull("idwdatapos") ? string.Empty : row.Field<string>("idwdatapos");
         entity.sldelim = row.IsNull("sldelim") ? string.Empty : row.Field<string>("sldelim");
         entity.importproc = row.IsNull("importproc") ? string.Empty : row.Field<string>("importproc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.bvendcd = row.IsNull("bvendcd") ? 0 : row.Field<int>("bvendcd");
         entity.lvendcd = row.IsNull("lvendcd") ? 0 : row.Field<int>("lvendcd");
         entity.naedlength = row.IsNull("naedlength") ? 0 : row.Field<int>("naedlength");
         entity.bline = row.IsNull("bline") ? 0 : row.Field<int>("bline");
         entity.lline = row.IsNull("lline") ? 0 : row.Field<int>("lline");
         entity.bprod = row.IsNull("bprod") ? 0 : row.Field<int>("bprod");
         entity.lprod = row.IsNull("lprod") ? 0 : row.Field<int>("lprod");
         entity.bdescrip1 = row.IsNull("bdescrip1") ? 0 : row.Field<int>("bdescrip1");
         entity.bdescrip3 = row.IsNull("bdescrip3") ? 0 : row.Field<int>("bdescrip3");
         entity.bunit = row.IsNull("bunit") ? 0 : row.Field<int>("bunit");
         entity.lunit = row.IsNull("lunit") ? 0 : row.Field<int>("lunit");
         entity.bweight = row.IsNull("bweight") ? 0 : row.Field<int>("bweight");
         entity.lweight = row.IsNull("lweight") ? 0 : row.Field<int>("lweight");
         entity.bdiscount = row.IsNull("bdiscount") ? 0 : row.Field<int>("bdiscount");
         entity.ldiscount = row.IsNull("ldiscount") ? 0 : row.Field<int>("ldiscount");
         entity.blist = row.IsNull("blist") ? 0 : row.Field<int>("blist");
         entity.llist = row.IsNull("llist") ? 0 : row.Field<int>("llist");
         entity.bcost = row.IsNull("bcost") ? 0 : row.Field<int>("bcost");
         entity.lcost = row.IsNull("lcost") ? 0 : row.Field<int>("lcost");
         entity.bupcno3 = row.IsNull("bupcno3") ? 0 : row.Field<int>("bupcno3");
         entity.lupcno3 = row.IsNull("lupcno3") ? 0 : row.Field<int>("lupcno3");
         entity.bupcno4 = row.IsNull("bupcno4") ? 0 : row.Field<int>("bupcno4");
         entity.lupcno4 = row.IsNull("lupcno4") ? 0 : row.Field<int>("lupcno4");
         entity.bspcunit = row.IsNull("bspcunit") ? 0 : row.Field<int>("bspcunit");
         entity.lspcunit = row.IsNull("lspcunit") ? 0 : row.Field<int>("lspcunit");
         entity.bmsdsno = row.IsNull("bmsdsno") ? 0 : row.Field<int>("bmsdsno");
         entity.bmsdsfl = row.IsNull("bmsdsfl") ? 0 : row.Field<int>("bmsdsfl");
         entity.bpricebrk1 = row.IsNull("bpricebrk1") ? 0 : row.Field<int>("bpricebrk1");
         entity.bpricebrk2 = row.IsNull("bpricebrk2") ? 0 : row.Field<int>("bpricebrk2");
         entity.bpricebrk3 = row.IsNull("bpricebrk3") ? 0 : row.Field<int>("bpricebrk3");
         entity.bpricebrk4 = row.IsNull("bpricebrk4") ? 0 : row.Field<int>("bpricebrk4");
         entity.bpricebrk5 = row.IsNull("bpricebrk5") ? 0 : row.Field<int>("bpricebrk5");
         entity.bpricebrk6 = row.IsNull("bpricebrk6") ? 0 : row.Field<int>("bpricebrk6");
         entity.bpricebrk7 = row.IsNull("bpricebrk7") ? 0 : row.Field<int>("bpricebrk7");
         entity.bpricebrk8 = row.IsNull("bpricebrk8") ? 0 : row.Field<int>("bpricebrk8");
         entity.bpricebrk9 = row.IsNull("bpricebrk9") ? 0 : row.Field<int>("bpricebrk9");
         entity.lpricebrk1 = row.IsNull("lpricebrk1") ? 0 : row.Field<int>("lpricebrk1");
         entity.lpricebrk2 = row.IsNull("lpricebrk2") ? 0 : row.Field<int>("lpricebrk2");
         entity.lpricebrk3 = row.IsNull("lpricebrk3") ? 0 : row.Field<int>("lpricebrk3");
         entity.lpricebrk4 = row.IsNull("lpricebrk4") ? 0 : row.Field<int>("lpricebrk4");
         entity.lpricebrk5 = row.IsNull("lpricebrk5") ? 0 : row.Field<int>("lpricebrk5");
         entity.lpricebrk6 = row.IsNull("lpricebrk6") ? 0 : row.Field<int>("lpricebrk6");
         entity.lpricebrk7 = row.IsNull("lpricebrk7") ? 0 : row.Field<int>("lpricebrk7");
         entity.lpricebrk8 = row.IsNull("lpricebrk8") ? 0 : row.Field<int>("lpricebrk8");
         entity.lpricebrk9 = row.IsNull("lpricebrk9") ? 0 : row.Field<int>("lpricebrk9");
         entity.bqtybrk1 = row.IsNull("bqtybrk1") ? 0 : row.Field<int>("bqtybrk1");
         entity.bqtybrk2 = row.IsNull("bqtybrk2") ? 0 : row.Field<int>("bqtybrk2");
         entity.bqtybrk3 = row.IsNull("bqtybrk3") ? 0 : row.Field<int>("bqtybrk3");
         entity.bqtybrk4 = row.IsNull("bqtybrk4") ? 0 : row.Field<int>("bqtybrk4");
         entity.bqtybrk5 = row.IsNull("bqtybrk5") ? 0 : row.Field<int>("bqtybrk5");
         entity.bqtybrk6 = row.IsNull("bqtybrk6") ? 0 : row.Field<int>("bqtybrk6");
         entity.bqtybrk7 = row.IsNull("bqtybrk7") ? 0 : row.Field<int>("bqtybrk7");
         entity.bqtybrk8 = row.IsNull("bqtybrk8") ? 0 : row.Field<int>("bqtybrk8");
         entity.lqtybrk1 = row.IsNull("lqtybrk1") ? 0 : row.Field<int>("lqtybrk1");
         entity.lqtybrk2 = row.IsNull("lqtybrk2") ? 0 : row.Field<int>("lqtybrk2");
         entity.lqtybrk3 = row.IsNull("lqtybrk3") ? 0 : row.Field<int>("lqtybrk3");
         entity.lqtybrk4 = row.IsNull("lqtybrk4") ? 0 : row.Field<int>("lqtybrk4");
         entity.lqtybrk5 = row.IsNull("lqtybrk5") ? 0 : row.Field<int>("lqtybrk5");
         entity.lqtybrk6 = row.IsNull("lqtybrk6") ? 0 : row.Field<int>("lqtybrk6");
         entity.lqtybrk7 = row.IsNull("lqtybrk7") ? 0 : row.Field<int>("lqtybrk7");
         entity.lqtybrk8 = row.IsNull("lqtybrk8") ? 0 : row.Field<int>("lqtybrk8");
         entity.bvendcdEnabled = row.Field<bool>("bvendcdEnabled");
         entity.lvendcdEnabled = row.Field<bool>("lvendcdEnabled");
         entity.blineEnabled = row.Field<bool>("blineEnabled");
         entity.llineEnabled = row.Field<bool>("llineEnabled");
         entity.bprodEnabled = row.Field<bool>("bprodEnabled");
         entity.lprodEnabled = row.Field<bool>("lprodEnabled");
         entity.bdescrip1Enabled = row.Field<bool>("bdescrip1Enabled");
         entity.ldescrip1Enabled = row.Field<bool>("ldescrip1Enabled");
         entity.bdescrip2Enabled = row.Field<bool>("bdescrip2Enabled");
         entity.ldescrip2Enabled = row.Field<bool>("ldescrip2Enabled");
         entity.bdescrip3Enabled = row.Field<bool>("bdescrip3Enabled");
         entity.ldescrip3Enabled = row.Field<bool>("ldescrip3Enabled");
         entity.bunitEnabled = row.Field<bool>("bunitEnabled");
         entity.lunitEnabled = row.Field<bool>("lunitEnabled");
         entity.bweightEnabled = row.Field<bool>("bweightEnabled");
         entity.lweightEnabled = row.Field<bool>("lweightEnabled");
         entity.bcubesEnabled = row.Field<bool>("bcubesEnabled");
         entity.lcubesEnabled = row.Field<bool>("lcubesEnabled");
         entity.bdiscountEnabled = row.Field<bool>("bdiscountEnabled");
         entity.ldiscountEnabled = row.Field<bool>("ldiscountEnabled");
         entity.blistEnabled = row.Field<bool>("blistEnabled");
         entity.llistEnabled = row.Field<bool>("llistEnabled");
         entity.bcostEnabled = row.Field<bool>("bcostEnabled");
         entity.lcostEnabled = row.Field<bool>("lcostEnabled");
         entity.brebatecostEnabled = row.Field<bool>("brebatecostEnabled");
         entity.lrebatecostEnabled = row.Field<bool>("lrebatecostEnabled");
         entity.bspcunitEnabled = row.Field<bool>("bspcunitEnabled");
         entity.lspcunitEnabled = row.Field<bool>("lspcunitEnabled");
         entity.lnotesEnabled = row.Field<bool>("lnotesEnabled");
         entity.bvendateEnabled = row.Field<bool>("bvendateEnabled");
         entity.lvendateEnabled = row.Field<bool>("lvendateEnabled");
         entity.bsupersedeEnabled = row.Field<bool>("bsupersedeEnabled");
         entity.lsupersedeEnabled = row.Field<bool>("lsupersedeEnabled");
         entity.bmsdsnoEnabled = row.Field<bool>("bmsdsnoEnabled");
         entity.lmsdsnoEnabled = row.Field<bool>("lmsdsnoEnabled");
         entity.bmsdsflEnabled = row.Field<bool>("bmsdsflEnabled");
         entity.lmsdsflEnabled = row.Field<bool>("lmsdsflEnabled");
         entity.bupcpno1Enabled = row.Field<bool>("bupcpno1Enabled");
         entity.lupcpno1Enabled = row.Field<bool>("lupcpno1Enabled");
         entity.bupcpno2Enabled = row.Field<bool>("bupcpno2Enabled");
         entity.lupcpno2Enabled = row.Field<bool>("lupcpno2Enabled");
         entity.bupcpno3Enabled = row.Field<bool>("bupcpno3Enabled");
         entity.lupcpno3Enabled = row.Field<bool>("lupcpno3Enabled");
         entity.bupcpno4Enabled = row.Field<bool>("bupcpno4Enabled");
         entity.lupcpno4Enabled = row.Field<bool>("lupcpno4Enabled");
         entity.bupcpno5Enabled = row.Field<bool>("bupcpno5Enabled");
         entity.lupcpno5Enabled = row.Field<bool>("lupcpno5Enabled");
         entity.bupcpno6Enabled = row.Field<bool>("bupcpno6Enabled");
         entity.lupcpno6Enabled = row.Field<bool>("lupcpno6Enabled");
         entity.lcrossref1Enabled = row.Field<bool>("lcrossref1Enabled");
         entity.lcrossref2Enabled = row.Field<bool>("lcrossref2Enabled");
         entity.lcrossref3Enabled = row.Field<bool>("lcrossref3Enabled");
         entity.lcrossref4Enabled = row.Field<bool>("lcrossref4Enabled");
         entity.lUser1Enabled = row.Field<bool>("lUser1Enabled");
         entity.lUser2Enabled = row.Field<bool>("lUser2Enabled");
         entity.lUser3Enabled = row.Field<bool>("lUser3Enabled");
         entity.lUser4Enabled = row.Field<bool>("lUser4Enabled");
         entity.lUser5Enabled = row.Field<bool>("lUser5Enabled");
         entity.brebatetyEnabled = row.Field<bool>("brebatetyEnabled");
         entity.lrebatetyEnabled = row.Field<bool>("lrebatetyEnabled");
         entity.brebsubtyEnabled = row.Field<bool>("brebsubtyEnabled");
         entity.lrebsubtyEnabled = row.Field<bool>("lrebsubtyEnabled");
         entity.bunitstndEnabled = row.Field<bool>("bunitstndEnabled");
         entity.lunitstndEnabled = row.Field<bool>("lunitstndEnabled");
         entity.bunitmultEnabled = row.Field<bool>("bunitmultEnabled");
         entity.lunitmultEnabled = row.Field<bool>("lunitmultEnabled");
         entity.lpricebrkEnabled1 = row.Field<bool>("lpricebrkEnabled1");
         entity.lpricebrkEnabled2 = row.Field<bool>("lpricebrkEnabled2");
         entity.lpricebrkEnabled3 = row.Field<bool>("lpricebrkEnabled3");
         entity.lpricebrkEnabled4 = row.Field<bool>("lpricebrkEnabled4");
         entity.lpricebrkEnabled5 = row.Field<bool>("lpricebrkEnabled5");
         entity.lpricebrkEnabled6 = row.Field<bool>("lpricebrkEnabled6");
         entity.lpricebrkEnabled7 = row.Field<bool>("lpricebrkEnabled7");
         entity.lpricebrkEnabled8 = row.Field<bool>("lpricebrkEnabled8");
         entity.lpricebrkEnabled9 = row.Field<bool>("lpricebrkEnabled9");
         entity.lcostbrkEnabled1 = row.Field<bool>("lcostbrkEnabled1");
         entity.lcostbrkEnabled2 = row.Field<bool>("lcostbrkEnabled2");
         entity.lcostbrkEnabled3 = row.Field<bool>("lcostbrkEnabled3");
         entity.lcostbrkEnabled4 = row.Field<bool>("lcostbrkEnabled4");
         entity.lcostbrkEnabled5 = row.Field<bool>("lcostbrkEnabled5");
         entity.lcostbrkEnabled6 = row.Field<bool>("lcostbrkEnabled6");
         entity.lcostbrkEnabled7 = row.Field<bool>("lcostbrkEnabled7");
         entity.lcostbrkEnabled8 = row.Field<bool>("lcostbrkEnabled8");
         entity.lcostbrkEnabled9 = row.Field<bool>("lcostbrkEnabled9");
         entity.lqtybrkEnabled1 = row.Field<bool>("lqtybrkEnabled1");
         entity.lqtybrkEnabled2 = row.Field<bool>("lqtybrkEnabled2");
         entity.lqtybrkEnabled3 = row.Field<bool>("lqtybrkEnabled3");
         entity.lqtybrkEnabled4 = row.Field<bool>("lqtybrkEnabled4");
         entity.lqtybrkEnabled5 = row.Field<bool>("lqtybrkEnabled5");
         entity.lqtybrkEnabled6 = row.Field<bool>("lqtybrkEnabled6");
         entity.lqtybrkEnabled7 = row.Field<bool>("lqtybrkEnabled7");
         entity.lqtybrkEnabled8 = row.Field<bool>("lqtybrkEnabled8");
         entity.icupclength1 = row.IsNull("icupclength1") ? 0 : row.Field<int>("icupclength1");
         entity.icupclength2 = row.IsNull("icupclength2") ? 0 : row.Field<int>("icupclength2");
         entity.icupclength3 = row.IsNull("icupclength3") ? 0 : row.Field<int>("icupclength3");
         entity.icupclength4 = row.IsNull("icupclength4") ? 0 : row.Field<int>("icupclength4");
         entity.icupclength5 = row.IsNull("icupclength5") ? 0 : row.Field<int>("icupclength5");
         entity.icupclength6 = row.IsNull("icupclength6") ? 0 : row.Field<int>("icupclength6");
         entity.icupclabel1 = row.IsNull("icupclabel1") ? string.Empty : row.Field<string>("icupclabel1");
         entity.icupclabel2 = row.IsNull("icupclabel2") ? string.Empty : row.Field<string>("icupclabel2");
         entity.icupclabel3 = row.IsNull("icupclabel3") ? string.Empty : row.Field<string>("icupclabel3");
         entity.icupclabel4 = row.IsNull("icupclabel4") ? string.Empty : row.Field<string>("icupclabel4");
         entity.icupclabel5 = row.IsNull("icupclabel5") ? string.Empty : row.Field<string>("icupclabel5");
         entity.icupclabel6 = row.IsNull("icupclabel6") ? string.Empty : row.Field<string>("icupclabel6");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSlimportdeffix(ref DataRow row, Slimportdeffix entity)
      {
         row.SetField("imptype", entity.imptype);
         row.SetField("filetype", entity.filetype);
         row.SetField("idwdatapos", entity.idwdatapos);
         row.SetField("sldelim", entity.sldelim);
         row.SetField("importproc", entity.importproc);
         row.SetField("userfield", entity.userfield);
         row.SetField("bvendcd", entity.bvendcd);
         row.SetField("lvendcd", entity.lvendcd);
         row.SetField("naedlength", entity.naedlength);
         row.SetField("bline", entity.bline);
         row.SetField("lline", entity.lline);
         row.SetField("bprod", entity.bprod);
         row.SetField("lprod", entity.lprod);
         row.SetField("bdescrip1", entity.bdescrip1);
         row.SetField("bdescrip3", entity.bdescrip3);
         row.SetField("bunit", entity.bunit);
         row.SetField("lunit", entity.lunit);
         row.SetField("bweight", entity.bweight);
         row.SetField("lweight", entity.lweight);
         row.SetField("bdiscount", entity.bdiscount);
         row.SetField("ldiscount", entity.ldiscount);
         row.SetField("blist", entity.blist);
         row.SetField("llist", entity.llist);
         row.SetField("bcost", entity.bcost);
         row.SetField("lcost", entity.lcost);
         row.SetField("bupcno3", entity.bupcno3);
         row.SetField("lupcno3", entity.lupcno3);
         row.SetField("bupcno4", entity.bupcno4);
         row.SetField("lupcno4", entity.lupcno4);
         row.SetField("bspcunit", entity.bspcunit);
         row.SetField("lspcunit", entity.lspcunit);
         row.SetField("bmsdsno", entity.bmsdsno);
         row.SetField("bmsdsfl", entity.bmsdsfl);
         row.SetField("bpricebrk1", entity.bpricebrk1);
         row.SetField("bpricebrk2", entity.bpricebrk2);
         row.SetField("bpricebrk3", entity.bpricebrk3);
         row.SetField("bpricebrk4", entity.bpricebrk4);
         row.SetField("bpricebrk5", entity.bpricebrk5);
         row.SetField("bpricebrk6", entity.bpricebrk6);
         row.SetField("bpricebrk7", entity.bpricebrk7);
         row.SetField("bpricebrk8", entity.bpricebrk8);
         row.SetField("bpricebrk9", entity.bpricebrk9);
         row.SetField("lpricebrk1", entity.lpricebrk1);
         row.SetField("lpricebrk2", entity.lpricebrk2);
         row.SetField("lpricebrk3", entity.lpricebrk3);
         row.SetField("lpricebrk4", entity.lpricebrk4);
         row.SetField("lpricebrk5", entity.lpricebrk5);
         row.SetField("lpricebrk6", entity.lpricebrk6);
         row.SetField("lpricebrk7", entity.lpricebrk7);
         row.SetField("lpricebrk8", entity.lpricebrk8);
         row.SetField("lpricebrk9", entity.lpricebrk9);
         row.SetField("bqtybrk1", entity.bqtybrk1);
         row.SetField("bqtybrk2", entity.bqtybrk2);
         row.SetField("bqtybrk3", entity.bqtybrk3);
         row.SetField("bqtybrk4", entity.bqtybrk4);
         row.SetField("bqtybrk5", entity.bqtybrk5);
         row.SetField("bqtybrk6", entity.bqtybrk6);
         row.SetField("bqtybrk7", entity.bqtybrk7);
         row.SetField("bqtybrk8", entity.bqtybrk8);
         row.SetField("lqtybrk1", entity.lqtybrk1);
         row.SetField("lqtybrk2", entity.lqtybrk2);
         row.SetField("lqtybrk3", entity.lqtybrk3);
         row.SetField("lqtybrk4", entity.lqtybrk4);
         row.SetField("lqtybrk5", entity.lqtybrk5);
         row.SetField("lqtybrk6", entity.lqtybrk6);
         row.SetField("lqtybrk7", entity.lqtybrk7);
         row.SetField("lqtybrk8", entity.lqtybrk8);
         row.SetField("bvendcdEnabled", entity.bvendcdEnabled);
         row.SetField("lvendcdEnabled", entity.lvendcdEnabled);
         row.SetField("blineEnabled", entity.blineEnabled);
         row.SetField("llineEnabled", entity.llineEnabled);
         row.SetField("bprodEnabled", entity.bprodEnabled);
         row.SetField("lprodEnabled", entity.lprodEnabled);
         row.SetField("bdescrip1Enabled", entity.bdescrip1Enabled);
         row.SetField("ldescrip1Enabled", entity.ldescrip1Enabled);
         row.SetField("bdescrip2Enabled", entity.bdescrip2Enabled);
         row.SetField("ldescrip2Enabled", entity.ldescrip2Enabled);
         row.SetField("bdescrip3Enabled", entity.bdescrip3Enabled);
         row.SetField("ldescrip3Enabled", entity.ldescrip3Enabled);
         row.SetField("bunitEnabled", entity.bunitEnabled);
         row.SetField("lunitEnabled", entity.lunitEnabled);
         row.SetField("bweightEnabled", entity.bweightEnabled);
         row.SetField("lweightEnabled", entity.lweightEnabled);
         row.SetField("bcubesEnabled", entity.bcubesEnabled);
         row.SetField("lcubesEnabled", entity.lcubesEnabled);
         row.SetField("bdiscountEnabled", entity.bdiscountEnabled);
         row.SetField("ldiscountEnabled", entity.ldiscountEnabled);
         row.SetField("blistEnabled", entity.blistEnabled);
         row.SetField("llistEnabled", entity.llistEnabled);
         row.SetField("bcostEnabled", entity.bcostEnabled);
         row.SetField("lcostEnabled", entity.lcostEnabled);
         row.SetField("brebatecostEnabled", entity.brebatecostEnabled);
         row.SetField("lrebatecostEnabled", entity.lrebatecostEnabled);
         row.SetField("bspcunitEnabled", entity.bspcunitEnabled);
         row.SetField("lspcunitEnabled", entity.lspcunitEnabled);
         row.SetField("lnotesEnabled", entity.lnotesEnabled);
         row.SetField("bvendateEnabled", entity.bvendateEnabled);
         row.SetField("lvendateEnabled", entity.lvendateEnabled);
         row.SetField("bsupersedeEnabled", entity.bsupersedeEnabled);
         row.SetField("lsupersedeEnabled", entity.lsupersedeEnabled);
         row.SetField("bmsdsnoEnabled", entity.bmsdsnoEnabled);
         row.SetField("lmsdsnoEnabled", entity.lmsdsnoEnabled);
         row.SetField("bmsdsflEnabled", entity.bmsdsflEnabled);
         row.SetField("lmsdsflEnabled", entity.lmsdsflEnabled);
         row.SetField("bupcpno1Enabled", entity.bupcpno1Enabled);
         row.SetField("lupcpno1Enabled", entity.lupcpno1Enabled);
         row.SetField("bupcpno2Enabled", entity.bupcpno2Enabled);
         row.SetField("lupcpno2Enabled", entity.lupcpno2Enabled);
         row.SetField("bupcpno3Enabled", entity.bupcpno3Enabled);
         row.SetField("lupcpno3Enabled", entity.lupcpno3Enabled);
         row.SetField("bupcpno4Enabled", entity.bupcpno4Enabled);
         row.SetField("lupcpno4Enabled", entity.lupcpno4Enabled);
         row.SetField("bupcpno5Enabled", entity.bupcpno5Enabled);
         row.SetField("lupcpno5Enabled", entity.lupcpno5Enabled);
         row.SetField("bupcpno6Enabled", entity.bupcpno6Enabled);
         row.SetField("lupcpno6Enabled", entity.lupcpno6Enabled);
         row.SetField("lcrossref1Enabled", entity.lcrossref1Enabled);
         row.SetField("lcrossref2Enabled", entity.lcrossref2Enabled);
         row.SetField("lcrossref3Enabled", entity.lcrossref3Enabled);
         row.SetField("lcrossref4Enabled", entity.lcrossref4Enabled);
         row.SetField("lUser1Enabled", entity.lUser1Enabled);
         row.SetField("lUser2Enabled", entity.lUser2Enabled);
         row.SetField("lUser3Enabled", entity.lUser3Enabled);
         row.SetField("lUser4Enabled", entity.lUser4Enabled);
         row.SetField("lUser5Enabled", entity.lUser5Enabled);
         row.SetField("brebatetyEnabled", entity.brebatetyEnabled);
         row.SetField("lrebatetyEnabled", entity.lrebatetyEnabled);
         row.SetField("brebsubtyEnabled", entity.brebsubtyEnabled);
         row.SetField("lrebsubtyEnabled", entity.lrebsubtyEnabled);
         row.SetField("bunitstndEnabled", entity.bunitstndEnabled);
         row.SetField("lunitstndEnabled", entity.lunitstndEnabled);
         row.SetField("bunitmultEnabled", entity.bunitmultEnabled);
         row.SetField("lunitmultEnabled", entity.lunitmultEnabled);
         row.SetField("lpricebrkEnabled1", entity.lpricebrkEnabled1);
         row.SetField("lpricebrkEnabled2", entity.lpricebrkEnabled2);
         row.SetField("lpricebrkEnabled3", entity.lpricebrkEnabled3);
         row.SetField("lpricebrkEnabled4", entity.lpricebrkEnabled4);
         row.SetField("lpricebrkEnabled5", entity.lpricebrkEnabled5);
         row.SetField("lpricebrkEnabled6", entity.lpricebrkEnabled6);
         row.SetField("lpricebrkEnabled7", entity.lpricebrkEnabled7);
         row.SetField("lpricebrkEnabled8", entity.lpricebrkEnabled8);
         row.SetField("lpricebrkEnabled9", entity.lpricebrkEnabled9);
         row.SetField("lcostbrkEnabled1", entity.lcostbrkEnabled1);
         row.SetField("lcostbrkEnabled2", entity.lcostbrkEnabled2);
         row.SetField("lcostbrkEnabled3", entity.lcostbrkEnabled3);
         row.SetField("lcostbrkEnabled4", entity.lcostbrkEnabled4);
         row.SetField("lcostbrkEnabled5", entity.lcostbrkEnabled5);
         row.SetField("lcostbrkEnabled6", entity.lcostbrkEnabled6);
         row.SetField("lcostbrkEnabled7", entity.lcostbrkEnabled7);
         row.SetField("lcostbrkEnabled8", entity.lcostbrkEnabled8);
         row.SetField("lcostbrkEnabled9", entity.lcostbrkEnabled9);
         row.SetField("lqtybrkEnabled1", entity.lqtybrkEnabled1);
         row.SetField("lqtybrkEnabled2", entity.lqtybrkEnabled2);
         row.SetField("lqtybrkEnabled3", entity.lqtybrkEnabled3);
         row.SetField("lqtybrkEnabled4", entity.lqtybrkEnabled4);
         row.SetField("lqtybrkEnabled5", entity.lqtybrkEnabled5);
         row.SetField("lqtybrkEnabled6", entity.lqtybrkEnabled6);
         row.SetField("lqtybrkEnabled7", entity.lqtybrkEnabled7);
         row.SetField("lqtybrkEnabled8", entity.lqtybrkEnabled8);
         row.SetField("icupclength1", entity.icupclength1);
         row.SetField("icupclength2", entity.icupclength2);
         row.SetField("icupclength3", entity.icupclength3);
         row.SetField("icupclength4", entity.icupclength4);
         row.SetField("icupclength5", entity.icupclength5);
         row.SetField("icupclength6", entity.icupclength6);
         row.SetField("icupclabel1", entity.icupclabel1);
         row.SetField("icupclabel2", entity.icupclabel2);
         row.SetField("icupclabel3", entity.icupclabel3);
         row.SetField("icupclabel4", entity.icupclabel4);
         row.SetField("icupclabel5", entity.icupclabel5);
         row.SetField("icupclabel6", entity.icupclabel6);

      }
   
   }
}
#pragma warning restore 1591
