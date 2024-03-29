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

namespace Infor.Sxe.SA.Data.Models.Pdssasosetupgl
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasosetupgl.Sasosetupgl")]
   public partial class Sasosetupgl : ModelBase
   {
      [StringValidationAttribute]
      public string gloverfl { get; set; }
      [StringValidationAttribute]
      public string arcontrolglacct { get; set; }
      [StringValidationAttribute]
      public string arcontrolglacctdesc { get; set; }
      public bool arcontrolglacctset { get; set; }
      [StringValidationAttribute]
      public string arsalesglacct { get; set; }
      [StringValidationAttribute]
      public string arsalesglacctdesc { get; set; }
      public bool arsalesglacctset { get; set; }
      [StringValidationAttribute]
      public string arbankglacct { get; set; }
      [StringValidationAttribute]
      public string arbankglacctdesc { get; set; }
      public bool arbankglacctset { get; set; }
      [StringValidationAttribute]
      public string arservchgglacct { get; set; }
      [StringValidationAttribute]
      public string arservchgglacctdesc { get; set; }
      public bool arservchgglacctset { get; set; }
      [StringValidationAttribute]
      public string ardiscountglacct { get; set; }
      [StringValidationAttribute]
      public string ardiscountglacctdesc { get; set; }
      public bool ardiscountglacctset { get; set; }
      [StringValidationAttribute]
      public string arwriteoffglacct { get; set; }
      [StringValidationAttribute]
      public string arwriteoffglacctdesc { get; set; }
      public bool arwriteoffglacctset { get; set; }
      [StringValidationAttribute]
      public string apcontrolglacct { get; set; }
      [StringValidationAttribute]
      public string apcontrolglacctdesc { get; set; }
      public bool apcontrolglacctset { get; set; }
      [StringValidationAttribute]
      public string apbankglacct { get; set; }
      [StringValidationAttribute]
      public string apbankglacctdesc { get; set; }
      public bool apbankglacctset { get; set; }
      [StringValidationAttribute]
      public string apdiscountglacct { get; set; }
      [StringValidationAttribute]
      public string apdiscountglacctdesc { get; set; }
      public bool apdiscountglacctset { get; set; }
      [StringValidationAttribute]
      public string apexpenseglacct { get; set; }
      [StringValidationAttribute]
      public string apexpenseglacctdesc { get; set; }
      public bool apexpenseglacctset { get; set; }
      [StringValidationAttribute]
      public string apunmatchedglacct { get; set; }
      [StringValidationAttribute]
      public string apunmatchedglacctdesc { get; set; }
      public bool apunmatchedglacctset { get; set; }
      [StringValidationAttribute]
      public string apvarianceglacct { get; set; }
      [StringValidationAttribute]
      public string apvarianceglacctdesc { get; set; }
      public bool apvarianceglacctset { get; set; }
      [StringValidationAttribute]
      public string appartnerreimburseglacct { get; set; }
      [StringValidationAttribute]
      public string appartnerreimburseglacctdesc { get; set; }
      public bool appartnerreimburseglacctset { get; set; }
      [StringValidationAttribute]
      public string apwarrantyclaimglacct { get; set; }
      [StringValidationAttribute]
      public string apwarrantyclaimglacctdesc { get; set; }
      public bool apwarrantyclaimglacctset { get; set; }
      [StringValidationAttribute]
      public string npclaimvarianceglacct { get; set; }
      [StringValidationAttribute]
      public string npclaimvarianceglacctdesc { get; set; }
      public bool npclaimvarianceglacctset { get; set; }
      [StringValidationAttribute]
      public string iccontrolglacct { get; set; }
      [StringValidationAttribute]
      public string iccontrolglacctdesc { get; set; }
      public bool iccontrolglacctset { get; set; }
      [StringValidationAttribute]
      public string icdirectglacct { get; set; }
      [StringValidationAttribute]
      public string icdirectglacctdesc { get; set; }
      public bool icdirectglacctset { get; set; }
      [StringValidationAttribute]
      public string icnonstockglacct { get; set; }
      [StringValidationAttribute]
      public string icnonstockglacctdesc { get; set; }
      public bool icnonstockglacctset { get; set; }
      [StringValidationAttribute]
      public string iccostadjglacct { get; set; }
      [StringValidationAttribute]
      public string iccostadjglacctdesc { get; set; }
      public bool iccostadjglacctset { get; set; }
      [StringValidationAttribute]
      public string icuninvinvglacct { get; set; }
      [StringValidationAttribute]
      public string icuninvinvglacctdesc { get; set; }
      public bool icuninvinvglacctset { get; set; }
      [StringValidationAttribute]
      public string iccogsglacct { get; set; }
      [StringValidationAttribute]
      public string iccogsglacctdesc { get; set; }
      public bool iccogsglacctset { get; set; }
      [StringValidationAttribute]
      public string icuninvaddonglacct { get; set; }
      [StringValidationAttribute]
      public string icuninvaddonglacctdesc { get; set; }
      public bool icuninvaddonglacctset { get; set; }
      [StringValidationAttribute]
      public string icphyadjglacct { get; set; }
      [StringValidationAttribute]
      public string icphyadjglacctdesc { get; set; }
      public bool icphyadjglacctset { get; set; }
      [StringValidationAttribute]
      public string icrebatecostglacct { get; set; }
      [StringValidationAttribute]
      public string icrebatecostglacctdesc { get; set; }
      public bool icrebatecostglacctset { get; set; }
      [StringValidationAttribute]
      public string icrebatedueglacct { get; set; }
      [StringValidationAttribute]
      public string icrebatedueglacctdesc { get; set; }
      public bool icrebatedueglacctset { get; set; }
      [StringValidationAttribute]
      public string icwipglacct { get; set; }
      [StringValidationAttribute]
      public string icwipglacctdesc { get; set; }
      public bool icwipglacctset { get; set; }
      [StringValidationAttribute]
      public string icwipwriteoffglacct { get; set; }
      [StringValidationAttribute]
      public string icwipwriteoffglacctdesc { get; set; }
      public bool icwipwriteoffglacctset { get; set; }
      [StringValidationAttribute]
      public string icrebatewriteoffglacct { get; set; }
      [StringValidationAttribute]
      public string icrebatewriteoffglacctdesc { get; set; }
      public bool icrebatewriteoffglacctset { get; set; }
      [StringValidationAttribute]
      public string oegrosssalesglacct { get; set; }
      [StringValidationAttribute]
      public string oegrosssalesglacctdesc { get; set; }
      public bool oegrosssalesglacctset { get; set; }
      [StringValidationAttribute]
      public string oedirectsalesglacct { get; set; }
      [StringValidationAttribute]
      public string oedirectsalesglacctdesc { get; set; }
      public bool oedirectsalesglacctset { get; set; }
      [StringValidationAttribute]
      public string oecogsglacct { get; set; }
      [StringValidationAttribute]
      public string oecogsglacctdesc { get; set; }
      public bool oecogsglacctset { get; set; }
      [StringValidationAttribute]
      public string oedirectcogsglacct { get; set; }
      [StringValidationAttribute]
      public string oedirectcogsglacctdesc { get; set; }
      public bool oedirectcogsglacctset { get; set; }
      [StringValidationAttribute]
      public string oedownpayglacct { get; set; }
      [StringValidationAttribute]
      public string oedownpayglacctdesc { get; set; }
      public bool oedownpayglacctset { get; set; }
      [StringValidationAttribute]
      public string oeuninvcashglacct { get; set; }
      [StringValidationAttribute]
      public string oeuninvcashglacctdesc { get; set; }
      public bool oeuninvcashglacctset { get; set; }
      [StringValidationAttribute]
      public string oelinediscglacct { get; set; }
      [StringValidationAttribute]
      public string oelinediscglacctdesc { get; set; }
      public bool oelinediscglacctset { get; set; }
      [StringValidationAttribute]
      public string oeorderdiscglacct { get; set; }
      [StringValidationAttribute]
      public string oeorderdiscglacctdesc { get; set; }
      public bool oeorderdiscglacctset { get; set; }
      [StringValidationAttribute]
      public string oecodglacct { get; set; }
      [StringValidationAttribute]
      public string oecodglacctdesc { get; set; }
      public bool oecodglacctset { get; set; }
      [StringValidationAttribute]
      public string oecorechrgglacct { get; set; }
      [StringValidationAttribute]
      public string oecorechrgglacctdesc { get; set; }
      public bool oecorechrgglacctset { get; set; }
      [StringValidationAttribute]
      public string oelumpsumglacct { get; set; }
      [StringValidationAttribute]
      public string oelumpsumglacctdesc { get; set; }
      public bool oelumpsumglacctset { get; set; }
      [StringValidationAttribute]
      public string oerestockglacct { get; set; }
      [StringValidationAttribute]
      public string oerestockglacctdesc { get; set; }
      public bool oerestockglacctset { get; set; }
      [StringValidationAttribute]
      public string oereturnglacct { get; set; }
      [StringValidationAttribute]
      public string oereturnglacctdesc { get; set; }
      public bool oereturnglacctset { get; set; }
      [StringValidationAttribute]
      public string poorderdiscglacct { get; set; }
      [StringValidationAttribute]
      public string poorderdiscglacctdesc { get; set; }
      public bool poorderdiscglacctset { get; set; }
      [StringValidationAttribute]
      public string potallyglacct { get; set; }
      [StringValidationAttribute]
      public string potallyglacctdesc { get; set; }
      public bool potallyglacctset { get; set; }
      [StringValidationAttribute]
      public string wtcostadjglacct { get; set; }
      [StringValidationAttribute]
      public string wtcostadjglacctdesc { get; set; }
      public bool wtcostadjglacctset { get; set; }
      [StringValidationAttribute]
      public string coresdueglacct { get; set; }
      [StringValidationAttribute]
      public string coresdueglacctdesc { get; set; }
      public bool coresdueglacctset { get; set; }
      [StringValidationAttribute]
      public string corescustliabglacct { get; set; }
      [StringValidationAttribute]
      public string corescustliabglacctdesc { get; set; }
      public bool corescustliabglacctset { get; set; }
      [StringValidationAttribute]
      public string coresconvglacct { get; set; }
      [StringValidationAttribute]
      public string coresconvglacctdesc { get; set; }
      public bool coresconvglacctset { get; set; }
      [StringValidationAttribute]
      public string coresvendliabglacct { get; set; }
      [StringValidationAttribute]
      public string coresvendliabglacctdesc { get; set; }
      public bool coresvendliabglacctset { get; set; }
      [StringValidationAttribute]
      public string coresvarianceglacct { get; set; }
      [StringValidationAttribute]
      public string coresvarianceglacctdesc { get; set; }
      public bool coresvarianceglacctset { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasosetupgl BuildSasosetupglFromRow(DataRow row)
      {
         Sasosetupgl entity = new Sasosetupgl();
         entity.gloverfl = row.IsNull("gloverfl") ? string.Empty : row.Field<string>("gloverfl");
         entity.arcontrolglacct = row.IsNull("arcontrolglacct") ? string.Empty : row.Field<string>("arcontrolglacct");
         entity.arcontrolglacctdesc = row.IsNull("arcontrolglacctdesc") ? string.Empty : row.Field<string>("arcontrolglacctdesc");
         entity.arcontrolglacctset = row.Field<bool>("arcontrolglacctset");
         entity.arsalesglacct = row.IsNull("arsalesglacct") ? string.Empty : row.Field<string>("arsalesglacct");
         entity.arsalesglacctdesc = row.IsNull("arsalesglacctdesc") ? string.Empty : row.Field<string>("arsalesglacctdesc");
         entity.arsalesglacctset = row.Field<bool>("arsalesglacctset");
         entity.arbankglacct = row.IsNull("arbankglacct") ? string.Empty : row.Field<string>("arbankglacct");
         entity.arbankglacctdesc = row.IsNull("arbankglacctdesc") ? string.Empty : row.Field<string>("arbankglacctdesc");
         entity.arbankglacctset = row.Field<bool>("arbankglacctset");
         entity.arservchgglacct = row.IsNull("arservchgglacct") ? string.Empty : row.Field<string>("arservchgglacct");
         entity.arservchgglacctdesc = row.IsNull("arservchgglacctdesc") ? string.Empty : row.Field<string>("arservchgglacctdesc");
         entity.arservchgglacctset = row.Field<bool>("arservchgglacctset");
         entity.ardiscountglacct = row.IsNull("ardiscountglacct") ? string.Empty : row.Field<string>("ardiscountglacct");
         entity.ardiscountglacctdesc = row.IsNull("ardiscountglacctdesc") ? string.Empty : row.Field<string>("ardiscountglacctdesc");
         entity.ardiscountglacctset = row.Field<bool>("ardiscountglacctset");
         entity.arwriteoffglacct = row.IsNull("arwriteoffglacct") ? string.Empty : row.Field<string>("arwriteoffglacct");
         entity.arwriteoffglacctdesc = row.IsNull("arwriteoffglacctdesc") ? string.Empty : row.Field<string>("arwriteoffglacctdesc");
         entity.arwriteoffglacctset = row.Field<bool>("arwriteoffglacctset");
         entity.apcontrolglacct = row.IsNull("apcontrolglacct") ? string.Empty : row.Field<string>("apcontrolglacct");
         entity.apcontrolglacctdesc = row.IsNull("apcontrolglacctdesc") ? string.Empty : row.Field<string>("apcontrolglacctdesc");
         entity.apcontrolglacctset = row.Field<bool>("apcontrolglacctset");
         entity.apbankglacct = row.IsNull("apbankglacct") ? string.Empty : row.Field<string>("apbankglacct");
         entity.apbankglacctdesc = row.IsNull("apbankglacctdesc") ? string.Empty : row.Field<string>("apbankglacctdesc");
         entity.apbankglacctset = row.Field<bool>("apbankglacctset");
         entity.apdiscountglacct = row.IsNull("apdiscountglacct") ? string.Empty : row.Field<string>("apdiscountglacct");
         entity.apdiscountglacctdesc = row.IsNull("apdiscountglacctdesc") ? string.Empty : row.Field<string>("apdiscountglacctdesc");
         entity.apdiscountglacctset = row.Field<bool>("apdiscountglacctset");
         entity.apexpenseglacct = row.IsNull("apexpenseglacct") ? string.Empty : row.Field<string>("apexpenseglacct");
         entity.apexpenseglacctdesc = row.IsNull("apexpenseglacctdesc") ? string.Empty : row.Field<string>("apexpenseglacctdesc");
         entity.apexpenseglacctset = row.Field<bool>("apexpenseglacctset");
         entity.apunmatchedglacct = row.IsNull("apunmatchedglacct") ? string.Empty : row.Field<string>("apunmatchedglacct");
         entity.apunmatchedglacctdesc = row.IsNull("apunmatchedglacctdesc") ? string.Empty : row.Field<string>("apunmatchedglacctdesc");
         entity.apunmatchedglacctset = row.Field<bool>("apunmatchedglacctset");
         entity.apvarianceglacct = row.IsNull("apvarianceglacct") ? string.Empty : row.Field<string>("apvarianceglacct");
         entity.apvarianceglacctdesc = row.IsNull("apvarianceglacctdesc") ? string.Empty : row.Field<string>("apvarianceglacctdesc");
         entity.apvarianceglacctset = row.Field<bool>("apvarianceglacctset");
         entity.appartnerreimburseglacct = row.IsNull("appartnerreimburseglacct") ? string.Empty : row.Field<string>("appartnerreimburseglacct");
         entity.appartnerreimburseglacctdesc = row.IsNull("appartnerreimburseglacctdesc") ? string.Empty : row.Field<string>("appartnerreimburseglacctdesc");
         entity.appartnerreimburseglacctset = row.Field<bool>("appartnerreimburseglacctset");
         entity.apwarrantyclaimglacct = row.IsNull("apwarrantyclaimglacct") ? string.Empty : row.Field<string>("apwarrantyclaimglacct");
         entity.apwarrantyclaimglacctdesc = row.IsNull("apwarrantyclaimglacctdesc") ? string.Empty : row.Field<string>("apwarrantyclaimglacctdesc");
         entity.apwarrantyclaimglacctset = row.Field<bool>("apwarrantyclaimglacctset");
         entity.npclaimvarianceglacct = row.IsNull("npclaimvarianceglacct") ? string.Empty : row.Field<string>("npclaimvarianceglacct");
         entity.npclaimvarianceglacctdesc = row.IsNull("npclaimvarianceglacctdesc") ? string.Empty : row.Field<string>("npclaimvarianceglacctdesc");
         entity.npclaimvarianceglacctset = row.Field<bool>("npclaimvarianceglacctset");
         entity.iccontrolglacct = row.IsNull("iccontrolglacct") ? string.Empty : row.Field<string>("iccontrolglacct");
         entity.iccontrolglacctdesc = row.IsNull("iccontrolglacctdesc") ? string.Empty : row.Field<string>("iccontrolglacctdesc");
         entity.iccontrolglacctset = row.Field<bool>("iccontrolglacctset");
         entity.icdirectglacct = row.IsNull("icdirectglacct") ? string.Empty : row.Field<string>("icdirectglacct");
         entity.icdirectglacctdesc = row.IsNull("icdirectglacctdesc") ? string.Empty : row.Field<string>("icdirectglacctdesc");
         entity.icdirectglacctset = row.Field<bool>("icdirectglacctset");
         entity.icnonstockglacct = row.IsNull("icnonstockglacct") ? string.Empty : row.Field<string>("icnonstockglacct");
         entity.icnonstockglacctdesc = row.IsNull("icnonstockglacctdesc") ? string.Empty : row.Field<string>("icnonstockglacctdesc");
         entity.icnonstockglacctset = row.Field<bool>("icnonstockglacctset");
         entity.iccostadjglacct = row.IsNull("iccostadjglacct") ? string.Empty : row.Field<string>("iccostadjglacct");
         entity.iccostadjglacctdesc = row.IsNull("iccostadjglacctdesc") ? string.Empty : row.Field<string>("iccostadjglacctdesc");
         entity.iccostadjglacctset = row.Field<bool>("iccostadjglacctset");
         entity.icuninvinvglacct = row.IsNull("icuninvinvglacct") ? string.Empty : row.Field<string>("icuninvinvglacct");
         entity.icuninvinvglacctdesc = row.IsNull("icuninvinvglacctdesc") ? string.Empty : row.Field<string>("icuninvinvglacctdesc");
         entity.icuninvinvglacctset = row.Field<bool>("icuninvinvglacctset");
         entity.iccogsglacct = row.IsNull("iccogsglacct") ? string.Empty : row.Field<string>("iccogsglacct");
         entity.iccogsglacctdesc = row.IsNull("iccogsglacctdesc") ? string.Empty : row.Field<string>("iccogsglacctdesc");
         entity.iccogsglacctset = row.Field<bool>("iccogsglacctset");
         entity.icuninvaddonglacct = row.IsNull("icuninvaddonglacct") ? string.Empty : row.Field<string>("icuninvaddonglacct");
         entity.icuninvaddonglacctdesc = row.IsNull("icuninvaddonglacctdesc") ? string.Empty : row.Field<string>("icuninvaddonglacctdesc");
         entity.icuninvaddonglacctset = row.Field<bool>("icuninvaddonglacctset");
         entity.icphyadjglacct = row.IsNull("icphyadjglacct") ? string.Empty : row.Field<string>("icphyadjglacct");
         entity.icphyadjglacctdesc = row.IsNull("icphyadjglacctdesc") ? string.Empty : row.Field<string>("icphyadjglacctdesc");
         entity.icphyadjglacctset = row.Field<bool>("icphyadjglacctset");
         entity.icrebatecostglacct = row.IsNull("icrebatecostglacct") ? string.Empty : row.Field<string>("icrebatecostglacct");
         entity.icrebatecostglacctdesc = row.IsNull("icrebatecostglacctdesc") ? string.Empty : row.Field<string>("icrebatecostglacctdesc");
         entity.icrebatecostglacctset = row.Field<bool>("icrebatecostglacctset");
         entity.icrebatedueglacct = row.IsNull("icrebatedueglacct") ? string.Empty : row.Field<string>("icrebatedueglacct");
         entity.icrebatedueglacctdesc = row.IsNull("icrebatedueglacctdesc") ? string.Empty : row.Field<string>("icrebatedueglacctdesc");
         entity.icrebatedueglacctset = row.Field<bool>("icrebatedueglacctset");
         entity.icwipglacct = row.IsNull("icwipglacct") ? string.Empty : row.Field<string>("icwipglacct");
         entity.icwipglacctdesc = row.IsNull("icwipglacctdesc") ? string.Empty : row.Field<string>("icwipglacctdesc");
         entity.icwipglacctset = row.Field<bool>("icwipglacctset");
         entity.icwipwriteoffglacct = row.IsNull("icwipwriteoffglacct") ? string.Empty : row.Field<string>("icwipwriteoffglacct");
         entity.icwipwriteoffglacctdesc = row.IsNull("icwipwriteoffglacctdesc") ? string.Empty : row.Field<string>("icwipwriteoffglacctdesc");
         entity.icwipwriteoffglacctset = row.Field<bool>("icwipwriteoffglacctset");
         entity.icrebatewriteoffglacct = row.IsNull("icrebatewriteoffglacct") ? string.Empty : row.Field<string>("icrebatewriteoffglacct");
         entity.icrebatewriteoffglacctdesc = row.IsNull("icrebatewriteoffglacctdesc") ? string.Empty : row.Field<string>("icrebatewriteoffglacctdesc");
         entity.icrebatewriteoffglacctset = row.Field<bool>("icrebatewriteoffglacctset");
         entity.oegrosssalesglacct = row.IsNull("oegrosssalesglacct") ? string.Empty : row.Field<string>("oegrosssalesglacct");
         entity.oegrosssalesglacctdesc = row.IsNull("oegrosssalesglacctdesc") ? string.Empty : row.Field<string>("oegrosssalesglacctdesc");
         entity.oegrosssalesglacctset = row.Field<bool>("oegrosssalesglacctset");
         entity.oedirectsalesglacct = row.IsNull("oedirectsalesglacct") ? string.Empty : row.Field<string>("oedirectsalesglacct");
         entity.oedirectsalesglacctdesc = row.IsNull("oedirectsalesglacctdesc") ? string.Empty : row.Field<string>("oedirectsalesglacctdesc");
         entity.oedirectsalesglacctset = row.Field<bool>("oedirectsalesglacctset");
         entity.oecogsglacct = row.IsNull("oecogsglacct") ? string.Empty : row.Field<string>("oecogsglacct");
         entity.oecogsglacctdesc = row.IsNull("oecogsglacctdesc") ? string.Empty : row.Field<string>("oecogsglacctdesc");
         entity.oecogsglacctset = row.Field<bool>("oecogsglacctset");
         entity.oedirectcogsglacct = row.IsNull("oedirectcogsglacct") ? string.Empty : row.Field<string>("oedirectcogsglacct");
         entity.oedirectcogsglacctdesc = row.IsNull("oedirectcogsglacctdesc") ? string.Empty : row.Field<string>("oedirectcogsglacctdesc");
         entity.oedirectcogsglacctset = row.Field<bool>("oedirectcogsglacctset");
         entity.oedownpayglacct = row.IsNull("oedownpayglacct") ? string.Empty : row.Field<string>("oedownpayglacct");
         entity.oedownpayglacctdesc = row.IsNull("oedownpayglacctdesc") ? string.Empty : row.Field<string>("oedownpayglacctdesc");
         entity.oedownpayglacctset = row.Field<bool>("oedownpayglacctset");
         entity.oeuninvcashglacct = row.IsNull("oeuninvcashglacct") ? string.Empty : row.Field<string>("oeuninvcashglacct");
         entity.oeuninvcashglacctdesc = row.IsNull("oeuninvcashglacctdesc") ? string.Empty : row.Field<string>("oeuninvcashglacctdesc");
         entity.oeuninvcashglacctset = row.Field<bool>("oeuninvcashglacctset");
         entity.oelinediscglacct = row.IsNull("oelinediscglacct") ? string.Empty : row.Field<string>("oelinediscglacct");
         entity.oelinediscglacctdesc = row.IsNull("oelinediscglacctdesc") ? string.Empty : row.Field<string>("oelinediscglacctdesc");
         entity.oelinediscglacctset = row.Field<bool>("oelinediscglacctset");
         entity.oeorderdiscglacct = row.IsNull("oeorderdiscglacct") ? string.Empty : row.Field<string>("oeorderdiscglacct");
         entity.oeorderdiscglacctdesc = row.IsNull("oeorderdiscglacctdesc") ? string.Empty : row.Field<string>("oeorderdiscglacctdesc");
         entity.oeorderdiscglacctset = row.Field<bool>("oeorderdiscglacctset");
         entity.oecodglacct = row.IsNull("oecodglacct") ? string.Empty : row.Field<string>("oecodglacct");
         entity.oecodglacctdesc = row.IsNull("oecodglacctdesc") ? string.Empty : row.Field<string>("oecodglacctdesc");
         entity.oecodglacctset = row.Field<bool>("oecodglacctset");
         entity.oecorechrgglacct = row.IsNull("oecorechrgglacct") ? string.Empty : row.Field<string>("oecorechrgglacct");
         entity.oecorechrgglacctdesc = row.IsNull("oecorechrgglacctdesc") ? string.Empty : row.Field<string>("oecorechrgglacctdesc");
         entity.oecorechrgglacctset = row.Field<bool>("oecorechrgglacctset");
         entity.oelumpsumglacct = row.IsNull("oelumpsumglacct") ? string.Empty : row.Field<string>("oelumpsumglacct");
         entity.oelumpsumglacctdesc = row.IsNull("oelumpsumglacctdesc") ? string.Empty : row.Field<string>("oelumpsumglacctdesc");
         entity.oelumpsumglacctset = row.Field<bool>("oelumpsumglacctset");
         entity.oerestockglacct = row.IsNull("oerestockglacct") ? string.Empty : row.Field<string>("oerestockglacct");
         entity.oerestockglacctdesc = row.IsNull("oerestockglacctdesc") ? string.Empty : row.Field<string>("oerestockglacctdesc");
         entity.oerestockglacctset = row.Field<bool>("oerestockglacctset");
         entity.oereturnglacct = row.IsNull("oereturnglacct") ? string.Empty : row.Field<string>("oereturnglacct");
         entity.oereturnglacctdesc = row.IsNull("oereturnglacctdesc") ? string.Empty : row.Field<string>("oereturnglacctdesc");
         entity.oereturnglacctset = row.Field<bool>("oereturnglacctset");
         entity.poorderdiscglacct = row.IsNull("poorderdiscglacct") ? string.Empty : row.Field<string>("poorderdiscglacct");
         entity.poorderdiscglacctdesc = row.IsNull("poorderdiscglacctdesc") ? string.Empty : row.Field<string>("poorderdiscglacctdesc");
         entity.poorderdiscglacctset = row.Field<bool>("poorderdiscglacctset");
         entity.potallyglacct = row.IsNull("potallyglacct") ? string.Empty : row.Field<string>("potallyglacct");
         entity.potallyglacctdesc = row.IsNull("potallyglacctdesc") ? string.Empty : row.Field<string>("potallyglacctdesc");
         entity.potallyglacctset = row.Field<bool>("potallyglacctset");
         entity.wtcostadjglacct = row.IsNull("wtcostadjglacct") ? string.Empty : row.Field<string>("wtcostadjglacct");
         entity.wtcostadjglacctdesc = row.IsNull("wtcostadjglacctdesc") ? string.Empty : row.Field<string>("wtcostadjglacctdesc");
         entity.wtcostadjglacctset = row.Field<bool>("wtcostadjglacctset");
         entity.coresdueglacct = row.IsNull("coresdueglacct") ? string.Empty : row.Field<string>("coresdueglacct");
         entity.coresdueglacctdesc = row.IsNull("coresdueglacctdesc") ? string.Empty : row.Field<string>("coresdueglacctdesc");
         entity.coresdueglacctset = row.Field<bool>("coresdueglacctset");
         entity.corescustliabglacct = row.IsNull("corescustliabglacct") ? string.Empty : row.Field<string>("corescustliabglacct");
         entity.corescustliabglacctdesc = row.IsNull("corescustliabglacctdesc") ? string.Empty : row.Field<string>("corescustliabglacctdesc");
         entity.corescustliabglacctset = row.Field<bool>("corescustliabglacctset");
         entity.coresconvglacct = row.IsNull("coresconvglacct") ? string.Empty : row.Field<string>("coresconvglacct");
         entity.coresconvglacctdesc = row.IsNull("coresconvglacctdesc") ? string.Empty : row.Field<string>("coresconvglacctdesc");
         entity.coresconvglacctset = row.Field<bool>("coresconvglacctset");
         entity.coresvendliabglacct = row.IsNull("coresvendliabglacct") ? string.Empty : row.Field<string>("coresvendliabglacct");
         entity.coresvendliabglacctdesc = row.IsNull("coresvendliabglacctdesc") ? string.Empty : row.Field<string>("coresvendliabglacctdesc");
         entity.coresvendliabglacctset = row.Field<bool>("coresvendliabglacctset");
         entity.coresvarianceglacct = row.IsNull("coresvarianceglacct") ? string.Empty : row.Field<string>("coresvarianceglacct");
         entity.coresvarianceglacctdesc = row.IsNull("coresvarianceglacctdesc") ? string.Empty : row.Field<string>("coresvarianceglacctdesc");
         entity.coresvarianceglacctset = row.Field<bool>("coresvarianceglacctset");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasosetupgl(ref DataRow row, Sasosetupgl entity)
      {
         row.SetField("gloverfl", entity.gloverfl);
         row.SetField("arcontrolglacct", entity.arcontrolglacct);
         row.SetField("arcontrolglacctdesc", entity.arcontrolglacctdesc);
         row.SetField("arcontrolglacctset", entity.arcontrolglacctset);
         row.SetField("arsalesglacct", entity.arsalesglacct);
         row.SetField("arsalesglacctdesc", entity.arsalesglacctdesc);
         row.SetField("arsalesglacctset", entity.arsalesglacctset);
         row.SetField("arbankglacct", entity.arbankglacct);
         row.SetField("arbankglacctdesc", entity.arbankglacctdesc);
         row.SetField("arbankglacctset", entity.arbankglacctset);
         row.SetField("arservchgglacct", entity.arservchgglacct);
         row.SetField("arservchgglacctdesc", entity.arservchgglacctdesc);
         row.SetField("arservchgglacctset", entity.arservchgglacctset);
         row.SetField("ardiscountglacct", entity.ardiscountglacct);
         row.SetField("ardiscountglacctdesc", entity.ardiscountglacctdesc);
         row.SetField("ardiscountglacctset", entity.ardiscountglacctset);
         row.SetField("arwriteoffglacct", entity.arwriteoffglacct);
         row.SetField("arwriteoffglacctdesc", entity.arwriteoffglacctdesc);
         row.SetField("arwriteoffglacctset", entity.arwriteoffglacctset);
         row.SetField("apcontrolglacct", entity.apcontrolglacct);
         row.SetField("apcontrolglacctdesc", entity.apcontrolglacctdesc);
         row.SetField("apcontrolglacctset", entity.apcontrolglacctset);
         row.SetField("apbankglacct", entity.apbankglacct);
         row.SetField("apbankglacctdesc", entity.apbankglacctdesc);
         row.SetField("apbankglacctset", entity.apbankglacctset);
         row.SetField("apdiscountglacct", entity.apdiscountglacct);
         row.SetField("apdiscountglacctdesc", entity.apdiscountglacctdesc);
         row.SetField("apdiscountglacctset", entity.apdiscountglacctset);
         row.SetField("apexpenseglacct", entity.apexpenseglacct);
         row.SetField("apexpenseglacctdesc", entity.apexpenseglacctdesc);
         row.SetField("apexpenseglacctset", entity.apexpenseglacctset);
         row.SetField("apunmatchedglacct", entity.apunmatchedglacct);
         row.SetField("apunmatchedglacctdesc", entity.apunmatchedglacctdesc);
         row.SetField("apunmatchedglacctset", entity.apunmatchedglacctset);
         row.SetField("apvarianceglacct", entity.apvarianceglacct);
         row.SetField("apvarianceglacctdesc", entity.apvarianceglacctdesc);
         row.SetField("apvarianceglacctset", entity.apvarianceglacctset);
         row.SetField("appartnerreimburseglacct", entity.appartnerreimburseglacct);
         row.SetField("appartnerreimburseglacctdesc", entity.appartnerreimburseglacctdesc);
         row.SetField("appartnerreimburseglacctset", entity.appartnerreimburseglacctset);
         row.SetField("apwarrantyclaimglacct", entity.apwarrantyclaimglacct);
         row.SetField("apwarrantyclaimglacctdesc", entity.apwarrantyclaimglacctdesc);
         row.SetField("apwarrantyclaimglacctset", entity.apwarrantyclaimglacctset);
         row.SetField("npclaimvarianceglacct", entity.npclaimvarianceglacct);
         row.SetField("npclaimvarianceglacctdesc", entity.npclaimvarianceglacctdesc);
         row.SetField("npclaimvarianceglacctset", entity.npclaimvarianceglacctset);
         row.SetField("iccontrolglacct", entity.iccontrolglacct);
         row.SetField("iccontrolglacctdesc", entity.iccontrolglacctdesc);
         row.SetField("iccontrolglacctset", entity.iccontrolglacctset);
         row.SetField("icdirectglacct", entity.icdirectglacct);
         row.SetField("icdirectglacctdesc", entity.icdirectglacctdesc);
         row.SetField("icdirectglacctset", entity.icdirectglacctset);
         row.SetField("icnonstockglacct", entity.icnonstockglacct);
         row.SetField("icnonstockglacctdesc", entity.icnonstockglacctdesc);
         row.SetField("icnonstockglacctset", entity.icnonstockglacctset);
         row.SetField("iccostadjglacct", entity.iccostadjglacct);
         row.SetField("iccostadjglacctdesc", entity.iccostadjglacctdesc);
         row.SetField("iccostadjglacctset", entity.iccostadjglacctset);
         row.SetField("icuninvinvglacct", entity.icuninvinvglacct);
         row.SetField("icuninvinvglacctdesc", entity.icuninvinvglacctdesc);
         row.SetField("icuninvinvglacctset", entity.icuninvinvglacctset);
         row.SetField("iccogsglacct", entity.iccogsglacct);
         row.SetField("iccogsglacctdesc", entity.iccogsglacctdesc);
         row.SetField("iccogsglacctset", entity.iccogsglacctset);
         row.SetField("icuninvaddonglacct", entity.icuninvaddonglacct);
         row.SetField("icuninvaddonglacctdesc", entity.icuninvaddonglacctdesc);
         row.SetField("icuninvaddonglacctset", entity.icuninvaddonglacctset);
         row.SetField("icphyadjglacct", entity.icphyadjglacct);
         row.SetField("icphyadjglacctdesc", entity.icphyadjglacctdesc);
         row.SetField("icphyadjglacctset", entity.icphyadjglacctset);
         row.SetField("icrebatecostglacct", entity.icrebatecostglacct);
         row.SetField("icrebatecostglacctdesc", entity.icrebatecostglacctdesc);
         row.SetField("icrebatecostglacctset", entity.icrebatecostglacctset);
         row.SetField("icrebatedueglacct", entity.icrebatedueglacct);
         row.SetField("icrebatedueglacctdesc", entity.icrebatedueglacctdesc);
         row.SetField("icrebatedueglacctset", entity.icrebatedueglacctset);
         row.SetField("icwipglacct", entity.icwipglacct);
         row.SetField("icwipglacctdesc", entity.icwipglacctdesc);
         row.SetField("icwipglacctset", entity.icwipglacctset);
         row.SetField("icwipwriteoffglacct", entity.icwipwriteoffglacct);
         row.SetField("icwipwriteoffglacctdesc", entity.icwipwriteoffglacctdesc);
         row.SetField("icwipwriteoffglacctset", entity.icwipwriteoffglacctset);
         row.SetField("icrebatewriteoffglacct", entity.icrebatewriteoffglacct);
         row.SetField("icrebatewriteoffglacctdesc", entity.icrebatewriteoffglacctdesc);
         row.SetField("icrebatewriteoffglacctset", entity.icrebatewriteoffglacctset);
         row.SetField("oegrosssalesglacct", entity.oegrosssalesglacct);
         row.SetField("oegrosssalesglacctdesc", entity.oegrosssalesglacctdesc);
         row.SetField("oegrosssalesglacctset", entity.oegrosssalesglacctset);
         row.SetField("oedirectsalesglacct", entity.oedirectsalesglacct);
         row.SetField("oedirectsalesglacctdesc", entity.oedirectsalesglacctdesc);
         row.SetField("oedirectsalesglacctset", entity.oedirectsalesglacctset);
         row.SetField("oecogsglacct", entity.oecogsglacct);
         row.SetField("oecogsglacctdesc", entity.oecogsglacctdesc);
         row.SetField("oecogsglacctset", entity.oecogsglacctset);
         row.SetField("oedirectcogsglacct", entity.oedirectcogsglacct);
         row.SetField("oedirectcogsglacctdesc", entity.oedirectcogsglacctdesc);
         row.SetField("oedirectcogsglacctset", entity.oedirectcogsglacctset);
         row.SetField("oedownpayglacct", entity.oedownpayglacct);
         row.SetField("oedownpayglacctdesc", entity.oedownpayglacctdesc);
         row.SetField("oedownpayglacctset", entity.oedownpayglacctset);
         row.SetField("oeuninvcashglacct", entity.oeuninvcashglacct);
         row.SetField("oeuninvcashglacctdesc", entity.oeuninvcashglacctdesc);
         row.SetField("oeuninvcashglacctset", entity.oeuninvcashglacctset);
         row.SetField("oelinediscglacct", entity.oelinediscglacct);
         row.SetField("oelinediscglacctdesc", entity.oelinediscglacctdesc);
         row.SetField("oelinediscglacctset", entity.oelinediscglacctset);
         row.SetField("oeorderdiscglacct", entity.oeorderdiscglacct);
         row.SetField("oeorderdiscglacctdesc", entity.oeorderdiscglacctdesc);
         row.SetField("oeorderdiscglacctset", entity.oeorderdiscglacctset);
         row.SetField("oecodglacct", entity.oecodglacct);
         row.SetField("oecodglacctdesc", entity.oecodglacctdesc);
         row.SetField("oecodglacctset", entity.oecodglacctset);
         row.SetField("oecorechrgglacct", entity.oecorechrgglacct);
         row.SetField("oecorechrgglacctdesc", entity.oecorechrgglacctdesc);
         row.SetField("oecorechrgglacctset", entity.oecorechrgglacctset);
         row.SetField("oelumpsumglacct", entity.oelumpsumglacct);
         row.SetField("oelumpsumglacctdesc", entity.oelumpsumglacctdesc);
         row.SetField("oelumpsumglacctset", entity.oelumpsumglacctset);
         row.SetField("oerestockglacct", entity.oerestockglacct);
         row.SetField("oerestockglacctdesc", entity.oerestockglacctdesc);
         row.SetField("oerestockglacctset", entity.oerestockglacctset);
         row.SetField("oereturnglacct", entity.oereturnglacct);
         row.SetField("oereturnglacctdesc", entity.oereturnglacctdesc);
         row.SetField("oereturnglacctset", entity.oereturnglacctset);
         row.SetField("poorderdiscglacct", entity.poorderdiscglacct);
         row.SetField("poorderdiscglacctdesc", entity.poorderdiscglacctdesc);
         row.SetField("poorderdiscglacctset", entity.poorderdiscglacctset);
         row.SetField("potallyglacct", entity.potallyglacct);
         row.SetField("potallyglacctdesc", entity.potallyglacctdesc);
         row.SetField("potallyglacctset", entity.potallyglacctset);
         row.SetField("wtcostadjglacct", entity.wtcostadjglacct);
         row.SetField("wtcostadjglacctdesc", entity.wtcostadjglacctdesc);
         row.SetField("wtcostadjglacctset", entity.wtcostadjglacctset);
         row.SetField("coresdueglacct", entity.coresdueglacct);
         row.SetField("coresdueglacctdesc", entity.coresdueglacctdesc);
         row.SetField("coresdueglacctset", entity.coresdueglacctset);
         row.SetField("corescustliabglacct", entity.corescustliabglacct);
         row.SetField("corescustliabglacctdesc", entity.corescustliabglacctdesc);
         row.SetField("corescustliabglacctset", entity.corescustliabglacctset);
         row.SetField("coresconvglacct", entity.coresconvglacct);
         row.SetField("coresconvglacctdesc", entity.coresconvglacctdesc);
         row.SetField("coresconvglacctset", entity.coresconvglacctset);
         row.SetField("coresvendliabglacct", entity.coresvendliabglacct);
         row.SetField("coresvendliabglacctdesc", entity.coresvendliabglacctdesc);
         row.SetField("coresvendliabglacctset", entity.coresvendliabglacctset);
         row.SetField("coresvarianceglacct", entity.coresvarianceglacct);
         row.SetField("coresvarianceglacctdesc", entity.coresvarianceglacctdesc);
         row.SetField("coresvarianceglacctset", entity.coresvarianceglacctset);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
