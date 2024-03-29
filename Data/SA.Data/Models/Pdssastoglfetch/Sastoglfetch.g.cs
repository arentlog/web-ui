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

namespace Infor.Sxe.SA.Data.Models.Pdssastoglfetch
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssastoglfetch.Sastoglfetch")]
   public partial class Sastoglfetch : ModelBase
   {
      public int codeval { get; set; }
      [StringValidationAttribute]
      public string sastoglacct { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sastoglfetch BuildSastoglfetchFromRow(DataRow row)
      {
         Sastoglfetch entity = new Sastoglfetch();
         entity.codeval = row.IsNull("codeval") ? 0 : row.Field<int>("codeval");
         entity.sastoglacct = row.IsNull("sastoglacct") ? string.Empty : row.Field<string>("sastoglacct");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSastoglfetch(ref DataRow row, Sastoglfetch entity)
      {
         row.SetField("codeval", entity.codeval);
         row.SetField("sastoglacct", entity.sastoglacct);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
