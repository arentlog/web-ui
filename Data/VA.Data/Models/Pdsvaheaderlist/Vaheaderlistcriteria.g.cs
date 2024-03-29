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

namespace Infor.Sxe.VA.Data.Models.Pdsvaheaderlist
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaheaderlist.Vaheaderlistcriteria")]
   public partial class Vaheaderlistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      public int vano { get; set; }
      public int vasuf { get; set; }
      public int stagecd { get; set; }
      public DateTime? enterdt { get; set; }
      public int verno { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaheaderlistcriteria BuildVaheaderlistcriteriaFromRow(DataRow row)
      {
         Vaheaderlistcriteria entity = new Vaheaderlistcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.vano = row.IsNull("vano") ? 0 : row.Field<int>("vano");
         entity.vasuf = row.IsNull("vasuf") ? 0 : row.Field<int>("vasuf");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaheaderlistcriteria(ref DataRow row, Vaheaderlistcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("vano", entity.vano);
         row.SetField("vasuf", entity.vasuf);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("verno", entity.verno);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
