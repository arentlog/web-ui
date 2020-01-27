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
using Infor.Sxe.Common.Data.Models.SHARED;
   

namespace Infor.Sxe.Shared.Data.Models.Pdsdealgh
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsdealgh.Dealgh")]
   public partial class Dealgh : DealghBase
   {

   
      /// <summary>
      /// Build a class from a database row
      /// </summary>   
      public static Dealgh BuildDealghFromRow(DataRow row)
      {
         var entity = BuildDealghBaseFromRow<Dealgh>(row);
         
         return entity;
      }

      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, Dealgh entity)
      {
         DealghBase.BuildMinimalRow(ref row, entity);
      }
      
      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromDealgh(ref DataRow row, Dealgh entity)
      {
         UpdateRowFromDealghBase(ref row, entity);
      }
   
   }
}
#pragma warning restore 1591
