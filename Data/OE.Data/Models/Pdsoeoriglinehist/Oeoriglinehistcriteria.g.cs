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

namespace Infor.Sxe.OE.Data.Models.Pdsoeoriglinehist
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeoriglinehist.Oeoriglinehistcriteria")]
   public partial class Oeoriglinehistcriteria : ModelBase
   {
      public int orderno { get; set; }
      public int lineno { get; set; }


      public static Oeoriglinehistcriteria BuildOeoriglinehistcriteriaFromRow(DataRow row)
      {
         Oeoriglinehistcriteria entity = new Oeoriglinehistcriteria();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeoriglinehistcriteria(ref DataRow row, Oeoriglinehistcriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("lineno", entity.lineno);

      }
   
   }
}
#pragma warning restore 1591
