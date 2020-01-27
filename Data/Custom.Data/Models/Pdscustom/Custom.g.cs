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

namespace Infor.Sxe.Custom.Data.Models.Pdscustom
{
   [ModelName("Infor.Sxe.Custom.Data.Models.Pdscustom.Custom")]
   public partial class Custom : ModelBase
   {
      [StringValidationAttribute]
      public string data { get; set; }
      public int sq { get; set; }
      [StringValidationAttribute]
      public string fn { get; set; }
      [StringValidationAttribute]
      public string fv { get; set; }


      public static Custom BuildCustomFromRow(DataRow row)
      {
         Custom entity = new Custom();
         entity.data = row.IsNull("data") ? string.Empty : row.Field<string>("data");
         entity.sq = row.IsNull("sq") ? 0 : row.Field<int>("sq");
         entity.fn = row.IsNull("fn") ? string.Empty : row.Field<string>("fn");
         entity.fv = row.IsNull("fv") ? string.Empty : row.Field<string>("fv");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCustom(ref DataRow row, Custom entity)
      {
         row.SetField("data", entity.data);
         row.SetField("sq", entity.sq);
         row.SetField("fn", entity.fn);
         row.SetField("fv", entity.fv);

      }
   
   }
}
#pragma warning restore 1591