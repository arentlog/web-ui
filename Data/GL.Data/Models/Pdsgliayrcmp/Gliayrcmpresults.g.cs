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

namespace Infor.Sxe.GL.Data.Models.Pdsgliayrcmp
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsgliayrcmp.Gliayrcmpresults")]
   public partial class Gliayrcmpresults : ModelBase
   {
      [StringValidationAttribute]
      public string period1 { get; set; }
      [StringValidationAttribute]
      public string period2 { get; set; }
      [StringValidationAttribute]
      public string period3 { get; set; }
      [StringValidationAttribute]
      public string period4 { get; set; }
      [StringValidationAttribute]
      public string period5 { get; set; }
      [StringValidationAttribute]
      public string period6 { get; set; }
      [StringValidationAttribute]
      public string period7 { get; set; }
      [StringValidationAttribute]
      public string period8 { get; set; }
      [StringValidationAttribute]
      public string period9 { get; set; }
      [StringValidationAttribute]
      public string period10 { get; set; }
      [StringValidationAttribute]
      public string period11 { get; set; }
      [StringValidationAttribute]
      public string period12 { get; set; }
      [StringValidationAttribute]
      public string period13 { get; set; }
      public decimal ptd1 { get; set; }
      public decimal ptd2 { get; set; }
      public decimal ptd3 { get; set; }
      public decimal ptd4 { get; set; }
      public decimal ptd5 { get; set; }
      public decimal ptd6 { get; set; }
      public decimal ptd7 { get; set; }
      public decimal ptd8 { get; set; }
      public decimal ptd9 { get; set; }
      public decimal ptd10 { get; set; }
      public decimal ptd11 { get; set; }
      public decimal ptd12 { get; set; }
      public decimal ptd13 { get; set; }
      public decimal ptdcmp1 { get; set; }
      public decimal ptdcmp2 { get; set; }
      public decimal ptdcmp3 { get; set; }
      public decimal ptdcmp4 { get; set; }
      public decimal ptdcmp5 { get; set; }
      public decimal ptdcmp6 { get; set; }
      public decimal ptdcmp7 { get; set; }
      public decimal ptdcmp8 { get; set; }
      public decimal ptdcmp9 { get; set; }
      public decimal ptdcmp10 { get; set; }
      public decimal ptdcmp11 { get; set; }
      public decimal ptdcmp12 { get; set; }
      public decimal ptdcmp13 { get; set; }
      public decimal ptdpct1 { get; set; }
      public decimal ptdpct2 { get; set; }
      public decimal ptdpct3 { get; set; }
      public decimal ptdpct4 { get; set; }
      public decimal ptdpct5 { get; set; }
      public decimal ptdpct6 { get; set; }
      public decimal ptdpct7 { get; set; }
      public decimal ptdpct8 { get; set; }
      public decimal ptdpct9 { get; set; }
      public decimal ptdpct10 { get; set; }
      public decimal ptdpct11 { get; set; }
      public decimal ptdpct12 { get; set; }
      public decimal ptdpct13 { get; set; }
      public decimal ytd1 { get; set; }
      public decimal ytd2 { get; set; }
      public decimal ytd3 { get; set; }
      public decimal ytd4 { get; set; }
      public decimal ytd5 { get; set; }
      public decimal ytd6 { get; set; }
      public decimal ytd7 { get; set; }
      public decimal ytd8 { get; set; }
      public decimal ytd9 { get; set; }
      public decimal ytd10 { get; set; }
      public decimal ytd11 { get; set; }
      public decimal ytd12 { get; set; }
      public decimal ytd13 { get; set; }
      public decimal ytdcmp1 { get; set; }
      public decimal ytdcmp2 { get; set; }
      public decimal ytdcmp3 { get; set; }
      public decimal ytdcmp4 { get; set; }
      public decimal ytdcmp5 { get; set; }
      public decimal ytdcmp6 { get; set; }
      public decimal ytdcmp7 { get; set; }
      public decimal ytdcmp8 { get; set; }
      public decimal ytdcmp9 { get; set; }
      public decimal ytdcmp10 { get; set; }
      public decimal ytdcmp11 { get; set; }
      public decimal ytdcmp12 { get; set; }
      public decimal ytdcmp13 { get; set; }
      public decimal ytdpct1 { get; set; }
      public decimal ytdpct2 { get; set; }
      public decimal ytdpct3 { get; set; }
      public decimal ytdpct4 { get; set; }
      public decimal ytdpct5 { get; set; }
      public decimal ytdpct6 { get; set; }
      public decimal ytdpct7 { get; set; }
      public decimal ytdpct8 { get; set; }
      public decimal ytdpct9 { get; set; }
      public decimal ytdpct10 { get; set; }
      public decimal ytdpct11 { get; set; }
      public decimal ytdpct12 { get; set; }
      public decimal ytdpct13 { get; set; }
      public bool l13per { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Gliayrcmpresults BuildGliayrcmpresultsFromRow(DataRow row)
      {
         Gliayrcmpresults entity = new Gliayrcmpresults();
         entity.period1 = row.IsNull("period1") ? string.Empty : row.Field<string>("period1");
         entity.period2 = row.IsNull("period2") ? string.Empty : row.Field<string>("period2");
         entity.period3 = row.IsNull("period3") ? string.Empty : row.Field<string>("period3");
         entity.period4 = row.IsNull("period4") ? string.Empty : row.Field<string>("period4");
         entity.period5 = row.IsNull("period5") ? string.Empty : row.Field<string>("period5");
         entity.period6 = row.IsNull("period6") ? string.Empty : row.Field<string>("period6");
         entity.period7 = row.IsNull("period7") ? string.Empty : row.Field<string>("period7");
         entity.period8 = row.IsNull("period8") ? string.Empty : row.Field<string>("period8");
         entity.period9 = row.IsNull("period9") ? string.Empty : row.Field<string>("period9");
         entity.period10 = row.IsNull("period10") ? string.Empty : row.Field<string>("period10");
         entity.period11 = row.IsNull("period11") ? string.Empty : row.Field<string>("period11");
         entity.period12 = row.IsNull("period12") ? string.Empty : row.Field<string>("period12");
         entity.period13 = row.IsNull("period13") ? string.Empty : row.Field<string>("period13");
         entity.ptd1 = row.IsNull("ptd1") ? decimal.Zero : row.Field<decimal>("ptd1");
         entity.ptd2 = row.IsNull("ptd2") ? decimal.Zero : row.Field<decimal>("ptd2");
         entity.ptd3 = row.IsNull("ptd3") ? decimal.Zero : row.Field<decimal>("ptd3");
         entity.ptd4 = row.IsNull("ptd4") ? decimal.Zero : row.Field<decimal>("ptd4");
         entity.ptd5 = row.IsNull("ptd5") ? decimal.Zero : row.Field<decimal>("ptd5");
         entity.ptd6 = row.IsNull("ptd6") ? decimal.Zero : row.Field<decimal>("ptd6");
         entity.ptd7 = row.IsNull("ptd7") ? decimal.Zero : row.Field<decimal>("ptd7");
         entity.ptd8 = row.IsNull("ptd8") ? decimal.Zero : row.Field<decimal>("ptd8");
         entity.ptd9 = row.IsNull("ptd9") ? decimal.Zero : row.Field<decimal>("ptd9");
         entity.ptd10 = row.IsNull("ptd10") ? decimal.Zero : row.Field<decimal>("ptd10");
         entity.ptd11 = row.IsNull("ptd11") ? decimal.Zero : row.Field<decimal>("ptd11");
         entity.ptd12 = row.IsNull("ptd12") ? decimal.Zero : row.Field<decimal>("ptd12");
         entity.ptd13 = row.IsNull("ptd13") ? decimal.Zero : row.Field<decimal>("ptd13");
         entity.ptdcmp1 = row.IsNull("ptdcmp1") ? decimal.Zero : row.Field<decimal>("ptdcmp1");
         entity.ptdcmp2 = row.IsNull("ptdcmp2") ? decimal.Zero : row.Field<decimal>("ptdcmp2");
         entity.ptdcmp3 = row.IsNull("ptdcmp3") ? decimal.Zero : row.Field<decimal>("ptdcmp3");
         entity.ptdcmp4 = row.IsNull("ptdcmp4") ? decimal.Zero : row.Field<decimal>("ptdcmp4");
         entity.ptdcmp5 = row.IsNull("ptdcmp5") ? decimal.Zero : row.Field<decimal>("ptdcmp5");
         entity.ptdcmp6 = row.IsNull("ptdcmp6") ? decimal.Zero : row.Field<decimal>("ptdcmp6");
         entity.ptdcmp7 = row.IsNull("ptdcmp7") ? decimal.Zero : row.Field<decimal>("ptdcmp7");
         entity.ptdcmp8 = row.IsNull("ptdcmp8") ? decimal.Zero : row.Field<decimal>("ptdcmp8");
         entity.ptdcmp9 = row.IsNull("ptdcmp9") ? decimal.Zero : row.Field<decimal>("ptdcmp9");
         entity.ptdcmp10 = row.IsNull("ptdcmp10") ? decimal.Zero : row.Field<decimal>("ptdcmp10");
         entity.ptdcmp11 = row.IsNull("ptdcmp11") ? decimal.Zero : row.Field<decimal>("ptdcmp11");
         entity.ptdcmp12 = row.IsNull("ptdcmp12") ? decimal.Zero : row.Field<decimal>("ptdcmp12");
         entity.ptdcmp13 = row.IsNull("ptdcmp13") ? decimal.Zero : row.Field<decimal>("ptdcmp13");
         entity.ptdpct1 = row.IsNull("ptdpct1") ? decimal.Zero : row.Field<decimal>("ptdpct1");
         entity.ptdpct2 = row.IsNull("ptdpct2") ? decimal.Zero : row.Field<decimal>("ptdpct2");
         entity.ptdpct3 = row.IsNull("ptdpct3") ? decimal.Zero : row.Field<decimal>("ptdpct3");
         entity.ptdpct4 = row.IsNull("ptdpct4") ? decimal.Zero : row.Field<decimal>("ptdpct4");
         entity.ptdpct5 = row.IsNull("ptdpct5") ? decimal.Zero : row.Field<decimal>("ptdpct5");
         entity.ptdpct6 = row.IsNull("ptdpct6") ? decimal.Zero : row.Field<decimal>("ptdpct6");
         entity.ptdpct7 = row.IsNull("ptdpct7") ? decimal.Zero : row.Field<decimal>("ptdpct7");
         entity.ptdpct8 = row.IsNull("ptdpct8") ? decimal.Zero : row.Field<decimal>("ptdpct8");
         entity.ptdpct9 = row.IsNull("ptdpct9") ? decimal.Zero : row.Field<decimal>("ptdpct9");
         entity.ptdpct10 = row.IsNull("ptdpct10") ? decimal.Zero : row.Field<decimal>("ptdpct10");
         entity.ptdpct11 = row.IsNull("ptdpct11") ? decimal.Zero : row.Field<decimal>("ptdpct11");
         entity.ptdpct12 = row.IsNull("ptdpct12") ? decimal.Zero : row.Field<decimal>("ptdpct12");
         entity.ptdpct13 = row.IsNull("ptdpct13") ? decimal.Zero : row.Field<decimal>("ptdpct13");
         entity.ytd1 = row.IsNull("ytd1") ? decimal.Zero : row.Field<decimal>("ytd1");
         entity.ytd2 = row.IsNull("ytd2") ? decimal.Zero : row.Field<decimal>("ytd2");
         entity.ytd3 = row.IsNull("ytd3") ? decimal.Zero : row.Field<decimal>("ytd3");
         entity.ytd4 = row.IsNull("ytd4") ? decimal.Zero : row.Field<decimal>("ytd4");
         entity.ytd5 = row.IsNull("ytd5") ? decimal.Zero : row.Field<decimal>("ytd5");
         entity.ytd6 = row.IsNull("ytd6") ? decimal.Zero : row.Field<decimal>("ytd6");
         entity.ytd7 = row.IsNull("ytd7") ? decimal.Zero : row.Field<decimal>("ytd7");
         entity.ytd8 = row.IsNull("ytd8") ? decimal.Zero : row.Field<decimal>("ytd8");
         entity.ytd9 = row.IsNull("ytd9") ? decimal.Zero : row.Field<decimal>("ytd9");
         entity.ytd10 = row.IsNull("ytd10") ? decimal.Zero : row.Field<decimal>("ytd10");
         entity.ytd11 = row.IsNull("ytd11") ? decimal.Zero : row.Field<decimal>("ytd11");
         entity.ytd12 = row.IsNull("ytd12") ? decimal.Zero : row.Field<decimal>("ytd12");
         entity.ytd13 = row.IsNull("ytd13") ? decimal.Zero : row.Field<decimal>("ytd13");
         entity.ytdcmp1 = row.IsNull("ytdcmp1") ? decimal.Zero : row.Field<decimal>("ytdcmp1");
         entity.ytdcmp2 = row.IsNull("ytdcmp2") ? decimal.Zero : row.Field<decimal>("ytdcmp2");
         entity.ytdcmp3 = row.IsNull("ytdcmp3") ? decimal.Zero : row.Field<decimal>("ytdcmp3");
         entity.ytdcmp4 = row.IsNull("ytdcmp4") ? decimal.Zero : row.Field<decimal>("ytdcmp4");
         entity.ytdcmp5 = row.IsNull("ytdcmp5") ? decimal.Zero : row.Field<decimal>("ytdcmp5");
         entity.ytdcmp6 = row.IsNull("ytdcmp6") ? decimal.Zero : row.Field<decimal>("ytdcmp6");
         entity.ytdcmp7 = row.IsNull("ytdcmp7") ? decimal.Zero : row.Field<decimal>("ytdcmp7");
         entity.ytdcmp8 = row.IsNull("ytdcmp8") ? decimal.Zero : row.Field<decimal>("ytdcmp8");
         entity.ytdcmp9 = row.IsNull("ytdcmp9") ? decimal.Zero : row.Field<decimal>("ytdcmp9");
         entity.ytdcmp10 = row.IsNull("ytdcmp10") ? decimal.Zero : row.Field<decimal>("ytdcmp10");
         entity.ytdcmp11 = row.IsNull("ytdcmp11") ? decimal.Zero : row.Field<decimal>("ytdcmp11");
         entity.ytdcmp12 = row.IsNull("ytdcmp12") ? decimal.Zero : row.Field<decimal>("ytdcmp12");
         entity.ytdcmp13 = row.IsNull("ytdcmp13") ? decimal.Zero : row.Field<decimal>("ytdcmp13");
         entity.ytdpct1 = row.IsNull("ytdpct1") ? decimal.Zero : row.Field<decimal>("ytdpct1");
         entity.ytdpct2 = row.IsNull("ytdpct2") ? decimal.Zero : row.Field<decimal>("ytdpct2");
         entity.ytdpct3 = row.IsNull("ytdpct3") ? decimal.Zero : row.Field<decimal>("ytdpct3");
         entity.ytdpct4 = row.IsNull("ytdpct4") ? decimal.Zero : row.Field<decimal>("ytdpct4");
         entity.ytdpct5 = row.IsNull("ytdpct5") ? decimal.Zero : row.Field<decimal>("ytdpct5");
         entity.ytdpct6 = row.IsNull("ytdpct6") ? decimal.Zero : row.Field<decimal>("ytdpct6");
         entity.ytdpct7 = row.IsNull("ytdpct7") ? decimal.Zero : row.Field<decimal>("ytdpct7");
         entity.ytdpct8 = row.IsNull("ytdpct8") ? decimal.Zero : row.Field<decimal>("ytdpct8");
         entity.ytdpct9 = row.IsNull("ytdpct9") ? decimal.Zero : row.Field<decimal>("ytdpct9");
         entity.ytdpct10 = row.IsNull("ytdpct10") ? decimal.Zero : row.Field<decimal>("ytdpct10");
         entity.ytdpct11 = row.IsNull("ytdpct11") ? decimal.Zero : row.Field<decimal>("ytdpct11");
         entity.ytdpct12 = row.IsNull("ytdpct12") ? decimal.Zero : row.Field<decimal>("ytdpct12");
         entity.ytdpct13 = row.IsNull("ytdpct13") ? decimal.Zero : row.Field<decimal>("ytdpct13");
         entity.l13per = row.Field<bool>("l13per");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGliayrcmpresults(ref DataRow row, Gliayrcmpresults entity)
      {
         row.SetField("period1", entity.period1);
         row.SetField("period2", entity.period2);
         row.SetField("period3", entity.period3);
         row.SetField("period4", entity.period4);
         row.SetField("period5", entity.period5);
         row.SetField("period6", entity.period6);
         row.SetField("period7", entity.period7);
         row.SetField("period8", entity.period8);
         row.SetField("period9", entity.period9);
         row.SetField("period10", entity.period10);
         row.SetField("period11", entity.period11);
         row.SetField("period12", entity.period12);
         row.SetField("period13", entity.period13);
         row.SetField("ptd1", entity.ptd1);
         row.SetField("ptd2", entity.ptd2);
         row.SetField("ptd3", entity.ptd3);
         row.SetField("ptd4", entity.ptd4);
         row.SetField("ptd5", entity.ptd5);
         row.SetField("ptd6", entity.ptd6);
         row.SetField("ptd7", entity.ptd7);
         row.SetField("ptd8", entity.ptd8);
         row.SetField("ptd9", entity.ptd9);
         row.SetField("ptd10", entity.ptd10);
         row.SetField("ptd11", entity.ptd11);
         row.SetField("ptd12", entity.ptd12);
         row.SetField("ptd13", entity.ptd13);
         row.SetField("ptdcmp1", entity.ptdcmp1);
         row.SetField("ptdcmp2", entity.ptdcmp2);
         row.SetField("ptdcmp3", entity.ptdcmp3);
         row.SetField("ptdcmp4", entity.ptdcmp4);
         row.SetField("ptdcmp5", entity.ptdcmp5);
         row.SetField("ptdcmp6", entity.ptdcmp6);
         row.SetField("ptdcmp7", entity.ptdcmp7);
         row.SetField("ptdcmp8", entity.ptdcmp8);
         row.SetField("ptdcmp9", entity.ptdcmp9);
         row.SetField("ptdcmp10", entity.ptdcmp10);
         row.SetField("ptdcmp11", entity.ptdcmp11);
         row.SetField("ptdcmp12", entity.ptdcmp12);
         row.SetField("ptdcmp13", entity.ptdcmp13);
         row.SetField("ptdpct1", entity.ptdpct1);
         row.SetField("ptdpct2", entity.ptdpct2);
         row.SetField("ptdpct3", entity.ptdpct3);
         row.SetField("ptdpct4", entity.ptdpct4);
         row.SetField("ptdpct5", entity.ptdpct5);
         row.SetField("ptdpct6", entity.ptdpct6);
         row.SetField("ptdpct7", entity.ptdpct7);
         row.SetField("ptdpct8", entity.ptdpct8);
         row.SetField("ptdpct9", entity.ptdpct9);
         row.SetField("ptdpct10", entity.ptdpct10);
         row.SetField("ptdpct11", entity.ptdpct11);
         row.SetField("ptdpct12", entity.ptdpct12);
         row.SetField("ptdpct13", entity.ptdpct13);
         row.SetField("ytd1", entity.ytd1);
         row.SetField("ytd2", entity.ytd2);
         row.SetField("ytd3", entity.ytd3);
         row.SetField("ytd4", entity.ytd4);
         row.SetField("ytd5", entity.ytd5);
         row.SetField("ytd6", entity.ytd6);
         row.SetField("ytd7", entity.ytd7);
         row.SetField("ytd8", entity.ytd8);
         row.SetField("ytd9", entity.ytd9);
         row.SetField("ytd10", entity.ytd10);
         row.SetField("ytd11", entity.ytd11);
         row.SetField("ytd12", entity.ytd12);
         row.SetField("ytd13", entity.ytd13);
         row.SetField("ytdcmp1", entity.ytdcmp1);
         row.SetField("ytdcmp2", entity.ytdcmp2);
         row.SetField("ytdcmp3", entity.ytdcmp3);
         row.SetField("ytdcmp4", entity.ytdcmp4);
         row.SetField("ytdcmp5", entity.ytdcmp5);
         row.SetField("ytdcmp6", entity.ytdcmp6);
         row.SetField("ytdcmp7", entity.ytdcmp7);
         row.SetField("ytdcmp8", entity.ytdcmp8);
         row.SetField("ytdcmp9", entity.ytdcmp9);
         row.SetField("ytdcmp10", entity.ytdcmp10);
         row.SetField("ytdcmp11", entity.ytdcmp11);
         row.SetField("ytdcmp12", entity.ytdcmp12);
         row.SetField("ytdcmp13", entity.ytdcmp13);
         row.SetField("ytdpct1", entity.ytdpct1);
         row.SetField("ytdpct2", entity.ytdpct2);
         row.SetField("ytdpct3", entity.ytdpct3);
         row.SetField("ytdpct4", entity.ytdpct4);
         row.SetField("ytdpct5", entity.ytdpct5);
         row.SetField("ytdpct6", entity.ytdpct6);
         row.SetField("ytdpct7", entity.ytdpct7);
         row.SetField("ytdpct8", entity.ytdpct8);
         row.SetField("ytdpct9", entity.ytdpct9);
         row.SetField("ytdpct10", entity.ytdpct10);
         row.SetField("ytdpct11", entity.ytdpct11);
         row.SetField("ytdpct12", entity.ytdpct12);
         row.SetField("ytdpct13", entity.ytdpct13);
         row.SetField("l13per", entity.l13per);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591