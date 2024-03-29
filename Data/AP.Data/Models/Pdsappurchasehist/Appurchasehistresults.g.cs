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

namespace Infor.Sxe.AP.Data.Models.Pdsappurchasehist
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsappurchasehist.Appurchasehistresults")]
   public partial class Appurchasehistresults : ModelBase, IUserFields
   {
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      public int yr { get; set; }
      public int noinvbill { get; set; }
      public int nolinebill { get; set; }
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


      public static Appurchasehistresults BuildAppurchasehistresultsFromRow(DataRow row)
      {
         Appurchasehistresults entity = new Appurchasehistresults();
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.yr = row.IsNull("yr") ? 0 : row.Field<int>("yr");
         entity.noinvbill = row.IsNull("noinvbill") ? 0 : row.Field<int>("noinvbill");
         entity.nolinebill = row.IsNull("nolinebill") ? 0 : row.Field<int>("nolinebill");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAppurchasehistresults(ref DataRow row, Appurchasehistresults entity)
      {
         row.SetField("vendno", entity.vendno);
         row.SetField("name", entity.name);
         row.SetField("whse", entity.whse);
         row.SetField("prodline", entity.prodline);
         row.SetField("yr", entity.yr);
         row.SetField("noinvbill", entity.noinvbill);
         row.SetField("nolinebill", entity.nolinebill);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);

      }
   
   }
}
#pragma warning restore 1591
