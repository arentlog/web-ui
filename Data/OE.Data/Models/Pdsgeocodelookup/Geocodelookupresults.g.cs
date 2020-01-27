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

namespace Infor.Sxe.OE.Data.Models.Pdsgeocodelookup
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsgeocodelookup.Geocodelookupresults")]
   public partial class Geocodelookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string cityname { get; set; }
      [StringValidationAttribute]
      public string outsidecity { get; set; }
      [StringValidationAttribute]
      public string cntyname { get; set; }
      [StringValidationAttribute]
      public string statecode { get; set; }
      [StringValidationAttribute]
      public string zip1 { get; set; }
      [StringValidationAttribute]
      public string zip2 { get; set; }
      [StringValidationAttribute]
      public string geo { get; set; }
      public decimal fedtxrate { get; set; }
      public decimal statxrate { get; set; }
      public decimal cntxrate { get; set; }
      public decimal lotxrate { get; set; }
      public decimal scstatxrate { get; set; }
      public decimal disttxrate { get; set; }
      public decimal sccntxrate { get; set; }
      public decimal sclotxrate { get; set; }
      [StringValidationAttribute]
      public string addr { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      [StringValidationAttribute]
      public string countrycd { get; set; }
      [StringValidationAttribute]
      public string county { get; set; }
      [StringValidationAttribute]
      public string district { get; set; }
      [StringValidationAttribute]
      public string district2 { get; set; }
      public int geocd { get; set; }
      public bool outofcityfl { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string zipcd { get; set; }
      [StringValidationAttribute]
      public string georowid { get; set; }


      public static Geocodelookupresults BuildGeocodelookupresultsFromRow(DataRow row)
      {
         Geocodelookupresults entity = new Geocodelookupresults();
         entity.cityname = row.IsNull("cityname") ? string.Empty : row.Field<string>("cityname");
         entity.outsidecity = row.IsNull("outsidecity") ? string.Empty : row.Field<string>("outsidecity");
         entity.cntyname = row.IsNull("cntyname") ? string.Empty : row.Field<string>("cntyname");
         entity.statecode = row.IsNull("statecode") ? string.Empty : row.Field<string>("statecode");
         entity.zip1 = row.IsNull("zip1") ? string.Empty : row.Field<string>("zip1");
         entity.zip2 = row.IsNull("zip2") ? string.Empty : row.Field<string>("zip2");
         entity.geo = row.IsNull("geo") ? string.Empty : row.Field<string>("geo");
         entity.fedtxrate = row.IsNull("fedtxrate") ? decimal.Zero : row.Field<decimal>("fedtxrate");
         entity.statxrate = row.IsNull("statxrate") ? decimal.Zero : row.Field<decimal>("statxrate");
         entity.cntxrate = row.IsNull("cntxrate") ? decimal.Zero : row.Field<decimal>("cntxrate");
         entity.lotxrate = row.IsNull("lotxrate") ? decimal.Zero : row.Field<decimal>("lotxrate");
         entity.scstatxrate = row.IsNull("scstatxrate") ? decimal.Zero : row.Field<decimal>("scstatxrate");
         entity.disttxrate = row.IsNull("disttxrate") ? decimal.Zero : row.Field<decimal>("disttxrate");
         entity.sccntxrate = row.IsNull("sccntxrate") ? decimal.Zero : row.Field<decimal>("sccntxrate");
         entity.sclotxrate = row.IsNull("sclotxrate") ? decimal.Zero : row.Field<decimal>("sclotxrate");
         entity.addr = row.IsNull("addr") ? string.Empty : row.Field<string>("addr");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.countrycd = row.IsNull("countrycd") ? string.Empty : row.Field<string>("countrycd");
         entity.county = row.IsNull("county") ? string.Empty : row.Field<string>("county");
         entity.district = row.IsNull("district") ? string.Empty : row.Field<string>("district");
         entity.district2 = row.IsNull("district2") ? string.Empty : row.Field<string>("district2");
         entity.geocd = row.IsNull("geocd") ? 0 : row.Field<int>("geocd");
         entity.outofcityfl = row.Field<bool>("outofcityfl");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.georowid = row.Field<byte[]>("georowid").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGeocodelookupresults(ref DataRow row, Geocodelookupresults entity)
      {
         row.SetField("cityname", entity.cityname);
         row.SetField("outsidecity", entity.outsidecity);
         row.SetField("cntyname", entity.cntyname);
         row.SetField("statecode", entity.statecode);
         row.SetField("zip1", entity.zip1);
         row.SetField("zip2", entity.zip2);
         row.SetField("geo", entity.geo);
         row.SetField("fedtxrate", entity.fedtxrate);
         row.SetField("statxrate", entity.statxrate);
         row.SetField("cntxrate", entity.cntxrate);
         row.SetField("lotxrate", entity.lotxrate);
         row.SetField("scstatxrate", entity.scstatxrate);
         row.SetField("disttxrate", entity.disttxrate);
         row.SetField("sccntxrate", entity.sccntxrate);
         row.SetField("sclotxrate", entity.sclotxrate);
         row.SetField("addr", entity.addr);
         row.SetField("city", entity.city);
         row.SetField("countrycd", entity.countrycd);
         row.SetField("county", entity.county);
         row.SetField("district", entity.district);
         row.SetField("district2", entity.district2);
         row.SetField("geocd", entity.geocd);
         row.SetField("outofcityfl", entity.outofcityfl);
         row.SetField("state", entity.state);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("georowid", entity.georowid.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591