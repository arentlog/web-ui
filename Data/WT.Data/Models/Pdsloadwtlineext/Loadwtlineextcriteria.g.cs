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

namespace Infor.Sxe.WT.Data.Models.Pdsloadwtlineext
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdsloadwtlineext.Loadwtlineextcriteria")]
   public partial class Loadwtlineextcriteria : ModelBase
   {
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      public int lineno { get; set; }


      public static Loadwtlineextcriteria BuildLoadwtlineextcriteriaFromRow(DataRow row)
      {
         Loadwtlineextcriteria entity = new Loadwtlineextcriteria();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadwtlineextcriteria(ref DataRow row, Loadwtlineextcriteria entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("lineno", entity.lineno);

      }
   
   }
}
#pragma warning restore 1591