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

namespace Infor.Sxe.IC.Data.Models.Pdsnsinvhdrlookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsnsinvhdrlookup.Nsinvhdrlookupresults")]
   public partial class Nsinvhdrlookupresults : ModelBase
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string typecd { get; set; }
      [StringValidationAttribute]
      public string typecddspl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      public bool activefl { get; set; }
      [StringValidationAttribute]
      public string descrip1 { get; set; }
      [StringValidationAttribute]
      public string descrip2 { get; set; }
      public decimal quantity { get; set; }
      [StringValidationAttribute]
      public string icswprod { get; set; }
      [StringValidationAttribute]
      public string icspprodcat { get; set; }
      [StringValidationAttribute]
      public string tiedqty { get; set; }
      [StringValidationAttribute]
      public string availqty { get; set; }
      [StringValidationAttribute]
      public string rowidIcenh { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Nsinvhdrlookupresults BuildNsinvhdrlookupresultsFromRow(DataRow row)
      {
         Nsinvhdrlookupresults entity = new Nsinvhdrlookupresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.typecd = row.IsNull("typecd") ? string.Empty : row.Field<string>("typecd");
         entity.typecddspl = row.IsNull("typecddspl") ? string.Empty : row.Field<string>("typecddspl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.activefl = row.Field<bool>("activefl");
         entity.descrip1 = row.IsNull("descrip1") ? string.Empty : row.Field<string>("descrip1");
         entity.descrip2 = row.IsNull("descrip2") ? string.Empty : row.Field<string>("descrip2");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.icswprod = row.IsNull("icswprod") ? string.Empty : row.Field<string>("icswprod");
         entity.icspprodcat = row.IsNull("icspprodcat") ? string.Empty : row.Field<string>("icspprodcat");
         entity.tiedqty = row.IsNull("tiedqty") ? string.Empty : row.Field<string>("tiedqty");
         entity.availqty = row.IsNull("availqty") ? string.Empty : row.Field<string>("availqty");
         entity.rowidIcenh = row.Field<byte[]>("rowid-icenh").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromNsinvhdrlookupresults(ref DataRow row, Nsinvhdrlookupresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("typecd", entity.typecd);
         row.SetField("typecddspl", entity.typecddspl);
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("activefl", entity.activefl);
         row.SetField("descrip1", entity.descrip1);
         row.SetField("descrip2", entity.descrip2);
         row.SetField("quantity", entity.quantity);
         row.SetField("icswprod", entity.icswprod);
         row.SetField("icspprodcat", entity.icspprodcat);
         row.SetField("tiedqty", entity.tiedqty);
         row.SetField("availqty", entity.availqty);
         row.SetField("rowid-icenh", entity.rowidIcenh.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
