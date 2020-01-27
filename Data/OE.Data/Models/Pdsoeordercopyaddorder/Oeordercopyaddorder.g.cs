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

namespace Infor.Sxe.OE.Data.Models.Pdsoeordercopyaddorder
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeordercopyaddorder.Oeordercopyaddorder")]
   public partial class Oeordercopyaddorder : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int beglineno { get; set; }
      public int endlineno { get; set; }
      [StringValidationAttribute]
      public string newtranstype { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeordercopyaddorder BuildOeordercopyaddorderFromRow(DataRow row)
      {
         Oeordercopyaddorder entity = new Oeordercopyaddorder();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.beglineno = row.IsNull("beglineno") ? 0 : row.Field<int>("beglineno");
         entity.endlineno = row.IsNull("endlineno") ? 0 : row.Field<int>("endlineno");
         entity.newtranstype = row.IsNull("newtranstype") ? string.Empty : row.Field<string>("newtranstype");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeordercopyaddorder(ref DataRow row, Oeordercopyaddorder entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("beglineno", entity.beglineno);
         row.SetField("endlineno", entity.endlineno);
         row.SetField("newtranstype", entity.newtranstype);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
