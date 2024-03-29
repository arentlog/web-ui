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

namespace Infor.Sxe.OE.Data.Models.Pdssupaccessresponse
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdssupaccessresponse.Supaccessresponse")]
   public partial class Supaccessresponse : ModelBase
   {
      public decimal qtyavail { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal unitconv { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string vendorlocationid { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendorname { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string shipfromname { get; set; }
      public DateTime? dateavailable { get; set; }
      [StringValidationAttribute]
      public string timeavailable { get; set; }
      public decimal qtyord { get; set; }
      public decimal stkqtyord { get; set; }
      [StringValidationAttribute]
      public string ordunit { get; set; }
      public decimal ordunitconv { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string errorstatus { get; set; }
      [StringValidationAttribute]
      public string recordtype { get; set; }
      [StringValidationAttribute]
      public string altprod { get; set; }
      [StringValidationAttribute]
      public string interchangeprod { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Supaccessresponse BuildSupaccessresponseFromRow(DataRow row)
      {
         Supaccessresponse entity = new Supaccessresponse();
         entity.qtyavail = row.IsNull("qtyavail") ? decimal.Zero : row.Field<decimal>("qtyavail");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.vendorlocationid = row.IsNull("vendorlocationid") ? string.Empty : row.Field<string>("vendorlocationid");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendorname = row.IsNull("vendorname") ? string.Empty : row.Field<string>("vendorname");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.shipfromname = row.IsNull("shipfromname") ? string.Empty : row.Field<string>("shipfromname");
         entity.dateavailable = row.Field<DateTime?>("dateavailable");
         entity.timeavailable = row.IsNull("timeavailable") ? string.Empty : row.Field<string>("timeavailable");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.ordunit = row.IsNull("ordunit") ? string.Empty : row.Field<string>("ordunit");
         entity.ordunitconv = row.IsNull("ordunitconv") ? decimal.Zero : row.Field<decimal>("ordunitconv");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.errorstatus = row.IsNull("errorstatus") ? string.Empty : row.Field<string>("errorstatus");
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.altprod = row.IsNull("altprod") ? string.Empty : row.Field<string>("altprod");
         entity.interchangeprod = row.IsNull("interchangeprod") ? string.Empty : row.Field<string>("interchangeprod");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSupaccessresponse(ref DataRow row, Supaccessresponse entity)
      {
         row.SetField("qtyavail", entity.qtyavail);
         row.SetField("unit", entity.unit);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("whse", entity.whse);
         row.SetField("vendorlocationid", entity.vendorlocationid);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendorname", entity.vendorname);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("shipfromname", entity.shipfromname);
         row.SetField("dateavailable", entity.dateavailable);
         row.SetField("timeavailable", entity.timeavailable);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("ordunit", entity.ordunit);
         row.SetField("ordunitconv", entity.ordunitconv);
         row.SetField("statustype", entity.statustype);
         row.SetField("errorstatus", entity.errorstatus);
         row.SetField("recordtype", entity.recordtype);
         row.SetField("altprod", entity.altprod);
         row.SetField("interchangeprod", entity.interchangeprod);
         row.SetField("seqno", entity.seqno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
