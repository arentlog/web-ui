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

namespace Infor.Sxe.KP.Data.Models.Pdskpworkorder
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdskpworkorder.Kpworkorder")]
   public partial class Kpworkorder : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public int kitverno { get; set; }
      [StringValidationAttribute]
      public string kpetrowid { get; set; }
      public bool wostarted { get; set; }
      public int wono { get; set; }
      public int wosuf { get; set; }
      [StringValidationAttribute]
      public string wonoC { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal conv { get; set; }
      [StringValidationAttribute]
      public string unitdesc { get; set; }
      public decimal qtyord { get; set; }
      public decimal qtyship { get; set; }
      public decimal stkqtyord { get; set; }
      public decimal stkqtyship { get; set; }
      public bool bofl { get; set; }
      public DateTime? enterdt { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public int orderaltno { get; set; }
      public int orderaltsuf { get; set; }
      public int orderaltlineno { get; set; }
      public int orderaltseqno { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      public bool keyfl { get; set; }
      public bool optfl { get; set; }
      public bool reqfl { get; set; }
      [StringValidationAttribute]
      public string allow8791fl { get; set; }
      [StringValidationAttribute]
      public string allowcomptiefl { get; set; }
      [StringValidationAttribute]
      public string allowshipoverridefl { get; set; }
      [StringValidationAttribute]
      public string confirmdeletefl { get; set; }
      public bool fromsourcingfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Kpworkorder BuildKpworkorderFromRow(DataRow row)
      {
         Kpworkorder entity = new Kpworkorder();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.kitverno = row.IsNull("kitverno") ? 0 : row.Field<int>("kitverno");
         entity.kpetrowid = row.Field<byte[]>("kpetrowid").ToStringEncoded();
         entity.wostarted = row.Field<bool>("wostarted");
         entity.wono = row.IsNull("wono") ? 0 : row.Field<int>("wono");
         entity.wosuf = row.IsNull("wosuf") ? 0 : row.Field<int>("wosuf");
         entity.wonoC = row.IsNull("wono-c") ? string.Empty : row.Field<string>("wono-c");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.conv = row.IsNull("conv") ? decimal.Zero : row.Field<decimal>("conv");
         entity.unitdesc = row.IsNull("unitdesc") ? string.Empty : row.Field<string>("unitdesc");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.bofl = row.Field<bool>("bofl");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderaltsuf = row.IsNull("orderaltsuf") ? 0 : row.Field<int>("orderaltsuf");
         entity.orderaltlineno = row.IsNull("orderaltlineno") ? 0 : row.Field<int>("orderaltlineno");
         entity.orderaltseqno = row.IsNull("orderaltseqno") ? 0 : row.Field<int>("orderaltseqno");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.keyfl = row.Field<bool>("keyfl");
         entity.optfl = row.Field<bool>("optfl");
         entity.reqfl = row.Field<bool>("reqfl");
         entity.allow8791fl = row.IsNull("allow8791fl") ? string.Empty : row.Field<string>("allow8791fl");
         entity.allowcomptiefl = row.IsNull("allowcomptiefl") ? string.Empty : row.Field<string>("allowcomptiefl");
         entity.allowshipoverridefl = row.IsNull("allowshipoverridefl") ? string.Empty : row.Field<string>("allowshipoverridefl");
         entity.confirmdeletefl = row.IsNull("confirmdeletefl") ? string.Empty : row.Field<string>("confirmdeletefl");
         entity.fromsourcingfl = row.Field<bool>("fromsourcingfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKpworkorder(ref DataRow row, Kpworkorder entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("kitverno", entity.kitverno);
         row.SetField("kpetrowid", entity.kpetrowid.ToByteArray());
         row.SetField("wostarted", entity.wostarted);
         row.SetField("wono", entity.wono);
         row.SetField("wosuf", entity.wosuf);
         row.SetField("wono-c", entity.wonoC);
         row.SetField("unit", entity.unit);
         row.SetField("conv", entity.conv);
         row.SetField("unitdesc", entity.unitdesc);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("bofl", entity.bofl);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("refer", entity.refer);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderaltsuf", entity.orderaltsuf);
         row.SetField("orderaltlineno", entity.orderaltlineno);
         row.SetField("orderaltseqno", entity.orderaltseqno);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("keyfl", entity.keyfl);
         row.SetField("optfl", entity.optfl);
         row.SetField("reqfl", entity.reqfl);
         row.SetField("allow8791fl", entity.allow8791fl);
         row.SetField("allowcomptiefl", entity.allowcomptiefl);
         row.SetField("allowshipoverridefl", entity.allowshipoverridefl);
         row.SetField("confirmdeletefl", entity.confirmdeletefl);
         row.SetField("fromsourcingfl", entity.fromsourcingfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
