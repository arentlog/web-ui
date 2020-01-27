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

namespace Infor.Sxe.Shared.Data.Models.Pdstiatcaddress
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdstiatcaddress.Tiatcaddress")]
   public partial class Tiatcaddress : ModelBase
   {
      [StringValidationAttribute]
      public string rowpointer { get; set; }
      [StringValidationAttribute]
      public string taxinterfacety { get; set; }
      [StringValidationAttribute]
      public string address { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      [StringValidationAttribute]
      public string county { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string zipcd { get; set; }
      [StringValidationAttribute]
      public string country { get; set; }
      public bool outofcityfl { get; set; }
      public int geocd { get; set; }
      [StringValidationAttribute]
      public string seccity { get; set; }
      [StringValidationAttribute]
      public string seccounty { get; set; }
      [StringValidationAttribute]
      public string seczipcd { get; set; }
      public int secgeocd { get; set; }
      [StringValidationAttribute]
      public string location { get; set; }
      [StringValidationAttribute]
      public string prodcode { get; set; }
      [StringValidationAttribute]
      public string serviceind { get; set; }
      public decimal grossamt { get; set; }
      public decimal exemptamt { get; set; }
      public bool addresssensitive { get; set; }
      public bool countrysensitive { get; set; }
      public bool outofcitysensitive { get; set; }
      public bool locationsensitive { get; set; }
      public bool seccitysensitive { get; set; }
      public bool seccountysensitive { get; set; }
      public bool seczipcdsensitive { get; set; }
      public bool secgeocdsensitive { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Tiatcaddress BuildTiatcaddressFromRow(DataRow row)
      {
         Tiatcaddress entity = new Tiatcaddress();
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.taxinterfacety = row.IsNull("taxinterfacety") ? string.Empty : row.Field<string>("taxinterfacety");
         entity.address = row.IsNull("address") ? string.Empty : row.Field<string>("address");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.county = row.IsNull("county") ? string.Empty : row.Field<string>("county");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.country = row.IsNull("country") ? string.Empty : row.Field<string>("country");
         entity.outofcityfl = row.Field<bool>("outofcityfl");
         entity.geocd = row.IsNull("geocd") ? 0 : row.Field<int>("geocd");
         entity.seccity = row.IsNull("seccity") ? string.Empty : row.Field<string>("seccity");
         entity.seccounty = row.IsNull("seccounty") ? string.Empty : row.Field<string>("seccounty");
         entity.seczipcd = row.IsNull("seczipcd") ? string.Empty : row.Field<string>("seczipcd");
         entity.secgeocd = row.IsNull("secgeocd") ? 0 : row.Field<int>("secgeocd");
         entity.location = row.IsNull("location") ? string.Empty : row.Field<string>("location");
         entity.prodcode = row.IsNull("prodcode") ? string.Empty : row.Field<string>("prodcode");
         entity.serviceind = row.IsNull("serviceind") ? string.Empty : row.Field<string>("serviceind");
         entity.grossamt = row.IsNull("grossamt") ? decimal.Zero : row.Field<decimal>("grossamt");
         entity.exemptamt = row.IsNull("exemptamt") ? decimal.Zero : row.Field<decimal>("exemptamt");
         entity.addresssensitive = row.Field<bool>("addresssensitive");
         entity.countrysensitive = row.Field<bool>("countrysensitive");
         entity.outofcitysensitive = row.Field<bool>("outofcitysensitive");
         entity.locationsensitive = row.Field<bool>("locationsensitive");
         entity.seccitysensitive = row.Field<bool>("seccitysensitive");
         entity.seccountysensitive = row.Field<bool>("seccountysensitive");
         entity.seczipcdsensitive = row.Field<bool>("seczipcdsensitive");
         entity.secgeocdsensitive = row.Field<bool>("secgeocdsensitive");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromTiatcaddress(ref DataRow row, Tiatcaddress entity)
      {
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("taxinterfacety", entity.taxinterfacety);
         row.SetField("address", entity.address);
         row.SetField("city", entity.city);
         row.SetField("county", entity.county);
         row.SetField("state", entity.state);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("country", entity.country);
         row.SetField("outofcityfl", entity.outofcityfl);
         row.SetField("geocd", entity.geocd);
         row.SetField("seccity", entity.seccity);
         row.SetField("seccounty", entity.seccounty);
         row.SetField("seczipcd", entity.seczipcd);
         row.SetField("secgeocd", entity.secgeocd);
         row.SetField("location", entity.location);
         row.SetField("prodcode", entity.prodcode);
         row.SetField("serviceind", entity.serviceind);
         row.SetField("grossamt", entity.grossamt);
         row.SetField("exemptamt", entity.exemptamt);
         row.SetField("addresssensitive", entity.addresssensitive);
         row.SetField("countrysensitive", entity.countrysensitive);
         row.SetField("outofcitysensitive", entity.outofcitysensitive);
         row.SetField("locationsensitive", entity.locationsensitive);
         row.SetField("seccitysensitive", entity.seccitysensitive);
         row.SetField("seccountysensitive", entity.seccountysensitive);
         row.SetField("seczipcdsensitive", entity.seczipcdsensitive);
         row.SetField("secgeocdsensitive", entity.secgeocdsensitive);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
