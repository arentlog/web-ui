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

namespace Infor.Sxe.WT.Data.Models.Pdswtialine
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtialine.Wtialineresults")]
   public partial class Wtialineresults : ModelBase
   {
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string approvety { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public decimal qtyord { get; set; }
      public decimal qtyship { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public bool bofl { get; set; }
      [StringValidationAttribute]
      public string prodtype { get; set; }
      [StringValidationAttribute]
      public string rowidWtel { get; set; }
      [StringValidationAttribute]
      public string cmessage { get; set; }
      public decimal netAvailable { get; set; }
      public decimal surplus { get; set; }
      public decimal totalLineAmt { get; set; }
      public bool msdsfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtialineresults BuildWtialineresultsFromRow(DataRow row)
      {
         Wtialineresults entity = new Wtialineresults();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.approvety = row.IsNull("approvety") ? string.Empty : row.Field<string>("approvety");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.bofl = row.Field<bool>("bofl");
         entity.prodtype = row.IsNull("prodtype") ? string.Empty : row.Field<string>("prodtype");
         entity.rowidWtel = row.Field<byte[]>("rowid-wtel").ToStringEncoded();
         entity.cmessage = row.IsNull("cmessage") ? string.Empty : row.Field<string>("cmessage");
         entity.netAvailable = row.IsNull("NetAvailable") ? decimal.Zero : row.Field<decimal>("NetAvailable");
         entity.surplus = row.IsNull("Surplus") ? decimal.Zero : row.Field<decimal>("Surplus");
         entity.totalLineAmt = row.IsNull("TotalLineAmt") ? decimal.Zero : row.Field<decimal>("TotalLineAmt");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtialineresults(ref DataRow row, Wtialineresults entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("approvety", entity.approvety);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("unit", entity.unit);
         row.SetField("bofl", entity.bofl);
         row.SetField("prodtype", entity.prodtype);
         row.SetField("rowid-wtel", entity.rowidWtel.ToByteArray());
         row.SetField("cmessage", entity.cmessage);
         row.SetField("NetAvailable", entity.netAvailable);
         row.SetField("Surplus", entity.surplus);
         row.SetField("TotalLineAmt", entity.totalLineAmt);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
