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

namespace Infor.Sxe.TWL.Data.Models.Pdsomwaveinfocriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsomwaveinfocriteria.Omwaveinfocriteria")]
   public partial class Omwaveinfocriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      public int batch { get; set; }
      [StringValidationAttribute]
      public string omwaveinfouserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Omwaveinfocriteria BuildOmwaveinfocriteriaFromRow(DataRow row)
      {
         Omwaveinfocriteria entity = new Omwaveinfocriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.batch = row.IsNull("batch") ? 0 : row.Field<int>("batch");
         entity.omwaveinfouserfield = row.IsNull("omwaveinfouserfield") ? string.Empty : row.Field<string>("omwaveinfouserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOmwaveinfocriteria(ref DataRow row, Omwaveinfocriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("batch", entity.batch);
         row.SetField("omwaveinfouserfield", entity.omwaveinfouserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
