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

namespace Infor.Sxe.TWL.Data.Models.Pdsstationresults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsstationresults.Stationresults")]
   public partial class Stationresults : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string stnNum { get; set; }
      [StringValidationAttribute]
      public string stnType { get; set; }
      public bool rowStatus { get; set; }
      [StringValidationAttribute]
      public string stntblRowid { get; set; }
      [StringValidationAttribute]
      public string stationresultsuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Stationresults BuildStationresultsFromRow(DataRow row)
      {
         Stationresults entity = new Stationresults();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.stnNum = row.IsNull("stn_num") ? string.Empty : row.Field<string>("stn_num");
         entity.stnType = row.IsNull("stn_type") ? string.Empty : row.Field<string>("stn_type");
         entity.rowStatus = row.Field<bool>("row_status");
         entity.stntblRowid = row.Field<byte[]>("stntblRowid").ToStringEncoded();
         entity.stationresultsuserfield = row.IsNull("stationresultsuserfield") ? string.Empty : row.Field<string>("stationresultsuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromStationresults(ref DataRow row, Stationresults entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("stn_num", entity.stnNum);
         row.SetField("stn_type", entity.stnType);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("stntblRowid", entity.stntblRowid.ToByteArray());
         row.SetField("stationresultsuserfield", entity.stationresultsuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
