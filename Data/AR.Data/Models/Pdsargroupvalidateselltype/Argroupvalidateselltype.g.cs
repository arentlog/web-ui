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

namespace Infor.Sxe.AR.Data.Models.Pdsargroupvalidateselltype
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsargroupvalidateselltype.Argroupvalidateselltype")]
   public partial class Argroupvalidateselltype : ModelBase
   {
      [StringValidationAttribute]
      public string groupid { get; set; }
      [StringValidationAttribute]
      public string selltype { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Argroupvalidateselltype BuildArgroupvalidateselltypeFromRow(DataRow row)
      {
         Argroupvalidateselltype entity = new Argroupvalidateselltype();
         entity.groupid = row.IsNull("groupid") ? string.Empty : row.Field<string>("groupid");
         entity.selltype = row.IsNull("selltype") ? string.Empty : row.Field<string>("selltype");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArgroupvalidateselltype(ref DataRow row, Argroupvalidateselltype entity)
      {
         row.SetField("groupid", entity.groupid);
         row.SetField("selltype", entity.selltype);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
