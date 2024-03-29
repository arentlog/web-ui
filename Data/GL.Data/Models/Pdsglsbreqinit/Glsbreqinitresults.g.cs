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

namespace Infor.Sxe.GL.Data.Models.Pdsglsbreqinit
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsbreqinit.Glsbreqinitresults")]
   public partial class Glsbreqinitresults : ModelBase
   {
      public bool budgettype { get; set; }
      public decimal annbud { get; set; }
      public bool frozenfl { get; set; }
      [StringValidationAttribute]
      public string calcmethodli { get; set; }
      [StringValidationAttribute]
      public string calcmethodpd { get; set; }
      [StringValidationAttribute]
      public string calcmethodsv { get; set; }
      [StringValidationAttribute]
      public string periodlbl1 { get; set; }
      [StringValidationAttribute]
      public string periodlbl2 { get; set; }
      [StringValidationAttribute]
      public string periodlbl3 { get; set; }
      [StringValidationAttribute]
      public string periodlbl4 { get; set; }
      [StringValidationAttribute]
      public string periodlbl5 { get; set; }
      [StringValidationAttribute]
      public string periodlbl6 { get; set; }
      [StringValidationAttribute]
      public string periodlbl7 { get; set; }
      [StringValidationAttribute]
      public string periodlbl8 { get; set; }
      [StringValidationAttribute]
      public string periodlbl9 { get; set; }
      [StringValidationAttribute]
      public string periodlbl10 { get; set; }
      [StringValidationAttribute]
      public string periodlbl11 { get; set; }
      [StringValidationAttribute]
      public string periodlbl12 { get; set; }
      [StringValidationAttribute]
      public string periodlbl13 { get; set; }
      public decimal peramt1 { get; set; }
      public decimal peramt2 { get; set; }
      public decimal peramt3 { get; set; }
      public decimal peramt4 { get; set; }
      public decimal peramt5 { get; set; }
      public decimal peramt6 { get; set; }
      public decimal peramt7 { get; set; }
      public decimal peramt8 { get; set; }
      public decimal peramt9 { get; set; }
      public decimal peramt10 { get; set; }
      public decimal peramt11 { get; set; }
      public decimal peramt12 { get; set; }
      public decimal peramt13 { get; set; }
      public decimal budpct1 { get; set; }
      public decimal budpct2 { get; set; }
      public decimal budpct3 { get; set; }
      public decimal budpct4 { get; set; }
      public decimal budpct5 { get; set; }
      public decimal budpct6 { get; set; }
      public decimal budpct7 { get; set; }
      public decimal budpct8 { get; set; }
      public decimal budpct9 { get; set; }
      public decimal budpct10 { get; set; }
      public decimal budpct11 { get; set; }
      public decimal budpct12 { get; set; }
      public decimal budpct13 { get; set; }
      public decimal budytd1 { get; set; }
      public decimal budytd2 { get; set; }
      public decimal budytd3 { get; set; }
      public decimal budytd4 { get; set; }
      public decimal budytd5 { get; set; }
      public decimal budytd6 { get; set; }
      public decimal budytd7 { get; set; }
      public decimal budytd8 { get; set; }
      public decimal budytd9 { get; set; }
      public decimal budytd10 { get; set; }
      public decimal budytd11 { get; set; }
      public decimal budytd12 { get; set; }
      public decimal budytd13 { get; set; }
      public decimal pctytd1 { get; set; }
      public decimal pctytd2 { get; set; }
      public decimal pctytd3 { get; set; }
      public decimal pctytd4 { get; set; }
      public decimal pctytd5 { get; set; }
      public decimal pctytd6 { get; set; }
      public decimal pctytd7 { get; set; }
      public decimal pctytd8 { get; set; }
      public decimal pctytd9 { get; set; }
      public decimal pctytd10 { get; set; }
      public decimal pctytd11 { get; set; }
      public decimal pctytd12 { get; set; }
      public decimal pctytd13 { get; set; }
      public decimal actual1 { get; set; }
      public decimal actual2 { get; set; }
      public decimal actual3 { get; set; }
      public decimal actual4 { get; set; }
      public decimal actual5 { get; set; }
      public decimal actual6 { get; set; }
      public decimal actual7 { get; set; }
      public decimal actual8 { get; set; }
      public decimal actual9 { get; set; }
      public decimal actual10 { get; set; }
      public decimal actual11 { get; set; }
      public decimal actual12 { get; set; }
      public decimal actual13 { get; set; }
      public bool gl13perfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsbreqinitresults BuildGlsbreqinitresultsFromRow(DataRow row)
      {
         Glsbreqinitresults entity = new Glsbreqinitresults();
         entity.budgettype = row.Field<bool>("budgettype");
         entity.annbud = row.IsNull("annbud") ? decimal.Zero : row.Field<decimal>("annbud");
         entity.frozenfl = row.Field<bool>("frozenfl");
         entity.calcmethodli = row.IsNull("calcmethodli") ? string.Empty : row.Field<string>("calcmethodli");
         entity.calcmethodpd = row.IsNull("calcmethodpd") ? string.Empty : row.Field<string>("calcmethodpd");
         entity.calcmethodsv = row.IsNull("calcmethodsv") ? string.Empty : row.Field<string>("calcmethodsv");
         entity.periodlbl1 = row.IsNull("periodlbl1") ? string.Empty : row.Field<string>("periodlbl1");
         entity.periodlbl2 = row.IsNull("periodlbl2") ? string.Empty : row.Field<string>("periodlbl2");
         entity.periodlbl3 = row.IsNull("periodlbl3") ? string.Empty : row.Field<string>("periodlbl3");
         entity.periodlbl4 = row.IsNull("periodlbl4") ? string.Empty : row.Field<string>("periodlbl4");
         entity.periodlbl5 = row.IsNull("periodlbl5") ? string.Empty : row.Field<string>("periodlbl5");
         entity.periodlbl6 = row.IsNull("periodlbl6") ? string.Empty : row.Field<string>("periodlbl6");
         entity.periodlbl7 = row.IsNull("periodlbl7") ? string.Empty : row.Field<string>("periodlbl7");
         entity.periodlbl8 = row.IsNull("periodlbl8") ? string.Empty : row.Field<string>("periodlbl8");
         entity.periodlbl9 = row.IsNull("periodlbl9") ? string.Empty : row.Field<string>("periodlbl9");
         entity.periodlbl10 = row.IsNull("periodlbl10") ? string.Empty : row.Field<string>("periodlbl10");
         entity.periodlbl11 = row.IsNull("periodlbl11") ? string.Empty : row.Field<string>("periodlbl11");
         entity.periodlbl12 = row.IsNull("periodlbl12") ? string.Empty : row.Field<string>("periodlbl12");
         entity.periodlbl13 = row.IsNull("periodlbl13") ? string.Empty : row.Field<string>("periodlbl13");
         entity.peramt1 = row.IsNull("peramt1") ? decimal.Zero : row.Field<decimal>("peramt1");
         entity.peramt2 = row.IsNull("peramt2") ? decimal.Zero : row.Field<decimal>("peramt2");
         entity.peramt3 = row.IsNull("peramt3") ? decimal.Zero : row.Field<decimal>("peramt3");
         entity.peramt4 = row.IsNull("peramt4") ? decimal.Zero : row.Field<decimal>("peramt4");
         entity.peramt5 = row.IsNull("peramt5") ? decimal.Zero : row.Field<decimal>("peramt5");
         entity.peramt6 = row.IsNull("peramt6") ? decimal.Zero : row.Field<decimal>("peramt6");
         entity.peramt7 = row.IsNull("peramt7") ? decimal.Zero : row.Field<decimal>("peramt7");
         entity.peramt8 = row.IsNull("peramt8") ? decimal.Zero : row.Field<decimal>("peramt8");
         entity.peramt9 = row.IsNull("peramt9") ? decimal.Zero : row.Field<decimal>("peramt9");
         entity.peramt10 = row.IsNull("peramt10") ? decimal.Zero : row.Field<decimal>("peramt10");
         entity.peramt11 = row.IsNull("peramt11") ? decimal.Zero : row.Field<decimal>("peramt11");
         entity.peramt12 = row.IsNull("peramt12") ? decimal.Zero : row.Field<decimal>("peramt12");
         entity.peramt13 = row.IsNull("peramt13") ? decimal.Zero : row.Field<decimal>("peramt13");
         entity.budpct1 = row.IsNull("budpct1") ? decimal.Zero : row.Field<decimal>("budpct1");
         entity.budpct2 = row.IsNull("budpct2") ? decimal.Zero : row.Field<decimal>("budpct2");
         entity.budpct3 = row.IsNull("budpct3") ? decimal.Zero : row.Field<decimal>("budpct3");
         entity.budpct4 = row.IsNull("budpct4") ? decimal.Zero : row.Field<decimal>("budpct4");
         entity.budpct5 = row.IsNull("budpct5") ? decimal.Zero : row.Field<decimal>("budpct5");
         entity.budpct6 = row.IsNull("budpct6") ? decimal.Zero : row.Field<decimal>("budpct6");
         entity.budpct7 = row.IsNull("budpct7") ? decimal.Zero : row.Field<decimal>("budpct7");
         entity.budpct8 = row.IsNull("budpct8") ? decimal.Zero : row.Field<decimal>("budpct8");
         entity.budpct9 = row.IsNull("budpct9") ? decimal.Zero : row.Field<decimal>("budpct9");
         entity.budpct10 = row.IsNull("budpct10") ? decimal.Zero : row.Field<decimal>("budpct10");
         entity.budpct11 = row.IsNull("budpct11") ? decimal.Zero : row.Field<decimal>("budpct11");
         entity.budpct12 = row.IsNull("budpct12") ? decimal.Zero : row.Field<decimal>("budpct12");
         entity.budpct13 = row.IsNull("budpct13") ? decimal.Zero : row.Field<decimal>("budpct13");
         entity.budytd1 = row.IsNull("budytd1") ? decimal.Zero : row.Field<decimal>("budytd1");
         entity.budytd2 = row.IsNull("budytd2") ? decimal.Zero : row.Field<decimal>("budytd2");
         entity.budytd3 = row.IsNull("budytd3") ? decimal.Zero : row.Field<decimal>("budytd3");
         entity.budytd4 = row.IsNull("budytd4") ? decimal.Zero : row.Field<decimal>("budytd4");
         entity.budytd5 = row.IsNull("budytd5") ? decimal.Zero : row.Field<decimal>("budytd5");
         entity.budytd6 = row.IsNull("budytd6") ? decimal.Zero : row.Field<decimal>("budytd6");
         entity.budytd7 = row.IsNull("budytd7") ? decimal.Zero : row.Field<decimal>("budytd7");
         entity.budytd8 = row.IsNull("budytd8") ? decimal.Zero : row.Field<decimal>("budytd8");
         entity.budytd9 = row.IsNull("budytd9") ? decimal.Zero : row.Field<decimal>("budytd9");
         entity.budytd10 = row.IsNull("budytd10") ? decimal.Zero : row.Field<decimal>("budytd10");
         entity.budytd11 = row.IsNull("budytd11") ? decimal.Zero : row.Field<decimal>("budytd11");
         entity.budytd12 = row.IsNull("budytd12") ? decimal.Zero : row.Field<decimal>("budytd12");
         entity.budytd13 = row.IsNull("budytd13") ? decimal.Zero : row.Field<decimal>("budytd13");
         entity.pctytd1 = row.IsNull("pctytd1") ? decimal.Zero : row.Field<decimal>("pctytd1");
         entity.pctytd2 = row.IsNull("pctytd2") ? decimal.Zero : row.Field<decimal>("pctytd2");
         entity.pctytd3 = row.IsNull("pctytd3") ? decimal.Zero : row.Field<decimal>("pctytd3");
         entity.pctytd4 = row.IsNull("pctytd4") ? decimal.Zero : row.Field<decimal>("pctytd4");
         entity.pctytd5 = row.IsNull("pctytd5") ? decimal.Zero : row.Field<decimal>("pctytd5");
         entity.pctytd6 = row.IsNull("pctytd6") ? decimal.Zero : row.Field<decimal>("pctytd6");
         entity.pctytd7 = row.IsNull("pctytd7") ? decimal.Zero : row.Field<decimal>("pctytd7");
         entity.pctytd8 = row.IsNull("pctytd8") ? decimal.Zero : row.Field<decimal>("pctytd8");
         entity.pctytd9 = row.IsNull("pctytd9") ? decimal.Zero : row.Field<decimal>("pctytd9");
         entity.pctytd10 = row.IsNull("pctytd10") ? decimal.Zero : row.Field<decimal>("pctytd10");
         entity.pctytd11 = row.IsNull("pctytd11") ? decimal.Zero : row.Field<decimal>("pctytd11");
         entity.pctytd12 = row.IsNull("pctytd12") ? decimal.Zero : row.Field<decimal>("pctytd12");
         entity.pctytd13 = row.IsNull("pctytd13") ? decimal.Zero : row.Field<decimal>("pctytd13");
         entity.actual1 = row.IsNull("actual1") ? decimal.Zero : row.Field<decimal>("actual1");
         entity.actual2 = row.IsNull("actual2") ? decimal.Zero : row.Field<decimal>("actual2");
         entity.actual3 = row.IsNull("actual3") ? decimal.Zero : row.Field<decimal>("actual3");
         entity.actual4 = row.IsNull("actual4") ? decimal.Zero : row.Field<decimal>("actual4");
         entity.actual5 = row.IsNull("actual5") ? decimal.Zero : row.Field<decimal>("actual5");
         entity.actual6 = row.IsNull("actual6") ? decimal.Zero : row.Field<decimal>("actual6");
         entity.actual7 = row.IsNull("actual7") ? decimal.Zero : row.Field<decimal>("actual7");
         entity.actual8 = row.IsNull("actual8") ? decimal.Zero : row.Field<decimal>("actual8");
         entity.actual9 = row.IsNull("actual9") ? decimal.Zero : row.Field<decimal>("actual9");
         entity.actual10 = row.IsNull("actual10") ? decimal.Zero : row.Field<decimal>("actual10");
         entity.actual11 = row.IsNull("actual11") ? decimal.Zero : row.Field<decimal>("actual11");
         entity.actual12 = row.IsNull("actual12") ? decimal.Zero : row.Field<decimal>("actual12");
         entity.actual13 = row.IsNull("actual13") ? decimal.Zero : row.Field<decimal>("actual13");
         entity.gl13perfl = row.Field<bool>("gl13perfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsbreqinitresults(ref DataRow row, Glsbreqinitresults entity)
      {
         row.SetField("budgettype", entity.budgettype);
         row.SetField("annbud", entity.annbud);
         row.SetField("frozenfl", entity.frozenfl);
         row.SetField("calcmethodli", entity.calcmethodli);
         row.SetField("calcmethodpd", entity.calcmethodpd);
         row.SetField("calcmethodsv", entity.calcmethodsv);
         row.SetField("periodlbl1", entity.periodlbl1);
         row.SetField("periodlbl2", entity.periodlbl2);
         row.SetField("periodlbl3", entity.periodlbl3);
         row.SetField("periodlbl4", entity.periodlbl4);
         row.SetField("periodlbl5", entity.periodlbl5);
         row.SetField("periodlbl6", entity.periodlbl6);
         row.SetField("periodlbl7", entity.periodlbl7);
         row.SetField("periodlbl8", entity.periodlbl8);
         row.SetField("periodlbl9", entity.periodlbl9);
         row.SetField("periodlbl10", entity.periodlbl10);
         row.SetField("periodlbl11", entity.periodlbl11);
         row.SetField("periodlbl12", entity.periodlbl12);
         row.SetField("periodlbl13", entity.periodlbl13);
         row.SetField("peramt1", entity.peramt1);
         row.SetField("peramt2", entity.peramt2);
         row.SetField("peramt3", entity.peramt3);
         row.SetField("peramt4", entity.peramt4);
         row.SetField("peramt5", entity.peramt5);
         row.SetField("peramt6", entity.peramt6);
         row.SetField("peramt7", entity.peramt7);
         row.SetField("peramt8", entity.peramt8);
         row.SetField("peramt9", entity.peramt9);
         row.SetField("peramt10", entity.peramt10);
         row.SetField("peramt11", entity.peramt11);
         row.SetField("peramt12", entity.peramt12);
         row.SetField("peramt13", entity.peramt13);
         row.SetField("budpct1", entity.budpct1);
         row.SetField("budpct2", entity.budpct2);
         row.SetField("budpct3", entity.budpct3);
         row.SetField("budpct4", entity.budpct4);
         row.SetField("budpct5", entity.budpct5);
         row.SetField("budpct6", entity.budpct6);
         row.SetField("budpct7", entity.budpct7);
         row.SetField("budpct8", entity.budpct8);
         row.SetField("budpct9", entity.budpct9);
         row.SetField("budpct10", entity.budpct10);
         row.SetField("budpct11", entity.budpct11);
         row.SetField("budpct12", entity.budpct12);
         row.SetField("budpct13", entity.budpct13);
         row.SetField("budytd1", entity.budytd1);
         row.SetField("budytd2", entity.budytd2);
         row.SetField("budytd3", entity.budytd3);
         row.SetField("budytd4", entity.budytd4);
         row.SetField("budytd5", entity.budytd5);
         row.SetField("budytd6", entity.budytd6);
         row.SetField("budytd7", entity.budytd7);
         row.SetField("budytd8", entity.budytd8);
         row.SetField("budytd9", entity.budytd9);
         row.SetField("budytd10", entity.budytd10);
         row.SetField("budytd11", entity.budytd11);
         row.SetField("budytd12", entity.budytd12);
         row.SetField("budytd13", entity.budytd13);
         row.SetField("pctytd1", entity.pctytd1);
         row.SetField("pctytd2", entity.pctytd2);
         row.SetField("pctytd3", entity.pctytd3);
         row.SetField("pctytd4", entity.pctytd4);
         row.SetField("pctytd5", entity.pctytd5);
         row.SetField("pctytd6", entity.pctytd6);
         row.SetField("pctytd7", entity.pctytd7);
         row.SetField("pctytd8", entity.pctytd8);
         row.SetField("pctytd9", entity.pctytd9);
         row.SetField("pctytd10", entity.pctytd10);
         row.SetField("pctytd11", entity.pctytd11);
         row.SetField("pctytd12", entity.pctytd12);
         row.SetField("pctytd13", entity.pctytd13);
         row.SetField("actual1", entity.actual1);
         row.SetField("actual2", entity.actual2);
         row.SetField("actual3", entity.actual3);
         row.SetField("actual4", entity.actual4);
         row.SetField("actual5", entity.actual5);
         row.SetField("actual6", entity.actual6);
         row.SetField("actual7", entity.actual7);
         row.SetField("actual8", entity.actual8);
         row.SetField("actual9", entity.actual9);
         row.SetField("actual10", entity.actual10);
         row.SetField("actual11", entity.actual11);
         row.SetField("actual12", entity.actual12);
         row.SetField("actual13", entity.actual13);
         row.SetField("gl13perfl", entity.gl13perfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
