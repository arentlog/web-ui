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
using Infor.Sxe.Common.Data.Models.AR;
   

namespace Infor.Sxe.OE.Data.Models.Pdsoeeh
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeeh.Arss")]
   public partial class Arss : ArssBase
   {

   
      /// <summary>
      /// Build a class from a database row
      /// </summary>   
      public static Arss BuildArssFromRow(DataRow row)
      {
         var entity = BuildArssBaseFromRow<Arss>(row);
         
         return entity;
      }

      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, Arss entity)
      {
         ArssBase.BuildMinimalRow(ref row, entity);
      }
      
      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArss(ref DataRow row, Arss entity)
      {
         UpdateRowFromArssBase(ref row, entity);
      }
   
   }
}
#pragma warning restore 1591
