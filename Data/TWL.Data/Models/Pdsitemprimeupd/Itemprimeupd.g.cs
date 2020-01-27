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

namespace Infor.Sxe.TWL.Data.Models.Pdsitemprimeupd
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsitemprimeupd.Itemprimeupd")]
   public partial class Itemprimeupd : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string fullCase { get; set; }
      [StringValidationAttribute]
      public string splitCase { get; set; }
      [StringValidationAttribute]
      public string counter { get; set; }
      [StringValidationAttribute]
      public string pallet { get; set; }
      [StringValidationAttribute]
      public string itemprimeupduserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Itemprimeupd BuildItemprimeupdFromRow(DataRow row)
      {
         Itemprimeupd entity = new Itemprimeupd();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.fullCase = row.IsNull("fullCase") ? string.Empty : row.Field<string>("fullCase");
         entity.splitCase = row.IsNull("splitCase") ? string.Empty : row.Field<string>("splitCase");
         entity.counter = row.IsNull("counter") ? string.Empty : row.Field<string>("counter");
         entity.pallet = row.IsNull("pallet") ? string.Empty : row.Field<string>("pallet");
         entity.itemprimeupduserfield = row.IsNull("itemprimeupduserfield") ? string.Empty : row.Field<string>("itemprimeupduserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromItemprimeupd(ref DataRow row, Itemprimeupd entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("fullCase", entity.fullCase);
         row.SetField("splitCase", entity.splitCase);
         row.SetField("counter", entity.counter);
         row.SetField("pallet", entity.pallet);
         row.SetField("itemprimeupduserfield", entity.itemprimeupduserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591