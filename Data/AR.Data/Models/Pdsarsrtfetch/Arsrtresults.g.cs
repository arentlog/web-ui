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

namespace Infor.Sxe.AR.Data.Models.Pdsarsrtfetch
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarsrtfetch.Arsrtresults")]
   public partial class Arsrtresults : ModelBase, IUserFields
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string arscnotesfl { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custname { get; set; }
      [StringValidationAttribute]
      public string arssnotesfl { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string rebatety { get; set; }
      [StringValidationAttribute]
      public string rebatedesc { get; set; }
      [StringValidationAttribute]
      public string currentreblbl { get; set; }
      [StringValidationAttribute]
      public string currentrebate { get; set; }
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
      public string rowidArsrt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arsrtresults BuildArsrtresultsFromRow(DataRow row)
      {
         Arsrtresults entity = new Arsrtresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.arscnotesfl = row.IsNull("arscnotesfl") ? string.Empty : row.Field<string>("arscnotesfl");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custname = row.IsNull("custname") ? string.Empty : row.Field<string>("custname");
         entity.arssnotesfl = row.IsNull("arssnotesfl") ? string.Empty : row.Field<string>("arssnotesfl");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.rebatety = row.IsNull("rebatety") ? string.Empty : row.Field<string>("rebatety");
         entity.rebatedesc = row.IsNull("rebatedesc") ? string.Empty : row.Field<string>("rebatedesc");
         entity.currentreblbl = row.IsNull("currentreblbl") ? string.Empty : row.Field<string>("currentreblbl");
         entity.currentrebate = row.IsNull("currentrebate") ? string.Empty : row.Field<string>("currentrebate");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowidArsrt = row.Field<byte[]>("rowid-arsrt").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArsrtresults(ref DataRow row, Arsrtresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("arscnotesfl", entity.arscnotesfl);
         row.SetField("custno", entity.custno);
         row.SetField("custname", entity.custname);
         row.SetField("arssnotesfl", entity.arssnotesfl);
         row.SetField("shipto", entity.shipto);
         row.SetField("rebatety", entity.rebatety);
         row.SetField("rebatedesc", entity.rebatedesc);
         row.SetField("currentreblbl", entity.currentreblbl);
         row.SetField("currentrebate", entity.currentrebate);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("rowid-arsrt", entity.rowidArsrt.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
