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

namespace Infor.Sxe.AP.Data.Models.Pdsapsplabel
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapsplabel.Apsplabelresults")]
   public partial class Apsplabelresults : ModelBase
   {
      [StringValidationAttribute]
      public string purcAmtLabel { get; set; }
      [StringValidationAttribute]
      public string qtySoldLabel { get; set; }
      [StringValidationAttribute]
      public string salesAmtLabel { get; set; }
      [StringValidationAttribute]
      public string cogAmtLabel { get; set; }
      [StringValidationAttribute]
      public string purchAmtTotal { get; set; }
      [StringValidationAttribute]
      public string qtySoldTotal { get; set; }
      [StringValidationAttribute]
      public string salesAmtTotal { get; set; }
      [StringValidationAttribute]
      public string cogAmtTotal { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apsplabelresults BuildApsplabelresultsFromRow(DataRow row)
      {
         Apsplabelresults entity = new Apsplabelresults();
         entity.purcAmtLabel = row.IsNull("PurcAmtLabel") ? string.Empty : row.Field<string>("PurcAmtLabel");
         entity.qtySoldLabel = row.IsNull("QtySoldLabel") ? string.Empty : row.Field<string>("QtySoldLabel");
         entity.salesAmtLabel = row.IsNull("SalesAmtLabel") ? string.Empty : row.Field<string>("SalesAmtLabel");
         entity.cogAmtLabel = row.IsNull("CogAmtLabel") ? string.Empty : row.Field<string>("CogAmtLabel");
         entity.purchAmtTotal = row.IsNull("PurchAmtTotal") ? string.Empty : row.Field<string>("PurchAmtTotal");
         entity.qtySoldTotal = row.IsNull("QtySoldTotal") ? string.Empty : row.Field<string>("QtySoldTotal");
         entity.salesAmtTotal = row.IsNull("SalesAmtTotal") ? string.Empty : row.Field<string>("SalesAmtTotal");
         entity.cogAmtTotal = row.IsNull("CogAmtTotal") ? string.Empty : row.Field<string>("CogAmtTotal");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApsplabelresults(ref DataRow row, Apsplabelresults entity)
      {
         row.SetField("PurcAmtLabel", entity.purcAmtLabel);
         row.SetField("QtySoldLabel", entity.qtySoldLabel);
         row.SetField("SalesAmtLabel", entity.salesAmtLabel);
         row.SetField("CogAmtLabel", entity.cogAmtLabel);
         row.SetField("PurchAmtTotal", entity.purchAmtTotal);
         row.SetField("QtySoldTotal", entity.qtySoldTotal);
         row.SetField("SalesAmtTotal", entity.salesAmtTotal);
         row.SetField("CogAmtTotal", entity.cogAmtTotal);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
