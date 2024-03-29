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

namespace Infor.Sxe.AR.Data.Models.Pdsarscavgdaystopay
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarscavgdaystopay.Arscavgdaystopayresults")]
   public partial class Arscavgdaystopayresults : ModelBase
   {
      public int newavgpaydays { get; set; }
      public int newnopays { get; set; }
      public bool lfoundrec { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arscavgdaystopayresults BuildArscavgdaystopayresultsFromRow(DataRow row)
      {
         Arscavgdaystopayresults entity = new Arscavgdaystopayresults();
         entity.newavgpaydays = row.IsNull("newavgpaydays") ? 0 : row.Field<int>("newavgpaydays");
         entity.newnopays = row.IsNull("newnopays") ? 0 : row.Field<int>("newnopays");
         entity.lfoundrec = row.Field<bool>("lfoundrec");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArscavgdaystopayresults(ref DataRow row, Arscavgdaystopayresults entity)
      {
         row.SetField("newavgpaydays", entity.newavgpaydays);
         row.SetField("newnopays", entity.newnopays);
         row.SetField("lfoundrec", entity.lfoundrec);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
