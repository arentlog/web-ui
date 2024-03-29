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

namespace Infor.Sxe.IC.Data.Models.Pdsicxrefreferlookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicxrefreferlookup.Icxrefreferlookupresults")]
   public partial class Icxrefreferlookupresults : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string rectype { get; set; }
      [StringValidationAttribute]
      public string proddisplay { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string altprod { get; set; }
      public decimal keyno { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string unitstnd { get; set; }
      [StringValidationAttribute]
      public string extdesc { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user3 { get; set; }
      [StringValidationAttribute]
      public string user4 { get; set; }
      [StringValidationAttribute]
      public string user5 { get; set; }
      public decimal? user6 { get; set; }
      public decimal? user7 { get; set; }
      public DateTime? user8 { get; set; }
      public DateTime? user9 { get; set; }
      [StringValidationAttribute]
      public string rowidIcsec { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icxrefreferlookupresults BuildIcxrefreferlookupresultsFromRow(DataRow row)
      {
         Icxrefreferlookupresults entity = new Icxrefreferlookupresults();
         entity.rectype = row.IsNull("rectype") ? string.Empty : row.Field<string>("rectype");
         entity.proddisplay = row.IsNull("proddisplay") ? string.Empty : row.Field<string>("proddisplay");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.altprod = row.IsNull("altprod") ? string.Empty : row.Field<string>("altprod");
         entity.keyno = row.IsNull("keyno") ? decimal.Zero : row.Field<decimal>("keyno");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.unitstnd = row.IsNull("unitstnd") ? string.Empty : row.Field<string>("unitstnd");
         entity.extdesc = row.IsNull("extdesc") ? string.Empty : row.Field<string>("extdesc");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowidIcsec = row.Field<byte[]>("rowid-icsec").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcxrefreferlookupresults(ref DataRow row, Icxrefreferlookupresults entity)
      {
         row.SetField("rectype", entity.rectype);
         row.SetField("proddisplay", entity.proddisplay);
         row.SetField("prod", entity.prod);
         row.SetField("altprod", entity.altprod);
         row.SetField("keyno", entity.keyno);
         row.SetField("descrip", entity.descrip);
         row.SetField("unitstnd", entity.unitstnd);
         row.SetField("extdesc", entity.extdesc);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("rowid-icsec", entity.rowidIcsec.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
