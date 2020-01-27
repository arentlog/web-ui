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

namespace Infor.Sxe.PO.Data.Models.Pdspoblanketlines
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoblanketlines.Poblanketlinesresults")]
   public partial class Poblanketlinesresults : ModelBase
   {
      public int lineno { get; set; }
      public bool commentfl { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string prodnotesfl { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public decimal qtyord { get; set; }
      public decimal qtyordOrig { get; set; }
      public decimal ordered { get; set; }
      public decimal qtyremain { get; set; }
      public bool allowedit { get; set; }
      public bool msdsfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Poblanketlinesresults BuildPoblanketlinesresultsFromRow(DataRow row)
      {
         Poblanketlinesresults entity = new Poblanketlinesresults();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.prodnotesfl = row.IsNull("prodnotesfl") ? string.Empty : row.Field<string>("prodnotesfl");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtyordOrig = row.IsNull("qtyord-orig") ? decimal.Zero : row.Field<decimal>("qtyord-orig");
         entity.ordered = row.IsNull("ordered") ? decimal.Zero : row.Field<decimal>("ordered");
         entity.qtyremain = row.IsNull("qtyremain") ? decimal.Zero : row.Field<decimal>("qtyremain");
         entity.allowedit = row.Field<bool>("allowedit");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoblanketlinesresults(ref DataRow row, Poblanketlinesresults entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("prodnotesfl", entity.prodnotesfl);
         row.SetField("unit", entity.unit);
         row.SetField("descrip", entity.descrip);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtyord-orig", entity.qtyordOrig);
         row.SetField("ordered", entity.ordered);
         row.SetField("qtyremain", entity.qtyremain);
         row.SetField("allowedit", entity.allowedit);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
