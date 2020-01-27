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

namespace Infor.Sxe.PD.Data.Models.Pdspdspprice
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdspprice.Pdsppricebrowseresults")]
   public partial class Pdsppricebrowseresults : ModelBase
   {
      public int seqno { get; set; }
      public decimal price { get; set; }
      public int prcbreak { get; set; }
      public decimal disc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsppricebrowseresults BuildPdsppricebrowseresultsFromRow(DataRow row)
      {
         Pdsppricebrowseresults entity = new Pdsppricebrowseresults();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.prcbreak = row.IsNull("prcbreak") ? 0 : row.Field<int>("prcbreak");
         entity.disc = row.IsNull("disc") ? decimal.Zero : row.Field<decimal>("disc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsppricebrowseresults(ref DataRow row, Pdsppricebrowseresults entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("price", entity.price);
         row.SetField("prcbreak", entity.prcbreak);
         row.SetField("disc", entity.disc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
