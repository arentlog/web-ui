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

namespace Infor.Sxe.AR.Data.Models.Pdsarsdlookup
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarsdlookup.Arsdlookupresults")]
   public partial class Arsdlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string cardno { get; set; }
      public int cono { get; set; }
      public decimal custno { get; set; }
      public decimal maxamount { get; set; }
      public int mediacd { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string mediadesc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arsdlookupresults BuildArsdlookupresultsFromRow(DataRow row)
      {
         Arsdlookupresults entity = new Arsdlookupresults();
         entity.cardno = row.IsNull("cardno") ? string.Empty : row.Field<string>("cardno");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.maxamount = row.IsNull("maxamount") ? decimal.Zero : row.Field<decimal>("maxamount");
         entity.mediacd = row.IsNull("mediacd") ? 0 : row.Field<int>("mediacd");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.mediadesc = row.IsNull("mediadesc") ? string.Empty : row.Field<string>("mediadesc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArsdlookupresults(ref DataRow row, Arsdlookupresults entity)
      {
         row.SetField("cardno", entity.cardno);
         row.SetField("cono", entity.cono);
         row.SetField("custno", entity.custno);
         row.SetField("maxamount", entity.maxamount);
         row.SetField("mediacd", entity.mediacd);
         row.SetField("name", entity.name);
         row.SetField("seqno", entity.seqno);
         row.SetField("shipto", entity.shipto);
         row.SetField("mediadesc", entity.mediadesc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
