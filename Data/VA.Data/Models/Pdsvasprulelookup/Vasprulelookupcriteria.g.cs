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

namespace Infor.Sxe.VA.Data.Models.Pdsvasprulelookup
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvasprulelookup.Vasprulelookupcriteria")]
   public partial class Vasprulelookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public int verno { get; set; }
      public int segment { get; set; }
      public bool noupdatefl { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vasprulelookupcriteria BuildVasprulelookupcriteriaFromRow(DataRow row)
      {
         Vasprulelookupcriteria entity = new Vasprulelookupcriteria();
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         entity.segment = row.IsNull("segment") ? 0 : row.Field<int>("segment");
         entity.noupdatefl = row.Field<bool>("noupdatefl");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVasprulelookupcriteria(ref DataRow row, Vasprulelookupcriteria entity)
      {
         row.SetField("shipprod", entity.shipprod);
         row.SetField("whse", entity.whse);
         row.SetField("verno", entity.verno);
         row.SetField("segment", entity.segment);
         row.SetField("noupdatefl", entity.noupdatefl);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591