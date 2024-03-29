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

namespace Infor.Sxe.Shared.Data.Models.Pdscrecqevoid
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdscrecqevoid.Crecqevoidcriteria")]
   public partial class Crecqevoidcriteria : ModelBase
   {
      public int bankno { get; set; }
      public decimal checknostart { get; set; }
      public decimal checknoend { get; set; }
      public DateTime? enterdt { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public int recordcountlimit { get; set; }
      public int jrnlno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Crecqevoidcriteria BuildCrecqevoidcriteriaFromRow(DataRow row)
      {
         Crecqevoidcriteria entity = new Crecqevoidcriteria();
         entity.bankno = row.IsNull("bankno") ? 0 : row.Field<int>("bankno");
         entity.checknostart = row.IsNull("checknostart") ? decimal.Zero : row.Field<decimal>("checknostart");
         entity.checknoend = row.IsNull("checknoend") ? decimal.Zero : row.Field<decimal>("checknoend");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCrecqevoidcriteria(ref DataRow row, Crecqevoidcriteria entity)
      {
         row.SetField("bankno", entity.bankno);
         row.SetField("checknostart", entity.checknostart);
         row.SetField("checknoend", entity.checknoend);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("refer", entity.refer);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
