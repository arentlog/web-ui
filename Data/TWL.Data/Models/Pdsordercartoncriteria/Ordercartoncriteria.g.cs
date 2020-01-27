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

namespace Infor.Sxe.TWL.Data.Models.Pdsordercartoncriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsordercartoncriteria.Ordercartoncriteria")]
   public partial class Ordercartoncriteria : ModelBase
   {
      [StringValidationAttribute]
      public string chCo { get; set; }
      [StringValidationAttribute]
      public string chWh { get; set; }
      [StringValidationAttribute]
      public string chTracking { get; set; }
      [StringValidationAttribute]
      public string chCarton { get; set; }
      [StringValidationAttribute]
      public string chStatus { get; set; }
      [StringValidationAttribute]
      public string chOrd { get; set; }
      [StringValidationAttribute]
      public string chSuf { get; set; }
      [StringValidationAttribute]
      public string chPallet { get; set; }
      [StringValidationAttribute]
      public string carrier { get; set; }
      [StringValidationAttribute]
      public string additional { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string ordercartoncriteriauserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ordercartoncriteria BuildOrdercartoncriteriaFromRow(DataRow row)
      {
         Ordercartoncriteria entity = new Ordercartoncriteria();
         entity.chCo = row.IsNull("ch_co") ? string.Empty : row.Field<string>("ch_co");
         entity.chWh = row.IsNull("ch_wh") ? string.Empty : row.Field<string>("ch_wh");
         entity.chTracking = row.IsNull("ch_tracking") ? string.Empty : row.Field<string>("ch_tracking");
         entity.chCarton = row.IsNull("ch_carton") ? string.Empty : row.Field<string>("ch_carton");
         entity.chStatus = row.IsNull("ch_status") ? string.Empty : row.Field<string>("ch_status");
         entity.chOrd = row.IsNull("ch_ord") ? string.Empty : row.Field<string>("ch_ord");
         entity.chSuf = row.IsNull("ch_suf") ? string.Empty : row.Field<string>("ch_suf");
         entity.chPallet = row.IsNull("ch_pallet") ? string.Empty : row.Field<string>("ch_pallet");
         entity.carrier = row.IsNull("carrier") ? string.Empty : row.Field<string>("carrier");
         entity.additional = row.IsNull("additional") ? string.Empty : row.Field<string>("additional");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.ordercartoncriteriauserfield = row.IsNull("ordercartoncriteriauserfield") ? string.Empty : row.Field<string>("ordercartoncriteriauserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOrdercartoncriteria(ref DataRow row, Ordercartoncriteria entity)
      {
         row.SetField("ch_co", entity.chCo);
         row.SetField("ch_wh", entity.chWh);
         row.SetField("ch_tracking", entity.chTracking);
         row.SetField("ch_carton", entity.chCarton);
         row.SetField("ch_status", entity.chStatus);
         row.SetField("ch_ord", entity.chOrd);
         row.SetField("ch_suf", entity.chSuf);
         row.SetField("ch_pallet", entity.chPallet);
         row.SetField("carrier", entity.carrier);
         row.SetField("additional", entity.additional);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("ordercartoncriteriauserfield", entity.ordercartoncriteriauserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
