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

namespace Infor.Sxe.Shared.Data.Models.Pdscrectrans
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdscrectrans.Crectranscriteria")]
   public partial class Crectranscriteria : ModelBase
   {
      public int bankno { get; set; }
      public int rsStarting { get; set; }
      public int fiCheckno { get; set; }
      public DateTime? fiStartingDt { get; set; }
      [StringValidationAttribute]
      public string rsActive { get; set; }
      [StringValidationAttribute]
      public string rsCleared { get; set; }
      [StringValidationAttribute]
      public string rsBalanced { get; set; }
      [StringValidationAttribute]
      public string slTransType { get; set; }
      public int secure { get; set; }
      public int recordLimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Crectranscriteria BuildCrectranscriteriaFromRow(DataRow row)
      {
         Crectranscriteria entity = new Crectranscriteria();
         entity.bankno = row.IsNull("bankno") ? 0 : row.Field<int>("bankno");
         entity.rsStarting = row.IsNull("rsStarting") ? 0 : row.Field<int>("rsStarting");
         entity.fiCheckno = row.IsNull("fiCheckno") ? 0 : row.Field<int>("fiCheckno");
         entity.fiStartingDt = row.Field<DateTime?>("fiStartingDt");
         entity.rsActive = row.IsNull("rsActive") ? string.Empty : row.Field<string>("rsActive");
         entity.rsCleared = row.IsNull("rsCleared") ? string.Empty : row.Field<string>("rsCleared");
         entity.rsBalanced = row.IsNull("rsBalanced") ? string.Empty : row.Field<string>("rsBalanced");
         entity.slTransType = row.IsNull("slTransType") ? string.Empty : row.Field<string>("slTransType");
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.recordLimit = row.IsNull("recordLimit") ? 0 : row.Field<int>("recordLimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCrectranscriteria(ref DataRow row, Crectranscriteria entity)
      {
         row.SetField("bankno", entity.bankno);
         row.SetField("rsStarting", entity.rsStarting);
         row.SetField("fiCheckno", entity.fiCheckno);
         row.SetField("fiStartingDt", entity.fiStartingDt);
         row.SetField("rsActive", entity.rsActive);
         row.SetField("rsCleared", entity.rsCleared);
         row.SetField("rsBalanced", entity.rsBalanced);
         row.SetField("slTransType", entity.slTransType);
         row.SetField("secure", entity.secure);
         row.SetField("recordLimit", entity.recordLimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591