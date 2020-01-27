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
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsfrtrateshopload.Frtrateshoploadsingle")]
   public partial class Frtrateshoploadsingle : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string whsedesc { get; set; }
      [StringValidationAttribute]
      public string shipvia { get; set; }
      [StringValidationAttribute]
      public string shipviadesc { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string zipcd { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custname { get; set; }
      [StringValidationAttribute]
      public string custnotesfl { get; set; }
      public decimal orderwght { get; set; }
      public decimal shipwght { get; set; }
      public decimal ordfrtextra1 { get; set; }
      public decimal ordfrtextra2 { get; set; }
      public decimal shipfrtextra1 { get; set; }
      public decimal shipfrtextra2 { get; set; }
      [StringValidationAttribute]
      public string error1 { get; set; }
      [StringValidationAttribute]
      public string error2 { get; set; }
      [StringValidationAttribute]
      public string sortby { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Frtrateshoploadsingle BuildFrtrateshoploadsingleFromRow(DataRow row)
      {
         Frtrateshoploadsingle entity = new Frtrateshoploadsingle();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.whsedesc = row.IsNull("whsedesc") ? string.Empty : row.Field<string>("whsedesc");
         entity.shipvia = row.IsNull("shipvia") ? string.Empty : row.Field<string>("shipvia");
         entity.shipviadesc = row.IsNull("shipviadesc") ? string.Empty : row.Field<string>("shipviadesc");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custname = row.IsNull("custname") ? string.Empty : row.Field<string>("custname");
         entity.custnotesfl = row.IsNull("custnotesfl") ? string.Empty : row.Field<string>("custnotesfl");
         entity.orderwght = row.IsNull("orderwght") ? decimal.Zero : row.Field<decimal>("orderwght");
         entity.shipwght = row.IsNull("shipwght") ? decimal.Zero : row.Field<decimal>("shipwght");
         entity.ordfrtextra1 = row.IsNull("ordfrtextra1") ? decimal.Zero : row.Field<decimal>("ordfrtextra1");
         entity.ordfrtextra2 = row.IsNull("ordfrtextra2") ? decimal.Zero : row.Field<decimal>("ordfrtextra2");
         entity.shipfrtextra1 = row.IsNull("shipfrtextra1") ? decimal.Zero : row.Field<decimal>("shipfrtextra1");
         entity.shipfrtextra2 = row.IsNull("shipfrtextra2") ? decimal.Zero : row.Field<decimal>("shipfrtextra2");
         entity.error1 = row.IsNull("error1") ? string.Empty : row.Field<string>("error1");
         entity.error2 = row.IsNull("error2") ? string.Empty : row.Field<string>("error2");
         entity.sortby = row.IsNull("sortby") ? string.Empty : row.Field<string>("sortby");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromFrtrateshoploadsingle(ref DataRow row, Frtrateshoploadsingle entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("whsedesc", entity.whsedesc);
         row.SetField("shipvia", entity.shipvia);
         row.SetField("shipviadesc", entity.shipviadesc);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("custno", entity.custno);
         row.SetField("custname", entity.custname);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("orderwght", entity.orderwght);
         row.SetField("shipwght", entity.shipwght);
         row.SetField("ordfrtextra1", entity.ordfrtextra1);
         row.SetField("ordfrtextra2", entity.ordfrtextra2);
         row.SetField("shipfrtextra1", entity.shipfrtextra1);
         row.SetField("shipfrtextra2", entity.shipfrtextra2);
         row.SetField("error1", entity.error1);
         row.SetField("error2", entity.error2);
         row.SetField("sortby", entity.sortby);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591