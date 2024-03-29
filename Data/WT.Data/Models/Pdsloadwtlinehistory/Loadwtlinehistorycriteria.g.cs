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

namespace Infor.Sxe.WT.Data.Models.Pdsloadwtlinehistory
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdsloadwtlinehistory.Loadwtlinehistorycriteria")]
   public partial class Loadwtlinehistorycriteria : ModelBase
   {
      public int wtno { get; set; }
      public int lineno { get; set; }


      public static Loadwtlinehistorycriteria BuildLoadwtlinehistorycriteriaFromRow(DataRow row)
      {
         Loadwtlinehistorycriteria entity = new Loadwtlinehistorycriteria();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadwtlinehistorycriteria(ref DataRow row, Loadwtlinehistorycriteria entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("lineno", entity.lineno);

      }
   
   }
}
#pragma warning restore 1591
