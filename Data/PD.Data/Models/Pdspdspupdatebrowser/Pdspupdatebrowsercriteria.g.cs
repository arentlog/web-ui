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

namespace Infor.Sxe.PD.Data.Models.Pdspdspupdatebrowser
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdspupdatebrowser.Pdspupdatebrowsercriteria")]
   public partial class Pdspupdatebrowsercriteria : ModelBase
   {
      public int pdrecno { get; set; }
      [StringValidationAttribute]
      public string cLevelcd { get; set; }
      public int seqno { get; set; }
      public decimal price { get; set; }
      public int prcbreak { get; set; }
      public decimal disc { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public DateTime? startdt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdspupdatebrowsercriteria BuildPdspupdatebrowsercriteriaFromRow(DataRow row)
      {
         Pdspupdatebrowsercriteria entity = new Pdspupdatebrowsercriteria();
         entity.pdrecno = row.IsNull("pdrecno") ? 0 : row.Field<int>("pdrecno");
         entity.cLevelcd = row.IsNull("cLevelcd") ? string.Empty : row.Field<string>("cLevelcd");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.prcbreak = row.IsNull("prcbreak") ? 0 : row.Field<int>("prcbreak");
         entity.disc = row.IsNull("disc") ? decimal.Zero : row.Field<decimal>("disc");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdspupdatebrowsercriteria(ref DataRow row, Pdspupdatebrowsercriteria entity)
      {
         row.SetField("pdrecno", entity.pdrecno);
         row.SetField("cLevelcd", entity.cLevelcd);
         row.SetField("seqno", entity.seqno);
         row.SetField("price", entity.price);
         row.SetField("prcbreak", entity.prcbreak);
         row.SetField("disc", entity.disc);
         row.SetField("vendno", entity.vendno);
         row.SetField("prod", entity.prod);
         row.SetField("startdt", entity.startdt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591