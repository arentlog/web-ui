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

namespace Infor.Sxe.AR.Data.Models.Pdsariltransmission
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsariltransmission.Ariltransmissionresults")]
   public partial class Ariltransmissionresults : ModelBase
   {
      [StringValidationAttribute]
      public string transmission { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transtm { get; set; }
      [StringValidationAttribute]
      public string adddata1 { get; set; }
      [StringValidationAttribute]
      public string adddata2 { get; set; }
      [StringValidationAttribute]
      public string adddata3 { get; set; }
      [StringValidationAttribute]
      public string adddata4 { get; set; }
      [StringValidationAttribute]
      public string adddata5 { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ariltransmissionresults BuildAriltransmissionresultsFromRow(DataRow row)
      {
         Ariltransmissionresults entity = new Ariltransmissionresults();
         entity.transmission = row.IsNull("transmission") ? string.Empty : row.Field<string>("transmission");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.adddata1 = row.IsNull("adddata1") ? string.Empty : row.Field<string>("adddata1");
         entity.adddata2 = row.IsNull("adddata2") ? string.Empty : row.Field<string>("adddata2");
         entity.adddata3 = row.IsNull("adddata3") ? string.Empty : row.Field<string>("adddata3");
         entity.adddata4 = row.IsNull("adddata4") ? string.Empty : row.Field<string>("adddata4");
         entity.adddata5 = row.IsNull("adddata5") ? string.Empty : row.Field<string>("adddata5");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAriltransmissionresults(ref DataRow row, Ariltransmissionresults entity)
      {
         row.SetField("transmission", entity.transmission);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("adddata1", entity.adddata1);
         row.SetField("adddata2", entity.adddata2);
         row.SetField("adddata3", entity.adddata3);
         row.SetField("adddata4", entity.adddata4);
         row.SetField("adddata5", entity.adddata5);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591