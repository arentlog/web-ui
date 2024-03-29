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

namespace Infor.Sxe.IC.Data.Models.Pdsicsevloadtt
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsevloadtt.Icsevloadttresults")]
   public partial class Icsevloadttresults : ModelBase
   {
      [StringValidationAttribute]
      public string lifocat { get; set; }
      public int yr { get; set; }
      public decimal layer { get; set; }
      public decimal lifoindex { get; set; }
      public decimal currval { get; set; }
      [StringValidationAttribute]
      public string icsevrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsevloadttresults BuildIcsevloadttresultsFromRow(DataRow row)
      {
         Icsevloadttresults entity = new Icsevloadttresults();
         entity.lifocat = row.IsNull("lifocat") ? string.Empty : row.Field<string>("lifocat");
         entity.yr = row.IsNull("yr") ? 0 : row.Field<int>("yr");
         entity.layer = row.IsNull("layer") ? decimal.Zero : row.Field<decimal>("layer");
         entity.lifoindex = row.IsNull("lifoindex") ? decimal.Zero : row.Field<decimal>("lifoindex");
         entity.currval = row.IsNull("currval") ? decimal.Zero : row.Field<decimal>("currval");
         entity.icsevrowid = row.Field<byte[]>("icsevrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsevloadttresults(ref DataRow row, Icsevloadttresults entity)
      {
         row.SetField("lifocat", entity.lifocat);
         row.SetField("yr", entity.yr);
         row.SetField("layer", entity.layer);
         row.SetField("lifoindex", entity.lifoindex);
         row.SetField("currval", entity.currval);
         row.SetField("icsevrowid", entity.icsevrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
