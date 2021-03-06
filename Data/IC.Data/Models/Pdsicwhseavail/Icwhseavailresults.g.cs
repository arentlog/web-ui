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

namespace Infor.Sxe.IC.Data.Models.Pdsicwhseavail
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicwhseavail.Icwhseavailresults")]
   public partial class Icwhseavailresults : ModelBase
   {
      public int iCoNo { get; set; }
      [StringValidationAttribute]
      public string cWhse { get; set; }
      public decimal dCost { get; set; }
      public int iSurplus { get; set; }
      public decimal dNetAvail { get; set; }
      public decimal dUsageRate { get; set; }
      public int iLeadTmAvg { get; set; }
      public int iQtyOnOrder { get; set; }
      public DateTime? dtNextRcv { get; set; }
      public decimal dConsignCustno { get; set; }
      public decimal dQtyOnhand { get; set; }
      public decimal dreserved { get; set; }
      public decimal dCommited { get; set; }
      public bool lValidWhse { get; set; }
      public decimal dQtyBO { get; set; }
      [StringValidationAttribute]
      public string cCritical { get; set; }
      public decimal dTotUsageRate { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icwhseavailresults BuildIcwhseavailresultsFromRow(DataRow row)
      {
         Icwhseavailresults entity = new Icwhseavailresults();
         entity.iCoNo = row.IsNull("iCoNo") ? 0 : row.Field<int>("iCoNo");
         entity.cWhse = row.IsNull("cWhse") ? string.Empty : row.Field<string>("cWhse");
         entity.dCost = row.IsNull("dCost") ? decimal.Zero : row.Field<decimal>("dCost");
         entity.iSurplus = row.IsNull("iSurplus") ? 0 : row.Field<int>("iSurplus");
         entity.dNetAvail = row.IsNull("dNetAvail") ? decimal.Zero : row.Field<decimal>("dNetAvail");
         entity.dUsageRate = row.IsNull("dUsageRate") ? decimal.Zero : row.Field<decimal>("dUsageRate");
         entity.iLeadTmAvg = row.IsNull("iLeadTmAvg") ? 0 : row.Field<int>("iLeadTmAvg");
         entity.iQtyOnOrder = row.IsNull("iQtyOnOrder") ? 0 : row.Field<int>("iQtyOnOrder");
         entity.dtNextRcv = row.Field<DateTime?>("dtNextRcv");
         entity.dConsignCustno = row.IsNull("dConsignCustno") ? decimal.Zero : row.Field<decimal>("dConsignCustno");
         entity.dQtyOnhand = row.IsNull("dQtyOnhand") ? decimal.Zero : row.Field<decimal>("dQtyOnhand");
         entity.dreserved = row.IsNull("dreserved") ? decimal.Zero : row.Field<decimal>("dreserved");
         entity.dCommited = row.IsNull("dCommited") ? decimal.Zero : row.Field<decimal>("dCommited");
         entity.lValidWhse = row.Field<bool>("lValidWhse");
         entity.dQtyBO = row.IsNull("dQtyBO") ? decimal.Zero : row.Field<decimal>("dQtyBO");
         entity.cCritical = row.IsNull("cCritical") ? string.Empty : row.Field<string>("cCritical");
         entity.dTotUsageRate = row.IsNull("dTotUsageRate") ? decimal.Zero : row.Field<decimal>("dTotUsageRate");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcwhseavailresults(ref DataRow row, Icwhseavailresults entity)
      {
         row.SetField("iCoNo", entity.iCoNo);
         row.SetField("cWhse", entity.cWhse);
         row.SetField("dCost", entity.dCost);
         row.SetField("iSurplus", entity.iSurplus);
         row.SetField("dNetAvail", entity.dNetAvail);
         row.SetField("dUsageRate", entity.dUsageRate);
         row.SetField("iLeadTmAvg", entity.iLeadTmAvg);
         row.SetField("iQtyOnOrder", entity.iQtyOnOrder);
         row.SetField("dtNextRcv", entity.dtNextRcv);
         row.SetField("dConsignCustno", entity.dConsignCustno);
         row.SetField("dQtyOnhand", entity.dQtyOnhand);
         row.SetField("dreserved", entity.dreserved);
         row.SetField("dCommited", entity.dCommited);
         row.SetField("lValidWhse", entity.lValidWhse);
         row.SetField("dQtyBO", entity.dQtyBO);
         row.SetField("cCritical", entity.cCritical);
         row.SetField("dTotUsageRate", entity.dTotUsageRate);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
