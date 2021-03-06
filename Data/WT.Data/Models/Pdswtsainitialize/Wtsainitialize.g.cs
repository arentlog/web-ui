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

namespace Infor.Sxe.WT.Data.Models.Pdswtsainitialize
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtsainitialize.Wtsainitialize")]
   public partial class Wtsainitialize : ModelBase
   {
      [StringValidationAttribute]
      public string wtsadropdownlist { get; set; }
      [StringValidationAttribute]
      public string wtsaselectiontype { get; set; }
      public bool useproductfl { get; set; }
      public bool useprodlinefl { get; set; }
      public bool usevendnofl { get; set; }
      public bool useprodcatfl { get; set; }
      public bool useprodprctyfl { get; set; }
      public bool usealtprodgrpfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtsainitialize BuildWtsainitializeFromRow(DataRow row)
      {
         Wtsainitialize entity = new Wtsainitialize();
         entity.wtsadropdownlist = row.IsNull("wtsadropdownlist") ? string.Empty : row.Field<string>("wtsadropdownlist");
         entity.wtsaselectiontype = row.IsNull("wtsaselectiontype") ? string.Empty : row.Field<string>("wtsaselectiontype");
         entity.useproductfl = row.Field<bool>("useproductfl");
         entity.useprodlinefl = row.Field<bool>("useprodlinefl");
         entity.usevendnofl = row.Field<bool>("usevendnofl");
         entity.useprodcatfl = row.Field<bool>("useprodcatfl");
         entity.useprodprctyfl = row.Field<bool>("useprodprctyfl");
         entity.usealtprodgrpfl = row.Field<bool>("usealtprodgrpfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtsainitialize(ref DataRow row, Wtsainitialize entity)
      {
         row.SetField("wtsadropdownlist", entity.wtsadropdownlist);
         row.SetField("wtsaselectiontype", entity.wtsaselectiontype);
         row.SetField("useproductfl", entity.useproductfl);
         row.SetField("useprodlinefl", entity.useprodlinefl);
         row.SetField("usevendnofl", entity.usevendnofl);
         row.SetField("useprodcatfl", entity.useprodcatfl);
         row.SetField("useprodprctyfl", entity.useprodprctyfl);
         row.SetField("usealtprodgrpfl", entity.usealtprodgrpfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
