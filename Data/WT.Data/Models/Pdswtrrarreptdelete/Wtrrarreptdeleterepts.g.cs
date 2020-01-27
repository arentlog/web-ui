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

namespace Infor.Sxe.WT.Data.Models.Pdswtrrarreptdelete
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtrrarreptdelete.Wtrrarreptdeleterepts")]
   public partial class Wtrrarreptdeleterepts : ModelBase
   {
      [StringValidationAttribute]
      public string rowidWterah { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtrrarreptdeleterepts BuildWtrrarreptdeletereptsFromRow(DataRow row)
      {
         Wtrrarreptdeleterepts entity = new Wtrrarreptdeleterepts();
         entity.rowidWterah = row.Field<byte[]>("rowid-wterah").ToStringEncoded();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtrrarreptdeleterepts(ref DataRow row, Wtrrarreptdeleterepts entity)
      {
         row.SetField("rowid-wterah", entity.rowidWterah.ToByteArray());
         row.SetField("seqno", entity.seqno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
