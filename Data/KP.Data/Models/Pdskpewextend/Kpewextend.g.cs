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

namespace Infor.Sxe.KP.Data.Models.Pdskpewextend
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdskpewextend.Kpewextend")]
   public partial class Kpewextend : ModelBase
   {
      public int wono { get; set; }
      public int wosuf { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      public decimal qtyship { get; set; }
      public decimal stkqtyship { get; set; }
      public bool bofl { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string orderaltnotxt { get; set; }
      [StringValidationAttribute]
      public string orderaltnotxtlbl { get; set; }
      public int linealtno { get; set; }
      public decimal linealtqty { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string unitstock { get; set; }
      [StringValidationAttribute]
      public string allowshipoverridefl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public bool wmfl { get; set; }
      public decimal wmqtyship { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Kpewextend BuildKpewextendFromRow(DataRow row)
      {
         Kpewextend entity = new Kpewextend();
         entity.wono = row.IsNull("wono") ? 0 : row.Field<int>("wono");
         entity.wosuf = row.IsNull("wosuf") ? 0 : row.Field<int>("wosuf");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.bofl = row.Field<bool>("bofl");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.orderaltnotxt = row.IsNull("orderaltnotxt") ? string.Empty : row.Field<string>("orderaltnotxt");
         entity.orderaltnotxtlbl = row.IsNull("orderaltnotxtlbl") ? string.Empty : row.Field<string>("orderaltnotxtlbl");
         entity.linealtno = row.IsNull("linealtno") ? 0 : row.Field<int>("linealtno");
         entity.linealtqty = row.IsNull("linealtqty") ? decimal.Zero : row.Field<decimal>("linealtqty");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.unitstock = row.IsNull("unitstock") ? string.Empty : row.Field<string>("unitstock");
         entity.allowshipoverridefl = row.IsNull("allowshipoverridefl") ? string.Empty : row.Field<string>("allowshipoverridefl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.wmfl = row.Field<bool>("wmfl");
         entity.wmqtyship = row.IsNull("wmqtyship") ? decimal.Zero : row.Field<decimal>("wmqtyship");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKpewextend(ref DataRow row, Kpewextend entity)
      {
         row.SetField("wono", entity.wono);
         row.SetField("wosuf", entity.wosuf);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("bofl", entity.bofl);
         row.SetField("refer", entity.refer);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("orderaltnotxt", entity.orderaltnotxt);
         row.SetField("orderaltnotxtlbl", entity.orderaltnotxtlbl);
         row.SetField("linealtno", entity.linealtno);
         row.SetField("linealtqty", entity.linealtqty);
         row.SetField("unit", entity.unit);
         row.SetField("unitstock", entity.unitstock);
         row.SetField("allowshipoverridefl", entity.allowshipoverridefl);
         row.SetField("whse", entity.whse);
         row.SetField("wmfl", entity.wmfl);
         row.SetField("wmqtyship", entity.wmqtyship);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591