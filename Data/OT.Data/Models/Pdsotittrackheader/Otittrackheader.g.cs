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

namespace Infor.Sxe.OT.Data.Models.Pdsotittrackheader
{
   [ModelName("Infor.Sxe.OT.Data.Models.Pdsotittrackheader.Otittrackheader")]
   public partial class Otittrackheader : ModelBase
   {
      public int trackno { get; set; }
      [StringValidationAttribute]
      public string vendname { get; set; }
      [StringValidationAttribute]
      public string shipfm { get; set; }
      [StringValidationAttribute]
      public string vendoraddr1 { get; set; }
      [StringValidationAttribute]
      public string fromaddr1 { get; set; }
      [StringValidationAttribute]
      public string vendoraddr2 { get; set; }
      [StringValidationAttribute]
      public string fromaddr2 { get; set; }
      [StringValidationAttribute]
      public string vendoraddr3 { get; set; }
      [StringValidationAttribute]
      public string fromaddr3 { get; set; }
      [StringValidationAttribute]
      public string fromcity { get; set; }
      [StringValidationAttribute]
      public string fromst { get; set; }
      [StringValidationAttribute]
      public string fromzip { get; set; }
      [StringValidationAttribute]
      public string vendorcity { get; set; }
      [StringValidationAttribute]
      public string vendorst { get; set; }
      [StringValidationAttribute]
      public string vendorzip { get; set; }
      [StringValidationAttribute]
      public string fromphone { get; set; }
      [StringValidationAttribute]
      public string fromcountry { get; set; }
      [StringValidationAttribute]
      public string vendphone { get; set; }
      [StringValidationAttribute]
      public string vendcountry { get; set; }
      [StringValidationAttribute]
      public string contact { get; set; }
      [StringValidationAttribute]
      public string countryorg { get; set; }
      [StringValidationAttribute]
      public string countrydest { get; set; }
      [StringValidationAttribute]
      public string vessnm { get; set; }
      public int portno { get; set; }
      [StringValidationAttribute]
      public string voyno { get; set; }
      [StringValidationAttribute]
      public string portnm { get; set; }
      [StringValidationAttribute]
      public string shipco { get; set; }
      [StringValidationAttribute]
      public string shipid { get; set; }
      [StringValidationAttribute]
      public string contno { get; set; }
      public int contsize { get; set; }
      [StringValidationAttribute]
      public string bofl { get; set; }
      [StringValidationAttribute]
      public string lettofcr { get; set; }
      public bool freeformaddrfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Otittrackheader BuildOtittrackheaderFromRow(DataRow row)
      {
         Otittrackheader entity = new Otittrackheader();
         entity.trackno = row.IsNull("trackno") ? 0 : row.Field<int>("trackno");
         entity.vendname = row.IsNull("vendname") ? string.Empty : row.Field<string>("vendname");
         entity.shipfm = row.IsNull("shipfm") ? string.Empty : row.Field<string>("shipfm");
         entity.vendoraddr1 = row.IsNull("vendoraddr1") ? string.Empty : row.Field<string>("vendoraddr1");
         entity.fromaddr1 = row.IsNull("fromaddr1") ? string.Empty : row.Field<string>("fromaddr1");
         entity.vendoraddr2 = row.IsNull("vendoraddr2") ? string.Empty : row.Field<string>("vendoraddr2");
         entity.fromaddr2 = row.IsNull("fromaddr2") ? string.Empty : row.Field<string>("fromaddr2");
         entity.vendoraddr3 = row.IsNull("vendoraddr3") ? string.Empty : row.Field<string>("vendoraddr3");
         entity.fromaddr3 = row.IsNull("fromaddr3") ? string.Empty : row.Field<string>("fromaddr3");
         entity.fromcity = row.IsNull("fromcity") ? string.Empty : row.Field<string>("fromcity");
         entity.fromst = row.IsNull("fromst") ? string.Empty : row.Field<string>("fromst");
         entity.fromzip = row.IsNull("fromzip") ? string.Empty : row.Field<string>("fromzip");
         entity.vendorcity = row.IsNull("vendorcity") ? string.Empty : row.Field<string>("vendorcity");
         entity.vendorst = row.IsNull("vendorst") ? string.Empty : row.Field<string>("vendorst");
         entity.vendorzip = row.IsNull("vendorzip") ? string.Empty : row.Field<string>("vendorzip");
         entity.fromphone = row.IsNull("fromphone") ? string.Empty : row.Field<string>("fromphone");
         entity.fromcountry = row.IsNull("fromcountry") ? string.Empty : row.Field<string>("fromcountry");
         entity.vendphone = row.IsNull("vendphone") ? string.Empty : row.Field<string>("vendphone");
         entity.vendcountry = row.IsNull("vendcountry") ? string.Empty : row.Field<string>("vendcountry");
         entity.contact = row.IsNull("contact") ? string.Empty : row.Field<string>("contact");
         entity.countryorg = row.IsNull("countryorg") ? string.Empty : row.Field<string>("countryorg");
         entity.countrydest = row.IsNull("countrydest") ? string.Empty : row.Field<string>("countrydest");
         entity.vessnm = row.IsNull("vessnm") ? string.Empty : row.Field<string>("vessnm");
         entity.portno = row.IsNull("portno") ? 0 : row.Field<int>("portno");
         entity.voyno = row.IsNull("voyno") ? string.Empty : row.Field<string>("voyno");
         entity.portnm = row.IsNull("portnm") ? string.Empty : row.Field<string>("portnm");
         entity.shipco = row.IsNull("shipco") ? string.Empty : row.Field<string>("shipco");
         entity.shipid = row.IsNull("shipid") ? string.Empty : row.Field<string>("shipid");
         entity.contno = row.IsNull("contno") ? string.Empty : row.Field<string>("contno");
         entity.contsize = row.IsNull("contsize") ? 0 : row.Field<int>("contsize");
         entity.bofl = row.IsNull("bofl") ? string.Empty : row.Field<string>("bofl");
         entity.lettofcr = row.IsNull("lettofcr") ? string.Empty : row.Field<string>("lettofcr");
         entity.freeformaddrfl = row.Field<bool>("freeformaddrfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOtittrackheader(ref DataRow row, Otittrackheader entity)
      {
         row.SetField("trackno", entity.trackno);
         row.SetField("vendname", entity.vendname);
         row.SetField("shipfm", entity.shipfm);
         row.SetField("vendoraddr1", entity.vendoraddr1);
         row.SetField("fromaddr1", entity.fromaddr1);
         row.SetField("vendoraddr2", entity.vendoraddr2);
         row.SetField("fromaddr2", entity.fromaddr2);
         row.SetField("vendoraddr3", entity.vendoraddr3);
         row.SetField("fromaddr3", entity.fromaddr3);
         row.SetField("fromcity", entity.fromcity);
         row.SetField("fromst", entity.fromst);
         row.SetField("fromzip", entity.fromzip);
         row.SetField("vendorcity", entity.vendorcity);
         row.SetField("vendorst", entity.vendorst);
         row.SetField("vendorzip", entity.vendorzip);
         row.SetField("fromphone", entity.fromphone);
         row.SetField("fromcountry", entity.fromcountry);
         row.SetField("vendphone", entity.vendphone);
         row.SetField("vendcountry", entity.vendcountry);
         row.SetField("contact", entity.contact);
         row.SetField("countryorg", entity.countryorg);
         row.SetField("countrydest", entity.countrydest);
         row.SetField("vessnm", entity.vessnm);
         row.SetField("portno", entity.portno);
         row.SetField("voyno", entity.voyno);
         row.SetField("portnm", entity.portnm);
         row.SetField("shipco", entity.shipco);
         row.SetField("shipid", entity.shipid);
         row.SetField("contno", entity.contno);
         row.SetField("contsize", entity.contsize);
         row.SetField("bofl", entity.bofl);
         row.SetField("lettofcr", entity.lettofcr);
         row.SetField("freeformaddrfl", entity.freeformaddrfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591