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

namespace Infor.Sxe.Shared.Data.Models.Pdsaofinancials
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaofinancials.Aofinancials")]
   public partial class Aofinancials : ModelBase
   {
      public int cono { get; set; }
      public int glsize1 { get; set; }
      public int glsize2 { get; set; }
      public int glsize3 { get; set; }
      public int glsize4 { get; set; }
      [StringValidationAttribute]
      public string gldelim1 { get; set; }
      [StringValidationAttribute]
      public string gldelim2 { get; set; }
      [StringValidationAttribute]
      public string gldelim3 { get; set; }
      public int gldefper { get; set; }
      public int glbegper { get; set; }
      public int glperahd { get; set; }
      public int glendper { get; set; }
      public int glperbck { get; set; }
      public bool glcurrfl { get; set; }
      public bool glbalhistfl { get; set; }
      public int glcurfisc { get; set; }
      public bool gl13perfl { get; set; }
      public int glbegfisc { get; set; }
      public bool glbegfl { get; set; }
      public DateTime? glenddt1 { get; set; }
      public DateTime? glenddt2 { get; set; }
      public DateTime? glenddt3 { get; set; }
      public DateTime? glenddt4 { get; set; }
      public DateTime? glenddt5 { get; set; }
      public DateTime? glenddt6 { get; set; }
      public DateTime? glenddt7 { get; set; }
      public DateTime? glenddt8 { get; set; }
      public DateTime? glenddt9 { get; set; }
      public DateTime? glenddt10 { get; set; }
      public DateTime? glenddt11 { get; set; }
      public DateTime? glenddt12 { get; set; }
      public DateTime? glenddt13 { get; set; }
      public decimal glprofpct1 { get; set; }
      public decimal glprofpct2 { get; set; }
      public decimal glprofpct3 { get; set; }
      public decimal glprofpct4 { get; set; }
      [StringValidationAttribute]
      public string gLNo1 { get; set; }
      [StringValidationAttribute]
      public string gLNo2 { get; set; }
      [StringValidationAttribute]
      public string gLNo3 { get; set; }
      [StringValidationAttribute]
      public string gLNo4 { get; set; }
      [StringValidationAttribute]
      public string gLNo5 { get; set; }
      [StringValidationAttribute]
      public string gLNo6 { get; set; }
      [StringValidationAttribute]
      public string gLNo7 { get; set; }
      [StringValidationAttribute]
      public string gLNo8 { get; set; }
      [StringValidationAttribute]
      public string gLNo9 { get; set; }
      [StringValidationAttribute]
      public string gLNoDesc1 { get; set; }
      [StringValidationAttribute]
      public string gLNoDesc2 { get; set; }
      [StringValidationAttribute]
      public string gLNoDesc3 { get; set; }
      [StringValidationAttribute]
      public string gLNoDesc4 { get; set; }
      [StringValidationAttribute]
      public string gLNoDesc5 { get; set; }
      [StringValidationAttribute]
      public string gLNoDesc6 { get; set; }
      [StringValidationAttribute]
      public string gLNoDesc7 { get; set; }
      [StringValidationAttribute]
      public string gLNoDesc8 { get; set; }
      [StringValidationAttribute]
      public string gLNoDesc9 { get; set; }
      public bool crglfl { get; set; }
      public bool croefl { get; set; }
      public bool crarfl { get; set; }
      public bool validateOnly { get; set; }
      [StringValidationAttribute]
      public string sascRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Aofinancials BuildAofinancialsFromRow(DataRow row)
      {
         Aofinancials entity = new Aofinancials();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.glsize1 = row.IsNull("glsize1") ? 0 : row.Field<int>("glsize1");
         entity.glsize2 = row.IsNull("glsize2") ? 0 : row.Field<int>("glsize2");
         entity.glsize3 = row.IsNull("glsize3") ? 0 : row.Field<int>("glsize3");
         entity.glsize4 = row.IsNull("glsize4") ? 0 : row.Field<int>("glsize4");
         entity.gldelim1 = row.IsNull("gldelim1") ? string.Empty : row.Field<string>("gldelim1");
         entity.gldelim2 = row.IsNull("gldelim2") ? string.Empty : row.Field<string>("gldelim2");
         entity.gldelim3 = row.IsNull("gldelim3") ? string.Empty : row.Field<string>("gldelim3");
         entity.gldefper = row.IsNull("gldefper") ? 0 : row.Field<int>("gldefper");
         entity.glbegper = row.IsNull("glbegper") ? 0 : row.Field<int>("glbegper");
         entity.glperahd = row.IsNull("glperahd") ? 0 : row.Field<int>("glperahd");
         entity.glendper = row.IsNull("glendper") ? 0 : row.Field<int>("glendper");
         entity.glperbck = row.IsNull("glperbck") ? 0 : row.Field<int>("glperbck");
         entity.glcurrfl = row.Field<bool>("glcurrfl");
         entity.glbalhistfl = row.Field<bool>("glbalhistfl");
         entity.glcurfisc = row.IsNull("glcurfisc") ? 0 : row.Field<int>("glcurfisc");
         entity.gl13perfl = row.Field<bool>("gl13perfl");
         entity.glbegfisc = row.IsNull("glbegfisc") ? 0 : row.Field<int>("glbegfisc");
         entity.glbegfl = row.Field<bool>("glbegfl");
         entity.glenddt1 = row.Field<DateTime?>("glenddt1");
         entity.glenddt2 = row.Field<DateTime?>("glenddt2");
         entity.glenddt3 = row.Field<DateTime?>("glenddt3");
         entity.glenddt4 = row.Field<DateTime?>("glenddt4");
         entity.glenddt5 = row.Field<DateTime?>("glenddt5");
         entity.glenddt6 = row.Field<DateTime?>("glenddt6");
         entity.glenddt7 = row.Field<DateTime?>("glenddt7");
         entity.glenddt8 = row.Field<DateTime?>("glenddt8");
         entity.glenddt9 = row.Field<DateTime?>("glenddt9");
         entity.glenddt10 = row.Field<DateTime?>("glenddt10");
         entity.glenddt11 = row.Field<DateTime?>("glenddt11");
         entity.glenddt12 = row.Field<DateTime?>("glenddt12");
         entity.glenddt13 = row.Field<DateTime?>("glenddt13");
         entity.glprofpct1 = row.IsNull("glprofpct1") ? decimal.Zero : row.Field<decimal>("glprofpct1");
         entity.glprofpct2 = row.IsNull("glprofpct2") ? decimal.Zero : row.Field<decimal>("glprofpct2");
         entity.glprofpct3 = row.IsNull("glprofpct3") ? decimal.Zero : row.Field<decimal>("glprofpct3");
         entity.glprofpct4 = row.IsNull("glprofpct4") ? decimal.Zero : row.Field<decimal>("glprofpct4");
         entity.gLNo1 = row.IsNull("GLNo1") ? string.Empty : row.Field<string>("GLNo1");
         entity.gLNo2 = row.IsNull("GLNo2") ? string.Empty : row.Field<string>("GLNo2");
         entity.gLNo3 = row.IsNull("GLNo3") ? string.Empty : row.Field<string>("GLNo3");
         entity.gLNo4 = row.IsNull("GLNo4") ? string.Empty : row.Field<string>("GLNo4");
         entity.gLNo5 = row.IsNull("GLNo5") ? string.Empty : row.Field<string>("GLNo5");
         entity.gLNo6 = row.IsNull("GLNo6") ? string.Empty : row.Field<string>("GLNo6");
         entity.gLNo7 = row.IsNull("GLNo7") ? string.Empty : row.Field<string>("GLNo7");
         entity.gLNo8 = row.IsNull("GLNo8") ? string.Empty : row.Field<string>("GLNo8");
         entity.gLNo9 = row.IsNull("GLNo9") ? string.Empty : row.Field<string>("GLNo9");
         entity.gLNoDesc1 = row.IsNull("GLNoDesc1") ? string.Empty : row.Field<string>("GLNoDesc1");
         entity.gLNoDesc2 = row.IsNull("GLNoDesc2") ? string.Empty : row.Field<string>("GLNoDesc2");
         entity.gLNoDesc3 = row.IsNull("GLNoDesc3") ? string.Empty : row.Field<string>("GLNoDesc3");
         entity.gLNoDesc4 = row.IsNull("GLNoDesc4") ? string.Empty : row.Field<string>("GLNoDesc4");
         entity.gLNoDesc5 = row.IsNull("GLNoDesc5") ? string.Empty : row.Field<string>("GLNoDesc5");
         entity.gLNoDesc6 = row.IsNull("GLNoDesc6") ? string.Empty : row.Field<string>("GLNoDesc6");
         entity.gLNoDesc7 = row.IsNull("GLNoDesc7") ? string.Empty : row.Field<string>("GLNoDesc7");
         entity.gLNoDesc8 = row.IsNull("GLNoDesc8") ? string.Empty : row.Field<string>("GLNoDesc8");
         entity.gLNoDesc9 = row.IsNull("GLNoDesc9") ? string.Empty : row.Field<string>("GLNoDesc9");
         entity.crglfl = row.Field<bool>("crglfl");
         entity.croefl = row.Field<bool>("croefl");
         entity.crarfl = row.Field<bool>("crarfl");
         entity.validateOnly = row.Field<bool>("validate-only");
         entity.sascRowid = row.Field<byte[]>("sasc-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAofinancials(ref DataRow row, Aofinancials entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("glsize1", entity.glsize1);
         row.SetField("glsize2", entity.glsize2);
         row.SetField("glsize3", entity.glsize3);
         row.SetField("glsize4", entity.glsize4);
         row.SetField("gldelim1", entity.gldelim1);
         row.SetField("gldelim2", entity.gldelim2);
         row.SetField("gldelim3", entity.gldelim3);
         row.SetField("gldefper", entity.gldefper);
         row.SetField("glbegper", entity.glbegper);
         row.SetField("glperahd", entity.glperahd);
         row.SetField("glendper", entity.glendper);
         row.SetField("glperbck", entity.glperbck);
         row.SetField("glcurrfl", entity.glcurrfl);
         row.SetField("glbalhistfl", entity.glbalhistfl);
         row.SetField("glcurfisc", entity.glcurfisc);
         row.SetField("gl13perfl", entity.gl13perfl);
         row.SetField("glbegfisc", entity.glbegfisc);
         row.SetField("glbegfl", entity.glbegfl);
         row.SetField("glenddt1", entity.glenddt1);
         row.SetField("glenddt2", entity.glenddt2);
         row.SetField("glenddt3", entity.glenddt3);
         row.SetField("glenddt4", entity.glenddt4);
         row.SetField("glenddt5", entity.glenddt5);
         row.SetField("glenddt6", entity.glenddt6);
         row.SetField("glenddt7", entity.glenddt7);
         row.SetField("glenddt8", entity.glenddt8);
         row.SetField("glenddt9", entity.glenddt9);
         row.SetField("glenddt10", entity.glenddt10);
         row.SetField("glenddt11", entity.glenddt11);
         row.SetField("glenddt12", entity.glenddt12);
         row.SetField("glenddt13", entity.glenddt13);
         row.SetField("glprofpct1", entity.glprofpct1);
         row.SetField("glprofpct2", entity.glprofpct2);
         row.SetField("glprofpct3", entity.glprofpct3);
         row.SetField("glprofpct4", entity.glprofpct4);
         row.SetField("GLNo1", entity.gLNo1);
         row.SetField("GLNo2", entity.gLNo2);
         row.SetField("GLNo3", entity.gLNo3);
         row.SetField("GLNo4", entity.gLNo4);
         row.SetField("GLNo5", entity.gLNo5);
         row.SetField("GLNo6", entity.gLNo6);
         row.SetField("GLNo7", entity.gLNo7);
         row.SetField("GLNo8", entity.gLNo8);
         row.SetField("GLNo9", entity.gLNo9);
         row.SetField("GLNoDesc1", entity.gLNoDesc1);
         row.SetField("GLNoDesc2", entity.gLNoDesc2);
         row.SetField("GLNoDesc3", entity.gLNoDesc3);
         row.SetField("GLNoDesc4", entity.gLNoDesc4);
         row.SetField("GLNoDesc5", entity.gLNoDesc5);
         row.SetField("GLNoDesc6", entity.gLNoDesc6);
         row.SetField("GLNoDesc7", entity.gLNoDesc7);
         row.SetField("GLNoDesc8", entity.gLNoDesc8);
         row.SetField("GLNoDesc9", entity.gLNoDesc9);
         row.SetField("crglfl", entity.crglfl);
         row.SetField("croefl", entity.croefl);
         row.SetField("crarfl", entity.crarfl);
         row.SetField("validate-only", entity.validateOnly);
         row.SetField("sasc-rowid", entity.sascRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
