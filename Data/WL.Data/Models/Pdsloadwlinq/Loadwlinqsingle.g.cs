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

namespace Infor.Sxe.WL.Data.Models.Pdsloadwlinq
{
   [ModelName("Infor.Sxe.WL.Data.Models.Pdsloadwlinq.Loadwlinqsingle")]
   public partial class Loadwlinqsingle : ModelBase
   {
      public bool btncartonssensitive { get; set; }


      public static Loadwlinqsingle BuildLoadwlinqsingleFromRow(DataRow row)
      {
         Loadwlinqsingle entity = new Loadwlinqsingle();
         entity.btncartonssensitive = row.Field<bool>("btncartonssensitive");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadwlinqsingle(ref DataRow row, Loadwlinqsingle entity)
      {
         row.SetField("btncartonssensitive", entity.btncartonssensitive);

      }
   
   }
}
#pragma warning restore 1591
