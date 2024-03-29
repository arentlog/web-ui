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

namespace Infor.Sxe.WT.Data.Models.Pdsloadwtquickviewties
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdsloadwtquickviewties.Loadwtquickviewtiesresults")]
   public partial class Loadwtquickviewtiesresults : ModelBase
   {
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public int orderaltno { get; set; }
      public int orderaltsuf { get; set; }
      public int linealtno { get; set; }
      public int seqaltno { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string customerwhse { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string transdttm { get; set; }
      public int seqno { get; set; }


      public static Loadwtquickviewtiesresults BuildLoadwtquickviewtiesresultsFromRow(DataRow row)
      {
         Loadwtquickviewtiesresults entity = new Loadwtquickviewtiesresults();
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderaltsuf = row.IsNull("orderaltsuf") ? 0 : row.Field<int>("orderaltsuf");
         entity.linealtno = row.IsNull("linealtno") ? 0 : row.Field<int>("linealtno");
         entity.seqaltno = row.IsNull("seqaltno") ? 0 : row.Field<int>("seqaltno");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.customerwhse = row.IsNull("customerwhse") ? string.Empty : row.Field<string>("customerwhse");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdttm = row.IsNull("transdttm") ? string.Empty : row.Field<string>("transdttm");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadwtquickviewtiesresults(ref DataRow row, Loadwtquickviewtiesresults entity)
      {
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderaltsuf", entity.orderaltsuf);
         row.SetField("linealtno", entity.linealtno);
         row.SetField("seqaltno", entity.seqaltno);
         row.SetField("transtype", entity.transtype);
         row.SetField("customerwhse", entity.customerwhse);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdttm", entity.transdttm);
         row.SetField("seqno", entity.seqno);

      }
   
   }
}
#pragma warning restore 1591
