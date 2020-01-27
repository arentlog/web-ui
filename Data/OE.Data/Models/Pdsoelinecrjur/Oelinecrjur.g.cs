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

namespace Infor.Sxe.OE.Data.Models.Pdsoelinecrjur
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelinecrjur.Oelinecrjur")]
   public partial class Oelinecrjur : ModelBase
   {
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public int orderaltno { get; set; }
      public int orderaltsuf { get; set; }
      [StringValidationAttribute]
      public string botype { get; set; }
      public bool powtintfl { get; set; }
      public decimal vendno { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string addr1 { get; set; }
      [StringValidationAttribute]
      public string addr2 { get; set; }
      [StringValidationAttribute]
      public string addr3 { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string zipcd { get; set; }
      public int geocd { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oelinecrjur BuildOelinecrjurFromRow(DataRow row)
      {
         Oelinecrjur entity = new Oelinecrjur();
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderaltsuf = row.IsNull("orderaltsuf") ? 0 : row.Field<int>("orderaltsuf");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.powtintfl = row.Field<bool>("powtintfl");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.addr1 = row.IsNull("addr1") ? string.Empty : row.Field<string>("addr1");
         entity.addr2 = row.IsNull("addr2") ? string.Empty : row.Field<string>("addr2");
         entity.addr3 = row.IsNull("addr3") ? string.Empty : row.Field<string>("addr3");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.geocd = row.IsNull("geocd") ? 0 : row.Field<int>("geocd");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinecrjur(ref DataRow row, Oelinecrjur entity)
      {
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderaltsuf", entity.orderaltsuf);
         row.SetField("botype", entity.botype);
         row.SetField("powtintfl", entity.powtintfl);
         row.SetField("vendno", entity.vendno);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("whse", entity.whse);
         row.SetField("name", entity.name);
         row.SetField("addr1", entity.addr1);
         row.SetField("addr2", entity.addr2);
         row.SetField("addr3", entity.addr3);
         row.SetField("city", entity.city);
         row.SetField("state", entity.state);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("geocd", entity.geocd);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
