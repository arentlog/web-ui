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

namespace Infor.Sxe.WT.Data.Models.Pdswtrrarreptmergerun
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtrrarreptmergerun.Wtrrarreptmergerunsngl")]
   public partial class Wtrrarreptmergerunsngl : ModelBase
   {
      [StringValidationAttribute]
      public string orderdtmonth { get; set; }
      [StringValidationAttribute]
      public string orderdtday { get; set; }
      [StringValidationAttribute]
      public string orderdtyear { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public bool printqtyfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtrrarreptmergerunsngl BuildWtrrarreptmergerunsnglFromRow(DataRow row)
      {
         Wtrrarreptmergerunsngl entity = new Wtrrarreptmergerunsngl();
         entity.orderdtmonth = row.IsNull("orderdtmonth") ? string.Empty : row.Field<string>("orderdtmonth");
         entity.orderdtday = row.IsNull("orderdtday") ? string.Empty : row.Field<string>("orderdtday");
         entity.orderdtyear = row.IsNull("orderdtyear") ? string.Empty : row.Field<string>("orderdtyear");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.printqtyfl = row.Field<bool>("printqtyfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtrrarreptmergerunsngl(ref DataRow row, Wtrrarreptmergerunsngl entity)
      {
         row.SetField("orderdtmonth", entity.orderdtmonth);
         row.SetField("orderdtday", entity.orderdtday);
         row.SetField("orderdtyear", entity.orderdtyear);
         row.SetField("whse", entity.whse);
         row.SetField("printqtyfl", entity.printqtyfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591