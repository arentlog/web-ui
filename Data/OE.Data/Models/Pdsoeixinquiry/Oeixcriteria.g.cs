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

namespace Infor.Sxe.OE.Data.Models.Pdsoeixinquiry
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeixinquiry.Oeixcriteria")]
   public partial class Oeixcriteria : ModelBase
   {
      public DateTime? invdt { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public int recordlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeixcriteria BuildOeixcriteriaFromRow(DataRow row)
      {
         Oeixcriteria entity = new Oeixcriteria();
         entity.invdt = row.Field<DateTime?>("invdt");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeixcriteria(ref DataRow row, Oeixcriteria entity)
      {
         row.SetField("invdt", entity.invdt);
         row.SetField("whse", entity.whse);
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591