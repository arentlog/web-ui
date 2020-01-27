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

namespace Infor.Sxe.OE.Data.Models.Pdsoewtbillingsearch
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoewtbillingsearch.Oewtbillingcriteria")]
   public partial class Oewtbillingcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string autoaltwhsecd { get; set; }
      public DateTime? fromrcptdt { get; set; }
      public DateTime? torcptdt { get; set; }
      [StringValidationAttribute]
      public string oestagecd { get; set; }
      public int recordlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oewtbillingcriteria BuildOewtbillingcriteriaFromRow(DataRow row)
      {
         Oewtbillingcriteria entity = new Oewtbillingcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.autoaltwhsecd = row.IsNull("autoaltwhsecd") ? string.Empty : row.Field<string>("autoaltwhsecd");
         entity.fromrcptdt = row.Field<DateTime?>("fromrcptdt");
         entity.torcptdt = row.Field<DateTime?>("torcptdt");
         entity.oestagecd = row.IsNull("oestagecd") ? string.Empty : row.Field<string>("oestagecd");
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOewtbillingcriteria(ref DataRow row, Oewtbillingcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("autoaltwhsecd", entity.autoaltwhsecd);
         row.SetField("fromrcptdt", entity.fromrcptdt);
         row.SetField("torcptdt", entity.torcptdt);
         row.SetField("oestagecd", entity.oestagecd);
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
