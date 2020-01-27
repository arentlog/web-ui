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

namespace Infor.Sxe.KP.Data.Models.Pdskpewactions
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdskpewactions.Kpewactions")]
   public partial class Kpewactions : ModelBase
   {
      public int seqno { get; set; }
      public bool btnaccept { get; set; }
      public bool btncancel { get; set; }
      public bool btndelete { get; set; }
      public bool btnclear { get; set; }
      public bool print { get; set; }
      public bool snlots { get; set; }
      public bool extendinfo { get; set; }
      public bool components { get; set; }
      public bool woties { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Kpewactions BuildKpewactionsFromRow(DataRow row)
      {
         Kpewactions entity = new Kpewactions();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.btnaccept = row.Field<bool>("btnaccept");
         entity.btncancel = row.Field<bool>("btncancel");
         entity.btndelete = row.Field<bool>("btndelete");
         entity.btnclear = row.Field<bool>("btnclear");
         entity.print = row.Field<bool>("print");
         entity.snlots = row.Field<bool>("snlots");
         entity.extendinfo = row.Field<bool>("extendinfo");
         entity.components = row.Field<bool>("components");
         entity.woties = row.Field<bool>("woties");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKpewactions(ref DataRow row, Kpewactions entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("btnaccept", entity.btnaccept);
         row.SetField("btncancel", entity.btncancel);
         row.SetField("btndelete", entity.btndelete);
         row.SetField("btnclear", entity.btnclear);
         row.SetField("print", entity.print);
         row.SetField("snlots", entity.snlots);
         row.SetField("extendinfo", entity.extendinfo);
         row.SetField("components", entity.components);
         row.SetField("woties", entity.woties);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
