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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpoea
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpoea.Loadpoeacriteria")]
   public partial class Loadpoeacriteria : ModelBase
   {
      [StringValidationAttribute]
      public string buyer { get; set; }
      public int pono { get; set; }
      public int posuf { get; set; }
      public int recordcountlimit { get; set; }
      public decimal vendno { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadpoeacriteria BuildLoadpoeacriteriaFromRow(DataRow row)
      {
         Loadpoeacriteria entity = new Loadpoeacriteria();
         entity.buyer = row.IsNull("buyer") ? string.Empty : row.Field<string>("buyer");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpoeacriteria(ref DataRow row, Loadpoeacriteria entity)
      {
         row.SetField("buyer", entity.buyer);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("vendno", entity.vendno);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("whse", entity.whse);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
