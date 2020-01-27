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

namespace Infor.Sxe.IC.Data.Models.Pdssinglemethodwaschosen
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdssinglemethodwaschosen.Singlemethodwaschosencrit")]
   public partial class Singlemethodwaschosencrit : ModelBase
   {
      public int ttblseqno { get; set; }
      [StringValidationAttribute]
      public string customparam { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Singlemethodwaschosencrit BuildSinglemethodwaschosencritFromRow(DataRow row)
      {
         Singlemethodwaschosencrit entity = new Singlemethodwaschosencrit();
         entity.ttblseqno = row.IsNull("ttblseqno") ? 0 : row.Field<int>("ttblseqno");
         entity.customparam = row.IsNull("customparam") ? string.Empty : row.Field<string>("customparam");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSinglemethodwaschosencrit(ref DataRow row, Singlemethodwaschosencrit entity)
      {
         row.SetField("ttblseqno", entity.ttblseqno);
         row.SetField("customparam", entity.customparam);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591