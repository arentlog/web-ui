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

namespace Infor.Sxe.GL.Data.Models.Pdsgletioffsetaccts
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsgletioffsetaccts.Gletioffsetaccts")]
   public partial class Gletioffsetaccts : ModelBase
   {
      public int seqno { get; set; }
      public decimal amount { get; set; }
      [StringValidationAttribute]
      public string glaccount { get; set; }


      public static Gletioffsetaccts BuildGletioffsetacctsFromRow(DataRow row)
      {
         Gletioffsetaccts entity = new Gletioffsetaccts();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.glaccount = row.IsNull("glaccount") ? string.Empty : row.Field<string>("glaccount");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGletioffsetaccts(ref DataRow row, Gletioffsetaccts entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("amount", entity.amount);
         row.SetField("glaccount", entity.glaccount);

      }
   
   }
}
#pragma warning restore 1591
