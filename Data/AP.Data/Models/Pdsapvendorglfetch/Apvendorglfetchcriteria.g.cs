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

namespace Infor.Sxe.AP.Data.Models.Pdsapvendorglfetch
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapvendorglfetch.Apvendorglfetchcriteria")]
   public partial class Apvendorglfetchcriteria : ModelBase
   {
      public decimal vendno { get; set; }


      public static Apvendorglfetchcriteria BuildApvendorglfetchcriteriaFromRow(DataRow row)
      {
         Apvendorglfetchcriteria entity = new Apvendorglfetchcriteria();
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApvendorglfetchcriteria(ref DataRow row, Apvendorglfetchcriteria entity)
      {
         row.SetField("vendno", entity.vendno);

      }
   
   }
}
#pragma warning restore 1591
