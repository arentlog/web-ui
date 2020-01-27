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

namespace Infor.Sxe.IC.Data.Models.Pdsicproductlookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicproductlookup.Icproductlookupresults")]
   public partial class Icproductlookupresults : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string descrip1 { get; set; }
      [StringValidationAttribute]
      public string descrip2 { get; set; }
      [StringValidationAttribute]
      public string descrip3 { get; set; }
      [StringValidationAttribute]
      public string lookupnm { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string prodtiergrp { get; set; }
      public bool msdsfl { get; set; }
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
      public string rowidIcsp { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icproductlookupresults BuildIcproductlookupresultsFromRow(DataRow row)
      {
         Icproductlookupresults entity = new Icproductlookupresults();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.descrip1 = row.IsNull("descrip1") ? string.Empty : row.Field<string>("descrip1");
         entity.descrip2 = row.IsNull("descrip2") ? string.Empty : row.Field<string>("descrip2");
         entity.descrip3 = row.IsNull("descrip3") ? string.Empty : row.Field<string>("descrip3");
         entity.lookupnm = row.IsNull("lookupnm") ? string.Empty : row.Field<string>("lookupnm");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.prodtiergrp = row.IsNull("prodtiergrp") ? string.Empty : row.Field<string>("prodtiergrp");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowidIcsp = row.Field<byte[]>("rowid-icsp").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcproductlookupresults(ref DataRow row, Icproductlookupresults entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("statustype", entity.statustype);
         row.SetField("descrip1", entity.descrip1);
         row.SetField("descrip2", entity.descrip2);
         row.SetField("descrip3", entity.descrip3);
         row.SetField("lookupnm", entity.lookupnm);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("prodtiergrp", entity.prodtiergrp);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("rowid-icsp", entity.rowidIcsp.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
