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

namespace Infor.Sxe.Shared.Data.Models.Pdsaosystemrptitem
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaosystemrptitem.Aosystemrptitem")]
   public partial class Aosystemrptitem : ModelBase
   {
      [StringValidationAttribute]
      public string currproc { get; set; }
      [StringValidationAttribute]
      public string trmgrlang { get; set; }
      [StringValidationAttribute]
      public string rpttitle { get; set; }
      [StringValidationAttribute]
      public string lastupdated { get; set; }
      public bool printoptfl { get; set; }
      [StringValidationAttribute]
      public string reportid { get; set; }
      [StringValidationAttribute]
      public string standardty { get; set; }
      public int pglength { get; set; }
      public int xpglength1 { get; set; }
      public int xpglength2 { get; set; }
      public int xpglength3 { get; set; }
      public int xpglength4 { get; set; }
      public int xpglength5 { get; set; }
      public int recaloptno { get; set; }
      public bool recaloptnoSensitive { get; set; }
      public bool uselistoption { get; set; }
      public int recaloptno2 { get; set; }
      public bool recaloptno2Sensitive { get; set; }
      public bool uselistoption2 { get; set; }
      public int recaloptno3 { get; set; }
      public bool recaloptno3Sensitive { get; set; }
      public bool uselistoption3 { get; set; }
      [StringValidationAttribute]
      public string listproc { get; set; }
      public bool listprocSensitive { get; set; }
      [StringValidationAttribute]
      public string listproc2 { get; set; }
      public bool listproc2Sensitive { get; set; }
      [StringValidationAttribute]
      public string listproc3 { get; set; }
      public bool listproc3Sensitive { get; set; }
      [StringValidationAttribute]
      public string pausebeg { get; set; }
      public int openprno { get; set; }
      public bool openprnoSensitive { get; set; }
      public int whseprtno { get; set; }
      public bool wide { get; set; }
      public bool xwide1 { get; set; }
      public bool xwide2 { get; set; }
      public bool xwide3 { get; set; }
      public bool xwide4 { get; set; }
      public bool xwide5 { get; set; }
      public bool coldfl { get; set; }
      public bool xcoldfl1 { get; set; }
      public bool xcoldfl2 { get; set; }
      public bool xcoldfl3 { get; set; }
      public bool xcoldfl4 { get; set; }
      public bool xcoldfl5 { get; set; }
      public bool backfl { get; set; }
      public bool headerprfl { get; set; }
      public bool xheaderprfl1 { get; set; }
      public bool xheaderprfl2 { get; set; }
      public bool xheaderprfl3 { get; set; }
      public bool xheaderprfl4 { get; set; }
      public bool xheaderprfl5 { get; set; }
      public bool jrnlfl { get; set; }
      public bool openprfl { get; set; }
      public bool optpgfl { get; set; }
      public bool xoptpgfl1 { get; set; }
      public bool xoptpgfl2 { get; set; }
      public bool xoptpgfl3 { get; set; }
      public bool xoptpgfl4 { get; set; }
      public bool xoptpgfl5 { get; set; }
      public bool pagedfl { get; set; }
      public bool xpagedfl1 { get; set; }
      public bool xpagedfl2 { get; set; }
      public bool xpagedfl3 { get; set; }
      public bool xpagedfl4 { get; set; }
      public bool xpagedfl5 { get; set; }
      public bool titletype { get; set; }
      public bool xtitletype1 { get; set; }
      public bool xtitletype2 { get; set; }
      public bool xtitletype3 { get; set; }
      public bool xtitletype4 { get; set; }
      public bool xtitletype5 { get; set; }
      [StringValidationAttribute]
      public string sassrRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Aosystemrptitem BuildAosystemrptitemFromRow(DataRow row)
      {
         Aosystemrptitem entity = new Aosystemrptitem();
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.trmgrlang = row.IsNull("trmgrlang") ? string.Empty : row.Field<string>("trmgrlang");
         entity.rpttitle = row.IsNull("rpttitle") ? string.Empty : row.Field<string>("rpttitle");
         entity.lastupdated = row.IsNull("lastupdated") ? string.Empty : row.Field<string>("lastupdated");
         entity.printoptfl = row.Field<bool>("printoptfl");
         entity.reportid = row.IsNull("reportid") ? string.Empty : row.Field<string>("reportid");
         entity.standardty = row.IsNull("standardty") ? string.Empty : row.Field<string>("standardty");
         entity.pglength = row.IsNull("pglength") ? 0 : row.Field<int>("pglength");
         entity.xpglength1 = row.IsNull("xpglength1") ? 0 : row.Field<int>("xpglength1");
         entity.xpglength2 = row.IsNull("xpglength2") ? 0 : row.Field<int>("xpglength2");
         entity.xpglength3 = row.IsNull("xpglength3") ? 0 : row.Field<int>("xpglength3");
         entity.xpglength4 = row.IsNull("xpglength4") ? 0 : row.Field<int>("xpglength4");
         entity.xpglength5 = row.IsNull("xpglength5") ? 0 : row.Field<int>("xpglength5");
         entity.recaloptno = row.IsNull("recaloptno") ? 0 : row.Field<int>("recaloptno");
         entity.recaloptnoSensitive = row.Field<bool>("recaloptno-sensitive");
         entity.uselistoption = row.Field<bool>("uselistoption");
         entity.recaloptno2 = row.IsNull("recaloptno2") ? 0 : row.Field<int>("recaloptno2");
         entity.recaloptno2Sensitive = row.Field<bool>("recaloptno2-sensitive");
         entity.uselistoption2 = row.Field<bool>("uselistoption2");
         entity.recaloptno3 = row.IsNull("recaloptno3") ? 0 : row.Field<int>("recaloptno3");
         entity.recaloptno3Sensitive = row.Field<bool>("recaloptno3-sensitive");
         entity.uselistoption3 = row.Field<bool>("uselistoption3");
         entity.listproc = row.IsNull("listproc") ? string.Empty : row.Field<string>("listproc");
         entity.listprocSensitive = row.Field<bool>("listproc-sensitive");
         entity.listproc2 = row.IsNull("listproc2") ? string.Empty : row.Field<string>("listproc2");
         entity.listproc2Sensitive = row.Field<bool>("listproc2-sensitive");
         entity.listproc3 = row.IsNull("listproc3") ? string.Empty : row.Field<string>("listproc3");
         entity.listproc3Sensitive = row.Field<bool>("listproc3-sensitive");
         entity.pausebeg = row.IsNull("pausebeg") ? string.Empty : row.Field<string>("pausebeg");
         entity.openprno = row.IsNull("openprno") ? 0 : row.Field<int>("openprno");
         entity.openprnoSensitive = row.Field<bool>("openprno-sensitive");
         entity.whseprtno = row.IsNull("whseprtno") ? 0 : row.Field<int>("whseprtno");
         entity.wide = row.Field<bool>("wide");
         entity.xwide1 = row.Field<bool>("xwide1");
         entity.xwide2 = row.Field<bool>("xwide2");
         entity.xwide3 = row.Field<bool>("xwide3");
         entity.xwide4 = row.Field<bool>("xwide4");
         entity.xwide5 = row.Field<bool>("xwide5");
         entity.coldfl = row.Field<bool>("coldfl");
         entity.xcoldfl1 = row.Field<bool>("xcoldfl1");
         entity.xcoldfl2 = row.Field<bool>("xcoldfl2");
         entity.xcoldfl3 = row.Field<bool>("xcoldfl3");
         entity.xcoldfl4 = row.Field<bool>("xcoldfl4");
         entity.xcoldfl5 = row.Field<bool>("xcoldfl5");
         entity.backfl = row.Field<bool>("backfl");
         entity.headerprfl = row.Field<bool>("headerprfl");
         entity.xheaderprfl1 = row.Field<bool>("xheaderprfl1");
         entity.xheaderprfl2 = row.Field<bool>("xheaderprfl2");
         entity.xheaderprfl3 = row.Field<bool>("xheaderprfl3");
         entity.xheaderprfl4 = row.Field<bool>("xheaderprfl4");
         entity.xheaderprfl5 = row.Field<bool>("xheaderprfl5");
         entity.jrnlfl = row.Field<bool>("jrnlfl");
         entity.openprfl = row.Field<bool>("openprfl");
         entity.optpgfl = row.Field<bool>("optpgfl");
         entity.xoptpgfl1 = row.Field<bool>("xoptpgfl1");
         entity.xoptpgfl2 = row.Field<bool>("xoptpgfl2");
         entity.xoptpgfl3 = row.Field<bool>("xoptpgfl3");
         entity.xoptpgfl4 = row.Field<bool>("xoptpgfl4");
         entity.xoptpgfl5 = row.Field<bool>("xoptpgfl5");
         entity.pagedfl = row.Field<bool>("pagedfl");
         entity.xpagedfl1 = row.Field<bool>("xpagedfl1");
         entity.xpagedfl2 = row.Field<bool>("xpagedfl2");
         entity.xpagedfl3 = row.Field<bool>("xpagedfl3");
         entity.xpagedfl4 = row.Field<bool>("xpagedfl4");
         entity.xpagedfl5 = row.Field<bool>("xpagedfl5");
         entity.titletype = row.Field<bool>("titletype");
         entity.xtitletype1 = row.Field<bool>("xtitletype1");
         entity.xtitletype2 = row.Field<bool>("xtitletype2");
         entity.xtitletype3 = row.Field<bool>("xtitletype3");
         entity.xtitletype4 = row.Field<bool>("xtitletype4");
         entity.xtitletype5 = row.Field<bool>("xtitletype5");
         entity.sassrRowid = row.Field<byte[]>("sassr-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAosystemrptitem(ref DataRow row, Aosystemrptitem entity)
      {
         row.SetField("currproc", entity.currproc);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("rpttitle", entity.rpttitle);
         row.SetField("lastupdated", entity.lastupdated);
         row.SetField("printoptfl", entity.printoptfl);
         row.SetField("reportid", entity.reportid);
         row.SetField("standardty", entity.standardty);
         row.SetField("pglength", entity.pglength);
         row.SetField("xpglength1", entity.xpglength1);
         row.SetField("xpglength2", entity.xpglength2);
         row.SetField("xpglength3", entity.xpglength3);
         row.SetField("xpglength4", entity.xpglength4);
         row.SetField("xpglength5", entity.xpglength5);
         row.SetField("recaloptno", entity.recaloptno);
         row.SetField("recaloptno-sensitive", entity.recaloptnoSensitive);
         row.SetField("uselistoption", entity.uselistoption);
         row.SetField("recaloptno2", entity.recaloptno2);
         row.SetField("recaloptno2-sensitive", entity.recaloptno2Sensitive);
         row.SetField("uselistoption2", entity.uselistoption2);
         row.SetField("recaloptno3", entity.recaloptno3);
         row.SetField("recaloptno3-sensitive", entity.recaloptno3Sensitive);
         row.SetField("uselistoption3", entity.uselistoption3);
         row.SetField("listproc", entity.listproc);
         row.SetField("listproc-sensitive", entity.listprocSensitive);
         row.SetField("listproc2", entity.listproc2);
         row.SetField("listproc2-sensitive", entity.listproc2Sensitive);
         row.SetField("listproc3", entity.listproc3);
         row.SetField("listproc3-sensitive", entity.listproc3Sensitive);
         row.SetField("pausebeg", entity.pausebeg);
         row.SetField("openprno", entity.openprno);
         row.SetField("openprno-sensitive", entity.openprnoSensitive);
         row.SetField("whseprtno", entity.whseprtno);
         row.SetField("wide", entity.wide);
         row.SetField("xwide1", entity.xwide1);
         row.SetField("xwide2", entity.xwide2);
         row.SetField("xwide3", entity.xwide3);
         row.SetField("xwide4", entity.xwide4);
         row.SetField("xwide5", entity.xwide5);
         row.SetField("coldfl", entity.coldfl);
         row.SetField("xcoldfl1", entity.xcoldfl1);
         row.SetField("xcoldfl2", entity.xcoldfl2);
         row.SetField("xcoldfl3", entity.xcoldfl3);
         row.SetField("xcoldfl4", entity.xcoldfl4);
         row.SetField("xcoldfl5", entity.xcoldfl5);
         row.SetField("backfl", entity.backfl);
         row.SetField("headerprfl", entity.headerprfl);
         row.SetField("xheaderprfl1", entity.xheaderprfl1);
         row.SetField("xheaderprfl2", entity.xheaderprfl2);
         row.SetField("xheaderprfl3", entity.xheaderprfl3);
         row.SetField("xheaderprfl4", entity.xheaderprfl4);
         row.SetField("xheaderprfl5", entity.xheaderprfl5);
         row.SetField("jrnlfl", entity.jrnlfl);
         row.SetField("openprfl", entity.openprfl);
         row.SetField("optpgfl", entity.optpgfl);
         row.SetField("xoptpgfl1", entity.xoptpgfl1);
         row.SetField("xoptpgfl2", entity.xoptpgfl2);
         row.SetField("xoptpgfl3", entity.xoptpgfl3);
         row.SetField("xoptpgfl4", entity.xoptpgfl4);
         row.SetField("xoptpgfl5", entity.xoptpgfl5);
         row.SetField("pagedfl", entity.pagedfl);
         row.SetField("xpagedfl1", entity.xpagedfl1);
         row.SetField("xpagedfl2", entity.xpagedfl2);
         row.SetField("xpagedfl3", entity.xpagedfl3);
         row.SetField("xpagedfl4", entity.xpagedfl4);
         row.SetField("xpagedfl5", entity.xpagedfl5);
         row.SetField("titletype", entity.titletype);
         row.SetField("xtitletype1", entity.xtitletype1);
         row.SetField("xtitletype2", entity.xtitletype2);
         row.SetField("xtitletype3", entity.xtitletype3);
         row.SetField("xtitletype4", entity.xtitletype4);
         row.SetField("xtitletype5", entity.xtitletype5);
         row.SetField("sassr-rowid", entity.sassrRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
