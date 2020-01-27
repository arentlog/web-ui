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

namespace Infor.Sxe.OE.Data.Models.Pdsfrtrateshopload
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsfrtrateshopload.Frtrateshoploadlist")]
   public partial class Frtrateshoploadlist : ModelBase
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string shipvia { get; set; }
      [StringValidationAttribute]
      public string shipviadesc { get; set; }
      [StringValidationAttribute]
      public string zone { get; set; }
      public decimal overmaxrate { get; set; }
      public decimal orderwghtlim { get; set; }
      public decimal shipwghtlim { get; set; }
      public decimal orderwght { get; set; }
      public decimal shipwght { get; set; }
      public decimal orderfrt { get; set; }
      public decimal shipfrt { get; set; }
      public decimal ordfrtextra1 { get; set; }
      public decimal ordfrtextra2 { get; set; }
      public decimal shipfrtextra1 { get; set; }
      public decimal shipfrtextra2 { get; set; }
      [StringValidationAttribute]
      public string xxc1 { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Frtrateshoploadlist BuildFrtrateshoploadlistFromRow(DataRow row)
      {
         Frtrateshoploadlist entity = new Frtrateshoploadlist();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.shipvia = row.IsNull("shipvia") ? string.Empty : row.Field<string>("shipvia");
         entity.shipviadesc = row.IsNull("shipviadesc") ? string.Empty : row.Field<string>("shipviadesc");
         entity.zone = row.IsNull("zone") ? string.Empty : row.Field<string>("zone");
         entity.overmaxrate = row.IsNull("overmaxrate") ? decimal.Zero : row.Field<decimal>("overmaxrate");
         entity.orderwghtlim = row.IsNull("orderwghtlim") ? decimal.Zero : row.Field<decimal>("orderwghtlim");
         entity.shipwghtlim = row.IsNull("shipwghtlim") ? decimal.Zero : row.Field<decimal>("shipwghtlim");
         entity.orderwght = row.IsNull("orderwght") ? decimal.Zero : row.Field<decimal>("orderwght");
         entity.shipwght = row.IsNull("shipwght") ? decimal.Zero : row.Field<decimal>("shipwght");
         entity.orderfrt = row.IsNull("orderfrt") ? decimal.Zero : row.Field<decimal>("orderfrt");
         entity.shipfrt = row.IsNull("shipfrt") ? decimal.Zero : row.Field<decimal>("shipfrt");
         entity.ordfrtextra1 = row.IsNull("ordfrtextra1") ? decimal.Zero : row.Field<decimal>("ordfrtextra1");
         entity.ordfrtextra2 = row.IsNull("ordfrtextra2") ? decimal.Zero : row.Field<decimal>("ordfrtextra2");
         entity.shipfrtextra1 = row.IsNull("shipfrtextra1") ? decimal.Zero : row.Field<decimal>("shipfrtextra1");
         entity.shipfrtextra2 = row.IsNull("shipfrtextra2") ? decimal.Zero : row.Field<decimal>("shipfrtextra2");
         entity.xxc1 = row.IsNull("xxc1") ? string.Empty : row.Field<string>("xxc1");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromFrtrateshoploadlist(ref DataRow row, Frtrateshoploadlist entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("whse", entity.whse);
         row.SetField("shipvia", entity.shipvia);
         row.SetField("shipviadesc", entity.shipviadesc);
         row.SetField("zone", entity.zone);
         row.SetField("overmaxrate", entity.overmaxrate);
         row.SetField("orderwghtlim", entity.orderwghtlim);
         row.SetField("shipwghtlim", entity.shipwghtlim);
         row.SetField("orderwght", entity.orderwght);
         row.SetField("shipwght", entity.shipwght);
         row.SetField("orderfrt", entity.orderfrt);
         row.SetField("shipfrt", entity.shipfrt);
         row.SetField("ordfrtextra1", entity.ordfrtextra1);
         row.SetField("ordfrtextra2", entity.ordfrtextra2);
         row.SetField("shipfrtextra1", entity.shipfrtextra1);
         row.SetField("shipfrtextra2", entity.shipfrtextra2);
         row.SetField("xxc1", entity.xxc1);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591